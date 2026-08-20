"use strict";

(function initStudyPlatform() {
  const DATA = window.STUDY_DATA || { questoes: [], sources: {} };
  const EXTRA_BANK = window.QUESTION_BANK || [];
  const SANTOS_IBAM_CONFIG = window.SANTOS_IBAM_CONFIG || { roles: [], officialLinks: {} };
  const CAREER_GUIDES = window.CAREER_GUIDES || {};
  const STORE_KEY = "crtsp-gamified-study-v1";
  const TIMEZONE = "America/Sao_Paulo";
  const BLANK = "__blank__";
  const MINIMOS_PROVA_REAL = { basicos: 10, complementares: 8, especificos: 17, total: 36 };

  const USERS = [
    { id: "kaua", nome: "Kauã", initial: "K", accent: "verde" },
    { id: "vitoria", nome: "Vitória", initial: "V", accent: "coral" },
    { id: "caio", nome: "Caio", initial: "C", accent: "azul" },
    { id: "mequis", nome: "Mequis", initial: "M", accent: "roxo" },
  ];

  const TABS = [
    ["santos-ibam", "Concursos Santos — IBAM"],
    ["programacao", "Trilhas"],
    ["certificacoes", "Certificações"],
    ["dados", "Dados"],
    ["academia-dados", "Academia de Dados"],
    ["estudos", "Estudos"],
    ["historico", "Histórico"],
  ];

  const MODE_TABS = {
    concursos: ["santos-ibam", "estudos", "historico"],
    tech: ["programacao", "certificacoes", "dados", "academia-dados", "estudos", "historico"],
  };

  const OPEN_TYPES = new Set(["explainCode", "explainConcept", "sqlQuery", "daxMeasure", "completeCode", "orderSteps", "caseStudy", "businessQuestion", "administrativeWriting"]);
  const DIFFICULTY_POINTS = { facil: 1, medio: 2, dificil: 3 };
  const CRT_ROLE_ID = "crt-tecnico-administrativo-bs";

  const state = {
    currentUserId: null,
    activeTab: "santos-ibam",
    studyMode: "concursos",
    difficulty: "misto",
    crtExtraAttempt: 0,
    certTrack: "DP-600",
    certMode: "rapidas",
    certTopic: "Microsoft Fabric",
    programmingTrack: "Python",
    programmingCareer: "frontend",
    programmingDetail: null,
    dataTrack: "Fundamentos de Dados",
    academyTrack: "Fundamentos de Dados",
    academyMode: "rapido",
    academyQuantity: 10,
    academyAttempt: 0,
    santosCargo: "santos-agente-portaria",
    santosQuantity: 20,
    santosAttempt: 0,
    activeQuiz: null,
  };

  let dailySelectionPromise = null;

  const DATA_ACADEMY_TRACKS = [
    { id: "Fundamentos de Dados", title: "Fundamentos de Dados", level: "Iniciante", description: "Base para pensar como analista: qualidade, nulos, duplicidade, granularidade, métricas, KPIs e insights." },
    { id: "SQL para Análise", title: "SQL para Análise", level: "Iniciante/intermediário", description: "SELECT, filtros, JOINs, GROUP BY, HAVING, CTEs, janelas e consultas para perguntas de negócio." },
    { id: "Python/Pandas", title: "Python/Pandas", level: "Iniciante/intermediário", description: "DataFrames, filtros, groupby, merge, datas, nulos, duplicados e análise exploratória." },
    { id: "Power BI e DAX", title: "Power BI e DAX", level: "Intermediário", description: "Power Query, modelo estrela, medidas, CALCULATE, SUMX, visuais, performance e storytelling." },
    { id: "Modelagem de Dados", title: "Modelagem de Dados", level: "Intermediário", description: "Fatos, dimensões, chaves, granularidade, normalização, BI e modelagem dimensional." },
    { id: "ETL, ELT e Engenharia de Dados", title: "ETL, ELT e Engenharia de Dados", level: "Intermediário", description: "Pipelines, ingestão, incremental load, particionamento, lakehouse, bronze/silver/gold e monitoramento." },
    { id: "Microsoft Fabric e DP-600", title: "Microsoft Fabric e DP-600", level: "Intermediário/avançado", description: "OneLake, Lakehouse, Warehouse, Semantic Model, Dataflows Gen2, Direct Lake, shortcuts e governança." },
    { id: "Analytics e Negócio", title: "Analytics e Negócio", level: "Iniciante/intermediário", description: "SLA, produtividade, churn, funil, estoque, atendimento, métricas e tomada de decisão." },
    { id: "Desafios de Portfólio", title: "Desafios de Portfólio", level: "Prático", description: "Projetos guiados para GitHub e LinkedIn com perguntas de negócio e entregáveis." },
    { id: "Revisão Inteligente", title: "Revisão Inteligente", level: "Personalizado", description: "Treino puxado dos assuntos com mais erro, brancos e menor desempenho no histórico." },
  ];

  const DATA_PORTFOLIO_PROJECTS = [
    {
      name: "Dashboard de chamados de TI",
      objective: "Analisar volume de chamados, tempo médio de resolução, SLA, setor e técnico responsável.",
      skills: "SQL, Power BI, métricas, atendimento e dashboard operacional.",
      dataset: "Planilha fictícia ou exportação anonimizada de chamados: abertura, fechamento, setor, técnico, prioridade e status.",
      questions: ["Qual setor abre mais chamados?", "Qual técnico tem maior fila?", "Qual prioridade estoura mais SLA?"],
      metrics: "Total de chamados, TMR, SLA %, backlog, chamados por setor e prioridade.",
      tools: "Excel/CSV, SQL, Power BI e README no GitHub.",
      deliverables: "Dashboard, consultas SQL, dicionário de dados e README explicando decisões.",
      difficulty: "Médio",
      github: "Explique objetivo, fonte/dataset, modelagem, métricas, prints do dashboard e aprendizados.",
      linkedin: "Conte o problema, mostre 2 insights e diga quais decisões o dashboard ajudaria a tomar.",
    },
    {
      name: "Análise de ordens de serviço",
      objective: "Entender gargalos, produtividade e tempo de atendimento.",
      skills: "Limpeza de dados, Power BI, indicadores e análise operacional.",
      dataset: "OS com data de abertura, fechamento, solicitante, responsável, categoria e status.",
      questions: ["Onde estão os gargalos?", "Qual categoria demora mais?", "Qual etapa concentra atrasos?"],
      metrics: "Lead time, throughput, backlog, aging e produtividade por responsável.",
      tools: "SQL, Power Query e Power BI.",
      deliverables: "Relatório de gargalos, dashboard operacional e recomendações.",
      difficulty: "Médio",
      github: "Inclua diagrama simples do fluxo e regra de cálculo dos indicadores.",
      linkedin: "Mostre como a análise identifica gargalos e prioriza melhoria de processo.",
    },
    {
      name: "Inventário de máquinas",
      objective: "Cruzar equipamentos, status, setor e necessidade de manutenção.",
      skills: "Modelagem, Power BI, ETL, indicadores e qualidade de dados.",
      dataset: "Inventário com patrimônio, usuário, setor, status, idade, garantia e última manutenção.",
      questions: ["Quais máquinas estão críticas?", "Qual setor tem maior risco?", "O que vence garantia primeiro?"],
      metrics: "Máquinas críticas, idade média, cobertura de garantia, manutenção vencida e risco por setor.",
      tools: "Excel, Power Query, DAX e Power BI.",
      deliverables: "Dashboard de inventário, matriz de risco e plano de ação.",
      difficulty: "Fácil/médio",
      github: "Documente regras de classificação de risco e tratamento de nulos.",
      linkedin: "Explique como dados de inventário reduzem parada e ajudam planejamento.",
    },
    {
      name: "Análise de derrotas do Santos",
      objective: "Analisar partidas, gols sofridos, mando de campo, sequência, técnicos e desempenho.",
      skills: "Coleta de dados, limpeza, análise exploratória e storytelling.",
      dataset: "CSV montado manualmente com jogos, placar, competição, mando, técnico e período.",
      questions: ["O time perde mais em qual contexto?", "Há sequência crítica?", "Qual indicador explica melhor a fase?"],
      metrics: "Derrotas por mês, gols sofridos, aproveitamento, sequência sem vitória e mando.",
      tools: "Python/Pandas, Power BI e narrativa visual.",
      deliverables: "Notebook de EDA, dashboard e texto de insight.",
      difficulty: "Médio",
      github: "Separe coleta, limpeza, análise e visualizações no README.",
      linkedin: "Use storytelling: pergunta inicial, achado surpreendente e gráfico principal.",
    },
    {
      name: "Análise de estoque",
      objective: "Identificar itens críticos, giro, estoque mínimo e risco de ruptura.",
      skills: "Logística, materiais, KPIs, SQL e Power BI.",
      dataset: "Movimentações com item, entrada, saída, saldo, custo, fornecedor e data.",
      questions: ["Quais itens têm risco de ruptura?", "Qual item está parado?", "Onde há capital empatado?"],
      metrics: "Giro, cobertura, estoque mínimo, ruptura, curva ABC e valor parado.",
      tools: "SQL, Power Query e Power BI.",
      deliverables: "Dashboard de estoque, curva ABC e recomendação de reposição.",
      difficulty: "Médio",
      github: "Inclua regra de curva ABC e cálculo de cobertura.",
      linkedin: "Mostre como análise de estoque evita falta e reduz capital parado.",
    },
    {
      name: "Dashboard de estudos",
      objective: "Acompanhar horas estudadas, questões feitas, taxa de acerto e evolução por disciplina.",
      skills: "Modelagem, DAX, visualização, métricas e disciplina de estudo.",
      dataset: "Histórico manual de estudos: data, disciplina, minutos, questões, acertos e erros.",
      questions: ["Qual disciplina evolui?", "Onde o acerto caiu?", "Qual meta diária foi cumprida?"],
      metrics: "Horas, questões, acerto %, streak, média móvel e pontos por disciplina.",
      tools: "Google Sheets/Excel, Power BI e DAX.",
      deliverables: "Dashboard pessoal, metas e plano de revisão.",
      difficulty: "Fácil",
      github: "Explique o modelo e como outra pessoa pode usar o template.",
      linkedin: "Mostre evolução e fale sobre aprender dados usando seus próprios estudos.",
    },
  ];

  const PROGRAMMING_CAREERS = [
    {
      id: "frontend",
      title: "Front-end Developer",
      level: "Iniciante",
      description: "Interfaces responsivas, HTML semântico, CSS moderno, JavaScript e consumo de dados.",
      sourceTracks: ["HTML", "CSS", "JavaScript", "Git"],
      modules: ["HTML semântico", "CSS responsivo", "JavaScript DOM", "Git e deploy"],
      project: "Landing page responsiva com interação em JavaScript",
      image: "assets/careers/frontend.webp",
      imageAlt: "Desenvolvedor criando uma interface responsiva em várias telas",
    },
    {
      id: "backend",
      title: "Back-end Developer",
      level: "Base forte",
      description: "Lógica, Python/Java, SQL, erros comuns, leitura de código e raciocínio de API.",
      sourceTracks: ["Python", "Java", "SQL", "Git"],
      modules: ["Lógica aplicada", "Python ou Java", "SQL essencial", "Tratamento de erros"],
      project: "API conceitual de chamados com regras de negócio",
      image: "assets/careers/backend.webp",
      imageAlt: "Desenvolvedor trabalhando com servidores, APIs e bancos de dados",
    },
    {
      id: "fullstack",
      title: "Full Stack Web",
      level: "Prático",
      description: "Une tela, regra, dados e versionamento para construir aplicações completas.",
      sourceTracks: ["HTML", "CSS", "JavaScript", "SQL", "Git"],
      modules: ["Layout", "Eventos JS", "CRUD conceitual", "Deploy e GitHub"],
      project: "Mini sistema de tarefas com filtros e persistência local",
      image: "assets/careers/fullstack.webp",
      imageAlt: "Desenvolvedor conectando interface, aplicação e banco de dados",
    },
    {
      id: "dados-bi",
      title: "Dados e BI",
      level: "Carreira de dados",
      description: "SQL, Python, leitura de base, indicadores e preparação para Power BI/Fabric.",
      sourceTracks: ["Python", "SQL", "Git"],
      modules: ["SQL para análise", "Python básico", "Estruturas", "Git para portfólio"],
      project: "Análise de chamados com consultas e insights",
      image: "assets/careers/dados-bi.webp",
      imageAlt: "Analista explorando painéis, indicadores e conjuntos de dados",
    },
    {
      id: "qa",
      title: "QA / Testes",
      level: "Iniciante",
      description: "Raciocínio de erro, leitura de requisitos, casos de teste e validação de comportamento.",
      sourceTracks: ["JavaScript", "Git", "HTML", "CSS"],
      modules: ["Casos de teste", "Bugs comuns", "Validação de tela", "Versionamento"],
      project: "Checklist de testes para uma página de cadastro",
      image: "assets/careers/qa.webp",
      imageAlt: "Profissional de qualidade validando fluxos e encontrando falhas",
    },
    {
      id: "devops",
      title: "DevOps Júnior",
      level: "Fundamentos",
      description: "Git, comandos, fluxo de deploy, automação simples e leitura de logs.",
      sourceTracks: ["Git", "Python", "SQL"],
      modules: ["Git na prática", "Scripts simples", "Noção de banco", "Deploy estático"],
      project: "Pipeline manual: build, validação e publicação",
      image: "assets/careers/devops.webp",
      imageAlt: "Engenheiro acompanhando uma esteira automatizada de publicação",
    },
  ];

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

  function validateDailySelectionPayload(payload) {
    if (
      !payload
      || payload.date !== getTodayKey()
      || payload.timezone !== TIMEZONE
      || !payload.selections
      || typeof payload.selections !== "object"
    ) return null;

    const lists = Object.values(payload.selections);
    if (!lists.length || lists.some((ids) => (
      !Array.isArray(ids)
      || ids.some((id) => typeof id !== "string" || !id)
      || new Set(ids).size !== ids.length
    ))) return null;

    return payload;
  }

  function loadDailySelection() {
    if (!dailySelectionPromise) {
      dailySelectionPromise = fetch("data/daily-selection.json", { cache: "no-store" })
        .then((response) => (response.ok ? response.json() : null))
        .then(validateDailySelectionPayload)
        .catch(() => null);
    }
    return dailySelectionPromise;
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

  function questionDiversityKey(question) {
    const scope = question.trilha || question.cargo_id || question.concurso_id || question.area || "geral";
    const subject = question.subassunto || question.assunto || question.disciplina || question.materia_id || question.id;
    return `${scope}::${subject}`;
  }

  function takeDiverseQuestions(items, count, seedKey, alreadySelected = []) {
    const remaining = shuffleWithSeed(items, seedKey);
    const usage = new Map();
    alreadySelected.forEach((question) => {
      const key = questionDiversityKey(question);
      usage.set(key, (usage.get(key) || 0) + 1);
    });
    const picked = [];

    while (picked.length < count && remaining.length) {
      let bestIndex = 0;
      let bestUsage = Number.POSITIVE_INFINITY;
      for (let index = 0; index < remaining.length; index += 1) {
        const currentUsage = usage.get(questionDiversityKey(remaining[index])) || 0;
        if (currentUsage < bestUsage) {
          bestUsage = currentUsage;
          bestIndex = index;
          if (currentUsage === 0) break;
        }
      }
      const [question] = remaining.splice(bestIndex, 1);
      picked.push(question);
      const key = questionDiversityKey(question);
      usage.set(key, (usage.get(key) || 0) + 1);
    }

    return picked;
  }

  function takeFreshThenRecent(items, count, seedKey, avoid, alreadySelected = []) {
    const fresh = items.filter((question) => !avoid.has(question.id));
    const selected = takeDiverseQuestions(
      fresh,
      Math.min(count, fresh.length),
      `${seedKey}-fresh`,
      alreadySelected,
    );

    if (selected.length < count) {
      const selectedIds = new Set(selected.map((question) => question.id));
      const recent = items.filter((question) => !selectedIds.has(question.id));
      selected.push(...takeDiverseQuestions(
        recent,
        count - selected.length,
        `${seedKey}-recent`,
        [...alreadySelected, ...selected],
      ));
    }

    return selected;
  }

  function selectRotatingQuestions({ pool, count, difficulty = "misto", seedKey, avoidIds = [] }) {
    const avoid = new Set(avoidIds);
    const candidates = pool.filter((question) => question.status !== "inativo");

    if (difficulty === "misto") {
      const selected = [];
      const byDifficulty = ["facil", "medio", "dificil"].map((level) => (
        candidates.filter((question) => question.dificuldade === level && !avoid.has(question.id))
      ));
      const targetByLevel = Math.floor(count / 3);
      byDifficulty.forEach((list, index) => {
        selected.push(...takeDiverseQuestions(list, targetByLevel, `${seedKey}-${index}`, selected));
      });
      const remaining = candidates.filter((question) => !selected.some((picked) => picked.id === question.id) && !avoid.has(question.id));
      selected.push(...takeDiverseQuestions(remaining, count - selected.length, `${seedKey}-fill`, selected));
      if (selected.length < count) {
        const fallback = candidates.filter((question) => !selected.some((picked) => picked.id === question.id));
        selected.push(...takeDiverseQuestions(fallback, count - selected.length, `${seedKey}-fallback`, selected));
      }
      return selected.slice(0, count);
    }

    const preferred = candidates.filter((question) => question.dificuldade === difficulty);
    const selected = takeFreshThenRecent(preferred, Math.min(count, preferred.length), `${seedKey}-preferred`, avoid);

    if (selected.length < count) {
      const preferredIds = new Set(preferred.map((question) => question.id));
      const fallback = candidates.filter((question) => !preferredIds.has(question.id));
      selected.push(...takeFreshThenRecent(
        fallback,
        Math.min(count - selected.length, fallback.length),
        `${seedKey}-fallback`,
        avoid,
        selected,
      ));
    }

    return selected.slice(0, count);
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
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(store));
      return true;
    } catch {
      return false;
    }
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
      questionariosAcademiaDadosFinalizados: 0,
      questionariosSantosIbamFinalizados: 0,
      melhorPontuacaoPonderadaSantos: null,
      melhorPontuacaoLiquidaGeral: null,
      ultimaPontuacaoLiquida: 0,
      mediaPontuacao: 0,
      totalQuestoesRespondidas: 0,
      totalAcertos: 0,
      totalErros: 0,
      totalBrancos: 0,
      totalParciais: 0,
      historicoUltimosResultados: [],
      materiasComMaisErro: {},
      materiasComMaisBranco: {},
      trilhasEstudadas: {},
      recentQuestionIds: {},
      careerProgress: {},
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
    const existing = store.users[userId];
    if (!existing) {
      store.users[userId] = makeUserStats(userId);
      saveStore(store);
      return store.users[userId];
    }
    return {
      ...makeUserStats(userId),
      ...existing,
      careerProgress: existing.careerProgress && typeof existing.careerProgress === "object" ? existing.careerProgress : {},
    };
  }

  function getProgrammingCareer(id = state.programmingCareer) {
    return PROGRAMMING_CAREERS.find((career) => career.id === id) || PROGRAMMING_CAREERS[0];
  }

  function getProgrammingGuide(careerId = state.programmingCareer) {
    return CAREER_GUIDES[careerId] || null;
  }

  function getProgrammingCareerProgress(career, stats = loadUserStats()) {
    const guide = getProgrammingGuide(career.id);
    const history = stats.historicoUltimosResultados || [];
    const careerHistory = history.filter((item) => (
      item.kind === "programacao" && item.scopeKey === `programacao-${career.id}`
    ) || (
      item.area === "programacao" && item.trilha === career.title
    ));
    const validStepIds = new Set((guide?.stages || []).map((stage) => stage.id));
    const stored = stats.careerProgress?.[career.id] || {};
    const storedSteps = Array.isArray(stored.completedSteps) ? stored.completedSteps : [];
    const completedSteps = [...new Set(storedSteps)].filter((id) => validStepIds.has(id));
    const stageTotal = validStepIds.size;
    const historyQuizPassed = careerHistory.some((item) => Number(item.percentual) >= 70);
    const quizPassed = Boolean(stored.quizPassed) || historyQuizPassed;
    if (historyQuizPassed && !stored.quizPassed) {
      stats.careerProgress = stats.careerProgress || {};
      stats.careerProgress[career.id] = {
        ...stored,
        completedSteps,
        quizPassed: true,
        projectDone: Boolean(stored.projectDone),
        updatedAt: new Date().toISOString(),
      };
      saveUserStats(stats);
    }
    const projectDone = Boolean(stored.projectDone);
    const stagePercent = stageTotal ? (completedSteps.length / stageTotal) * 70 : 0;
    const percent = Math.round(stagePercent + (quizPassed ? 20 : 0) + (projectDone ? 10 : 0));
    const nextStage = (guide?.stages || []).find((stage) => !completedSteps.includes(stage.id)) || null;
    return {
      attempts: careerHistory.length,
      percent,
      last: careerHistory[0] || null,
      completedSteps,
      stageTotal,
      quizPassed,
      projectDone,
      nextStage,
    };
  }

  function updateProgrammingCareerProgress(careerId, update) {
    const career = getProgrammingCareer(careerId);
    const guide = getProgrammingGuide(career.id);
    if (!guide) return;
    const stats = loadUserStats();
    stats.careerProgress = stats.careerProgress || {};
    const validStepIds = new Set(guide.stages.map((stage) => stage.id));
    const current = stats.careerProgress[career.id] || {};
    const record = {
      completedSteps: [...new Set(Array.isArray(current.completedSteps) ? current.completedSteps : [])].filter((id) => validStepIds.has(id)),
      quizPassed: Boolean(current.quizPassed),
      projectDone: Boolean(current.projectDone),
    };
    update(record);
    record.completedSteps = [...new Set(record.completedSteps)].filter((id) => validStepIds.has(id));
    record.updatedAt = new Date().toISOString();
    stats.careerProgress[career.id] = record;
    saveUserStats(stats);
  }

  function saveUserStats(stats, userId = state.currentUserId) {
    const store = loadStore();
    store.users = store.users || {};
    store.users[userId] = stats;
    return saveStore(store);
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

  function santosRoles() {
    return SANTOS_IBAM_CONFIG.roles || [];
  }

  function getSantosRole(roleId = state.santosCargo) {
    return santosRoles().find((role) => role.id === roleId) || santosRoles()[0];
  }

  function santosPool(roleId = state.santosCargo, { includeWriting = false } = {}) {
    return poolByArea("concursos-santos-ibam")
      .filter((question) => (
        question.cargo_id === roleId
        && (includeWriting || question.tipo === "multipleChoice")
      ));
  }

  function santosObjectiveMaxScore(role) {
    return (role?.distribution || []).reduce((sum, item) => sum + item.count * item.peso, 0);
  }

  function getRecentIds(scopeKey, aliases = []) {
    const stats = loadUserStats();
    const recent = stats.recentQuestionIds || {};
    return [...new Set(
      [scopeKey, ...aliases].flatMap((key) => recent[key] || []),
    )];
  }

  function santosScopeKey(roleId) {
    return roleId.startsWith("santos-") ? roleId : `santos-${roleId}`;
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

  async function selectDailyCrtByDistribution({ countBasicos, countComplementares, countEspecificos, seedKey }) {
    const fallback = () => selectCrtByDistribution({
      countBasicos,
      countComplementares,
      countEspecificos,
      seedKey,
    });
    const payload = await loadDailySelection();
    const scopeKey = `crt-sp::${CRT_ROLE_ID}`;
    const ids = payload?.selections?.[scopeKey];
    if (!Array.isArray(ids)) return fallback();

    const pool = crtPool();
    const role = DATA.concursos
      ?.find((contest) => contest.id === "crt-sp")
      ?.roles?.find((item) => item.id === CRT_ROLE_ID);
    if (!role || ids.length !== role.exam.totalQuestoes) return fallback();

    const byId = new Map(pool.map((question) => [question.id, question]));
    const selected = ids.map((id) => byId.get(id));
    if (selected.some((question) => !question)) return fallback();

    const blocks = [
      ["Conhecimentos básicos", countBasicos],
      ["Conhecimentos complementares", countComplementares],
      ["Conhecimentos específicos", countEspecificos],
    ];
    const daily = blocks.flatMap(([block, count]) => (
      selected.filter((question) => question.bloco === block).slice(0, count)
    ));
    const expected = countBasicos + countComplementares + countEspecificos;
    return daily.length === expected ? daily : fallback();
  }

  function updateStatsAfterActivity(result) {
    const stats = loadUserStats();
    stats.totalQuestoesRespondidas += result.total;
    stats.totalAcertos += result.correct;
    stats.totalErros += result.wrong;
    stats.totalBrancos += result.blank;
    stats.totalParciais = (stats.totalParciais || 0) + (result.partial || 0);
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
    if (result.area === "academia-dados") stats.questionariosAcademiaDadosFinalizados = (stats.questionariosAcademiaDadosFinalizados || 0) + 1;
    if (result.area === "concursos-santos-ibam") {
      stats.questionariosSantosIbamFinalizados = (stats.questionariosSantosIbamFinalizados || 0) + 1;
      stats.melhorPontuacaoPonderadaSantos = stats.melhorPontuacaoPonderadaSantos === null || stats.melhorPontuacaoPonderadaSantos === undefined
        ? result.score
        : Math.max(stats.melhorPontuacaoPonderadaSantos, result.score);
    }

    stats.trilhasEstudadas[result.trilha] = (stats.trilhasEstudadas[result.trilha] || 0) + 1;

    if (result.area === "programacao" && result.percent >= 70) {
      const career = PROGRAMMING_CAREERS.find((item) => result.scopeKey === `programacao-${item.id}`);
      if (career) {
        stats.careerProgress = stats.careerProgress || {};
        const current = stats.careerProgress[career.id] || {};
        stats.careerProgress[career.id] = {
          ...current,
          completedSteps: Array.isArray(current.completedSteps) ? current.completedSteps : [],
          quizPassed: true,
          projectDone: Boolean(current.projectDone),
          updatedAt: new Date().toISOString(),
        };
      }
    }

    for (const item of result.items) {
      if (!item.correct && !item.blank && !item.partial) {
        stats.materiasComMaisErro[item.disciplina] = (stats.materiasComMaisErro[item.disciplina] || 0) + 1;
        if (result.area === "academia-dados" && item.assunto) {
          stats.materiasComMaisErro[item.assunto] = (stats.materiasComMaisErro[item.assunto] || 0) + 1;
        }
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
      kind: result.kind,
      scopeKey: result.scopeKey,
      area: result.area,
      trilha: result.trilha,
      total: result.total,
      acertos: result.correct,
      erros: result.wrong,
      brancos: result.blank,
      parciais: result.partial || 0,
      pontuacao: result.score,
      pontuacaoMaxima: result.maxScore || result.total,
      percentual: result.percent,
      pontosGanhos: result.gamifiedPoints,
      dificuldade: result.difficulty || state.difficulty,
      observacao: result.observation || "",
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
    document.body.classList.remove("mode-concursos", "mode-tech");
    state.currentUserId = null;
    const target = $("#profile-options");
    target.innerHTML = USERS.map((user) => `
      <button class="profile-card" type="button" data-login-user="${escapeHtml(user.id)}">
        <span class="profile-card__avatar profile-card__avatar--${escapeHtml(user.accent)}">${escapeHtml(user.initial)}</span>
        <span>
          <strong>${escapeHtml(user.nome)}</strong>
        </span>
        <span aria-hidden="true">🚀</span>
      </button>
    `).join("");
  }

  function renderHeader() {
    const user = getCurrentUser();
    const stats = loadUserStats();
    const concursosMode = state.studyMode === "concursos";
    document.body.classList.toggle("mode-concursos", concursosMode);
    document.body.classList.toggle("mode-tech", !concursosMode);
    $("#top-user-name").textContent = user ? `${user.nome} · 🔥 ${stats.streakAtual}` : "";
    $("#change-contest").hidden = true;
    $("#hero-eyebrow").textContent = concursosMode ? "Concursos públicos" : "Modo tech";
    $("#hero-title").textContent = concursosMode ? "Escolha seu concurso" : "Trilhas de tecnologia";
    $("#hero-copy").textContent = concursosMode
      ? "Comece pelos concursos ativos, veja os cargos e gere simulados por banca com pontuação do edital."
      : "Ative programação, dados, certificações e academia prática em um ambiente escuro para treino intensivo.";
    $("#hero-notice").hidden = true;
    $("#study-mode-switch")?.classList.toggle("is-tech", !concursosMode);
    document.querySelectorAll("[data-mode-switch]").forEach((button) => {
      button.classList.toggle("active", button.dataset.modeSwitch === state.studyMode);
    });
    $("#active-contest-card").innerHTML = `
      <p class="eyebrow">${concursosMode ? "Selecionado" : "Disponível"}</p>
      <h2>${concursosMode ? "Santos — IBAM" : "Tech"}</h2>
      <p>${concursosMode ? "Agente, Inspetor e Oficial" : "DP-600, Programação e Dados"}</p>
      <div class="compact-facts">
        <span>${concursosMode ? "3 cargos" : "4 trilhas"}</span>
        <span>${concursosMode ? "IBAM" : "modo escuro"}</span>
      </div>
    `;
  }

  function renderTabs() {
    const allowed = MODE_TABS[state.studyMode] || MODE_TABS.concursos;
    $("#tabs").innerHTML = TABS.filter(([id]) => allowed.includes(id)).map(([id, label]) => `
      <button type="button" class="${state.activeTab === id ? "active" : ""}" data-tab="${escapeHtml(id)}" aria-current="${state.activeTab === id ? "page" : "false"}">${escapeHtml(label)}</button>
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
      const activities = stats.simuladosCrtFinalizados + stats.provasReaisCrtFinalizadas + stats.questionariosCertificacaoFinalizados + stats.questionariosProgramacaoFinalizados + stats.questionariosDadosFinalizados + (stats.questionariosAcademiaDadosFinalizados || 0) + (stats.questionariosSantosIbamFinalizados || 0);
      return { user, stats, activities };
    });
    const score = (row) => (row.stats.pontosTotais || 0) + (row.stats.maiorStreak || 0) * 5 + row.activities * 3 + (row.stats.mediaPontuacao || 0);
    const winner = [...rows].sort((a, b) => score(b) - score(a))[0];

    return `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Ranking local</p>
          <h2>🏆 Ranking dos perfis</h2>
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

  function getSantosWeakSubject(stats = loadUserStats()) {
    const ibamSubjects = new Set(poolByArea("concursos-santos-ibam").map((question) => question.disciplina));
    const combined = {};
    for (const [subject, count] of Object.entries(stats.materiasComMaisErro || {})) {
      if (ibamSubjects.has(subject)) combined[subject] = (combined[subject] || 0) + count;
    }
    for (const [subject, count] of Object.entries(stats.materiasComMaisBranco || {})) {
      if (ibamSubjects.has(subject)) combined[subject] = (combined[subject] || 0) + count;
    }
    return getTopKey(combined);
  }

  function renderDashboard() {
    const stats = loadUserStats();
    const accuracy = stats.totalQuestoesRespondidas ? Math.round((stats.totalAcertos / stats.totalQuestoesRespondidas) * 100) : 0;
    const recent = stats.historicoUltimosResultados || [];
    const santosHistory = recent.filter((item) => item.area === "concursos-santos-ibam");
    const techHistory = recent.filter((item) => ["certificacoes", "programacao", "dados", "academia-dados"].includes(item.area));
    const bestSantos = [...santosHistory].sort((a, b) => (b.percentual || 0) - (a.percentual || 0))[0];
    const worstSantosSubject = getSantosWeakSubject(stats);
    const isConcursos = state.studyMode === "concursos";
    const visibleHistory = isConcursos ? santosHistory : techHistory;
    const metrics = isConcursos
      ? [
        metricCard("Santos IBAM", stats.questionariosSantosIbamFinalizados || 0, "simulados finalizados"),
        metricCard("Melhor cargo", bestSantos?.trilha || "—", bestSantos ? `${bestSantos.percentual}%` : "sem histórico"),
        metricCard("Pior disciplina", worstSantosSubject, "por erros/brancos"),
        metricCard("Melhor ponderada", stats.melhorPontuacaoPonderadaSantos ?? "—", "pontuação por pesos"),
        metricCard("Taxa geral", `${accuracy}%`, `${stats.totalAcertos}/${stats.totalQuestoesRespondidas}`),
        metricCard("Foguinho", `🔥 ${stats.streakAtual}`, `recorde: ${stats.maiorStreak}`),
      ]
      : [
        metricCard("DP-600", stats.questionariosCertificacaoFinalizados, "questionários finalizados"),
        metricCard("Programação", stats.questionariosProgramacaoFinalizados, "questionários finalizados"),
        metricCard("Dados", stats.questionariosDadosFinalizados, "questionários finalizados"),
        metricCard("Academia de Dados", stats.questionariosAcademiaDadosFinalizados || 0, "treinos práticos"),
        metricCard("Taxa tech", `${accuracy}%`, `${stats.totalAcertos}/${stats.totalQuestoesRespondidas}`),
        metricCard("Trilha mais estudada", getTopKey(stats.trilhasEstudadas), "por atividades"),
      ];

    $("#dashboard").innerHTML = "";
    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Dashboard</p>
          <h2>${escapeHtml(stats.nome)}, ${isConcursos ? "seu painel de concursos" : "seu painel tech"} 🔥</h2>
        </div>
        <div class="dashboard-grid">${metrics.join("")}</div>
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
    const allCertQuestions = poolByArea("certificacoes");
    const certs = [...new Set(allCertQuestions.map((question) => question.trilha))];
    if (!certs.includes(state.certTrack)) state.certTrack = certs[0] || "DP-600";
    const topics = [...new Set(allCertQuestions.filter((question) => question.trilha === state.certTrack).map((question) => question.disciplina))];
    if (!topics.includes(state.certTopic)) state.certTopic = topics[0] || state.certTopic;
    $("#tab-content").innerHTML = `
      <section class="panel panel--tech-flow">
        <div class="section-heading">
          <p class="eyebrow">Certificações</p>
          <h2>Escolha sua certificação</h2>
          <p class="section-lead">Selecione uma prova e comece. Você pode fazer uma sessão rápida, um simulado completo ou revisar um tema.</p>
        </div>
        <div class="cert-grid" role="list" aria-label="Certificações disponíveis">
          ${certs.map((cert, index) => {
            const amount = allCertQuestions.filter((question) => question.trilha === cert).length;
            return `<button class="mini-path ${state.certTrack === cert ? "is-selected" : ""}" style="--item-index:${index}" type="button" data-select-cert="${escapeHtml(cert)}" aria-pressed="${state.certTrack === cert}"><span class="mini-path__mark" aria-hidden="true">${escapeHtml(cert.slice(0, 2))}</span><span><strong>${escapeHtml(cert)}</strong><small>${amount} questões</small></span><span class="mini-path__check" aria-hidden="true">✓</span></button>`;
          }).join("")}
        </div>
        <div class="cert-controls">
          <label class="field">
            <span>Como quer praticar?</span>
            <select data-cert-mode>
              <option value="rapidas" ${state.certMode === "rapidas" ? "selected" : ""}>Sessão rápida · 10 questões</option>
              <option value="simulado" ${state.certMode === "simulado" ? "selected" : ""}>Simulado · 30 questões</option>
              <option value="tema" ${state.certMode === "tema" ? "selected" : ""}>Revisão por tema</option>
              <option value="dificil" ${state.certMode === "dificil" ? "selected" : ""}>Desafio · 15 difíceis</option>
              <option value="erros" ${state.certMode === "erros" ? "selected" : ""}>Revisar erros frequentes</option>
            </select>
          </label>
          ${state.certMode === "tema" ? `<label class="field cert-topic-field">
            <span>Tema</span>
            <select data-cert-topic>
              ${topics.map((topic) => `<option value="${escapeHtml(topic)}" ${state.certTopic === topic ? "selected" : ""}>${escapeHtml(topic)}</option>`).join("")}
            </select>
          </label>` : ""}
          <button class="primary-button cert-start-button" type="button" data-start-cert>Iniciar ${escapeHtml(state.certTrack)}</button>
        </div>
      </section>
    `;
  }
  function renderProgrammingTab() {
    const stats = loadUserStats();
    state.programmingDetail = null;
    $("#tab-content").innerHTML = `
      <section class="panel panel--tech-flow">
        <div class="section-heading">
          <p class="eyebrow">Programação</p>
          <h2>Escolha uma trilha profissional</h2>
        </div>
        <div class="career-grid">
          ${PROGRAMMING_CAREERS.map((career, index) => {
            const progress = getProgrammingCareerProgress(career, stats);
            return `
              <article class="career-card" style="--item-index:${index}">
                <figure class="career-card__media">
                  <img src="${escapeHtml(career.image)}" alt="${escapeHtml(career.imageAlt)}" width="1280" height="720" loading="${index < 2 ? "eager" : "lazy"}" decoding="async">
                </figure>
                <div class="career-card__content">
                  <span class="badge">${escapeHtml(career.level)}</span>
                  <h3>${escapeHtml(career.title)}</h3>
                  <p>${escapeHtml(career.description)}</p>
                  <div class="career-progress-copy"><span>Seu progresso</span><strong>${progress.percent}%</strong></div>
                  <div class="progress-meter" aria-label="Progresso em ${escapeHtml(career.title)}"><span style="width: ${progress.percent}%"></span></div>
                  <small>${progress.attempts ? `${progress.attempts} sessão(ões) concluída(s)` : "Comece sua primeira sessão"}</small>
                  <ul>
                    ${career.modules.map((module) => `<li>${escapeHtml(module)}</li>`).join("")}
                  </ul>
                  <p class="career-project"><strong>Projeto prático</strong><span>${escapeHtml(career.project)}</span></p>
                  <button class="primary-button career-card__cta" type="button" data-open-programming-career="${escapeHtml(career.id)}">Ver trilha completa <span aria-hidden="true">→</span></button>
                </div>
              </article>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderCareerResource(resource, type = "material") {
    const eyebrow = resource.type || resource.kind || (type === "video" ? "Vídeo" : "Material oficial");
    const description = resource.description || resource.note || [resource.provider, resource.language].filter(Boolean).join(" · ") || "Conteúdo recomendado para esta etapa da carreira.";
    return `
      <a class="career-resource" href="${escapeHtml(resource.url)}" target="_blank" rel="noreferrer">
        <span class="career-resource__icon" aria-hidden="true">${type === "video" ? "▶" : "↗"}</span>
        <span>
          <small>${escapeHtml(eyebrow)}</small>
          <strong>${escapeHtml(resource.title)}</strong>
          <em>${escapeHtml(description)}</em>
        </span>
      </a>
    `;
  }

  function formatSnapshotDate(value) {
    const [year, month, day] = String(value || "").split("-");
    return year && month && day ? `${day}/${month}/${year}` : "data não informada";
  }

  function renderCareerStars(value, label) {
    const rating = Math.max(0, Math.min(5, Number(value) || 0));
    const decimal = rating.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    return `
      <span class="career-stars" style="--rating-width:${(rating / 5) * 100}%" aria-hidden="true">★★★★★</span>
      <span class="sr-only">${escapeHtml(label || `Avaliação ${decimal} de 5`)}</span>
    `;
  }

  function renderCareerCourse(course, index) {
    const rating = course.rating || {};
    const price = course.price || {};
    const checkedAt = rating.checkedAt || price.checkedAt || course.checkedAt;
    const count = Number(rating.count);
    const countLabel = Number.isFinite(count)
      ? `${new Intl.NumberFormat("pt-BR").format(count)} avaliações`
      : rating.countLabel || "quantidade não informada";
    const ratingLabel = `${Number(rating.value || 0).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} de 5, com ${countLabel}`;
    return `
      <article class="career-course-card" style="--item-index:${index}">
        <div class="career-card-labels">
          <span>${escapeHtml(course.provider || "Curso online")}</span>
          ${course.language ? `<span>${escapeHtml(course.language)}</span>` : ""}
        </div>
        <h5>${escapeHtml(course.title)}</h5>
        <p>${course.instructor ? `Com ${escapeHtml(course.instructor)}` : escapeHtml(course.level || "Curso recomendado para a trilha")}</p>
        <div class="career-course-metrics">
          <div class="career-rating" aria-label="Avaliação ${escapeHtml(ratingLabel)}">
            <span><strong>${Number(rating.value || 0).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</strong> / 5</span>
            ${renderCareerStars(rating.value, ratingLabel)}
            <small>${escapeHtml(countLabel)}</small>
          </div>
          <div class="career-price">
            <small>Preço</small>
            <strong>${escapeHtml(price.label || (price.variable ? "Preço variável" : "Consulte o valor"))}</strong>
            <span>${escapeHtml(price.qualifier || price.note || (price.variable ? "Oferta muda por conta e campanha" : "Na página oficial"))}</span>
          </div>
        </div>
        <a class="career-card-link" href="${escapeHtml(course.url)}" target="_blank" rel="noopener noreferrer" aria-label="Ver ${escapeHtml(course.title)} e o preço atual (abre em nova aba)">Ver curso e preço atual <span aria-hidden="true">↗</span></a>
        <small class="career-data-date">Nota e preço consultados em ${formatSnapshotDate(checkedAt)}; podem mudar.</small>
      </article>
    `;
  }

  function renderAcademicEvaluation(evaluation, fallbackLabel, contextLabel) {
    if (!evaluation) return "";
    const rating = Number(evaluation.value);
    const hasRating = Number.isFinite(rating) && rating > 0;
    const scale = Number(evaluation.scale) || 5;
    const ratingContext = evaluation.label || evaluation.metric || evaluation.source || fallbackLabel;
    return `
      <div class="career-academic-rating ${hasRating ? "has-rating" : ""}">
        <small>${escapeHtml(contextLabel)}</small>
        ${hasRating ? `
          <div class="career-academic-score" aria-label="${escapeHtml(`${ratingContext}: ${rating} de ${scale}`)}">
            <strong>${escapeHtml(`${rating}/${scale}`)}</strong>
            <span>${escapeHtml(evaluation.metric || evaluation.source || "Avaliação oficial")}</span>
          </div>
        ` : `<strong>${escapeHtml(evaluation.label || fallbackLabel)}</strong>`}
        ${evaluation.year ? `<span>Ano de referência: ${escapeHtml(evaluation.year)}</span>` : ""}
      </div>
    `;
  }

  function renderCareerEducation(item, index) {
    const evaluation = item.evaluation || {};
    const institutionEvaluation = item.institutionEvaluation || null;
    const price = item.price || item.tuition || {};
    const checkedAt = price.checkedAt || item.checkedAt;
    const evaluationSource = evaluation.url || evaluation.sourceUrl;
    const institutionSource = institutionEvaluation?.url || institutionEvaluation?.sourceUrl;
    return `
      <article class="career-education-card" style="--item-index:${index}">
        <div class="career-card-labels">
          <span>${escapeHtml(item.kind || "Formação")}</span>
          ${item.availability ? `<span class="career-availability">${escapeHtml(item.availability)}</span>` : ""}
        </div>
        <h5>${escapeHtml(item.title)}</h5>
        <p class="career-institution">${escapeHtml(item.institution)}</p>
        <dl class="career-education-facts">
          <div><dt>Nível</dt><dd>${escapeHtml(item.level || item.kind || "Não informado")}</dd></div>
          <div><dt>Modalidade</dt><dd>${escapeHtml(item.modality || "Consulte a instituição")}</dd></div>
          <div><dt>Duração</dt><dd>${escapeHtml(item.duration || "Não informada")}</dd></div>
          <div><dt>Investimento</dt><dd>${escapeHtml(price.label || "Consulte a instituição")}</dd></div>
        </dl>
        ${price.note ? `<p class="career-price-note">${escapeHtml(price.note)}</p>` : ""}
        <div class="career-academic-ratings">
          ${renderAcademicEvaluation(evaluation, "Avaliação específica do curso não informada", "Avaliação do curso")}
          ${renderAcademicEvaluation(institutionEvaluation, "Avaliação institucional não informada", "Avaliação da instituição")}
        </div>
        <div class="career-card-actions">
          <a class="career-card-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="Ver ${escapeHtml(item.title)} na ${escapeHtml(item.institution)} (abre em nova aba)">Ver formação <span aria-hidden="true">↗</span></a>
          ${evaluationSource ? `<a href="${escapeHtml(evaluationSource)}" target="_blank" rel="noopener noreferrer" aria-label="Ver fonte da avaliação de ${escapeHtml(item.title)} (abre em nova aba)">Fonte da nota do curso</a>` : ""}
          ${institutionSource && institutionSource !== evaluationSource ? `<a href="${escapeHtml(institutionSource)}" target="_blank" rel="noopener noreferrer" aria-label="Ver fonte da avaliação institucional da ${escapeHtml(item.institution)} (abre em nova aba)">Fonte institucional</a>` : ""}
        </div>
        <small class="career-data-date">Dados consultados em ${formatSnapshotDate(checkedAt)}; valores e turmas podem mudar.</small>
      </article>
    `;
  }

  function renderProgrammingCareerDetail(careerId = state.programmingCareer) {
    const career = getProgrammingCareer(careerId);
    const guide = getProgrammingGuide(career.id);
    if (!guide) {
      state.programmingDetail = null;
      renderProgrammingTab();
      return;
    }
    state.programmingCareer = career.id;
    state.programmingDetail = career.id;
    state.activeQuiz = null;
    const progress = getProgrammingCareerProgress(career);
    const nextStage = progress.nextStage;
    const completedSet = new Set(progress.completedSteps);

    $("#tab-content").innerHTML = `
      <section class="panel career-detail">
        <button class="career-back" type="button" data-programming-back><span aria-hidden="true">←</span> Todas as trilhas</button>

        <header class="career-detail__hero">
          <figure class="career-detail__cover">
            <img src="${escapeHtml(career.image)}" alt="" width="1280" height="720" decoding="async">
          </figure>
          <div class="career-detail__intro">
            <p class="eyebrow">Trilha profissional completa</p>
            <h2 id="career-detail-title" tabindex="-1">${escapeHtml(career.title)}</h2>
            <p>${escapeHtml(guide.outcome)}</p>
            <div class="career-detail__meta" aria-label="Informações da trilha">
              <span>${escapeHtml(career.level)}</span>
              <span>${escapeHtml(guide.duration)}</span>
              <span>${escapeHtml(guide.weeklyHours)}</span>
              <span>${guide.stages.length} etapas</span>
            </div>
            <div class="career-detail__hero-progress">
              <div class="career-progress-copy"><span>Seu progresso nesta trilha</span><strong>${progress.percent}%</strong></div>
              <div class="progress-meter" role="progressbar" aria-label="Progresso em ${escapeHtml(career.title)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress.percent}"><span style="width:${progress.percent}%"></span></div>
            </div>
          </div>
        </header>

        <nav class="career-detail__nav" aria-label="Conteúdo da trilha">
          <a href="#roteiro">Roteiro</a>
          <a href="#projetos">Projetos</a>
          <a href="#materiais">Cursos e materiais</a>
          <a href="#certificacoes-trilha">Certificações</a>
          <a href="#formacao">Graduação e pós</a>
          <a href="#carreira">Ramificações</a>
        </nav>

        <div class="career-detail__layout">
          <div class="career-detail__main">
            <section class="career-detail__section career-start-here">
              <div class="career-section-heading">
                <p class="eyebrow">Comece por aqui</p>
                <h3>Como avançar sem se perder</h3>
              </div>
              <div class="career-instructions">
                <article><span>1</span><strong>Estude na ordem</strong><p>Abra uma etapa por vez e domine os fundamentos antes de avançar.</p></article>
                <article><span>2</span><strong>Pratique de verdade</strong><p>Faça a entrega indicada e confira o critério de conclusão.</p></article>
                <article><span>3</span><strong>Comprove o domínio</strong><p>Marque a etapa, complete o quiz e finalize o projeto de portfólio.</p></article>
              </div>
            </section>

            <section class="career-detail__section" id="roteiro">
              <div class="career-section-heading">
                <p class="eyebrow">Roteiro de aprendizagem</p>
                <h3>Tudo o que você precisa aprender, na ordem certa</h3>
                <p>${progress.completedSteps.length} de ${guide.stages.length} etapas concluídas.</p>
              </div>
              <div class="career-map">
                ${guide.stages.map((stage, index) => {
                  const completed = completedSet.has(stage.id);
                  const isNext = nextStage?.id === stage.id;
                  return `
                    <article class="career-stage ${completed ? "is-complete" : ""} ${isNext ? "is-next" : ""}" style="--item-index:${index}">
                      <div class="career-stage__rail" aria-hidden="true"><span>${completed ? "✓" : index + 1}</span></div>
                      <details ${isNext || (!nextStage && index === 0) ? "open" : ""}>
                        <summary>
                          <span><small>${escapeHtml(stage.duration)}</small><strong>${escapeHtml(stage.title)}</strong></span>
                          <span class="career-stage__status">${completed ? "Concluída" : isNext ? "Próxima etapa" : "Pendente"}</span>
                        </summary>
                        <div class="career-stage__body">
                          ${stage.objective ? `<p class="career-stage__objective">${escapeHtml(stage.objective)}</p>` : ""}
                          <div class="career-stage__columns">
                            <div>
                              <h4>O que aprender</h4>
                              <ul>${stage.topics.map((topic) => `<li>${escapeHtml(topic)}</li>`).join("")}</ul>
                            </div>
                            <div class="career-stage__practice">
                              <h4>Prática guiada</h4>
                              <p>${escapeHtml(stage.practice)}</p>
                            </div>
                          </div>
                          <div class="career-stage__done"><span aria-hidden="true">◆</span><p><strong>Você concluiu quando</strong>${escapeHtml(stage.completion)}</p></div>
                          <button class="career-step-button ${completed ? "is-complete" : ""}" type="button" data-career-step="${escapeHtml(stage.id)}" data-career-id="${escapeHtml(career.id)}" aria-pressed="${completed}">
                            <span aria-hidden="true">${completed ? "✓" : "+"}</span>${completed ? "Etapa concluída" : "Marcar etapa como concluída"}
                          </button>
                        </div>
                      </details>
                    </article>
                  `;
                }).join("")}
              </div>
            </section>

            <section class="career-detail__section" id="projetos">
              <div class="career-section-heading"><p class="eyebrow">Portfólio</p><h3>Projetos que comprovam sua evolução</h3><p>Não basta assistir: publique entregas que demonstrem as competências da trilha.</p></div>
              <div class="career-project-grid">
                ${guide.projects.map((project, index) => `
                  <article class="career-project-card" style="--item-index:${index}">
                    <span class="badge">${escapeHtml(project.level)}</span>
                    <h4>${escapeHtml(project.title)}</h4>
                    ${project.description ? `<p>${escapeHtml(project.description)}</p>` : ""}
                    <ul>${(project.mustHave || project.deliverables || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
                    <p><strong>${project.evidence ? "Evidência no portfólio" : "Entrega esperada"}</strong>${escapeHtml(project.evidence || "Publique o projeto com README, demonstração e os entregáveis acima.")}</p>
                  </article>
                `).join("")}
              </div>
            </section>

            <section class="career-detail__section" id="materiais">
              <div class="career-section-heading"><p class="eyebrow">Aprendizado guiado</p><h3>Cursos, materiais e vídeos de suporte</h3><p>Compare cursos estruturados e complemente com documentação e canais oficiais.</p></div>
              <h4 class="career-subheading">Cursos recomendados</h4>
              <p class="career-live-data-note"><strong>Dados comerciais mudam.</strong> A nota e o preço abaixo são um retrato da data indicada. Abra o curso para confirmar a oferta disponível para sua conta.</p>
              <div class="career-course-grid">${(guide.courses || []).map(renderCareerCourse).join("")}</div>
              <h4 class="career-subheading">Documentação e cursos oficiais</h4>
              <div class="career-resource-grid">${guide.materials.map((item) => renderCareerResource(item, "material")).join("")}</div>
              <h4 class="career-subheading">Aulas e demonstrações</h4>
              <div class="career-resource-grid">${guide.videos.map((item) => renderCareerResource(item, "video")).join("")}</div>
            </section>

            <section class="career-detail__section" id="certificacoes-trilha">
              <div class="career-section-heading"><p class="eyebrow">Credenciais</p><h3>Certificações que fazem sentido</h3><p>Use certificação para validar prática — não como substituta dos projetos.</p></div>
              <div class="career-cert-grid">
                ${guide.certifications.map((cert, index) => `
                  <a class="career-cert" href="${escapeHtml(cert.url)}" target="_blank" rel="noreferrer" style="--item-index:${index}">
                    <span class="career-cert__order">${String(index + 1).padStart(2, "0")}</span>
                    <span><small>${escapeHtml(cert.provider || cert.level || "Credencial oficial")}</small><strong>${escapeHtml(cert.title)}</strong><em>${escapeHtml(cert.note || cert.description || cert.relevance || cert.provider)}</em></span>
                    <span aria-hidden="true">↗</span>
                  </a>
                `).join("")}
              </div>
            </section>

            <section class="career-detail__section" id="formacao">
              <div class="career-section-heading"><p class="eyebrow">Formação acadêmica</p><h3>Graduação e pós-graduação para aprofundar a carreira</h3><p>Compare modalidade, duração, investimento público e avaliação acadêmica. Conceitos oficiais são identificados; quando não há nota específica, isso fica explícito.</p></div>
              <nav class="career-education-tabs" aria-label="Tipos de formação">
                <a href="#graduacao">Graduação</a>
                <a href="#pos-graduacao">Pós-graduação</a>
              </nav>
              <div class="career-education-group" id="graduacao">
                <div class="career-education-heading"><span>Para construir a base</span><h4>Graduação</h4></div>
                <div class="career-education-grid">${(guide.education || []).filter((item) => String(item.kind).toLowerCase().includes("graduação") && !String(item.kind).toLowerCase().includes("pós")).map(renderCareerEducation).join("")}</div>
              </div>
              <div class="career-education-group" id="pos-graduacao">
                <div class="career-education-heading"><span>Para quem já é graduado</span><h4>Pós-graduação</h4></div>
                <div class="career-education-grid">${(guide.education || []).filter((item) => String(item.kind).toLowerCase().includes("pós")).map(renderCareerEducation).join("")}</div>
              </div>
              <p class="career-education-disclaimer">Avaliações MEC/ENADE/CI medem dimensões acadêmicas específicas e não equivalem a avaliações de consumidores. Confirme reconhecimento, polo, edital, turma e condições diretamente com a instituição antes da matrícula.</p>
            </section>

            <section class="career-detail__section" id="carreira">
              <div class="career-section-heading"><p class="eyebrow">Próximos caminhos</p><h3>Ramificações da área</h3><p>Depois da base, escolha uma especialização de acordo com o tipo de problema que gosta de resolver.</p></div>
              <div class="career-branch-grid">
                ${guide.branches.map((branch, index) => `
                  <article class="career-branch" style="--item-index:${index}">
                    <span aria-hidden="true">0${index + 1}</span>
                    <h4>${escapeHtml(branch.title)}</h4>
                    ${branch.description ? `<p>${escapeHtml(branch.description)}</p>` : ""}
                    ${(branch.skills || branch.nextSkills)?.length ? `<div>${(branch.skills || branch.nextSkills).map((skill) => `<small>${escapeHtml(skill)}</small>`).join("")}</div>` : ""}
                  </article>
                `).join("")}
              </div>
            </section>
          </div>

          <aside class="career-detail__aside">
            <div class="career-compass">
              <p class="eyebrow">Seu plano</p>
              <div class="career-compass__score"><strong>${progress.percent}%</strong><span>concluído</span></div>
              <div class="progress-meter" role="progressbar" aria-label="Progresso geral" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress.percent}"><span style="width:${progress.percent}%"></span></div>
              <ul class="career-checkpoints">
                <li class="${progress.completedSteps.length === guide.stages.length ? "is-done" : ""}"><span>${progress.completedSteps.length === guide.stages.length ? "✓" : progress.completedSteps.length}</span><p><strong>Roteiro</strong>${progress.completedSteps.length}/${guide.stages.length} etapas</p></li>
                <li class="${progress.quizPassed ? "is-done" : ""}"><span>${progress.quizPassed ? "✓" : "2"}</span><p><strong>Quiz da trilha</strong>${progress.quizPassed ? "Aprovado com 70%+" : `${progress.attempts} tentativa(s)`}</p></li>
                <li class="${progress.projectDone ? "is-done" : ""}"><span>${progress.projectDone ? "✓" : "3"}</span><p><strong>Projeto final</strong>${progress.projectDone ? "Entrega concluída" : "Ainda pendente"}</p></li>
              </ul>
              ${nextStage ? `<div class="career-next-step"><small>Próxima etapa</small><strong>${escapeHtml(nextStage.title)}</strong><a href="#roteiro">Continuar roteiro <span aria-hidden="true">↓</span></a></div>` : `<div class="career-next-step is-ready"><small>Roteiro completo</small><strong>Hora de validar e publicar</strong></div>`}
              <button class="primary-button career-quiz-button" type="button" data-start-programming data-programming-career="${escapeHtml(career.id)}">Fazer quiz da trilha</button>
              <button class="secondary-button career-project-toggle ${progress.projectDone ? "is-complete" : ""}" type="button" data-career-project data-career-id="${escapeHtml(career.id)}" aria-pressed="${progress.projectDone}">${progress.projectDone ? "✓ Projeto final concluído" : "Marcar projeto final concluído"}</button>
              <small class="career-local-note">O progresso fica salvo neste perfil e neste navegador.</small>
            </div>
            <div class="career-essentials">
              <p class="eyebrow">Não pule isto</p>
              <h3>Princípios essenciais</h3>
              <ul>${guide.essentials.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </div>
          </aside>
        </div>
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

  function dataAcademyPool() {
    return poolByArea("academia-dados");
  }

  function getDataAcademyStats(userStats = loadUserStats()) {
    const history = (userStats.historicoUltimosResultados || []).filter((item) => item.area === "academia-dados");
    const byTrack = {};
    for (const item of history) {
      byTrack[item.trilha] = byTrack[item.trilha] || { total: 0, correct: 0, wrong: 0, partial: 0, attempts: 0, score: 0 };
      byTrack[item.trilha].total += item.total || 0;
      byTrack[item.trilha].correct += item.acertos || 0;
      byTrack[item.trilha].wrong += item.erros || 0;
      byTrack[item.trilha].partial += item.parciais || 0;
      byTrack[item.trilha].attempts += 1;
      byTrack[item.trilha].score += item.pontuacao || 0;
    }
    const rows = Object.entries(byTrack).map(([track, values]) => ({
      track,
      ...values,
      accuracy: values.total ? Math.round((values.correct / values.total) * 100) : 0,
    }));
    const best = [...rows].sort((a, b) => b.accuracy - a.accuracy || b.total - a.total)[0];
    const mostStudied = [...rows].sort((a, b) => b.attempts - a.attempts || b.total - a.total)[0];
    const weakest = [...rows].sort((a, b) => b.wrong - a.wrong || a.accuracy - b.accuracy)[0];
    const total = rows.reduce((sum, row) => sum + row.total, 0);
    const correct = rows.reduce((sum, row) => sum + row.correct, 0);
    return {
      history,
      rows,
      total,
      correct,
      accuracy: total ? Math.round((correct / total) * 100) : 0,
      best: best?.track || "Ainda sem dados",
      mostStudied: mostStudied?.track || "Ainda sem dados",
      weakest: weakest?.track || "Ainda sem dados",
      last: history[0],
    };
  }

  function getDataStudyRecommendation(userStats = loadUserStats()) {
    const stats = getDataAcademyStats(userStats);
    if (!stats.history.length) {
      return {
        track: "Fundamentos de Dados",
        difficulty: "facil",
        mode: "Treino rápido",
        review: ["qualidade de dados", "granularidade", "KPIs"],
        project: "Dashboard de estudos",
        reason: "Comece criando base: dados, informação, insight, métricas e qualidade.",
      };
    }
    if (!stats.rows.some((row) => row.track === "Microsoft Fabric e DP-600")) {
      return {
        track: "Microsoft Fabric e DP-600",
        difficulty: "facil",
        mode: "Treino por trilha",
        review: ["OneLake", "Lakehouse", "Semantic Model"],
        project: "Dashboard de estudos",
        reason: "Você ainda não treinou Fabric; vale abrir a base antes de ir para DP-600 difícil.",
      };
    }
    const lowerErrors = Object.entries(userStats.materiasComMaisErro || {})
      .filter(([name]) => /SQL|DAX|Power|Fabric|Modelagem|Dados|Analytics|Python|Pandas/i.test(name))
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name);
    const weak = stats.weakest !== "Ainda sem dados" ? stats.weakest : "SQL para Análise";
    return {
      track: lowerErrors[0]?.includes("DAX") || lowerErrors[0]?.includes("Power") ? "Power BI e DAX" : weak,
      difficulty: stats.accuracy >= 78 ? "dificil" : stats.accuracy >= 58 ? "medio" : "facil",
      mode: stats.accuracy >= 75 ? "Desafio prático" : "Treino por trilha",
      review: lowerErrors.slice(0, 3).length ? lowerErrors.slice(0, 3) : [weak, "JOINs", "métricas"],
      project: stats.accuracy >= 70 ? "Dashboard de chamados de TI" : "Dashboard de estudos",
      reason: stats.accuracy >= 75
        ? "Seu acerto geral está bom; hora de estudo de caso e portfólio."
        : "Ainda vale consolidar conceitos com treino guiado e revisão dos erros.",
    };
  }

  function renderAcademyDashboard() {
    const academy = getDataAcademyStats();
    const recommendation = getDataStudyRecommendation();
    return `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Mini-dashboard</p>
          <h2>Seu painel da Academia de Dados</h2>
        </div>
        <div class="dashboard-grid">
          ${metricCard("Trilha mais estudada", academy.mostStudied, "por tentativas")}
          ${metricCard("Melhor trilha", academy.best, "maior taxa de acerto")}
          ${metricCard("Mais erros", academy.weakest, "prioridade de revisão")}
          ${metricCard("Questões de dados", academy.total, "respondidas na academia")}
          ${metricCard("Taxa de acerto", `${academy.accuracy}%`, `${academy.correct}/${academy.total}`)}
          ${metricCard("Último treino", academy.last?.titulo || "Ainda não fez", academy.last ? `${academy.last.percentual}% · ${academy.last.pontosGanhos || 0} pts` : "comece pelo treino rápido")}
        </div>
        <div class="notice">Recomendação: ${escapeHtml(recommendation.track)} · ${escapeHtml(recommendation.difficulty)} · ${escapeHtml(recommendation.mode)} — ${escapeHtml(recommendation.reason)}</div>
        ${academy.rows.length ? `
          <div class="progress-list">
            ${academy.rows.map((row) => `
              <div class="progress-row">
                <span>${escapeHtml(row.track)}</span>
                <strong>${row.accuracy}%</strong>
                <div class="progress-bar"><i style="width:${Math.min(100, row.accuracy)}%"></i></div>
              </div>
            `).join("")}
          </div>
        ` : "<p class='muted'>Faça um treino para liberar progresso por trilha.</p>"}
      </section>
    `;
  }

  function renderAcademyCard(track) {
    return `
      <article class="academy-card">
        <div>
          <h3>${escapeHtml(track.title)}</h3>
          <p>${escapeHtml(track.description)}</p>
          <small>Nível recomendado: ${escapeHtml(track.level)}</small>
        </div>
        <div class="action-row">
          <button class="primary-button" type="button" data-academy-action="start" data-academy-track="${escapeHtml(track.id)}">Começar treino</button>
          <button class="secondary-button" type="button" data-academy-action="summary" data-academy-track="${escapeHtml(track.id)}">Ver resumo</button>
          <button class="secondary-button" type="button" data-academy-action="challenge" data-academy-track="${escapeHtml(track.id)}">Fazer desafio</button>
        </div>
      </article>
    `;
  }

  function renderPortfolioProject(project) {
    return `
      <article class="portfolio-card">
        <h3>${escapeHtml(project.name)}</h3>
        <p>${escapeHtml(project.objective)}</p>
        <dl>
          <div><dt>Dataset</dt><dd>${escapeHtml(project.dataset)}</dd></div>
          <div><dt>Métricas</dt><dd>${escapeHtml(project.metrics)}</dd></div>
          <div><dt>Ferramentas</dt><dd>${escapeHtml(project.tools)}</dd></div>
          <div><dt>Entregáveis</dt><dd>${escapeHtml(project.deliverables)}</dd></div>
          <div><dt>Dificuldade</dt><dd>${escapeHtml(project.difficulty)}</dd></div>
        </dl>
        <p><strong>Perguntas de negócio:</strong> ${project.questions.map(escapeHtml).join(" · ")}</p>
        <p><strong>README GitHub:</strong> ${escapeHtml(project.github)}</p>
        <p><strong>Post LinkedIn:</strong> ${escapeHtml(project.linkedin)}</p>
      </article>
    `;
  }

  function renderDataAcademyTab() {
    const recommendation = getDataStudyRecommendation();
    $("#tab-content").innerHTML = `
      ${renderAcademyDashboard()}
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Academia de Dados</p>
          <h2>Treinos práticos para estágio/júnior em dados</h2>
        </div>
        <p>Escolha uma trilha, treine com questões rotativas, faça desafios práticos, pratique entrevista e monte ideias de portfólio.</p>
        <div class="form-grid">
          <label class="field">
            <span>Modo</span>
            <select data-academy-mode>
              <option value="rapido" ${state.academyMode === "rapido" ? "selected" : ""}>Treino rápido</option>
              <option value="trilha" ${state.academyMode === "trilha" ? "selected" : ""}>Treino por trilha</option>
              <option value="desafio" ${state.academyMode === "desafio" ? "selected" : ""}>Desafio prático</option>
              <option value="entrevista" ${state.academyMode === "entrevista" ? "selected" : ""}>Modo entrevista</option>
              <option value="erro" ${state.academyMode === "erro" ? "selected" : ""}>Modo erro</option>
              <option value="portfolio" ${state.academyMode === "portfolio" ? "selected" : ""}>Modo portfólio</option>
            </select>
          </label>
          <label class="field">
            <span>Quantidade</span>
            <select data-academy-quantity>
              ${[10, 20, 40].map((qty) => `<option value="${qty}" ${Number(state.academyQuantity) === qty ? "selected" : ""}>${qty} questões</option>`).join("")}
            </select>
          </label>
          ${difficultySelect()}
        </div>
        <div class="action-row">
          <button class="primary-button" type="button" data-start-academy>Iniciar pelo modo selecionado</button>
          <button class="secondary-button" type="button" data-academy-action="challenge" data-academy-track="${escapeHtml(recommendation.track)}">Desafio recomendado</button>
        </div>
      </section>
      <section class="panel">
        <h2>Trilhas da Academia</h2>
        <div class="academy-grid">
          ${DATA_ACADEMY_TRACKS.map(renderAcademyCard).join("")}
        </div>
      </section>
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Projetos práticos</p>
          <h2>Desafios de Portfólio</h2>
        </div>
        <div class="portfolio-grid">
          ${DATA_PORTFOLIO_PROJECTS.map(renderPortfolioProject).join("")}
        </div>
      </section>
    `;
  }

  function renderAcademySummary(trackId) {
    const track = DATA_ACADEMY_TRACKS.find((item) => item.id === trackId) || DATA_ACADEMY_TRACKS[0];
    const questions = dataAcademyPool().filter((question) => question.trilha === track.id);
    const topics = [...new Set(questions.map((question) => question.assunto))].slice(0, 14);
    const recommendation = getDataStudyRecommendation();
    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Resumo da trilha</p>
          <h2>${escapeHtml(track.title)}</h2>
        </div>
        <p>${escapeHtml(track.description)}</p>
        <div class="dashboard-grid">
          ${metricCard("Nível", track.level, "recomendado")}
          ${metricCard("Questões no banco", questions.length, "rotativas")}
          ${metricCard("Tipos", [...new Set(questions.map((q) => q.tipo))].length, "formatos de treino")}
          ${metricCard("Recomendação atual", recommendation.track, recommendation.mode)}
        </div>
        <h3>Assuntos principais</h3>
        <div class="tag-cloud">${topics.map((topic) => `<span>${escapeHtml(topic)}</span>`).join("")}</div>
        <h3>Como estudar</h3>
        <ul class="check-list">
          <li>Leia o conceito e tente explicar com um exemplo de negócio.</li>
          <li>Faça 10 questões rápidas antes de subir para 20 ou 40.</li>
          <li>Quando errar, anote se o problema foi conceito, cálculo, modelagem ou interpretação.</li>
          <li>Finalize com um projeto de portfólio ligado à trilha.</li>
        </ul>
        <div class="action-row">
          <button class="primary-button" type="button" data-academy-action="start" data-academy-track="${escapeHtml(track.id)}">Começar treino</button>
          <button class="secondary-button" type="button" data-tab="academia-dados">Voltar à Academia</button>
        </div>
      </section>
    `;
  }

  function renderSantosIbamTab() {
    const roles = santosRoles();
    const selectedRole = getSantosRole();
    const recommendation = getSantosRecommendation();
    const stats = loadUserStats();
    const accuracy = stats.totalQuestoesRespondidas ? Math.round((stats.totalAcertos / stats.totalQuestoesRespondidas) * 100) : 0;
    const santosHistory = (stats.historicoUltimosResultados || []).filter((item) => item.area === "concursos-santos-ibam");
    const bestSantos = [...santosHistory].sort((a, b) => (b.percentual || 0) - (a.percentual || 0))[0];
    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Concursos Santos — IBAM</p>
          <h2>Prefeitura de Santos: Agente, Inspetor e Oficial</h2>
        </div>
        <p>Área baseada nas páginas oficiais do IBAM para os editais 73/2026 e 71/2026. As questões são autorais, inéditas e em múltipla escolha com 4 alternativas.</p>
        <div class="dashboard-grid">
          ${metricCard("Inscrições", "22/07 a 20/08/2026", "boletos até 21/08/2026")}
          ${metricCard("Banca", "IBAM", "múltipla escolha")}
          ${metricCard("Pontuação", "por peso", "sem regra Quadrix")}
          ${metricCard("Recomendação", recommendation.title, recommendation.detail)}
        </div>
        <div class="dashboard-grid compact-dashboard">
          ${metricCard("Simulados feitos", stats.questionariosSantosIbamFinalizados || 0, "Santos IBAM")}
          ${metricCard("Melhor cargo", bestSantos?.trilha || "—", bestSantos ? `${bestSantos.percentual}%` : "sem histórico")}
          ${metricCard("Taxa geral", `${accuracy}%`, `${stats.totalAcertos}/${stats.totalQuestoesRespondidas}`)}
          ${metricCard("Foguinho", `🔥 ${stats.streakAtual}`, `recorde: ${stats.maiorStreak}`)}
        </div>
        <div class="form-grid">
          <label class="field">
            <span>Cargo para questões</span>
            <select data-santos-cargo>
              ${roles.map((role) => `<option value="${escapeHtml(role.id)}" ${state.santosCargo === role.id ? "selected" : ""}>${escapeHtml(role.cargo)}</option>`).join("")}
            </select>
          </label>
          ${difficultySelect()}
          <label class="field">
            <span>Quantidade por cargo</span>
            <select data-santos-quantity>
              ${[10, 20, 40].map((value) => `<option value="${value}" ${Number(state.santosQuantity) === value ? "selected" : ""}>${value} questões</option>`).join("")}
            </select>
          </label>
        </div>
      </section>
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Visão geral</p>
          <h2>Cards dos cargos</h2>
        </div>
        <div class="study-grid">
          ${roles.map(renderSantosRoleCard).join("")}
        </div>
      </section>
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Comparativo</p>
          <h2>Qual cargo vale mais a pena?</h2>
        </div>
        <div class="comparison-wrap">
          <table class="comparison-table">
            <thead><tr><th>Cargo</th><th>Vagas</th><th>Remuneração</th><th>Prova</th><th>Dificuldade estimada</th><th>Aderência ao Kauã</th></tr></thead>
            <tbody>
              ${roles.map((role) => `
                <tr>
                  <td>${escapeHtml(role.cargo)}</td>
                  <td>${escapeHtml(role.vagas)}</td>
                  <td>${escapeHtml(role.remuneracao)}</td>
                  <td>${escapeHtml(role.prova)}</td>
                  <td>${role.id === "santos-oficial-administracao" ? "Média/alta" : "Média"}</td>
                  <td>${role.id === "santos-oficial-administracao" ? "Alta para rotina administrativa e redação" : role.id === "santos-inspetor-alunos" ? "Boa se curtir ambiente escolar" : "Boa para atendimento e controle"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Questões por cargo</p>
          <h2>${escapeHtml(selectedRole?.cargo || "Selecione um cargo")}</h2>
        </div>
        <div class="action-row">
          <button class="primary-button" type="button" data-santos-action="custom" data-santos-role="${escapeHtml(selectedRole?.id || "")}">Gerar questionário ${Number(state.santosQuantity) || 20} questões</button>
          <button class="secondary-button" type="button" data-santos-action="full" data-santos-role="${escapeHtml(selectedRole?.id || "")}">Simulado completo</button>
          <button class="secondary-button" type="button" data-santos-action="real" data-santos-role="${escapeHtml(selectedRole?.id || "")}">Prova real</button>
        </div>
      </section>
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Estudos Santos IBAM</p>
          <h2>Links e temas prioritários</h2>
        </div>
        <div class="study-grid">
          ${studyCard("Português IBAM", ["Interpretação, finalidade e inferência.", "Reescrita com preservação de sentido.", "Pontuação, concordância e linguagem formal."], [["Manual de Redação", "https://www4.planalto.gov.br/centrodeestudos/assuntos/manual-de-redacao-da-presidencia-da-republica/manual-de-redacao.pdf"]])}
          ${studyCard("Legislação e serviço público", ["Lei Orgânica e Estatuto municipal de Santos.", "Lei 13.460/2017, LAI, LGPD e Governo Digital.", "Atendimento prioritário, acessibilidade e ética."], [["Edital 73/2026", SANTOS_IBAM_CONFIG.officialLinks?.edital73], ["Edital 71/2026", SANTOS_IBAM_CONFIG.officialLinks?.edital71], ["LAI", SANTOS_IBAM_CONFIG.officialLinks?.lai], ["LGPD", SANTOS_IBAM_CONFIG.officialLinks?.lgpd]])}
          ${studyCard("Estratégia por pesos", ["Agente: específicos, informática/rotinas e legislação/atendimento.", "Inspetor: específicos, legislação/atendimento escolar, ECA e segurança.", "Oficial: específicos, Português, redação administrativa, protocolo e arquivo."], [])}
          ${studyCard("Videoaulas gratuitas", ["Busque aulas gratuitas de Português IBAM, Matemática básica, informática para concursos e redação oficial.", "Use os simulados daqui para descobrir o tema do vídeo do dia.", "Priorize lei seca e exercícios, não maratona passiva."], [["YouTube — Português IBAM", "https://www.youtube.com/results?search_query=portugu%C3%AAs+ibam+concursos"], ["YouTube — Informática concursos", "https://www.youtube.com/results?search_query=inform%C3%A1tica+para+concursos"]])}
        </div>
      </section>
    `;
  }

  function renderSantosRoleCard(role) {
    const totalQuestions = santosPool(role.id, { includeWriting: true }).length;
    return `
      <article class="study-card role-card">
        <p class="eyebrow">${escapeHtml(role.editalCompleto)}</p>
        <h3>${escapeHtml(role.cargo)}</h3>
        <ul>
          <li><strong>Código:</strong> ${escapeHtml(role.codigo)}</li>
          <li><strong>Escolaridade:</strong> ${escapeHtml(role.escolaridade)}</li>
          <li><strong>Remuneração:</strong> ${escapeHtml(role.remuneracao)}</li>
          <li><strong>Carga horária:</strong> ${escapeHtml(role.cargaHoraria)}</li>
          <li><strong>Vagas:</strong> ${escapeHtml(role.vagas)}</li>
          <li><strong>Inscrição:</strong> ${escapeHtml(role.inscricao)} · ${escapeHtml(role.taxa)}</li>
          <li><strong>Prova:</strong> ${escapeHtml(role.prova)} · ${escapeHtml(role.tipoProva)}</li>
          <li><strong>Banco local:</strong> ${totalQuestions} questões/propostas</li>
        </ul>
        <div class="action-row">
          <button class="primary-button" type="button" data-santos-action="study" data-santos-role="${escapeHtml(role.id)}">Estudar</button>
          <button class="secondary-button" type="button" data-santos-action="quick" data-santos-role="${escapeHtml(role.id)}">Simulado rápido</button>
          <button class="secondary-button" type="button" data-santos-action="real" data-santos-role="${escapeHtml(role.id)}">Prova real</button>
          <button class="secondary-button" type="button" data-santos-action="summary" data-santos-role="${escapeHtml(role.id)}">Resumo do edital</button>
          ${role.hasEssay ? `<button class="secondary-button" type="button" data-santos-action="writing" data-santos-role="${escapeHtml(role.id)}">Redação</button>` : ""}
        </div>
        <div class="link-list"><a href="${escapeHtml(role.officialUrl)}" target="_blank" rel="noreferrer">Página oficial IBAM</a></div>
      </article>
    `;
  }

  function renderSantosRoleSummary(roleId) {
    const role = getSantosRole(roleId);
    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Resumo do edital</p>
          <h2>${escapeHtml(role.cargo)} — ${escapeHtml(role.editalCompleto)}</h2>
        </div>
        <div class="dashboard-grid">
          ${metricCard("Requisito", role.escolaridade, role.codigo)}
          ${metricCard("Remuneração", role.remuneracao, role.cargaHoraria)}
          ${metricCard("Vagas", role.vagas, `inscrição ${role.inscricao}`)}
          ${metricCard("Prova", role.prova, role.tipoProva)}
        </div>
        <h3>Distribuição e pesos</h3>
        <div class="comparison-wrap">
          <table class="comparison-table">
            <thead><tr><th>Disciplina</th><th>Questões</th><th>Peso</th><th>Pontos</th></tr></thead>
            <tbody>${role.distribution.map((item) => `<tr><td>${escapeHtml(item.disciplina)}</td><td>${item.count}</td><td>${item.peso}</td><td>${item.count * item.peso}</td></tr>`).join("")}</tbody>
          </table>
        </div>
        <h3>Atribuições e pontos críticos</h3>
        <p>${escapeHtml(role.summary)}</p>
        <ul class="check-list">${role.critical.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        <h3>Conteúdo prioritário</h3>
        <div class="tag-cloud">${role.priorities.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
        <div class="action-row">
          <button class="primary-button" type="button" data-santos-action="quick" data-santos-role="${escapeHtml(role.id)}">Simulado rápido</button>
          <button class="secondary-button" type="button" data-santos-action="full" data-santos-role="${escapeHtml(role.id)}">Simulado completo</button>
          <button class="secondary-button" type="button" data-tab="santos-ibam">Voltar</button>
        </div>
      </section>
    `;
  }

  function getSantosRecommendation() {
    const stats = loadUserStats();
    const weak = getSantosWeakSubject(stats);
    if (weak.includes("Matemática")) return { title: "Treinar Matemática", detail: "porcentagem, regra de três e tabelas" };
    if (weak.includes("Portugues") || weak.includes("Português")) return { title: "Treinar Português", detail: "interpretação e reescrita" };
    if (weak.includes("Informática")) return { title: "Treinar Informática", detail: "planilhas, e-mail e segurança" };
    if (weak.includes("Específicos")) return { title: "Treinar específicos", detail: "rotina do cargo escolhido" };
    return { title: "Começar pelo peso", detail: "específicos + legislação/rotinas" };
  }

  function santosDistributionFor(role, count) {
    if (count === 40) return role.distribution;
    if (count === 20) {
      return role.distribution.map((item) => ({ ...item, count: item.disciplina === "Matemática" || item.disciplina === "Informática e Rotinas" ? 3 : item.disciplina === "Conhecimentos Específicos" ? 5 : item.disciplina === "Legislação Municipal e Serviço Público" ? 4 : 5 }));
    }
    return [
      { ...role.distribution[0], count: 2 },
      { ...role.distribution[1], count: 2 },
      { ...role.distribution[2], count: 2 },
      { ...role.distribution[3], count: 1 },
      { ...role.distribution[4], count: 3 },
    ];
  }

  function selectSantosByDistribution(role, count, mode) {
    const selected = [];
    const canonicalScope = santosScopeKey(role.id);
    const legacyScopes = ["quick", "full", "real", "custom"].map((legacyMode) => `santos-${role.id}-${legacyMode}`);
    const avoidIds = getRecentIds(canonicalScope, legacyScopes);
    for (const item of santosDistributionFor(role, count)) {
      const pool = santosPool(role.id).filter((question) => question.disciplina === item.disciplina && !selected.some((picked) => picked.id === question.id));
      selected.push(...selectRotatingQuestions({
        pool,
        count: item.count,
        difficulty: state.difficulty,
        seedKey: `${getTodayKey()}-${state.currentUserId}-${role.id}-${mode}-${state.difficulty}-${state.santosAttempt}-${item.disciplina}`,
        avoidIds,
      }));
    }
    return selected.slice(0, count);
  }

  function startSantosQuiz(roleId, mode = "quick") {
    const role = getSantosRole(roleId);
    state.santosCargo = role.id;
    state.santosAttempt += 1;
    const count = mode === "quick" ? 20 : mode === "custom" ? Number(state.santosQuantity) || 20 : 40;
    let questions = selectSantosByDistribution(role, count, mode);
    const titleMode = mode === "real" ? "Prova real" : mode === "full" ? "Simulado completo" : mode === "custom" ? `Questionário ${count} questões` : "Simulado rápido";
    if (mode === "real" && role.hasEssay) {
      const writingPool = santosPool(role.id, { includeWriting: true }).filter((question) => question.tipo === "administrativeWriting");
      questions = [...questions, ...selectRotatingQuestions({
        pool: writingPool,
        count: 1,
        difficulty: state.difficulty,
        seedKey: `${getTodayKey()}-${state.currentUserId}-${role.id}-redacao-${state.santosAttempt}`,
        avoidIds: getRecentIds(`santos-${role.id}-redacao`),
      })];
    }
    startQuiz({
      title: `${titleMode} Santos IBAM — ${role.cargo}`,
      kind: `santos-${mode}`,
      area: "concursos-santos-ibam",
      trilha: role.cargo,
      scopeKey: santosScopeKey(role.id),
      scoring: "weighted",
      durationMinutes: mode === "real" ? role.durationMinutes : undefined,
      difficulty: state.difficulty,
      observation: `Pontuação ponderada por pesos do ${role.editalCompleto}.`,
      questions,
    });
  }

  function startSantosWriting(roleId) {
    const role = getSantosRole(roleId);
    state.santosCargo = role.id;
    state.santosAttempt += 1;
    const pool = santosPool(role.id, { includeWriting: true }).filter((question) => question.tipo === "administrativeWriting");
    startQuiz({
      title: `Redação administrativa Santos IBAM — ${role.cargo}`,
      kind: "santos-redacao",
      area: "concursos-santos-ibam",
      trilha: role.cargo,
      scopeKey: `santos-${role.id}-redacao`,
      scoring: "weighted",
      durationMinutes: 60,
      difficulty: state.difficulty,
      observation: "Autoavaliação por critérios de redação técnico-administrativa.",
      questions: selectRotatingQuestions({
        pool,
        count: 1,
        difficulty: state.difficulty,
        seedKey: `${getTodayKey()}-${state.currentUserId}-${role.id}-redacao-${state.santosAttempt}`,
        avoidIds: getRecentIds(`santos-${role.id}-redacao`),
      }),
    });
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
    const isConcursos = state.studyMode === "concursos";
    const title = isConcursos ? "Estudos para concursos" : "Estudos para tecnologia";
    const cards = isConcursos
      ? [
        studyCard("Concursos Santos — IBAM", ["Edital 73/2026: Agente de Portaria e Inspetor de Alunos.", "Edital 71/2026: Oficial de Administração, objetiva + redação.", "Pontuação ponderada por pesos do edital.", "Treine Português, Matemática, Legislação, Informática e específicos do cargo."], [["Edital 73/2026 — IBAM", SANTOS_IBAM_CONFIG.officialLinks?.edital73], ["Edital 71/2026 — IBAM", SANTOS_IBAM_CONFIG.officialLinks?.edital71]]),
        studyCard("Leis e atendimento público", ["Lei 13.460/2017: direitos do usuário.", "LAI e LGPD: transparência com proteção de dados.", "Atendimento prioritário, acessibilidade e postura do servidor."], [["Lei 13.460/2017", SANTOS_IBAM_CONFIG.officialLinks?.usuario], ["LAI", SANTOS_IBAM_CONFIG.officialLinks?.lai], ["LGPD", SANTOS_IBAM_CONFIG.officialLinks?.lgpd]]),
        studyCard("Redação e rotina administrativa", ["Para Oficial, treine clareza, impessoalidade e objetividade.", "Faça textos curtos: memorando, despacho, e-mail e relatório.", "Revise protocolo, arquivo, controle de prazos e documentos."], [["Manual de Redação", "https://www4.planalto.gov.br/centrodeestudos/assuntos/manual-de-redacao-da-presidencia-da-republica/manual-de-redacao.pdf"]]),
      ]
      : [
        studyCard("Certificações", ["Microsoft DP-600, PL-300, AZ-900, PL-900, DP-900 e DP-700.", "Treine por tema e depois faça simulado completo.", "Revise erros antes de subir dificuldade."], [["Microsoft Learn", "https://learn.microsoft.com/en-us/training/"]]),
        studyCard("Programação por profissão", ["Escolha uma trilha: Front-end, Back-end, Full Stack, Dados/BI, QA ou DevOps.", "Complete blocos de estudo e exercícios para subir o progresso.", "Faça projetos pequenos para consolidar."], [["MDN", "https://developer.mozilla.org/pt-BR/"], ["Python", "https://docs.python.org/pt-br/3/"]]),
        studyCard("Dados e Analytics", ["SQL forte, Python/Pandas e Power BI.", "Modele métricas antes de montar dashboard.", "Use projetos de portfólio para provar habilidade."], [["Power BI", "https://learn.microsoft.com/pt-br/power-bi/"], ["Pandas", "https://pandas.pydata.org/docs/"]]),
        studyCard("Academia de Dados", ["Fundamentos, SQL, Python, DAX, modelagem, engenharia e Fabric.", "Use modo entrevista para treinar explicação.", "Use modo portfólio para gerar projetos."], [["Microsoft Fabric", "https://learn.microsoft.com/en-us/fabric/"], ["dados.gov.br", "https://dados.gov.br/"]]),
      ];
    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Estudos</p>
          <h2>${escapeHtml(title)}</h2>
        </div>
        <div class="study-grid">${cards.join("")}</div>
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
        <span>${new Date(item.data).toLocaleString("pt-BR")} · ${item.acertos} acertos · ${item.erros} erros · ${item.brancos} brancos${item.parciais ? ` · ${item.parciais} parciais` : ""} · pontuação ${item.pontuacao}${item.pontosGanhos ? ` · ${item.pontosGanhos} pts` : ""}</span>
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
    const allowed = MODE_TABS[state.studyMode] || MODE_TABS.concursos;
    if (!allowed.includes(state.activeTab)) {
      state.activeTab = state.studyMode === "concursos" ? "santos-ibam" : "programacao";
    }
    renderHeader();
    renderTabs();
    const renderers = {
      crt: renderCrtDaily,
      "prova-real": renderCrtRealExam,
      certificacoes: renderCertificationTab,
      programacao: renderProgrammingTab,
      dados: renderDataTab,
      "academia-dados": renderDataAcademyTab,
      "santos-ibam": renderSantosIbamTab,
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
      const marked = quiz.selfEvaluations[question.id];
      return `
        <textarea class="open-answer" data-open-answer="${escapeHtml(question.id)}" placeholder="Escreva sua resposta para autoavaliação">${escapeHtml(current || "")}</textarea>
        <div class="answer-grid self-eval-grid" aria-label="Autoavaliação">
          ${[
            ["correct", "Acertei"],
            ["partial", "Parcial"],
            ["wrong", "Errei"],
          ].map(([value, label]) => `
            <button class="answer-option self-eval-option ${marked === value ? "selected" : ""}" type="button" data-self-eval="${escapeHtml(question.id)}" data-self-eval-value="${escapeHtml(value)}">${escapeHtml(label)}</button>
          `).join("")}
        </div>
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
      const partial = marked === "partial" || (answer && !marked);
      return { blank: !answer && !marked, correct: marked === "correct", partial, wrong: marked === "wrong" };
    }
    if (blank) return { blank: true, correct: false, partial: false, wrong: false };
    const expected = question.tipo === "trueFalse" ? question.gabarito : String(question.gabarito);
    const correct = String(answer) === String(expected);
    return { blank: false, correct, partial: false, wrong: !correct };
  }

  function buildResult(quiz) {
    const items = quiz.questions.map((question) => {
      const evaluation = evaluateQuestion(question, quiz.answers[question.id], quiz);
      return {
        ...evaluation,
        id: question.id,
        disciplina: question.disciplina || question.bloco || question.trilha,
        assunto: question.assunto,
        score: quiz.scoring === "quadrix"
          ? (evaluation.correct ? 1 : evaluation.wrong ? -1 : 0)
          : quiz.scoring === "weighted"
            ? (evaluation.correct ? Number(question.peso || 1) : evaluation.partial ? Number(question.peso || 1) / 2 : 0)
            : (evaluation.correct ? DIFFICULTY_POINTS[question.dificuldade] || 1 : evaluation.partial ? 0.5 : 0),
      };
    });
    const correct = items.filter((item) => item.correct).length;
    const wrong = items.filter((item) => item.wrong).length;
    const blank = items.filter((item) => item.blank).length;
    const partial = items.filter((item) => item.partial).length;
    const score = items.reduce((sum, item) => sum + item.score, 0);
    const maxScore = quiz.scoring === "quadrix"
      ? quiz.questions.length
      : quiz.scoring === "weighted"
        ? quiz.questions.reduce((sum, question) => sum + Number(question.peso || 1), 0)
        : quiz.questions.reduce((sum, question) => sum + (DIFFICULTY_POINTS[question.dificuldade] || 1), 0);
    const activityBonus = quiz.area === "academia-dados" && quiz.kind.includes("desafio")
      ? 10
      : quiz.area === "academia-dados" && quiz.kind.includes("entrevista")
        ? 15
        : 0;
    const gamifiedPoints = quiz.scoring === "quadrix"
      ? Math.max(0, correct * 2 + (quiz.kind === "crt-real" ? 20 : 0))
      : Math.round(score) + activityBonus + Math.min(10, loadUserStats().streakAtual || 0);
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
      partial,
      score,
      maxScore,
      percent: quiz.scoring === "weighted" ? (maxScore ? Math.round((score / maxScore) * 100) : 0) : (quiz.questions.length ? Math.round((correct / quiz.questions.length) * 100) : 0),
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
    const weak = result.items.filter((item) => item.wrong || item.blank || item.partial).slice(0, 12);

    $("#tab-content").innerHTML = `
      <section class="panel">
        <div class="section-heading">
          <p class="eyebrow">Resultado</p>
          <h2>${result.correct} acertos · ${result.wrong} erros · ${result.blank} brancos</h2>
        </div>
        <div class="dashboard-grid">
          ${metricCard("Pontuação", result.score, quiz.scoring === "quadrix" ? "+1/-1/0" : quiz.scoring === "weighted" ? `máx. ${result.maxScore}` : "sem penalidade")}
          ${metricCard("Percentual", `${result.percent}%`, "acertos sobre o total")}
          ${metricCard("Parciais", result.partial || 0, "autoavaliação")}
          ${metricCard("Pontos gamificados", result.gamifiedPoints, "salvos no dashboard")}
          ${metricCard("Segurança", `${Math.max(0, Math.round((result.score / (result.maxScore || result.total)) * 100))}%`, real ? status : quiz.scoring === "weighted" ? "aproveitamento ponderado" : "desempenho líquido")}
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
        <button class="primary-button" type="button" data-back-tabs>${result.area === "programacao" && state.programmingDetail ? "Voltar para a trilha" : "Voltar para as abas"}</button>
      </section>
    `;
  }

  function renderAnsweredQuestion(question, index, item) {
    const answer = state.activeQuiz.answers[question.id];
    const expected = OPEN_TYPES.has(question.tipo)
      ? "autoavaliação"
      : question.tipo === "trueFalse"
        ? question.gabarito
        : normalizeOptions(question)[Number(question.gabarito)]?.label;
    const marked = question.tipo === "trueFalse"
      ? answer === BLANK || answer === undefined ? "Em branco" : answer === "C" ? "Certo" : "Errado"
      : answer === undefined ? "Em branco" : normalizeOptions(question)[Number(answer)]?.label || answer;
    return `
      <article class="question-card ${item.correct ? "is-correct" : item.wrong ? "is-wrong" : "is-blank"}">
        <div class="question-meta">
          <span>Questão ${index + 1}</span>
          <span>${item.correct ? "✅ certa" : item.partial ? "🟨 parcial" : item.wrong ? "❌ errada" : "⬜ branco"}</span>
        </div>
        <p>${escapeHtml(question.enunciado)}</p>
        ${question.codigo ? `<pre><code>${escapeHtml(question.codigo)}</code></pre>` : ""}
        <p><strong>Sua resposta:</strong> ${escapeHtml(marked)} · <strong>Gabarito:</strong> ${escapeHtml(expected ?? question.gabarito)}</p>
        <details open>
          <summary>Ver explicação e fonte</summary>
          ${OPEN_TYPES.has(question.tipo) && question.resposta_esperada ? `<p><strong>Resposta esperada:</strong> ${escapeHtml(question.resposta_esperada)}</p>` : ""}
          <p>${escapeHtml(question.comentario || "Revise o assunto indicado.")}</p>
          ${question.link ? `<a href="${escapeHtml(question.link)}" target="_blank" rel="noreferrer">Link de estudo/fonte</a>` : ""}
        </details>
      </article>
    `;
  }

  async function startCrtDaily() {
    const today = getTodayKey();
    startQuiz({
      title: `Simulado diário CRT-SP — ${today}`,
      kind: "crt-daily",
      area: "crt-sp",
      trilha: "CRT-SP",
      scopeKey: "crt-daily",
      scoring: "quadrix",
      questions: await selectDailyCrtByDistribution({ countBasicos: 12, countComplementares: 8, countEspecificos: 20, seedKey: `crt-diario-${today}` }),
    });
  }

  async function startCrtExtra() {
    state.crtExtraAttempt += 1;
    const dailyIds = (await selectDailyCrtByDistribution({
      countBasicos: 12,
      countComplementares: 8,
      countEspecificos: 20,
      seedKey: `crt-diario-${getTodayKey()}`,
    })).map((question) => question.id);
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

  async function startCrtRealExam() {
    startQuiz({
      title: "Prova real CRT-SP — Técnico Administrativo",
      kind: "crt-real",
      area: "crt-sp",
      trilha: "CRT-SP",
      scopeKey: "crt-real",
      scoring: "quadrix",
      durationMinutes: 180,
      questions: await selectDailyCrtByDistribution({
        countBasicos: 40,
        countComplementares: 30,
        countEspecificos: 50,
        seedKey: `${getTodayKey()}-${state.currentUserId}-crt-real-${Date.now()}`,
      }),
    });
  }

  function startCertificationQuiz() {
    let pool = poolByArea("certificacoes").filter((question) => question.trilha === state.certTrack);
    let count = 10;
    let difficulty = state.difficulty;
    if (state.certMode === "simulado") count = 30;
    if (state.certMode === "tema") pool = pool.filter((question) => question.disciplina === state.certTopic);
    if (state.certMode === "dificil") {
      difficulty = "dificil";
      count = 15;
    }
    if (state.certMode === "erros") count = 15;
    const scopeKey = `cert-${state.certTrack}`;
    const legacyScopes = ["rapidas", "simulado", "tema", "dificil", "erros"]
      .map((mode) => `${state.certTrack}-${mode}`);
    startQuiz({
      title: `${state.certTrack} — ${state.certMode}`,
      kind: `certificacoes-${state.certMode}`,
      area: "certificacoes",
      trilha: state.certTrack,
      scopeKey,
      scoring: "positive",
      questions: selectRotatingQuestions({ pool, count, difficulty, seedKey: `${getTodayKey()}-${state.currentUserId}-${state.certTrack}-${state.certMode}-${state.certTopic}-${Date.now()}`, avoidIds: getRecentIds(scopeKey, legacyScopes) }),
    });
  }
  function startProgrammingQuiz() {
    const career = getProgrammingCareer();
    let pool = poolByArea("programacao").filter((question) => career.sourceTracks.includes(question.trilha));
    if (!pool.length) pool = poolByArea("programacao");
    startQuiz({
      title: `Programação — ${career.title}`,
      kind: "programacao",
      area: "programacao",
      trilha: career.title,
      scopeKey: `programacao-${career.id}`,
      scoring: "positive",
      questions: selectRotatingQuestions({ pool, count: 15, difficulty: "misto", seedKey: `${getTodayKey()}-${state.currentUserId}-prog-${career.id}-${Date.now()}`, avoidIds: getRecentIds(`programacao-${career.id}`) }),
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

  function academyPoolForMode(mode = state.academyMode, trackId = state.academyTrack) {
    const all = dataAcademyPool();
    if (mode === "rapido") return all;
    if (mode === "erro") {
      const weak = Object.keys(loadUserStats().materiasComMaisErro || {});
      const focused = all.filter((question) => weak.some((item) => (
        question.trilha.includes(item)
        || question.disciplina.includes(item)
        || question.assunto.includes(item)
        || question.tags?.some((tag) => item.toLowerCase().includes(String(tag).toLowerCase()))
      )));
      return focused.length ? focused : all;
    }
    if (mode === "entrevista") {
      return all.filter((question) => ["explainConcept", "caseStudy", "businessQuestion", "sqlQuery", "daxMeasure", "codeOutput"].includes(question.tipo));
    }
    if (mode === "portfolio") {
      return all.filter((question) => ["caseStudy", "businessQuestion", "explainConcept"].includes(question.tipo));
    }
    if (trackId === "Revisão Inteligente") {
      const recommendation = getDataStudyRecommendation();
      return all.filter((question) => question.trilha === recommendation.track);
    }
    if (trackId === "Desafios de Portfólio") {
      return all.filter((question) => ["caseStudy", "businessQuestion", "explainConcept"].includes(question.tipo));
    }
    return all.filter((question) => question.trilha === trackId);
  }

  function startDataAcademyQuiz(options = {}) {
    const mode = options.mode || state.academyMode;
    const trackId = options.track || state.academyTrack;
    const challenge = mode === "desafio" || options.challenge;
    const interview = mode === "entrevista";
    const portfolio = mode === "portfolio" || trackId === "Desafios de Portfólio";
    const count = challenge ? 8 : interview ? 8 : portfolio ? 6 : mode === "rapido" ? 10 : Number(state.academyQuantity) || 10;
    const difficulty = mode === "erro" ? state.difficulty : options.difficulty || state.difficulty;
    const pool = academyPoolForMode(mode, trackId);
    const scope = `academia-${trackId}`;
    const legacyScopes = ["rapido", "trilha", "desafio", "entrevista", "erro", "portfolio"]
      .map((legacyMode) => `academia-${legacyMode}-${trackId}`);
    state.academyAttempt += 1;

    startQuiz({
      title: `Academia de Dados — ${mode === "rapido" ? "Treino rápido" : mode === "erro" ? "Modo erro" : mode === "entrevista" ? "Modo entrevista" : mode === "portfolio" ? "Modo portfólio" : challenge ? "Desafio prático" : trackId}`,
      kind: `academia-${mode}`,
      area: "academia-dados",
      trilha: mode === "rapido" ? "Academia de Dados" : trackId,
      scopeKey: scope,
      scoring: "positive",
      difficulty,
      observation: portfolio ? `Projeto sugerido: ${getDataStudyRecommendation().project}` : "",
      questions: selectRotatingQuestions({
        pool,
        count,
        difficulty,
        seedKey: `${getTodayKey()}-${state.currentUserId}-${scope}-${mode}-${difficulty}-${state.academyAttempt}`,
        avoidIds: getRecentIds(scope, legacyScopes),
      }),
    });
  }

  function login(userId) {
    registerUserAccess(userId);
    state.studyMode = "concursos";
    state.activeTab = "santos-ibam";
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
    if (target.dataset.modeSwitch) {
      state.studyMode = target.dataset.modeSwitch;
      state.activeTab = state.studyMode === "concursos" ? "santos-ibam" : "programacao";
      state.activeQuiz = null;
      state.programmingDetail = null;
      renderActiveTab();
    }
    if (target.dataset.resetUser !== undefined) resetCurrentUserData();
    if (target.dataset.tab) {
      state.activeTab = target.dataset.tab;
      state.activeQuiz = null;
      state.programmingDetail = null;
      renderActiveTab();
    }
    if (target.dataset.startCrtDaily !== undefined) void startCrtDaily();
    if (target.dataset.startCrtExtra !== undefined) void startCrtExtra();
    if (target.dataset.startCrtReal !== undefined) void startCrtRealExam();
    if (target.dataset.selectCert) {
      state.certTrack = target.dataset.selectCert;
      renderCertificationTab();
    }
    if (target.dataset.startCert !== undefined) startCertificationQuiz();
    if (target.dataset.openProgrammingCareer) {
      state.programmingCareer = target.dataset.openProgrammingCareer;
      renderProgrammingCareerDetail(state.programmingCareer);
      requestAnimationFrame(() => {
        $("#career-detail-title")?.focus({ preventScroll: true });
        $("#workspace")?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start"
        });
      });
    }
    if (target.dataset.programmingBack !== undefined) {
      state.programmingDetail = null;
      renderProgrammingTab();
      requestAnimationFrame(() => document.querySelector(`[data-open-programming-career="${state.programmingCareer}"]`)?.focus());
    }
    if (target.dataset.careerStep && target.dataset.careerId) {
      const scrollY = window.scrollY;
      updateProgrammingCareerProgress(target.dataset.careerId, (record) => {
        record.completedSteps = record.completedSteps.includes(target.dataset.careerStep)
          ? record.completedSteps.filter((id) => id !== target.dataset.careerStep)
          : [...record.completedSteps, target.dataset.careerStep];
      });
      renderProgrammingCareerDetail(target.dataset.careerId);
      requestAnimationFrame(() => window.scrollTo({ top: scrollY, behavior: "auto" }));
    }
    if (target.dataset.careerProject !== undefined && target.dataset.careerId) {
      const scrollY = window.scrollY;
      updateProgrammingCareerProgress(target.dataset.careerId, (record) => { record.projectDone = !record.projectDone; });
      renderProgrammingCareerDetail(target.dataset.careerId);
      requestAnimationFrame(() => window.scrollTo({ top: scrollY, behavior: "auto" }));
    }
    if (target.dataset.startProgramming !== undefined) {
      if (target.dataset.programmingCareer) state.programmingCareer = target.dataset.programmingCareer;
      startProgrammingQuiz();
    }
    if (target.dataset.startData !== undefined) startDataQuiz();
    if (target.dataset.startAcademy !== undefined) startDataAcademyQuiz();
    if (target.dataset.academyAction) {
      const track = target.dataset.academyTrack || state.academyTrack;
      state.academyTrack = track;
      if (target.dataset.academyAction === "summary") renderAcademySummary(track);
      if (target.dataset.academyAction === "start") startDataAcademyQuiz({ mode: "trilha", track });
      if (target.dataset.academyAction === "challenge") startDataAcademyQuiz({ mode: "desafio", track, challenge: true });
    }
    if (target.dataset.santosAction) {
      const roleId = target.dataset.santosRole || state.santosCargo;
      state.santosCargo = roleId;
      if (target.dataset.santosAction === "summary" || target.dataset.santosAction === "study") renderSantosRoleSummary(roleId);
      if (target.dataset.santosAction === "quick") startSantosQuiz(roleId, "quick");
      if (target.dataset.santosAction === "full") startSantosQuiz(roleId, "full");
      if (target.dataset.santosAction === "real") startSantosQuiz(roleId, "real");
      if (target.dataset.santosAction === "custom") startSantosQuiz(roleId, "custom");
      if (target.dataset.santosAction === "writing") startSantosWriting(roleId);
    }
    if (target.dataset.selfEval && state.activeQuiz) {
      state.activeQuiz.selfEvaluations[target.dataset.selfEval] = target.dataset.selfEvalValue;
      target.closest(".question-card")?.querySelectorAll(".self-eval-option").forEach((option) => option.classList.remove("selected"));
      target.classList.add("selected");
    }
    if (target.dataset.cancelQuiz !== undefined || target.dataset.backTabs !== undefined) {
      state.activeQuiz = null;
      if (state.activeTab === "programacao" && state.programmingDetail) renderProgrammingCareerDetail(state.programmingDetail);
      else renderActiveTab();
    }
    if (target.dataset.finishQuiz !== undefined) finishQuiz();
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (target.matches("[data-difficulty]")) state.difficulty = target.value;
    if (target.matches("[data-cert-track]")) {
      state.certTrack = target.value;
      if (state.activeTab === "certificacoes") renderCertificationTab();
    }
    if (target.matches("[data-cert-mode]")) {
      state.certMode = target.value;
      if (state.activeTab === "certificacoes") renderCertificationTab();
    }
    if (target.matches("[data-cert-topic]")) state.certTopic = target.value;
    if (target.matches("[data-programming-track]")) state.programmingTrack = target.value;
    if (target.matches("[data-data-track]")) state.dataTrack = target.value;
    if (target.matches("[data-academy-mode]")) state.academyMode = target.value;
    if (target.matches("[data-academy-quantity]")) state.academyQuantity = Number(target.value);
    if (target.matches("[data-santos-cargo]")) {
      state.santosCargo = target.value;
      if (state.activeTab === "santos-ibam") renderSantosIbamTab();
    }
    if (target.matches("[data-santos-quantity]")) {
      state.santosQuantity = Number(target.value);
      if (state.activeTab === "santos-ibam") renderSantosIbamTab();
    }
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

  void loadDailySelection();
  renderUserSelection();
})();


