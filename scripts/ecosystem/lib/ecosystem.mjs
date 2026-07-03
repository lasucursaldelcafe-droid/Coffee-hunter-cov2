#!/usr/bin/env node
/**
 * Utilidades compartidas para scripts del ecosistema La Sucursal del Café
 */
import { existsSync, readFileSync, cpSync, readdirSync, statSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { loadEnvFile, parseEnvContent, hasValue } from "../../lib/env-loader.mjs";
import { commandExists, run, tryCapture } from "../../lib/run.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ECOSYSTEM_DIR = join(__dirname, "..");
export const REPO_ROOT = join(ECOSYSTEM_DIR, "../..");

export function loadManifest() {
  const path = join(ECOSYSTEM_DIR, "manifest.json");
  return JSON.parse(readFileSync(path, "utf8"));
}

export function loadEcosystemEnv() {
  const manifest = loadManifest();
  const root = manifest.defaults.projectsRoot;

  const candidates = [
    join(root, ".env.ecosystem.local"),
    join(REPO_ROOT, ".env.ecosystem.local"),
    join(REPO_ROOT, ".env.local"),
  ];

  let merged = {};
  for (const p of candidates) {
    if (existsSync(p)) {
      merged = { ...merged, ...loadEnvFile(p) };
    }
  }
  merged = { ...merged, ...process.env };

  if (hasValue(merged.PROJECTS_ROOT)) {
    manifest.defaults.projectsRoot = merged.PROJECTS_ROOT;
  }

  return { manifest, env: merged, projectsRoot: manifest.defaults.projectsRoot };
}

export function getProjectPath(projectsRoot, project) {
  return join(projectsRoot, project.localDir || project.id);
}

export function cloneOrPull(project, projectsRoot) {
  const dest = getProjectPath(projectsRoot, project);
  const repo = project.repo;

  if (!repo) return { path: dest, action: "skip" };

  if (!existsSync(dest)) {
    console.log(`  ↓ Clonando ${repo} → ${dest}`);
    run(`git clone https://github.com/${repo}.git "${dest}"`, { cwd: projectsRoot });
    return { path: dest, action: "cloned" };
  }

  if (existsSync(join(dest, ".git"))) {
    console.log(`  ↻ Actualizando ${project.name}`);
    run("git fetch origin", { cwd: dest });
    run("git checkout main 2>/dev/null || git checkout master", { cwd: dest, shell: true });
    run("git pull --ff-only origin main 2>/dev/null || git pull --ff-only", { cwd: dest, shell: true });
    return { path: dest, action: "updated" };
  }

  return { path: dest, action: "exists-no-git" };
}

export function isRepoEmpty(dir) {
  if (!existsSync(dir)) return true;
  const entries = readdirSync(dir).filter((e) => e !== ".git");
  return entries.length === 0 || (entries.length === 1 && entries[0] === "README.md");
}

export function bootstrapFromTemplate(project, dest) {
  const templateRel = project.bootstrapTemplate;
  if (!templateRel) return false;

  const templateDir = join(ECOSYSTEM_DIR, templateRel);
  if (!existsSync(templateDir)) {
    console.warn(`  ⚠ Plantilla no encontrada: ${templateDir}`);
    return false;
  }

  console.log(`  📦 Bootstrap ${project.name} desde plantilla`);
  copyDirRecursive(templateDir, dest);
  return true;
}

function copyDirRecursive(src, dest) {
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      if (!existsSync(destPath)) {
        cpSync(srcPath, destPath, { recursive: true });
      } else {
        copyDirRecursive(srcPath, destPath);
      }
    } else if (!existsSync(destPath)) {
      cpSync(srcPath, destPath);
    }
  }
}

export function writeProjectEnv(dest, ecosystemEnv, project) {
  const mapping = project.envMapping || {};
  const updates = {
    MAIN_EMAIL: ecosystemEnv.MAIN_EMAIL || "lasucursaldelcafe@gmail.com",
    VERCEL_TOKEN: ecosystemEnv.VERCEL_TOKEN,
    TURSO_PLATFORM_TOKEN: ecosystemEnv.TURSO_PLATFORM_TOKEN,
    GOOGLE_CLIENT_ID: ecosystemEnv.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: ecosystemEnv.GOOGLE_CLIENT_SECRET,
    ENCRYPTION_KEY: ecosystemEnv.ENCRYPTION_KEY,
    VERCEL_ORG_ID: ecosystemEnv.VERCEL_ORG_ID,
    ...mapping,
  };

  const envLocalPath = join(dest, ".env.local");
  let content = existsSync(join(dest, ".env.example"))
    ? readFileSync(join(dest, ".env.example"), "utf8")
    : existsSync(envLocalPath)
      ? readFileSync(envLocalPath, "utf8")
      : "";

  for (const [key, value] of Object.entries(updates)) {
    if (!hasValue(value)) continue;
    const line = `${key}=${value}`;
    const re = new RegExp(`^${key}=.*$`, "m");
    if (re.test(content)) {
      content = content.replace(re, line);
    } else {
      content = content.trimEnd() + `\n${line}\n`;
    }
  }

  writeFileSync(envLocalPath, content);
  console.log(`  ✓ .env.local sincronizado en ${project.id}`);
}

