import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const MAX_EXAMPLES_PER_CHECK = 16;
const MC_MIN_POOL = 20;
const MC_MAX_DOMINANCE = 0.4;
const MC_MAX_LENGTH_CUE = 0.55;
const SUBJECT_MC_MAX_LENGTH_CUE = 0.65;
const TRUE_FALSE_MIN_POOL = 8;
const TRUE_FALSE_MAX_DOMINANCE = 0.65;
const SUBJECT_MC_MIN_POOL = 12;
const SUBJECT_MC_MAX_DOMINANCE = 0.5;
const SUBJECT_LENGTH_MIN_POOL = 10;
const SUBJECT_TRUE_FALSE_MIN_POOL = 8;
const SUBJECT_TRUE_FALSE_MAX_DOMINANCE = 0.75;
const MC_MIN_CYCLE_POOL = 16;
const TRUE_FALSE_MIN_CYCLE_POOL = 12;
const MIN_CYCLE_REPETITIONS = 3;
const MAX_CYCLE_PERIOD = 6;
const MIN_CYCLE_MATCH_RATE = 0.95;
const MAX_VARIANTS_PER_CONCEPT = 6;
const NEAR_DUPLICATE_STEM_SIMILARITY = 0.82;
const MIN_EXPLANATION_LENGTH = 45;
const MIN_REUSED_DISTRACTOR_LENGTH = 45;
const MAX_REUSED_DISTRACTOR_COUNT = 3;
const MIN_REFERENCED_PROMPT_LENGTH = 24;
const VALID_QUESTION_TYPES = new Set([
  "multipleChoice",
  "multipla_escolha",
  "trueFalse",
  "certo_errado",
  "codeOutput",
  "findError",
  "caseStudy",
  "explainConcept",
  "businessQuestion",
  "administrativeWriting",
  "sqlQuery",
  "completeCode",
  "daxMeasure",
]);
const VALID_DIFFICULTIES = new Set(["facil", "medio", "dificil"]);
const VALID_SUBJECT_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const SANTOS_EXPECTED_POOLS = new Map([
  ["santos-agente-portaria", {
    total: 100,
    prefix: "IBAM-AGP",
    edital: "73/2026",
    counts: new Map([
      ["Língua Portuguesa", 16],
      ["Matemática", 12],
      ["Legislação Municipal e Serviço Público", 16],
      ["Informática e Rotinas", 14],
      ["Conhecimentos Específicos", 42],
    ]),
  }],
  ["santos-inspetor-alunos", {
    total: 100,
    prefix: "IBAM-INSP",
    edital: "73/2026",
    counts: new Map([
      ["Língua Portuguesa", 16],
      ["Matemática", 12],
      ["Legislação Municipal e Serviço Público", 16],
      ["Informática e Rotinas", 14],
      ["Conhecimentos Específicos", 42],
    ]),
  }],
  ["santos-oficial-administracao", {
    total: 120,
    prefix: "IBAM-OFI",
    edital: "71/2026",
    counts: new Map([
      ["Língua Portuguesa", 18],
      ["Matemática", 14],
      ["Legislação Municipal e Serviço Público", 18],
      ["Informática e Rotinas", 16],
      ["Conhecimentos Específicos", 54],
    ]),
  }],
]);
const MINIMUM_TRACK_POOLS = new Map([
  ["programacao", 15],
  ["dados", 15],
  ["academia-dados", 40],
]);

const failures = new Map();

function addFailure(check, message) {
  const entries = failures.get(check) || [];
  entries.push(message);
  failures.set(check, entries);
}

function loadActiveBanks() {
  const context = { window: {} };
  vm.createContext(context);

  const execute = (filename) => {
    vm.runInContext(readFileSync(join(root, filename), "utf8"), context, { filename });
  };

  execute("simulados.js");
  const studyData = context.window.STUDY_DATA;
  if (!studyData || !Array.isArray(studyData.questoes) || !Array.isArray(studyData.concursos)) {
    throw new Error("simulados.js não publicou window.STUDY_DATA no formato esperado.");
  }

  execute("questions-bank.js");
  const baseExtraCount = context.window.QUESTION_BANK?.length;
  if (!Number.isInteger(baseExtraCount)) {
    throw new Error("questions-bank.js não publicou window.QUESTION_BANK no formato esperado.");
  }

  execute("santos-ibam-bank.js");
  const extraBank = context.window.QUESTION_BANK;
  if (!Array.isArray(extraBank) || extraBank.length < baseExtraCount) {
    throw new Error("santos-ibam-bank.js deixou window.QUESTION_BANK em formato inválido.");
  }

  const records = [
    ...studyData.questoes.map((question) => ({ question, origin: "simulados.js" })),
    ...extraBank.slice(0, baseExtraCount).map((question) => ({ question, origin: "questions-bank.js" })),
    ...extraBank.slice(baseExtraCount).map((question) => ({ question, origin: "santos-ibam-bank.js" })),
  ].filter(({ question }) => question?.status !== "inativo");

  return {
    context,
    studyData,
    extraBank,
    baseExtraCount,
    records,
  };
}

