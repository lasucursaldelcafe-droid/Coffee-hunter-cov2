import { eq, inArray } from "drizzle-orm";
import { db, initDatabase } from "@/lib/db";
import {
  coffeeStores,
  retailSalesReports,
  storeBlogPosts,
  storePages,
  storeProducts,
} from "@/lib/db/schema";

export async function deleteCoffeeStoreById(storeId: string): Promise<boolean> {
  await initDatabase();

  const rows = await db
    .select({ id: coffeeStores.id })
    .from(coffeeStores)
    .where(eq(coffeeStores.id, storeId))
    .limit(1);

  if (rows.length === 0) return false;

  await db.delete(storeProducts).where(eq(storeProducts.storeId, storeId));
  await db.delete(storeBlogPosts).where(eq(storeBlogPosts.storeId, storeId));
  await db.delete(storePages).where(eq(storePages.storeId, storeId));
  await db.delete(retailSalesReports).where(eq(retailSalesReports.storeId, storeId));
  await db.delete(coffeeStores).where(eq(coffeeStores.id, storeId));

  return true;
}

export async function deleteCoffeeStoresBySlugs(slugs: string[]): Promise<string[]> {
  await initDatabase();

  const stores = await db
    .select({ id: coffeeStores.id, slug: coffeeStores.slug })
    .from(coffeeStores)
    .where(inArray(coffeeStores.slug, slugs));

  const deleted: string[] = [];
  for (const store of stores) {
    const ok = await deleteCoffeeStoreById(store.id);
    if (ok) deleted.push(store.slug);
  }
  return deleted;
}
