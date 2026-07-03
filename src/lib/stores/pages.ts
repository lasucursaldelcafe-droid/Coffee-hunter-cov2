import { eq, and, asc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db, initDatabase } from "@/lib/db";
import { storePages } from "@/lib/db/schema";
import type { StorePageInput } from "@/lib/validations/store-profile";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export async function listStorePages(storeId: string, publicOnly = false) {
  await initDatabase();
  const condition = publicOnly
    ? and(eq(storePages.storeId, storeId), eq(storePages.published, true))
    : eq(storePages.storeId, storeId);
  return db
    .select()
    .from(storePages)
    .where(condition)
    .orderBy(asc(storePages.sortOrder), asc(storePages.title));
}

export async function getStorePageBySlug(storeId: string, pageSlug: string) {
  await initDatabase();
  const rows = await db
    .select()
    .from(storePages)
    .where(and(eq(storePages.storeId, storeId), eq(storePages.slug, pageSlug)))
    .limit(1);
  return rows[0] ?? null;
}

export async function createStorePage(storeId: string, input: StorePageInput) {
  await initDatabase();
  const id = uuidv4();
  const slug = input.slug ?? `${slugify(input.title)}-${id.slice(0, 6)}`;
  const now = new Date();
  await db.insert(storePages).values({
    id,
    storeId,
    slug,
    navLabel: input.navLabel,
    title: input.title,
    content: input.content ?? "",
    published: input.published ?? false,
    sortOrder: input.sortOrder ?? 0,
    createdAt: now,
    updatedAt: now,
  });
  return { id, slug };
}

export async function updateStorePage(
  pageId: string,
  storeId: string,
  input: Partial<StorePageInput>,
) {
  await initDatabase();
  const updates: Record<string, unknown> = { updatedAt: new Date() };
  if (input.navLabel !== undefined) updates.navLabel = input.navLabel;
  if (input.title !== undefined) updates.title = input.title;
  if (input.slug !== undefined) updates.slug = input.slug;
  if (input.content !== undefined) updates.content = input.content;
  if (input.published !== undefined) updates.published = input.published;
  if (input.sortOrder !== undefined) updates.sortOrder = input.sortOrder;
  await db
    .update(storePages)
    .set(updates)
    .where(and(eq(storePages.id, pageId), eq(storePages.storeId, storeId)));
}

export async function deleteStorePage(pageId: string, storeId: string) {
  await initDatabase();
  await db
    .delete(storePages)
    .where(and(eq(storePages.id, pageId), eq(storePages.storeId, storeId)));
}

export function serializeStorePage(p: typeof storePages.$inferSelect) {
  return {
    id: p.id,
    slug: p.slug,
    navLabel: p.navLabel,
    title: p.title,
    content: p.content,
    published: p.published,
    sortOrder: p.sortOrder,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}
