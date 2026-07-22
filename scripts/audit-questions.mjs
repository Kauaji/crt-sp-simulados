import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadStudyData, repoRoot } from "./lib/load-study-data.mjs";
import {
  answerSignature,
  normalizeText,
  roleKeysForQuestion,
  semanticSimilarity,
  stableHash,
  validateAnswerKey,
} from "./lib/question-utils.mjs";

const SIMILARITY_THRESHOLD = 0.72;

function pushGrouped(map, key, value) {
  map.set(key, [...(map.get(key) || []), value]);
}

function questionHasSource(question) {
  return Boolean(
    question.source_type
    && question.source_board
    && question.source_institution
    && question.source_reference
    && question.source_exam_url,
  );
}

function duplicateAlternatives(question) {
  if (!question.alternativas?.length) return [];
  const seen = new Map();
  const duplicates = [];
  for (const option of question.alternativas) {
    const normalized = normalizeText(option.text);
    if (seen.has(normalized)) duplicates.push({ label: option.label, sameAs: seen.get(normalized) });
    else seen.set(normalized, option.label);
  }
  return duplicates;
}

function auditScope(scopeKey, questions) {
  const ids = new Map();
  const statements = new Map();
  const contentHashes = new Map();
  const factSignatures = new Map();

  for (const question of questions) {
    pushGrouped(ids, question.id, question.id);
    pushGrouped(statements, normalizeText(question.enunciado), question.id);
    const hash = question.content_hash || stableHash(question.enunciado);
    pushGrouped(contentHashes, hash, question.id);
    pushGrouped(factSignatures, answerSignature(question), question.id);
  }

  const similarStatements = [];
  for (let leftIndex = 0; leftIndex < questions.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < questions.length; rightIndex += 1) {
      const left = questions[leftIndex];
      const right = questions[rightIndex];
      if (left.assunto_id !== right.assunto_id || left.subassunto !== right.subassunto) continue;
      const score = semanticSimilarity(left.enunciado, right.enunciado);
      if (score >= SIMILARITY_THRESHOLD) {
        similarStatements.push({
          ids: [left.id, right.id],
          assunto_id: left.assunto_id,
          subassunto: left.subassunto,
          similarity: Number(score.toFixed(3)),
        });
      }
    }
  }

  const alternativesRepeated = questions.flatMap((question) => {
    const duplicates = duplicateAlternatives(question);
    return duplicates.length ? [{ id: question.id, duplicates }] : [];
  });

  const invalidAnswerKeys = questions
    .filter((question) => !validateAnswerKey(question))
    .map((question) => question.id);

  const report = {
    scopeKey,
    total: questions.length,
    duplicateIds: [...ids.entries()].filter(([, values]) => values.length > 1).map(([id, values]) => ({ id, count: values.length })),
    exactSameStatements: [...statements.entries()].filter(([, values]) => values.length > 1).map(([normalized, ids]) => ({ normalized, ids })),
    verySimilarStatements: similarStatements,
    sameAnswerAndBaseFact: [...factSignatures.entries()].filter(([, values]) => values.length > 1).map(([signature, ids]) => ({ signature, ids })),
    withoutSource: questions.filter((question) => !questionHasSource(question)).map((question) => question.id),
    withoutExplanation: questions.filter((question) => !question.explicacao?.trim()).map((question) => question.id),
    alternativesRepeated,
    invalidAnswerKeys,
  };

  report.ok = !(
    report.duplicateIds.length
    || report.withoutSource.length
    || report.withoutExplanation.length
    || report.alternativesRepeated.length
    || report.invalidAnswerKeys.length
  );

  return report;
}

function renderMarkdown(audit) {
  const lines = [
    "# Auditoria de questões",
    "",
    `Gerado em: ${audit.generatedAt}`,
    "",
    `Total geral: ${audit.total}`,
    "",
    "## Resumo por concurso/cargo",
    "",
    "| Escopo | Total | IDs dup. | Iguais | Muito semelhantes | Mesmo fato-base | Sem fonte | Sem explicação | Alt. repetidas | Gabarito inválido |",
    "|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|",
  ];

  for (const scope of audit.scopes) {
    lines.push([
      `| \`${scope.scopeKey}\``,
      scope.total,
      scope.duplicateIds.length,
      scope.exactSameStatements.length,
      scope.verySimilarStatements.length,
      scope.sameAnswerAndBaseFact.length,
      scope.withoutSource.length,
      scope.withoutExplanation.length,
      scope.alternativesRepeated.length,
      `${scope.invalidAnswerKeys.length} |`,
    ].join(" | "));
  }

  lines.push("", "## Duplicidades e similaridades registradas", "");
  for (const scope of audit.scopes) {
    lines.push(`### ${scope.scopeKey}`, "");
    lines.push(`- Enunciados muito semelhantes: ${scope.verySimilarStatements.length}`);
    lines.push(`- Mesmo gabarito e fato-base: ${scope.sameAnswerAndBaseFact.length}`);
    lines.push(`- IDs duplicados: ${scope.duplicateIds.length}`);
    if (scope.verySimilarStatements[0]) {
      lines.push(`- Exemplo similar: ${scope.verySimilarStatements[0].ids.join(" ↔ ")} (${scope.verySimilarStatements[0].similarity})`);
    }
    if (scope.sameAnswerAndBaseFact[0]) {
      lines.push(`- Exemplo mesmo fato-base: ${scope.sameAnswerAndBaseFact[0].ids.slice(0, 8).join(", ")}`);
    }
    lines.push("");
  }

  lines.push("## Observação operacional", "");
  lines.push("O auditor registra duplicidades e similaridades sem remover questões automaticamente. Substituições autorais devem ser feitas de forma controlada, com fonte e explicação preservadas.");
  return `${lines.join("\n")}\n`;
}

const data = await loadStudyData();
const scoped = new Map();

for (const question of data.questoes) {
  for (const key of roleKeysForQuestion(question)) {
    pushGrouped(scoped, key, question);
  }
}

const audit = {
  generatedAt: new Date().toISOString(),
  total: data.questoes.length,
  scopes: [...scoped.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([scopeKey, questions]) => auditScope(scopeKey, questions)),
  replacements: [],
};

audit.ok = audit.scopes.every((scope) => scope.ok);

const reportsDir = join(repoRoot, "reports");
mkdirSync(reportsDir, { recursive: true });
writeFileSync(join(reportsDir, "question-audit.json"), `${JSON.stringify(audit, null, 2)}\n`);
writeFileSync(join(reportsDir, "question-audit.md"), renderMarkdown(audit));

console.log(`Auditoria concluída: ${audit.total} questões em ${audit.scopes.length} escopos.`);
console.log(`Relatórios: reports/question-audit.json e reports/question-audit.md`);

const fatalIssues = audit.scopes.reduce((sum, scope) => (
  sum
  + scope.duplicateIds.length
  + scope.withoutSource.length
  + scope.withoutExplanation.length
  + scope.alternativesRepeated.length
  + scope.invalidAnswerKeys.length
), 0);

if (fatalIssues) {
  console.error(`Falha: ${fatalIssues} problema(s) estrutural(is) encontrado(s). Veja reports/question-audit.md.`);
  process.exitCode = 1;
}
