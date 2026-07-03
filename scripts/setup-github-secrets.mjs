#!/usr/bin/env node
/**
 * Push secrets from .env.local to GitHub Actions (gh cli)
 */
import { spawnSync } from "child_process";
import { loadProjectEnv, hasValue } from "./lib/env-loader.mjs";
import { commandExists, tryCapture } from "./lib/run.mjs";

const root = process.cwd();
const env = loadProjectEnv(root);

const REPO = env.GITHUB_REPO || "lasucursaldelcafe-droid/Coffee-hunter-cov2";

const SECRETS = [
  "VERCEL_TOKEN",
  "VERCEL_ORG_ID",
  "VERCEL_PROJECT_ID",
  "TURSO_DATABASE_URL",
  "TURSO_AUTH_TOKEN",
  "ENCRYPTION_KEY",
  "NEXT_PUBLIC_APP_URL",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "SHEETS_WEB_APP_URL",
  "NEXT_PUBLIC_SHEETS_WEB_APP_URL",
];

function setSecret(name, value) {
  const result = spawnSync(
    "gh",
    ["secret", "set", name, "--repo", REPO, "--body", value],
    { cwd: root, stdio: "inherit", shell: process.platform === "win32" },
  );
  if (result.status !== 0) {
    throw new Error(`gh secret set ${name} failed (exit ${result.status})`);
  }
}

function main() {
  if (!commandExists("gh")) {
    throw new Error(
      "Instala GitHub CLI: https://cli.github.com/ — luego: gh auth login",
    );
  }

  const auth = tryCapture("gh auth status 2>&1");
  if (!auth || auth.includes("not logged in")) {
    throw new Error("Ejecuta: gh auth login (cuenta lasucursaldelcafe-droid)");
  }

  console.log(`\n→ GitHub Secrets → ${REPO}`);

  let count = 0;
  for (const name of SECRETS) {
    const value = env[name];
    if (!hasValue(value)) {
      console.log(`  ⊘ Omitido (vacío): ${name}`);
      continue;
    }
    console.log(`  ↑ ${name}`);
    setSecret(name, value);
    count++;
  }

  console.log(`\n✓ ${count} secrets subidos a GitHub Actions`);
  console.log(`  Ver: https://github.com/${REPO}/settings/secrets/actions`);
}

main();
