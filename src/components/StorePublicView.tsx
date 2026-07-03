"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MarketplaceProductCard } from "@/components/MarketplaceProductCard";
import { StoreThemeWrapper } from "@/components/StoreThemeWrapper";
import { buttonRadiusClass } from "@/lib/stores/theme";
import type { StoreTheme } from "@/lib/stores/theme";
import type { MarketplaceProduct } from "@/lib/marketplace/types";

interface StorePublicViewProps {
  slug: string;
}

interface StorePayload {
  store: {
    storeName: string;
    ownerName: string;
    country: string;
    city: string | null;
    specialty: string;
    description: string | null;
  };
  theme: StoreTheme;
  products: MarketplaceProduct[];
}

export function StorePublicView({ slug }: StorePublicViewProps) {
  const [data, setData] = useState<StorePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/tiendas/${slug}`)
      .then(async (res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        return res.json() as Promise<StorePayload & { products: Array<Omit<MarketplaceProduct, "id"> & { id: string }> }>;
      })
      .then((payload) => {
        if (payload) {
          setData({
            ...payload,
            products: payload.products.map((p) => ({
              ...p,
              id: `store-${p.id}`,
              source: "store" as const,
              storeSlug: slug,
              storeName: payload.store.storeName,
            })),
          });
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <p className="text-center py-20 text-foreground/60">Cargando tienda...</p>;
  }

  if (notFound || !data) {
    return (
      <div className="text-center py-20">
        <p className="text-foreground/70 mb-4">Tienda no encontrada.</p>
        <Link href="/tiendas" className="text-green font-semibold hover:underline">
          Ver todas las tiendas
        </Link>
      </div>
    );
  }

  const { store, theme, products } = data;
  const btnClass = buttonRadiusClass(theme.buttonStyle);
  const location = store.city ? `${store.city}, ${store.country}` : store.country;

  return (
    <StoreThemeWrapper theme={theme} className="min-h-screen py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/tiendas" className="text-sm mb-6 inline-block opacity-70 hover:opacity-100">
          ← Volver a coffee shops
        </Link>

        <div
          className="rounded-2xl overflow-hidden text-white mb-10"
          style={{
            background: `linear-gradient(135deg, var(--store-primary), var(--store-accent))`,
          }}
        >
          <div className="p-8 sm:p-12 flex flex-col sm:flex-row sm:items-end gap-6">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <span className="text-3xl font-bold">{store.storeName.charAt(0)}</span>
            </div>
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold">{theme.heroTitle}</h1>
              <p className="mt-2 opacity-90">
                {store.ownerName} · {location}
              </p>
              {theme.heroSubtitle && (
                <p className="mt-4 max-w-2xl opacity-85">{theme.heroSubtitle}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <span className="px-4 py-2 bg-white/80 rounded-full text-sm font-medium text-coffee">
            {store.specialty}
          </span>
          <span className="px-4 py-2 bg-white/80 rounded-full text-sm text-foreground/70">
            {products.length} productos
          </span>
        </div>

        {products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <MarketplaceProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/60 rounded-2xl">
            <p className="text-foreground/60 mb-4">Esta tienda aún no tiene productos publicados.</p>
            <Link
              href="/catalogo"
              className={`inline-block px-6 py-3 text-white font-semibold ${btnClass}`}
              style={{ backgroundColor: theme.primaryColor }}
            >
              Ver catálogo principal
            </Link>
          </div>
        )}
      </div>
    </StoreThemeWrapper>
  );
}
