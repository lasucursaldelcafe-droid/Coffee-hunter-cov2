import Link from "next/link";
import { CoffeeCard } from "@/components/CoffeeCard";
import type { CoffeeProduct } from "@/lib/data";

interface FeaturedCatalogProps {
  products: CoffeeProduct[];
}

export function FeaturedCatalog({ products }: FeaturedCatalogProps) {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="section-eyebrow">Catálogo curado</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-trade-ink">
              Cafés de alto puntaje, perfiles únicos
            </h2>
          </div>
          <Link href="/catalogo" className="text-sm font-semibold text-green hover:underline shrink-0">
            Ver catálogo completo →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <CoffeeCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
