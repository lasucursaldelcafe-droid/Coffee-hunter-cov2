import { NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

interface StoreRegistration {
  storeName: string;
  ownerName: string;
  email: string;
  country: string;
  specialty: string;
  plan: string;
  description: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const STORES_FILE = path.join(DATA_DIR, "registrations.json");

async function ensureDataFile(): Promise<StoreRegistration[]> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    const content = await readFile(STORES_FILE, "utf-8");
    return JSON.parse(content) as StoreRegistration[];
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<StoreRegistration>;

    if (!body.storeName || !body.ownerName || !body.email || !body.country || !body.specialty) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Correo electrónico inválido" },
        { status: 400 }
      );
    }

    const registrations = await ensureDataFile();

    const duplicate = registrations.find(
      (r) => r.email.toLowerCase() === body.email!.toLowerCase()
    );
    if (duplicate) {
      return NextResponse.json(
        { error: "Ya existe una solicitud con este correo electrónico" },
        { status: 409 }
      );
    }

    const registration: StoreRegistration = {
      storeName: body.storeName,
      ownerName: body.ownerName,
      email: body.email,
      country: body.country,
      specialty: body.specialty,
      plan: body.plan ?? "Starter",
      description: body.description ?? "",
      createdAt: new Date().toISOString(),
    };

    registrations.push(registration);
    await writeFile(STORES_FILE, JSON.stringify(registrations, null, 2));

    return NextResponse.json({
      success: true,
      message: "Tienda registrada exitosamente",
    });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const registrations = await ensureDataFile();
  return NextResponse.json({ count: registrations.length });
}
