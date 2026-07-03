import { execSync, spawnSync } from "child_process";

export function commandExists(cmd) {
  try {
    const check = process.platform === "win32" ? "where" : "which";
    execSync(`${check} ${cmd}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

export function run(cmd, opts = {}) {
  const { cwd = process.cwd(), env = process.env, silent = false } = opts;
  if (!silent) console.log(`$ ${cmd}`);
  execSync(cmd, {
    stdio: silent ? "pipe" : "inherit",
    cwd,
    env: { ...process.env, ...env },
    shell: true,
  });
}

export function runCapture(cmd, opts = {}) {
  const { cwd = process.cwd(), env = process.env } = opts;
  return execSync(cmd, {
    encoding: "utf8",
    cwd,
    env: { ...process.env, ...env },
    shell: true,
  }).trim();
}

export function runJson(cmd, opts = {}) {
  const out = runCapture(cmd, opts);
  return JSON.parse(out || "{}");
}

export function tryRun(cmd, opts = {}) {
  try {
    run(cmd, { ...opts, silent: true });
    return true;
  } catch {
    return false;
  }
}

export function tryCapture(cmd, opts = {}) {
  try {
    return runCapture(cmd, opts);
  } catch {
    return null;
  }
}
