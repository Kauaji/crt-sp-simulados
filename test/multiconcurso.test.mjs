import test from "node:test";
import assert from "node:assert/strict";
import { loadStudyData } from "../scripts/lib/load-study-data.mjs";
import { semanticSimilarity, validateAnswerKey } from "../scripts/lib/question-utils.mjs";

const BLANK = "__blank";
const data = await loadStudyData();

function contest(id) {
  return data.concursos.find((item) => item.id === id);
}

function role(contestId, roleId) {
  return contest(contestId).roles.find((item) => item.id === roleId);
}

function questionsFor(contestId, roleId) {
  return data.questoes.filter((question) => question.concurso_id === contestId && question.cargos_compativeis.includes(roleId));
}

function scopeKey(userId, contestId, roleId) {
  return `${userId}::${contestId}::${roleId}`;
}

function evaluate(scoring, question, answer) {
  if (!answer || answer === BLANK) return scoring.blank;
  return answer === question.resposta_correta ? scoring.correct : scoring.wrong;
}

function toggleRevision(scope, questionId) {
  scope.revisionMarked = scope.revisionMarked || {};
  if (scope.revisionMarked[questionId]) delete scope.revisionMarked[questionId];
  else scope.revisionMarked[questionId] = { questionId };
  return Boolean(scope.revisionMarked[questionId]);
}

