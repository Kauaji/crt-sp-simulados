import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");

function copyDirectory(sourceDir, targetDir) {
  mkdirSync(targetDir, { recursive: true });
  for (const entry of readdirSync(sourceDir)) {
    const source = join(sourceDir, entry);
    const target = join(targetDir, entry);
    if (statSync(source).isDirectory()) {
      copyDirectory(source, target);
    } else {
      copyFileSync(source, target);
    }
  }
}

const staticFiles = [
  "index.html",
  "styles.css",
  "simulados.js",
  "app.js",
];

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
  },
  null,
  2,
)};
`;

writeFileSync(join(dist, "supabase-config.js"), config);

for (const directory of ["assets", "data"]) {
  if (existsSync(join(root, directory))) {
    copyDirectory(join(root, directory), join(dist, directory));
  }
}
