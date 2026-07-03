import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { PublicStoreCard } from "@/components/PublicStoreCard";
import { StoreCard } from "@/components/StoreCard";
import { stores as demoStores } from "@/lib/data";
import { listPublicStores } from "@/lib/stores/register";
import { listProductsByStoreId } from "@/lib/stores/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Coffee Shops",
  description:
    "Explora las coffee shops de nuestra plataforma. Tostadores, distribuidores y marcas de café de especialidad.",
};

export default async function TiendasPage() {
  const dbStores = await listPublicStores();

  const storeCards = await Promise.all(
    dbStores.map(async (store) => {
      const products = await listProductsByStoreId(store.id, true);
      return {
        slug: store.slug,
        storeName: store.storeName,
        ownerName: store.ownerName,
        country: store.country,
        city: store.city,
        specialty: store.specialty,
        description: store.description,
        productCount: products.length,
      };
    }),
  );

  const hasDbStores = storeCards.length > 0;

  return (
    <div className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Marketplace"
          title="Tiendas profesionales de café"
          description="Cada vendedor tiene su propia tienda personalizable. Sus productos también aparecen en el catálogo principal de Colombia Green Coffee."
        />

        <div className="flex justify-center mb-12">
          <Link
            href="/crear-tienda"
            className="px-8 py-4 bg-green text-white font-semibold rounded-full hover:bg-green-light transition-colors"
          >
            + Crear mi coffee shop
          </Link>
        </div>

        {hasDbStores ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeCards.map((store) => (
              <PublicStoreCard key={store.slug} store={store} />
            ))}
          </div>
        ) : (
          <>
            <p className="text-center text-sm text-foreground/50 mb-8">
              Tiendas de ejemplo — crea la tuya para aparecer aquí con tu marca y productos.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoStores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
