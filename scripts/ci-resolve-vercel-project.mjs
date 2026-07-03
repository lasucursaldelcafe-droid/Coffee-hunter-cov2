#!/usr/bin/env node
/**
 * Resuelve (busca o crea) el proyecto Vercel correcto en CI.
 * Escribe VERCEL_PROJECT_ID en GITHUB_OUTPUT.
 */
import { appendFileSync } from "fs";

const TOKEN = process.env.VERCEL_TOKEN;
const TEAM_ID = process.env.VERCEL_ORG_ID;
const EXPECTED = process.env.EXPECTED_PROJECT || "colombia-green-coffee";
const OUTPUT = process.env.GITHUB_OUTPUT;

if (!TOKEN || !TEAM_ID) {
  console.error("Faltan VERCEL_TOKEN o VERCEL_ORG_ID");
  process.exit(1);
}

async function vercelApi(path, options = {}) {
  const res = await fetch(`https://api.vercel.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
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

function writeOutput(key, value) {
  if (OUTPUT) {
    appendFileSync(OUTPUT, `${key}=${value}\n`);
  }
  console.log(`${key}=${value}`);
}

async function findOrCreateProject() {
  const qs = `?teamId=${TEAM_ID}`;

  const currentId = process.env.VERCEL_PROJECT_ID;
  if (currentId) {
    try {
      const current = await vercelApi(`/v9/projects/${currentId}${qs}`);
      if (current.name === EXPECTED) {
        console.log(`Proyecto correcto: ${EXPECTED} (${currentId})`);
        writeOutput("project_id", currentId);
        return currentId;
      }
      console.log(
        `VERCEL_PROJECT_ID apunta a '${current.name}' — buscando ${EXPECTED}...`,
      );
    } catch {
      console.log("VERCEL_PROJECT_ID inválido — buscando proyecto correcto...");
    }
  }

  const list = await vercelApi(`/v9/projects${qs}`);
  const found = (list.projects || []).find((p) => p.name === EXPECTED);
  if (found) {
    console.log(`Proyecto encontrado: ${EXPECTED} (${found.id})`);
    writeOutput("project_id", found.id);
    return found.id;
  }

  console.log(`Creando proyecto Vercel: ${EXPECTED}`);
  const created = await vercelApi(`/v11/projects${qs}`, {
    method: "POST",
    body: JSON.stringify({
      name: EXPECTED,
      framework: "nextjs",
    }),
  });
  console.log(`Proyecto creado: ${EXPECTED} (${created.id})`);
  writeOutput("project_id", created.id);
  return created.id;
}

findOrCreateProject().catch((err) => {
  console.error("❌ resolve-vercel-project:", err.message);
  process.exit(1);
});
