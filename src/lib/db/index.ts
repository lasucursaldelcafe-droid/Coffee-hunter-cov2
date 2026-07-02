import { createClient, type Client } from "@libsql/client";
import Database from "better-sqlite3";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import fs from "fs";
import path from "path";
import * as schema from "./schema";

type DbInstance = ReturnType<typeof drizzleSqlite<typeof schema>>;

let dbInstance: DbInstance | null = null;
let sqliteRaw: Database.Database | null = null;
let libsqlClient: Client | null = null;

function isTursoConfigured(): boolean {
  return Boolean(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN);
}

function getDbPath(): string {
  if (process.env.DATABASE_URL?.startsWith("file:")) {
    return process.env.DATABASE_URL.replace("file:", "");
  }
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  return path.join(process.cwd(), "data", "colombia-green-coffee.db");
}

function getDb(): DbInstance {
  if (dbInstance) return dbInstance;

  if (isTursoConfigured()) {
    libsqlClient = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    });
    dbInstance = drizzleLibsql(libsqlClient, { schema }) as unknown as DbInstance;
  } else {
    const dbPath = getDbPath();
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    sqliteRaw = new Database(dbPath);
    sqliteRaw.pragma("journal_mode = WAL");
    dbInstance = drizzleSqlite(sqliteRaw, { schema });
  }

  return dbInstance;
}

export const db = new Proxy({} as DbInstance, {
  get(_target, prop) {
    return Reflect.get(getDb(), prop);
  },
});

export { schema };

const INIT_SQL = `
  CREATE TABLE IF NOT EXISTS coffee_stores (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    store_name TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    country TEXT NOT NULL,
    specialty TEXT NOT NULL,
    plan TEXT NOT NULL DEFAULT 'Starter',
    description TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending',
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS logistics_quotes (
    id TEXT PRIMARY KEY,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    country TEXT NOT NULL,
    service_type TEXT NOT NULL,
    volume_kg INTEGER,
    message TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending',
    created_at INTEGER NOT NULL
  );
`;

export async function initDatabase(): Promise<void> {
  if (isTursoConfigured()) {
    getDb();
    if (libsqlClient) {
      await libsqlClient.executeMultiple(INIT_SQL);
    }
    return;
  }

  getDb();
  if (sqliteRaw) {
    sqliteRaw.exec(INIT_SQL);
  }
}
