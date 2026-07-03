#!/usr/bin/env node
/**
 * Verifica URLs y estado de repos del ecosistema
 */
import { existsSync } from "fs";
import { join } from "path";
import {
  loadEcosystemEnv,
  filterProjects,
  parseArgs,
  getProjectPath,
  tryCapture,
  hasValue,
  REPO_ROOT,
} from "./lib/ecosystem.mjs";

const CHECKS = [
  {
    name: "Colombia Green Coffee (Pages)",
    url: "https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/",
    expect: "200",
  },
  {
    name: "Más Café (Vercel)",
    url: "https://w-eb-mas-cafe.vercel.app/",
    expect: "200",
  },
  {
    name: "Colombia Green Coffee (Vercel health)",
    url: "https://colombia-green-coffee.vercel.app/api/health",
    expect: "200",
    optional: true,
  },
];

function checkUrl(name, url, expectStatus, optional) {
  const head = tryCapture(`curl -sI -o /dev/null -w "%{http_code}" "${url}" 2>/dev/null`);
  const code = head?.trim() || "ERR";
  const ok = code === expectStatus;
  const icon = ok ? "✅" : optional ? "⏸" : "❌";
  console.log(`  ${icon} ${name}: ${code} — ${url}`);
  return ok || optional;
}

function checkLocalRepo(project, projectsRoot) {
  const dest = getProjectPath(projectsRoot, project);
  const exists = existsSync(dest);
  const hasPkg = exists && existsSync(join(dest, "package.json"));
  const hasEnv = exists && existsSync(join(dest, ".env.local"));
  const icon = exists ? (hasPkg ? "✅" : "📁") : "❌";
  console.log(
    `  ${icon} ${project.name}: ${exists ? dest : "no clonado"}${hasPkg ? " + npm" : ""}${hasEnv ? " + .env.local" : ""}`,
  );
  return exists;
}

async function main() {
  const args = parseArgs(process.argv);
  const { manifest, projectsRoot } = loadEcosystemEnv();
  const projects = filterProjects(manifest, args.project);

  console.log("Verificación ecosistema La Sucursal del Café\n");

  console.log("--- URLs públicas ---");
  let urlOk = true;
  for (const c of CHECKS) {
    if (!checkUrl(c.name, c.url, c.expect, c.optional)) {
      if (!c.optional) urlOk = false;
    }
  }

  console.log("\n--- Repos locales ---");
  let localOk = true;
  for (const p of projects) {
    if (!checkLocalRepo(p, projectsRoot)) localOk = false;
  }

  console.log("\n--- Resumen ---");
  if (urlOk && localOk) {
    console.log("  ✅ Ecosistema operativo");
  } else if (!localOk) {
    console.log("  ⏸ Ejecuta: npm run setup:ecosystem");
  } else {
    console.log("  ⏸ Algunas URLs pendientes — revisa Vercel secrets / deploy");
  }

  console.log("\n  Mapa completo: docs/00-ECOSISTEMA.md");
}

main();
