#!/usr/bin/env node
/**
 * Build estático para GitHub Pages.
 * Desactiva API routes (no compatibles con export).
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const root = process.cwd();
const apiDir = path.join(root, "src/app/api");
const apiBackup = path.join(root, "src/app/_api_disabled");
const nextDir = path.join(root, ".next");
let moved = false;

function run(cmd, env = {}) {
  console.log(`$ ${cmd}`);
  execSync(cmd, {
    stdio: "inherit",
    cwd: root,
    env: { ...process.env, GITHUB_PAGES: "true", ...env },
  });
}

try {
  run("npm run lint");

  if (fs.existsSync(apiDir)) {
    fs.renameSync(apiDir, apiBackup);
    moved = true;
    console.log("→ API routes desactivadas para export estático");
  }

  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true });
  }

  run("npx next build", {
    GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY ?? "lasucursaldelcafe-droid/Coffee-hunter-cov2",
  });

  const outDir = path.join(root, "out");
  if (!fs.existsSync(outDir)) {
    throw new Error("No se generó la carpeta out/");
  }

  console.log("\n✅ Build GitHub Pages listo en ./out");

  const nojekyll = path.join(outDir, ".nojekyll");
  fs.writeFileSync(nojekyll, "");
} finally {
  if (moved && fs.existsSync(apiBackup)) {
    fs.renameSync(apiBackup, apiDir);
    console.log("→ API routes restauradas");
  }
}
