/* global BANCO_QUESTOES, MINIMOS_PROVA_REAL */
"use strict";

const USERS = {
  kaua: { id: "kaua", name: "Kauã", initial: "K" },
  vitoria: { id: "vitoria", name: "Vitória", initial: "V" },
  caio: { id: "caio", name: "Caio", initial: "C" },
};

const STORAGE_KEYS = {
  currentUser: "crtsp.currentUser",
  stats: "crtsp.stats.v2",
};

const TAB_LABELS = {
  daily: "Simulado diário",
  extra: "Questionário extra",
  real: "Prova real",
  studies: "Estudos",
  dashboard: "Dashboard",
};

const QUOTAS = {
  daily: {
    "Conhecimentos Básicos": 12,
    "Conhecimentos Complementares": 8,
    "Conhecimentos Específicos": 20,
  },
  real: {
    "Conhecimentos Básicos": 40,
    "Conhecimentos Complementares": 30,
    "Conhecimentos Específicos": 50,
  },
};

const DIFFICULTY_LABELS = {
  facil: "Fácil",
  medio: "Médio",
  dificil: "Difícil",
  misto: "Misto",
};

const OFFICIAL_LINKS = [
  ["Lei 13.639/2018", "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13639.htm"],
  ["Lei 5.524/1968", "https://www.planalto.gov.br/ccivil_03/leis/l5524.htm"],
  ["Decreto 90.922/1985", "https://www.planalto.gov.br/ccivil_03/decreto/antigos/d90922.htm"],
  ["Decreto 4.560/2002", "https://www.planalto.gov.br/ccivil_03/decreto/2002/D4560.htm"],
  ["Lei 9.784/1999", "https://www.planalto.gov.br/ccivil_03/leis/l9784.htm"],
  ["Lei 12.527/2011 — LAI", "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm"],
  ["Lei 13.709/2018 — LGPD", "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"],
  ["Lei 8.429/1992 — Improbidade", "https://www.planalto.gov.br/ccivil_03/leis/l8429.htm"],
  ["CFT", "https://www.cft.org.br/"],
  ["CRT-SP", "https://crtsp.gov.br/"],
  ["Regimento Interno CRT-SP", "https://crtsp.gov.br/regimento-interno-crt-sp/"],
  ["Resoluções CFT", "https://cft.org.br/category/resolucoes/"],
];

const YOUTUBE_SEARCHES = [
  "Português para concursos Quadrix",
  "Raciocínio lógico Quadrix",
  "Informática para concursos",
  "LAI para concursos",
  "LGPD para concursos",
  "Lei 9.784 para concursos",
  "Administração Pública para concursos",
  "Redação oficial para concursos",
  "Lei 13.639/2018 CFT CRT",
  "Sistema CFT CRT",
];

const STUDY_LINKS_BY_TAG = {
  "lei-13639": ["Lei 13.639/2018 no Planalto", "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13639.htm"],
  "lei-5524": ["Lei 5.524/1968 no Planalto", "https://www.planalto.gov.br/ccivil_03/leis/l5524.htm"],
  "decreto-90922": ["Decreto 90.922/1985 no Planalto", "https://www.planalto.gov.br/ccivil_03/decreto/antigos/d90922.htm"],
  "decreto-4560": ["Decreto 4.560/2002 no Planalto", "https://www.planalto.gov.br/ccivil_03/decreto/2002/D4560.htm"],
  lai: ["Lei 12.527/2011 — LAI", "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm"],
  lgpd: ["Lei 13.709/2018 — LGPD", "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"],
  improbidade: ["Lei 8.429/1992 — Improbidade", "https://www.planalto.gov.br/ccivil_03/leis/l8429.htm"],
  "processo-administrativo": ["Lei 9.784/1999 no Planalto", "https://www.planalto.gov.br/ccivil_03/leis/l9784.htm"],
  "regimento-crtsp": ["Regimento Interno CRT-SP", "https://crtsp.gov.br/regimento-interno-crt-sp/"],
  "resolucoes-cft": ["Resoluções CFT", "https://cft.org.br/category/resolucoes/"],
  "resolucao-206": ["Resolução CFT 206/2022", "https://www.cft.org.br/wp-content/uploads/2022/12/Resolucao-cft-n-206-2022.pdf"],
  "resolucao-207": ["Resolução CFT 207/2022", "https://www.cft.org.br/wp-content/uploads/2022/12/Resolucao-cft-n-207-2022.pdf"],
  "resolucao-208": ["Resolução CFT 208/2023", "https://cft.org.br/wp-content/uploads/2023/03/RESOLUCAO-CFT-N-208-2023.pdf"],
  "resolucao-288": ["Resolução CFT 288/2025", "https://cft.org.br/wp-content/uploads/2026/03/288.pdf"],
};

const DAILY_STUDY_ROTATION = [
  {
    title: "Sistema CFT/CRTs sem dó",
    focus: "Lei 13.639/2018 + Lei 5.524/1968",
    tasks: ["20 min lendo artigos secos", "15 min fazendo itens de legislação", "10 min anotando pegadinhas de competência"],
  },
  {
    title: "Bloco administrativo",
    focus: "rotinas, protocolo, atendimento e redação oficial",
    tasks: ["30 min teoria objetiva", "20 min questões de protocolo/arquivo", "10 min revisar erros anteriores"],
  },
  {
    title: "Complementares que derrubam",
    focus: "LAI, LGPD, Lei 9.784/1999 e improbidade",
    tasks: ["25 min lei seca", "20 min questões Certo/Errado", "15 min flashcards de exceções"],
  },
  {
    title: "Básicos para ganhar gordura",
    focus: "Português, RLM e Informática",
    tasks: ["20 min Português", "20 min porcentagem/lógica", "15 min informática e segurança"],
  },
];

const SOURCE_REFERENCES = [
  ["Edital CRT-SP 2026 — Quadrix", "https://quadrix.org.br/informacoes/3048/"],
  ["Acervo de provas anteriores Quadrix", "https://ajuda.quadrix.org.br/pt-BR/articles/8185732-acesso-as-provas-de-concursos-anteriores"],
  ["Lei 13.639/2018", "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13639.htm"],
  ["Lei 5.524/1968", "https://www.planalto.gov.br/ccivil_03/leis/l5524.htm"],
  ["Decreto 90.922/1985", "https://www.planalto.gov.br/ccivil_03/decreto/antigos/d90922.htm"],
  ["Decreto 4.560/2002", "https://www.planalto.gov.br/ccivil_03/decreto/2002/D4560.htm"],
  ["Lei 9.784/1999", "https://www.planalto.gov.br/ccivil_03/leis/l9784.htm"],
  ["Lei 12.527/2011 — LAI", "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm"],
  ["Lei 13.709/2018 — LGPD", "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"],
  ["Lei 8.429/1992", "https://www.planalto.gov.br/ccivil_03/leis/l8429.htm"],
  ["Regimento Interno CRT-SP", "https://crtsp.gov.br/regimento-interno-crt-sp/"],
  ["Resoluções oficiais do CFT", "https://cft.org.br/category/resolucoes/"],
];

