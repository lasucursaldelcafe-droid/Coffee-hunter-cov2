import { z } from "zod";
import { retailChannelSchema } from "@/lib/validations/store";

export const buyerInquirySchema = z.object({
  productId: z.string().min(1),
  productName: z.string().min(2).max(120),
  buyerName: z.string().min(2, "Nombre requerido").max(100),
  company: z.string().max(100).optional().default(""),
  email: z.string().email("Correo inválido"),
  country: z.string().min(2).max(80),
  channel: retailChannelSchema,
  volumeKg: z.coerce.number().int().min(1).optional(),
  message: z.string().max(1000).optional().default(""),
});

export type BuyerInquiryInput = z.infer<typeof buyerInquirySchema>;
