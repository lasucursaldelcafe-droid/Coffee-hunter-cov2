import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getStoreForAdmin } from "@/lib/stores/admin";
import { getStoreTokenFromRequest } from "@/lib/stores/session";
import {
  deleteStoreProduct,
  getStoreProduct,
  serializeStoreProduct,
  updateStoreProduct,
} from "@/lib/stores/products";
import { storeProductSchema } from "@/lib/validations/product";

interface RouteContext {
  params: Promise<{ slug: string; id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { slug, id } = await context.params;
    const token = getStoreTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const store = await getStoreForAdmin(slug, token);
    if (!store) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const body: unknown = await request.json();
    const input = storeProductSchema.partial().parse(body);
    await updateStoreProduct(id, store.id, input);

    const product = await getStoreProduct(id, store.id);
    return NextResponse.json({
      success: true,
      product: product ? serializeStoreProduct(product) : null,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }
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
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const store = await getStoreForAdmin(slug, token);
    if (!store) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const existing = await getStoreProduct(id, store.id);
    if (!existing) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    await deleteStoreProduct(id, store.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
