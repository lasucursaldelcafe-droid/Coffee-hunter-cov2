import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { panelLoginSchema } from "@/lib/validations/product";
import { findStoreByEmail } from "@/lib/stores/admin";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const { email } = panelLoginSchema.parse(body);
    const store = await findStoreByEmail(email);

    if (!store) {
      return NextResponse.json(
        { error: "No encontramos una tienda con ese correo. Crea tu tienda primero." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      slug: store.slug,
      storeName: store.storeName,
      adminToken: store.adminToken,
      panelUrl: `/panel/${store.slug}`,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Correo inválido" }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
