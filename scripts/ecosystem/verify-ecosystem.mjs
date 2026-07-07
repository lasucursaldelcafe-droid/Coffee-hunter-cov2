#!/usr/bin/env node
/**
 * Índice de repos — NO ejecuta setup cruzado.
 * Cada plataforma se configura en su propio repositorio.
 *
 * Uso: npm run verify:ecosystem
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { tryCapture } from "../lib/run.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(readFileSync(join(__dirname, "manifest.json"), "utf8"));

const URL_CHECKS = [
  { name: "Coffee Hunter (Pages)", url: "https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/", platform: "colombia-green-coffee" },
  { name: "Empresario Virtual", url: "https://empresario-virtual.vercel.app/api/health", platform: "empresario-virtual" },
  { name: "Más Café", url: "https://w-eb-mas-cafe.vercel.app/", platform: "mas-cafe" },
  { name: "Programa Operativo (Pages)", url: "https://lasucursaldelcafe-droid.github.io/Programa-de-logistca/", platform: "programa-operativo", optional: true },
  { name: "Coffee Hunter (Vercel API)", url: "https://colombia-green-coffee.vercel.app/api/health", platform: "colombia-green-coffee", optional: true },
];

function checkUrl(name, url, optional) {
  const code = tryCapture(`curl -sI -o /dev/null -w "%{http_code}" "${url}" 2>/dev/null`)?.trim() || "ERR";
  const ok = code === "200";
  console.log(`  ${ok ? "✅" : optional ? "⏸" : "❌"} ${name}: ${code}`);
  return ok || optional;
}

console.log("Plataformas La Sucursal — verificación (repos independientes)\n");

console.log("--- URLs ---");
for (const c of URL_CHECKS) checkUrl(c.name, c.url, c.optional);

console.log("\n--- Setup por repo (ejecutar EN CADA CARPETA) ---");
for (const p of manifest.platforms) {
  const cmd = p.setupCommand || "(ver README del repo)";
  console.log(`  • ${p.name}`);
  console.log(`    cd .../${p.localDir}`);
  console.log(`    ${cmd}`);
}

console.log("\n  Docs: docs/00-REPOS-INDEPENDIENTES.md");
console.log("  Limpieza PC: docs/08-LIMPIEZA-PC.md");
