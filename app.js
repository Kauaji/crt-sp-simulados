"use strict";

(function initStudyPlatform() {
  const DATA = window.STUDY_DATA || { questoes: [], sources: {} };
  const EXTRA_BANK = window.QUESTION_BANK || [];
  const STORE_KEY = "crtsp-gamified-study-v1";
  const TIMEZONE = "America/Sao_Paulo";
  const BLANK = "__blank__";
  const MINIMOS_PROVA_REAL = { basicos: 10, complementares: 8, especificos: 17, total: 36 };

  const USERS = [
    { id: "kaua", nome: "Kauã", initial: "K", accent: "verde" },
    { id: "vitoria", nome: "Vitória", initial: "V", accent: "coral" },
  ];

  const TABS = [
    ["dashboard", "Dashboard"],
    ["crt", "CRT-SP"],
    ["prova-real", "Prova real CRT-SP"],
    ["certificacoes", "Certificações"],
    ["programacao", "Programação"],
    ["dados", "Dados"],
    ["estudos", "Estudos"],
    ["historico", "Histórico"],
  ];

  const OPEN_TYPES = new Set(["explainCode", "sqlQuery", "daxMeasure", "completeCode", "orderSteps", "caseStudy"]);
  const DIFFICULTY_POINTS = { facil: 1, medio: 2, dificil: 3 };
  const CRT_ROLE_ID = "crt-tecnico-administrativo-bs";

  const state = {
    currentUserId: null,
    activeTab: "dashboard",
    difficulty: "misto",
    crtExtraAttempt: 0,
    certMode: "rapidas",
    certTopic: "Microsoft Fabric",
    programmingTrack: "Python",
    dataTrack: "Fundamentos de Dados",
    activeQuiz: null,
  };

  const $ = (selector) => document.querySelector(selector);

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getTodayKey(date = new Date()) {
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
    return new Date(Date.UTC(year, month - 1, day + days, 12)).toISOString().slice(0, 10);
  }

  function seededRandom(seedKey) {
    let hash = 2166136261;
    for (let index = 0; index < String(seedKey).length; index += 1) {
      hash ^= String(seedKey).charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    let stateValue = hash >>> 0;
    return () => {
      stateValue += 0x6D2B79F5;
      let value = stateValue;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffleWithSeed(items, seedKey) {
    const output = [...items];
    const random = seededRandom(seedKey);
    for (let index = output.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(random() * (index + 1));
      [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
    }
    return output;
  }

  function selectRotatingQuestions({ pool, count, difficulty = "misto", seedKey, avoidIds = [] }) {
    const avoid = new Set(avoidIds);
    let candidates = pool.filter((question) => question.status !== "inativo");

    if (difficulty !== "misto") {
      const preferred = candidates.filter((question) => question.dificuldade === difficulty);
      candidates = preferred.length >= count ? preferred : candidates;
    }

    if (difficulty === "misto") {
      const selected = [];
      const byDifficulty = ["facil", "medio", "dificil"].map((level) => (
        shuffleWithSeed(candidates.filter((question) => question.dificuldade === level && !avoid.has(question.id)), `${seedKey}-${level}`)
      ));
      const targetByLevel = Math.floor(count / 3);
      for (const list of byDifficulty) selected.push(...list.slice(0, targetByLevel));
      const remaining = candidates.filter((question) => !selected.some((picked) => picked.id === question.id) && !avoid.has(question.id));
      selected.push(...shuffleWithSeed(remaining, `${seedKey}-fill`).slice(0, count - selected.length));
      if (selected.length < count) {
        const fallback = candidates.filter((question) => !selected.some((picked) => picked.id === question.id));
        selected.push(...shuffleWithSeed(fallback, `${seedKey}-fallback`).slice(0, count - selected.length));
      }
      return selected.slice(0, count);
    }

    const fresh = candidates.filter((question) => !avoid.has(question.id));
    const usable = fresh.length >= count ? fresh : candidates;
    return shuffleWithSeed(usable, seedKey).slice(0, Math.min(count, usable.length));
  }

  function loadStore() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function saveStore(store) {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  }

  function makeUserStats(userId) {
    const user = USERS.find((item) => item.id === userId);
    return {
      nome: user?.nome || userId,
      totalAcessos: 0,
      ultimoDiaAcessado: null,
      streakAtual: 0,
      maiorStreak: 0,
      pontosTotais: 0,
      simuladosCrtFinalizados: 0,
      provasReaisCrtFinalizadas: 0,
      questionariosCertificacaoFinalizados: 0,
      questionariosProgramacaoFinalizados: 0,
      questionariosDadosFinalizados: 0,
      melhorPontuacaoLiquidaGeral: null,
      ultimaPontuacaoLiquida: 0,
      mediaPontuacao: 0,
      totalQuestoesRespondidas: 0,
      totalAcertos: 0,
      totalErros: 0,
      totalBrancos: 0,
      historicoUltimosResultados: [],
      materiasComMaisErro: {},
      materiasComMaisBranco: {},
      trilhasEstudadas: {},
      recentQuestionIds: {},
    };
  }

  function getCurrentUser() {
    return USERS.find((user) => user.id === state.currentUserId);
  }

  function setCurrentUser(userId) {
    state.currentUserId = userId;
  }

  function loadUserStats(userId = state.currentUserId) {
    const store = loadStore();
    store.users = store.users || {};
    store.users[userId] = store.users[userId] || makeUserStats(userId);
    saveStore(store);
    return store.users[userId];
  }

  function saveUserStats(stats, userId = state.currentUserId) {
    const store = loadStore();
    store.users = store.users || {};
    store.users[userId] = stats;
    saveStore(store);
  }

  function registerUserAccess(userId) {
    setCurrentUser(userId);
    const stats = loadUserStats(userId);
    const today = getTodayKey();
    updateUserStreak(stats, today);
    if (stats.ultimoDiaAcessado !== today) {
      stats.totalAcessos += 1;
      stats.ultimoDiaAcessado = today;
    }
    saveUserStats(stats, userId);
  }

  function updateUserStreak(stats, today = getTodayKey()) {
    if (!stats.ultimoDiaAcessado) {
      stats.streakAtual = 1;
    } else if (stats.ultimoDiaAcessado === today) {
      stats.streakAtual = Math.max(1, stats.streakAtual || 1);
    } else if (stats.ultimoDiaAcessado === addDays(today, -1)) {
      stats.streakAtual = (stats.streakAtual || 0) + 1;
    } else {
      stats.streakAtual = 1;
    }
    stats.maiorStreak = Math.max(stats.maiorStreak || 0, stats.streakAtual || 0);
  }

  function crtPool() {
    return DATA.questoes
      .filter((question) => (
        question.concurso_id === "crt-sp"
        && question.cargos_compativeis?.includes(CRT_ROLE_ID)
        && question.tipo === "certo_errado"
      ))
      .map((question) => ({
        id: question.id,
        area: "crt-sp",
        trilha: "CRT-SP",
        bloco: question.bloco,
        disciplina: question.materia,
        assunto: question.subassunto || question.assunto,
        tipo: "trueFalse",
        dificuldade: question.dificuldade || "medio",
        enunciado: question.enunciado,
        gabarito: question.resposta_correta,
        comentario: question.explicacao,
        fonte: question.fonte,
        link: question.link,
        tags: question.tags || [],
      }));
  }

  function poolByArea(area) {
    if (area === "crt-sp") return crtPool();
    return EXTRA_BANK.filter((question) => question.area === area);
  }

  function getRecentIds(scopeKey) {
    const stats = loadUserStats();
    return stats.recentQuestionIds?.[scopeKey] || [];
  }

  function selectCrtByDistribution({ countBasicos, countComplementares, countEspecificos, seedKey, difficulty = "misto", avoidIds = [] }) {
    const pool = crtPool();
    const blocks = [
      ["Conhecimentos básicos", countBasicos],
      ["Conhecimentos complementares", countComplementares],
      ["Conhecimentos específicos", countEspecificos],
    ];
    const selected = [];
    for (const [block, count] of blocks) {
      const questions = pool.filter((question) => question.bloco === block && !selected.some((picked) => picked.id === question.id));
      selected.push(...selectRotatingQuestions({
        pool: questions,
        count,
        difficulty,
        seedKey: `${seedKey}-${block}`,
        avoidIds,
      }));
    }
    return selected;
  }

  function updateStatsAfterActivity(result) {
    const stats = loadUserStats();
    stats.totalQuestoesRespondidas += result.total;
    stats.totalAcertos += result.correct;
    stats.totalErros += result.wrong;
    stats.totalBrancos += result.blank;
    stats.pontosTotais += result.gamifiedPoints;
    stats.ultimaPontuacaoLiquida = result.score;
    stats.melhorPontuacaoLiquidaGeral = stats.melhorPontuacaoLiquidaGeral === null
      ? result.score
      : Math.max(stats.melhorPontuacaoLiquidaGeral, result.score);

    if (result.kind === "crt-daily" || result.kind === "crt-extra") stats.simuladosCrtFinalizados += 1;
    if (result.kind === "crt-real") stats.provasReaisCrtFinalizadas += 1;
    if (result.area === "certificacoes") stats.questionariosCertificacaoFinalizados += 1;
    if (result.area === "programacao") stats.questionariosProgramacaoFinalizados += 1;
    if (result.area === "dados") stats.questionariosDadosFinalizados += 1;

    stats.trilhasEstudadas[result.trilha] = (stats.trilhasEstudadas[result.trilha] || 0) + 1;

    for (const item of result.items) {
      if (!item.correct && !item.blank) {
        stats.materiasComMaisErro[item.disciplina] = (stats.materiasComMaisErro[item.disciplina] || 0) + 1;
      }
      if (item.blank) {
        stats.materiasComMaisBranco[item.disciplina] = (stats.materiasComMaisBranco[item.disciplina] || 0) + 1;
      }
    }

    const attempts = stats.historicoUltimosResultados || [];
    attempts.unshift({
      id: `${Date.now()}-${result.kind}`,
      data: new Date().toISOString(),
      titulo: result.title,
      area: result.area,
      trilha: result.trilha,
      total: result.total,
      acertos: result.correct,
      erros: result.wrong,
      brancos: result.blank,
      pontuacao: result.score,
      percentual: result.percent,
    });
    stats.historicoUltimosResultados = attempts.slice(0, 50);
    const scores = stats.historicoUltimosResultados.map((item) => item.pontuacao);
    stats.mediaPontuacao = scores.length ? Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 10) / 10 : 0;

    const recent = stats.recentQuestionIds || {};
    recent[result.scopeKey] = [...result.items.map((item) => item.id), ...(recent[result.scopeKey] || [])].slice(0, 220);
    stats.recentQuestionIds = recent;

    saveUserStats(stats);
  }

  function renderUserSelection() {
    $("#login-screen").hidden = false;
    $("#app-shell").hidden = true;
    state.currentUserId = null;
    const target = $("#profile-options");
    target.innerHTML = USERS.map((user) => `
      <button class="profile-card" type="button" data-login-user="${escapeHtml(user.id)}">
        <span class="profile-card__avatar profile-card__avatar--${escapeHtml(user.accent)}">${escapeHtml(user.initial)}</span>
        <span>
          <strong>${escapeHtml(user.nome)}</strong>
          <small>Entrar no meu painel, foguinho, ranking e histórico local</small>
        </span>
        <span aria-hidden="true">🚀</span>
      </button>
    `).join("");
  }

  function renderHeader() {
    const user = getCurrentUser();
    const stats = loadUserStats();
    $("#top-user-name").textContent = user ? `${user.nome} · 🔥 ${stats.streakAtual}` : "";
    $("#change-contest").hidden = true;
    $("#hero-eyebrow").textContent = "Plataforma gamificada";
    $("#hero-title").textContent = "CRT-SP, DP-600, Programação e Dados";
    $("#hero-copy").textContent = "Estude com simulados rotativos, histórico por usuário, foguinho, ranking e recomendações personalizadas. Tudo salvo localmente neste navegador.";
    $("#hero-notice").textContent = `Hoje: ${getTodayKey()} (${TIMEZONE}). O simulado diário do CRT-SP permanece igual durante o dia e muda automaticamente amanhã.`;
    $("#active-contest-card").innerHTML = `
      <h2>Foco principal</h2>
      <p>CRT-SP 2026 — Técnico Administrativo</p>
      <dl>
        <div><dt>Diário</dt><dd>40 itens</dd></div>
        <div><dt>Prova real</dt><dd>120 itens</dd></div>
        <div><dt>Pontuação</dt><dd>+1 / -1 / 0</dd></div>
      </dl>
    `;
  }

  function renderTabs() {
    $("#tabs").innerHTML = TABS.map(([id, label]) => `
      <button type="button" class="${state.activeTab === id ? "active" : ""}" data-tab="${escapeHtml(id)}">${escapeHtml(label)}</button>
    `).join("");
  }

  function metricCard(label, value, detail = "") {
    return `<article class="metric-card"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><small>${escapeHtml(detail)}</small></article>`;
  }

  function getTopKey(map) {
    const entries = Object.entries(map || {}).sort((a, b) => b[1] - a[1]);
    return entries[0]?.[0] || "Ainda sem dados";
  }

  function renderRanking() {
    const rows = USERS.map((user) => {
      const stats = loadUserStats(user.id);
      const activities = stats.simuladosCrtFinalizados + stats.provasReaisCrtFinalizadas + stats.questionariosCertificacaoFinalizados + stats.questionariosProgramacaoFinalizados + stats.questionariosDadosFinalizados;
      return { user, stats, activities };
    });
    const score = (row) => (row.stats.pontosTotais || 0) + (row.stats.maiorStreak || 0) * 5 + row.activities * 3 + (row.stats.mediaPontuacao || 0);
    const winner = [...rows].sort((a, b) => score(b) - score(a))[0];

    return `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Ranking local</p>
          <h2>🏆 Kauã x Vitória</h2>
        </div>
        <div class="ranking-grid">
          ${rows.map((row) => `
            <article class="ranking-card">
              <h3>${escapeHtml(row.user.nome)}</h3>
              <p><strong>${row.stats.pontosTotais}</strong> pontos · 🔥 ${row.stats.maiorStreak} maior foguinho</p>
              <ul>
                <li>Acessos: ${row.stats.totalAcessos}</li>
                <li>Atividades: ${row.activities}</li>
                <li>Média: ${row.stats.mediaPontuacao}</li>
              </ul>
            </article>
          `).join("")}
        </div>
        <p class="notice">Vencedor atual: <strong>${escapeHtml(winner?.user.nome || "ninguém ainda")}</strong>.</p>
      </section>
    `;
  }

  function renderDashboard() {
    const stats = loadUserStats();
    const accuracy = stats.totalQuestoesRespondidas ? Math.round((stats.totalAcertos / stats.totalQuestoesRespondidas) * 100) : 0;
    const recent = stats.historicoUltimosResultados || [];

    $("#dashboard").innerHTML = "";
    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Dashboard</p>
          <h2>Olá, ${escapeHtml(stats.nome)}. Bora estudar hoje? 🔥</h2>
        </div>
        <div class="dashboard-grid">
          ${metricCard("Foguinho atual", `🔥 ${stats.streakAtual}`, `recorde: ${stats.maiorStreak}`)}
          ${metricCard("Pontos totais", stats.pontosTotais, "gamificação local")}
          ${metricCard("Acessos", stats.totalAcessos, `último: ${stats.ultimoDiaAcessado || "—"}`)}
          ${metricCard("Taxa de acerto", `${accuracy}%`, `${stats.totalAcertos}/${stats.totalQuestoesRespondidas}`)}
          ${metricCard("Simulados CRT-SP", stats.simuladosCrtFinalizados, "diários e extras")}
          ${metricCard("Provas reais", stats.provasReaisCrtFinalizadas, "120 itens")}
          ${metricCard("DP-600", stats.questionariosCertificacaoFinalizados, "questionários finalizados")}
          ${metricCard("Programação", stats.questionariosProgramacaoFinalizados, "questionários finalizados")}
          ${metricCard("Dados", stats.questionariosDadosFinalizados, "questionários finalizados")}
          ${metricCard("Melhor pontuação", stats.melhorPontuacaoLiquidaGeral ?? "—", `última: ${stats.ultimaPontuacaoLiquida}`)}
          ${metricCard("Média geral", stats.mediaPontuacao, "últimos resultados")}
          ${metricCard("Trilha mais estudada", getTopKey(stats.trilhasEstudadas), "por atividades")}
        </div>
        <div class="action-row">
          <button class="secondary-button" type="button" data-switch-user>Trocar usuário</button>
          <button class="danger-button" type="button" data-reset-user>Zerar meus dados locais</button>
        </div>
      </section>
      ${renderRanking()}
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Últimas 5 tentativas</p>
          <h2>Histórico rápido</h2>
        </div>
        ${recent.length ? `<div class="history-list">${recent.slice(0, 5).map(renderHistoryItem).join("")}</div>` : "<p class='muted'>Finalize um questionário para aparecer aqui.</p>"}
      </section>
    `;
  }

  function difficultySelect() {
    return `
      <label class="field">
        <span>Dificuldade</span>
        <select data-difficulty>
          <option value="misto" ${state.difficulty === "misto" ? "selected" : ""}>Misto</option>
          <option value="facil" ${state.difficulty === "facil" ? "selected" : ""}>Fácil</option>
          <option value="medio" ${state.difficulty === "medio" ? "selected" : ""}>Médio</option>
          <option value="dificil" ${state.difficulty === "dificil" ? "selected" : ""}>Difícil</option>
        </select>
      </label>
    `;
  }

  function renderCrtDaily() {
    const today = getTodayKey();
    const daily = selectCrtByDistribution({
      countBasicos: 12,
      countComplementares: 8,
      countEspecificos: 20,
      seedKey: `crt-diario-${today}`,
    });
    const subjects = [...new Set(daily.map((question) => question.assunto))].slice(0, 14);

    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">CRT-SP diário · ${today}</p>
          <h2>Simulado CRT-SP — Técnico Administrativo</h2>
        </div>
        <p>40 itens Certo/Errado/Em branco no padrão Quadrix: +1 por acerto, -1 por erro e 0 em branco.</p>
        <div class="dashboard-grid">
          ${metricCard("Básicos", 12, "Português, RLM e informática")}
          ${metricCard("Complementares", 8, "Ética, LAI, LGPD e leis")}
          ${metricCard("Específicos", 20, "CRT/CFT, rotinas e administração")}
        </div>
        <p><strong>Assuntos cobrados hoje:</strong> ${subjects.map(escapeHtml).join(", ")}.</p>
        <div class="action-row">
          <button class="primary-button" type="button" data-start-crt-daily>Iniciar simulado diário</button>
          ${difficultySelect()}
          <button class="secondary-button" type="button" data-start-crt-extra>Gerar outro questionário CRT-SP</button>
        </div>
      </section>
    `;
  }

  function renderCrtRealExam() {
    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Modo prova real</p>
          <h2>Prova real CRT-SP — 120 itens</h2>
        </div>
        <p>Duração sugerida: 3 horas. Pontuação líquida Quadrix: +1, -1, 0. Gabarito comentado só depois de finalizar.</p>
        <div class="dashboard-grid">
          ${metricCard("Básicos", 40, `mínimo: ${MINIMOS_PROVA_REAL.basicos}`)}
          ${metricCard("Complementares", 30, `mínimo: ${MINIMOS_PROVA_REAL.complementares}`)}
          ${metricCard("Específicos", 50, `mínimo: ${MINIMOS_PROVA_REAL.especificos}`)}
          ${metricCard("Mínimo total", MINIMOS_PROVA_REAL.total, "pontuação líquida")}
        </div>
        <button class="primary-button" type="button" data-start-crt-real>Iniciar prova real CRT-SP</button>
      </section>
    `;
  }

  function renderCertificationTab() {
    const topics = [...new Set(poolByArea("certificacoes").map((question) => question.disciplina))];
    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Certificações</p>
          <h2>Microsoft DP-600 — Fabric Analytics Engineer Associate</h2>
        </div>
        <p>Questões autorais baseadas nos tópicos públicos do guia de estudo. Preparado para DP-700, PL-300, AI-900, AZ-900 e DP-900 no futuro.</p>
        <div class="form-grid">
          <label class="field">
            <span>Modo</span>
            <select data-cert-mode>
              <option value="rapidas" ${state.certMode === "rapidas" ? "selected" : ""}>DP-600 — Questões rápidas</option>
              <option value="simulado" ${state.certMode === "simulado" ? "selected" : ""}>DP-600 — Simulado 30 questões</option>
              <option value="tema" ${state.certMode === "tema" ? "selected" : ""}>DP-600 — Revisão por tema</option>
              <option value="dificil" ${state.certMode === "dificil" ? "selected" : ""}>DP-600 — Modo difícil</option>
              <option value="erros" ${state.certMode === "erros" ? "selected" : ""}>DP-600 — Erros frequentes</option>
            </select>
          </label>
          <label class="field">
            <span>Tema</span>
            <select data-cert-topic>
              ${topics.map((topic) => `<option value="${escapeHtml(topic)}" ${state.certTopic === topic ? "selected" : ""}>${escapeHtml(topic)}</option>`).join("")}
            </select>
          </label>
          ${difficultySelect()}
        </div>
        <div class="tag-cloud">${topics.map((topic) => `<span>${escapeHtml(topic)}</span>`).join("")}</div>
        <button class="primary-button" type="button" data-start-cert>Iniciar DP-600</button>
      </section>
    `;
  }

  function renderProgrammingTab() {
    const tracks = [...new Set(poolByArea("programacao").map((question) => question.trilha))];
    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Programação</p>
          <h2>Lógica, código, SQL, Git, HTML/CSS e linguagens</h2>
        </div>
        <p>Treine leitura de código, identificação de bug, fundamentos e interpretação de saída.</p>
        <div class="form-grid">
          <label class="field">
            <span>Subtrilha</span>
            <select data-programming-track>
              ${tracks.map((track) => `<option value="${escapeHtml(track)}" ${state.programmingTrack === track ? "selected" : ""}>${escapeHtml(track)}</option>`).join("")}
            </select>
          </label>
          ${difficultySelect()}
        </div>
        <button class="primary-button" type="button" data-start-programming>Iniciar questionário de Programação</button>
      </section>
    `;
  }

  function renderDataTab() {
    const tracks = [...new Set(poolByArea("dados").map((question) => question.trilha))];
    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Dados</p>
          <h2>Trilhas práticas para evoluir na área de dados 📊</h2>
        </div>
        <p>Fundamentos, SQL, Python/Pandas, Power BI, engenharia de dados, analytics e desafios práticos.</p>
        <div class="form-grid">
          <label class="field">
            <span>Trilha</span>
            <select data-data-track>
              ${tracks.map((track) => `<option value="${escapeHtml(track)}" ${state.dataTrack === track ? "selected" : ""}>${escapeHtml(track)}</option>`).join("")}
            </select>
          </label>
          ${difficultySelect()}
        </div>
        <button class="primary-button" type="button" data-start-data>Iniciar questionário de Dados</button>
      </section>
    `;
  }

  function getPersonalizedRecommendations() {
    const stats = loadUserStats();
    if (!stats.historicoUltimosResultados?.length) {
      return ["Faça pelo menos um questionário para liberar recomendações personalizadas."];
    }
    const weakError = getTopKey(stats.materiasComMaisErro);
    const weakBlank = getTopKey(stats.materiasComMaisBranco);
    const accuracy = stats.totalQuestoesRespondidas ? stats.totalAcertos / stats.totalQuestoesRespondidas : 0;
    return [
      `Revise primeiro: ${weakError}.`,
      `Reduza brancos em: ${weakBlank}.`,
      `Sugestão de dificuldade: ${accuracy >= 0.75 ? "difícil" : accuracy >= 0.55 ? "médio" : "fácil"}.`,
      `Próximo questionário sugerido: ${getTopKey(stats.trilhasEstudadas) === "CRT-SP" ? "DP-600 ou Dados" : "CRT-SP diário"}.`,
    ];
  }

  function renderStudyTab() {
    const recommendations = getPersonalizedRecommendations();
    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Estudos</p>
          <h2>Plano de estudo e recomendações</h2>
        </div>
        <div class="study-grid">
          ${studyCard("CRT-SP", ["Lei seca do Sistema CFT/CRT-SP", "Quadrix: cuidado com exceções e termos absolutos", "Priorize Lei 13.639/2018, Lei 9.784/1999, LAI, LGPD, protocolo e redação oficial"], [["Quadrix CRT-SP", DATA.sources?.crt_edital?.url], ["Lei 13.639/2018", DATA.sources?.lei_13639?.url]])}
          ${studyCard("DP-600", ["Microsoft Learn", "Fabric, Lakehouse, Warehouse e Semantic Model", "Treine SQL, DAX, KQL, Direct Lake, RLS e deployment pipelines"], [["Guia DP-600", "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-600"], ["Curso DP-600", "https://learn.microsoft.com/en-us/training/courses/dp-600t00"]])}
          ${studyCard("Programação", ["1. lógica", "2. Python", "3. SQL", "4. Git", "5. HTML/CSS", "6. JavaScript", "7. Java", "8. projetos práticos"], [["MDN", "https://developer.mozilla.org/pt-BR/"], ["Python", "https://docs.python.org/pt-br/3/"]])}
          ${studyCard("Dados", ["SQL forte", "Python/Pandas", "Power BI", "Modelagem", "ETL/ELT", "Fabric", "Portfólio: chamados de TI, ordens de serviço, estoque e atendimento"], [["Power BI Learn", "https://learn.microsoft.com/pt-br/power-bi/"], ["Pandas", "https://pandas.pydata.org/docs/"]])}
        </div>
      </section>
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Recomendação personalizada</p>
          <h2>O que estudar hoje</h2>
        </div>
        <ul class="check-list">${recommendations.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
    `;
  }

  function studyCard(title, items, links) {
    return `
      <article class="study-card">
        <h3>${escapeHtml(title)}</h3>
        <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        <div class="link-list">
          ${links.filter(([, url]) => url).map(([label, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`).join("")}
        </div>
      </article>
    `;
  }

  function renderHistoryItem(item) {
    return `
      <article class="history-item">
        <strong>${escapeHtml(item.titulo)}</strong>
        <span>${new Date(item.data).toLocaleString("pt-BR")} · ${item.acertos} acertos · ${item.erros} erros · ${item.brancos} brancos · pontuação ${item.pontuacao}</span>
      </article>
    `;
  }

  function renderHistory() {
    const stats = loadUserStats();
    const history = stats.historicoUltimosResultados || [];
    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Histórico</p>
          <h2>${history.length} tentativas salvas neste navegador</h2>
        </div>
        ${history.length ? `<div class="history-list">${history.map(renderHistoryItem).join("")}</div>` : "<p class='muted'>Nenhum questionário finalizado ainda.</p>"}
      </section>
    `;
  }

  function renderActiveTab() {
    renderHeader();
    renderTabs();
    const renderers = {
      dashboard: renderDashboard,
      crt: renderCrtDaily,
      "prova-real": renderCrtRealExam,
      certificacoes: renderCertificationTab,
      programacao: renderProgrammingTab,
      dados: renderDataTab,
      estudos: renderStudyTab,
      historico: renderHistory,
    };
    renderers[state.activeTab]?.();
  }

  function startQuiz(config) {
    state.activeQuiz = {
      ...config,
      startedAt: Date.now(),
      answers: {},
      submitted: false,
      selfEvaluations: {},
    };
    renderQuiz();
  }

  function normalizeOptions(question) {
    return (question.alternativas || []).map((option, index) => (
      typeof option === "string"
        ? { label: String.fromCharCode(65 + index), text: option, value: String(index) }
        : { label: option.label || String.fromCharCode(65 + index), text: option.text, value: String(index) }
    ));
  }

  function renderAnswerControls(question, index) {
    const quiz = state.activeQuiz;
    const name = `q-${index}`;
    const current = quiz.answers[question.id];
    if (question.tipo === "trueFalse") {
      return `
        <div class="answer-grid">
          ${["C", "E", BLANK].map((value) => `
            <label class="answer-option ${current === value ? "selected" : ""}">
              <input type="radio" name="${name}" value="${escapeHtml(value)}" data-answer="${escapeHtml(question.id)}" ${current === value ? "checked" : ""}>
              ${value === "C" ? "Certo" : value === "E" ? "Errado" : "Em branco"}
            </label>
          `).join("")}
        </div>
      `;
    }
    if (OPEN_TYPES.has(question.tipo)) {
      return `
        <textarea class="open-answer" data-open-answer="${escapeHtml(question.id)}" placeholder="Escreva sua resposta para autoavaliação">${escapeHtml(current || "")}</textarea>
      `;
    }
    return `
      <div class="answer-list">
        ${normalizeOptions(question).map((option) => `
          <label class="answer-option ${current === option.value ? "selected" : ""}">
            <input type="radio" name="${name}" value="${escapeHtml(option.value)}" data-answer="${escapeHtml(question.id)}" ${current === option.value ? "checked" : ""}>
            <strong>${escapeHtml(option.label)}</strong> ${escapeHtml(option.text)}
          </label>
        `).join("")}
      </div>
    `;
  }

  function evaluateQuestion(question, answer, quiz) {
    const blank = answer === undefined || answer === "" || answer === BLANK;
    if (OPEN_TYPES.has(question.tipo)) {
      const marked = quiz.selfEvaluations[question.id];
      return { blank: !answer && !marked, correct: marked === "correct", wrong: marked === "wrong" };
    }
    if (blank) return { blank: true, correct: false, wrong: false };
    const expected = question.tipo === "trueFalse" ? question.gabarito : String(question.gabarito);
    const correct = String(answer) === String(expected);
    return { blank: false, correct, wrong: !correct };
  }

  function buildResult(quiz) {
    const items = quiz.questions.map((question) => {
      const evaluation = evaluateQuestion(question, quiz.answers[question.id], quiz);
      return {
        ...evaluation,
        id: question.id,
        disciplina: question.disciplina || question.bloco || question.trilha,
        assunto: question.assunto,
        score: quiz.scoring === "quadrix" ? (evaluation.correct ? 1 : evaluation.wrong ? -1 : 0) : (evaluation.correct ? DIFFICULTY_POINTS[question.dificuldade] || 1 : 0),
      };
    });
    const correct = items.filter((item) => item.correct).length;
    const wrong = items.filter((item) => item.wrong).length;
    const blank = items.filter((item) => item.blank).length;
    const score = items.reduce((sum, item) => sum + item.score, 0);
    const gamifiedPoints = quiz.scoring === "quadrix"
      ? Math.max(0, correct * 2 + (quiz.kind === "crt-real" ? 20 : 0))
      : score + Math.min(10, loadUserStats().streakAtual || 0);
    return {
      title: quiz.title,
      kind: quiz.kind,
      area: quiz.area,
      trilha: quiz.trilha,
      scopeKey: quiz.scopeKey,
      total: quiz.questions.length,
      correct,
      wrong,
      blank,
      score,
      percent: quiz.questions.length ? Math.round((correct / quiz.questions.length) * 100) : 0,
      gamifiedPoints,
      items,
    };
  }

  function renderQuiz() {
    const quiz = state.activeQuiz;
    const elapsed = Math.max(0, Math.round((Date.now() - quiz.startedAt) / 1000));
    const answered = Object.values(quiz.answers).filter((value) => value !== undefined && value !== "").length;
    $("#dashboard").innerHTML = "";
    $("#tabs").innerHTML = "";
    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">${escapeHtml(quiz.trilha)} · ${quiz.questions.length} questões</p>
          <h2>${escapeHtml(quiz.title)}</h2>
        </div>
        <div class="quiz-toolbar">
          <span>Respondidas: ${answered}/${quiz.questions.length}</span>
          <span>Tempo: ${Math.floor(elapsed / 60)}min ${elapsed % 60}s</span>
          ${quiz.durationMinutes ? `<span>Duração sugerida: ${quiz.durationMinutes}min</span>` : ""}
        </div>
        <div class="question-stack">
          ${quiz.questions.map((question, index) => renderQuestion(question, index)).join("")}
        </div>
        <div class="sticky-actions">
          <button class="secondary-button" type="button" data-cancel-quiz>Voltar sem finalizar</button>
          <button class="primary-button" type="button" data-finish-quiz>Finalizar</button>
        </div>
      </section>
    `;
  }

  function renderQuestion(question, index) {
    return `
      <article class="question-card">
        <div class="question-meta">
          <span>Questão ${index + 1}</span>
          <span>${escapeHtml(question.disciplina || question.trilha)}</span>
          <span>${escapeHtml(question.dificuldade)}</span>
          <span>${escapeHtml(question.tipo)}</span>
        </div>
        <p>${escapeHtml(question.enunciado)}</p>
        ${question.codigo ? `<pre><code>${escapeHtml(question.codigo)}</code></pre>` : ""}
        ${renderAnswerControls(question, index)}
      </article>
    `;
  }

  function finishQuiz() {
    const quiz = state.activeQuiz;
    if (!quiz) return;
    quiz.submitted = true;
    const result = buildResult(quiz);
    updateStatsAfterActivity(result);
    renderResults(result);
  }

  function blockReport(result, quiz) {
    const byBlock = {};
    for (const item of result.items) {
      const question = quiz.questions.find((candidate) => candidate.id === item.id);
      const block = question?.bloco || question?.disciplina || "Geral";
      byBlock[block] = byBlock[block] || { total: 0, correct: 0, wrong: 0, blank: 0, score: 0 };
      byBlock[block].total += 1;
      byBlock[block].correct += item.correct ? 1 : 0;
      byBlock[block].wrong += item.wrong ? 1 : 0;
      byBlock[block].blank += item.blank ? 1 : 0;
      byBlock[block].score += item.score;
    }
    return byBlock;
  }

  function renderResults(result) {
    const quiz = state.activeQuiz;
    const report = blockReport(result, quiz);
    const real = quiz.kind === "crt-real";
    const basics = report["Conhecimentos básicos"]?.score || 0;
    const comp = report["Conhecimentos complementares"]?.score || 0;
    const spec = report["Conhecimentos específicos"]?.score || 0;
    const inside = basics >= MINIMOS_PROVA_REAL.basicos && comp >= MINIMOS_PROVA_REAL.complementares && spec >= MINIMOS_PROVA_REAL.especificos && result.score >= MINIMOS_PROVA_REAL.total;
    const attention = result.score >= MINIMOS_PROVA_REAL.total || [basics >= MINIMOS_PROVA_REAL.basicos, comp >= MINIMOS_PROVA_REAL.complementares, spec >= MINIMOS_PROVA_REAL.especificos].filter(Boolean).length >= 2;
    const status = !real ? "" : inside ? "Dentro da zona segura" : attention ? "Atenção" : "Risco de eliminação";
    const weak = result.items.filter((item) => item.wrong || item.blank).slice(0, 12);

    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Resultado</p>
          <h2>${result.correct} acertos · ${result.wrong} erros · ${result.blank} brancos</h2>
        </div>
        <div class="dashboard-grid">
          ${metricCard("Pontuação", result.score, quiz.scoring === "quadrix" ? "+1/-1/0" : "sem penalidade")}
          ${metricCard("Percentual", `${result.percent}%`, "acertos sobre o total")}
          ${metricCard("Pontos gamificados", result.gamifiedPoints, "salvos no dashboard")}
          ${metricCard("Segurança", `${Math.max(0, Math.round((result.score / result.total) * 100))}%`, real ? status : "desempenho líquido")}
        </div>
        ${real ? `
          <div class="real-status">
            <p><strong>Status:</strong> ${escapeHtml(status)}</p>
            <ul>
              <li>Básicos: ${basics} — mínimo ${MINIMOS_PROVA_REAL.basicos} ${basics >= MINIMOS_PROVA_REAL.basicos ? "✅" : "⚠️"}</li>
              <li>Complementares: ${comp} — mínimo ${MINIMOS_PROVA_REAL.complementares} ${comp >= MINIMOS_PROVA_REAL.complementares ? "✅" : "⚠️"}</li>
              <li>Específicos: ${spec} — mínimo ${MINIMOS_PROVA_REAL.especificos} ${spec >= MINIMOS_PROVA_REAL.especificos ? "✅" : "⚠️"}</li>
              <li>Total: ${result.score} — mínimo ${MINIMOS_PROVA_REAL.total} ${result.score >= MINIMOS_PROVA_REAL.total ? "✅" : "⚠️"}</li>
            </ul>
          </div>
        ` : ""}
      </section>
      <section class="panel">
        <h2>Desempenho por bloco/disciplina</h2>
        <div class="dashboard-grid">
          ${Object.entries(report).map(([block, values]) => metricCard(block, `${values.correct}/${values.total}`, `${values.wrong} erros · ${values.blank} brancos · ${values.score} pts`)).join("")}
        </div>
      </section>
      <section class="panel">
        <h2>Assuntos para revisar</h2>
        ${weak.length ? `<ul class="check-list">${weak.map((item) => `<li>${escapeHtml(item.disciplina)} — ${escapeHtml(item.assunto || "revisar teoria")}</li>`).join("")}</ul>` : "<p class='notice'>Mandou bem: nenhum erro ou branco para revisar neste questionário.</p>"}
      </section>
      <section class="panel">
        <h2>Gabarito comentado</h2>
        <div class="question-stack">
          ${quiz.questions.map((question, index) => renderAnsweredQuestion(question, index, result.items.find((item) => item.id === question.id))).join("")}
        </div>
        <button class="primary-button" type="button" data-back-tabs>Voltar para as abas</button>
      </section>
    `;
  }

  function renderAnsweredQuestion(question, index, item) {
    const answer = state.activeQuiz.answers[question.id];
    const expected = question.tipo === "trueFalse" ? question.gabarito : normalizeOptions(question)[Number(question.gabarito)]?.label;
    const marked = question.tipo === "trueFalse"
      ? answer === BLANK || answer === undefined ? "Em branco" : answer === "C" ? "Certo" : "Errado"
      : answer === undefined ? "Em branco" : normalizeOptions(question)[Number(answer)]?.label || answer;
    return `
      <article class="question-card ${item.correct ? "is-correct" : item.wrong ? "is-wrong" : "is-blank"}">
        <div class="question-meta">
          <span>Questão ${index + 1}</span>
          <span>${item.correct ? "✅ certa" : item.wrong ? "❌ errada" : "⬜ branco"}</span>
        </div>
        <p>${escapeHtml(question.enunciado)}</p>
        ${question.codigo ? `<pre><code>${escapeHtml(question.codigo)}</code></pre>` : ""}
        <p><strong>Sua resposta:</strong> ${escapeHtml(marked)} · <strong>Gabarito:</strong> ${escapeHtml(expected ?? question.gabarito)}</p>
        <details open>
          <summary>Ver explicação e fonte</summary>
          <p>${escapeHtml(question.comentario || "Revise o assunto indicado.")}</p>
          ${question.link ? `<a href="${escapeHtml(question.link)}" target="_blank" rel="noreferrer">Link de estudo/fonte</a>` : ""}
        </details>
      </article>
    `;
  }

  function startCrtDaily() {
    const today = getTodayKey();
    startQuiz({
      title: `Simulado diário CRT-SP — ${today}`,
      kind: "crt-daily",
      area: "crt-sp",
      trilha: "CRT-SP",
      scopeKey: "crt-daily",
      scoring: "quadrix",
      questions: selectCrtByDistribution({ countBasicos: 12, countComplementares: 8, countEspecificos: 20, seedKey: `crt-diario-${today}` }),
    });
  }

  function startCrtExtra() {
    state.crtExtraAttempt += 1;
    const dailyIds = selectCrtByDistribution({ countBasicos: 12, countComplementares: 8, countEspecificos: 20, seedKey: `crt-diario-${getTodayKey()}` }).map((question) => question.id);
    startQuiz({
      title: `Questionário extra CRT-SP #${state.crtExtraAttempt}`,
      kind: "crt-extra",
      area: "crt-sp",
      trilha: "CRT-SP",
      scopeKey: "crt-extra",
      scoring: "quadrix",
      questions: selectCrtByDistribution({
        countBasicos: 12,
        countComplementares: 8,
        countEspecificos: 20,
        seedKey: `${getTodayKey()}-${state.currentUserId}-crt-extra-${state.crtExtraAttempt}-${state.difficulty}`,
        difficulty: state.difficulty,
        avoidIds: [...dailyIds, ...getRecentIds("crt-extra")],
      }),
    });
  }

  function startCrtRealExam() {
    startQuiz({
      title: "Prova real CRT-SP — Técnico Administrativo",
      kind: "crt-real",
      area: "crt-sp",
      trilha: "CRT-SP",
      scopeKey: "crt-real",
      scoring: "quadrix",
      durationMinutes: 180,
      questions: selectCrtByDistribution({ countBasicos: 40, countComplementares: 30, countEspecificos: 50, seedKey: `${getTodayKey()}-${state.currentUserId}-crt-real-${Date.now()}` }),
    });
  }

  function startCertificationQuiz() {
    let pool = poolByArea("certificacoes");
    let count = 10;
    let difficulty = state.difficulty;
    if (state.certMode === "simulado") count = 30;
    if (state.certMode === "tema") pool = pool.filter((question) => question.disciplina === state.certTopic);
    if (state.certMode === "dificil") {
      difficulty = "dificil";
      count = 15;
    }
    if (state.certMode === "erros") count = 15;
    startQuiz({
      title: `DP-600 — ${state.certMode}`,
      kind: "certificacoes",
      area: "certificacoes",
      trilha: "DP-600",
      scopeKey: `dp600-${state.certMode}`,
      scoring: "positive",
      questions: selectRotatingQuestions({ pool, count, difficulty, seedKey: `${getTodayKey()}-${state.currentUserId}-dp600-${state.certMode}-${state.certTopic}-${Date.now()}`, avoidIds: getRecentIds(`dp600-${state.certMode}`) }),
    });
  }

  function startProgrammingQuiz() {
    const pool = poolByArea("programacao").filter((question) => question.trilha === state.programmingTrack);
    startQuiz({
      title: `Programação — ${state.programmingTrack}`,
      kind: "programacao",
      area: "programacao",
      trilha: state.programmingTrack,
      scopeKey: `programacao-${state.programmingTrack}`,
      scoring: "positive",
      questions: selectRotatingQuestions({ pool, count: 15, difficulty: state.difficulty, seedKey: `${getTodayKey()}-${state.currentUserId}-prog-${state.programmingTrack}-${Date.now()}`, avoidIds: getRecentIds(`programacao-${state.programmingTrack}`) }),
    });
  }

  function startDataQuiz() {
    const pool = poolByArea("dados").filter((question) => question.trilha === state.dataTrack);
    startQuiz({
      title: `Dados — ${state.dataTrack}`,
      kind: "dados",
      area: "dados",
      trilha: state.dataTrack,
      scopeKey: `dados-${state.dataTrack}`,
      scoring: "positive",
      questions: selectRotatingQuestions({ pool, count: 15, difficulty: state.difficulty, seedKey: `${getTodayKey()}-${state.currentUserId}-dados-${state.dataTrack}-${Date.now()}`, avoidIds: getRecentIds(`dados-${state.dataTrack}`) }),
    });
  }

  function login(userId) {
    registerUserAccess(userId);
    state.activeTab = "dashboard";
    $("#login-screen").hidden = true;
    $("#app-shell").hidden = false;
    $("#contest-picker").hidden = true;
    $("#workspace").hidden = false;
    renderActiveTab();
  }

  function resetCurrentUserData() {
    const user = getCurrentUser();
    if (!user || !confirm(`Zerar todos os dados locais de ${user.nome}?`)) return;
    const fresh = makeUserStats(user.id);
    fresh.totalAcessos = 1;
    fresh.ultimoDiaAcessado = getTodayKey();
    fresh.streakAtual = 1;
    fresh.maiorStreak = 1;
    saveUserStats(fresh, user.id);
    renderActiveTab();
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button, a");
    if (!target) return;

    const loginUser = target.dataset.loginUser;
    if (loginUser) login(loginUser);
    if (target.dataset.switchUser !== undefined || target.id === "switch-user") renderUserSelection();
    if (target.dataset.resetUser !== undefined) resetCurrentUserData();
    if (target.dataset.tab) {
      state.activeTab = target.dataset.tab;
      state.activeQuiz = null;
      renderActiveTab();
    }
    if (target.dataset.startCrtDaily !== undefined) startCrtDaily();
    if (target.dataset.startCrtExtra !== undefined) startCrtExtra();
    if (target.dataset.startCrtReal !== undefined) startCrtRealExam();
    if (target.dataset.startCert !== undefined) startCertificationQuiz();
    if (target.dataset.startProgramming !== undefined) startProgrammingQuiz();
    if (target.dataset.startData !== undefined) startDataQuiz();
    if (target.dataset.cancelQuiz !== undefined || target.dataset.backTabs !== undefined) {
      state.activeQuiz = null;
      renderActiveTab();
    }
    if (target.dataset.finishQuiz !== undefined) finishQuiz();
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (target.matches("[data-difficulty]")) state.difficulty = target.value;
    if (target.matches("[data-cert-mode]")) state.certMode = target.value;
    if (target.matches("[data-cert-topic]")) state.certTopic = target.value;
    if (target.matches("[data-programming-track]")) state.programmingTrack = target.value;
    if (target.matches("[data-data-track]")) state.dataTrack = target.value;
    if (target.matches("[data-answer]") && state.activeQuiz) {
      state.activeQuiz.answers[target.dataset.answer] = target.value;
      target.closest(".question-card")?.querySelectorAll(".answer-option").forEach((option) => option.classList.remove("selected"));
      target.closest(".answer-option")?.classList.add("selected");
    }
  });

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (target.matches("[data-open-answer]") && state.activeQuiz) {
      state.activeQuiz.answers[target.dataset.openAnswer] = target.value;
    }
  });

  window.MINIMOS_PROVA_REAL = MINIMOS_PROVA_REAL;
  window.selectRotatingQuestions = selectRotatingQuestions;

  renderUserSelection();
})();
