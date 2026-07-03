#!/usr/bin/env node
/**
 * Orquestador: setup completo Turso + Vercel + GitHub + deploy
 * Lee credenciales desde .env.local (nunca las imprime).
 *
 * Uso: npm run setup:all
 */
import { existsSync, writeFileSync } from "fs";
import { join } from "path";
import { loadProjectEnv, applyEnvToProcess, hasValue } from "./lib/env-loader.mjs";
import { commandExists, run, tryCapture } from "./lib/run.mjs";

const root = process.cwd();
const REPO = process.env.GITHUB_REPO || "lasucursaldelcafe-droid/Coffee-hunter-cov2";

function banner(msg) {
  console.log("\n" + "=".repeat(60));
  console.log(msg);
  console.log("=".repeat(60));
}

function checkPrerequisites() {
  banner("1/8 — Prerequisites");
  const required = ["node", "npm"];
  const optional = ["gh", "turso"];
  for (const cmd of required) {
    if (!commandExists(cmd)) throw new Error(`Requerido: ${cmd}`);
    console.log(`  ✓ ${cmd}`);
  }
  for (const cmd of optional) {
    console.log(`  ${commandExists(cmd) ? "✓" : "○"} ${cmd}${commandExists(cmd) ? "" : " (opcional)"}`);
  }
}

function checkEnvLocal() {
  banner("2/8 — .env.local");
  const envPath = join(root, ".env.local");
  if (!existsSync(envPath)) {
    console.log("  Creando .env.local desde .env.example...");
    run("npm run setup", { cwd: root });
  } else {
    console.log("  ✓ .env.local encontrado");
  }

  const env = loadProjectEnv(root);
  applyEnvToProcess(env);

  const need = ["VERCEL_TOKEN"];
  const needTurso = ["TURSO_PLATFORM_TOKEN"];
  const missing = need.filter((k) => !hasValue(env[k]));
  if (missing.length) {
    throw new Error(
      `Completa en .env.local: ${missing.join(", ")}\n` +
        "Opcional Turso: TURSO_PLATFORM_TOKEN o CLI turso auth login",
    );
  }
  if (!hasValue(env.TURSO_PLATFORM_TOKEN) && !commandExists("turso")) {
    console.warn("  ⚠ Sin TURSO_PLATFORM_TOKEN ni turso CLI — salta Turso si ya está configurado");
  }
  if (!hasValue(env.TURSO_PLATFORM_TOKEN)) {
    console.log("  ○ TURSO_PLATFORM_TOKEN no definido (usará CLI si existe)");
  } else {
    console.log("  ✓ TURSO_PLATFORM_TOKEN");
  }
  console.log("  ✓ VERCEL_TOKEN");
  return env;
}

async function runStep(script, label) {
  banner(label);
  run(`node scripts/${script}`, { cwd: root });
}

function initLocalDb() {
  banner("6/8 — Local DB + validation");
  run("npm run setup", { cwd: root });
  applyEnvToProcess(loadProjectEnv(root));
  run("npm run db:init", { cwd: root });
  run("npm run ci:validate", { cwd: root });
  console.log("  ✓ CI validate OK");
}

function deployProduction() {
  banner("7/8 — Deploy Vercel producción");
  applyEnvToProcess(loadProjectEnv(root));
  if (!hasValue(process.env.VERCEL_TOKEN)) {
    console.log("  ⊘ Sin VERCEL_TOKEN — omitido");
    return;
  }
  run("npm run deploy:auto", { cwd: root });
}

function writeCursorSecretsTemplate() {
  banner("8/8 — Cursor Cloud Agents template");
  const env = loadProjectEnv(root);
  const keys = [
    "VERCEL_TOKEN",
    "VERCEL_ORG_ID",
    "VERCEL_PROJECT_ID",
    "TURSO_DATABASE_URL",
    "TURSO_AUTH_TOKEN",
    "ENCRYPTION_KEY",
    "NEXT_PUBLIC_APP_URL",
    "MAIN_EMAIL",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "SHEETS_WEB_APP_URL",
    "NEXT_PUBLIC_SHEETS_WEB_APP_URL",
  ];

  const lines = [
    "# Cursor Cloud Agents → Secrets (https://cursor.com/dashboard → Cloud Agents → Secrets)",
    "# Copia cada NAME=VALUE manualmente en el dashboard (Runtime Secret para tokens).",
    "# NO subas este archivo a GitHub.",
    "",
  ];
  for (const k of keys) {
    if (hasValue(env[k])) lines.push(`${k}=${env[k]}`);
  }

  const outPath = join(root, "cursor-secrets.local.txt");
  writeFileSync(outPath, lines.join("\n") + "\n");
  console.log(`  ✓ Plantilla generada: cursor-secrets.local.txt`);
  console.log("  → Pégala en Cursor Dashboard → Cloud Agents → Secrets");
}

function verifyUrls() {
  console.log("\n--- Verificación ---");
  const pages = tryCapture('curl -sI "https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/" | head -1');
  console.log("  GitHub Pages:", pages || "(no verificado)");

  const env = loadProjectEnv(root);
  if (hasValue(env.NEXT_PUBLIC_APP_URL)) {
    const health = tryCapture(`curl -s "${env.NEXT_PUBLIC_APP_URL}/api/health" 2>/dev/null`);
    console.log("  Vercel health:", health ? health.slice(0, 80) : "(deploy pendiente o URL incorrecta)");
  }

  console.log("\n✅ setup:all completado");
  console.log("  Pages: https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/");
  console.log(`  Actions: https://github.com/${REPO}/actions`);
  if (hasValue(env.NEXT_PUBLIC_APP_URL)) {
    console.log(`  Vercel: ${env.NEXT_PUBLIC_APP_URL}`);
  }
}

async function main() {
  console.log("Colombia Green Coffee — setup:all");
  console.log("Repo:", REPO);

  checkPrerequisites();
  checkEnvLocal();

  await runStep("setup-turso.mjs", "3/8 — Turso database");
  await runStep("setup-vercel.mjs", "4/8 — Vercel project + env vars");
  await runStep("setup-github-secrets.mjs", "5/8 — GitHub Actions secrets");

  initLocalDb();
  deployProduction();
  writeCursorSecretsTemplate();
  verifyUrls();
}

main().catch((err) => {
  console.error("\n❌ setup:all falló:", err.message);
  process.exit(1);
});