function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalized(value) {
  return text(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizedSurface(value) {
  return text(value)
    .normalize("NFC")
    .toLocaleLowerCase("pt-BR")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
}

function explanationOf(question) {
  return text(question.explicacao) || text(question.comentario);
}

function answerOf(question) {
  return question.resposta_correta ?? question.gabarito;
}

function alternativesOf(question) {
  return Array.isArray(question.alternativas) ? question.alternativas : [];
}

function alternativeText(alternative) {
  return typeof alternative === "string" ? text(alternative) : text(alternative?.text);
}

function alternativeLabel(alternative, index) {
  if (typeof alternative === "string") return String.fromCharCode(65 + index);
  return text(alternative?.label).toUpperCase();
}

function isOpenQuestion(question) {
  return alternativesOf(question).length === 0
    && answerOf(question) === undefined
    && Boolean(text(question.resposta_esperada));
}

function isTrueFalseQuestion(question) {
  const answer = answerOf(question);
  return alternativesOf(question).length === 0
    && typeof answer === "string"
    && ["C", "E"].includes(answer.trim().toUpperCase());
}

function correctOptionLabel(question) {
  const alternatives = alternativesOf(question);
  if (alternatives.length < 2) return null;
  const answer = answerOf(question);

  if (Number.isInteger(answer) && answer >= 0 && answer < alternatives.length) {
    return alternativeLabel(alternatives[answer], answer) || String.fromCharCode(65 + answer);
  }

  if (typeof answer === "string") {
    const candidate = answer.trim().toUpperCase();
    const numeric = Number(candidate);
    if (/^\d+$/.test(candidate) && Number.isInteger(numeric) && numeric >= 0 && numeric < alternatives.length) {
      return alternativeLabel(alternatives[numeric], numeric) || String.fromCharCode(65 + numeric);
    }
    const option = alternatives.find((alternative, index) => alternativeLabel(alternative, index) === candidate);
    if (option) return candidate;
  }

  return null;
}

function correctOptionText(question) {
  const alternatives = alternativesOf(question);
  const correctLabel = correctOptionLabel(question);
  if (!correctLabel) return "";
  const correctIndex = alternatives.findIndex((alternative, index) => (
    alternativeLabel(alternative, index) === correctLabel
  ));
  return correctIndex >= 0 ? alternativeText(alternatives[correctIndex]) : "";
}

function scopeKeys(question, origin) {
  if (text(question.concurso_id)) {
    const roleIds = Array.isArray(question.cargos_compativeis) && question.cargos_compativeis.length
      ? question.cargos_compativeis
      : [question.cargo_id].filter(Boolean);
    if (roleIds.length) {
      return [...new Set(roleIds.map((roleId) => `${question.concurso_id}::${roleId}`))];
    }
    return [`${question.concurso_id}::geral`];
  }

  const area = text(question.area) || origin;
  const track = text(question.trilha) || text(question.disciplina) || "geral";
  return [`${area}::${track}`];
}

function subjectKey(question) {
  return text(question.materia_id)
    || text(question.disciplina)
    || text(question.trilha)
    || text(question.assunto_id)
    || "geral";
}

function subjectScopeKeys(question, origin) {
  const subject = subjectKey(question);
  return scopeKeys(question, origin).map((scope) => `${scope}::${subject}`);
}

function contentSignature(question) {
  const optionTexts = alternativesOf(question)
    .map((alternative) => normalizedSurface(alternativeText(alternative)))
    .sort((left, right) => left.localeCompare(right, "pt-BR"));
  return [
    normalizedSurface(question.enunciado),
    normalizedSurface(question.codigo),
    optionTexts.join("\u241f"),
  ].join("\u241e");
}

function auditRequiredFields(records) {
  for (const { question, origin } of records) {
    const id = text(question?.id) || "(sem ID)";
    const location = `${id} [${origin}]`;
    if (!text(question?.id)) addFailure("Campos obrigatórios", `${location}: ID ausente.`);
    if (!text(question?.enunciado)) addFailure("Campos obrigatórios", `${location}: enunciado ausente.`);
    const explanation = explanationOf(question);
    if (!explanation) addFailure("Campos obrigatórios", `${location}: explicação/comentário ausente.`);
    else if (explanation.length < MIN_EXPLANATION_LENGTH) {
      addFailure("Qualidade da explicação", `${location}: explicação curta (${explanation.length}/${MIN_EXPLANATION_LENGTH} caracteres).`);
    }
    if (!text(question?.fonte)) addFailure("Campos obrigatórios", `${location}: fonte ausente.`);
    if (!/^https?:\/\/\S+$/i.test(text(question?.link))) {
      addFailure("Campos obrigatórios", `${location}: link oficial/educacional ausente ou inválido.`);
    }
  }
}

function auditTaxonomyFields(records) {
  for (const { question, origin } of records) {
    const id = text(question?.id) || "(sem ID)";
    const location = `${id} [${origin}]`;
    const type = text(question?.tipo);
    const difficulty = text(question?.dificuldade);
    const subsubject = text(question?.subassunto);

    if (!VALID_QUESTION_TYPES.has(type)) {
      addFailure("Metadados da questão", `${location}: tipo ausente ou inválido (${type || "vazio"}).`);
    }
    if (!VALID_DIFFICULTIES.has(difficulty)) {
      addFailure("Metadados da questão", `${location}: dificuldade ausente ou inválida (${difficulty || "vazia"}).`);
    }

    const requiresSubsubject = origin === "simulados.js" || origin === "santos-ibam-bank.js";
    if (requiresSubsubject && !subsubject) {
      addFailure("Metadados da questão", `${location}: subassunto ausente.`);
    } else if (subsubject && !VALID_SUBJECT_SLUG.test(subsubject)) {
      addFailure("Metadados da questão", `${location}: subassunto deve ser um identificador normalizado (${subsubject}).`);
    }
  }
}

const unaccentedPortuguese = /\b(?:certificacao|afirmacao|solucao|analise|seguranca|governanca|permissoes|cenario|relatorio|decisao|questao|visualizacao|aplicacao|atualizacao|informacao|operacao|protecao|organizacao)\b/iu;
const answerLeak = /\b(?:essa|esta) afirma(?:ção|cao) (?:está|esta) correta\b/iu;
const caricatureDistractor = /\b(?:editar imagens|formatar textos no navegador|apaga(?:r)? o banco de dados|não tem relação com programação|tentativa aleatória|apenas em sistemas sem internet)\b/iu;
const mechanicalAlternativePadding = /;\s*al[eé]m disso,/iu;
const repeatedWord = /\b([\p{L}]{3,})\s+\1\b/iu;
const awkwardGeneratedPhrase = /\b(?:no contexto de contexto|não deve validar\s+(?!a conduta de)[\p{L}]+r\b)/iu;

function auditLanguageQuality(records) {
  for (const { question, origin } of records) {
    const id = text(question.id) || "(sem ID)";
    const location = `${id} [${origin}]`;
    const naturalTextFields = [
      question.enunciado,
      explanationOf(question),
      question.resposta_esperada,
      ...alternativesOf(question).map(alternativeText),
    ].filter((value) => text(value));

    if (naturalTextFields.some((value) => unaccentedPortuguese.test(value))) {
      addFailure("Acentuação", `${location}: possui palavra portuguesa sem acento.`);
    }
    if (answerLeak.test(text(question.enunciado))) {
      addFailure("Vazamento de gabarito", `${location}: o enunciado revela que a afirmação está correta.`);
    }
    if (naturalTextFields.some((value) => caricatureDistractor.test(value))) {
      addFailure("Distratores fracos", `${location}: contém alternativa caricata ou sem plausibilidade.`);
    }
    if (alternativesOf(question).some((alternative) => mechanicalAlternativePadding.test(alternativeText(alternative)))) {
      addFailure("Padding mecânico de alternativas", `${location}: contém alternativa montada artificialmente com "; além disso,".`);
    }
    if (naturalTextFields.some((value) => repeatedWord.test(value) || awkwardGeneratedPhrase.test(value))) {
      addFailure("Redação automática", `${location}: contém repetição ou construção artificial que precisa de revisão.`);
    }

    const alternatives = alternativesOf(question);
    const correctLabel = correctOptionLabel(question);
    if (!alternatives.length || !correctLabel) continue;
    const correctIndex = alternatives.findIndex((alternative, index) => alternativeLabel(alternative, index) === correctLabel);
    const correctText = alternativeText(alternatives[correctIndex]);
    if (normalized(correctText) === normalized(explanationOf(question))) {
      addFailure("Qualidade da explicação", `${location}: o comentário apenas repete a alternativa correta.`);
    }
  }
}

function auditDerivedVariantContext(records) {
  const derivedMultipleChoice = /(?:a equipe comparou duas respostas|foi registrada a resposta|a solu(?:ç|c)[aã]o proposta foi|considere as afirmativas)/iu;
  const derivedTrueFalse = /(?:foram comparadas duas orienta(?:ç|c)[oõ]es|uma minuta registra)/iu;
  const referencedPromptPattern = /(?:para o item|ao responder ao item|no item|para responder ao item)\s+“([^”]+)”/iu;

  for (const { question, origin } of records) {
    if (origin !== "simulados.js") continue;
    const stem = text(question.enunciado);
    const id = text(question.id) || "(sem ID)";

    if (derivedMultipleChoice.test(stem)) {
      const promptMatch = stem.match(referencedPromptPattern);
      const referencedPrompt = text(promptMatch?.[1]);
      const promptWords = normalizedWords(referencedPrompt).split(" ").filter(Boolean);
      const markerIndex = promptMatch?.index ?? -1;
      const contextualWords = markerIndex >= 0
        ? normalizedWords(stem.slice(0, markerIndex)).split(" ").filter(Boolean)
        : [];
      const looseJudgment = /^\d+(?:[.,]\d+)?\s+(?:est[aá]|seria)\s+(?:in)?corret[oa]$/iu.test(referencedPrompt);

      if (!promptMatch || referencedPrompt.length < MIN_REFERENCED_PROMPT_LENGTH || promptWords.length < 4 || looseJudgment) {
        addFailure(
          "Contexto de variante derivada",
          `${id} [${origin}]: variante diagnóstica/comparativa não preserva um enunciado-base suficiente.`,
        );
      } else if (contextualWords.length < 8) {
        addFailure(
          "Contexto de variante derivada",
          `${id} [${origin}]: variante derivada não apresenta contexto concreto antes do item-base.`,
        );
      }
    }

    if (!derivedTrueFalse.test(stem)) continue;
    const marker = stem.search(/(?:foram comparadas duas orienta(?:ç|c)[oõ]es|uma minuta registra)/iu);
    const contextualWords = marker >= 0
      ? normalizedWords(stem.slice(0, marker)).split(" ").filter(Boolean)
      : [];
    const hasFullComparison = /I\s*[—-]\s*.{20,}?\s+II\s*[—-]\s*.{20,}?(?:julgue|assinale|$)/iu.test(stem);
    const quotedStatements = [...stem.matchAll(/“([^”]{20,})”/gu)];
    const hasFullRevision = /uma minuta registra/iu.test(stem) && quotedStatements.length >= 2;
    if (contextualWords.length < 8 || (!hasFullComparison && !hasFullRevision)) {
      addFailure(
        "Contexto de variante derivada",
        `${id} [${origin}]: comparação C/E não contém contexto e formulações completas para julgamento.`,
      );
    }
  }
}

function auditIds(records) {
  const groups = new Map();
  for (const record of records) {
    const id = text(record.question?.id);
    if (!id) continue;
    const entries = groups.get(id) || [];
    entries.push(record.origin);
    groups.set(id, entries);
  }
  for (const [id, origins] of groups) {
    if (origins.length > 1) {
      addFailure("IDs duplicados", `${id}: ${origins.length} ocorrências (${origins.join(", ")}).`);
    }
  }
}

function auditAnswersAndAlternatives(records) {
  for (const { question, origin } of records) {
    const id = text(question.id) || "(sem ID)";
    const location = `${id} [${origin}]`;
    const alternatives = alternativesOf(question);

    if (isOpenQuestion(question)) continue;

    if (alternatives.length) {
      if (alternatives.length < 2) {
        addFailure("Alternativas", `${location}: questão objetiva tem menos de duas alternativas.`);
      }
      const optionTexts = [];
      const optionLabels = [];
      alternatives.forEach((alternative, index) => {
        const optionText = alternativeText(alternative);
        const optionLabel = alternativeLabel(alternative, index);
        if (!optionText) addFailure("Alternativas", `${location}: alternativa ${index + 1} está vazia.`);
        if (!optionLabel) addFailure("Alternativas", `${location}: alternativa ${index + 1} está sem rótulo.`);
        optionTexts.push(normalizedSurface(optionText));
        optionLabels.push(optionLabel);
      });
      if (new Set(optionTexts.filter(Boolean)).size !== optionTexts.filter(Boolean).length) {
        addFailure("Alternativas", `${location}: possui textos de alternativas duplicados.`);
      }
      if (new Set(optionLabels.filter(Boolean)).size !== optionLabels.filter(Boolean).length) {
        addFailure("Alternativas", `${location}: possui rótulos de alternativas duplicados.`);
      }
      if (!correctOptionLabel(question)) {
        addFailure("Gabaritos inválidos", `${location}: gabarito não aponta para uma alternativa existente.`);
      }
      continue;
    }

    if (!isTrueFalseQuestion(question)) {
      if (text(question.resposta_esperada)) {
        continue;
      }
      addFailure("Gabaritos inválidos", `${location}: não possui gabarito C/E, alternativas ou resposta esperada.`);
    }
  }
}

function auditReusedIncorrectAlternatives(records) {
  const groups = new Map();

  for (const record of records) {
    const { question, origin } = record;
    const alternatives = alternativesOf(question);
    const correctLabel = correctOptionLabel(question);
    if (!correctLabel || alternatives.length < 3) continue;
    const correctIndex = alternatives.findIndex((alternative, index) => (
      alternativeLabel(alternative, index) === correctLabel
    ));

    alternatives.forEach((alternative, index) => {
      if (index === correctIndex) return;
      const raw = alternativeText(alternative);
      const signature = normalizedWords(raw);
      if (raw.length < MIN_REUSED_DISTRACTOR_LENGTH || signature.split(" ").length < 7) return;
      for (const scope of subjectScopeKeys(question, origin)) {
        const key = `${scope}\u241e${signature}`;
        const group = groups.get(key) || { scope, raw, ids: new Set() };
        group.ids.add(text(question.id) || "(sem ID)");
        groups.set(key, group);
      }
    });
  }

  for (const { scope, raw, ids } of groups.values()) {
    if (ids.size <= MAX_REUSED_DISTRACTOR_COUNT) continue;
    addFailure(
      "Distrator incorreto reutilizado",
      `${scope}: a alternativa incorreta “${raw}” aparece em ${ids.size} questões (${[...ids].join(", ")}). Limite: ${MAX_REUSED_DISTRACTOR_COUNT}.`,
    );
  }
}

const mojibakePatterns = [
  { label: "sequência UTF-8 interpretada como Latin-1", pattern: /\u00c3[\u0080-\u00bf]/u },
  { label: "sequência Windows-1252 corrompida", pattern: /(?:\u00c2[\u0080-\u00bf]|\u00e2(?:\u0080|\u20ac)|\u00f0\u0178)/u },
  { label: "caractere de substituição", pattern: /(?:\ufffd|\u00ef\u00bf\u00bd)/u },
  { label: "caractere de controle inesperado", pattern: /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u },
];

function auditEncoding(records) {
  for (const { question, origin } of records) {
    const id = text(question.id) || "(sem ID)";
    const fields = [
      ["enunciado", question.enunciado],
      ["código", question.codigo],
      ["explicação", explanationOf(question)],
      ["resposta esperada", question.resposta_esperada],
      ...alternativesOf(question).map((alternative, index) => [`alternativa ${index + 1}`, alternativeText(alternative)]),
    ];
    for (const [fieldName, value] of fields) {
      if (!text(value)) continue;
      for (const { label, pattern } of mojibakePatterns) {
        if (pattern.test(value)) {
          addFailure("Codificação/mojibake", `${id} [${origin}], ${fieldName}: ${label}.`);
          break;
        }
      }
    }
  }
}

function auditExactDuplicates(records) {
  const groups = new Map();
  for (const record of records) {
    if (!text(record.question.enunciado)) continue;
    const signature = contentSignature(record.question);
    const entries = groups.get(signature) || [];
    entries.push(record);
    groups.set(signature, entries);
  }

  for (const entries of groups.values()) {
    if (entries.length < 2) continue;
    const ids = entries.map(({ question }) => question.id || "(sem ID)");
    const origins = [...new Set(entries.map(({ origin }) => origin))];
    addFailure(
      "Conteúdo duplicado",
      `${entries.length} questões idênticas: ${ids.join(", ")} [${origins.join(", ")}].`,
    );
  }
}

function firstExplanationSentence(question) {
  const explanation = explanationOf(question);
  const prepared = explanation.replace(/\barts?\./giu, (abbreviation) => abbreviation.slice(0, -1));
  const sentence = prepared.match(/^.*?[.!?](?:\s|$)/u)?.[0] || prepared;
  return normalized(sentence);
}

function normalizedWords(value) {
  return normalized(value)
    .replace(/[^a-z0-9]+/giu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const similarityStopWords = new Set(normalizedWords([
  "a o os as de da do das dos e em na no nas nos para por um uma que se ao como com",
  "seu sua seus suas cargo questão prefeitura santos rotina ocorre seguinte situação",
  "durante passagem serviço relatado relato colega sugeriu atalho luz atribuições deve",
  "providência mais adequada qual",
].join(" ")).split(" "));

function canonicalStem(value) {
  return normalizedWords(value)
    .replace(/^questao para o cargo .*?(?=na rotina de|durante a passagem de servico|em uma revisao)/u, "")
    .replace(/^na rotina de .*? ocorre a seguinte situacao\s+/u, "")
    .replace(/^durante a passagem de servico .*? foi relatado\s+/u, "")
    .replace(/^em uma revisao .*? analisa se este relato\s+/u, "")
    .replace(/\s+qual e a providencia mais adequada\b.*$/u, "")
    .replace(/\s+um colega sugeriu\b.*$/u, "")
    .replace(/\s+a sugestao registrada foi\b.*$/u, "")
    .trim();
}

function tokenSet(value) {
  return new Set(canonicalStem(value)
    .split(" ")
    .filter((token) => token.length > 2 && !similarityStopWords.has(token)));
}

function jaccardSimilarity(left, right) {
  const leftTokens = tokenSet(left);
  const rightTokens = tokenSet(right);
  if (!leftTokens.size || !rightTokens.size) return 0;
  let intersection = 0;
  for (const token of leftTokens) {
    if (rightTokens.has(token)) intersection += 1;
  }
  return intersection / (leftTokens.size + rightTokens.size - intersection);
}

function baseTopic(question) {
  return normalizedWords(question.assunto)
    .replace(/\s+analise de falha$/u, "")
    .trim();
}

function recordInGroups(map, keys, record) {
  for (const key of keys) {
    const entries = map.get(key) || [];
    entries.push(record);
    map.set(key, entries);
  }
}

function auditConceptualDuplicates(records) {
  const explanationGroups = new Map();
  const exactConceptGroups = new Map();
  const nearDuplicateBuckets = new Map();

  for (const record of records) {
    const { question, origin } = record;
    if (!isObjectiveQuestion(question)) continue;
    const explanation = firstExplanationSentence(question);
    if (!explanation) continue;
    const subject = subjectKey(question);
    const correctContent = normalizedWords(correctOptionText(question));
    const scopes = scopeKeys(question, origin);

    recordInGroups(
      explanationGroups,
      scopes.map((scope) => `${scope}\u241e${subject}\u241e${baseTopic(question)}\u241e${explanation}`),
      record,
    );

    if (correctContent) {
      recordInGroups(
        exactConceptGroups,
        scopes.map((scope) => `${scope}\u241e${subject}\u241e${explanation}\u241e${correctContent}`),
        record,
      );
      recordInGroups(
        nearDuplicateBuckets,
        scopes.map((scope) => `${scope}\u241e${subject}\u241e${baseTopic(question)}\u241e${explanation}\u241e${correctContent}`),
        record,
      );
    }
  }

  const alreadyReported = new Set();
  const reportedQuestionGroups = new Set();
  const pairKey = (left, right) => [left, right].sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true })).join("\u241f");
  const groupKey = (ids) => [...ids].sort((left, right) => left.localeCompare(right, "pt-BR", { numeric: true })).join("\u241f");

  for (const entries of explanationGroups.values()) {
    if (entries.length < 2) continue;
    const trueFalseEntries = entries.filter(({ question }) => isTrueFalseQuestion(question));
    if (trueFalseEntries.length === entries.length) {
      if (entries.length <= MAX_VARIANTS_PER_CONCEPT) continue;
      const ids = entries.map(({ question }) => question.id || "(sem ID)");
      const fingerprint = groupKey(ids);
      if (reportedQuestionGroups.has(fingerprint)) continue;
      reportedQuestionGroups.add(fingerprint);
      addFailure(
        "Repetição conceitual",
        `${ids.length} itens C/E reutilizam o mesmo fundamento: ${ids.join(", ")}. Limite: ${MAX_VARIANTS_PER_CONCEPT} abordagens distintas por conceito.`,
      );
      ids.forEach((left, index) => ids.slice(index + 1).forEach((right) => alreadyReported.add(pairKey(left, right))));
      continue;
    }

    if (entries.length > MAX_VARIANTS_PER_CONCEPT) {
      const ids = entries.map(({ question }) => question.id || "(sem ID)");
      const fingerprint = groupKey(ids);
      if (reportedQuestionGroups.has(fingerprint)) continue;
      reportedQuestionGroups.add(fingerprint);
      addFailure(
        "Repetição conceitual",
        `${ids.length} questões reutilizam assunto e fundamento: ${ids.join(", ")}. Máximo tolerado: ${MAX_VARIANTS_PER_CONCEPT} variações realmente distintas.`,
      );
      ids.forEach((left, index) => ids.slice(index + 1).forEach((right) => alreadyReported.add(pairKey(left, right))));
    }
  }

  for (const entries of exactConceptGroups.values()) {
    if (entries.length <= MAX_VARIANTS_PER_CONCEPT) continue;
    const ids = entries.map(({ question }) => question.id || "(sem ID)");
    const pairs = ids.flatMap((left, index) => ids.slice(index + 1).map((right) => pairKey(left, right)));
    if (pairs.length && pairs.every((pair) => alreadyReported.has(pair))) continue;
    const fingerprint = groupKey(ids);
    if (reportedQuestionGroups.has(fingerprint)) continue;
    reportedQuestionGroups.add(fingerprint);
    addFailure(
      "Repetição conceitual",
      `${ids.length} questões repetem fundamento e conteúdo correto: ${ids.join(", ")}. Limite: ${MAX_VARIANTS_PER_CONCEPT}.`,
    );
    ids.forEach((left, index) => ids.slice(index + 1).forEach((right) => alreadyReported.add(pairKey(left, right))));
  }

  for (const entries of nearDuplicateBuckets.values()) {
    if (entries.length < 2) continue;
    for (let leftIndex = 0; leftIndex < entries.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < entries.length; rightIndex += 1) {
        const left = entries[leftIndex].question;
        const right = entries[rightIndex].question;
        const idsKey = pairKey(left.id || "(sem ID)", right.id || "(sem ID)");
        if (alreadyReported.has(idsKey)) continue;
        const similarity = jaccardSimilarity(left.enunciado, right.enunciado);
        if (similarity < NEAR_DUPLICATE_STEM_SIMILARITY) continue;
        addFailure(
          "Repetição conceitual",
          `${left.id} e ${right.id}: mesmo assunto/conteúdo correto e enunciados ${(similarity * 100).toFixed(1)}% similares.`,
        );
      }
    }
  }
}