const INCIDENCE_WEIGHTS = {
  "lei-13639": 10,
  "processo-administrativo": 10,
  lai: 9,
  lgpd: 9,
  "administracao-publica": 9,
  "lei-5524": 8,
  "decreto-90922": 8,
  "regimento-crtsp": 8,
  improbidade: 8,
  protocolo: 8,
  atendimento: 8,
  "redacao-oficial": 8,
  "resolucao-206": 7,
  "resolucao-207": 7,
  "resolucao-208": 7,
  "resolucao-288": 7,
  licitacoes: 7,
  portugues: 7,
  rlm: 6,
  informatica: 6,
  materiais: 5,
  logistica: 5,
  qualidade: 4,
  projetos: 4,
};

const ORIGIN_RULES = [
  { tags: ["lei-13639"], category: "Lei seca", origin: "Base legal: Lei 13.639/2018", detail: "Artigos 1º ao 9º; Sistema CFT/CRTs." },
  { tags: ["lei-5524"], category: "Lei seca", origin: "Base legal: Lei 5.524/1968", detail: "Atribuições do técnico industrial de nível médio." },
  { tags: ["decreto-90922"], category: "Lei seca", origin: "Base legal: Decreto 90.922/1985", detail: "Regulamentação do exercício profissional técnico." },
  { tags: ["decreto-4560"], category: "Lei seca", origin: "Base legal: Decreto 4.560/2002", detail: "Alterações no Decreto 90.922/1985." },
  { tags: ["lai"], category: "Lei seca", origin: "Base legal: Lei 12.527/2011", detail: "Publicidade, sigilo, transparência ativa/passiva e pedidos de acesso." },
  { tags: ["lgpd"], category: "Lei seca", origin: "Base legal: Lei 13.709/2018", detail: "Princípios, bases legais, segurança e tratamento pelo poder público." },
  { tags: ["improbidade"], category: "Lei seca", origin: "Base legal: Lei 8.429/1992", detail: "Dolo, atos de improbidade, sanções e responsabilidade." },
  { tags: ["processo-administrativo"], category: "Lei seca", origin: "Base legal: Lei 9.784/1999", detail: "Artigos 2º, 11, 50 e temas recorrentes de processo administrativo." },
  { tags: ["regimento-crtsp"], category: "Lei seca", origin: "Base normativa: Regimento Interno do CRT-SP", detail: "Organização, competências e funcionamento interno." },
  { tags: ["resolucao-206"], category: "Lei seca", origin: "Base normativa: Resolução CFT 206/2022", detail: "Código de Ética e Disciplina do Técnico Industrial." },
  { tags: ["resolucao-207"], category: "Lei seca", origin: "Base normativa: Resolução CFT 207/2022", detail: "Código de Processo Ético do Sistema CFT/CRTs." },
  { tags: ["resolucao-208"], category: "Lei seca", origin: "Base normativa: Resolução CFT 208/2023", detail: "Conduta ética de diretores e conselheiros." },
  { tags: ["resolucao-288"], category: "Lei seca", origin: "Base normativa: Resolução CFT 288/2025", detail: "Fiscalização profissional preventiva, educativa e inteligente." },
  { tags: ["licitacoes", "materiais", "logistica", "administracao", "qualidade", "projetos"], category: "Quadrix CREA", origin: "Inspirada no padrão Quadrix — CREA-GO/CREA-RO — área administrativa", detail: "Contexto de órgão fiscalizador, rotinas administrativas, compras, materiais e controle." },
  { tags: ["protocolo", "atendimento", "redacao-oficial", "rotinas"], category: "Quadrix CREF", origin: "Inspirada no padrão Quadrix — CREF/CREFONO — Técnico Administrativo", detail: "Cobrança de atendimento, protocolo, documentos, linguagem oficial e rotinas de conselho." },
  { tags: ["etica", "administracao-publica"], category: "Quadrix CRC", origin: "Inspirada no padrão Quadrix — CRC/CRN — Assistente Administrativo", detail: "Princípios administrativos, ética, integridade e conduta funcional." },
  { tags: ["portugues", "rlm", "informatica"], category: "Demais Conselhos Quadrix", origin: "Inspirada no padrão Quadrix — Conselhos Profissionais 2021-2026", detail: "Conhecimentos básicos no estilo Certo/Errado aplicado a rotinas administrativas." },
  { tags: ["cft", "crt"], category: "Quadrix CRT/CFT", origin: "Inspirada no padrão Quadrix — CRT/CFT e Conselhos Profissionais", detail: "Conteúdo contextualizado para conselhos de fiscalização profissional." },
];

const QUADRIX_TRAPS = {
  legislacao: [
    "Trocar competência legal por atribuição administrativa genérica.",
    "Usar “sempre”, “nunca” ou “apenas” para tornar regra relativa em absoluta.",
    "Confundir lei, decreto, regimento e resolução na hierarquia normativa.",
    "Afirmar que transparência elimina proteção de dados pessoais.",
    "Transformar poder fiscalizatório em atuação meramente educativa.",
  ],
  administracao: [
    "Confundir descentralização com desconcentração.",
    "Tratar eficiência como autorização para afastar a legalidade.",
    "Misturar controle, planejamento, direção e organização.",
    "Dizer que checklist elimina erro humano.",
    "Confundir processo contínuo com projeto temporário.",
  ],
  protocolo: [
    "Confundir arquivo corrente com arquivo permanente.",
    "Achar que autuação é mero arquivamento físico.",
    "Ignorar rastreabilidade, temporalidade e controle de versões.",
    "Transformar atendimento cordial em promessa de resultado.",
    "Confundir linguagem simples com informalidade inadequada.",
  ],
  basicos: [
    "Separar verbo de complemento por vírgula sem justificativa.",
    "Errar negação de proposições com “todos” e “algum”.",
    "Calcular porcentagem sobre a base errada.",
    "Achar que modo anônimo ou antivírus elimina todo risco.",
    "Ignorar palavras absolutas em interpretação de texto.",
  ],
};

let activeUserId = null;
let activeTab = "daily";
let quizStates = {};
let realTimer = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const escapeHtml = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function getTodayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function daysBetweenSafe(fromKey, toKey) {
  const [fy, fm, fd] = fromKey.split("-").map(Number);
  const [ty, tm, td] = toKey.split("-").map(Number);
  return Math.round((Date.UTC(ty, tm - 1, td) - Date.UTC(fy, fm - 1, fd)) / 86400000);
}

function hashSeed(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6D2B79F5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWithSeed(items, seedText) {
  const output = [...items];
  const random = seededRandom(hashSeed(seedText));
  for (let i = output.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output;
}

function createDefaultStats() {
  return {
    name: "",
    totalAccesses: 0,
    lastAccessDate: null,
    currentStreak: 0,
    bestStreak: 0,
    totalPoints: 0,
    examsFinished: 0,
    realExamsFinished: 0,
    bestNetScore: null,
    lastNetScore: null,
    netScoreSum: 0,
    history: [],
    questionsAnswered: 0,
    correctCount: 0,
    wrongCount: 0,
    blankCount: 0,
    extraAttempts: 0,
  };
}

function loadAllStats() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.stats) || "{}");
    return Object.fromEntries(Object.keys(USERS).map((id) => [
      id,
      { ...createDefaultStats(), name: USERS[id].name, ...(saved[id] || {}) },
    ]));
  } catch {
    return Object.fromEntries(Object.keys(USERS).map((id) => [id, { ...createDefaultStats(), name: USERS[id].name }]));
  }
}

function loadUserStats(userId = activeUserId) {
  return loadAllStats()[userId] || { ...createDefaultStats(), name: USERS[userId]?.name || "" };
}

