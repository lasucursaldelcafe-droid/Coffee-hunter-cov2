#!/usr/bin/env node
/**
 * Link Vercel project, sync env vars, save IDs to .env.local
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { loadProjectEnv, upsertEnvLocal, hasValue } from "./lib/env-loader.mjs";
import { commandExists, run, tryRun } from "./lib/run.mjs";

const root = process.cwd();
let env = loadProjectEnv(root);

const PROJECT_NAME = env.VERCEL_PROJECT_NAME || "colombia-green-coffee";
const VERCEL_TOKEN = env.VERCEL_TOKEN;

function readVercelProjectJson() {
  const p = join(root, ".vercel", "project.json");
  if (!existsSync(p)) return null;
  return JSON.parse(readFileSync(p, "utf8"));
}

async function vercelApi(path, options = {}) {
  const res = await fetch(`https://api.vercel.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  let body = {};
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }
  if (!res.ok) {
    throw new Error(body.error?.message || body.message || text || res.statusText);
  }
  return body;
}

async function getTeamId() {
  if (hasValue(env.VERCEL_ORG_ID)) return env.VERCEL_ORG_ID;
  const teams = await vercelApi("/v2/teams");
  const list = teams.teams || [];
  if (list.length === 0) {
    const user = await vercelApi("/v2/user");
    return user.user?.id || user.id;
  }
  if (list.length === 1) return list[0].id;
  throw new Error("Define VERCEL_ORG_ID en .env.local (Team ID de Vercel).");
}

async function findOrCreateProject(teamId) {
  const qs = teamId ? `?teamId=${teamId}` : "";
  const projects = await vercelApi(`/v9/projects${qs}`);
  const found = (projects.projects || []).find((p) => p.name === PROJECT_NAME);
  if (found) return found;

  console.log(`  Creando proyecto Vercel: ${PROJECT_NAME}`);
  return vercelApi(`/v11/projects${qs}`, {
    method: "POST",
    body: JSON.stringify({
      name: PROJECT_NAME,
      framework: "nextjs",
    }),
  });
}

async function syncEnvVar(projectId, teamId, key, value) {
  if (!hasValue(value)) return;
  const qs = teamId ? `?teamId=${teamId}` : "";
  const existing = await vercelApi(`/v9/projects/${projectId}/env${qs}`);
  const envs = existing.envs || [];
  const match = envs.find((e) => e.key === key && e.target?.includes("production"));

  if (match) {
    await vercelApi(`/v9/projects/${projectId}/env/${match.id}${qs}`, {
      method: "PATCH",
      body: JSON.stringify({
        value,
        target: ["production", "preview", "development"],
      }),
    });
    console.log(`  Vercel env actualizado: ${key}`);
  } else {
    await vercelApi(`/v10/projects/${projectId}/env${qs}`, {
      method: "POST",
      body: JSON.stringify({
        key,
        value,
        type: "encrypted",
        target: ["production", "preview", "development"],
      }),
    });
    console.log(`  Vercel env creado: ${key}`);
  }
}

async function setupViaApi() {
  console.log("\n→ Vercel (API)...");
  const teamId = await getTeamId();
  const project = await findOrCreateProject(teamId);
  const projectId = project.id;

  env = loadProjectEnv(root);
  const envKeys = [
    "TURSO_DATABASE_URL",
    "TURSO_AUTH_TOKEN",
    "ENCRYPTION_KEY",
    "MAIN_EMAIL",
    "NEXT_PUBLIC_WHATSAPP",
    "NEXT_PUBLIC_INSTAGRAM",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "SHEETS_WEB_APP_URL",
    "NEXT_PUBLIC_SHEETS_WEB_APP_URL",
    "DATABASE_URL",
  ];

  for (const key of envKeys) {
    await syncEnvVar(projectId, teamId, key, env[key]);
  }

  let productionUrl = env.NEXT_PUBLIC_APP_URL;
  if (!hasValue(productionUrl)) {
    productionUrl = `https://${PROJECT_NAME}.vercel.app`;
    await syncEnvVar(projectId, teamId, "NEXT_PUBLIC_APP_URL", productionUrl);
  }

  mkdirSync(join(root, ".vercel"), { recursive: true });
  writeFileSync(
    join(root, ".vercel", "project.json"),
    JSON.stringify({ projectId, orgId: teamId, projectName: PROJECT_NAME }, null, 2),
  );

  upsertEnvLocal(root, {
    VERCEL_ORG_ID: teamId,
    VERCEL_PROJECT_ID: projectId,
    NEXT_PUBLIC_APP_URL: productionUrl,
  });

  console.log("✓ Vercel project:", projectId);
  console.log("✓ URL producción:", productionUrl);
  return { teamId, projectId, productionUrl };
}

async function setupViaCli() {
  console.log("\n→ Vercel (CLI fallback)...");
  const tokenArg = `--token ${VERCEL_TOKEN}`;

  if (!existsSync(join(root, ".vercel", "project.json"))) {
    tryRun(`npx vercel link --yes ${tokenArg} --project ${PROJECT_NAME}`, { cwd: root });
  }

  const pj = readVercelProjectJson();
  if (!pj) throw new Error("vercel link falló — revisa VERCEL_TOKEN");

  env = loadProjectEnv(root);
  upsertEnvLocal(root, {
    VERCEL_ORG_ID: pj.orgId,
    VERCEL_PROJECT_ID: pj.projectId,
  });

  console.log("→ Deploy producción (CLI)...");
  run(`npx vercel deploy --prod --yes ${tokenArg}`, { cwd: root });
  return pj;
}

async function main() {
  if (!hasValue(VERCEL_TOKEN)) {
    throw new Error("Añade VERCEL_TOKEN a .env.local (https://vercel.com/account/tokens)");
  }

  try {
    await setupViaApi();
  } catch (apiErr) {
    console.warn("  Vercel API:", apiErr.message);
    if (commandExists("npx")) {
      await setupViaCli();
    } else {
      throw apiErr;
    }
  }

  console.log("\n✓ Vercel configurado");
}

main().catch((err) => {
  console.error("\n❌ Vercel:", err.message);
  process.exit(1);
});
