import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getStoreForAdmin } from "@/lib/stores/admin";
import { getStoreTokenFromRequest } from "@/lib/stores/session";
import { deleteBlogPost, serializeBlogPost, updateBlogPost } from "@/lib/stores/blog";
import { blogPostSchema } from "@/lib/validations/store-profile";
import { eq, and } from "drizzle-orm";
import { db } from "@/lib/db";
import { storeBlogPosts } from "@/lib/db/schema";

interface RouteContext {
  params: Promise<{ slug: string; id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { slug, id } = await context.params;
    const token = getStoreTokenFromRequest(request);
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    const store = await getStoreForAdmin(slug, token);
    if (!store) return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    const body: unknown = await request.json();
    const input = blogPostSchema.partial().parse(body);
    await updateBlogPost(id, store.id, input);
    const rows = await db
      .select()
      .from(storeBlogPosts)
      .where(and(eq(storeBlogPosts.id, id), eq(storeBlogPosts.storeId, store.id)))
      .limit(1);
    return NextResponse.json({ success: true, post: rows[0] ? serializeBlogPost(rows[0]) : null });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const { slug, id } = await context.params;
    const token = getStoreTokenFromRequest(request);
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    const store = await getStoreForAdmin(slug, token);
    if (!store) return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    await deleteBlogPost(id, store.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
