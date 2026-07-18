import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(root, "data", "questoes");

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const code = readFileSync(join(root, "simulados.js"), "utf8");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(code, context, { filename: "simulados.js" });

const { questoes } = context.window.STUDY_DATA;

const files = [
  {
    file: "crt-sp.json",
    filter: (question) => question.concurso_id === "crt-sp",
  },
  {
    file: "ibge-agente.json",
    filter: (question) => question.concurso_id === "ibge" && question.cargos_compativeis.includes("ibge-acq"),
  },
  {
    file: "ibge-analista-ti.json",
    filter: (question) => question.concurso_id === "ibge" && question.cargos_compativeis.includes("ibge-analista-ti-dados"),
  },
  {
    file: "santos-oficial-administracao.json",
    filter: (question) => question.concurso_id === "santos-oficial",
  },
];

for (const item of files) {
  const payload = {
    generatedAt: new Date().toISOString(),
    schemaVersion: "2026.07.18",
    total: questoes.filter(item.filter).length,
    questoes: questoes.filter(item.filter),
  };
  writeFileSync(join(outputDir, item.file), `${JSON.stringify(payload, null, 2)}\n`);
}

writeFileSync(join(outputDir, "README.md"), `# Questões exportadas

Arquivos gerados automaticamente por:

\`\`\`bash
npm run export:data
\`\`\`

A fonte ativa do site é \`simulados.js\`. Estes JSONs servem para importação, auditoria e futura migração para Supabase.

- \`crt-sp.json\`
- \`ibge-agente.json\`
- \`ibge-analista-ti.json\`
- \`santos-oficial-administracao.json\`
`);
