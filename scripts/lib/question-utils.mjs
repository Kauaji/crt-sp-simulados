const GENERIC_PREFIXES = [
  /^no atendimento presencial de um conselho profissional,\s*/i,
  /^durante a tramitação de processo administrativo,\s*/i,
  /^em relatório interno encaminhado à chefia imediata,\s*/i,
  /^na conferência de documentos recebidos por protocolo,\s*/i,
  /^em ação de orientação ao público externo,\s*/i,
  /^na preparação de comunicado oficial,\s*/i,
  /^em rotina de fiscalização e apoio administrativo,\s*/i,
  /^no controle de demandas da unidade da baixada santista,\s*/i,
  /^considerando uma rotina administrativa,\s*/i,
  /^em uma situação hipotética de prova,\s*/i,
  /^no exercício de função administrativa,\s*/i,
  /^em uma demanda típica do edital,\s*/i,
  /^em uma rotina de estudo para o edital ativo,\s*/i,
  /^em uma questão contextualizada para o concurso selecionado,\s*/i,
];

const STOPWORDS = new Set([
  "a", "o", "as", "os", "um", "uma", "uns", "umas", "de", "do", "da", "dos", "das",
  "em", "no", "na", "nos", "nas", "por", "para", "com", "sem", "sob", "sobre",
  "que", "qual", "quais", "e", "ou", "ao", "aos", "à", "às", "se", "sua", "seu",
  "suas", "seus", "esta", "este", "isto", "isso", "aquele", "aquela", "é", "ser",
  "assinale", "alternativa", "correta", "incorreta", "item", "julgue", "seguir",
]);

export function stripAccents(value) {
  return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function stripGenericPrefixes(value) {
  let text = String(value ?? "").trim();
  for (const prefix of GENERIC_PREFIXES) {
    text = text.replace(prefix, "");
  }
  return text.replace(/^julgue o item a seguir\.\s*/i, "");
}

export function normalizeText(value) {
  return stripAccents(stripGenericPrefixes(value))
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokensFor(value) {
  return normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 2 && !STOPWORDS.has(token));
}

export function stableHash(value) {
  const text = normalizeText(value);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function tokenSimilarity(a, b) {
  const left = new Set(tokensFor(a));
  const right = new Set(tokensFor(b));
  if (!left.size && !right.size) return 1;
  const intersection = [...left].filter((token) => right.has(token)).length;
  const union = new Set([...left, ...right]).size;
  return union ? intersection / union : 0;
}

export function ngrams(tokens, size = 3) {
  if (tokens.length < size) return tokens;
  const grams = [];
  for (let index = 0; index <= tokens.length - size; index += 1) {
    grams.push(tokens.slice(index, index + size).join(" "));
  }
  return grams;
}

export function ngramSimilarity(a, b, size = 3) {
  const left = new Set(ngrams(tokensFor(a), size));
  const right = new Set(ngrams(tokensFor(b), size));
  if (!left.size && !right.size) return 1;
  const intersection = [...left].filter((gram) => right.has(gram)).length;
  const union = new Set([...left, ...right]).size;
  return union ? intersection / union : 0;
}

export function semanticSimilarity(a, b) {
  return Math.max(tokenSimilarity(a, b), ngramSimilarity(a, b));
}

export function answerSignature(question) {
  const correctText = (question.alternativas || []).find((item) => item.label === question.resposta_correta)?.text || question.resposta_correta;
  return stableHash(`${question.assunto_id}|${question.subassunto}|${normalizeText(question.enunciado)}|${normalizeText(correctText)}`);
}

export function roleKeysForQuestion(question) {
  return (question.cargos_compativeis?.length ? question.cargos_compativeis : [question.cargo_id])
    .map((roleId) => `${question.concurso_id}::${roleId}`);
}

export function validateAnswerKey(question) {
  if (question.tipo === "certo_errado" || question.tipo === "verdadeiro_falso") {
    return ["C", "E"].includes(question.resposta_correta);
  }
  if (question.tipo === "multipla_escolha") {
    const labels = new Set((question.alternativas || []).map((option) => option.label));
    return labels.has(question.resposta_correta);
  }
  return Boolean(question.resposta_correta || ["redacao", "discursiva"].includes(question.tipo));
}
