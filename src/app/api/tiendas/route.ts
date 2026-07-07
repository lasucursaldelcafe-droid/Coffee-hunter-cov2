import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { buildStoreUrls, sendStoreWelcomeEmail } from "@/lib/email/send";
import { storeRegistrationSchema } from "@/lib/validations/store";
import { countCoffeeStores, listPublicStores, registerCoffeeStore } from "@/lib/stores/register";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const input = storeRegistrationSchema.parse(body);
    const result = await registerCoffeeStore(input);

    const urls = buildStoreUrls(result.slug);

    void sendStoreWelcomeEmail({
      to: input.email,
      ownerName: input.ownerName,
      storeName: input.storeName,
      panelUrl: urls.panelUrl,
      storeUrl: urls.storeUrl,
    });

    return NextResponse.json({
      success: true,
      message: "Tienda creada exitosamente",
      slug: result.slug,
      adminToken: result.adminToken,
      panelUrl: `/panel/${result.slug}`,
      storeUrl: `/tiendas/${result.slug}`,
      commissionRate: result.commissionRate,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const first = error.issues[0];
      return NextResponse.json(
        { error: first?.message ?? "Datos inválidos" },
        { status: 400 },
      );
    }

    if (error instanceof Error && error.message === "DUPLICATE_EMAIL") {
      return NextResponse.json(
        { error: "Ya existe una solicitud con este correo electrónico" },
        { status: 409 },
      );
    }

    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.get("list") === "1") {
      const stores = await listPublicStores();
      return NextResponse.json({ stores });
    }

    const count = await countCoffeeStores();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0, stores: [] });
  }
}
