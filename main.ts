// Sunset Keys Cover Studio entry program (Node 22, standard library only).
// The app is the static files in this directory's app/ folder: app/index.html
// opens in a desktop browser and works offline, with no network request and
// no build step. This program hands the entry in: it copies app/ and
// screenshots/ from beside this file to /output and writes /output/dossier.json
// with the vendored make.fun library, so the judge can read the app.
//
// Serve the app locally with `node serve.ts`, then open http://localhost:8080.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-app.ts";

const here = fileURLToPath(new URL(".", import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Fail fast when the app entry point is missing, instead of handing in an
// empty app: a build with no index.html is a broken build, not an entry.
if (!existsSync(join(here, "app", "index.html"))) {
  throw new Error("app/index.html is missing, refusing to build the dossier");
}

mkdirSync(out, { recursive: true });
cpSync(join(here, "app"), join(out, "app"), { recursive: true });
mkdirSync(join(out, "screenshots"), { recursive: true });
if (existsSync(join(here, "screenshots"))) {
  cpSync(join(here, "screenshots"), join(out, "screenshots"), { recursive: true });
}

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the
// bytes; the others refuse an entry the scorer would refuse (more than 4
// screenshots or one over 256 KiB; more than 993 files in app/ or 48 MiB of app
// files, in all, or a path under app/ over 1000 bytes: app/ counts beside
// /output's own 1000-entry cap, its screenshots/ and dossier.json).
// Validation: refuse to write a dossier for an app that breaks the caps, so a
// bad local build fails loudly here instead of silently at the gate.
const dossierText = buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
  app_path_max_bytes: 1000,
});
writeFileSync(join(out, "dossier.json"), dossierText);