function auditRequiredPoolVariety(records) {
  const requirements = [
    { prefix: "SAN-LEG", expected: 35, label: "Legislação municipal de Santos" },
    { prefix: "PMSP-CGE", expected: 30, label: "Conhecimentos Gerais da PM-SP" },
  ];

  for (const requirement of requirements) {
    const pattern = new RegExp(`^${requirement.prefix}-\\d{3}$`, "u");
    const pool = records
      .map(({ question }) => question)
      .filter((question) => pattern.test(text(question.id)));

    if (pool.length !== requirement.expected) {
      addFailure(
        "Variedade obrigatória",
        `${requirement.label}: esperado ${requirement.expected} itens; encontrado ${pool.length}.`,
      );
      continue;
    }

    const checks = [
      ["subassuntos", pool.map((question) => normalized(question.subassunto))],
      ["fundamentos explicativos", pool.map((question) => normalized(question.explicacao || question.comentario))],
      ["conteúdos corretos", pool.map((question) => normalized(correctOptionText(question)))],
    ];

    for (const [dimension, values] of checks) {
      const validValues = values.filter(Boolean);
      const distinct = new Set(validValues);
      if (validValues.length !== requirement.expected || distinct.size !== requirement.expected) {
        addFailure(
          "Variedade obrigatória",
          `${requirement.label}: os ${requirement.expected} itens devem ter ${dimension} próprios; encontrados ${distinct.size} distintos.`,
        );
      }
    }
  }
}