function saveUserStats(userId, stats) {
  const all = loadAllStats();
  all[userId] = { ...stats, name: USERS[userId].name };
  localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(all));
}

function getCurrentUser() {
  return activeUserId ? USERS[activeUserId] : null;
}

function setCurrentUser(userId) {
  activeUserId = userId;
  localStorage.setItem(STORAGE_KEYS.currentUser, userId);
}

function updateUserStreak(stats, today = getTodayKey()) {
  if (stats.lastAccessDate === today) return stats;
  const diff = stats.lastAccessDate ? daysBetweenSafe(stats.lastAccessDate, today) : null;
  stats.currentStreak = diff === 1 ? stats.currentStreak + 1 : 1;
  stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
  stats.lastAccessDate = today;
  return stats;
}

function registerUserAccess(userId) {
  const stats = loadUserStats(userId);
  const today = getTodayKey();
  if (stats.lastAccessDate !== today) {
    stats.totalAccesses += 1;
    updateUserStreak(stats, today);
    saveUserStats(userId, stats);
  }
  return stats;
}

function streakPhrase(streak) {
  if (streak >= 30) return "Monstro do CRT-SP.";
  if (streak >= 15) return "Agora virou disciplina.";
  if (streak >= 7) return "Uma semana no modo concurseiro.";
  if (streak >= 3) return "Tá criando ritmo.";
  return "Começou a sequência.";
}

function formatScore(value) {
  return value === null || value === undefined ? "—" : String(Math.round(value * 10) / 10);
}

function normalizeDifficulty(difficulty) {
  return ["facil", "medio", "dificil"].includes(difficulty) ? difficulty : "misto";
}

function filterByDifficulty(pool, difficulty) {
  const normalized = normalizeDifficulty(difficulty);
  if (normalized === "misto") return pool;
  const exact = pool.filter((q) => q.dificuldade === normalized);
  return exact.length ? exact : pool;
}

function getIncidenceWeight(question) {
  const tagWeight = (question.tags || []).reduce((max, tag) => Math.max(max, INCIDENCE_WEIGHTS[tag] || 0), 0);
  const text = `${question.disciplina} ${question.assunto}`.toLowerCase();
  const textWeight = Object.entries({
    "lei 9.784": 10,
    "lei 13.639": 10,
    "lai": 9,
    "lgpd": 9,
    "protocolo": 8,
    "atendimento": 8,
    "redação": 8,
    "administração pública": 9,
    "improbidade": 8,
    "resolução": 7,
    "decreto": 7,
  }).reduce((max, [needle, weight]) => (text.includes(needle) ? Math.max(max, weight) : max), 0);
  return Math.max(3, tagWeight, textWeight);
}

function weightedOrder(items, seedText) {
  const random = seededRandom(hashSeed(seedText));
  return [...items]
    .map((item) => {
      const draw = Math.max(random(), 0.000001);
      return { item, score: -Math.log(draw) / getIncidenceWeight(item) };
    })
    .sort((a, b) => a.score - b.score)
    .map(({ item }) => item);
}

function selectFromPool(pool, count, seedText, avoidIds = new Set(), difficulty = "misto") {
  const filtered = filterByDifficulty(pool, difficulty);
  const preferred = filtered.filter((question) => !avoidIds.has(question.id));
  const fallback = filtered.filter((question) => avoidIds.has(question.id));
  const ordered = [
    ...weightedOrder(preferred, `${seedText}:weighted`),
    ...weightedOrder(fallback, `${seedText}:fallback`),
  ];
  if (ordered.length >= count) return ordered.slice(0, count);

  const expanded = [...ordered];
  let round = 1;
  while (expanded.length < count) {
    expanded.push(...weightedOrder(filtered, `${seedText}:fill:${round}`));
    round += 1;
  }
  return expanded.slice(0, count).map((question, index) => (
    index < ordered.length ? question : { ...question, id: `${question.id}-R${index}` }
  ));
}

function selectByQuotas(quotas, seedText, difficulty = "misto", avoidIds = new Set()) {
  return Object.entries(quotas).flatMap(([block, quota]) => {
    const pool = BANCO_QUESTOES.filter((question) => question.bloco === block);
    return selectFromPool(pool, quota, `${seedText}:${block}`, avoidIds, difficulty);
  });
}

function selectDailyQuestions(difficulty = "misto") {
  return shuffleWithSeed(selectByQuotas(QUOTAS.daily, `daily:${getTodayKey()}`, difficulty), `daily-order:${getTodayKey()}:${difficulty}`);
}

function selectExtraQuestions(quantity = 40, difficulty = "misto") {
  const stats = loadUserStats();
  const dailyIds = new Set((quizStates.daily?.questions || selectDailyQuestions()).map((question) => question.id));
  const seed = `extra:${getTodayKey()}:${stats.extraAttempts}:${difficulty}:${quantity}`;
  const selected = selectFromPool(BANCO_QUESTOES, quantity, seed, dailyIds, difficulty);
  return shuffleWithSeed(selected, `${seed}:order`);
}

function selectRealExamQuestions() {
  return shuffleWithSeed(selectByQuotas(QUOTAS.real, `real:${getTodayKey()}`, "misto"), `real-order:${getTodayKey()}`);
}

function answerLabel(value) {
  if (value === "C") return "Certo";
  if (value === "E") return "Errado";
  return "Em branco";
}

function getQuestionStatus(question, answer) {
  if (answer === "B" || !answer) return "blank";
  return answer === question.gabarito ? "correct" : "wrong";
}

function statusLabel(status) {
  return { correct: "Certa", wrong: "Errada", blank: "Em branco" }[status] || "Em branco";
}

function statusEmoji(status) {
  return { correct: "✅", wrong: "❌", blank: "⚪" }[status] || "⚪";
}

function getQuestionStudyLinks(question) {
  const links = [];
  (question.tags || []).forEach((tag) => {
    if (STUDY_LINKS_BY_TAG[tag] && !links.some((link) => link.url === STUDY_LINKS_BY_TAG[tag][1])) {
      const [label, url] = STUDY_LINKS_BY_TAG[tag];
      links.push({ label, url });
    }
  });
  const queryBase = `${question.disciplina} ${question.assunto} concurso CRT CFT`;
  links.push({
    label: "Buscar videoaula no YouTube",
    url: `https://www.youtube.com/results?search_query=${encodeURIComponent(queryBase)}`,
  });
  links.push({
    label: "Pesquisar resumo no Google",
    url: `https://www.google.com/search?q=${encodeURIComponent(`${queryBase} resumo`)}`,
  });
  return links.slice(0, 4);
}

