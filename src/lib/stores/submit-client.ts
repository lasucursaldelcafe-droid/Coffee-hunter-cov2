export interface StoreFormData {
  storeName: string;
  ownerName: string;
  email: string;
  phone?: string;
  country: string;
  city?: string;
  specialty: string;
  businessType: string;
  retailChannel?: string;
  monthlyVolumeKg?: number;
  description: string;
  acceptCommission: boolean;
}

const STORAGE_KEY = "cgc_pending_stores";

export async function submitStoreRegistration(form: StoreFormData): Promise<void> {
  const sheetsUrl = process.env.NEXT_PUBLIC_SHEETS_WEB_APP_URL;

  try {
    const res = await fetch("/api/tiendas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) return;
    if (res.status === 409) {
      const data = (await res.json()) as { error?: string };
      throw new Error(data.error ?? "Correo ya registrado");
    }
  } catch (err) {
    if (err instanceof Error && err.message.includes("Correo ya registrado")) {
      throw err;
    }
  }

  if (sheetsUrl) {
    const res = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "coffee_store", ...form, createdAt: new Date().toISOString() }),
    });
    if (res.ok) return;
    throw new Error("No se pudo enviar el formulario. Intenta de nuevo.");
  }

  if (typeof window !== "undefined") {
    const pending = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as StoreFormData[];
    const duplicate = pending.some((p) => p.email.toLowerCase() === form.email.toLowerCase());
    if (duplicate) {
      throw new Error("Ya existe una solicitud con este correo electrónico");
    }
    pending.push(form);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pending));
    return;
  }

  throw new Error("No hay conexión disponible para registrar la tienda");
}
