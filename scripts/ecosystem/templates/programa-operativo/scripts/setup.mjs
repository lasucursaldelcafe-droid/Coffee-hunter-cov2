#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { randomBytes } from "crypto";

const root = process.cwd();
const envPath = join(root, ".env.local");

if (!existsSync(envPath)) {
  const example = join(root, ".env.example");
  writeFileSync(envPath, existsSync(example) ? readFileSync(example, "utf8") : "");
}

let content = readFileSync(envPath, "utf8");
if (!/^ENCRYPTION_KEY=/m.test(content) || /ENCRYPTION_KEY=\s*$/m.test(content)) {
  const key = randomBytes(32).toString("hex");
  if (/^ENCRYPTION_KEY=/m.test(content)) {
    content = content.replace(/^ENCRYPTION_KEY=.*$/m, `ENCRYPTION_KEY=${key}`);
  } else {
    content += `\nENCRYPTION_KEY=${key}\n`;
  }
  writeFileSync(envPath, content);
}

mkdirSync(join(root, "data"), { recursive: true });
console.log("✓ setup — .env.local + data/");
