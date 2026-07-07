export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
  whatsapp?: string;
  website?: string;
}

export interface PurchaseLocation {
  name: string;
  address: string;
  url?: string;
}

export function parseSocialLinks(raw: string | null | undefined): SocialLinks {
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    return parsed as SocialLinks;
  } catch {
    return {};
  }
}

export function serializeSocialLinks(links: SocialLinks): string {
  return JSON.stringify(links);
}

export function parsePurchaseLocations(raw: string | null | undefined): PurchaseLocation[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is PurchaseLocation =>
        typeof item === "object" &&
        item !== null &&
        "name" in item &&
        typeof (item as PurchaseLocation).name === "string",
    );
  } catch {
    return [];
  }
}

export function serializePurchaseLocations(locations: PurchaseLocation[]): string {
  return JSON.stringify(locations);
}

export const SOCIAL_PLATFORMS = [
  { key: "instagram" as const, label: "Instagram", placeholder: "https://instagram.com/tutienda" },
  { key: "facebook" as const, label: "Facebook", placeholder: "https://facebook.com/tutienda" },
  { key: "twitter" as const, label: "X / Twitter", placeholder: "https://x.com/tutienda" },
  { key: "tiktok" as const, label: "TikTok", placeholder: "https://tiktok.com/@tutienda" },
  { key: "youtube" as const, label: "YouTube", placeholder: "https://youtube.com/@tutienda" },
  { key: "whatsapp" as const, label: "WhatsApp", placeholder: "https://wa.me/573001234567" },
  { key: "website" as const, label: "Sitio web", placeholder: "https://tutienda.com" },
];

export const STORE_TEMPLATES = [
  { value: "advanced", label: "Coffee Shop avanzado", available: true },
  { value: "casa_del_cafe", label: "Casa del Café · Prisma", available: true },
  { value: "pergamino", label: "Pergamino", available: true },
  { value: "tropicalia", label: "Tropicalia", available: true },
  { value: "starbucks", label: "Starbucks-style", available: true },
  { value: "juan_valdez", label: "Juan Valdez-style", available: true },
] as const;

export type { StoreTemplateId } from "@/lib/stores/templates";
export { getTemplatePreset, STORE_TEMPLATE_PRESETS } from "@/lib/stores/templates";
