import { eq, and, desc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db, initDatabase } from "@/lib/db";
import { coffeeStores, storeProducts } from "@/lib/db/schema";
import { parseProfileJson } from "@/lib/marketplace/types";
import type { StoreProductInput } from "@/lib/validations/product";

export async function listProductsByStoreId(storeId: string, publicOnly = false) {
  await initDatabase();
  if (publicOnly) {
    return db
      .select()
      .from(storeProducts)
      .where(and(eq(storeProducts.storeId, storeId), eq(storeProducts.published, true)))
      .orderBy(desc(storeProducts.updatedAt));
  }
  return db
    .select()
    .from(storeProducts)
    .where(eq(storeProducts.storeId, storeId))
    .orderBy(desc(storeProducts.updatedAt));
}

export async function listAllPublishedProducts() {
  await initDatabase();
  const rows = await db
    .select({
      product: storeProducts,
      store: coffeeStores,
    })
    .from(storeProducts)
    .innerJoin(coffeeStores, eq(storeProducts.storeId, coffeeStores.id))
    .where(and(eq(storeProducts.published, true), eq(coffeeStores.status, "active")))
    .orderBy(desc(storeProducts.updatedAt));

  return rows.map(({ product, store }) => ({
    product,
    store,
  }));
}

export async function getStoreProduct(productId: string, storeId: string) {
  await initDatabase();
  const rows = await db
    .select()
    .from(storeProducts)
    .where(and(eq(storeProducts.id, productId), eq(storeProducts.storeId, storeId)))
    .limit(1);
  return rows[0] ?? null;
}

export async function createStoreProduct(storeId: string, input: StoreProductInput) {
  await initDatabase();
  const id = uuidv4();
  const now = new Date();
  await db.insert(storeProducts).values({
    id,
    storeId,
    name: input.name,
    origin: input.origin,
    description: input.description ?? "",
    pricePerKg: input.pricePerKg,
    score: input.score ?? null,
    process: input.process ?? "",
    variety: input.variety ?? "",
    type: input.type,
    profile: JSON.stringify(input.profile ?? []),
    altitude: input.altitude ?? "",
    published: input.published ?? true,
    createdAt: now,
    updatedAt: now,
  });
  return id;
}

export async function updateStoreProduct(
  productId: string,
  storeId: string,
  input: Partial<StoreProductInput>,
) {
  await initDatabase();
  const existing = await getStoreProduct(productId, storeId);
  if (!existing) throw new Error("NOT_FOUND");

  const updates: Record<string, unknown> = { updatedAt: new Date() };
  if (input.name !== undefined) updates.name = input.name;
  if (input.origin !== undefined) updates.origin = input.origin;
  if (input.description !== undefined) updates.description = input.description;
  if (input.pricePerKg !== undefined) updates.pricePerKg = input.pricePerKg;
  if (input.score !== undefined) updates.score = input.score;
  if (input.process !== undefined) updates.process = input.process;
  if (input.variety !== undefined) updates.variety = input.variety;
  if (input.type !== undefined) updates.type = input.type;
  if (input.profile !== undefined) updates.profile = JSON.stringify(input.profile);
  if (input.altitude !== undefined) updates.altitude = input.altitude;
  if (input.published !== undefined) updates.published = input.published;

  await db
    .update(storeProducts)
    .set(updates)
    .where(and(eq(storeProducts.id, productId), eq(storeProducts.storeId, storeId)));
}

export async function deleteStoreProduct(productId: string, storeId: string) {
  await initDatabase();
  await db
    .delete(storeProducts)
    .where(and(eq(storeProducts.id, productId), eq(storeProducts.storeId, storeId)));
}

export function serializeStoreProduct(p: typeof storeProducts.$inferSelect) {
  return {
    id: p.id,
    storeId: p.storeId,
    name: p.name,
    origin: p.origin,
    description: p.description,
    pricePerKg: p.pricePerKg,
    score: p.score,
    process: p.process,
    variety: p.variety,
    type: p.type as "verde" | "tostado" | "maquila",
    profile: parseProfileJson(p.profile),
    altitude: p.altitude,
    published: p.published,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}
