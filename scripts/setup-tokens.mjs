#!/usr/bin/env node
/**
 * Sync GitHub + Vercel + verify — after setup:all, run on each push workflow trigger
 * Usage: npm run setup:tokens
 */
import { loadProjectEnv, hasValue } from "./lib/env-loader.mjs";
import { commandExists, run, tryCapture } from "./lib/run.mjs";

const root = process.cwd();
const REPO = process.env.GITHUB_REPO || "lasucursaldelcafe-droid/Coffee-hunter-cov2";

console.log("→ setup:tokens — sync secrets only\n");

if (!commandExists("gh")) {
  console.error("❌ Instala gh CLI y ejecuta: gh auth login");
  process.exit(1);
}

run("node scripts/setup-github-secrets.mjs", { cwd: root });

const env = loadProjectEnv(root);
if (hasValue(env.VERCEL_TOKEN)) {
  console.log("\n→ Trigger GitHub Actions (optional push empty commit skipped)");
  console.log(`  Manual: https://github.com/${REPO}/actions/workflows/deploy-vercel.yml → Run workflow`);
}

console.log("\n✓ Tokens synced to GitHub Actions");