function nextBlankIndex(queueIds, answers, currentIndex) {
  const blanks = queueIds
    .map((id, index) => (!answers[id] || answers[id] === BLANK ? index : -1))
    .filter((index) => index >= 0);
  return blanks.find((index) => index > currentIndex) ?? blanks[0] ?? -1;
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

function selectDaily(contestId, roleId, userId, dateKey, type = "complete:prova") {
  const selected = [];
  const roleDef = role(contestId, roleId);
  const pool = questionsFor(contestId, roleId);
  for (const item of roleDef.exam.distribution) {
    const matterPool = pool.filter((question) => (
      item.kind === "bloco" ? question.bloco === item.id : question.materia_id === item.id
    ) && !selected.includes(question));
    selected.push(...shuffle(matterPool, `${dateKey}-${userId}-${contestId}-${roleId}-${type}-${item.id}`).slice(0, item.count));
  }
  return selected.slice(0, roleDef.exam.totalQuestoes).map((question) => question.id);
}

test("separa escopos por usuário, concurso e cargo", () => {
  assert.notEqual(scopeKey("kaua", "crt-sp", "crt-tecnico-administrativo-bs"), scopeKey("caio", "crt-sp", "crt-tecnico-administrativo-bs"));
  assert.notEqual(scopeKey("kaua", "crt-sp", "crt-tecnico-administrativo-bs"), scopeKey("kaua", "ibge", "ibge-acq"));
  assert.notEqual(scopeKey("kaua", "ibge", "ibge-acq"), scopeKey("kaua", "ibge", "ibge-analista-ti-dados"));
});

test("CRT-SP usa Certo/Errado e demais objetivos usam múltipla escolha", () => {
  assert.ok(questionsFor("crt-sp", "crt-tecnico-administrativo-bs").every((question) => question.tipo === "certo_errado"));
  for (const [contestId, roleId] of [
    ["ibge", "ibge-acq"],
    ["ibge", "ibge-analista-ti-dados"],
    ["santos-oficial", "santos-oficial-administracao"],
    ["pm-sp", "pmsp-aluno-soldado-qp"],
  ]) {
    assert.ok(questionsFor(contestId, roleId).every((question) => question.tipo === "multipla_escolha"));
  }
});

test("pontuação negativa aparece somente nos cargos Quadrix CRT-SP", () => {
  assert.equal(role("crt-sp", "crt-tecnico-administrativo-bs").exam.scoring.wrong, -1);
  assert.equal(role("crt-sp", "crt-fiscal-bs").exam.scoring.wrong, -1);
  assert.equal(role("ibge", "ibge-acq").exam.scoring.wrong, 0);
  assert.equal(role("santos-oficial", "santos-oficial-administracao").exam.scoring.wrong, 0);
  assert.equal(role("pm-sp", "pmsp-aluno-soldado-qp").exam.scoring.wrong, 0);
});

test("avalia acerto, erro e branco conforme edital ativo", () => {
  const crtQuestion = questionsFor("crt-sp", "crt-tecnico-administrativo-bs")[0];
  const crtScoring = role("crt-sp", "crt-tecnico-administrativo-bs").exam.scoring;
  assert.equal(evaluate(crtScoring, crtQuestion, crtQuestion.resposta_correta), 1);
  assert.equal(evaluate(crtScoring, crtQuestion, crtQuestion.resposta_correta === "C" ? "E" : "C"), -1);
  assert.equal(evaluate(crtScoring, crtQuestion, BLANK), 0);

  const pmQuestion = questionsFor("pm-sp", "pmsp-aluno-soldado-qp")[0];
  const pmScoring = role("pm-sp", "pmsp-aluno-soldado-qp").exam.scoring;
  assert.equal(evaluate(pmScoring, pmQuestion, "Z"), 0);
});

test("marcar revisão alterna marcado/desmarcado sem apagar resposta", () => {
  const scope = { revisionMarked: {}, answers: { "Q-1": { lastAnswer: "A" } } };
  assert.equal(toggleRevision(scope, "Q-1"), true);
  assert.equal(scope.answers["Q-1"].lastAnswer, "A");
  assert.equal(toggleRevision(scope, "Q-1"), false);
  assert.equal(scope.answers["Q-1"].lastAnswer, "A");
});

test("simulado em andamento é serializável para persistência local", () => {
  const mock = {
    id: "daily-2026-07-21-kaua-crt-sp-crt-tecnico-administrativo-bs-prova",
    user_id: "kaua",
    concurso_id: "crt-sp",
    cargo_id: "crt-tecnico-administrativo-bs",
    queueIds: ["CRT-POR-001", "CRT-RLM-001"],
    answers: { "CRT-POR-001": "C" },
    markedForReview: { "CRT-RLM-001": true },
    currentIndex: 1,
    startedAt: 1000,
    durationSeconds: 3600,
  };
  assert.deepEqual(JSON.parse(JSON.stringify(mock)), mock);
});

test("próxima em branco encontra a próxima sem resposta sem loop infinito", () => {
  const queueIds = ["a", "b", "c", "d"];
  const answers = { a: "A", b: "B", c: BLANK };
  assert.equal(nextBlankIndex(queueIds, answers, 0), 2);
  assert.equal(nextBlankIndex(queueIds, { a: "A", b: "B", c: "C", d: "D" }, 0), -1);
});

test("simulado diário mantém seleção no mesmo dia e muda em outro dia", () => {
  const first = selectDaily("pm-sp", "pmsp-aluno-soldado-qp", "kaua", "2026-07-21");
  const second = selectDaily("pm-sp", "pmsp-aluno-soldado-qp", "kaua", "2026-07-21");
  const nextDay = selectDaily("pm-sp", "pmsp-aluno-soldado-qp", "kaua", "2026-07-22");
  assert.deepEqual(first, second);
  assert.notDeepEqual(first, nextDay);
});

test("quantidade exigida por edital está disponível por cargo", () => {
  for (const contestDef of data.concursos) {
    for (const roleDef of contestDef.roles) {
      assert.ok(questionsFor(contestDef.id, roleDef.id).length >= roleDef.exam.totalQuestoes, `${contestDef.id}/${roleDef.id}`);
    }
  }
});

test("alternativas e gabaritos são válidos", () => {
  const invalid = data.questoes.filter((question) => !validateAnswerKey(question));
  assert.deepEqual(invalid.map((question) => question.id), []);
  const duplicatedOptions = data.questoes.filter((question) => question.alternativas?.length && new Set(question.alternativas.map((option) => option.text)).size !== question.alternativas.length);
  assert.deepEqual(duplicatedOptions.map((question) => question.id), []);
});

test("metadados de fonte usam tipos permitidos e hash de conteúdo", () => {
  const allowed = new Set(["previous_exam_adapted", "official_legislation", "official_notice", "authorial"]);
  const invalid = data.questoes.filter((question) => !allowed.has(question.source_type) || !question.content_hash || !question.source_reference);
  assert.deepEqual(invalid.map((question) => question.id), []);
});

test("detector de similaridade captura questões semanticamente próximas", () => {
  const a = "No atendimento presencial, julgue o item a seguir. A LAI estabelece publicidade como regra e sigilo como exceção.";
  const b = "Em demanda típica do edital, julgue o item a seguir. A LAI estabelece a publicidade como regra e o sigilo como exceção.";
  assert.ok(semanticSimilarity(a, b) >= 0.35);
});