function incrementDistribution(map, scope, answer) {
  const distribution = map.get(scope) || { total: 0, answers: new Map() };
  distribution.total += 1;
  distribution.answers.set(answer, (distribution.answers.get(answer) || 0) + 1);
  map.set(scope, distribution);
}

function auditAnswerDistribution(records) {
  const multipleChoice = new Map();
  const trueFalse = new Map();

  for (const { question, origin } of records) {
    const scopes = scopeKeys(question, origin);
    const optionLabel = correctOptionLabel(question);
    if (optionLabel) {
      scopes.forEach((scope) => incrementDistribution(multipleChoice, scope, optionLabel));
      continue;
    }
    if (isTrueFalseQuestion(question)) {
      const answer = answerOf(question).trim().toUpperCase();
      scopes.forEach((scope) => incrementDistribution(trueFalse, scope, answer));
    }
  }

  for (const [scope, distribution] of multipleChoice) {
    if (distribution.total < MC_MIN_POOL) continue;
    const [answer, count] = [...distribution.answers].sort((left, right) => right[1] - left[1])[0];
    const dominance = count / distribution.total;
    if (dominance > MC_MAX_DOMINANCE) {
      addFailure(
        "Distribuição de gabaritos",
        `${scope}: alternativa ${answer} domina ${count}/${distribution.total} (${(dominance * 100).toFixed(1)}%; limite 40%).`,
      );
    }
  }

  for (const [scope, distribution] of trueFalse) {
    if (distribution.total < TRUE_FALSE_MIN_POOL) continue;
    const [answer, count] = [...distribution.answers].sort((left, right) => right[1] - left[1])[0];
    const dominance = count / distribution.total;
    if (dominance > TRUE_FALSE_MAX_DOMINANCE) {
      addFailure(
        "Distribuição de gabaritos",
        `${scope}: resposta ${answer} domina ${count}/${distribution.total} (${(dominance * 100).toFixed(1)}%; limite 65%).`,
      );
    }
  }

  return { multipleChoice, trueFalse };
}

