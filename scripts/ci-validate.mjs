#!/usr/bin/env node
/**
 * Validación CI local — mismo pipeline que GitHub Actions.
 */
import { execSync } from "child_process";

const steps = [
  ["npm ci", "Instalando dependencias"],
  ["npm run typecheck", "TypeScript"],
  ["npm run lint", "ESLint"],
  ["npm run db:init", "Base de datos"],
  ["npm run build", "Build producción"],
];

for (const [cmd, label] of steps) {
  process.stdout.write(`→ ${label}... `);
  try {
    execSync(cmd, { stdio: "pipe", cwd: process.cwd() });
    console.log("✓");
  } catch (err) {
    console.log("✗");
    if (err && typeof err === "object" && "stderr" in err) {
      const e = err;
      console.error(e.stderr?.toString() ?? e.stdout?.toString());
    }
    process.exit(1);
  }
}

console.log("\n✅ ci:validate completado");
