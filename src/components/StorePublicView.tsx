"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MarketplaceProductCard } from "@/components/MarketplaceProductCard";
import { StoreThemeWrapper } from "@/components/StoreThemeWrapper";
import { buttonRadiusClass } from "@/lib/stores/theme";
import type { StoreTheme } from "@/lib/stores/theme";
import type { MarketplaceProduct } from "@/lib/marketplace/types";
import type { PurchaseLocation, SocialLinks } from "@/lib/stores/social";
import { SOCIAL_PLATFORMS } from "@/lib/stores/social";

interface StorePublicViewProps {
  slug: string;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
}

interface StorePage {
  id: string;
  slug: string;
  navLabel: string;
  title: string;
}

interface StorePayload {
  store: {
    storeName: string;
    ownerName: string;
    country: string;
    city: string | null;
    specialty: string;
    description: string | null;
    logoUrl: string | null;
    coverImageUrl: string | null;
    physicalAddress: string | null;
    physicalCity: string | null;
    physicalCountry: string | null;
    purchaseLocations: PurchaseLocation[];
    socialLinks: SocialLinks;
    storeTemplate: string;
  };
  theme: StoreTheme;
  products: Array<Omit<MarketplaceProduct, "id" | "source"> & { id: string }>;
  blogPosts: BlogPost[];
  pages: StorePage[];
}

type Section = "inicio" | "productos" | "blog" | "ubicacion";

