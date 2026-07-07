"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHero } from "@/components/home/PageHero";
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
    <>
      <PageHero
        eyebrow="Catálogo curado"
        title="Café de especialidad colombiano"
        description="Microlotes de la plataforma y de coffee shops verificadas. Cada café con trazabilidad y puntaje SCA."
        primaryCta={{ label: "Crear mi coffee shop", href: "/crear-tienda" }}
        secondaryCta={{ label: "Ver coffee shops", href: "/tiendas" }}
        compact
      />

      <div className="py-12 lg:py-16 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10 border-b border-black/5 pb-6">
            {filters.map((filter) => (
              <a
                key={filter.value}
                href={filter.value === "all" ? "/catalogo" : `/catalogo?tipo=${filter.value}`}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  activeFilter === filter.value
                    ? "bg-trade-ink text-white"
                    : "bg-white text-trade-ink border border-black/10 hover:border-black/25"
                }`}
              >
                {filter.label}
              </a>
            ))}
          </div>

          {!loading && (
            <p className="text-sm text-trade-muted mb-8">
              {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
              {activeFilter !== "all" && ` · ${filters.find((f) => f.value === activeFilter)?.label}`}
            </p>
          )}

          {loading ? (
            <p className="text-center text-trade-muted py-16">Cargando catálogo...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((product) => (
                <div key={product.id} id={product.id}>
                  <MarketplaceProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <p className="text-center text-trade-muted py-16">No hay productos en esta categoría.</p>
          )}
        </div>
      </div>
    </>
  );
}