function auditSubjectAnswerDistribution(records) {
  const multipleChoice = new Map();
  const trueFalse = new Map();

  for (const { question, origin } of records) {
    const scopes = subjectScopeKeys(question, origin);
    const optionLabel = correctOptionLabel(question);
    if (optionLabel) {
      scopes.forEach((scope) => incrementDistribution(multipleChoice, scope, optionLabel));
      continue;
    }
    if (isTrueFalseQuestion(question)) {
      const answer = answerOf(question).trim().toUpperCase();
      scopes.forEach((scope) => incrementDistribution(trueFalse, scope, answer));
    }
  }

  for (const [scope, distribution] of multipleChoice) {
    if (distribution.total < SUBJECT_MC_MIN_POOL) continue;
    const [answer, count] = [...distribution.answers].sort((left, right) => right[1] - left[1])[0];
    const dominance = count / distribution.total;
    if (dominance > SUBJECT_MC_MAX_DOMINANCE) {
      addFailure(
        "Distribuição por disciplina/cargo",
        `${scope}: alternativa ${answer} domina ${count}/${distribution.total} (${(dominance * 100).toFixed(1)}%; limite 50%).`,
      );
    }
  }

  for (const [scope, distribution] of trueFalse) {
    if (distribution.total < SUBJECT_TRUE_FALSE_MIN_POOL) continue;
    const [answer, count] = [...distribution.answers].sort((left, right) => right[1] - left[1])[0];
    const dominance = count / distribution.total;
    if (dominance > SUBJECT_TRUE_FALSE_MAX_DOMINANCE) {
      addFailure(
        "Distribuição por disciplina/cargo",
        `${scope}: resposta ${answer} domina ${count}/${distribution.total} (${(dominance * 100).toFixed(1)}%; limite 75%).`,
      );
    }
  }
}

function auditPredictableAnswerCycles(records) {
  const groups = new Map();

  for (const { question, origin } of records) {
    const optionLabel = correctOptionLabel(question);
    const answer = optionLabel || (isTrueFalseQuestion(question) ? answerOf(question).trim().toUpperCase() : null);
    if (!answer) continue;
    const type = optionLabel ? "MC" : "C/E";
    for (const scope of subjectScopeKeys(question, origin)) {
      const key = `${origin}\u241e${scope}\u241e${type}`;
      const entries = groups.get(key) || { scope, type, values: [] };
      entries.values.push({ id: text(question.id) || "(sem ID)", answer });
      groups.set(key, entries);
    }
  }

  for (const { scope, type, values } of groups.values()) {
    const minimumPool = type === "MC" ? MC_MIN_CYCLE_POOL : TRUE_FALSE_MIN_CYCLE_POOL;
    if (values.length < minimumPool) continue;
    const ordered = [...values].sort((left, right) => left.id.localeCompare(right.id, "pt-BR", { numeric: true }));
    const maximumPeriod = Math.min(MAX_CYCLE_PERIOD, Math.floor(ordered.length / MIN_CYCLE_REPETITIONS));
    let detected = null;

    for (let period = 2; period <= maximumPeriod; period += 1) {
      const pattern = ordered.slice(0, period).map(({ answer }) => answer);
      if (new Set(pattern).size < 2) continue;
      const matches = ordered.reduce((total, entry, index) => (
        total + Number(entry.answer === pattern[index % period])
      ), 0);
      const rate = matches / ordered.length;
      if (rate >= MIN_CYCLE_MATCH_RATE) {
        detected = { period, pattern: pattern.join(""), rate };
        break;
      }
    }

    if (!detected) continue;
    addFailure(
      "Ciclo previsível de gabaritos",
      `${scope} (${type}, ${ordered.length} itens): padrão ${detected.pattern} de período ${detected.period} coincide em ${(detected.rate * 100).toFixed(1)}% da sequência por ID. Exemplos: ${ordered.slice(0, 8).map(({ id }) => id).join(", ")}.`,
    );
  }
}

