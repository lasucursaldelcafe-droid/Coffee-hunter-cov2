import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getStoreForAdmin } from "@/lib/stores/admin";
import { getStoreTokenFromRequest } from "@/lib/stores/session";
import { createStorePage, listStorePages, serializeStorePage } from "@/lib/stores/pages";
import { storePageSchema } from "@/lib/validations/store-profile";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const token = getStoreTokenFromRequest(request);
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    const store = await getStoreForAdmin(slug, token);
    if (!store) return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    const pages = await listStorePages(store.id, false);
    return NextResponse.json({ pages: pages.map(serializeStorePage) });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const token = getStoreTokenFromRequest(request);
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    const store = await getStoreForAdmin(slug, token);
    if (!store) return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    const body: unknown = await request.json();
    const input = storePageSchema.parse(body);
    const result = await createStorePage(store.id, input);
    return NextResponse.json({ success: true, ...result }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
