import type { CoffeeProduct } from "@/lib/data";

export type ProductSource = "platform" | "store";

export interface MarketplaceProduct {
  id: string;
  source: ProductSource;
  name: string;
  origin: string;
  score: number;
  process: string;
  variety: string;
  type: "verde" | "tostado" | "maquila";
  pricePerKg: number;
  description: string;
  altitude: string;
  imageUrl?: string;
  profile: string[];
  storeId?: string;
  storeName?: string;
  storeSlug?: string;
}

export function platformToMarketplace(p: CoffeeProduct): MarketplaceProduct {
  return {
    id: `platform-${p.id}`,
    source: "platform",
    name: p.name,
    origin: p.origin,
    score: p.score,
    process: p.process,
    variety: p.variety,
    type: p.type,
    pricePerKg: p.pricePerKg,
    description: p.description,
    altitude: p.altitude,
    profile: p.profile,
    storeName: "Colombia Green Coffee",
    storeSlug: undefined,
  };
}

export function parseProfileJson(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}
