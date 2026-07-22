// Carregador estático da plataforma multi-concurso.
// A fonte de verdade agora fica em data/sources, data/contests e data/questions.
"use strict";

import { SOURCES } from "./data/sources/sources.js";
import { USERS } from "./data/users.js";
import { CONCURSOS } from "./data/contests/index.js";
import { QUESTION_FILES } from "./data/questions/manifest.js";

const VERSION = "2026.07.21-multiconcurso-audit";

async function readQuestionFile(item) {
  const response = await fetch(`./data/questions/${item.file}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Falha ao carregar ${item.file}: ${response.status}`);
  }
  const payload = await response.json();
  return payload.questoes || [];
}

function countsByRole(questions) {
  return questions.reduce((acc, question) => {
    (question.cargos_compativeis || [question.cargo_id]).forEach((roleId) => {
      const key = `${question.concurso_id}:${roleId}`;
      acc[key] = (acc[key] || 0) + 1;
    });
    return acc;
  }, {});
}

function countsByContest(questions) {
  return questions.reduce((acc, question) => {
    acc[question.concurso_id] = (acc[question.concurso_id] || 0) + 1;
    return acc;
  }, {});
}

async function bootstrapStudyData() {
  const questionGroups = await Promise.all(QUESTION_FILES.map(readQuestionFile));
  const questoes = questionGroups.flat();

  window.STUDY_DATA = {
    version: VERSION,
    generatedAt: "2026-07-21",
    users: USERS,
    concursos: CONCURSOS,
    sources: SOURCES,
    questoes,
    counts: {
      byContest: countsByContest(questoes),
      byRole: countsByRole(questoes),
      total: questoes.length,
    },
  };

  window.BANCO_QUESTOES = questoes.filter((question) => question.concurso_id === "crt-sp");
  window.MINIMOS_PROVA_REAL = { basicos: 10, complementares: 8, especificos: 17, total: 36 };

  await import("./app.js");
}

bootstrapStudyData().catch((error) => {
  console.error(error);
  document.body.innerHTML = `
    <main class="load-error">
      <section class="panel">
        <h1>Não foi possível carregar os simulados</h1>
        <p>Atualize a página. Se continuar, verifique se os arquivos em <code>data/questions</code> foram publicados.</p>
        <pre>${String(error.message || error)}</pre>
      </section>
    </main>
  `;
});