function auditAnswerLengthCue(records) {
  const scopes = new Map();
  for (const { question, origin } of records) {
    const alternatives = alternativesOf(question);
    const correctLabel = correctOptionLabel(question);
    if (!correctLabel || alternatives.length < 2) continue;
    const correctIndex = alternatives.findIndex((alternative, index) => alternativeLabel(alternative, index) === correctLabel);
    const lengths = alternatives.map((alternative) => alternativeText(alternative).length);
    const correctLength = lengths[correctIndex];
    const maximum = Math.max(...lengths);
    const minimum = Math.min(...lengths);
    for (const scope of scopeKeys(question, origin)) {
      const metric = scopes.get(scope) || { total: 0, longest: 0, shortest: 0 };
      metric.total += 1;
      if (correctLength === maximum && lengths.filter((length) => length === maximum).length === 1) metric.longest += 1;
      if (correctLength === minimum && lengths.filter((length) => length === minimum).length === 1) metric.shortest += 1;
      scopes.set(scope, metric);
    }
  }

  for (const [scope, metric] of scopes) {
    if (metric.total < MC_MIN_POOL) continue;
    for (const [label, count] of [["mais longa", metric.longest], ["mais curta", metric.shortest]]) {
      const rate = count / metric.total;
      if (rate > MC_MAX_LENGTH_CUE) {
        addFailure(
          "Pista pelo tamanho da alternativa",
          `${scope}: a resposta correta é a única ${label} em ${count}/${metric.total} itens (${(rate * 100).toFixed(1)}%; limite 55%).`,
        );
      }
    }
  }
}

function auditSubjectAnswerLengthCue(records) {
  const subjects = new Map();
  for (const { question, origin } of records) {
    const alternatives = alternativesOf(question);
    const correctLabel = correctOptionLabel(question);
    if (!correctLabel || alternatives.length < 2) continue;
    const correctIndex = alternatives.findIndex((alternative, index) => alternativeLabel(alternative, index) === correctLabel);
    const lengths = alternatives.map((alternative) => alternativeText(alternative).length);
    const correctLength = lengths[correctIndex];
    const maximum = Math.max(...lengths);
    const minimum = Math.min(...lengths);
    for (const scope of subjectScopeKeys(question, origin)) {
      const metric = subjects.get(scope) || { total: 0, longest: 0, shortest: 0 };
      metric.total += 1;
      if (correctLength === maximum && lengths.filter((length) => length === maximum).length === 1) metric.longest += 1;
      if (correctLength === minimum && lengths.filter((length) => length === minimum).length === 1) metric.shortest += 1;
      subjects.set(scope, metric);
    }
  }

  for (const [scope, metric] of subjects) {
    if (metric.total < SUBJECT_LENGTH_MIN_POOL) continue;
    for (const [label, count] of [["mais longa", metric.longest], ["mais curta", metric.shortest]]) {
      const rate = count / metric.total;
      if (rate > SUBJECT_MC_MAX_LENGTH_CUE) {
        addFailure(
          "Pista pelo tamanho por disciplina/cargo",
          `${scope}: a resposta correta é a única ${label} em ${count}/${metric.total} itens (${(rate * 100).toFixed(1)}%; limite 65%).`,
        );
      }
    }
  }
}

function auditTrackCapacity(records) {
  const tracks = new Map();
  for (const { question } of records) {
    const area = text(question.area);
    if (!MINIMUM_TRACK_POOLS.has(area) || !text(question.trilha)) continue;
    const key = `${area}::${question.trilha}`;
    tracks.set(key, (tracks.get(key) || 0) + 1);
  }

  for (const [key, count] of tracks) {
    const [area] = key.split("::");
    const required = MINIMUM_TRACK_POOLS.get(area);
    if (count < required) {
      addFailure("Capacidade dos pools", `${key}: ${count} questões disponíveis; o modo pode solicitar ${required}.`);
    }
  }
}

function isObjectiveQuestion(question) {
  return alternativesOf(question).length >= 2 || isTrueFalseQuestion(question);
}

function auditMainContestDistribution(studyData) {
  for (const contest of studyData.concursos) {
    for (const role of contest.roles || []) {
      const scope = `${contest.id}::${role.id}`;
      const pool = studyData.questoes.filter((question) => (
        question.status !== "inativo"
        && question.concurso_id === contest.id
        && Array.isArray(question.cargos_compativeis)
        && question.cargos_compativeis.includes(role.id)
        && isObjectiveQuestion(question)
      ));
      const requiredTotal = Number(role.exam?.totalQuestoes) || 0;
      if (pool.length < requiredTotal) {
        addFailure("Distribuição do edital", `${scope}: banco objetivo ${pool.length}/${requiredTotal}.`);
      }

      for (const item of role.exam?.distribution || []) {
        const available = pool.filter((question) => (
          item.kind === "bloco" ? question.bloco === item.id : question.materia_id === item.id
        )).length;
        if (available < item.count) {
          addFailure(
            "Distribuição do edital",
            `${scope}, ${item.label}: ${available}/${item.count} questões.`,
          );
        }
      }
    }
  }
}

function auditSantosIbamDistribution(extraBank, config) {
  if (!config || !Array.isArray(config.roles)) {
    addFailure("Distribuição do edital", "santos-ibam-bank.js não publicou SANTOS_IBAM_CONFIG.roles.");
    return;
  }

  for (const role of config.roles) {
    const scope = `santos-ibam::${role.id}`;
    const pool = extraBank.filter((question) => (
      question.status !== "inativo"
      && question.concurso_id === "santos-ibam"
      && question.cargo_id === role.id
      && isObjectiveQuestion(question)
    ));
    const requiredTotal = (role.distribution || []).reduce((sum, item) => sum + Number(item.count || 0), 0);
    if (pool.length < requiredTotal) {
      addFailure("Distribuição do edital", `${scope}: banco objetivo ${pool.length}/${requiredTotal}.`);
    }
    for (const item of role.distribution || []) {
      const available = pool.filter((question) => question.disciplina === item.disciplina).length;
      if (available < item.count) {
        addFailure(
          "Distribuição do edital",
          `${scope}, ${item.disciplina}: ${available}/${item.count} questões.`,
        );
      }
    }
  }
}

