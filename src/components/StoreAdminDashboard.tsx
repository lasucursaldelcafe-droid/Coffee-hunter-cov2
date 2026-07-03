"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { getStoreAdminSession, clearStoreAdminSession } from "@/lib/stores/session";
import type { StoreTheme } from "@/lib/stores/theme";
import { StoreThemeEditor } from "@/components/StoreThemeEditor";
import { StoreProductForm } from "@/components/StoreProductForm";
import { SecuritySetupPanel } from "@/components/SecuritySetupPanel";
import { StoreProfileEditor, type StoreProfileData } from "@/components/StoreProfileEditor";
import { StoreBlogManager } from "@/components/StoreBlogManager";
import { StorePagesManager } from "@/components/StorePagesManager";
import type { PurchaseLocation, SocialLinks } from "@/lib/stores/social";

interface SerializedProduct {
  id: string;
  name: string;
  origin: string;
  description: string;
  pricePerKg: number;
  score: number | null;
  process: string;
  variety: string;
  type: "verde" | "tostado" | "maquila";
  profile: string[];
  altitude: string;
  imageUrl?: string;
  published: boolean;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  published: boolean;
}

interface StorePageItem {
  id: string;
  slug: string;
  navLabel: string;
  title: string;
  content: string;
  published: boolean;
  sortOrder: number;
}

interface StoreData {
  slug: string;
  storeName: string;
  ownerName: string;
  email: string;
  phone: string | null;
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
  security: { hasPassword: boolean; emailVerified: boolean; setupComplete: boolean };
}

interface StoreAdminDashboardProps {
  slug: string;
}

type Tab = "productos" | "apariencia" | "perfil" | "blog" | "paginas" | "seguridad";

