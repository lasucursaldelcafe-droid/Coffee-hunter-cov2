import { NextResponse } from "next/server";
import { initDatabase } from "@/lib/db";

export async function GET() {
  try {
    await initDatabase();
    return NextResponse.json({
      status: "ok",
      service: "colombia-green-coffee",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ status: "degraded" }, { status: 503 });
  }
}
