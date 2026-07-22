import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const TIMEZONE = "America/Sao_Paulo";
const HISTORY_DAYS = 14;
const NO_REPEAT_DAYS = 7;

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dataDir = join(root, "data");
const selectionPath = join(dataDir, "daily-selection.json");
const historyPath = join(dataDir, "daily-history.json");

function saoPauloDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function addDays(dateKey, days) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days, 12, 0, 0));
  return date.toISOString().slice(0, 10);
}

function dayNumber(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / 86400000);
}

function hashSeed(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seedText) {
  let stateValue = hashSeed(seedText);
  return () => {
    stateValue += 0x6D2B79F5;
    let value = stateValue;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(items, seedText) {
  const output = [...items];
  const random = seededRandom(seedText);
  for (let index = output.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
  }
  return output;
}

function loadStudyData() {
  const code = readFileSync(join(root, "simulados.js"), "utf8");
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(code, context, { filename: "simulados.js" });
  return context.window.STUDY_DATA;
}

function readJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  try {
    const parsed = JSON.parse(readFileSync(path, "utf8"));
    return parsed && typeof parsed === "object" ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function roleScopes(data) {
  return data.concursos.flatMap((contest) => contest.roles.map((role) => ({
    key: `${contest.id}::${role.id}`,
    contest,
    role,
  })));
}

function questionsFor(data, contestId, roleId) {
  return data.questoes.filter((question) => (
    question.concurso_id === contestId
    && question.cargos_compativeis.includes(roleId)
    && !["redacao", "discursiva"].includes(question.tipo)
  ));
}

function recentIdsForScope(history, dateKey, scopeKey) {
  const todayNumber = dayNumber(dateKey);
  const ids = new Set();
  for (const [historyDate, selections] of Object.entries(history || {})) {
    if (historyDate === dateKey) continue;
    const diff = todayNumber - dayNumber(historyDate);
    if (diff <= 0 || diff > NO_REPEAT_DAYS) continue;
    for (const id of selections?.[scopeKey] || []) ids.add(id);
  }
  return ids;
}

function pickFromPool(pool, count, seed, recentIds) {
  const freshPool = pool.filter((question) => !recentIds.has(question.id));
  const usablePool = freshPool.length >= count ? freshPool : pool;
  return shuffle(usablePool, seed).slice(0, count);
}

function buildSelections(data, history, dateKey) {
  const selections = {};

  for (const { key, contest, role } of roleScopes(data)) {
    const all = questionsFor(data, contest.id, role.id);
    const selected = [];
    const recentIds = recentIdsForScope(history, dateKey, key);

    for (const item of role.exam.distribution) {
      const pool = all.filter((question) => (
        item.kind === "bloco" ? question.bloco === item.id : question.materia_id === item.id
      ) && !selected.some((selectedQuestion) => selectedQuestion.id === question.id));

      const count = Math.min(pool.length, item.count);
      selected.push(...pickFromPool(pool, count, `${dateKey}-${key}-${item.kind}-${item.id}`, recentIds));
    }

    if (selected.length < role.exam.totalQuestoes) {
      const remaining = role.exam.totalQuestoes - selected.length;
      const fillPool = all.filter((question) => !selected.some((selectedQuestion) => selectedQuestion.id === question.id));
      if (fillPool.length < remaining) {
        throw new Error(`${key}: banco insuficiente para completar a prova (${selected.length + fillPool.length}/${role.exam.totalQuestoes}).`);
      }
      selected.push(...pickFromPool(fillPool, remaining, `${dateKey}-${key}-fill`, recentIds));
    }

    if (selected.length !== role.exam.totalQuestoes) {
      throw new Error(`${key}: quantidade selecionada inválida (${selected.length}/${role.exam.totalQuestoes}).`);
    }

    selections[key] = selected.map((question) => question.id);
  }

  return selections;
}

function validateSelection(data, selection) {
  if (!selection || selection.timezone !== TIMEZONE || !selection.date || !selection.selections) {
    throw new Error("Seleção diária inválida: cabeçalho ausente.");
  }

  for (const { key, contest, role } of roleScopes(data)) {
    const ids = selection.selections[key];
    if (!Array.isArray(ids)) throw new Error(`${key}: seleção ausente.`);
    if (ids.length !== role.exam.totalQuestoes) {
      throw new Error(`${key}: quantidade inválida (${ids.length}/${role.exam.totalQuestoes}).`);
    }
    if (new Set(ids).size !== ids.length) throw new Error(`${key}: IDs duplicados no simulado.`);

    const available = questionsFor(data, contest.id, role.id);
    const byId = new Map(available.map((question) => [question.id, question]));
    const questions = ids.map((id) => byId.get(id));
    const missing = ids.filter((id, index) => !questions[index]);
    if (missing.length) throw new Error(`${key}: IDs inválidos ou de outro concurso/cargo: ${missing.join(", ")}.`);

    for (const question of questions) {
      if (question.banca !== contest.banca) throw new Error(`${key}: banca misturada em ${question.id}.`);
      if (role.exam.formato === "certo_errado" && question.tipo !== "certo_errado") throw new Error(`${key}: formato incompatível em ${question.id}.`);
      if (role.exam.formato === "multipla_escolha" && question.tipo !== "multipla_escolha") throw new Error(`${key}: formato incompatível em ${question.id}.`);
    }

    for (const item of role.exam.distribution) {
      const availableInDistribution = available.filter((question) => (
        item.kind === "bloco" ? question.bloco === item.id : question.materia_id === item.id
      )).length;
      const required = Math.min(item.count, availableInDistribution);
      const total = questions.filter((question) => (
        item.kind === "bloco" ? question.bloco === item.id : question.materia_id === item.id
      )).length;
      if (total < required) throw new Error(`${key}: distribuição inválida em "${item.label}" (${total}/${required}).`);
    }
  }
}

function pruneHistory(history, dateKey) {
  const minDay = dayNumber(dateKey) - HISTORY_DAYS + 1;
  return Object.fromEntries(
    Object.entries(history || {})
      .filter(([historyDate]) => dayNumber(historyDate) >= minDay)
      .sort(([a], [b]) => a.localeCompare(b)),
  );
}

function assertSameDateIsStable(data, history, dateKey) {
  const first = buildSelections(data, history, dateKey);
  const second = buildSelections(data, history, dateKey);
  if (JSON.stringify(first) !== JSON.stringify(second)) {
    throw new Error("Teste falhou: a mesma data não gerou a mesma seleção.");
  }
}

function assertDifferentDateChanges(data, history, dateKey) {
  const today = buildSelections(data, history, dateKey);
  const tomorrow = buildSelections(data, { ...history, [dateKey]: today }, addDays(dateKey, 1));
  const changed = Object.keys(today).some((key) => today[key].join("|") !== tomorrow[key].join("|"));
  if (!changed) throw new Error("Teste falhou: datas diferentes não alteraram a seleção.");
}

const data = loadStudyData();
const date = process.env.ROTATE_DAILY_DATE || saoPauloDateKey();
const history = readJson(historyPath, {});

assertSameDateIsStable(data, history, date);
assertDifferentDateChanges(data, history, date);

const selections = buildSelections(data, history, date);
const nextSelection = {
  date,
  timezone: TIMEZONE,
  selections,
};

validateSelection(data, nextSelection);

const nextHistory = pruneHistory({
  ...history,
  [date]: selections,
}, date);

mkdirSync(dataDir, { recursive: true });
writeFileSync(selectionPath, `${JSON.stringify(nextSelection, null, 2)}\n`);
writeFileSync(historyPath, `${JSON.stringify(nextHistory, null, 2)}\n`);

console.log(`Rotação diária gerada para ${date} (${TIMEZONE}).`);
for (const [key, ids] of Object.entries(selections)) {
  console.log(`${key}: ${ids.length} questões`);
}