function renderQuestionStudyLinks(question) {
  return `
    <div class="study-links">
      <strong>Links para estudar este tema:</strong>
      <div>${getQuestionStudyLinks(question).map((link) => `<a href="${link.url}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`).join("")}</div>
    </div>
  `;
}

function getQuestionOrigin(question) {
  const tags = question.tags || [];
  const rule = ORIGIN_RULES.find((item) => item.tags.some((tag) => tags.includes(tag)));
  if (rule) return rule;
  return {
    category: "Autoral legislativo",
    origin: "Questão autoral baseada em edital, legislação vigente e padrão Quadrix",
    detail: "Sem cópia literal de prova anterior; item criado para treino contextualizado.",
  };
}

function renderQuestionSource(question) {
  const origin = getQuestionOrigin(question);
  return `
    <div class="question-source">
      <strong>${origin.origin}</strong>
      <span>${escapeHtml(origin.detail)}</span>
    </div>
  `;
}

function getQuestionTrapGroup(question) {
  const tags = question.tags || [];
  if (tags.some((tag) => ["lei-13639", "lei-5524", "decreto-90922", "decreto-4560", "lai", "lgpd", "improbidade", "processo-administrativo", "regimento-crtsp", "resolucao-206", "resolucao-207", "resolucao-208", "resolucao-288"].includes(tag))) return "legislacao";
  if (tags.some((tag) => ["administracao", "administracao-publica", "qualidade", "projetos", "licitacoes", "materiais", "logistica"].includes(tag))) return "administracao";
  if (tags.some((tag) => ["protocolo", "atendimento", "redacao-oficial", "rotinas"].includes(tag))) return "protocolo";
  return "basicos";
}

function renderQuestionTraps(question) {
  const traps = QUADRIX_TRAPS[getQuestionTrapGroup(question)].slice(0, 4);
  return `
    <div class="quadrix-traps">
      <strong>Pegadinhas da Quadrix neste assunto:</strong>
      <ul>${traps.map((trap) => `<li>${escapeHtml(trap)}</li>`).join("")}</ul>
    </div>
  `;
}

function getOriginStats(questions) {
  const counts = questions.reduce((acc, question) => {
    const category = getQuestionOrigin(question).category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .map(([category, count]) => ({ category, count, percent: Math.round((count / questions.length) * 100) }))
    .sort((a, b) => b.count - a.count);
}

function renderQuadrixFidelity(state) {
  const stats = getOriginStats(state.questions);
  const referenced = stats.filter((item) => item.category !== "Autoral legislativo").reduce((sum, item) => sum + item.count, 0);
  const fidelity = referenced / state.questions.length >= 0.9 ? 95 : 90;
  const stars = fidelity >= 95 ? "★★★★★" : "★★★★☆";
  return `
    <section class="quadrix-audit">
      <div>
        <p class="section-kicker">Fidelidade ao estilo Quadrix</p>
        <h3>${stars} (${fidelity}%)</h3>
      </div>
      <p>O nível foi atribuído porque o simulado usa formato Certo/Errado, pontuação líquida, assuntos do edital CRT-SP 2026, pesos de incidência e matriz de inspiração em provas Quadrix de conselhos profissionais, sem cópia literal de itens protegidos.</p>
    </section>
  `;
}

function renderOriginStats(questions) {
  const stats = getOriginStats(questions);
  return `
    <section class="source-stats">
      <p class="section-kicker">Distribuição das inspirações</p>
      <div>${stats.map((item) => `
        <div class="source-stat">
          <span>${escapeHtml(item.category)}</span>
          <strong>${item.percent}%</strong>
          <small>${item.count} item(ns)</small>
        </div>
      `).join("")}</div>
    </section>
  `;
}

function renderOriginTable(questions) {
  return `
    <section class="origin-table">
      <p class="section-kicker">Transparência das questões</p>
      <h3>Origem do conteúdo</h3>
      <div class="origin-row origin-row--head"><span>Questão</span><span>Origem</span></div>
      ${questions.map((question, index) => {
        const origin = getQuestionOrigin(question);
        return `<div class="origin-row"><span>${index + 1}</span><span>${escapeHtml(origin.origin)}</span></div>`;
      }).join("")}
    </section>
  `;
}

function renderSourcesUsedPanel() {
  return `
    <article class="study-card study-card--wide sources-used">
      <h3>FONTES UTILIZADAS</h3>
      <ul>${SOURCE_REFERENCES.map(([label, url]) => `<li>✓ <a href="${url}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a></li>`).join("")}</ul>
      <p><strong>Questões adaptadas/inspiradas por matriz de estilo:</strong> Quadrix — CREA-GO, CREA-RO, CREF/CREFONO, CRN/CRC, CRF/CRMV e demais Conselhos Profissionais entre 2021 e 2026.</p>
    </article>
  `;
}

function renderIncidencePanel() {
  const rows = Object.entries(INCIDENCE_WEIGHTS)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);
  return `
    <article class="study-card study-card--wide incidence-panel">
      <h3>Pesos de incidência por assunto</h3>
      <p>O sorteio não é uniforme: temas mais recorrentes no edital CRT-SP e no padrão de provas Quadrix para conselhos profissionais entram com prioridade maior.</p>
      <div>${rows.map(([tag, weight]) => `<span>${escapeHtml(tag)} · peso ${weight}</span>`).join("")}</div>
    </article>
  `;
}

function renderDailyLessonPanel() {
  const suggestion = getDailyStudySuggestion();
  const group = suggestion.focus.toLowerCase().includes("português") || suggestion.focus.toLowerCase().includes("rlm") ? "basicos"
    : suggestion.focus.toLowerCase().includes("protocolo") || suggestion.focus.toLowerCase().includes("atendimento") ? "protocolo"
      : suggestion.focus.toLowerCase().includes("lei") || suggestion.focus.toLowerCase().includes("lgpd") || suggestion.focus.toLowerCase().includes("lai") ? "legislacao"
        : "administracao";
  return `
    <article class="study-card study-card--wide lesson-panel">
      <p class="section-kicker">Material do dia em formato apostila</p>
      <h3>${escapeHtml(suggestion.title)}</h3>
      <p><strong>Teoria resumida:</strong> estude primeiro a regra geral, depois exceções, competências, prazos e palavras absolutas usadas pela banca.</p>
      <p><strong>Macete:</strong> quando o item trouxer “sempre”, “nunca”, “apenas” ou “obrigatoriamente”, compare com a literalidade da lei ou com o conceito administrativo antes de marcar.</p>
      <div class="quadrix-traps">
        <strong>PEGADINHAS DA QUADRIX</strong>
        <ul>${QUADRIX_TRAPS[group].map((trap) => `<li>${escapeHtml(trap)}</li>`).join("")}</ul>
      </div>
    </article>
  `;
}

function calculateResult(state) {
  const result = {
    correct: 0,
    wrong: 0,
    blank: 0,
    netScore: 0,
    blocks: {},
    disciplines: {},
    weakTopics: new Map(),
    answers: { ...state.answers },
  };

  state.questions.forEach((question) => {
    const answer = result.answers[question.id] || "B";
    const status = answer === "B" ? "blank" : answer === question.gabarito ? "correct" : "wrong";
    result[status] += 1;
    for (const [bucket, key] of [["blocks", question.bloco], ["disciplines", question.disciplina]]) {
      result[bucket][key] ||= { correct: 0, wrong: 0, blank: 0, total: 0, net: 0 };
      result[bucket][key].total += 1;
      result[bucket][key][status] += 1;
      result[bucket][key].net = result[bucket][key].correct - result[bucket][key].wrong;
    }
    if (status !== "correct") {
      const key = question.assunto;
      const current = result.weakTopics.get(key) || { count: 0, discipline: question.disciplina };
      current.count += 1;
      result.weakTopics.set(key, current);
    }
  });

  result.netScore = result.correct - result.wrong;
  result.securityPercent = Math.round((result.correct / state.questions.length) * 100);
  return result;
}

function updateStatsAfterExam(state, result) {
  const stats = loadUserStats();
  const streakBonus = Math.min(stats.currentStreak, 10);
  const earnedPoints = Math.max(0, result.netScore) + result.correct + streakBonus;
  const weakSubjects = [...result.weakTopics.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 8)
    .map(([assunto, data]) => ({ assunto, disciplina: data.discipline, count: data.count }));

  stats.totalPoints += earnedPoints;
  stats.examsFinished += 1;
  if (state.type === "real") stats.realExamsFinished += 1;
  stats.lastNetScore = result.netScore;
  stats.bestNetScore = stats.bestNetScore === null ? result.netScore : Math.max(stats.bestNetScore, result.netScore);
  stats.netScoreSum += result.netScore;
  stats.questionsAnswered += state.questions.length;
  stats.correctCount += result.correct;
  stats.wrongCount += result.wrong;
  stats.blankCount += result.blank;
  stats.history.unshift({
    date: getTodayKey(),
    type: state.type,
    label: state.title,
    difficulty: state.difficulty,
    correct: result.correct,
    wrong: result.wrong,
    blank: result.blank,
    netScore: result.netScore,
    earnedPoints,
    weakSubjects,
  });
  stats.history = stats.history.slice(0, 12);
  saveUserStats(activeUserId, stats);
  return { stats, earnedPoints, streakBonus };
}

function renderUserSelection() {
  $("#app-shell").hidden = true;
  $("#login-screen").hidden = false;
  activeUserId = null;
  if (realTimer) clearInterval(realTimer);
}

function renderDashboard() {
  const user = getCurrentUser();
  const stats = loadUserStats();
  const average = stats.examsFinished ? stats.netScoreSum / stats.examsFinished : null;
  const accuracy = stats.correctCount + stats.wrongCount ? Math.round((stats.correctCount / (stats.correctCount + stats.wrongCount)) * 100) : 0;
  $("#top-user-name").textContent = user.name;
  $("#dashboard").innerHTML = `
    <div class="dashboard__intro">
      <p class="section-kicker">Painel de bordo</p>
      <h2>Olá, <span>${escapeHtml(user.name)}</span>.</h2>
      <p class="streak-callout">🔥 ${stats.currentStreak} ${stats.currentStreak === 1 ? "dia" : "dias"} — ${streakPhrase(stats.currentStreak)}</p>
      <div class="dashboard__actions">
        <button class="button button--small button--ghost" data-action="switch-user" type="button">Trocar usuário</button>
        <button class="button button--small button--danger" data-action="clear-user" type="button">Zerar meus dados locais</button>
      </div>
    </div>
    <div class="stat-grid">
      ${statCard("🏆 Pontos totais", stats.totalPoints, "pontos de jornada", true)}
      ${statCard("🔥 Foguinho atual", stats.currentStreak, `Recorde: ${stats.bestStreak}`)}
      ${statCard("🚀 Acessos", stats.totalAccesses, "dias registrados")}
      ${statCard("📚 Simulados", stats.examsFinished, "inclui extras")}
      ${statCard("🎯 Provas reais", stats.realExamsFinished, "120 itens")}
      ${statCard("Melhor líquida", formatScore(stats.bestNetScore), "recorde pessoal")}
      ${statCard("Última líquida", formatScore(stats.lastNetScore), "resultado recente")}
      ${statCard("Média líquida", formatScore(average), "todos os modos")}
      ${statCard("Taxa geral", `${accuracy}%`, `${stats.questionsAnswered} questões`)}
    </div>
    ${renderDailyStudyCard(stats)}
  `;
}

function statCard(label, value, detail, featured = false) {
  return `<article class="stat-card ${featured ? "stat-card--featured" : ""}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><small>${escapeHtml(detail)}</small></article>`;
}

