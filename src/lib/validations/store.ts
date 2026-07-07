import { z } from "zod";
import { PLATFORM_COMMISSION_RATE } from "@/lib/platform";

export const businessTypeSchema = z.enum([
  "tostador",
  "retail",
  "exportador",
  "marca_propia",
  "distribuidor",
]);

export const retailChannelSchema = z.enum([
  "cafe",
  "supermercado",
  "online",
  "horeca",
  "mayorista",
  "mixto",
]);

export const storeRegistrationSchema = z.object({
  storeName: z.string().min(2, "Nombre de tienda muy corto").max(100),
  ownerName: z.string().min(2, "Nombre del propietario requerido").max(100),
  email: z.string().email("Correo electrónico inválido"),
  country: z.string().min(2, "País requerido").max(80),
  city: z.string().max(80).optional().default(""),
  phone: z.string().max(30).optional().default(""),
  specialty: z.string().min(2, "Especialidad requerida").max(120),
  businessType: businessTypeSchema.default("tostador"),
  retailChannel: retailChannelSchema.optional(),
  monthlyVolumeKg: z.coerce.number().int().min(0).max(1_000_000).optional(),
  description: z.string().max(1000).optional().default(""),
  acceptCommission: z.boolean().refine((v) => v, {
    message: "Debes aceptar el modelo de comisión por venta",
  }),
});

export type StoreRegistrationInput = z.infer<typeof storeRegistrationSchema>;

export function slugifyStoreName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export const DEFAULT_COMMISSION_RATE = PLATFORM_COMMISSION_RATE;
