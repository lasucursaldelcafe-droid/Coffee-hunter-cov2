"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { MarketplaceProductCard } from "@/components/MarketplaceProductCard";
import type { MarketplaceProduct } from "@/lib/marketplace/types";

const filters = [
  { value: "all", label: "Todos" },
  { value: "verde", label: "Café verde" },
  { value: "tostado", label: "Café tostado" },
  { value: "maquila", label: "Maquila" },
];

export function CatalogoContent() {
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("tipo") ?? "all";
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json() as Promise<{ products: MarketplaceProduct[] }>)
      .then((data) => setProducts(data.products ?? []))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.type === activeFilter);

  return (
    <div className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Catálogo"
          title="Café de especialidad colombiano"
          description="Microlotes de la plataforma y de coffee shops verificadas. Cada café con trazabilidad y puntaje SCA."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <a
              key={filter.value}
              href={filter.value === "all" ? "/catalogo" : `/catalogo?tipo=${filter.value}`}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeFilter === filter.value
                  ? "bg-coffee text-white"
                  : "bg-cream text-coffee hover:bg-coffee/10"
              }`}
            >
              {filter.label}
            </a>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-foreground/60 py-12">Cargando catálogo...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div key={product.id} id={product.id}>
                <MarketplaceProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-foreground/60 py-12">
            No hay productos en esta categoría.
          </p>
        )}
      </div>
    </div>
  );
}
