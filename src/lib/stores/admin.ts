import { eq } from "drizzle-orm";
import { db, initDatabase } from "@/lib/db";
import { coffeeStores } from "@/lib/db/schema";
import type { StoreThemeInput } from "@/lib/validations/product";
import type { StoreProfileInput } from "@/lib/validations/store-profile";
import {
  parsePurchaseLocations,
  parseSocialLinks,
  serializePurchaseLocations,
  serializeSocialLinks,
} from "@/lib/stores/social";
import { getSecurityStatus } from "@/lib/stores/security";

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
    .select()
    .from(coffeeStores)
    .where(eq(coffeeStores.email, email.toLowerCase()))
    .limit(1);
  return rows[0] ?? null;
}

export async function updateStoreTheme(storeId: string, input: StoreThemeInput) {
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

export async function updateStoreProfile(storeId: string, input: StoreProfileInput) {
  await initDatabase();
  const updates: Record<string, unknown> = {};
  if (input.storeName) updates.storeName = input.storeName;
  if (input.ownerName) updates.ownerName = input.ownerName;
  if (input.phone !== undefined) updates.phone = input.phone;
  if (input.country) updates.country = input.country;
  if (input.city !== undefined) updates.city = input.city;
  if (input.specialty) updates.specialty = input.specialty;
  if (input.description !== undefined) updates.description = input.description;
  if (input.logoUrl !== undefined) updates.logoUrl = input.logoUrl;
  if (input.coverImageUrl !== undefined) updates.coverImageUrl = input.coverImageUrl;
  if (input.physicalAddress !== undefined) updates.physicalAddress = input.physicalAddress;
  if (input.physicalCity !== undefined) updates.physicalCity = input.physicalCity;
  if (input.physicalCountry !== undefined) updates.physicalCountry = input.physicalCountry;
  if (input.purchaseLocations !== undefined) {
    updates.purchaseLocations = serializePurchaseLocations(input.purchaseLocations);
  }
  if (input.socialLinks !== undefined) {
    updates.socialLinks = serializeSocialLinks(input.socialLinks);
  }
  if (Object.keys(updates).length === 0) return;
  await db.update(coffeeStores).set(updates).where(eq(coffeeStores.id, storeId));
}

export function sanitizeStorePublic(store: typeof coffeeStores.$inferSelect) {
  const {
    adminToken: _a,
    passwordHash: _p,
    emailVerificationToken: _e,
    ...rest
  } = store;
  void _a;
  void _p;
  void _e;
  return {
    ...rest,
    socialLinks: parseSocialLinks(store.socialLinks),
    purchaseLocations: parsePurchaseLocations(store.purchaseLocations),
  };
}

export function sanitizeStoreAdmin(store: typeof coffeeStores.$inferSelect) {
  const publicData = sanitizeStorePublic(store);
  return {
    ...publicData,
    email: store.email,
    security: getSecurityStatus(store),
  };
}
