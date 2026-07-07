import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { panelLoginSchema } from "@/lib/validations/product";
import { findStoreByEmail } from "@/lib/stores/admin";
import { verifyStorePassword } from "@/lib/stores/security";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const { email, password } = panelLoginSchema.parse(body);
    const store = await findStoreByEmail(email);

    if (!store) {
      return NextResponse.json(
        { error: "No encontramos una tienda con ese correo. Crea tu tienda primero." },
        { status: 404 },
      );
    }

    const hasPassword = Boolean(store.passwordHash);

    if (hasPassword) {
      if (!password) {
        return NextResponse.json(
          { error: "Esta tienda requiere contraseña", requiresPassword: true },
          { status: 401 },
        );
      }
      const valid = await verifyStorePassword(store.id, password);
      if (!valid) {
        return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
      }
    }

    return NextResponse.json({
      slug: store.slug,
      storeName: store.storeName,
      adminToken: store.adminToken,
      panelUrl: `/panel/${store.slug}`,
      hasPassword,
      emailVerified: store.emailVerified,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
