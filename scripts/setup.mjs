import { writeFileSync, existsSync, readFileSync, copyFileSync } from "fs";
import { randomBytes } from "crypto";
import { join } from "path";

const root = process.cwd();
const envExample = join(root, ".env.example");
const envLocal = join(root, ".env.local");

if (!existsSync(envLocal)) {
  if (existsSync(envExample)) {
    copyFileSync(envExample, envLocal);
  } else {
    writeFileSync(envLocal, "");
  }
}

let content = readFileSync(envLocal, "utf8");

if (!content.includes("ENCRYPTION_KEY=") || /ENCRYPTION_KEY=\s*$/m.test(content)) {
  const key = randomBytes(32).toString("hex");
  if (content.includes("ENCRYPTION_KEY=")) {
    content = content.replace(/ENCRYPTION_KEY=.*/g, `ENCRYPTION_KEY=${key}`);
  } else {
    content += `\nENCRYPTION_KEY=${key}\n`;
  }
}

writeFileSync(envLocal, content);
console.log("✓ .env.local listo (copiado desde .env.example si no existía)");
console.log("✓ ENCRYPTION_KEY generada");
console.log("→ Siguiente paso: npm run db:init");
