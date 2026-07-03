import { products } from "@/lib/data";
import {
  type MarketplaceProduct,
  platformToMarketplace,
  parseProfileJson,
} from "@/lib/marketplace/types";
import { listAllPublishedProducts } from "@/lib/stores/products";

export async function getMarketplaceProducts(): Promise<MarketplaceProduct[]> {
  const platformItems = products.map(platformToMarketplace);

  const storeRows = await listAllPublishedProducts();
  const storeItems: MarketplaceProduct[] = storeRows.map(({ product, store }) => ({
    id: `store-${product.id}`,
    source: "store" as const,
    name: product.name,
    origin: product.origin,
    score: product.score ?? 0,
    process: product.process ?? "",
    variety: product.variety ?? "",
    type: product.type as "verde" | "tostado" | "maquila",
    pricePerKg: product.pricePerKg,
    description: product.description ?? "",
    altitude: product.altitude ?? "",
    profile: parseProfileJson(product.profile),
    storeId: store.id,
    storeName: store.storeName,
    storeSlug: store.slug,
  }));

  return [...platformItems, ...storeItems];
}

export async function getMarketplaceProduct(id: string): Promise<MarketplaceProduct | null> {
  const all = await getMarketplaceProducts();
  return all.find((p) => p.id === id) ?? null;
}