export function StorePublicView({ slug }: StorePublicViewProps) {
  const [data, setData] = useState<StorePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [section, setSection] = useState<Section>("inicio");

  useEffect(() => {
    fetch(`/api/tiendas/${slug}`)
      .then(async (res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        return res.json() as Promise<StorePayload>;
      })
      .then((payload) => {
        if (payload) setData(payload);
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
        <Link href="/tiendas" className="text-green font-semibold hover:underline">Ver todas las tiendas</Link>
      </div>
    );
  }

  const { store, theme, blogPosts, pages } = data;
  const products: MarketplaceProduct[] = data.products.map((p) => ({
    ...p,
    id: `store-${p.id}`,
    source: "store",
    storeSlug: slug,
    storeName: store.storeName,
    score: p.score ?? 0,
    description: p.description ?? "",
  }));

  const btnClass = buttonRadiusClass(theme.buttonStyle);
  const location = store.city ? `${store.city}, ${store.country}` : store.country;
  const physicalLine = [store.physicalAddress, store.physicalCity, store.physicalCountry].filter(Boolean).join(", ");
  const activeSocial = SOCIAL_PLATFORMS.filter((p) => store.socialLinks[p.key]);

  return (
    <StoreThemeWrapper theme={theme} className="min-h-screen">
      {/* Hero */}
      <div className="relative">
        {store.coverImageUrl ? (
          <div className="h-56 sm:h-72 relative">
            <img src={store.coverImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ) : (
          <div className="h-48" style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor})` }} />
        )}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16 pb-6">
          <Link href="/tiendas" className="text-sm text-white/80 mb-4 inline-block">← Coffee shops</Link>
          <div className="flex items-end gap-5">
            {store.logoUrl ? (
              <img src={store.logoUrl} alt={store.storeName} className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg" />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl font-bold text-coffee">
                {store.storeName.charAt(0)}
              </div>
            )}
            <div className="text-white pb-2">
              <p className="text-xs uppercase tracking-wide opacity-80">Coffee Shop avanzado</p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold">{theme.heroTitle || store.storeName}</h1>
              <p className="opacity-90 text-sm mt-1">{store.ownerName} · {location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Nav */}
        <nav className="flex flex-wrap gap-2 mb-8 border-b border-cream/80 pb-4">
          {([
            ["inicio", "Inicio"],
            ["productos", "Productos"],
            ["blog", "Blog"],
            ["ubicacion", "Ubicación"],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSection(key)}
              className={`px-4 py-2 text-sm font-semibold ${btnClass} transition-colors ${
                section === key ? "text-white" : "text-coffee bg-white/70"
              }`}
              style={section === key ? { backgroundColor: theme.primaryColor } : undefined}
            >
              {label}
            </button>
          ))}
          {pages.map((page) => (
            <Link
              key={page.id}
              href={`/tiendas/${slug}/pagina/${page.slug}`}
              className={`px-4 py-2 text-sm font-semibold ${btnClass} text-coffee bg-white/70 hover:bg-white`}
            >
              {page.navLabel}
            </Link>
          ))}
        </nav>

        {section === "inicio" && (
          <div className="space-y-10">
            {theme.heroSubtitle && (
              <p className="text-lg text-foreground/75 max-w-3xl">{theme.heroSubtitle}</p>
            )}
            {store.description && (
              <p className="text-foreground/70 leading-relaxed max-w-3xl">{store.description}</p>
            )}

            {activeSocial.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-coffee mb-4">Síguenos</h2>
                <div className="flex flex-wrap gap-3">
                  {activeSocial.map((platform) => (
                    <a
                      key={platform.key}
                      href={store.socialLinks[platform.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 bg-white border border-cream ${btnClass} text-sm font-semibold text-coffee hover:shadow-md transition-shadow`}
                    >
                      {platform.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {products.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-display font-bold text-coffee">Destacados</h2>
                  <button type="button" onClick={() => setSection("productos")} className="text-sm text-green font-semibold">Ver todos →</button>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {products.slice(0, 3).map((p) => (
                    <MarketplaceProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}

            {blogPosts.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-coffee mb-4">Del blog</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {blogPosts.slice(0, 2).map((post) => (
                    <Link key={post.id} href={`/tiendas/${slug}/blog/${post.slug}`} className="block bg-white rounded-2xl border border-cream overflow-hidden hover:shadow-lg transition-shadow">
                      {post.coverImageUrl && <img src={post.coverImageUrl} alt="" className="w-full h-40 object-cover" />}
                      <div className="p-5">
                        <h3 className="font-semibold text-coffee">{post.title}</h3>
                        <p className="text-sm text-foreground/60 mt-1 line-clamp-2">{post.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {section === "productos" && (
          <div>
            <h2 className="font-display text-2xl font-bold text-coffee mb-6">Nuestros cafés</h2>
            {products.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <MarketplaceProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <p className="text-foreground/60">Próximamente nuevos productos.</p>
            )}
          </div>
        )}

        {section === "blog" && (
          <div>
            <h2 className="font-display text-2xl font-bold text-coffee mb-6">Blog</h2>
            {blogPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {blogPosts.map((post) => (
                  <Link key={post.id} href={`/tiendas/${slug}/blog/${post.slug}`} className="block bg-white rounded-2xl border border-cream overflow-hidden hover:shadow-lg">
                    {post.coverImageUrl && <img src={post.coverImageUrl} alt="" className="w-full h-44 object-cover" />}
                    <div className="p-5">
                      <h3 className="font-semibold text-coffee">{post.title}</h3>
                      <p className="text-sm text-foreground/60 mt-2">{post.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-foreground/60">Aún no hay entradas publicadas.</p>
            )}
          </div>
        )}

        {section === "ubicacion" && (
          <div className="space-y-8">
            <h2 className="font-display text-2xl font-bold text-coffee">Dónde encontrarnos</h2>
            {physicalLine && (
              <div className="bg-white rounded-2xl border border-cream p-6">
                <h3 className="font-semibold text-coffee mb-2">Punto principal</h3>
                <p className="text-foreground/70">{physicalLine}</p>
              </div>
            )}
            {store.purchaseLocations.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-coffee">Dónde conseguir nuestro café</h3>
                {store.purchaseLocations.map((loc, i) => (
                  <div key={i} className="bg-white rounded-xl border border-cream p-4">
                    <p className="font-medium text-coffee">{loc.name}</p>
                    <p className="text-sm text-foreground/60">{loc.address}</p>
                    {loc.url && (
                      <a href={loc.url} target="_blank" rel="noopener noreferrer" className="text-sm text-green font-semibold mt-1 inline-block">
                        Ver en mapa →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
            {!physicalLine && store.purchaseLocations.length === 0 && (
              <p className="text-foreground/60">Información de ubicación próximamente.</p>
            )}
          </div>
        )}
      </div>
    </StoreThemeWrapper>
  );
}
