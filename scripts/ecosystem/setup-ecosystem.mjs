#!/usr/bin/env node
/**
 * Orquestador ecosistema La Sucursal del Café
 * Clona/actualiza repos, bootstrap, setup y secrets por proyecto.
 *
 * Uso:
 *   npm run setup:ecosystem
 *   npm run setup:ecosystem -- --project=empresario-virtual
 *   npm run setup:ecosystem -- --dry-run
 */
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import {
  loadEcosystemEnv,
  filterProjects,
  cloneOrPull,
  isRepoEmpty,
  bootstrapFromTemplate,
  runProjectSetup,
  pushGithubSecrets,
  generateCursorSecretsTemplate,
  parseArgs,
  commandExists,
  REPO_ROOT,
} from "./lib/ecosystem.mjs";
import { run } from "../lib/run.mjs";

function banner(msg) {
  console.log("\n" + "=".repeat(64));
  console.log(msg);
  console.log("=".repeat(64));
}

function checkPrerequisites() {
  banner("Prerequisites");
  for (const cmd of ["node", "npm", "git"]) {
    if (!commandExists(cmd)) throw new Error(`Requerido: ${cmd}`);
    console.log(`  ✓ ${cmd}`);
  }
  console.log(`  ${commandExists("gh") ? "✓" : "○"} gh (opcional — secrets GitHub)`);
}

function ensureProjectsRoot(projectsRoot) {
  if (!existsSync(projectsRoot)) {
    mkdirSync(projectsRoot, { recursive: true });
    console.log(`  ✓ Creado: ${projectsRoot}`);
  }
}

async function main() {
  const args = parseArgs(process.argv);
  const { manifest, env, projectsRoot } = loadEcosystemEnv();
  const projects = filterProjects(manifest, args.project);

  console.log("Ecosistema La Sucursal del Café — setup:ecosystem");
  console.log(`Proyectos: ${projects.map((p) => p.id).join(", ")}`);
  console.log(`Raíz: ${projectsRoot}`);

  if (args.dryRun) {
    console.log("\n[DRY RUN] Sin cambios en disco");
    for (const p of projects) {
      console.log(`  • ${p.id} → ${join(projectsRoot, p.localDir)}`);
    }
    return;
  }

  checkPrerequisites();
  ensureProjectsRoot(projectsRoot);

  if (!env.VERCEL_TOKEN && !args.project) {
    console.warn(
      "\n⚠ VERCEL_TOKEN no encontrado en .env.ecosystem.local\n" +
        "  Copia .env.ecosystem.example → C:\\Users\\LENOVO\\Projects\\.env.ecosystem.local",
    );
  }

  for (const project of projects) {
    banner(project.name);

    let dest;
    if (!args.skipClone) {
      const result = cloneOrPull(project, projectsRoot);
      dest = result.path;

      if (isRepoEmpty(dest) && project.bootstrapTemplate) {
        bootstrapFromTemplate(project, dest);
        if (existsSync(join(dest, "package.json"))) {
          console.log("  → git add + commit bootstrap (local)");
          run('git add -A && git commit -m "chore: bootstrap desde ecosistema La Sucursal" || true', {
            cwd: dest,
            shell: true,
          });
        }
      }
    } else {
      dest = join(projectsRoot, project.localDir);
    }

    if (!existsSync(dest)) {
      console.warn(`  ⚠ Directorio no existe: ${dest}`);
      continue;
    }

    runProjectSetup(project, dest, env);

    if (!args.skipSecrets && project.setup?.githubSecrets?.length && project.repo) {
      console.log(`  → GitHub secrets (${project.repo})`);
      const projectEnv = { ...env, ...(project.envMapping || {}) };
      pushGithubSecrets(project.repo, project.setup.githubSecrets, projectEnv);
    }
  }

  banner("Cursor Cloud Agents");
  const cursorOut = join(REPO_ROOT, "cursor-secrets-ecosystem.local.txt");
  generateCursorSecretsTemplate(projects, env, cursorOut);
  console.log(`  ✓ ${cursorOut}`);
  console.log("  → Pegar en https://cursor.com/dashboard → Cloud Agents → Secrets");

  banner("Verificación");
  run(`node scripts/ecosystem/verify-ecosystem.mjs${args.project ? ` --project=${args.project}` : ""}`, {
    cwd: REPO_ROOT,
  });

  console.log("\n✅ setup:ecosystem completado");
  console.log("  Docs: docs/00-ECOSISTEMA.md");
}

main().catch((err) => {
  console.error("\n❌ setup:ecosystem falló:", err.message);
  process.exit(1);
});
