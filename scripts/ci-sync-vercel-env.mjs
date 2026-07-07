#!/usr/bin/env node
/**
 * Sincroniza variables de entorno al proyecto Vercel (CI / dispatch).
 */
import { appendFileSync } from "fs";

const TOKEN = process.env.VERCEL_TOKEN;
const TEAM_ID = process.env.VERCEL_ORG_ID;
const PROJECT_ID = process.env.VERCEL_PROJECT_ID;

const ENV_KEYS = [
  "TURSO_DATABASE_URL",
  "TURSO_AUTH_TOKEN",
  "ENCRYPTION_KEY",
  "NEXT_PUBLIC_APP_URL",
  "MAIN_EMAIL",
  "RESEND_API_KEY",
  "EMAIL_FROM",
  "NEXT_PUBLIC_WHATSAPP",
  "NEXT_PUBLIC_INSTAGRAM",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "SHEETS_WEB_APP_URL",
  "NEXT_PUBLIC_SHEETS_WEB_APP_URL",
];

function hasValue(v) {
  return typeof v === "string" && v.trim().length > 0;
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

async function syncEnvVar(key, value) {
  const qs = `?teamId=${TEAM_ID}`;
  const existing = await vercelApi(`/v9/projects/${PROJECT_ID}/env${qs}`);
  const envs = existing.envs || [];
  const match = envs.find((e) => e.key === key && e.target?.includes("production"));

  const payload = {
    key,
    value,
    type: "encrypted",
    target: ["production", "preview", "development"],
  };

  if (match) {
    await vercelApi(`/v9/projects/${PROJECT_ID}/env/${match.id}${qs}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    console.log(`  actualizado: ${key}`);
  } else {
    await vercelApi(`/v10/projects/${PROJECT_ID}/env${qs}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    console.log(`  creado: ${key}`);
  }
}

async function main() {
  if (!TOKEN || !TEAM_ID || !PROJECT_ID) {
    throw new Error("Faltan VERCEL_TOKEN, VERCEL_ORG_ID o VERCEL_PROJECT_ID");
  }

  if (!hasValue(process.env.NEXT_PUBLIC_APP_URL)) {
    process.env.NEXT_PUBLIC_APP_URL = "https://colombia-green-coffee.vercel.app";
  }

  console.log(`→ Sincronizando env → proyecto ${PROJECT_ID}`);
  let count = 0;
  for (const key of ENV_KEYS) {
    const value = process.env[key];
    if (!hasValue(value)) continue;
    await syncEnvVar(key, value);
    count++;
  }
  console.log(`✓ ${count} variables sincronizadas en Vercel`);
}

main().catch((err) => {
  console.error("❌ ci-sync-vercel-env:", err.message);
  process.exit(1);
});
