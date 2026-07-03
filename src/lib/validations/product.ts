import { z } from "zod";

export const productTypeSchema = z.enum(["verde", "tostado", "maquila"]);

export const storeProductSchema = z.object({
  name: z.string().min(2).max(120),
  origin: z.string().min(2).max(80).default("Colombia"),
  description: z.string().max(1000).optional().default(""),
  pricePerKg: z.coerce.number().min(0.01),
  score: z.coerce.number().min(0).max(100).optional(),
  process: z.string().max(80).optional().default(""),
  variety: z.string().max(80).optional().default(""),
  type: productTypeSchema.default("verde"),
  profile: z.array(z.string()).optional().default([]),
  altitude: z.string().max(40).optional().default(""),
  imageUrl: z.string().url().or(z.literal("")).optional().default(""),
  published: z.boolean().optional().default(true),
});

export type StoreProductInput = z.infer<typeof storeProductSchema>;

export const storeThemeSchema = z.object({
  storeTemplate: z
    .enum(["advanced", "casa_del_cafe", "pergamino", "tropicalia", "starbucks", "juan_valdez"])
    .optional(),
  themePrimaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  themeAccentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  themeBackgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  themeHeroTitle: z.string().max(120).optional(),
  themeHeroSubtitle: z.string().max(300).optional(),
  themeButtonStyle: z.enum(["pill", "rounded", "square"]).optional(),
  description: z.string().max(1000).optional(),
  storeName: z.string().min(2).max(100).optional(),
});

export type StoreThemeInput = z.infer<typeof storeThemeSchema>;

export const panelLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
});
