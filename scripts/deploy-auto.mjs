#!/usr/bin/env node
/**
 * Deploy automático a Vercel (requiere VERCEL_TOKEN en entorno).
 * Patrón: empresario-virtual + WEb-mas-cafe
 */
import { execSync } from "child_process";

function run(cmd, opts = {}) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: "inherit", ...opts });
}

const required = ["VERCEL_TOKEN"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length > 0) {
  console.error(`\n❌ Faltan variables: ${missing.join(", ")}`);
  console.error("\nConfigura en GitHub Secrets o .env.local:");
  console.error("  VERCEL_TOKEN     → https://vercel.com/account/tokens");
  console.error("  VERCEL_ORG_ID    → Vercel → Settings → General");
  console.error("  VERCEL_PROJECT_ID → Proyecto → Settings → General");
  console.error("\nO conecta el repo en https://vercel.com/new (importa Coffee-hunter-cov2)");
  process.exit(1);
}

console.log("→ Validando build...");
run("npm run ci:validate");

console.log("\n→ Desplegando a Vercel (producción)...");
try {
  run("npx vercel deploy --prod --yes --token " + process.env.VERCEL_TOKEN);
} catch {
  console.log("\n→ Intentando con vercel CLI global...");
  run("vercel deploy --prod --yes");
}

console.log("\n✅ Deploy completado");
