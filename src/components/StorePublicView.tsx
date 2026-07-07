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
import {
  cardWrapperClass,
  getTemplatePreset,
  logoShapeClass,
  navItemClass,
} from "@/lib/stores/templates";

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
  const preset = getTemplatePreset(store.storeTemplate);
  const { heroVariant, navVariant, cardVariant, logoShape, headingClass } = preset.layout;
  const logoClass = logoShapeClass(logoShape);
  const cardClass = cardWrapperClass(cardVariant);
  const location = store.city ? `${store.city}, ${store.country}` : store.country;
  const physicalLine = [store.physicalAddress, store.physicalCity, store.physicalCountry].filter(Boolean).join(", ");
  const activeSocial = SOCIAL_PLATFORMS.filter((p) => store.socialLinks[p.key]);

  const navItems: [Section, string][] = [
    ["inicio", "Inicio"],
    ["productos", "Productos"],
    ["blog", "Blog"],
    ["ubicacion", "Ubicación"],
  ];

  function renderHero() {
    const title = theme.heroTitle || store.storeName;
    const subtitle = `${store.ownerName} · ${location}`;
    const badge = preset.tagline;

    if (heroVariant === "corporate") {
      return (
        <header style={{ backgroundColor: theme.primaryColor }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {store.logoUrl ? (
                <img src={store.logoUrl} alt={store.storeName} className={`w-12 h-12 object-cover border-2 border-white/30 ${logoClass}`} />
              ) : (
                <div className={`w-12 h-12 bg-white/20 flex items-center justify-center text-lg font-bold text-white ${logoClass}`}>
                  {store.storeName.charAt(0)}
                </div>
              )}
              <div className="text-white">
                <h1 className={`text-xl font-bold ${headingClass}`}>{title}</h1>
                <p className="text-xs opacity-80">{subtitle}</p>
              </div>
            </div>
            <Link href="/tiendas" className="text-sm text-white/80 hover:text-white shrink-0">← Coffee shops</Link>
          </div>
        </header>
      );
    }

    if (heroVariant === "minimal") {
      return (
        <div className="border-b border-cream/80" style={{ backgroundColor: theme.backgroundColor }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Link href="/tiendas" className="text-sm text-foreground/50 mb-6 inline-block hover:text-coffee">← Coffee shops</Link>
            <div className="flex items-start gap-5">
              {store.logoUrl ? (
                <img src={store.logoUrl} alt={store.storeName} className={`w-16 h-16 object-cover ${logoClass}`} />
              ) : (
                <div className={`w-16 h-16 flex items-center justify-center text-2xl font-bold ${logoClass}`} style={{ backgroundColor: theme.primaryColor, color: "#fff" }}>
                  {store.storeName.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-widest text-foreground/50">{badge}</p>
                <h1 className={`text-3xl sm:text-4xl mt-1 ${headingClass}`} style={{ color: theme.primaryColor }}>{title}</h1>
                <p className="text-foreground/60 text-sm mt-2">{subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const heroHeight = heroVariant === "bold" ? "h-64 sm:h-80" : heroVariant === "heritage" ? "h-52 sm:h-64" : "h-48 sm:h-56";
    const gradientStyle = heroVariant === "bold"
      ? { background: `linear-gradient(160deg, ${theme.primaryColor} 0%, ${theme.accentColor} 50%, ${theme.primaryColor} 100%)` }
      : { background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor})` };

    return (
      <div className="relative">
        {store.coverImageUrl ? (
          <div className={`${heroHeight} relative`}>
            <img src={store.coverImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className={`absolute inset-0 ${heroVariant === "bold" ? "bg-black/30" : "bg-black/40"}`} />
          </div>
        ) : (
          <div className={heroHeight} style={gradientStyle} />
        )}
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative ${store.coverImageUrl ? "-mt-16" : "pt-8"} pb-6`}>
          <Link href="/tiendas" className={`text-sm mb-4 inline-block ${store.coverImageUrl ? "text-white/80" : "text-foreground/50 hover:text-coffee"}`}>
            ← Coffee shops
          </Link>
          <div className={`flex items-end gap-5 ${heroVariant === "bold" ? "flex-col sm:flex-row sm:items-end" : ""}`}>
            {store.logoUrl ? (
              <img
                src={store.logoUrl}
                alt={store.storeName}
                className={`${heroVariant === "bold" ? "w-28 h-28" : "w-24 h-24"} object-cover border-4 border-white shadow-lg ${logoClass}`}
              />
            ) : (
              <div className={`${heroVariant === "bold" ? "w-28 h-28 text-4xl" : "w-24 h-24 text-3xl"} bg-white shadow-lg flex items-center justify-center font-bold ${logoClass}`} style={{ color: theme.primaryColor }}>
                {store.storeName.charAt(0)}
              </div>
            )}
            <div className="text-white pb-2">
              <p className="text-xs uppercase tracking-wide opacity-80">{badge}</p>
              <h1 className={`${headingClass} ${heroVariant === "bold" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"} font-bold`}>
                {title}
              </h1>
              <p className="opacity-90 text-sm mt-1">{subtitle}</p>
              {heroVariant === "heritage" && store.specialty && (
                <p className="opacity-75 text-xs mt-2 italic">{store.specialty}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderNavLink(key: Section, label: string) {
    const active = section === key;
    const { className, style } = navItemClass(navVariant, active, theme.primaryColor, btnClass);
    return (
      <button key={key} type="button" onClick={() => setSection(key)} className={className} style={style}>
        {label}
      </button>
    );
  }

  return (
    <StoreThemeWrapper theme={theme} className="min-h-screen">
      {renderHero()}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Nav */}
        <nav className={`flex flex-wrap gap-2 mb-8 ${navVariant === "bar" ? "p-2 rounded-xl bg-white/80 shadow-sm" : "border-b border-cream/80 pb-4"}`}>
          {navItems.map(([key, label]) => renderNavLink(key, label))}
          {pages.map((page) => {
            const { className } = navItemClass(navVariant, false, theme.primaryColor, btnClass);
            return (
              <Link key={page.id} href={`/tiendas/${slug}/pagina/${page.slug}`} className={className}>
                {page.navLabel}
              </Link>
            );
          })}
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
                <h2 className={`${headingClass} font-bold text-coffee mb-4`}>Síguenos</h2>
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
                  <h2 className={`${headingClass} font-bold text-coffee`}>Destacados</h2>
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
                <h2 className={`${headingClass} font-bold text-coffee mb-4`}>Del blog</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {blogPosts.slice(0, 2).map((post) => (
                    <Link key={post.id} href={`/tiendas/${slug}/blog/${post.slug}`} className={`block overflow-hidden hover:shadow-lg transition-shadow ${cardClass} ${cardVariant === "flat" ? "" : "rounded-2xl"}`}>
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
            <h2 className={`${headingClass} text-2xl font-bold text-coffee mb-6`}>Nuestros cafés</h2>
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
            <h2 className={`${headingClass} text-2xl font-bold text-coffee mb-6`}>Blog</h2>
            {blogPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {blogPosts.map((post) => (
                  <Link key={post.id} href={`/tiendas/${slug}/blog/${post.slug}`} className={`block overflow-hidden hover:shadow-lg ${cardClass} ${cardVariant === "flat" ? "" : "rounded-2xl"}`}>
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
            <h2 className={`${headingClass} text-2xl font-bold text-coffee`}>Dónde encontrarnos</h2>
            {physicalLine && (
              <div className={`p-6 ${cardClass} ${cardVariant === "flat" ? "" : "rounded-2xl"}`}>
                <h3 className="font-semibold text-coffee mb-2">Punto principal</h3>
                <p className="text-foreground/70">{physicalLine}</p>
              </div>
            )}
            {store.purchaseLocations.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-coffee">Dónde conseguir nuestro café</h3>
                {store.purchaseLocations.map((loc, i) => (
                  <div key={i} className={`p-4 ${cardClass} ${cardVariant === "flat" ? "" : "rounded-xl"}`}>
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
