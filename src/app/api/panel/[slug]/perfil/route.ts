import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getStoreForAdmin, updateStoreProfile } from "@/lib/stores/admin";
import { getStoreTokenFromRequest } from "@/lib/stores/session";
import { storeProfileSchema } from "@/lib/validations/store-profile";

interface RouteContext {
  params: Promise<{ slug: string }>;
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
    const input = storeProfileSchema.parse(body);
    await updateStoreProfile(store.id, input);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
