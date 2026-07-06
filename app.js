/* global BANCO_QUESTOES */
"use strict";

const USERS = {
  kaua: { id: "kaua", name: "Kauã", initial: "K" },
  vitoria: { id: "vitoria", name: "Vitória", initial: "V" }
};
const STORAGE_KEYS = { currentUser: "crtsp.currentUser", stats: "crtsp.stats.v1" };
const BLOCK_QUOTAS = {
  "Conhecimentos básicos": 12,
  "Conhecimentos complementares": 8,
  "Conhecimentos específicos": 20
};
const MOTIVATIONS = [
  "Constância ganha da pressa. Hoje são só 40 decisões bem pensadas.",
  "Um item por vez — até a legislação começar a pedir arrego.",
  "Seu eu do dia da prova agradece este treino silencioso.",
  "Marque com calma, revise com honestidade e deixe o foguinho trabalhar.",
  "Não precisa saber tudo hoje. Precisa descobrir o que revisar amanhã."
];

let dailyQuestions = [];
let examFinished = false;

const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;").replaceAll("'", "&#039;");

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function daysBetween(fromKey, toKey) {
  const [fy, fm, fd] = fromKey.split("-").map(Number);
  const [ty, tm, td] = toKey.split("-").map(Number);
  return Math.round((Date.UTC(ty, tm - 1, td) - Date.UTC(fy, fm - 1, fd)) / 86400000);
}

function createDefaultStats() {
  return {
    accesses: 0, lastAccessDate: null, currentStreak: 0, bestStreak: 0,
    totalPoints: 0, examsFinished: 0, bestNetScore: null, lastNetScore: null,
    netScoreSum: 0, history: []
  };
}

function getCurrentUser() {
  const id = localStorage.getItem(STORAGE_KEYS.currentUser);
  return USERS[id] || null;
}

function setCurrentUser(userId) {
  if (!USERS[userId]) return;
  localStorage.setItem(STORAGE_KEYS.currentUser, userId);
}

function loadAllStats() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.stats) || "{}");
    return Object.fromEntries(Object.keys(USERS).map((id) => [id, { ...createDefaultStats(), ...(saved[id] || {}) }]));
  } catch {
    return Object.fromEntries(Object.keys(USERS).map((id) => [id, createDefaultStats()]));
  }
}

function loadStats(userId = getCurrentUser()?.id) {
  return loadAllStats()[userId] || createDefaultStats();
}

function saveStats(userId, stats) {
  const allStats = loadAllStats();
  allStats[userId] = stats;
  localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(allStats));
}

function updateStreak(stats, today = getLocalDateKey()) {
  if (stats.lastAccessDate === today) return stats;
  const difference = stats.lastAccessDate ? daysBetween(stats.lastAccessDate, today) : null;
  stats.currentStreak = difference === 1 ? stats.currentStreak + 1 : 1;
  stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
  stats.lastAccessDate = today;
  return stats;
}

function registerAccess(userId) {
  const stats = loadStats(userId);
  const today = getLocalDateKey();
  if (stats.lastAccessDate !== today) {
    stats.accesses += 1;
    updateStreak(stats, today);
    saveStats(userId, stats);
  }
  return stats;
}

