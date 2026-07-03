import { NextResponse } from "next/server";
import { getStoreBySlug } from "@/lib/stores/register";
import { sanitizeStorePublic } from "@/lib/stores/admin";
import { listProductsByStoreId, serializeStoreProduct } from "@/lib/stores/products";
import { themeFromStore } from "@/lib/stores/theme";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const store = await getStoreBySlug(slug);

    if (!store || store.status !== "active") {
      return NextResponse.json({ error: "Tienda no encontrada" }, { status: 404 });
    }

    const products = await listProductsByStoreId(store.id, true);

    return NextResponse.json({
      store: sanitizeStorePublic(store),
      theme: themeFromStore(store),
      products: products.map(serializeStoreProduct),
    });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
