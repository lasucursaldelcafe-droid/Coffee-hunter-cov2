import { createClient, type Client } from "@libsql/client";
import Database from "better-sqlite3";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import fs from "fs";
import path from "path";
import * as schema from "./schema";
import { migrateLibsql, migrateSqlite } from "./migrate";

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
    admin_token TEXT NOT NULL UNIQUE,
    store_name TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    country TEXT NOT NULL,
    city TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    specialty TEXT NOT NULL,
    business_type TEXT NOT NULL DEFAULT 'tostador',
    retail_channel TEXT DEFAULT '',
    monthly_volume_kg INTEGER,
    commission_rate REAL NOT NULL DEFAULT 0.08,
    description TEXT DEFAULT '',
    theme_primary_color TEXT DEFAULT '#68190e',
    theme_accent_color TEXT DEFAULT '#2d5a27',
    theme_background_color TEXT DEFAULT '#f7e9e0',
    theme_hero_title TEXT DEFAULT '',
    theme_hero_subtitle TEXT DEFAULT '',
    theme_button_style TEXT DEFAULT 'pill',
    status TEXT NOT NULL DEFAULT 'active',
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS store_products (
    id TEXT PRIMARY KEY,
    store_id TEXT NOT NULL,
    name TEXT NOT NULL,
    origin TEXT NOT NULL DEFAULT 'Colombia',
    description TEXT DEFAULT '',
    price_per_kg REAL NOT NULL,
    score REAL,
    process TEXT DEFAULT '',
    variety TEXT DEFAULT '',
    type TEXT NOT NULL DEFAULT 'verde',
    profile TEXT DEFAULT '[]',
    altitude TEXT DEFAULT '',
    published INTEGER NOT NULL DEFAULT 1,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
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
  CREATE TABLE IF NOT EXISTS retail_sales_reports (
    id TEXT PRIMARY KEY,
    store_id TEXT,
    store_email TEXT NOT NULL,
    store_name TEXT NOT NULL,
    period_month TEXT NOT NULL,
    channel TEXT NOT NULL,
    product_name TEXT NOT NULL,
    units_sold INTEGER,
    kg_sold REAL NOT NULL,
    avg_price_usd REAL,
    city TEXT DEFAULT '',
    region TEXT DEFAULT '',
    notes TEXT DEFAULT '',
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS buyer_inquiries (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    buyer_name TEXT NOT NULL,
    company TEXT DEFAULT '',
    email TEXT NOT NULL,
    country TEXT NOT NULL,
    channel TEXT NOT NULL,
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
      await migrateLibsql(libsqlClient);
    }
    return;
  }

  getDb();
  if (sqliteRaw) {
    sqliteRaw.exec(INIT_SQL);
    migrateSqlite(sqliteRaw);
  }
}
