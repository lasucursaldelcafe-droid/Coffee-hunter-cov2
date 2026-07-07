#!/usr/bin/env node
/**
 * Elimina tiendas de prueba y datos relacionados por slug.
 * Uso: SLUGS=slug-a,slug-b node scripts/delete-stores-by-slug.mjs
 */
import { createClient } from "@libsql/client";

const slugs = (process.env.SLUGS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (slugs.length === 0) {
  console.error("Define SLUGS=slug-a,slug-b");
  process.exit(1);
}

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url || !authToken) {
  console.error("Faltan TURSO_DATABASE_URL o TURSO_AUTH_TOKEN");
  process.exit(1);
}

const client = createClient({ url, authToken });

async function main() {
  const placeholders = slugs.map(() => "?").join(", ");
  const storesResult = await client.execute({
    sql: `SELECT id, slug, email FROM coffee_stores WHERE slug IN (${placeholders})`,
    args: slugs,
  });

  if (storesResult.rows.length === 0) {
    console.log("No se encontraron tiendas con esos slugs.");
    return;
  }

  const storeIds = storesResult.rows.map((r) => String(r.id));
  const idPlaceholders = storeIds.map(() => "?").join(", ");

  const relatedTables = ["store_products", "store_blog_posts", "store_pages", "retail_sales_reports"];

  for (const table of relatedTables) {
    await client.execute({
      sql: `DELETE FROM ${table} WHERE store_id IN (${idPlaceholders})`,
      args: storeIds,
    });
  }

  await client.execute({
    sql: `DELETE FROM coffee_stores WHERE id IN (${idPlaceholders})`,
    args: storeIds,
  });

  for (const row of storesResult.rows) {
    console.log(`✓ Eliminada: ${row.slug} (${row.email})`);
  }
}

main()
  .catch((err) => {
    console.error("Error:", err.message);
    process.exit(1);
  })
  .finally(() => client.close());