export function pushGithubSecrets(repo, secrets, env) {
  if (!commandExists("gh")) {
    console.warn("  ⚠ gh no instalado — omitiendo secrets");
    return 0;
  }

  let count = 0;
  for (const name of secrets) {
    const value = env[name];
    if (!hasValue(value)) {
      console.log(`    ⊘ ${name} (vacío)`);
      continue;
    }
    const result = spawnSync(
      "gh",
      ["secret", "set", name, "--repo", repo, "--body", value],
      { stdio: "inherit", shell: process.platform === "win32" },
    );
    if (result.status === 0) {
      console.log(`    ↑ ${name}`);
      count++;
    }
  }
  return count;
}

export function runProjectSetup(project, dest, ecosystemEnv) {
  const setup = project.setup || {};
  if (!existsSync(join(dest, "package.json"))) {
    console.log(`  ○ Sin package.json — omitiendo npm`);
    return;
  }

  if (setup.install) {
    console.log(`  npm install…`);
    run(setup.install, { cwd: dest });
  }

  writeProjectEnv(dest, ecosystemEnv, project);

  if (setup.init) {
    console.log(`  → ${setup.init}`);
    try {
      run(setup.init, { cwd: dest });
    } catch (err) {
      console.warn(`  ⚠ init falló (${project.id}): ${err.message}`);
    }
  }

  if (setup.db) {
    console.log(`  → ${setup.db}`);
    try {
      run(setup.db, { cwd: dest });
    } catch {
      console.warn(`  ⚠ db falló — puede requerir credenciales adicionales`);
    }
  }
}

export function parseArgs(argv) {
  const args = { project: null, skipClone: false, skipSecrets: false, dryRun: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--project=")) args.project = a.split("=")[1];
    else if (a === "--project" && argv[i + 1]) args.project = argv[++i];
    else if (a === "--skip-clone") args.skipClone = true;
    else if (a === "--skip-secrets") args.skipSecrets = true;
    else if (a === "--dry-run") args.dryRun = true;
  }
  return args;
}

export function filterProjects(manifest, projectId) {
  const apps = manifest.projects.filter((p) => p.type === "app" && p.repo);
  if (!projectId) return apps;
  const found = apps.find((p) => p.id === projectId);
  if (!found) {
    throw new Error(
      `Proyecto no encontrado: ${projectId}\nDisponibles: ${apps.map((p) => p.id).join(", ")}`,
    );
  }
  return [found];
}

export function generateCursorSecretsTemplate(projects, ecosystemEnv, outPath) {
  const lines = [
    "# Cursor Cloud Agents — Secrets ecosistema La Sucursal del Café",
    "# https://cursor.com/dashboard → Cloud Agents → Secrets",
    "# NO subir a GitHub",
    "",
    "# === Compartidos (todos los repos) ===",
  ];

  const shared = [
    "VERCEL_TOKEN",
    "VERCEL_ORG_ID",
    "TURSO_PLATFORM_TOKEN",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "MAIN_EMAIL",
    "ENCRYPTION_KEY",
  ];

  for (const k of shared) {
    if (hasValue(ecosystemEnv[k])) lines.push(`${k}=${ecosystemEnv[k]}`);
  }

  lines.push("", "# === Por proyecto (pegar en secrets del agente correspondiente) ===");

  for (const p of projects) {
    if (!p.repo) continue;
    lines.push("", `# --- ${p.name} (${p.repo}) ---`);
    const mapping = p.envMapping || {};
    for (const [k, v] of Object.entries(mapping)) {
      lines.push(`${k}=${v}`);
    }
    if (p.urls?.production) lines.push(`NEXT_PUBLIC_APP_URL=${p.urls.production}`);
    if (p.urls?.vercel) lines.push(`# NEXT_PUBLIC_APP_URL=${p.urls.vercel}`);
  }

  writeFileSync(outPath, lines.join("\n") + "\n");
}

export { hasValue, commandExists, tryCapture };
