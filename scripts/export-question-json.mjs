import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDir = join(root, "data", "questions");
const outputDir = join(root, "data", "questoes");

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const files = [
  ["crt-sp.json", "crt-sp.json"],
  ["ibge-acq.json", "ibge-agente.json"],
  ["ibge-analista-ti.json", "ibge-analista-ti.json"],
  ["santos-oficial.json", "santos-oficial-administracao.json"],
  ["pm-sp-aluno-soldado.json", "pm-sp-aluno-soldado.json"],
];

for (const [sourceFile, outputFile] of files) {
  const payload = JSON.parse(readFileSync(join(sourceDir, sourceFile), "utf8"));
  writeFileSync(join(outputDir, outputFile), `${JSON.stringify({
    ...payload,
    generatedAt: new Date().toISOString(),
    exportedFrom: `data/questions/${sourceFile}`,
  }, null, 2)}\n`);
}

writeFileSync(join(outputDir, "README.md"), `# Questões exportadas

Arquivos gerados automaticamente por:

\`\`\`bash
npm run export:data
\`\`\`

A fonte ativa do site é \`data/questions\`, carregada por \`simulados.js\`.
Estes JSONs em \`data/questoes\` são cópias de compatibilidade para auditoria, importação e futura migração para Supabase.

- \`crt-sp.json\`
- \`ibge-agente.json\`
- \`ibge-analista-ti.json\`
- \`santos-oficial-administracao.json\`
- \`pm-sp-aluno-soldado.json\`
`);