export function StoreAdminDashboard({ slug }: StoreAdminDashboardProps) {
  const [token, setToken] = useState<string | null>(null);
  const [store, setStore] = useState<StoreData | null>(null);
  const [theme, setTheme] = useState<StoreTheme | null>(null);
  const [products, setProducts] = useState<SerializedProduct[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [pages, setPages] = useState<StorePageItem[]>([]);
  const [tab, setTab] = useState<Tab>("productos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SerializedProduct | null>(null);

  const fetchDashboard = useCallback(async (authToken: string) => {
    const res = await fetch(`/api/panel/${slug}`, {
      headers: { "X-Store-Token": authToken },
    });
    if (!res.ok) throw new Error("Sesión inválida");
    const data = (await res.json()) as {
      store: StoreData;
      theme: StoreTheme;
      products: SerializedProduct[];
      blogPosts: BlogPost[];
      pages: StorePageItem[];
    };
    setStore(data.store);
    setTheme(data.theme);
    setProducts(data.products);
    setBlogPosts(data.blogPosts);
    setPages(data.pages);
  }, [slug]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const sessionToken = getStoreAdminSession(slug);
      if (!sessionToken) {
        if (!cancelled) {
          setError("Necesitas iniciar sesión para administrar esta tienda.");
          setLoading(false);
        }
        return;
      }
      setToken(sessionToken);
      try {
        await fetchDashboard(sessionToken);
      } catch {
        if (!cancelled) setError("No pudimos cargar tu tienda. Inicia sesión de nuevo.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [slug, fetchDashboard]);

  const refresh = async () => {
    if (token) await fetchDashboard(token);
  };

  const handleLogout = () => {
    clearStoreAdminSession(slug);
    window.location.href = "/panel";
  };

  const handleThemeSave = async (updates: Record<string, string>) => {
    if (!token) return;
    const res = await fetch(`/api/panel/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "X-Store-Token": token },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("No se pudo guardar");
    await refresh();
  };

  const handleProfileSave = async (data: StoreProfileData) => {
    if (!token) return;
    const res = await fetch(`/api/panel/${slug}/perfil`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "X-Store-Token": token },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("No se pudo guardar el perfil");
    await refresh();
  };

  const handleProductSave = async (product: {
    id?: string;
    name: string;
    origin: string;
    description: string;
    pricePerKg: number;
    score?: number | null;
    process: string;
    variety: string;
    type: "verde" | "tostado" | "maquila";
    profile: string[];
    altitude: string;
    imageUrl?: string;
    published: boolean;
  }) => {
    if (!token) return;
    const isEdit = Boolean(product.id);
    const url = isEdit ? `/api/panel/${slug}/productos/${product.id}` : `/api/panel/${slug}/productos`;
    const res = await fetch(url, {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json", "X-Store-Token": token },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("No se pudo guardar el producto");
    setShowProductForm(false);
    setEditingProduct(null);
    await refresh();
  };

  const handleDeleteProduct = async (id: string) => {
    if (!token || !confirm("¿Eliminar este producto?")) return;
    await fetch(`/api/panel/${slug}/productos/${id}`, { method: "DELETE", headers: { "X-Store-Token": token } });
    await refresh();
  };

  const togglePublished = async (product: SerializedProduct) => {
    if (!token) return;
    await fetch(`/api/panel/${slug}/productos/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "X-Store-Token": token },
      body: JSON.stringify({ published: !product.published }),
    });
    await refresh();
  };

  if (loading) return <p className="text-center py-20 text-foreground/60">Cargando tu tienda...</p>;

  if (error || !store || !theme || !token) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-foreground/70">{error || "Sesión requerida"}</p>
        <Link href="/panel" className="inline-block px-6 py-3 bg-coffee text-white rounded-full font-semibold">Iniciar sesión</Link>
      </div>
    );
  }

  const tabs: [Tab, string][] = [
    ["productos", "Productos"],
    ["apariencia", "Apariencia"],
    ["perfil", "Perfil y ubicación"],
    ["blog", "Blog"],
    ["paginas", "Páginas"],
    ["seguridad", "Seguridad"],
  ];

  const profileInitial: StoreProfileData = {
    storeName: store.storeName,
    ownerName: store.ownerName,
    phone: store.phone ?? "",
    country: store.country,
    city: store.city ?? "",
    specialty: store.specialty,
    description: store.description ?? "",
    logoUrl: store.logoUrl ?? "",
    coverImageUrl: store.coverImageUrl ?? "",
    physicalAddress: store.physicalAddress ?? "",
    physicalCity: store.physicalCity ?? "",
    physicalCountry: store.physicalCountry ?? "",
    purchaseLocations: store.purchaseLocations ?? [],
    socialLinks: store.socialLinks ?? {},
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-coffee">{store.storeName}</h1>
          <p className="text-sm text-foreground/60">Coffee Shop avanzado · comisión 8% por venta</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link href={`/tiendas/${slug}`} target="_blank" className="px-4 py-2 border border-cream rounded-full text-sm font-semibold text-coffee hover:bg-cream">
            Ver tienda pública
          </Link>
          <button type="button" onClick={handleLogout} className="px-4 py-2 text-sm text-foreground/60 hover:text-coffee">Cerrar sesión</button>
        </div>
      </div>

      {!store.security.setupComplete && (
        <SecuritySetupPanel
          slug={slug}
          token={token}
          hasPassword={store.security.hasPassword}
          emailVerified={store.security.emailVerified}
          email={store.email}
          onComplete={() => void refresh()}
        />
      )}

      <div className="flex flex-wrap gap-2 border-b border-cream pb-2">
        {tabs.map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${tab === key ? "bg-coffee text-white" : "text-coffee hover:bg-cream"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "productos" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-foreground/60">Agrega fotos por URL. Visibles en tu tienda y el catálogo central.</p>
            <button type="button" onClick={() => { setEditingProduct(null); setShowProductForm(true); }} className="px-5 py-2 bg-green text-white rounded-full text-sm font-semibold">+ Nuevo producto</button>
          </div>
          {showProductForm && (
            <StoreProductForm initial={editingProduct ?? undefined} onSave={handleProductSave} onCancel={() => { setShowProductForm(false); setEditingProduct(null); }} />
          )}
          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.id} className="flex gap-4 p-4 bg-white border border-cream rounded-xl">
                {p.imageUrl && <img src={p.imageUrl} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />}
                <div className="flex-1">
                  <h3 className="font-semibold text-coffee">{p.name}</h3>
                  <p className="text-sm text-foreground/60">${p.pricePerKg}/kg · {p.type}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button type="button" onClick={() => togglePublished(p)} className="px-3 py-1.5 text-xs border border-cream rounded-full">{p.published ? "Ocultar" : "Publicar"}</button>
                  <button type="button" onClick={() => { setEditingProduct(p); setShowProductForm(true); }} className="px-3 py-1.5 text-xs border border-cream rounded-full">Editar</button>
                  <button type="button" onClick={() => void handleDeleteProduct(p.id)} className="px-3 py-1.5 text-xs text-red-600 border border-red-100 rounded-full">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "apariencia" && <StoreThemeEditor theme={theme} storeName={store.storeName} onSave={handleThemeSave} />}
      {tab === "perfil" && <StoreProfileEditor initial={profileInitial} onSave={handleProfileSave} />}
      {tab === "blog" && <StoreBlogManager slug={slug} token={token} initialPosts={blogPosts} onRefresh={refresh} />}
      {tab === "paginas" && <StorePagesManager slug={slug} token={token} initialPages={pages} onRefresh={refresh} />}
      {tab === "seguridad" && (
        <SecuritySetupPanel slug={slug} token={token} hasPassword={store.security.hasPassword} emailVerified={store.security.emailVerified} email={store.email} onComplete={() => void refresh()} />
      )}
    </div>
  );
}
