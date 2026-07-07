import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/home/PageHero";
import { MarketplaceProductCard } from "@/components/MarketplaceProductCard";
import { getMarketplaceProducts } from "@/lib/marketplace/catalog";
import {
  curatedCollections,
  filterProductsForCollection,
  getCollectionBySlug,
} from "@/lib/marketplace/collections";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return curatedCollections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Colección no encontrada" };
  return {
    title: `${collection.title} — Colección curada`,
    description: collection.description,
  };
}

export default async function ColeccionPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const allProducts = await getMarketplaceProducts();
  const products = filterProductsForCollection(allProducts, collection);

  return (
    <>
      <PageHero
        eyebrow={collection.badge}
        title={collection.title}
        description={collection.description}
        primaryCta={{ label: "Quiz de matching", href: "/encuentra-tu-cafe" }}
        secondaryCta={{ label: "Todas las colecciones", href: "/catalogo/coleccion" }}
        compact
      />

      <div className="py-12 lg:py-16 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-trade-muted mb-8">
            {products.length} {products.length === 1 ? "producto" : "productos"} en esta colección
          </p>

          {products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product) => (
                <MarketplaceProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 trade-card px-8">
              <p className="text-trade-muted mb-6">
                Aún no hay productos publicados en esta colección. Explora el catálogo completo o
                crea tu tienda para añadir oferta.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/catalogo" className="btn-trade btn-trade-primary btn-trade-pill px-6 py-3">
                  Ver catálogo
                </Link>
                <Link href="/crear-tienda" className="btn-trade btn-trade-secondary btn-trade-pill px-6 py-3">
                  Crear tienda
                </Link>
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-black/5">
            <p className="text-sm text-trade-muted mb-4">Otras colecciones</p>
            <div className="flex flex-wrap gap-2">
              {curatedCollections
                .filter((c) => c.slug !== slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/catalogo/coleccion/${c.slug}`}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-black/10 hover:border-green/40 transition-colors"
                  >
                    {c.title}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
