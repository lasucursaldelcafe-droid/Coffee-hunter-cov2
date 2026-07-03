import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { retailReportSchema } from "@/lib/validations/retail";
import { submitRetailReport } from "@/lib/retail/submit-report";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const input = retailReportSchema.parse(body);
    const result = await submitRetailReport(input);

    return NextResponse.json({
      success: true,
      message: "Reporte retail registrado",
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
