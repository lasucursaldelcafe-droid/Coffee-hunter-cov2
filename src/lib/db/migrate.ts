import type Database from "better-sqlite3";
import type { Client } from "@libsql/client";

const COLUMN_MIGRATIONS = [
  "ALTER TABLE coffee_stores ADD COLUMN city TEXT DEFAULT ''",
  "ALTER TABLE coffee_stores ADD COLUMN phone TEXT DEFAULT ''",
  "ALTER TABLE coffee_stores ADD COLUMN business_type TEXT NOT NULL DEFAULT 'tostador'",
  "ALTER TABLE coffee_stores ADD COLUMN retail_channel TEXT DEFAULT ''",
  "ALTER TABLE coffee_stores ADD COLUMN monthly_volume_kg INTEGER",
  "ALTER TABLE coffee_stores ADD COLUMN commission_rate REAL NOT NULL DEFAULT 0.08",
];

const TABLE_SQL = `
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

export function migrateSqlite(sqlite: Database.Database): void {
  for (const sql of COLUMN_MIGRATIONS) {
    try {
      sqlite.exec(sql);
    } catch {
      // Columna ya existe
    }
  }
  sqlite.exec(TABLE_SQL);
}

export async function migrateLibsql(client: Client): Promise<void> {
  for (const sql of COLUMN_MIGRATIONS) {
    try {
      await client.execute(sql);
    } catch {
      // Columna ya existe
    }
  }
  await client.executeMultiple(TABLE_SQL);
}
