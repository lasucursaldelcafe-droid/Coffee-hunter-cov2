import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

/**
 * Parse .env-style file into a plain object (no expansion).
 */
export function parseEnvContent(content) {
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

export function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return {};
  return parseEnvContent(readFileSync(filePath, "utf8"));
}

export function loadProjectEnv(root = process.cwd()) {
  const local = loadEnvFile(join(root, ".env.local"));
  const example = loadEnvFile(join(root, ".env.example"));
  return { ...example, ...local, ...process.env };
}

export function applyEnvToProcess(env) {
  for (const [key, value] of Object.entries(env)) {
    if (value !== undefined && value !== "") {
      process.env[key] = value;
    }
  }
}

export function upsertEnvLocal(root, updates) {
  const envLocalPath = join(root, ".env.local");
  let content = existsSync(envLocalPath)
    ? readFileSync(envLocalPath, "utf8")
    : existsSync(join(root, ".env.example"))
      ? readFileSync(join(root, ".env.example"), "utf8")
      : "";

  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined || value === null || value === "") continue;
    const line = `${key}=${value}`;
    const re = new RegExp(`^${key}=.*$`, "m");
    if (re.test(content)) {
      content = content.replace(re, line);
    } else {
      content = content.trimEnd() + `\n${line}\n`;
    }
  }

  writeFileSync(envLocalPath, content);
  return envLocalPath;
}

export function requireKeys(env, keys, label = "variable") {
  const missing = keys.filter((k) => !env[k] || String(env[k]).trim() === "");
  if (missing.length > 0) {
    throw new Error(
      `Faltan ${label}(s) en .env.local: ${missing.join(", ")}\n` +
        "Completa .env.local y vuelve a ejecutar setup:all.",
    );
  }
}

export function hasValue(v) {
  return v !== undefined && v !== null && String(v).trim() !== "";
}