function auditSantosIbamQuality(extraBank, config) {
  const roles = new Map((config?.roles || []).map((role) => [role.id, role]));
  const santosQuestions = extraBank.filter((question) => (
    question.status !== "inativo" && question.concurso_id === "santos-ibam"
  ));
  const knownRoleIds = new Set(SANTOS_EXPECTED_POOLS.keys());
  const allowedSourceHosts = new Set([
    "www.ibamsp-concursos.org.br",
    "www.ibam-concursos.org.br",
    "www.planalto.gov.br",
    "www.egov.santos.sp.gov.br",
    "egov.santos.sp.gov.br",
  ]);

  for (const question of santosQuestions) {
    const id = text(question.id) || "(sem ID)";
    const expected = SANTOS_EXPECTED_POOLS.get(question.cargo_id);
    const role = roles.get(question.cargo_id);
    if (!expected || !role) {
      addFailure("Metadados Santos/IBAM", `${id}: cargo_id desconhecido (${text(question.cargo_id) || "vazio"}).`);
      continue;
    }
    if (question.concurso !== "Prefeitura de Santos" || question.area !== "concursos-santos-ibam" || question.banca !== "IBAM") {
      addFailure("Metadados Santos/IBAM", `${id}: concurso, área ou banca incompatível com o banco Santos/IBAM.`);
    }
    if (question.cargo !== role.cargo || question.edital !== expected.edital) {
      addFailure("Metadados Santos/IBAM", `${id}: cargo ou edital não corresponde a ${question.cargo_id}.`);
    }
    if (!Array.isArray(question.cargos_compativeis)
      || question.cargos_compativeis.length !== 1
      || question.cargos_compativeis[0] !== question.cargo_id) {
      addFailure("Metadados Santos/IBAM", `${id}: cargos_compativeis deve conter somente o cargo da questão.`);
    }
    if (!text(question.subassunto) || !VALID_SUBJECT_SLUG.test(text(question.subassunto))) {
      addFailure("Metadados Santos/IBAM", `${id}: subassunto ausente ou não normalizado.`);
    }
    try {
      const sourceUrl = new URL(text(question.link));
      if (!allowedSourceHosts.has(sourceUrl.hostname.toLocaleLowerCase("pt-BR"))) {
        addFailure("Fontes Santos/IBAM", `${id}: link não aponta para IBAM, Planalto ou e-Gov Santos (${sourceUrl.hostname}).`);
      }
    } catch {
      addFailure("Fontes Santos/IBAM", `${id}: link de fonte inválido.`);
    }

    if (question.origem_tipo === "adaptacao-autoral-de-prova-anterior") {
      if (!/^IBAM\s+[—-]/u.test(text(question.prova_origem))) {
        addFailure("Proveniência de prova anterior", `${id}: prova_origem ausente ou sem identificação da banca IBAM.`);
      }
      if (!Number.isInteger(question.questao_origem) || question.questao_origem < 1) {
        addFailure("Proveniência de prova anterior", `${id}: questao_origem deve ser um inteiro positivo.`);
      }
      if (!new RegExp(`quest[aã]o\\s+${question.questao_origem}(?:\\D|$)`, "iu").test(text(question.fonte))) {
        addFailure("Proveniência de prova anterior", `${id}: fonte não registra a questão de inspiração.`);
      }
      try {
        const answerKeyUrl = new URL(text(question.fonte_gabarito));
        if (answerKeyUrl.hostname.toLocaleLowerCase("pt-BR") !== "www.ibam-concursos.org.br") {
          addFailure("Proveniência de prova anterior", `${id}: gabarito não aponta para o domínio oficial do IBAM.`);
        }
      } catch {
        addFailure("Proveniência de prova anterior", `${id}: fonte_gabarito ausente ou inválida.`);
      }
    }

    if (question.tipo === "administrativeWriting") {
      if (question.cargo_id !== "santos-oficial-administracao") {
        addFailure("Redação Oficial de Administração", `${id}: redação atribuída a cargo incompatível.`);
      }
      continue;
    }

    if (question.tipo !== "multipleChoice" || alternativesOf(question).length !== 4) {
      addFailure("Metadados Santos/IBAM", `${id}: item objetivo deve ser multipleChoice com quatro alternativas.`);
    }
    const expectedWeight = role.weights?.[question.disciplina];
    if (!Number.isFinite(expectedWeight) || question.peso !== expectedWeight) {
      addFailure(
        "Metadados Santos/IBAM",
        `${id}: peso ${question.peso} incompatível com ${question.disciplina} (${expectedWeight ?? "sem configuração"}).`,
      );
    }
  }

  for (const [roleId, expected] of SANTOS_EXPECTED_POOLS) {
    const pool = santosQuestions.filter((question) => question.cargo_id === roleId && question.tipo === "multipleChoice");
    if (pool.length !== expected.total) {
      addFailure("Blueprint Santos/IBAM", `${roleId}: banco objetivo deve ter exatamente ${expected.total} itens; encontrado ${pool.length}.`);
    }
    const adaptedPool = pool.filter((question) => question.origem_tipo === "adaptacao-autoral-de-prova-anterior");
    if (adaptedPool.length !== 20) {
      addFailure("Proveniência de prova anterior", `${roleId}: esperado bloco curado de 20 adaptações; encontrado ${adaptedPool.length}.`);
    }

    const foundSequences = new Set();
    for (const question of pool) {
      const match = text(question.id).match(new RegExp(`^${expected.prefix}-(\\d{3})$`, "u"));
      if (!match) {
        addFailure("Blueprint Santos/IBAM", `${text(question.id) || "(sem ID)"}: ID incompatível com o cargo ${roleId}.`);
      } else {
        foundSequences.add(Number(match[1]));
      }
    }
    for (let sequence = 1; sequence <= expected.total; sequence += 1) {
      if (!foundSequences.has(sequence)) {
        addFailure("Blueprint Santos/IBAM", `${roleId}: falta o ID ${expected.prefix}-${String(sequence).padStart(3, "0")}.`);
      }
    }

    for (const [discipline, count] of expected.counts) {
      const disciplinePool = pool.filter((question) => question.disciplina === discipline);
      if (disciplinePool.length !== count) {
        addFailure("Blueprint Santos/IBAM", `${roleId}, ${discipline}: esperado ${count}; encontrado ${disciplinePool.length}.`);
      }
      const levels = new Set(disciplinePool.map((question) => question.dificuldade));
      for (const level of VALID_DIFFICULTIES) {
        if (!levels.has(level)) {
          addFailure("Dificuldade Santos/IBAM", `${roleId}, ${discipline}: nenhuma questão de dificuldade ${level}.`);
        }
      }
    }

    const legalPool = pool.filter((question) => question.disciplina === "Legislação Municipal e Serviço Público");
    const requiredCoverage = [
      {
        label: "Lei Orgânica de Santos",
        assunto: /lei org[aâ]nica de santos/iu,
        fonte: /art\.\s*6º.*incisos?\s+i\s+e\s+v/iu,
        link: /egov\.santos\.sp\.gov\.br\/legis\/documents\/9596\/download/iu,
      },
      {
        label: "Lei Municipal nº 4.623/1984",
        assunto: /estatuto dos funcion[aá]rios de santos/iu,
        fonte: /4\.623\/1984.*art\.\s*222.*incisos?\s+iii\s+e\s+v/iu,
        link: /egov\.santos\.sp\.gov\.br\/legis\/documents\/55\/view/iu,
      },
      {
        label: "Lei Complementar Municipal nº 1.253/2024",
        assunto: /1\.253\/2024.*[oó]rg[aã]os e entidades/iu,
        fonte: /1\.253\/2024.*art\.\s*3º.*incisos?\s+i\s+e\s+ii/iu,
        link: /egov\.santos\.sp\.gov\.br\/legis\/documents\/10609\/view/iu,
      },
    ];
    for (const requirement of requiredCoverage) {
      const match = legalPool.find((question) => requirement.assunto.test(text(question.assunto)));
      if (!match || !requirement.fonte.test(text(match.fonte)) || !requirement.link.test(text(match.link))) {
        addFailure("Cobertura legal Santos/IBAM", `${roleId}: falta item fiel e referenciado sobre ${requirement.label}.`);
      }
    }
  }

  for (const question of santosQuestions) {
    if (!knownRoleIds.has(question.cargo_id)) continue;
    if (question.tipo !== "administrativeWriting") continue;
    const id = text(question.id) || "(sem ID)";
    const expectedText = `${text(question.enunciado)} ${text(question.resposta_esperada)}`;
    if (!/^IBAM-OFI-RED-\d{3}$/u.test(id)) {
      addFailure("Redação Oficial de Administração", `${id}: ID de redação fora do padrão IBAM-OFI-RED-NNN.`);
    }
    if (question.peso !== 40) {
      addFailure("Redação Oficial de Administração", `${id}: redação deve valer 40 pontos.`);
    }
    if (!/20\s+a\s+30\s+linhas/iu.test(expectedText) || !/sem\s+t[ií]tulo/iu.test(expectedText)) {
      addFailure("Redação Oficial de Administração", `${id}: comando deve exigir 20 a 30 linhas e texto sem título.`);
    }
    const rubric = text(question.comentario);
    if (!/25\s+pontos/iu.test(rubric) || !/15\s+pontos/iu.test(rubric) || !/0[,.]5\s+ponto/iu.test(rubric)) {
      addFailure("Redação Oficial de Administração", `${id}: matriz deve registrar 25+15 pontos e desconto de 0,5 por desvio.`);
    }
    if (question.disciplina !== "Redação administrativa" || question.bloco !== "Redação administrativa") {
      addFailure("Redação Oficial de Administração", `${id}: disciplina/bloco incompatível com a redação.`);
    }
  }

  const writingPool = santosQuestions.filter((question) => question.tipo === "administrativeWriting");
  if (writingPool.length !== 10) {
    addFailure("Redação Oficial de Administração", `Banco Santos/IBAM deve conter exatamente 10 propostas de redação; encontrado ${writingPool.length}.`);
  }
}

