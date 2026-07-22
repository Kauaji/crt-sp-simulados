import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = dirname(dirname(dirname(fileURLToPath(import.meta.url))));

export async function loadStudyData() {
  const { SOURCES } = await import(pathToFileURL(join(root, "data", "sources", "sources.js")).href);
  const { USERS } = await import(pathToFileURL(join(root, "data", "users.js")).href);
  const { CONCURSOS } = await import(pathToFileURL(join(root, "data", "contests", "index.js")).href);
  const { QUESTION_FILES } = await import(pathToFileURL(join(root, "data", "questions", "manifest.js")).href);

  const questoes = QUESTION_FILES.flatMap((item) => {
    const payload = JSON.parse(readFileSync(join(root, "data", "questions", item.file), "utf8"));
    return payload.questoes || [];
  });

  return {
    version: "node-load",
    users: USERS,
    concursos: CONCURSOS,
    sources: SOURCES,
    questoes,
    counts: {
      total: questoes.length,
      byContest: Object.fromEntries(CONCURSOS.map((contest) => [
        contest.id,
        questoes.filter((question) => question.concurso_id === contest.id).length,
      ])),
    },
  };
}

export { root as repoRoot };
