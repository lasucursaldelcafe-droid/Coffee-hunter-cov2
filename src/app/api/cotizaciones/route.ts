import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { buyerInquirySchema } from "@/lib/validations/inquiry";
import { submitBuyerInquiry } from "@/lib/inquiries/submit";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const input = buyerInquirySchema.parse(body);
    const result = await submitBuyerInquiry(input);

    return NextResponse.json({
      success: true,
      message: "Solicitud enviada — te contactaremos pronto",
      id: result.id,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const first = error.issues[0];
      return NextResponse.json(
        { error: first?.message ?? "Datos inválidos" },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
