import { v4 as uuidv4 } from "uuid";
import type Database from "better-sqlite3";
import type { Client } from "@libsql/client";

const COLUMN_MIGRATIONS = [
  "ALTER TABLE coffee_stores ADD COLUMN city TEXT DEFAULT ''",
  "ALTER TABLE coffee_stores ADD COLUMN phone TEXT DEFAULT ''",
  "ALTER TABLE coffee_stores ADD COLUMN business_type TEXT NOT NULL DEFAULT 'tostador'",
  "ALTER TABLE coffee_stores ADD COLUMN retail_channel TEXT DEFAULT ''",
  "ALTER TABLE coffee_stores ADD COLUMN monthly_volume_kg INTEGER",
  "ALTER TABLE coffee_stores ADD COLUMN commission_rate REAL NOT NULL DEFAULT 0.08",
  "ALTER TABLE coffee_stores ADD COLUMN admin_token TEXT",
  "ALTER TABLE coffee_stores ADD COLUMN theme_primary_color TEXT DEFAULT '#68190e'",
  "ALTER TABLE coffee_stores ADD COLUMN theme_accent_color TEXT DEFAULT '#2d5a27'",
  "ALTER TABLE coffee_stores ADD COLUMN theme_background_color TEXT DEFAULT '#f7e9e0'",
  "ALTER TABLE coffee_stores ADD COLUMN theme_hero_title TEXT DEFAULT ''",
  "ALTER TABLE coffee_stores ADD COLUMN theme_hero_subtitle TEXT DEFAULT ''",
  "ALTER TABLE coffee_stores ADD COLUMN theme_button_style TEXT DEFAULT 'pill'",
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
`;

function backfillAdminTokensSqlite(sqlite: Database.Database): void {
  const rows = sqlite
    .prepare("SELECT id FROM coffee_stores WHERE admin_token IS NULL OR admin_token = ''")
    .all() as { id: string }[];

  const update = sqlite.prepare("UPDATE coffee_stores SET admin_token = ? WHERE id = ?");
  for (const row of rows) {
    update.run(uuidv4(), row.id);
  }
}

async function backfillAdminTokensLibsql(client: Client): Promise<void> {
  const result = await client.execute(
    "SELECT id FROM coffee_stores WHERE admin_token IS NULL OR admin_token = ''",
  );
  for (const row of result.rows) {
    const id = row.id as string;
    await client.execute({
      sql: "UPDATE coffee_stores SET admin_token = ? WHERE id = ?",
      args: [uuidv4(), id],
    });
  }
}

export function migrateSqlite(sqlite: Database.Database): void {
  for (const sql of COLUMN_MIGRATIONS) {
    try {
      sqlite.exec(sql);
    } catch {
      // Columna ya existe
    }
  }
  sqlite.exec(TABLE_SQL);
  backfillAdminTokensSqlite(sqlite);
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
  await backfillAdminTokensLibsql(client);
}