function hashSeed(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seedRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6D2B79F5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function deterministicShuffle(items, seedText) {
  const output = [...items];
  const random = seedRandom(hashSeed(seedText));
  for (let index = output.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [output[index], output[target]] = [output[target], output[index]];
  }
  return output;
}

function getDailyQuestions(dateKey = getLocalDateKey()) {
  const selected = [];
  Object.entries(BLOCK_QUOTAS).forEach(([block, quota]) => {
    const pool = BANCO_QUESTOES.filter((question) => question.bloco === block);
    if (pool.length < quota) throw new Error(`Banco insuficiente em ${block}: ${pool.length}/${quota}`);
    selected.push(...deterministicShuffle(pool, `${dateKey}:${block}`).slice(0, quota));
  });
  return selected;
}

function updateStatsAfterExam(result) {
  const user = getCurrentUser();
  const stats = loadStats(user.id);
  const streakBonus = Math.min(stats.currentStreak, 10);
  const earnedPoints = Math.max(0, result.netScore) + result.correct + streakBonus;
  stats.totalPoints += earnedPoints;
  stats.examsFinished += 1;
  stats.lastNetScore = result.netScore;
  stats.bestNetScore = stats.bestNetScore === null ? result.netScore : Math.max(stats.bestNetScore, result.netScore);
  stats.netScoreSum += result.netScore;
  stats.history.unshift({ date: getLocalDateKey(), netScore: result.netScore, correct: result.correct, earnedPoints });
  stats.history = stats.history.slice(0, 10);
  saveStats(user.id, stats);
  return { stats, earnedPoints, streakBonus };
}

function formatScore(value) {
  return value === null ? "—" : String(Math.round(value * 10) / 10);
}

function renderDashboard() {
  const user = getCurrentUser();
  const stats = loadStats(user.id);
  const average = stats.examsFinished ? stats.netScoreSum / stats.examsFinished : null;
  $("#top-user-name").textContent = user.name;
  $("#dashboard-name").textContent = user.name;
  $("#motivation").textContent = MOTIVATIONS[hashSeed(`${getLocalDateKey()}:${user.id}`) % MOTIVATIONS.length];
  $("#stat-points").textContent = stats.totalPoints;
  $("#stat-streak").textContent = `🔥 ${stats.currentStreak}`;
  $("#stat-best-streak").textContent = `Recorde: ${stats.bestStreak} ${stats.bestStreak === 1 ? "dia" : "dias"}`;
  $("#stat-accesses").textContent = stats.accesses;
  $("#stat-exams").textContent = stats.examsFinished;
  $("#stat-best").textContent = formatScore(stats.bestNetScore);
  $("#stat-last").textContent = formatScore(stats.lastNetScore);
  $("#stat-average").textContent = formatScore(average);
}

function renderRanking() {
  const allStats = loadAllStats();
  const rows = [
    ["Pontos", allStats.kaua.totalPoints, allStats.vitoria.totalPoints],
    ["Acessos", allStats.kaua.accesses, allStats.vitoria.accesses],
    ["Foguinho", allStats.kaua.currentStreak, allStats.vitoria.currentStreak],
    ["Simulados", allStats.kaua.examsFinished, allStats.vitoria.examsFinished]
  ];
  $("#ranking-table").innerHTML = `
    <div class="ranking-row ranking-row--head"><span>Métrica</span><strong>Kauã</strong><strong>Vitória</strong></div>
    ${rows.map(([label, kaua, vitoria]) => {
      const max = Math.max(kaua, vitoria);
      return `<div class="ranking-row"><span>${label}</span><strong class="${kaua === max && max > 0 ? "is-leading" : ""}">${kaua}</strong><strong class="${vitoria === max && max > 0 ? "is-leading" : ""}">${vitoria}</strong></div>`;
    }).join("")}`;
  const kaua = allStats.kaua.totalPoints;
  const vitoria = allStats.vitoria.totalPoints;
  $("#ranking-status").textContent = kaua === vitoria
    ? "Empate na jornada — a próxima prova desempata."
    : `${kaua > vitoria ? "Kauã" : "Vitória"} está na frente por ${Math.abs(kaua - vitoria)} ${Math.abs(kaua - vitoria) === 1 ? "ponto" : "pontos"}.`;
}

function renderQuestions() {
  const groups = dailyQuestions.reduce((acc, question, index) => {
    (acc[question.bloco] ||= []).push({ ...question, displayNumber: index + 1 });
    return acc;
  }, {});
  $("#questions").innerHTML = Object.entries(groups).map(([block, questions]) => `
    <section class="question-block" aria-labelledby="block-${questions[0].displayNumber}">
      <div class="block-heading"><h2 id="block-${questions[0].displayNumber}">${escapeHtml(block)}</h2><span>${questions.length} itens</span></div>
      ${questions.map((question) => `
        <article class="question" id="questao-${question.displayNumber}">
          <div class="question__meta"><span class="question__number">${question.displayNumber}</span><span>${escapeHtml(question.assunto)}</span></div>
          <p class="question__text">${escapeHtml(question.enunciado)}</p>
          <div class="choices" role="radiogroup" aria-label="Resposta da questão ${question.displayNumber}">
            ${[["C", "Certo"], ["E", "Errado"], ["B", "Em branco"]].map(([value, label]) => `
              <input type="radio" id="q${question.displayNumber}-${value}" name="q${question.displayNumber}" value="${value}">
              <label for="q${question.displayNumber}-${value}">${label}</label>`).join("")}
          </div>
        </article>`).join("")}
    </section>`).join("");
}

function updateProgress() {
  const count = [...new FormData($("#quiz-form")).keys()].filter((key) => key.startsWith("q")).length;
  const percent = Math.round((count / dailyQuestions.length) * 100);
  $("#progress-label").textContent = `${count} de ${dailyQuestions.length} respondidas`;
  $("#progress-percent").textContent = `${percent}%`;
  $("#progress-bar").style.width = `${percent}%`;
}

function finishExam(event) {
  event.preventDefault();
  if (examFinished) return;
  const data = new FormData($("#quiz-form"));
  const answers = {};
  dailyQuestions.forEach((question, index) => { answers[question.id] = data.get(`q${index + 1}`) || "B"; });
  const result = { correct: 0, wrong: 0, blank: 0, netScore: 0 };
  const blocks = {};
  const reviewTopics = new Map();

  dailyQuestions.forEach((question) => {
    const answer = answers[question.id];
    const status = answer === "B" ? "blank" : answer === question.gabarito ? "correct" : "wrong";
    result[status] += 1;
    blocks[question.bloco] ||= { correct: 0, total: 0 };
    blocks[question.bloco].total += 1;
    if (status === "correct") blocks[question.bloco].correct += 1;
    if (status !== "correct") reviewTopics.set(question.assunto, (reviewTopics.get(question.assunto) || 0) + 1);
  });
  result.netScore = result.correct - result.wrong;
  const reward = updateStatsAfterExam(result);
  examFinished = true;

  $("#correct-count").textContent = result.correct;
  $("#wrong-count").textContent = result.wrong;
  $("#blank-count").textContent = result.blank;
  $("#net-score").textContent = result.netScore;
  $("#earned-points").textContent = `+${reward.earnedPoints}`;
  $("#accumulated-points").textContent = reward.stats.totalPoints;
  $("#points-formula").textContent = `${Math.max(0, result.netScore)} pela nota + ${result.correct} pelos acertos + ${reward.streakBonus} pelo foguinho`;
  $("#block-results").innerHTML = Object.entries(blocks).map(([name, block]) => {
    const percent = Math.round((block.correct / block.total) * 100);
    return `<div class="block-result"><strong>${escapeHtml(name)}</strong><div class="block-result__track" aria-label="${percent}% de acertos"><span style="width:${percent}%"></span></div><span>${percent}%</span></div>`;
  }).join("");
  const sortedTopics = [...reviewTopics.entries()].sort((a, b) => b[1] - a[1]);
  $("#review-topics").innerHTML = sortedTopics.length
    ? sortedTopics.map(([topic, count]) => `<li><strong>${escapeHtml(topic)}</strong> — ${count} ${count === 1 ? "item" : "itens"}</li>`).join("")
    : "<li>Nenhum tema pendente. Excelente resultado!</li>";
  $("#answer-key").innerHTML = dailyQuestions.map((question, index) => {
    const answer = answers[question.id];
    const status = answer === "B" ? "blank" : answer === question.gabarito ? "correct" : "wrong";
    const statusLabel = { correct: "Acertou", wrong: "Errou", blank: "Em branco" }[status];
    const answerLabel = answer === "B" ? "Em branco" : answer === "C" ? "Certo" : "Errado";
    const keyLabel = question.gabarito === "C" ? "Certo" : "Errado";
    return `<article class="answer-item answer-item--${status}"><p class="answer-item__meta">ITEM ${index + 1} · ${escapeHtml(question.assunto)} · ${statusLabel}</p><p><strong>Sua resposta:</strong> ${answerLabel} &nbsp; <strong>Gabarito:</strong> ${keyLabel}</p><p class="answer-item__comment">${escapeHtml(question.comentario)}</p></article>`;
  }).join("");
  $("#finish-button").disabled = true;
  $("#results").hidden = false;
  renderDashboard();
  renderRanking();
  $("#results").scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetExam() {
  if (!window.confirm("Deseja apagar as respostas desta tentativa? Os resultados já finalizados permanecem no perfil.")) return;
  $("#quiz-form").reset();
  $("#results").hidden = true;
  $("#finish-button").disabled = false;
  examFinished = false;
  updateProgress();
  window.scrollTo({ top: $("#quiz-form").offsetTop - 80, behavior: "smooth" });
}

function showLogin() {
  $("#app-shell").hidden = true;
  $("#login-screen").hidden = false;
}

function enterApp(userId, shouldRegister = true) {
  setCurrentUser(userId);
  if (shouldRegister) registerAccess(userId);
  dailyQuestions = getDailyQuestions();
  $("#daily-date").textContent = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date());
  renderQuestions();
  renderDashboard();
  renderRanking();
  updateProgress();
  $("#login-screen").hidden = true;
  $("#app-shell").hidden = false;
  window.scrollTo({ top: 0 });
}

document.querySelectorAll("[data-user]").forEach((button) => button.addEventListener("click", () => enterApp(button.dataset.user)));
$("#switch-user").addEventListener("click", showLogin);
$("#switch-user-dashboard").addEventListener("click", showLogin);
$("#clear-data").addEventListener("click", () => {
  const user = getCurrentUser();
  if (!window.confirm(`Zerar todo o histórico local de ${user.name}? Esta ação não pode ser desfeita.`)) return;
  saveStats(user.id, createDefaultStats());
  registerAccess(user.id);
  renderDashboard();
  renderRanking();
});
$("#quiz-form").addEventListener("change", updateProgress);
$("#quiz-form").addEventListener("submit", finishExam);
$("#reset-button").addEventListener("click", resetExam);

const savedUser = getCurrentUser();
if (savedUser) enterApp(savedUser.id);
else showLogin();
