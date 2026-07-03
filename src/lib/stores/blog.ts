import { eq, and, desc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db, initDatabase } from "@/lib/db";
import { storeBlogPosts } from "@/lib/db/schema";
import type { BlogPostInput } from "@/lib/validations/store-profile";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export async function listBlogPosts(storeId: string, publicOnly = false) {
  await initDatabase();
  const condition = publicOnly
    ? and(eq(storeBlogPosts.storeId, storeId), eq(storeBlogPosts.published, true))
    : eq(storeBlogPosts.storeId, storeId);
  return db
    .select()
    .from(storeBlogPosts)
    .where(condition)
    .orderBy(desc(storeBlogPosts.updatedAt));
}

export async function getBlogPostBySlug(storeId: string, postSlug: string) {
  await initDatabase();
  const rows = await db
    .select()
    .from(storeBlogPosts)
    .where(and(eq(storeBlogPosts.storeId, storeId), eq(storeBlogPosts.slug, postSlug)))
    .limit(1);
  return rows[0] ?? null;
}

export async function createBlogPost(storeId: string, input: BlogPostInput) {
  await initDatabase();
  const id = uuidv4();
  const slug = input.slug ?? `${slugify(input.title)}-${id.slice(0, 6)}`;
  const now = new Date();
  await db.insert(storeBlogPosts).values({
    id,
    storeId,
    slug,
    title: input.title,
    excerpt: input.excerpt ?? "",
    content: input.content ?? "",
    coverImageUrl: input.coverImageUrl ?? "",
    published: input.published ?? false,
    createdAt: now,
    updatedAt: now,
  });
  return { id, slug };
}

export async function updateBlogPost(
  postId: string,
  storeId: string,
  input: Partial<BlogPostInput>,
) {
  await initDatabase();
  const updates: Record<string, unknown> = { updatedAt: new Date() };
  if (input.title !== undefined) updates.title = input.title;
  if (input.slug !== undefined) updates.slug = input.slug;
  if (input.excerpt !== undefined) updates.excerpt = input.excerpt;
  if (input.content !== undefined) updates.content = input.content;
  if (input.coverImageUrl !== undefined) updates.coverImageUrl = input.coverImageUrl;
  if (input.published !== undefined) updates.published = input.published;
  await db
    .update(storeBlogPosts)
    .set(updates)
    .where(and(eq(storeBlogPosts.id, postId), eq(storeBlogPosts.storeId, storeId)));
}

export async function deleteBlogPost(postId: string, storeId: string) {
  await initDatabase();
  await db
    .delete(storeBlogPosts)
    .where(and(eq(storeBlogPosts.id, postId), eq(storeBlogPosts.storeId, storeId)));
}

export function serializeBlogPost(p: typeof storeBlogPosts.$inferSelect) {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    coverImageUrl: p.coverImageUrl,
    published: p.published,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}
