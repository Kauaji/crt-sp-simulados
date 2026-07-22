import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { loadStudyData, repoRoot } from "./lib/load-study-data.mjs";

const jsFiles = [
  "app.js",
  "simulados.js",
  "scripts/build.mjs",
  "scripts/export-question-json.mjs",
  "scripts/audit-questions.mjs",
  "scripts/lint.mjs",
  "scripts/lib/load-study-data.mjs",
  "scripts/lib/question-utils.mjs",
  "data/users.js",
  "data/sources/sources.js",
  "data/contests/index.js",
  "data/contests/crt-sp.js",
  "data/contests/ibge.js",
  "data/contests/santos-oficial.js",
  "data/contests/pm-sp.js",
  "data/config/exam-config.js",
  "data/config/question-distribution.js",
  "data/questions/manifest.js",
];

for (const file of jsFiles) {
  const result = spawnSync(process.execPath, ["--check", join(repoRoot, file)], { encoding: "utf8" });
  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout);
    process.exit(result.status || 1);
  }
}

const data = await loadStudyData();
const staleCopy = readFileSync(join(repoRoot, "index.html"), "utf8").includes("3 concursos");
if (staleCopy) {
  console.error("Texto desatualizado encontrado: \"3 concursos\".");
  process.exit(1);
}

const missingContentHash = data.questoes.filter((question) => !question.content_hash);
if (missingContentHash.length) {
  console.error(`Questões sem content_hash: ${missingContentHash.slice(0, 10).map((question) => question.id).join(", ")}`);
  process.exit(1);
}

console.log(`Lint concluído: ${jsFiles.length} arquivos JS e ${data.questoes.length} questões verificadas.`);
