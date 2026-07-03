import { NextResponse } from "next/server";
import { verifyEmailByToken } from "@/lib/stores/security";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { token?: string };
    if (!body.token) {
      return NextResponse.json({ error: "Token requerido" }, { status: 400 });
    }
    const ok = await verifyEmailByToken(body.token);
    if (!ok) {
      return NextResponse.json({ error: "Token inválido o expirado" }, { status: 400 });
    }
    return NextResponse.json({ success: true, message: "Correo verificado" });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Token requerido" }, { status: 400 });
  }
  const ok = await verifyEmailByToken(token);
  if (!ok) {
    return NextResponse.json({ error: "Token inválido" }, { status: 400 });
  }
  return NextResponse.redirect(new URL("/panel?verificado=1", request.url));
}
