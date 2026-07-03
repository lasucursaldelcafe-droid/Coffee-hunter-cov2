import { mkdirSync } from "fs";
import { join } from "path";
import Database from "better-sqlite3";

const dbPath = join(process.cwd(), "data", "programa-operativo.db");
mkdirSync(join(process.cwd(), "data"), { recursive: true });

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS logistics_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    cargo_description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at INTEGER NOT NULL
  );
`);

console.log("✓ db:init — logistics_requests");
db.close();
