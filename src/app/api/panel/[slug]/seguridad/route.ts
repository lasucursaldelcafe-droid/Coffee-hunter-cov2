import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getStoreForAdmin } from "@/lib/stores/admin";
import { getStoreTokenFromRequest } from "@/lib/stores/session";
import { setPasswordSchema } from "@/lib/validations/store-profile";
import { requestEmailVerification, setStorePassword } from "@/lib/stores/security";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function POST(request: Request, context: RouteContext) {
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
    const { action } = body as { action?: string };

    if (action === "request_email_verification") {
      const verifyToken = await requestEmailVerification(store.id);
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://colombia-green-coffee.vercel.app";
      const verificationUrl = `${baseUrl}/api/panel/verificar-email?token=${verifyToken}`;
      return NextResponse.json({ success: true, verificationUrl });
    }

    const { password } = setPasswordSchema.parse(body);
    if (store.passwordHash) {
      return NextResponse.json({ error: "La contraseña ya está configurada" }, { status: 400 });
    }
    await setStorePassword(store.id, password);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message ?? "Datos inválidos" }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
