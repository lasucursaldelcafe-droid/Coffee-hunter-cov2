#!/usr/bin/env node
/**
 * Provision Turso DB + auth token from .env.local
 * Requires: TURSO_PLATFORM_TOKEN (or turso CLI logged in)
 */
import { loadProjectEnv, upsertEnvLocal, hasValue } from "./lib/env-loader.mjs";
import { commandExists, runCapture, tryCapture } from "./lib/run.mjs";

const root = process.cwd();
const env = loadProjectEnv(root);

const DB_NAME = env.TURSO_DB_NAME || "colombia-green-coffee";
const PLATFORM_TOKEN = env.TURSO_PLATFORM_TOKEN;
const ORG = env.TURSO_ORG;

async function tursoApi(path, options = {}) {
  const res = await fetch(`https://api.turso.tech/v1${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${PLATFORM_TOKEN}`,
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
    const msg = body.error || body.message || text || res.statusText;
    throw new Error(`Turso API ${path}: ${msg}`);
  }
  return body;
}

async function getOrgSlug() {
  if (ORG) return ORG;
  const data = await tursoApi("/organizations");
  const orgs = Array.isArray(data) ? data : data.organizations || [];
  if (orgs.length === 0) throw new Error("No Turso organizations found for this token.");
  if (orgs.length === 1) return orgs[0].slug || orgs[0].name;
  console.log("Organizaciones Turso disponibles:");
  orgs.forEach((o, i) => console.log(`  [${i}] ${o.slug || o.name}`));
  throw new Error("Define TURSO_ORG en .env.local (slug de la organización).");
}

async function setupViaApi() {
  console.log("\n→ Turso (Platform API)...");
  const org = await getOrgSlug();

  let dbExists = true;
  try {
    await tursoApi(`/organizations/${org}/databases/${DB_NAME}`);
  } catch {
    dbExists = false;
  }

  if (!dbExists) {
    console.log(`  Creando base de datos: ${DB_NAME}`);
    await tursoApi(`/organizations/${org}/databases`, {
      method: "POST",
      body: JSON.stringify({ name: DB_NAME, group: "default" }),
    });
  } else {
    console.log(`  Base de datos ya existe: ${DB_NAME}`);
  }

  const dbInfo = await tursoApi(`/organizations/${org}/databases/${DB_NAME}`);
  const hostname = dbInfo.database?.Hostname || dbInfo.Hostname;
  const databaseUrl = hostname
    ? `libsql://${hostname}`
    : env.TURSO_DATABASE_URL;

  let authToken = env.TURSO_AUTH_TOKEN;
  if (!hasValue(authToken)) {
    console.log("  Creando token de base de datos...");
    const tokenRes = await tursoApi(
      `/organizations/${org}/databases/${DB_NAME}/auth/tokens`,
      {
        method: "POST",
        body: JSON.stringify({
          expiration: "never",
          authorization: "full-access",
        }),
      },
    );
    authToken = tokenRes.jwt || tokenRes.token;
  }

  upsertEnvLocal(root, {
    TURSO_ORG: org,
    TURSO_DB_NAME: DB_NAME,
    TURSO_DATABASE_URL: databaseUrl,
    TURSO_AUTH_TOKEN: authToken,
  });

  console.log("✓ Turso configurado en .env.local");
  return { databaseUrl, authToken, org };
}

function setupViaCli() {
  console.log("\n→ Turso (CLI)...");
  if (!commandExists("turso")) {
    throw new Error("Instala Turso CLI: curl -sSfL https://get.tur.so/install.sh | bash");
  }

  const list = tryCapture("turso db list --json");
  const dbs = list ? JSON.parse(list) : [];
  const exists = Array.isArray(dbs) && dbs.some((d) => d.name === DB_NAME);

  if (!exists) {
    console.log(`  Creando: turso db create ${DB_NAME}`);
    runCapture(`turso db create ${DB_NAME}`);
  } else {
    console.log(`  Base de datos ya existe: ${DB_NAME}`);
  }

  const databaseUrl = runCapture(`turso db show ${DB_NAME} --url`);
  let authToken = env.TURSO_AUTH_TOKEN;
  if (!hasValue(authToken)) {
    authToken = runCapture(`turso db tokens create ${DB_NAME}`);
  }

  upsertEnvLocal(root, {
    TURSO_DB_NAME: DB_NAME,
    TURSO_DATABASE_URL: databaseUrl,
    TURSO_AUTH_TOKEN: authToken,
  });

  console.log("✓ Turso configurado en .env.local");
  return { databaseUrl, authToken };
}

async function main() {
  if (hasValue(env.TURSO_DATABASE_URL) && hasValue(env.TURSO_AUTH_TOKEN)) {
    console.log("✓ Turso ya configurado en .env.local (omitido)");
    return env;
  }

  if (hasValue(PLATFORM_TOKEN)) {
    await setupViaApi();
  } else if (commandExists("turso")) {
    setupViaCli();
  } else {
    throw new Error(
      "Añade TURSO_PLATFORM_TOKEN a .env.local o instala Turso CLI (turso auth login).",
    );
  }

  return loadProjectEnv(root);
}

main().catch((err) => {
  console.error("\n❌ Turso:", err.message);
  process.exit(1);
});
