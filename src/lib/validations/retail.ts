import { z } from "zod";
import { retailChannelSchema } from "@/lib/validations/store";

export const retailReportSchema = z.object({
  storeEmail: z.string().email("Correo de la tienda inválido"),
  storeName: z.string().min(2).max(100),
  periodMonth: z
    .string()
    .regex(/^\d{4}-\d{2}$/, "Formato: YYYY-MM (ej. 2026-07)"),
  channel: retailChannelSchema,
  productName: z.string().min(2, "Nombre del producto requerido").max(120),
  unitsSold: z.coerce.number().int().min(0).optional(),
  kgSold: z.coerce.number().min(0.1, "Indica kilos vendidos"),
  avgPriceUsd: z.coerce.number().min(0).optional(),
  city: z.string().max(80).optional().default(""),
  region: z.string().max(80).optional().default(""),
  notes: z.string().max(500).optional().default(""),
});

export type RetailReportInput = z.infer<typeof retailReportSchema>;
