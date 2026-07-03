import { eq } from "drizzle-orm";
import { db, initDatabase } from "@/lib/db";
import { coffeeStores } from "@/lib/db/schema";
import type { StoreThemeInput } from "@/lib/validations/product";

export async function getStoreByAdminToken(token: string) {
  await initDatabase();
  const rows = await db
    .select()
    .from(coffeeStores)
    .where(eq(coffeeStores.adminToken, token))
    .limit(1);
  return rows[0] ?? null;
}

export async function getStoreForAdmin(slug: string, token: string) {
  await initDatabase();
  const rows = await db
    .select()
    .from(coffeeStores)
    .where(eq(coffeeStores.slug, slug))
    .limit(1);
  const store = rows[0];
  if (!store || store.adminToken !== token) return null;
  return store;
}

export async function findStoreByEmail(email: string) {
  await initDatabase();
  const rows = await db
    .select({
      slug: coffeeStores.slug,
      storeName: coffeeStores.storeName,
      adminToken: coffeeStores.adminToken,
    })
    .from(coffeeStores)
    .where(eq(coffeeStores.email, email.toLowerCase()))
    .limit(1);
  return rows[0] ?? null;
}

export async function updateStoreTheme(
  storeId: string,
  input: StoreThemeInput,
) {
  await initDatabase();
  const updates: Record<string, unknown> = {};
  if (input.themePrimaryColor) updates.themePrimaryColor = input.themePrimaryColor;
  if (input.themeAccentColor) updates.themeAccentColor = input.themeAccentColor;
  if (input.themeBackgroundColor) updates.themeBackgroundColor = input.themeBackgroundColor;
  if (input.themeHeroTitle !== undefined) updates.themeHeroTitle = input.themeHeroTitle;
  if (input.themeHeroSubtitle !== undefined) updates.themeHeroSubtitle = input.themeHeroSubtitle;
  if (input.themeButtonStyle) updates.themeButtonStyle = input.themeButtonStyle;
  if (input.description !== undefined) updates.description = input.description;
  if (input.storeName) updates.storeName = input.storeName;

  if (Object.keys(updates).length === 0) return;

  await db.update(coffeeStores).set(updates).where(eq(coffeeStores.id, storeId));
}

export function sanitizeStorePublic(store: typeof coffeeStores.$inferSelect) {
  const { adminToken: _adminToken, ...rest } = store;
  void _adminToken;
  return rest;
}