function getDailyStudySuggestion(stats = loadUserStats()) {
  const weak = new Map();
  stats.history.forEach((item) => (item.weakSubjects || []).forEach((subject) => {
    weak.set(subject.assunto, (weak.get(subject.assunto) || 0) + subject.count);
  }));
  const topWeak = [...weak.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
  if (topWeak.length) {
    return {
      title: "Hoje é dia de atacar seus erros",
      focus: topWeak.map(([topic]) => topic).join(", "),
      tasks: [
        "15 min relendo o resumo dos temas fracos",
        "20 min refazendo itens errados ou em branco",
        "10 min criando anotações curtas com a pegadinha de cada tema",
      ],
    };
  }
  return DAILY_STUDY_ROTATION[hashSeed(`${getTodayKey()}:${activeUserId || "geral"}`) % DAILY_STUDY_ROTATION.length];
}

function renderDailyStudyCard(stats) {
  const suggestion = getDailyStudySuggestion(stats);
  return `
    <article class="daily-study-card">
      <div>
        <p class="section-kicker">Sugestão de estudo diário</p>
        <h3>${escapeHtml(suggestion.title)}</h3>
        <p><strong>Foco:</strong> ${escapeHtml(suggestion.focus)}</p>
      </div>
      <ul>${suggestion.tasks.map((task) => `<li>${escapeHtml(task)}</li>`).join("")}</ul>
    </article>
  `;
}

function renderRanking() {
  const all = loadAllStats();
  const userIds = Object.keys(USERS);
  const rows = [
    ["Pontos", "totalPoints"],
    ["Acessos", "totalAccesses"],
    ["Maior foguinho", "bestStreak"],
    ["Simulados", "examsFinished"],
    ["Provas reais", "realExamsFinished"],
  ];
  const scoreboard = Object.fromEntries(userIds.map((id) => [id, 0]));
  rows.forEach(([, field]) => {
    const values = userIds.map((id) => all[id][field] || 0);
    const max = Math.max(...values);
    if (max > 0) userIds.forEach((id) => { if ((all[id][field] || 0) === max) scoreboard[id] += 1; });
  });
  const bestScore = Math.max(...Object.values(scoreboard));
  const leaders = userIds.filter((id) => scoreboard[id] === bestScore && bestScore > 0);
  const winner = leaders.length === 1 ? `${USERS[leaders[0]].name} lidera` : "Empate técnico";
  $("#ranking").innerHTML = `
    <div class="ranking__header">
      <div><p class="section-kicker">Duelo amistoso</p><h2>${userIds.map((id) => USERS[id].name).join(" × ")}</h2></div>
      <p class="ranking-status">${winner}</p>
    </div>
    <div class="ranking-table" style="--ranking-user-count:${userIds.length}">
      <div class="ranking-row ranking-row--head"><span>Métrica</span>${userIds.map((id) => `<strong>${escapeHtml(USERS[id].name)}</strong>`).join("")}</div>
      ${rows.map(([label, field]) => {
        const values = userIds.map((id) => all[id][field] || 0);
        const max = Math.max(...values);
        return `<div class="ranking-row"><span>${label}</span>${userIds.map((id) => {
          const value = all[id][field] || 0;
          return `<strong class="${value === max && max > 0 ? "is-leading" : ""}">${value}</strong>`;
        }).join("")}</div>`;
      }).join("")}
    </div>
  `;
}

function renderTabs() {
  $("#tabs").innerHTML = Object.entries(TAB_LABELS).map(([id, label]) => (
    `<button class="tab-button ${activeTab === id ? "is-active" : ""}" type="button" data-tab="${id}">${label}</button>`
  )).join("");
  Object.keys(TAB_LABELS).forEach((id) => {
    const panel = $(`#${id}-tab`);
    if (panel) panel.hidden = activeTab !== id;
  });
}

function ensureDailyState() {
  if (!quizStates.daily || quizStates.daily.date !== getTodayKey()) {
    quizStates.daily = {
      type: "daily",
      title: "Simulado diário",
      date: getTodayKey(),
      difficulty: "misto",
      questions: selectDailyQuestions("misto"),
      answers: {},
      finished: false,
      result: null,
      reward: null,
    };
  }
  return quizStates.daily;
}

function createExtraState(quantity = 40, difficulty = "misto") {
  const stats = loadUserStats();
  stats.extraAttempts += 1;
  saveUserStats(activeUserId, stats);
  quizStates.extra = {
    type: "extra",
    title: "Questionário extra",
    date: getTodayKey(),
    difficulty,
    questions: selectExtraQuestions(quantity, difficulty),
    answers: {},
    finished: false,
    result: null,
    reward: null,
  };
}

function createRealState() {
  quizStates.real = {
    type: "real",
    title: "Prova real",
    date: getTodayKey(),
    difficulty: "misto",
    questions: selectRealExamQuestions(),
    answers: {},
    finished: false,
    started: true,
    durationSeconds: 3 * 60 * 60,
    startedAt: Date.now(),
    result: null,
    reward: null,
  };
  startRealTimer();
}

function renderDailyTab() {
  const state = ensureDailyState();
  const subjects = [...new Set(state.questions.map((question) => question.assunto))].slice(0, 12);
  $("#daily-tab").innerHTML = `
    <section class="mode-card">
      <div>
        <p class="section-kicker">Simulado do dia · ${new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date())}</p>
        <h2>40 itens para manter o ritmo.</h2>
        <p>Mesma prova para todos os perfis. A seleção muda automaticamente amanhã com sorteio determinístico pela data.</p>
      </div>
      <div class="chip-list">${subjects.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
    </section>
    ${renderQuiz(state)}
  `;
}

function renderExtraTab() {
  if (!quizStates.extra) createExtraState(20, "misto");
  $("#extra-tab").innerHTML = `
    <section class="mode-card mode-card--controls">
      <div>
        <p class="section-kicker">Treino livre</p>
        <h2>Gere perguntas diferentes.</h2>
        <p>O sorteio evita repetir exatamente o simulado diário e usa data, tentativa, quantidade e dificuldade como seed.</p>
      </div>
      <div class="control-grid">
        <label>Quantidade<select id="extra-quantity"><option value="10">10 questões</option><option value="20" selected>20 questões</option><option value="40">40 questões</option></select></label>
        <label>Dificuldade<select id="extra-difficulty">${difficultyOptions("misto")}</select></label>
        <button class="button button--primary" data-action="new-extra" type="button">Gerar novo questionário</button>
      </div>
    </section>
    ${renderQuiz(quizStates.extra)}
  `;
}

function renderRealTab() {
  const state = quizStates.real;
  if (!state) {
    $("#real-tab").innerHTML = `
      <section class="mode-card mode-card--real">
        <div>
          <p class="section-kicker">Modo prova real</p>
          <h2>120 itens · 3 horas sugeridas.</h2>
          <p>Distribuição: 40 básicos, 30 complementares e 50 específicos. Ao iniciar, o cronômetro opcional começa a contar.</p>
          <div class="score-rule"><span>+1 acerto</span><span>−1 erro</span><span>0 em branco</span></div>
        </div>
        <button class="button button--primary button--large" data-action="start-real" type="button">Iniciar prova real</button>
      </section>
    `;
    return;
  }
  $("#real-tab").innerHTML = `
    <section class="mode-card mode-card--real">
      <div><p class="section-kicker">Cronômetro opcional</p><h2 id="real-timer">${formatTimer(getRemainingSeconds(state))}</h2><p>Finalize quando quiser. O relatório calcula mínimos configuráveis e risco de eliminação.</p></div>
      <button class="button button--ghost" data-action="restart-real" type="button">Recomeçar prova real</button>
    </section>
    ${renderQuiz(state)}
  `;
}

function difficultyOptions(selected) {
  return Object.entries(DIFFICULTY_LABELS).map(([value, label]) => `<option value="${value}" ${selected === value ? "selected" : ""}>${label}</option>`).join("");
}

function renderQuiz(state) {
  const answered = Object.keys(state.answers).length;
  const percent = Math.round((answered / state.questions.length) * 100);
  const groups = state.questions.reduce((acc, question, index) => {
    (acc[question.bloco] ||= []).push({ ...question, displayNumber: index + 1 });
    return acc;
  }, {});

  return `
    <form class="quiz-form" data-quiz="${state.type}">
      <div class="progress-shell">
        <div class="progress-info"><span>${answered} de ${state.questions.length} respondidas</span><span>${percent}%</span></div>
        <div class="progress-track"><span style="width:${percent}%"></span></div>
      </div>
      ${Object.entries(groups).map(([block, questions]) => `
        <section class="question-block">
          <div class="block-heading"><h2>${escapeHtml(block)}</h2><span>${questions.length} itens</span></div>
          ${questions.map((question) => renderQuestion(question, state)).join("")}
        </section>
      `).join("")}
      <div class="exam-actions">
        <button class="button button--primary" type="submit" ${state.finished ? "disabled" : ""}>Finalizar ${state.type === "real" ? "prova" : "simulado"}</button>
        <button class="button button--ghost" data-action="reset-answers" data-quiz="${state.type}" type="button">Reiniciar respostas</button>
        ${state.type === "extra" ? `<button class="button button--ghost" data-action="new-extra" type="button">Recomeçar com outras perguntas</button>` : ""}
      </div>
    </form>
    ${state.finished ? renderResults(state) : ""}
  `;
}

function renderQuestion(question, state) {
  const name = `${state.type}-${question.id}`;
  const current = state.answers[question.id] || "";
  const finishedAnswer = state.result?.answers?.[question.id] || "B";
  const selectedAnswer = state.finished ? finishedAnswer : current;
  const status = state.finished ? getQuestionStatus(question, finishedAnswer) : null;
  return `
    <article class="question ${state.finished ? `question--review question--${status}` : ""}" ${state.finished ? "data-review-question=\"true\"" : ""}>
      <div class="question__meta"><span class="question__number">${question.displayNumber}</span><span>${escapeHtml(question.disciplina)} · ${escapeHtml(question.assunto)} · ${escapeHtml(DIFFICULTY_LABELS[question.dificuldade])}</span></div>
      ${state.finished ? `<div class="question-status question-status--${status}"><span>${statusEmoji(status)} ${statusLabel(status)}</span><small>Sua resposta: ${answerLabel(finishedAnswer)} · Gabarito: ${answerLabel(question.gabarito)}</small></div>` : ""}
      <p class="question__text">${escapeHtml(question.enunciado)}</p>
      <div class="choices" role="radiogroup" aria-label="Resposta do item ${question.displayNumber}">
        ${[["C", "Certo"], ["E", "Errado"], ["B", "Em branco"]].map(([value, label]) => `
          <input type="radio" id="${name}-${value}" name="${name}" value="${value}" ${selectedAnswer === value ? "checked" : ""} ${state.finished ? "disabled" : ""}>
          <label for="${name}-${value}">${label}</label>
        `).join("")}
      </div>
      ${state.finished ? `
        <details class="question-explanation">
          <summary>Ver explicação e links de estudo</summary>
          <p>${escapeHtml(question.comentario)}</p>
          ${renderQuestionSource(question)}
          ${renderQuestionTraps(question)}
          ${renderQuestionStudyLinks(question)}
        </details>
      ` : ""}
    </article>
  `;
}

function renderResults(state) {
  const { result, reward } = state;
  const weak = [...result.weakTopics.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 10);
  return `
    <section class="results">
      <div class="results__heading">
        <div><p class="section-kicker">Relatório final</p><h2>${escapeHtml(state.title)}</h2></div>
        <div class="net-score"><span>Pontuação líquida</span><strong>${result.netScore}</strong><small>${result.securityPercent}% de segurança</small></div>
      </div>
      <div class="metric-grid">
        ${metric("Acertos", result.correct, "correct")}
        ${metric("Erros", result.wrong, "wrong")}
        ${metric("Em branco", result.blank, "blank")}
      </div>
      <div class="points-earned">
        <div><span>Pontos ganhos</span><strong>+${reward.earnedPoints}</strong></div>
        <p>${Math.max(0, result.netScore)} pela líquida + ${result.correct} pelos acertos + ${reward.streakBonus} pelo foguinho</p>
        <div><span>Total acumulado</span><strong>${reward.stats.totalPoints}</strong></div>
      </div>
      ${renderQuadrixFidelity(state)}
      ${renderOriginStats(state.questions)}
      ${state.type === "real" ? renderEliminationRisk(result) : ""}
      <h3>Desempenho por bloco</h3>
      ${renderPerformance(result.blocks)}
      <h3>Desempenho por disciplina</h3>
      ${renderPerformance(result.disciplines)}
      <div class="review-panel">
        <div><p class="section-kicker">Revisão inteligente</p><h3>Assuntos para revisar</h3><p>Prioridade baseada em erros e respostas em branco.</p></div>
        <ul>${weak.length ? weak.map(([topic, data]) => `<li><strong>${escapeHtml(topic)}</strong> — ${data.count} item(ns)</li>`).join("") : "<li>Nenhum tema pendente. Excelente.</li>"}</ul>
      </div>
      <div class="result-actions">
        <button class="button button--primary" data-action="go-studies" type="button">Ir para Estudos</button>
        <button class="button button--ghost" data-action="new-extra" type="button">Fazer outro questionário</button>
      </div>
      <div class="answer-key">
        <p class="section-kicker">Correção detalhada</p>
        <h3>Gabarito comentado</h3>
        ${state.questions.map((question, index) => renderAnswerItem(question, index + 1, result.answers[question.id])).join("")}
      </div>
      ${renderOriginTable(state.questions)}
    </section>
  `;
}

function metric(label, value, kind) {
  return `<article class="metric metric--${kind}"><span>${label}</span><strong>${value}</strong></article>`;
}

function renderPerformance(performance) {
  return `<div class="block-results">${Object.entries(performance).map(([name, data]) => {
    const percent = Math.round((data.correct / data.total) * 100);
    return `<div class="block-result"><strong>${escapeHtml(name)}</strong><div class="block-result__track"><span style="width:${percent}%"></span></div><span>${percent}%</span><small>Líquida ${data.net}/${data.total}</small></div>`;
  }).join("")}</div>`;
}

function renderEliminationRisk(result) {
  const blockMap = {
    basicos: result.blocks["Conhecimentos Básicos"]?.net || 0,
    complementares: result.blocks["Conhecimentos Complementares"]?.net || 0,
    especificos: result.blocks["Conhecimentos Específicos"]?.net || 0,
    total: result.netScore,
  };
  const checks = Object.entries(MINIMOS_PROVA_REAL).map(([key, min]) => ({ key, min, value: blockMap[key], ok: blockMap[key] >= min }));
  const failed = checks.filter((item) => !item.ok).length;
  const status = failed === 0 ? "Dentro da zona segura" : failed <= 1 ? "Atenção" : "Risco de eliminação";
  return `
    <div class="risk-panel risk-panel--${failed === 0 ? "safe" : failed <= 1 ? "warn" : "danger"}">
      <div><p class="section-kicker">Mínimos eliminatórios configuráveis</p><h3>${status}</h3></div>
      <ul>${checks.map((item) => `<li>${escapeHtml(item.key)}: <strong>${item.value}</strong> / mínimo ${item.min} ${item.ok ? "✅" : "⚠️"}</li>`).join("")}</ul>
    </div>
  `;
}

function renderAnswerItem(question, number, answer) {
  const status = getQuestionStatus(question, answer);
  return `
    <article class="answer-item answer-item--${status}">
      <p class="answer-item__meta">ITEM ${number} · ${escapeHtml(question.disciplina)} · ${escapeHtml(question.assunto)}</p>
      <p><strong>Sua resposta:</strong> ${answerLabel(answer)} · <strong>Gabarito:</strong> ${answerLabel(question.gabarito)}</p>
      <p class="answer-item__comment">${escapeHtml(question.comentario)}</p>
      ${renderQuestionSource(question)}
    </article>
  `;
}

function renderStudyTab() {
  const recs = getPersonalizedStudyRecommendations();
  const dailySuggestion = getDailyStudySuggestion();
  $("#studies-tab").innerHTML = `
    <section class="mode-card">
      <div><p class="section-kicker">Central de estudos</p><h2>Revisão com peso de edital.</h2><p>Use esta aba entre simulados: primeiro legislação do Sistema CFT/CRTs, depois rotinas, protocolo, atendimento e leis complementares.</p></div>
      <div class="study-plan">
        <strong>Sugestão de hoje: ${escapeHtml(dailySuggestion.title)}</strong>
        <span><b>Foco:</b> ${escapeHtml(dailySuggestion.focus)}</span>
        ${dailySuggestion.tasks.map((task) => `<span>• ${escapeHtml(task)}</span>`).join("")}
      </div>
    </section>
    <section class="study-grid">
      ${renderDailyLessonPanel()}
      ${studyCard("A) Maior prioridade", ["Sistema CFT/CRT", "Lei 13.639/2018", "Lei 5.524/1968", "Decreto 90.922/1985", "Decreto 4.560/2002", "Regimento Interno CRT-SP", "Resoluções CFT", "rotinas administrativas", "protocolo", "atendimento", "redação oficial", "LAI", "LGPD", "Lei 9.784/1999", "improbidade administrativa"])}
      ${studyCard("B) Resumo rápido", [
        "Português: leia comando, procure generalizações e cuide de crase, concordância e pontuação.",
        "RLM: treine porcentagem, lógica proposicional, negações e proporcionalidade.",
        "Informática: segurança, planilhas, e-mail, nuvem e boas práticas.",
        "Ética/Administração Pública: LIMPE, finalidade, moralidade, conflito de interesses e atendimento.",
        "LAI/LGPD: publicidade como regra, proteção de dados e bases legais.",
        "Processo Administrativo/Improbidade: motivação, competência, contraditório e dolo.",
        "Administração Geral: planejamento, controle, qualidade, processos e projetos.",
        "Materiais/estoques/logística: ABC, PEPS, lead time, ponto de pedido e inventário.",
        "Licitações: planejamento, pregão, contratação direta, fiscalização e competitividade.",
        "Redação/protocolo: clareza, autuação, tramitação, temporalidade e arquivo.",
        "Sistema CFT/CRTs: leis, decretos, regimento e resoluções."
      ])}
      <article class="study-card"><h3>C) Links oficiais</h3><ul>${OFFICIAL_LINKS.map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a></li>`).join("")}</ul></article>
      <article class="study-card"><h3>D) Videoaulas gratuitas</h3><ul>${YOUTUBE_SEARCHES.map((term) => `<li><a href="https://www.youtube.com/results?search_query=${encodeURIComponent(term)}" target="_blank" rel="noreferrer">${escapeHtml(term)}</a></li>`).join("")}</ul></article>
      <article class="study-card study-card--wide"><h3>E) Revisão personalizada</h3>${recs}</article>
      ${renderIncidencePanel()}
      ${renderSourcesUsedPanel()}
      <article class="study-card study-card--wide"><h3>Dicas Quadrix</h3><p>Desconfie de “sempre”, “nunca”, “apenas” e “obrigatoriamente”. Em legislação, compare competência, prazo, finalidade e hierarquia normativa. Em administração, cuidado com troca entre descentralização/desconcentração, dispensa/inexigibilidade e processo/projeto.</p></article>
    </section>
  `;
}

function studyCard(title, items) {
  return `<article class="study-card"><h3>${escapeHtml(title)}</h3><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>`;
}

function getPersonalizedStudyRecommendations() {
  const stats = loadUserStats();
  if (!stats.history.length) return `<p>Faça pelo menos um simulado para liberar recomendações personalizadas.</p>`;
  const weak = new Map();
  stats.history.forEach((item) => (item.weakSubjects || []).forEach((subject) => {
    weak.set(subject.assunto, (weak.get(subject.assunto) || 0) + subject.count);
  }));
  const top = [...weak.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  const accuracy = stats.correctCount + stats.wrongCount ? stats.correctCount / (stats.correctCount + stats.wrongCount) : 0;
  const recommended = accuracy < 0.45 ? "fácil" : accuracy < 0.68 ? "médio" : "difícil";
  return `
    <p><strong>Treino recomendado hoje:</strong> ${recommended}.</p>
    <p><strong>Matérias/assuntos com mais erros ou brancos:</strong></p>
    <ul>${top.map(([topic, count]) => `<li>${escapeHtml(topic)} — ${count} ocorrência(s)</li>`).join("")}</ul>
  `;
}

function renderDashboardTab() {
  const stats = loadUserStats();
  $("#dashboard-tab").innerHTML = `
    <section class="mode-card">
      <div><p class="section-kicker">Histórico local</p><h2>Últimos resultados.</h2><p>Dados salvos somente neste navegador para ${escapeHtml(USERS[activeUserId].name)}.</p></div>
    </section>
    <div class="history-list">
      ${stats.history.slice(0, 5).length ? stats.history.slice(0, 5).map((item) => `
        <article class="history-item">
          <strong>${escapeHtml(item.label)} · ${escapeHtml(DIFFICULTY_LABELS[item.difficulty] || "Misto")}</strong>
          <span>${item.date} · líquida ${item.netScore} · ${item.correct} C / ${item.wrong} E / ${item.blank} B · +${item.earnedPoints} pts</span>
        </article>
      `).join("") : `<p class="empty-state">Nenhum resultado ainda. Faça o simulado diário para começar o histórico.</p>`}
    </div>
  `;
}

function renderActiveTab() {
  renderTabs();
  if (activeTab === "daily") renderDailyTab();
  if (activeTab === "extra") renderExtraTab();
  if (activeTab === "real") renderRealTab();
  if (activeTab === "studies") renderStudyTab();
  if (activeTab === "dashboard") renderDashboardTab();
}

function renderApp() {
  renderDashboard();
  renderRanking();
  renderActiveTab();
}

function handleAnswerChange(event) {
  const input = event.target;
  if (!input.matches("input[type='radio']")) return;
  const form = input.closest(".quiz-form");
  const type = form?.dataset.quiz;
  const state = quizStates[type];
  if (!state || state.finished) return;
  const questionId = input.name.replace(`${type}-`, "");
  state.answers[questionId] = input.value;
  renderActiveTab();
}

function finishQuiz(event) {
  event.preventDefault();
  const form = event.target.closest(".quiz-form");
  const type = form.dataset.quiz;
  const state = quizStates[type];
  if (!state || state.finished) return;
  state.result = calculateResult(state);
  state.reward = updateStatsAfterExam(state, state.result);
  state.finished = true;
  if (type === "real" && realTimer) clearInterval(realTimer);
  renderApp();
  document.querySelector(`#${type}-tab .results`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetAnswers(type) {
  const state = quizStates[type];
  if (!state || state.finished) return;
  state.answers = {};
  renderActiveTab();
}

