import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { storeRegistrationSchema } from "@/lib/validations/store";
import { countCoffeeStores, registerCoffeeStore } from "@/lib/stores/register";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const input = storeRegistrationSchema.parse(body);
    const result = await registerCoffeeStore(input);

    return NextResponse.json({
      success: true,
      message: "Tienda registrada exitosamente",
      slug: result.slug,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const first = error.issues[0];
      return NextResponse.json(
        { error: first?.message ?? "Datos inválidos" },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === "DUPLICATE_EMAIL") {
      return NextResponse.json(
        { error: "Ya existe una solicitud con este correo electrónico" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await countCoffeeStores();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
