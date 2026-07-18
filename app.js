/* global STUDY_DATA */
"use strict";

(function runApp() {
  const DATA = window.STUDY_DATA;
  const BLANK = "__blank";
  const STORE_KEY = "multiconcurso.study.v1";
  const SESSION_KEY = "multiconcurso.session.v1";
  const TABS = [
    ["dashboard", "Dashboard"],
    ["treino", "Treino"],
    ["simulado", "Simulado"],
    ["revisao", "Revisão"],
    ["materias", "Matérias"],
    ["historico", "Histórico"],
    ["metas", "Metas"],
  ];

  const state = {
    currentUserId: null,
    activeContestId: null,
    activeRoleId: null,
    activeTab: "dashboard",
    showContestPicker: true,
    practice: {
      queueIds: [],
      answered: {},
      startedAt: {},
      mode: "modo-treino",
    },
    mock: null,
    timerInterval: null,
  };

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function percent(part, total, decimals = 0) {
    if (!total) return "0";
    return ((part / total) * 100).toFixed(decimals);
  }

  function formatDate(dateString) {
    if (!dateString) return "—";
    const [year, month, day] = dateString.split("-").map(Number);
    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(new Date(year, month - 1, day));
  }

  function daysUntil(dateString) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [year, month, day] = dateString.split("-").map(Number);
    const target = new Date(year, month - 1, day);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target - today) / 86400000);
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function safeNumber(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function normalizeAnswer(answer) {
    return answer === undefined || answer === null || answer === "" ? BLANK : answer;
  }

  function isBlank(answer) {
    return normalizeAnswer(answer) === BLANK;
  }

  function contestById(contestId = state.activeContestId) {
    return DATA.concursos.find((contest) => contest.id === contestId);
  }

  function roleById(contestId = state.activeContestId, roleId = state.activeRoleId) {
    return contestById(contestId)?.roles.find((role) => role.id === roleId);
  }

  function currentUserDef() {
    return DATA.users.find((user) => user.id === state.currentUserId);
  }

  function loadStore() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
      return parsed && typeof parsed === "object" ? parsed : { users: {} };
    } catch {
      return { users: {} };
    }
  }

  function saveStore(store) {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  }

  function withStore(mutator) {
    const store = loadStore();
    store.users = store.users || {};
    DATA.users.forEach((user) => {
      store.users[user.id] = store.users[user.id] || makeUserRecord(user.id);
    });
    const result = mutator(store);
    saveStore(store);
    return result;
  }

  function makeUserRecord(userId) {
    return {
      userId,
      selectedContestId: null,
      selectedRoleByContest: {},
      scopes: {},
      createdAt: nowIso(),
    };
  }

  function currentUserRecord(store = loadStore()) {
    store.users = store.users || {};
    store.users[state.currentUserId] = store.users[state.currentUserId] || makeUserRecord(state.currentUserId);
    return store.users[state.currentUserId];
  }

  function scopeKey(contestId = state.activeContestId, roleId = state.activeRoleId) {
    return `${contestId}::${roleId}`;
  }

  function makeScope() {
    return {
      answers: {},
      history: [],
      mocks: [],
      favorites: {},
      notes: {},
      reports: {},
      revisionMarked: {},
      goals: {
        dailyQuestions: 30,
        weeklyMocks: 2,
        reviewWrong: 20,
        targetAccuracy: 80,
      },
      createdAt: nowIso(),
    };
  }

  function getScope(store = loadStore(), contestId = state.activeContestId, roleId = state.activeRoleId) {
    const user = currentUserRecord(store);
    const key = scopeKey(contestId, roleId);
    user.scopes[key] = user.scopes[key] || makeScope();
    return user.scopes[key];
  }

  function persistScope(mutator) {
    return withStore((store) => {
      const scope = getScope(store);
      return mutator(scope, store);
    });
  }

  function questionsFor(contestId = state.activeContestId, roleId = state.activeRoleId) {
    return DATA.questoes.filter((question) => (
      question.concurso_id === contestId
      && question.cargos_compativeis.includes(roleId)
      && !["redacao", "discursiva"].includes(question.tipo)
    ));
  }

  function mattersFor(contestId = state.activeContestId, roleId = state.activeRoleId) {
    const contest = contestById(contestId);
    return (contest?.materias || []).filter((matter) => !matter.roleIds || matter.roleIds.includes(roleId));
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

  function shuffle(items, seedText = String(Date.now())) {
    const output = [...items];
    const random = seededRandom(seedText);
    for (let index = output.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(random() * (index + 1));
      [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
    }
    return output;
  }

  function evaluateAnswer(question, answer) {
    const role = roleById(question.concurso_id, state.activeRoleId);
    const scoring = role?.exam?.scoring || { correct: 1, wrong: 0, blank: 0 };
    const normalized = normalizeAnswer(answer);
    if (normalized === BLANK) {
      return {
        answer: BLANK,
        correct: false,
        blank: true,
        score: scoring.blank,
        result: "blank",
      };
    }
    const correct = normalized === question.resposta_correta;
    return {
      answer: normalized,
      correct,
      blank: false,
      score: correct ? scoring.correct : scoring.wrong,
      result: correct ? "correct" : "wrong",
    };
  }

  function recordAnswer(question, answer, mode, startedAt, simuladoId = null) {
    const evaluation = evaluateAnswer(question, answer);
    const timeSpentMs = startedAt ? Math.max(0, Date.now() - startedAt) : 0;
    const record = {
      id: `${Date.now()}-${question.id}-${Math.random().toString(16).slice(2)}`,
      user_id: state.currentUserId,
      concurso_id: state.activeContestId,
      cargo_id: state.activeRoleId,
      questao_id: question.id,
      materia_id: question.materia_id,
      materia: question.materia,
      assunto_id: question.assunto_id,
      assunto: question.assunto,
      subassunto: question.subassunto,
      dificuldade: question.dificuldade,
      resposta_marcada: evaluation.answer,
      resposta_correta: question.resposta_correta,
      correto: evaluation.correct,
      em_branco: evaluation.blank,
      pontuacao: evaluation.score,
      tempo_ms: timeSpentMs,
      data: nowIso(),
      simulado_id: simuladoId,
      modo: mode,
    };

    persistScope((scope) => {
      const previous = scope.answers[question.id] || {
        questao_id: question.id,
        attempts: 0,
        correctAttempts: 0,
        wrongAttempts: 0,
        blankAttempts: 0,
        totalTimeMs: 0,
        firstAnsweredAt: record.data,
      };
      previous.attempts += 1;
      previous.correctAttempts += evaluation.correct ? 1 : 0;
      previous.wrongAttempts += evaluation.result === "wrong" ? 1 : 0;
      previous.blankAttempts += evaluation.blank ? 1 : 0;
      previous.totalTimeMs += timeSpentMs;
      previous.lastAnswer = evaluation.answer;
      previous.lastCorrect = evaluation.correct;
      previous.lastBlank = evaluation.blank;
      previous.lastScore = evaluation.score;
      previous.lastMode = mode;
      previous.lastAnsweredAt = record.data;
      previous.lastTimeMs = timeSpentMs;
      scope.answers[question.id] = previous;
      scope.history.unshift(record);
      scope.history = scope.history.slice(0, 1500);
    });

    return record;
  }

  function summaryFromScope(scope, questionSet = questionsFor()) {
    const answerValues = Object.values(scope.answers || {}).filter((answer) => questionSet.some((question) => question.id === answer.questao_id));
    const uniqueAnswered = answerValues.length;
    const history = (scope.history || []).filter((record) => record.concurso_id === state.activeContestId && record.cargo_id === state.activeRoleId);
    const correct = history.filter((record) => record.correto).length;
    const wrong = history.filter((record) => !record.correto && !record.em_branco).length;
    const blank = history.filter((record) => record.em_branco).length;
    const total = correct + wrong + blank;
    const score = history.reduce((sum, record) => sum + safeNumber(record.pontuacao), 0);
    return {
      totalQuestions: questionSet.length,
      uniqueAnswered,
      progress: Number(percent(uniqueAnswered, questionSet.length, 1)),
      correct,
      wrong,
      blank,
      attempts: total,
      accuracy: Number(percent(correct, correct + wrong, 1)),
      score,
      mocks: scope.mocks?.length || 0,
      favorites: Object.keys(scope.favorites || {}).length,
      avgTimeSeconds: total ? Math.round(history.reduce((sum, record) => sum + safeNumber(record.tempo_ms), 0) / total / 1000) : 0,
    };
  }

  function performanceByMatter(scope, questionSet = questionsFor()) {
    const matterMap = Object.fromEntries(mattersFor().map((matter) => [matter.id, {
      id: matter.id,
      nome: matter.nome,
      bloco: matter.bloco,
      total: questionSet.filter((question) => question.materia_id === matter.id).length,
      answered: 0,
      correct: 0,
      wrong: 0,
      blank: 0,
      lastAt: null,
    }]));

    Object.values(scope.answers || {}).forEach((answer) => {
      const question = questionSet.find((item) => item.id === answer.questao_id);
      if (!question || !matterMap[question.materia_id]) return;
      const matter = matterMap[question.materia_id];
      matter.answered += 1;
      matter.correct += answer.lastCorrect ? 1 : 0;
      matter.wrong += !answer.lastCorrect && !answer.lastBlank ? 1 : 0;
      matter.blank += answer.lastBlank ? 1 : 0;
      matter.lastAt = answer.lastAnsweredAt;
    });

    return Object.values(matterMap).map((matter) => ({
      ...matter,
      progress: Number(percent(matter.answered, matter.total, 1)),
      accuracy: Number(percent(matter.correct, matter.correct + matter.wrong, 1)),
      priority: matter.answered === 0 ? "Alta" : matter.accuracy < 60 ? "Alta" : matter.accuracy < 75 ? "Média" : "Manutenção",
    }));
  }

  function weakTopics(scope, limit = 8) {
    const questionSet = questionsFor();
    const buckets = {};
    Object.values(scope.answers || {}).forEach((answer) => {
      const question = questionSet.find((item) => item.id === answer.questao_id);
      if (!question) return;
      if (answer.lastCorrect) return;
      const key = `${question.materia} — ${question.assunto}`;
      buckets[key] = buckets[key] || { label: key, count: 0, blank: 0, wrong: 0 };
      buckets[key].count += 1;
      buckets[key].blank += answer.lastBlank ? 1 : 0;
      buckets[key].wrong += !answer.lastBlank ? 1 : 0;
    });
    return Object.values(buckets).sort((a, b) => b.count - a.count).slice(0, limit);
  }

  function smartRevisionQuestions(scope, limit = 15) {
    const questionSet = questionsFor();
    const scored = questionSet.map((question) => {
      const answer = scope.answers[question.id];
      const favorite = Boolean(scope.favorites?.[question.id]);
      const marked = Boolean(scope.revisionMarked?.[question.id]);
      const notAnswered = !answer;
      const wrong = answer && !answer.lastCorrect && !answer.lastBlank;
      const blank = answer && answer.lastBlank;
      const slow = answer && answer.lastTimeMs > 90000;
      let score = 0;
      if (wrong) score += 7;
      if (blank) score += 5;
      if (favorite) score += 4;
      if (marked) score += 4;
      if (slow) score += 3;
      if (notAnswered) score += 2;
      if (question.dificuldade === "dificil") score += 1;
      return { question, score };
    });
    return scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.question);
  }

  function init() {
    renderProfiles();
    bindEvents();
    withStore(() => null);

    const session = readSession();
    if (session?.currentUserId && DATA.users.some((user) => user.id === session.currentUserId)) {
      login(session.currentUserId, { silent: true });
    } else {
      showLogin();
    }
  }

  function readSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch {
      return null;
    }
  }

  function writeSession() {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      currentUserId: state.currentUserId,
      activeContestId: state.activeContestId,
      activeRoleId: state.activeRoleId,
    }));
  }

  function showLogin() {
    $("#login-screen").hidden = false;
    $("#app-shell").hidden = true;
    state.currentUserId = null;
    state.activeContestId = null;
    state.activeRoleId = null;
    stopTimer();
  }

  function login(userId, options = {}) {
    state.currentUserId = userId;
    const store = loadStore();
    const record = currentUserRecord(store);
    const savedContestId = record.selectedContestId;
    const session = readSession();
    const contestId = session?.currentUserId === userId && session?.activeContestId ? session.activeContestId : savedContestId;
    state.activeContestId = DATA.concursos.some((contest) => contest.id === contestId) ? contestId : null;
    state.activeRoleId = state.activeContestId
      ? record.selectedRoleByContest[state.activeContestId] || contestById(state.activeContestId).defaultRoleId
      : null;
    state.showContestPicker = !state.activeContestId;
    $("#login-screen").hidden = true;
    $("#app-shell").hidden = false;
    writeSession();
    resetTransientState();
    renderApp();
    if (!options.silent && !state.activeContestId) {
      $("#contest-picker")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function resetTransientState() {
    state.practice = { queueIds: [], answered: {}, startedAt: {}, mode: "modo-treino" };
    state.mock = null;
    stopTimer();
  }

  function selectContest(contestId) {
    withStore((store) => {
      const user = currentUserRecord(store);
      const contest = contestById(contestId);
      user.selectedContestId = contestId;
      user.selectedRoleByContest[contestId] = user.selectedRoleByContest[contestId] || contest.defaultRoleId;
      state.activeContestId = contestId;
      state.activeRoleId = user.selectedRoleByContest[contestId];
      getScope(store, state.activeContestId, state.activeRoleId);
    });
    state.activeTab = "dashboard";
    state.showContestPicker = false;
    resetTransientState();
    writeSession();
    renderApp();
  }

  function changeRole(roleId) {
    const contest = contestById();
    if (!contest.roles.some((role) => role.id === roleId)) return;
    withStore((store) => {
      const user = currentUserRecord(store);
      user.selectedRoleByContest[state.activeContestId] = roleId;
      state.activeRoleId = roleId;
      getScope(store, state.activeContestId, state.activeRoleId);
    });
    state.activeTab = "dashboard";
    resetTransientState();
    writeSession();
    renderApp();
  }

  function renderProfiles() {
    $("#profile-options").innerHTML = DATA.users.map((user) => `
      <button class="profile-card" type="button" data-login-user="${escapeHtml(user.id)}">
        <span class="profile-card__avatar profile-card__avatar--${escapeHtml(user.accent)}">${escapeHtml(user.initial)}</span>
        <span><strong>${escapeHtml(user.displayName)}</strong><small>@${escapeHtml(user.username)} · Entrar no painel</small></span>
        <span aria-hidden="true">→</span>
      </button>
    `).join("");
  }

  function renderApp() {
    renderHeader();
    renderContestPicker();
    if (!state.activeContestId || state.showContestPicker) {
      $("#workspace").hidden = true;
      $("#contest-picker").hidden = false;
      return;
    }
    $("#workspace").hidden = false;
    $("#contest-picker").hidden = true;
    renderTabs();
    renderActiveTab();
  }

  function renderHeader() {
    const user = currentUserDef();
    $("#top-user-name").textContent = user ? `Olá, ${user.displayName}` : "";
    $("#change-contest").hidden = !state.activeContestId;

    const contest = contestById();
    const role = roleById();
    if (!contest || state.showContestPicker) {
      $("#hero-eyebrow").textContent = "Escolha seu concurso";
      $("#hero-title").textContent = "Plataforma de estudos segmentada";
      $("#hero-copy").textContent = "Selecione CRT-SP, IBGE ou Prefeitura de Santos para carregar matérias, formato da banca, questões, simulados e estatísticas independentes.";
      $("#hero-notice").textContent = "Nada se mistura: usuário + concurso + cargo têm progresso próprio.";
      $("#active-contest-card").innerHTML = `
        <span class="chip">3 concursos</span>
        <h2>Mapa de prova</h2>
        <p>CRT-SP em prioridade máxima, IBGE em segundo plano e Santos como terceira trilha.</p>
      `;
      return;
    }

    const total = questionsFor().length;
    const days = daysUntil(contest.dataProva);
    $("#hero-eyebrow").textContent = `${contest.orgao} · ${contest.banca}`;
    $("#hero-title").innerHTML = `${escapeHtml(contest.nome)}<br><span>${escapeHtml(role.nome)}</span>`;
    $("#hero-copy").textContent = `${contest.edital}. Prova em ${formatDate(contest.dataProva)}. Banco atual com ${total} questões para este cargo e progresso separado do restante.`;
    $("#hero-notice").textContent = contest.scoringDescription;
    $("#active-contest-card").innerHTML = `
      <span class="chip chip--active">Concurso ativo</span>
      <h2>${escapeHtml(contest.nome)}</h2>
      <p>${escapeHtml(role.nome)}</p>
      <div class="mini-grid">
        <span><strong>${total}</strong><small>questões</small></span>
        <span><strong>${days >= 0 ? days : 0}</strong><small>dias</small></span>
        <span><strong>${role.exam.totalQuestoes}</strong><small>itens/prova</small></span>
      </div>
      ${renderRoleSelector(contest, role)}
    `;
  }

  function renderRoleSelector(contest, activeRole) {
    if (contest.roles.length < 2) return "";
    return `
      <label class="field field--compact">
        <span>Cargo</span>
        <select id="role-select">
          ${contest.roles.map((role) => `<option value="${escapeHtml(role.id)}" ${role.id === activeRole.id ? "selected" : ""}>${escapeHtml(role.nome)}</option>`).join("")}
        </select>
      </label>
    `;
  }

  function renderContestPicker() {
    if (!state.currentUserId) return;
    const store = loadStore();
    const user = currentUserRecord(store);
    const cards = [...DATA.concursos].sort((a, b) => a.priority - b.priority).map((contest) => {
      const roleId = user.selectedRoleByContest[contest.id] || contest.defaultRoleId;
      const role = roleById(contest.id, roleId);
      const scope = getScope(store, contest.id, roleId);
      const questionSet = questionsFor(contest.id, roleId);
      const summary = summaryFromExternalScope(scope, questionSet, contest.id, roleId);
      const active = state.activeContestId === contest.id && !state.showContestPicker;
      return `
        <article class="contest-card ${active ? "contest-card--active" : ""}">
          <div class="contest-card__top">
            <span class="priority">Prioridade ${contest.priority}</span>
            <span class="chip">${escapeHtml(contest.status)}</span>
          </div>
          <h3>${escapeHtml(contest.nome)}</h3>
          <p>${escapeHtml(contest.orgao)}</p>
          <dl class="contest-facts">
            <div><dt>Banca</dt><dd>${escapeHtml(contest.banca)}</dd></div>
            <div><dt>Cargo</dt><dd>${escapeHtml(role.nome)}</dd></div>
            <div><dt>Nível</dt><dd>${escapeHtml(role.escolaridade || contest.nivel)}</dd></div>
            <div><dt>Prova</dt><dd>${formatDate(contest.dataProva)}</dd></div>
          </dl>
          <div class="contest-progress" aria-label="Progresso em ${escapeHtml(contest.nome)}">
            <span style="width:${summary.progress}%"></span>
          </div>
          <div class="mini-grid">
            <span><strong>${questionSet.length}</strong><small>questões</small></span>
            <span><strong>${summary.progress}%</strong><small>progresso</small></span>
            <span><strong>${summary.mocks}</strong><small>simulados</small></span>
            <span><strong>${summary.accuracy}%</strong><small>acertos</small></span>
          </div>
          <button class="primary-button" type="button" data-select-contest="${escapeHtml(contest.id)}">${active ? "Continuar" : "Estudar este concurso"}</button>
        </article>
      `;
    }).join("");

    $("#contest-picker").innerHTML = `
      <div class="section-heading">
        <p class="eyebrow">Seleção independente</p>
        <h2 id="contest-picker-title">Escolha o concurso</h2>
        <p>Ao entrar em um card, dashboard, simulados, matérias, revisão e histórico passam a usar só aquele concurso e cargo.</p>
      </div>
      <div class="contest-grid">${cards}</div>
    `;
  }

  function summaryFromExternalScope(scope, questionSet, contestId, roleId) {
    const answerValues = Object.values(scope.answers || {}).filter((answer) => questionSet.some((question) => question.id === answer.questao_id));
    const history = (scope.history || []).filter((record) => record.concurso_id === contestId && record.cargo_id === roleId);
    const correct = history.filter((record) => record.correto).length;
    const wrong = history.filter((record) => !record.correto && !record.em_branco).length;
    return {
      progress: Number(percent(answerValues.length, questionSet.length, 0)),
      accuracy: Number(percent(correct, correct + wrong, 0)),
      mocks: scope.mocks?.length || 0,
    };
  }

  function renderTabs() {
    $("#tabs").innerHTML = TABS.map(([id, label]) => `
      <button class="tab-button ${state.activeTab === id ? "is-active" : ""}" type="button" data-tab="${id}">${label}</button>
    `).join("");
  }

  function renderActiveTab() {
    const renderers = {
      dashboard: renderDashboard,
      treino: renderTreino,
      simulado: renderSimulado,
      revisao: renderRevisao,
      materias: renderMaterias,
      historico: renderHistorico,
      metas: renderMetas,
    };
    renderDashboardStrip();
    renderers[state.activeTab]?.();
  }

  function renderDashboardStrip() {
    const contest = contestById();
    const scope = getScope();
    const questionSet = questionsFor();
    const summary = summaryFromScope(scope, questionSet);
    const days = daysUntil(contest.dataProva);

    $("#dashboard").innerHTML = `
      <div class="dashboard-grid">
        ${metricCard("Progresso", `${summary.progress}%`, `${summary.uniqueAnswered}/${summary.totalQuestions} questões únicas`)}
        ${metricCard("Acertos", `${summary.accuracy}%`, `${summary.correct} certas · ${summary.wrong} erradas`)}
        ${metricCard("Pontuação líquida", summary.score, contest.scoringDescription)}
        ${metricCard("Até a prova", days >= 0 ? `${days} dias` : "Prova passada", formatDate(contest.dataProva))}
      </div>
    `;
  }

  function renderDashboard() {
    const contest = contestById();
    const role = roleById();
    const scope = getScope();
    const questionSet = questionsFor();
    const summary = summaryFromScope(scope, questionSet);
    const performances = performanceByMatter(scope, questionSet);
    const best = [...performances].filter((item) => item.answered).sort((a, b) => b.accuracy - a.accuracy).slice(0, 3);
    const worst = [...performances].sort((a, b) => (a.answered ? a.accuracy : -1) - (b.answered ? b.accuracy : -1)).slice(0, 3);
    const weak = weakTopics(scope, 6);

    $("#tab-content").innerHTML = `
      <div class="panel-grid panel-grid--wide">
        <section class="panel">
          <div class="section-heading section-heading--compact">
            <p class="eyebrow">${escapeHtml(contest.banca)} · ${escapeHtml(role.exam.formato.replace("_", "/"))}</p>
            <h2>${escapeHtml(contest.nome)} — ${escapeHtml(role.nome)}</h2>
            <p>${escapeHtml(contest.edital)} · ${escapeHtml(contest.scoringDescription)}</p>
          </div>
          <div class="exam-map">
            ${role.exam.distribution.map((item) => `
              <div>
                <span>${escapeHtml(item.label)}</span>
                <strong>${item.count}</strong>
              </div>
            `).join("")}
          </div>
          <ul class="check-list">
            ${contest.criterios.map((criterion) => `<li>${escapeHtml(criterion)}</li>`).join("")}
          </ul>
        </section>

        <section class="panel">
          <div class="section-heading section-heading--compact">
            <p class="eyebrow">Revisão de hoje</p>
            <h2>Estudo diário sugerido</h2>
          </div>
          ${renderDailyStudy(contest, weak)}
        </section>
      </div>

      <div class="panel-grid">
        <section class="panel">
          <h3>Melhores matérias</h3>
          ${renderPerformanceList(best, "Ainda não há matérias respondidas. Faça um treino rápido para começar.")}
        </section>
        <section class="panel">
          <h3>Piores matérias / prioridade</h3>
          ${renderPerformanceList(worst, "Sem dados suficientes. As matérias aparecem aqui depois das primeiras respostas.")}
        </section>
        <section class="panel">
          <h3>Últimos simulados</h3>
          ${renderMockList(scope.mocks?.slice(0, 5) || [])}
        </section>
      </div>
    `;
  }

  function metricCard(label, value, hint) {
    return `
      <article class="metric-card">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
        <small>${escapeHtml(hint)}</small>
      </article>
    `;
  }

  function renderDailyStudy(contest, weak) {
    const base = contest.studySuggestions || [];
    const weakItems = weak.length
      ? weak.map((item) => `<li>Revisar <strong>${escapeHtml(item.label)}</strong> (${item.wrong} erros, ${item.blank} em branco).</li>`).join("")
      : "<li>Responder 20 questões novas e marcar dúvidas para revisão inteligente.</li>";
    return `
      <ol class="study-plan">
        <li>20 min de teoria/lei seca do edital ativo.</li>
        <li>30 min de questões no modo treino, com explicação aberta após responder.</li>
        <li>15 min revisando erros e brancos.</li>
        ${weakItems}
      </ol>
      <div class="tip-box">
        ${base.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
      </div>
    `;
  }

  function renderPerformanceList(items, empty) {
    if (!items.length) return `<p class="empty">${escapeHtml(empty)}</p>`;
    return `
      <div class="matter-list">
        ${items.map((item) => `
          <article class="matter-mini">
            <div>
              <strong>${escapeHtml(item.nome)}</strong>
              <small>${escapeHtml(item.bloco)} · ${item.answered}/${item.total} respondidas</small>
            </div>
            <span>${item.accuracy}%</span>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderMockList(mocks) {
    if (!mocks.length) return `<p class="empty">Nenhum simulado finalizado neste concurso/cargo ainda.</p>`;
    return `
      <div class="history-list">
        ${mocks.map((mock) => `
          <article class="history-item">
            <strong>${escapeHtml(mock.title)}</strong>
            <span>${mock.correct} acertos · ${mock.wrong} erros · ${mock.blank} brancos · ${mock.score} pontos</span>
            <small>${formatDate(mock.finishedAt.slice(0, 10))}</small>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderTreino() {
    const matters = mattersFor();
    const subjects = [...new Set(questionsFor().map((question) => question.assunto))].sort();
    if (!state.practice.queueIds.length) {
      state.practice.queueIds = buildPracticeQueue({ mode: "modo-treino", quantity: 10 }).map((question) => question.id);
      state.practice.startedAt = Object.fromEntries(state.practice.queueIds.map((id) => [id, Date.now()]));
    }
    const queue = state.practice.queueIds.map((id) => questionsFor().find((question) => question.id === id)).filter(Boolean);

    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading section-heading--compact">
          <p class="eyebrow">Modos de estudo</p>
          <h2>Treino com correção imediata</h2>
          <p>Depois de responder, o card mostra se você acertou, a explicação, a fonte, links de estudo, favorita, denúncia e anotação.</p>
        </div>
        <div class="filters">
          <label class="field">
            <span>Modo</span>
            <select id="practice-mode">
              <option value="modo-treino">Modo treino</option>
              <option value="por-materia">Estudar por matéria</option>
              <option value="por-assunto">Estudar por assunto</option>
              <option value="aleatorias">Questões aleatórias</option>
              <option value="nao-respondidas">Questões não respondidas</option>
              <option value="erradas">Questões erradas</option>
              <option value="favoritas">Questões favoritas</option>
              <option value="revisao-rapida">Revisão rápida</option>
            </select>
          </label>
          <label class="field">
            <span>Matéria</span>
            <select id="practice-matter">
              <option value="">Todas</option>
              ${matters.map((matter) => `<option value="${escapeHtml(matter.id)}">${escapeHtml(matter.nome)}</option>`).join("")}
            </select>
          </label>
          <label class="field">
            <span>Assunto</span>
            <select id="practice-subject">
              <option value="">Todos</option>
              ${subjects.map((subject) => `<option value="${escapeHtml(subject)}">${escapeHtml(subject)}</option>`).join("")}
            </select>
          </label>
          <label class="field">
            <span>Dificuldade</span>
            <select id="practice-difficulty">
              <option value="">Mista</option>
              <option value="facil">Fácil</option>
              <option value="medio">Média</option>
              <option value="dificil">Difícil</option>
            </select>
          </label>
          <label class="field">
            <span>Quantidade</span>
            <input id="practice-quantity" type="number" min="1" max="50" value="10">
          </label>
          <button class="primary-button" type="button" data-generate-practice>Gerar lista</button>
        </div>
      </section>
      <section class="question-stack">
        ${queue.length ? queue.map((question, index) => renderQuestionCard(question, { context: "practice", index })).join("") : renderEmptyQuestions()}
      </section>
    `;
    restorePracticeFilters();
  }

  function restorePracticeFilters() {
    $("#practice-mode").value = state.practice.mode || "modo-treino";
  }

  function buildPracticeQueue(options = {}) {
    const scope = getScope();
    const mode = options.mode || $("#practice-mode")?.value || "modo-treino";
    const matterId = options.matterId ?? $("#practice-matter")?.value ?? "";
    const subject = options.subject ?? $("#practice-subject")?.value ?? "";
    const difficulty = options.difficulty ?? $("#practice-difficulty")?.value ?? "";
    const quantity = safeNumber(options.quantity ?? $("#practice-quantity")?.value, 10);
    let list = questionsFor();

    if (mode === "por-materia" && matterId) list = list.filter((question) => question.materia_id === matterId);
    if (mode === "por-assunto" && subject) list = list.filter((question) => question.assunto === subject);
    if (mode === "nao-respondidas") list = list.filter((question) => !scope.answers[question.id]);
    if (mode === "erradas") list = list.filter((question) => scope.answers[question.id] && !scope.answers[question.id].lastCorrect && !scope.answers[question.id].lastBlank);
    if (mode === "favoritas") list = list.filter((question) => scope.favorites[question.id]);
    if (mode === "revisao-rapida") list = smartRevisionQuestions(scope, Math.max(quantity, 15));
    if (mode === "aleatorias" || mode === "modo-treino") {
      if (matterId) list = list.filter((question) => question.materia_id === matterId);
      if (subject) list = list.filter((question) => question.assunto === subject);
    }
    if (difficulty) list = list.filter((question) => question.dificuldade === difficulty);

    return shuffle(list, `${state.currentUserId}-${state.activeContestId}-${state.activeRoleId}-${mode}-${Date.now()}`).slice(0, Math.max(1, quantity));
  }

  function generatePracticeFromFilters() {
    const mode = $("#practice-mode").value;
    const queue = buildPracticeQueue({
      mode,
      matterId: $("#practice-matter").value,
      subject: $("#practice-subject").value,
      difficulty: $("#practice-difficulty").value,
      quantity: $("#practice-quantity").value,
    });
    state.practice.mode = mode;
    state.practice.queueIds = queue.map((question) => question.id);
    state.practice.answered = {};
    state.practice.startedAt = Object.fromEntries(queue.map((question) => [question.id, Date.now()]));
    renderTreino();
  }

  function renderEmptyQuestions() {
    return `
      <article class="panel empty-state">
        <h3>Nenhuma questão encontrada</h3>
        <p>Troque o filtro ou responda mais questões para alimentar este modo.</p>
      </article>
    `;
  }

  function renderQuestionCard(question, options = {}) {
    const scope = getScope();
    const isPractice = options.context === "practice" || options.context === "revision";
    const isMock = options.context === "mock";
    const mockAnswer = isMock ? normalizeAnswer(state.mock?.answers?.[question.id]) : undefined;
    const practiceAnswer = state.practice.answered[question.id];
    const selected = isMock ? mockAnswer : normalizeAnswer(practiceAnswer);
    const showCorrection = options.showCorrection || (!isMock && practiceAnswer !== undefined);
    const evaluation = showCorrection ? evaluateAnswer(question, selected) : null;
    const favorite = Boolean(scope.favorites?.[question.id]);
    const note = scope.notes?.[question.id];
    const answeredBefore = scope.answers?.[question.id];
    const cardClass = showCorrection
      ? evaluation.blank ? "question-card--blank" : evaluation.correct ? "question-card--correct" : "question-card--wrong"
      : "";

    return `
      <article class="question-card ${cardClass}" id="q-${escapeHtml(question.id)}">
        <button class="question-card__summary" type="button" data-toggle-question="${escapeHtml(question.id)}">
          <span class="question-number">${escapeHtml(options.index !== undefined ? options.index + 1 : question.id)}</span>
          <span>
            <strong>${escapeHtml(question.materia)}</strong>
            <small>${escapeHtml(question.assunto)} · ${escapeHtml(question.dificuldade)} · ${escapeHtml(question.tipo.replace("_", "/"))}</small>
          </span>
          ${showCorrection ? renderResultBadge(evaluation) : answeredBefore ? `<span class="badge badge--neutral">já respondida</span>` : `<span class="badge badge--neutral">nova</span>`}
        </button>

        <div class="question-card__body">
          <p class="statement">${escapeHtml(question.enunciado)}</p>
          <div class="meta-row">
            <span>${escapeHtml(question.banca)}</span>
            <span>${escapeHtml(question.origem)}</span>
            <span>${escapeHtml(question.fonte)}</span>
          </div>
          ${renderAnswerButtons(question, { isPractice, isMock, selected, showCorrection })}
          <div class="question-actions">
            <button class="ghost-button" type="button" data-toggle-favorite="${escapeHtml(question.id)}">${favorite ? "★ Favorita" : "☆ Favoritar"}</button>
            <button class="ghost-button" type="button" data-mark-review="${escapeHtml(question.id)}">Marcar revisão</button>
            <button class="ghost-button" type="button" data-add-note="${escapeHtml(question.id)}">Anotação</button>
            <button class="ghost-button ghost-button--danger" type="button" data-report-question="${escapeHtml(question.id)}">Denunciar erro</button>
          </div>
          ${note ? `<p class="note-box"><strong>Sua anotação:</strong> ${escapeHtml(note)}</p>` : ""}
          ${showCorrection ? renderExplanation(question, evaluation, isMock) : `<p class="locked-explanation">${isMock ? "Explicação bloqueada até finalizar o simulado." : "Responda para liberar explicação, fonte e links de estudo."}</p>`}
        </div>
      </article>
    `;
  }

  function renderResultBadge(evaluation) {
    if (evaluation.blank) return `<span class="badge badge--blank">Em branco</span>`;
    if (evaluation.correct) return `<span class="badge badge--correct">Certa</span>`;
    return `<span class="badge badge--wrong">Errada</span>`;
  }

  function renderAnswerButtons(question, context) {
    if (question.tipo === "certo_errado" || question.tipo === "verdadeiro_falso") {
      return `
        <div class="answer-grid answer-grid--ce">
          ${choiceButton(question, "C", "Certo", context)}
          ${choiceButton(question, "E", "Errado", context)}
          ${choiceButton(question, BLANK, "Em branco", context)}
        </div>
      `;
    }

    return `
      <div class="answer-grid">
        ${question.alternativas.map((option) => choiceButton(question, option.label, `${option.label}) ${option.text}`, context)).join("")}
        ${choiceButton(question, BLANK, "Em branco", context)}
      </div>
    `;
  }

  function choiceButton(question, value, label, context) {
    const selected = normalizeAnswer(context.selected) === value;
    const correctChoice = value === question.resposta_correta;
    const shouldMark = context.showCorrection;
    const classes = [
      "answer-button",
      selected ? "is-selected" : "",
      shouldMark && correctChoice ? "is-correct-choice" : "",
      shouldMark && selected && !correctChoice && value !== BLANK ? "is-wrong-choice" : "",
      shouldMark && selected && value === BLANK ? "is-blank-choice" : "",
    ].filter(Boolean).join(" ");
    const attr = context.isMock ? `data-mock-answer="${escapeHtml(question.id)}" data-answer="${escapeHtml(value)}"` : `data-practice-answer="${escapeHtml(question.id)}" data-answer="${escapeHtml(value)}"`;
    const disabled = context.showCorrection && !context.isMock ? "disabled" : "";
    return `<button class="${classes}" type="button" ${attr} ${disabled}>${escapeHtml(label)}</button>`;
  }

  function renderExplanation(question, evaluation, compact = false) {
    const links = studyLinks(question);
    return `
      <details class="explanation" ${compact ? "" : "open"}>
        <summary>${compact ? "Ver explicação e fonte" : "Explicação"}</summary>
        <p>${escapeHtml(question.explicacao)}</p>
        <p><strong>Gabarito:</strong> ${escapeHtml(question.resposta_correta)} · <strong>Sua resposta:</strong> ${escapeHtml(evaluation.answer === BLANK ? "Em branco" : evaluation.answer)} · <strong>Pontuação:</strong> ${evaluation.score}</p>
        <div class="study-links">
          ${links.map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`).join("")}
        </div>
      </details>
    `;
  }

  function studyLinks(question) {
    const links = [{ label: question.fonte, url: question.link }];
    const contest = contestById(question.concurso_id);
    if (contest?.editalUrl && contest.editalUrl !== question.link) {
      links.push({ label: `Edital ${contest.nome}`, url: contest.editalUrl });
    }
    if (question.tags.includes("portugues")) links.push({ label: "Manual de Redação oficial", url: DATA.sources.manual_redacao.url });
    if (question.tags.includes("lgpd")) links.push({ label: "Lei 13.709/2018", url: DATA.sources.lgpd.url });
    if (question.tags.includes("lai")) links.push({ label: "Lei 12.527/2011", url: DATA.sources.lai.url });
    if (question.tags.includes("sistema-cft-crt") || question.tags.includes("lei-13639")) links.push({ label: "Lei 13.639/2018", url: DATA.sources.lei_13639.url });
    return links.slice(0, 4);
  }

  function renderSimulado() {
    const contest = contestById();
    const role = roleById();
    if (state.mock) {
      renderActiveMock();
      return;
    }

    const matters = mattersFor();
    $("#tab-content").innerHTML = `
      <div class="panel-grid panel-grid--wide">
        <section class="panel">
          <div class="section-heading section-heading--compact">
            <p class="eyebrow">Simulado completo</p>
            <h2>Modelo do edital ativo</h2>
            <p>${escapeHtml(contest.nome)} · ${escapeHtml(role.nome)} · ${role.exam.totalQuestoes} questões · ${role.exam.duracaoMinutos} minutos.</p>
          </div>
          <div class="exam-map">
            ${role.exam.distribution.map((item) => `<div><span>${escapeHtml(item.label)}</span><strong>${item.count}</strong></div>`).join("")}
          </div>
          <div class="button-row">
            <button class="primary-button" type="button" data-start-mock="complete" data-mock-mode="prova">Iniciar modo prova</button>
            <button class="secondary-button" type="button" data-start-mock="complete" data-mock-mode="treino">Completo com correção no fim</button>
          </div>
        </section>

        <section class="panel">
          <div class="section-heading section-heading--compact">
            <p class="eyebrow">Simulado personalizado</p>
            <h2>Escolha filtros</h2>
            <p>Permite concurso/cargo ativo, matérias, quantidade, dificuldade, novas, erradas, favoritas, tempo e modo de correção.</p>
          </div>
          <div class="filters filters--compact">
            <label class="field">
              <span>Matéria</span>
              <select id="custom-matter">
                <option value="">Todas</option>
                ${matters.map((matter) => `<option value="${escapeHtml(matter.id)}">${escapeHtml(matter.nome)}</option>`).join("")}
              </select>
            </label>
            <label class="field">
              <span>Fonte de questões</span>
              <select id="custom-source">
                <option value="todas">Todas</option>
                <option value="novas">Novas</option>
                <option value="erradas">Erradas</option>
                <option value="favoritas">Favoritas</option>
              </select>
            </label>
            <label class="field">
              <span>Dificuldade</span>
              <select id="custom-difficulty">
                <option value="">Mista</option>
                <option value="facil">Fácil</option>
                <option value="medio">Média</option>
                <option value="dificil">Difícil</option>
              </select>
            </label>
            <label class="field">
              <span>Quantidade</span>
              <input id="custom-quantity" type="number" min="5" max="${questionsFor().length}" value="20">
            </label>
            <label class="field">
              <span>Tempo em minutos</span>
              <input id="custom-time" type="number" min="5" value="${Math.min(60, role.exam.duracaoMinutos)}">
            </label>
            <label class="field">
              <span>Correção</span>
              <select id="custom-mode">
                <option value="prova">Modo prova</option>
                <option value="treino">Modo treino</option>
              </select>
            </label>
            <button class="primary-button" type="button" data-start-mock="custom">Iniciar personalizado</button>
          </div>
        </section>
      </div>
      ${renderWritingBox(role)}
    `;
  }

  function renderWritingBox(role) {
    if (!role.exam.writing) return "";
    return `
      <section class="panel">
        <div class="section-heading section-heading--compact">
          <p class="eyebrow">Redação prevista no edital</p>
          <h2>Treino manual de redação</h2>
          <p>O site não corrige redação automaticamente. Use as propostas abaixo para treinar ${escapeHtml(role.exam.writing.linhas)} e conferir coesão, clareza e fuga ao tema.</p>
        </div>
        <div class="writing-prompts">
          ${role.exam.writing.propostas.map((prompt) => `<article>${escapeHtml(prompt)}</article>`).join("")}
        </div>
      </section>
    `;
  }

  function buildExamQueue() {
    const role = roleById();
    const selected = [];
    const all = questionsFor();
    role.exam.distribution.forEach((item) => {
      const pool = all.filter((question) => (
        item.kind === "bloco" ? question.bloco === item.id : question.materia_id === item.id
      ) && !selected.includes(question));
      selected.push(...shuffle(pool, `${state.currentUserId}-${item.id}-${Date.now()}`).slice(0, item.count));
    });
    if (selected.length < role.exam.totalQuestoes) {
      const fill = shuffle(all.filter((question) => !selected.includes(question)), `${state.currentUserId}-fill-${Date.now()}`)
        .slice(0, role.exam.totalQuestoes - selected.length);
      selected.push(...fill);
    }
    return selected.slice(0, role.exam.totalQuestoes);
  }

  function buildCustomMockQueue() {
    const scope = getScope();
    const matterId = $("#custom-matter").value;
    const source = $("#custom-source").value;
    const difficulty = $("#custom-difficulty").value;
    const quantity = safeNumber($("#custom-quantity").value, 20);
    let pool = questionsFor();
    if (matterId) pool = pool.filter((question) => question.materia_id === matterId);
    if (difficulty) pool = pool.filter((question) => question.dificuldade === difficulty);
    if (source === "novas") pool = pool.filter((question) => !scope.answers[question.id]);
    if (source === "erradas") pool = pool.filter((question) => scope.answers[question.id] && !scope.answers[question.id].lastCorrect && !scope.answers[question.id].lastBlank);
    if (source === "favoritas") pool = pool.filter((question) => scope.favorites[question.id]);
    return shuffle(pool, `${state.currentUserId}-custom-${Date.now()}`).slice(0, quantity);
  }

  function startMock(kind, mode) {
    const role = roleById();
    const queue = kind === "complete" ? buildExamQueue() : buildCustomMockQueue();
    if (!queue.length) {
      alert("Nenhuma questão encontrada para esse simulado. Ajuste os filtros.");
      return;
    }
    const durationMinutes = kind === "complete" ? role.exam.duracaoMinutos : safeNumber($("#custom-time")?.value, role.exam.duracaoMinutos);
    state.mock = {
      id: `sim-${Date.now()}`,
      title: kind === "complete" ? "Simulado completo" : "Simulado personalizado",
      kind,
      mode,
      queueIds: queue.map((question) => question.id),
      answers: {},
      startedAt: Date.now(),
      durationSeconds: durationMinutes * 60,
      finished: false,
      result: null,
    };
    startTimer();
    renderActiveMock();
  }

  function startTimer() {
    stopTimer();
    state.timerInterval = window.setInterval(() => {
      const timer = $("#timer");
      if (!timer || !state.mock || state.mock.finished) return;
      timer.textContent = formatRemaining();
      if (remainingSeconds() <= 0) {
        finishMock();
      }
    }, 1000);
  }

  function stopTimer() {
    if (state.timerInterval) {
      window.clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  function remainingSeconds() {
    if (!state.mock) return 0;
    const elapsed = Math.floor((Date.now() - state.mock.startedAt) / 1000);
    return Math.max(0, state.mock.durationSeconds - elapsed);
  }

  function formatRemaining() {
    const seconds = state.mock?.finished ? state.mock.remainingAtFinish ?? 0 : remainingSeconds();
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  function renderActiveMock() {
    const queue = state.mock.queueIds.map((id) => questionsFor().find((question) => question.id === id)).filter(Boolean);
    const answered = Object.keys(state.mock.answers).length;
    const resultHtml = state.mock.finished ? renderMockResult(queue) : "";
    $("#tab-content").innerHTML = `
      <section class="panel mock-bar">
        <div>
          <p class="eyebrow">${escapeHtml(state.mock.title)} · ${escapeHtml(state.mock.mode === "prova" ? "Modo prova" : "Modo treino")}</p>
          <h2>${answered}/${queue.length} respondidas</h2>
          <p>${state.mock.finished ? "Simulado finalizado. Clique em cada questão para abrir a explicação." : "As explicações ficam bloqueadas até finalizar."}</p>
        </div>
        <div class="timer" id="timer">${formatRemaining()}</div>
        <div class="button-row">
          ${state.mock.finished ? `<button class="secondary-button" type="button" data-reset-mock>Novo simulado</button>` : `<button class="primary-button" type="button" data-finish-mock>Finalizar simulado</button>`}
          <button class="ghost-button" type="button" data-reset-mock>Reiniciar</button>
        </div>
      </section>
      ${resultHtml}
      <section class="question-stack">
        ${queue.map((question, index) => renderQuestionCard(question, { context: "mock", index, showCorrection: state.mock.finished })).join("")}
      </section>
    `;
  }

  function finishMock() {
    if (!state.mock || state.mock.finished) return;
    const queue = state.mock.queueIds.map((id) => questionsFor().find((question) => question.id === id)).filter(Boolean);
    const simuladoId = state.mock.id;
    const startedAt = state.mock.startedAt;
    const records = queue.map((question) => {
      const answer = state.mock.answers[question.id] || BLANK;
      return recordAnswer(question, answer, `simulado-${state.mock.mode}`, startedAt, simuladoId);
    });
    const result = calculateMockResult(queue, records);
    state.mock.finished = true;
    state.mock.remainingAtFinish = remainingSeconds();
    state.mock.result = result;
    stopTimer();
    persistScope((scope) => {
      scope.mocks.unshift({
        id: simuladoId,
        title: state.mock.title,
        kind: state.mock.kind,
        mode: state.mock.mode,
        concurso_id: state.activeContestId,
        cargo_id: state.activeRoleId,
        total: result.total,
        correct: result.correct,
        wrong: result.wrong,
        blank: result.blank,
        score: result.score,
        accuracy: result.accuracy,
        finishedAt: nowIso(),
      });
      scope.mocks = scope.mocks.slice(0, 100);
    });
    renderDashboardStrip();
    renderActiveMock();
  }

  function calculateMockResult(queue, records) {
    const byQuestion = Object.fromEntries(records.map((record) => [record.questao_id, record]));
    const totals = queue.reduce((acc, question) => {
      const record = byQuestion[question.id];
      if (record.correto) acc.correct += 1;
      else if (record.em_branco) acc.blank += 1;
      else acc.wrong += 1;
      acc.score += safeNumber(record.pontuacao);
      const key = question.bloco || question.materia;
      acc.byBlock[key] = acc.byBlock[key] || { label: key, total: 0, correct: 0, wrong: 0, blank: 0, score: 0 };
      acc.byBlock[key].total += 1;
      acc.byBlock[key].correct += record.correto ? 1 : 0;
      acc.byBlock[key].wrong += !record.correto && !record.em_branco ? 1 : 0;
      acc.byBlock[key].blank += record.em_branco ? 1 : 0;
      acc.byBlock[key].score += safeNumber(record.pontuacao);
      return acc;
    }, { total: queue.length, correct: 0, wrong: 0, blank: 0, score: 0, byBlock: {} });
    totals.accuracy = Number(percent(totals.correct, totals.correct + totals.wrong, 1));
    return totals;
  }

  function renderMockResult(queue) {
    const result = state.mock.result || calculateMockResult(queue, []);
    const blocks = Object.values(result.byBlock || {});
    const weak = queue
      .filter((question) => {
        const answer = normalizeAnswer(state.mock.answers[question.id]);
        const evaluation = evaluateAnswer(question, answer);
        return !evaluation.correct;
      })
      .reduce((acc, question) => {
        const key = `${question.materia} — ${question.assunto}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
    const weakList = Object.entries(weak).sort((a, b) => b[1] - a[1]).slice(0, 8);

    return `
      <section class="panel result-panel">
        <div class="section-heading section-heading--compact">
          <p class="eyebrow">Resultado do simulado</p>
          <h2>${result.correct} acertos · ${result.wrong} erros · ${result.blank} em branco</h2>
          <p>Pontuação líquida total: <strong>${result.score}</strong> · Aproveitamento: <strong>${result.accuracy}%</strong></p>
        </div>
        <div class="dashboard-grid">
          ${metricCard("Acertos", result.correct, "itens corretos")}
          ${metricCard("Erros", result.wrong, "itens incorretos")}
          ${metricCard("Em branco", result.blank, "sem penalização quando aplicável")}
          ${metricCard("Pontuação", result.score, "conforme edital ativo")}
        </div>
        <h3>Desempenho por bloco/matéria</h3>
        <div class="result-table">
          ${blocks.map((block) => `
            <div>
              <strong>${escapeHtml(block.label)}</strong>
              <span>${block.correct}/${block.total} acertos · ${block.wrong} erros · ${block.blank} brancos · ${block.score} pts</span>
            </div>
          `).join("")}
        </div>
        <h3>Assuntos para revisar</h3>
        ${weakList.length ? `<ul class="check-list">${weakList.map(([label, count]) => `<li>${escapeHtml(label)} — ${count} questão(ões)</li>`).join("")}</ul>` : `<p class="empty">Sem erros ou brancos neste simulado. Brabo.</p>`}
      </section>
    `;
  }

  function renderRevisao() {
    const scope = getScope();
    const queue = smartRevisionQuestions(scope, 20);
    state.practice.startedAt = Object.fromEntries(queue.map((question) => [question.id, Date.now()]));
    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading section-heading--compact">
          <p class="eyebrow">Revisão inteligente</p>
          <h2>Erros, brancos, favoritas, lentas e difíceis</h2>
          <p>A seleção respeita apenas ${escapeHtml(contestById().nome)} · ${escapeHtml(roleById().nome)}.</p>
        </div>
      </section>
      <section class="question-stack">
        ${queue.length ? queue.map((question, index) => renderQuestionCard(question, { context: "revision", index })).join("") : renderEmptyQuestions()}
      </section>
    `;
  }

  function renderMaterias() {
    const scope = getScope();
    const performances = performanceByMatter(scope, questionsFor());
    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading section-heading--compact">
          <p class="eyebrow">Conteúdo programático</p>
          <h2>Matérias do concurso ativo</h2>
          <p>Lista derivada do edital do concurso/cargo selecionado. Cada card tem progresso e prioridade próprios.</p>
        </div>
        <div class="matter-grid">
          ${performances.map((matter) => `
            <article class="matter-card">
              <span class="chip">${escapeHtml(matter.bloco)}</span>
              <h3>${escapeHtml(matter.nome)}</h3>
              <div class="contest-progress"><span style="width:${matter.progress}%"></span></div>
              <dl class="contest-facts">
                <div><dt>Questões</dt><dd>${matter.total}</dd></div>
                <div><dt>Concluído</dt><dd>${matter.progress}%</dd></div>
                <div><dt>Acertos</dt><dd>${matter.accuracy}%</dd></div>
                <div><dt>Prioridade</dt><dd>${escapeHtml(matter.priority)}</dd></div>
              </dl>
              <p><strong>Assuntos:</strong> ${escapeHtml((mattersFor().find((item) => item.id === matter.id)?.assuntos || []).join(", "))}</p>
              <p><strong>Último estudo:</strong> ${matter.lastAt ? formatDate(matter.lastAt.slice(0, 10)) : "ainda não estudado"}</p>
            </article>
          `).join("")}
        </div>
      </section>
      <section class="panel">
        <h3>Fontes utilizadas neste concurso</h3>
        <div class="study-links">
          ${sourceLinksForContest().map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`).join("")}
        </div>
      </section>
    `;
  }

  function sourceLinksForContest() {
    const contest = contestById();
    const sources = [
      { label: contest.edital, url: contest.editalUrl },
    ];
    if (contest.id === "crt-sp") {
      sources.push(
        { label: "Edital PDF CRT-SP", url: DATA.sources.crt_pdf.url },
        { label: "Lei 13.639/2018", url: DATA.sources.lei_13639.url },
        { label: "Lei 5.524/1968", url: DATA.sources.lei_5524.url },
        { label: "Decreto 90.922/1985", url: DATA.sources.decreto_90922.url },
        { label: "Resoluções CFT", url: DATA.sources.cft_resolucoes.url },
      );
    }
    if (contest.id === "ibge") {
      sources.push(
        { label: "Edital PDF IBGE", url: DATA.sources.ibge_pdf.url },
        { label: "Conteúdo programático IBGE", url: DATA.sources.ibge_conteudo.url },
      );
    }
    if (contest.id === "santos-oficial") {
      sources.push(
        { label: "Edital PDF Santos", url: DATA.sources.santos_pdf.url },
        { label: "Notícia oficial Santos", url: DATA.sources.santos_noticia.url },
      );
    }
    return sources;
  }

  function renderHistorico() {
    const scope = getScope();
    const history = (scope.history || []).slice(0, 120);
    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading section-heading--compact">
          <p class="eyebrow">Histórico independente</p>
          <h2>${history.length} registros neste concurso/cargo</h2>
          <p>Não aparecem respostas de outros concursos, cargos ou usuários.</p>
        </div>
        ${history.length ? `
          <div class="history-list">
            ${history.map((record) => `
              <article class="history-item">
                <strong>${escapeHtml(record.materia)} — ${escapeHtml(record.assunto)}</strong>
                <span>${record.correto ? "Certa" : record.em_branco ? "Em branco" : "Errada"} · marcada: ${escapeHtml(record.resposta_marcada === BLANK ? "Em branco" : record.resposta_marcada)} · gabarito: ${escapeHtml(record.resposta_correta)}</span>
                <small>${new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(record.data))} · ${escapeHtml(record.modo)}</small>
              </article>
            `).join("")}
          </div>
        ` : `<p class="empty">Sem histórico neste escopo ainda.</p>`}
      </section>
    `;
  }

  function renderMetas() {
    const scope = getScope();
    const goals = scope.goals || makeScope().goals;
    const summary = summaryFromScope(scope);
    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading section-heading--compact">
          <p class="eyebrow">Metas separadas</p>
          <h2>Metas para ${escapeHtml(contestById().nome)} · ${escapeHtml(roleById().nome)}</h2>
          <p>Alterar estas metas não afeta outros concursos nem outros usuários.</p>
        </div>
        <div class="filters">
          <label class="field">
            <span>Questões por dia</span>
            <input id="goal-daily" type="number" min="1" value="${escapeHtml(goals.dailyQuestions)}">
          </label>
          <label class="field">
            <span>Simulados por semana</span>
            <input id="goal-weekly" type="number" min="0" value="${escapeHtml(goals.weeklyMocks)}">
          </label>
          <label class="field">
            <span>Erradas para revisar</span>
            <input id="goal-review" type="number" min="0" value="${escapeHtml(goals.reviewWrong)}">
          </label>
          <label class="field">
            <span>Meta de acertos (%)</span>
            <input id="goal-accuracy" type="number" min="0" max="100" value="${escapeHtml(goals.targetAccuracy)}">
          </label>
          <button class="primary-button" type="button" data-save-goals>Salvar metas</button>
        </div>
      </section>
      <section class="panel">
        <h3>Status das metas</h3>
        <div class="dashboard-grid">
          ${metricCard("Questões únicas", summary.uniqueAnswered, `meta diária: ${goals.dailyQuestions}`)}
          ${metricCard("Simulados", summary.mocks, `meta semanal: ${goals.weeklyMocks}`)}
          ${metricCard("Favoritas", summary.favorites, "revisão manual")}
          ${metricCard("Acertos", `${summary.accuracy}%`, `meta: ${goals.targetAccuracy}%`)}
        </div>
      </section>
    `;
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const target = event.target.closest("button");
      if (!target) return;

      const loginUser = target.dataset.loginUser;
      if (loginUser) {
        login(loginUser);
        return;
      }

      if (target.id === "switch-user") {
        localStorage.removeItem(SESSION_KEY);
        showLogin();
        return;
      }

      if (target.id === "change-contest") {
        state.showContestPicker = true;
        stopTimer();
        renderApp();
        return;
      }

      const contestId = target.dataset.selectContest;
      if (contestId) {
        selectContest(contestId);
        return;
      }

      const tab = target.dataset.tab;
      if (tab) {
        state.activeTab = tab;
        stopTimer();
        renderTabs();
        renderActiveTab();
        return;
      }

      if (target.dataset.generatePractice !== undefined) {
        generatePracticeFromFilters();
        return;
      }

      const practiceQuestionId = target.dataset.practiceAnswer;
      if (practiceQuestionId) {
        const question = questionsFor().find((item) => item.id === practiceQuestionId);
        state.practice.answered[practiceQuestionId] = target.dataset.answer;
        recordAnswer(question, target.dataset.answer, state.practice.mode || "modo-treino", state.practice.startedAt[practiceQuestionId]);
        renderActiveTab();
        return;
      }

      const mockQuestionId = target.dataset.mockAnswer;
      if (mockQuestionId && state.mock && !state.mock.finished) {
        state.mock.answers[mockQuestionId] = target.dataset.answer;
        renderActiveMock();
        return;
      }

      const startMockKind = target.dataset.startMock;
      if (startMockKind) {
        const mode = target.dataset.mockMode || $("#custom-mode")?.value || "prova";
        startMock(startMockKind, mode);
        return;
      }

      if (target.dataset.finishMock !== undefined) {
        finishMock();
        return;
      }

      if (target.dataset.resetMock !== undefined) {
        state.mock = null;
        stopTimer();
        renderSimulado();
        return;
      }

      const favoriteId = target.dataset.toggleFavorite;
      if (favoriteId) {
        persistScope((scope) => {
          scope.favorites[favoriteId] = !scope.favorites[favoriteId];
          if (!scope.favorites[favoriteId]) delete scope.favorites[favoriteId];
        });
        renderActiveTab();
        return;
      }

      const markId = target.dataset.markReview;
      if (markId) {
        persistScope((scope) => {
          scope.revisionMarked[markId] = true;
        });
        target.textContent = "Marcada";
        return;
      }

      const noteId = target.dataset.addNote;
      if (noteId) {
        const scope = getScope();
        const previous = scope.notes?.[noteId] || "";
        const note = window.prompt("Anotação para esta questão:", previous);
        if (note !== null) {
          persistScope((innerScope) => {
            if (note.trim()) innerScope.notes[noteId] = note.trim();
            else delete innerScope.notes[noteId];
          });
          renderActiveTab();
        }
        return;
      }

      const reportId = target.dataset.reportQuestion;
      if (reportId) {
        persistScope((scope) => {
          scope.reports[reportId] = scope.reports[reportId] || [];
          scope.reports[reportId].push({ at: nowIso(), reason: "Marcada pelo usuário" });
        });
        target.textContent = "Erro denunciado";
        return;
      }
    });

    document.addEventListener("change", (event) => {
      if (event.target.id === "role-select") {
        changeRole(event.target.value);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