function formatDistribution(distribution) {
  return [...distribution.answers]
    .sort(([left], [right]) => left.localeCompare(right, "pt-BR"))
    .map(([answer, count]) => `${answer}:${count}`)
    .join(" ");
}

function printSummary(bank, answerDistribution) {
  const sourceCounts = [
    ["simulados.js", bank.studyData.questoes.filter((question) => question.status !== "inativo").length],
    ["questions-bank.js", bank.extraBank.slice(0, bank.baseExtraCount).filter((question) => question.status !== "inativo").length],
    ["santos-ibam-bank.js", bank.extraBank.slice(bank.baseExtraCount).filter((question) => question.status !== "inativo").length],
  ];
  const objectiveRecords = bank.records.filter(({ question }) => isObjectiveQuestion(question));
  const exactContentCount = new Set(bank.records.map(({ question }) => contentSignature(question))).size;
  const conceptualCount = new Set(objectiveRecords.map(({ question, origin }) => [
    origin,
    text(question.concurso_id) || text(question.area),
    text(question.cargo_id) || text(question.trilha),
    subjectKey(question),
    baseTopic(question),
    firstExplanationSentence(question),
  ].join("\u241e"))).size;

  console.log("\nAUDITORIA AUTOMATIZADA DO BANCO DE QUESTÕES");
  console.log("=".repeat(48));
  console.log(`Questões ativas: ${bank.records.length}`);
  for (const [source, count] of sourceCounts) console.log(`- ${source}: ${count}`);
  console.log(`- conteúdos integrais distintos: ${exactContentCount}/${bank.records.length}`);
  console.log(`- fundamentos/assuntos distintos nas objetivas: ${conceptualCount}/${objectiveRecords.length}`);
  console.log(`- pools MC significativos: ${[...answerDistribution.multipleChoice.values()].filter(({ total }) => total >= MC_MIN_POOL).length}`);
  console.log(`- pools C/E significativos: ${[...answerDistribution.trueFalse.values()].filter(({ total }) => total >= TRUE_FALSE_MIN_POOL).length}`);

  console.log("\nDistribuição dos pools significativos:");
  for (const [scope, distribution] of [...answerDistribution.multipleChoice].sort(([left], [right]) => left.localeCompare(right, "pt-BR"))) {
    if (distribution.total >= MC_MIN_POOL) {
      console.log(`- MC ${scope} (${distribution.total}): ${formatDistribution(distribution)}`);
    }
  }
  for (const [scope, distribution] of [...answerDistribution.trueFalse].sort(([left], [right]) => left.localeCompare(right, "pt-BR"))) {
    if (distribution.total >= TRUE_FALSE_MIN_POOL) {
      console.log(`- C/E ${scope} (${distribution.total}): ${formatDistribution(distribution)}`);
    }
  }

  if (!failures.size) {
    console.log("\nResultado: APROVADO — nenhum erro bloqueante encontrado.");
    return;
  }

  const failureCount = [...failures.values()].reduce((sum, entries) => sum + entries.length, 0);
  console.log(`\nResultado: REPROVADO — ${failureCount} erro(s) em ${failures.size} verificação(ões).`);
  for (const [check, entries] of failures) {
    console.log(`\n[${check}] ${entries.length} erro(s)`);
    for (const entry of entries.slice(0, MAX_EXAMPLES_PER_CHECK)) console.log(`- ${entry}`);
    if (entries.length > MAX_EXAMPLES_PER_CHECK) {
      console.log(`- ... mais ${entries.length - MAX_EXAMPLES_PER_CHECK} ocorrência(s).`);
    }
  }
}

try {
  const bank = loadActiveBanks();
  auditIds(bank.records);
  auditRequiredFields(bank.records);
  auditTaxonomyFields(bank.records);
  auditAnswersAndAlternatives(bank.records);
  auditReusedIncorrectAlternatives(bank.records);
  auditEncoding(bank.records);
  auditLanguageQuality(bank.records);
  auditDerivedVariantContext(bank.records);
  auditExactDuplicates(bank.records);
  auditConceptualDuplicates(bank.records);
  auditRequiredPoolVariety(bank.records);
  const answerDistribution = auditAnswerDistribution(bank.records);
  auditSubjectAnswerDistribution(bank.records);
  auditPredictableAnswerCycles(bank.records);
  auditAnswerLengthCue(bank.records);
  auditSubjectAnswerLengthCue(bank.records);
  auditTrackCapacity(bank.records);
  auditMainContestDistribution(bank.studyData);
  auditSantosIbamDistribution(bank.extraBank, bank.context.window.SANTOS_IBAM_CONFIG);
  auditSantosIbamQuality(bank.extraBank, bank.context.window.SANTOS_IBAM_CONFIG);
  printSummary(bank, answerDistribution);
  if (failures.size) process.exitCode = 1;
} catch (error) {
  console.error("\nAuditoria interrompida por erro fatal:");
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
}
