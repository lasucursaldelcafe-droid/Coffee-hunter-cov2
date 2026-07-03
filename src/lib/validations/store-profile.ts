import { z } from "zod";

const urlOptional = z.string().url().or(z.literal("")).optional();

export const purchaseLocationSchema = z.object({
  name: z.string().min(1).max(120),
  address: z.string().max(300),
  url: urlOptional,
});

export const socialLinksSchema = z.object({
  instagram: urlOptional,
  facebook: urlOptional,
  twitter: urlOptional,
  tiktok: urlOptional,
  youtube: urlOptional,
  whatsapp: urlOptional,
  website: urlOptional,
});

export const storeProfileSchema = z.object({
  storeName: z.string().min(2).max(100).optional(),
  ownerName: z.string().min(2).max(100).optional(),
  phone: z.string().max(40).optional(),
  country: z.string().min(2).max(80).optional(),
  city: z.string().max(80).optional(),
  specialty: z.string().min(2).max(120).optional(),
  description: z.string().max(2000).optional(),
  logoUrl: urlOptional,
  coverImageUrl: urlOptional,
  physicalAddress: z.string().max(300).optional(),
  physicalCity: z.string().max(80).optional(),
  physicalCountry: z.string().max(80).optional(),
  purchaseLocations: z.array(purchaseLocationSchema).optional(),
  socialLinks: socialLinksSchema.optional(),
});

export type StoreProfileInput = z.infer<typeof storeProfileSchema>;

export const setPasswordSchema = z
  .object({
    password: z.string().min(8).max(128),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const panelLoginWithPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
});

export const blogPostSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/).optional(),
  excerpt: z.string().max(400).optional().default(""),
  content: z.string().max(20000).optional().default(""),
  coverImageUrl: urlOptional,
  published: z.boolean().optional().default(false),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

export const storePageSchema = z.object({
  navLabel: z.string().min(1).max(40),
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/).optional(),
  content: z.string().max(20000).optional().default(""),
  published: z.boolean().optional().default(false),
  sortOrder: z.coerce.number().int().min(0).optional().default(0),
});

export type StorePageInput = z.infer<typeof storePageSchema>;