function getRemainingSeconds(state) {
  const elapsed = Math.floor((Date.now() - state.startedAt) / 1000);
  return Math.max(0, state.durationSeconds - elapsed);
}

function formatTimer(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function startRealTimer() {
  if (realTimer) clearInterval(realTimer);
  realTimer = setInterval(() => {
    const el = $("#real-timer");
    if (!el || !quizStates.real || quizStates.real.finished) return;
    el.textContent = formatTimer(getRemainingSeconds(quizStates.real));
  }, 1000);
}

function handleDocumentClick(event) {
  const reviewQuestion = event.target.closest("[data-review-question='true']");
  if (reviewQuestion && !event.target.closest("a, button, input, label, summary, .question-explanation")) {
    const details = reviewQuestion.querySelector(".question-explanation");
    if (details) details.open = !details.open;
    return;
  }
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  if (action === "switch-user") renderUserSelection();
  if (action === "clear-user") {
    if (!window.confirm(`Zerar dados locais de ${USERS[activeUserId].name}?`)) return;
    saveUserStats(activeUserId, { ...createDefaultStats(), name: USERS[activeUserId].name });
    registerUserAccess(activeUserId);
    renderApp();
  }
  if (action === "new-extra") {
    const quantity = Number($("#extra-quantity")?.value || 20);
    const difficulty = $("#extra-difficulty")?.value || "misto";
    createExtraState(quantity, difficulty);
    activeTab = "extra";
    renderActiveTab();
  }
  if (action === "reset-answers") resetAnswers(event.target.dataset.quiz);
  if (action === "start-real" || action === "restart-real") {
    if (action === "restart-real" && !window.confirm("Recomeçar a prova real e apagar respostas desta tentativa?")) return;
    createRealState();
    renderActiveTab();
  }
  if (action === "go-studies") {
    activeTab = "studies";
    renderActiveTab();
    $("#tabs").scrollIntoView({ behavior: "smooth" });
  }
}

function handleTabClick(event) {
  const button = event.target.closest("[data-tab]");
  if (!button) return;
  activeTab = button.dataset.tab;
  renderActiveTab();
}

function enterApp(userId) {
  setCurrentUser(userId);
  registerUserAccess(userId);
  quizStates = {};
  ensureDailyState();
  activeTab = "daily";
  $("#login-screen").hidden = true;
  $("#app-shell").hidden = false;
  renderApp();
  window.scrollTo({ top: 0 });
}

document.querySelectorAll("[data-user]").forEach((button) => {
  button.addEventListener("click", () => enterApp(button.dataset.user));
});
$("#switch-user").addEventListener("click", renderUserSelection);
$("#tabs").addEventListener("click", handleTabClick);
document.addEventListener("click", handleDocumentClick);
document.addEventListener("change", handleAnswerChange);
document.addEventListener("submit", finishQuiz);

// Regra do projeto: sempre abrir na seleção, mesmo havendo usuário salvo.
renderUserSelection();
