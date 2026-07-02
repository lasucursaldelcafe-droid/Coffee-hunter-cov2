import { initDatabase } from "../src/lib/db";

async function main() {
  await initDatabase();
  console.log("✓ Base de datos Colombia Green Coffee inicializada");
  console.log("  Tablas: coffee_stores, logistics_quotes");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
