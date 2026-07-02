import { z } from "zod";

export const storePlanSchema = z.enum(["Starter", "Pro", "Enterprise"]);

export const storeRegistrationSchema = z.object({
  storeName: z.string().min(2, "Nombre de tienda muy corto").max(100),
  ownerName: z.string().min(2, "Nombre del propietario requerido").max(100),
  email: z.string().email("Correo electrónico inválido"),
  country: z.string().min(2, "País requerido").max(80),
  specialty: z.string().min(2, "Especialidad requerida").max(120),
  plan: storePlanSchema.default("Starter"),
  description: z.string().max(1000).optional().default(""),
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
