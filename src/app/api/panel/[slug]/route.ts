import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getStoreForAdmin, sanitizeStorePublic, updateStoreTheme } from "@/lib/stores/admin";
import { getStoreTokenFromRequest } from "@/lib/stores/session";
import { listProductsByStoreId, serializeStoreProduct } from "@/lib/stores/products";
import { storeThemeSchema } from "@/lib/validations/product";
import { themeFromStore } from "@/lib/stores/theme";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const token = getStoreTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const store = await getStoreForAdmin(slug, token);
    if (!store) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const products = await listProductsByStoreId(store.id, false);

    return NextResponse.json({
      store: sanitizeStorePublic(store),
      theme: themeFromStore(store),
      products: products.map(serializeStoreProduct),
    });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const token = getStoreTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const store = await getStoreForAdmin(slug, token);
    if (!store) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const body: unknown = await request.json();
    const input = storeThemeSchema.parse(body);
    await updateStoreTheme(store.id, input);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
