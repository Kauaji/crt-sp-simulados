import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");

const staticFiles = [
  "index.html",
  "styles.css",
  "simulados.js",
  "questions-bank.js",
  "santos-ibam-bank.js",
  "career-guides.js",
  "app.js",
];

function copyDirectory(source, destination) {
  mkdirSync(destination, { recursive: true });
  for (const entry of readdirSync(source, { withFileTypes: true })) {
    const sourcePath = join(source, entry.name);
    const destinationPath = join(destination, entry.name);
    if (entry.isDirectory()) copyDirectory(sourcePath, destinationPath);
    if (entry.isFile()) copyFileSync(sourcePath, destinationPath);
  }
}

const supabaseUrl = process.env.SUPABASE_URL || "https://yzgmpjkuimzkerumsxls.supabase.co";
const supabasePublishableKey =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "";

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

for (const file of staticFiles) {
  const source = join(root, file);
  if (existsSync(source)) {
    copyFileSync(source, join(dist, file));
  }
}

const config = `window.CRTSP_SUPABASE_CONFIG = ${JSON.stringify(
  {
    url: supabaseUrl,
    publishableKey: supabasePublishableKey,
    enabled: Boolean(supabaseUrl && supabasePublishableKey),
    essayAiEnabled: process.env.ESSAY_AI_ENABLED === "true" && Boolean(process.env.OPENAI_API_KEY),
  },
  null,
  2,
)};
`;

writeFileSync(join(dist, "supabase-config.js"), config);

const dailySelection = join(root, "data", "daily-selection.json");
if (existsSync(dailySelection)) {
  mkdirSync(join(dist, "data"), { recursive: true });
  copyFileSync(dailySelection, join(dist, "data", "daily-selection.json"));
}

for (const directory of ["assets"]) {
  if (existsSync(join(root, directory))) {
    copyDirectory(join(root, directory), join(dist, directory));
  }
}
