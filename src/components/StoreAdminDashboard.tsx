"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { getStoreAdminSession, clearStoreAdminSession } from "@/lib/stores/session";
import type { StoreTheme } from "@/lib/stores/theme";
import { StoreThemeEditor } from "@/components/StoreThemeEditor";
import { StoreProductForm } from "@/components/StoreProductForm";

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
  published: boolean;
}

interface StoreData {
  slug: string;
  storeName: string;
  ownerName: string;
  email: string;
  description: string | null;
}

interface StoreAdminDashboardProps {
  slug: string;
}

type Tab = "productos" | "apariencia" | "tienda";

export function StoreAdminDashboard({ slug }: StoreAdminDashboardProps) {
  const [token, setToken] = useState<string | null>(null);
  const [store, setStore] = useState<StoreData | null>(null);
  const [theme, setTheme] = useState<StoreTheme | null>(null);
  const [products, setProducts] = useState<SerializedProduct[]>([]);
  const [tab, setTab] = useState<Tab>("productos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SerializedProduct | null>(null);

  const fetchDashboard = useCallback(async (authToken: string) => {
    const res = await fetch(`/api/panel/${slug}`, {
      headers: { "X-Store-Token": authToken },
    });
    if (!res.ok) {
      throw new Error("Sesión inválida");
    }
    const data = (await res.json()) as {
      store: StoreData;
      theme: StoreTheme;
      products: SerializedProduct[];
    };
    setStore(data.store);
    setTheme(data.theme);
    setProducts(data.products);
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
        if (!cancelled) {
          setError("No pudimos cargar tu tienda. Inicia sesión de nuevo.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug, fetchDashboard]);

  const handleLogout = () => {
    clearStoreAdminSession(slug);
    window.location.href = "/panel";
  };

  const handleThemeSave = async (updates: Record<string, string>) => {
    if (!token) return;
    const res = await fetch(`/api/panel/${slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Store-Token": token,
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("No se pudo guardar");
    await fetchDashboard(token);
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
    published: boolean;
  }) => {
    if (!token) return;
    const isEdit = Boolean(product.id);
    const url = isEdit
      ? `/api/panel/${slug}/productos/${product.id}`
      : `/api/panel/${slug}/productos`;
    const res = await fetch(url, {
      method: isEdit ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Store-Token": token,
      },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("No se pudo guardar el producto");
    setShowProductForm(false);
    setEditingProduct(null);
    await fetchDashboard(token);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!token || !confirm("¿Eliminar este producto?")) return;
    await fetch(`/api/panel/${slug}/productos/${id}`, {
      method: "DELETE",
      headers: { "X-Store-Token": token },
    });
    await fetchDashboard(token);
  };

  const togglePublished = async (product: SerializedProduct) => {
    if (!token) return;
    await fetch(`/api/panel/${slug}/productos/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Store-Token": token,
      },
      body: JSON.stringify({ published: !product.published }),
    });
    await fetchDashboard(token);
  };

  if (loading) {
    return <p className="text-center py-20 text-foreground/60">Cargando tu tienda...</p>;
  }

  if (error || !store || !theme || !token) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-foreground/70">{error || "Sesión requerida"}</p>
        <Link href="/panel" className="inline-block px-6 py-3 bg-coffee text-white rounded-full font-semibold">
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-coffee">{store.storeName}</h1>
          <p className="text-sm text-foreground/60">Panel de administración · comisión 8% por venta</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link
            href={`/tiendas/${slug}`}
            target="_blank"
            className="px-4 py-2 border border-cream rounded-full text-sm font-semibold text-coffee hover:bg-cream"
          >
            Ver tienda pública
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-foreground/60 hover:text-coffee"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-cream pb-2">
        {([
          ["productos", "Productos"],
          ["apariencia", "Apariencia"],
          ["tienda", "Mi tienda"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              tab === key ? "bg-coffee text-white" : "text-coffee hover:bg-cream"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "productos" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-foreground/60">
              Tus productos aparecen en tu tienda y en el catálogo principal de Colombia Green Coffee.
            </p>
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setShowProductForm(true);
              }}
              className="px-5 py-2 bg-green text-white rounded-full text-sm font-semibold hover:bg-green-light"
            >
              + Nuevo producto
            </button>
          </div>

          {showProductForm && (
            <StoreProductForm
              initial={editingProduct ?? undefined}
              onSave={handleProductSave}
              onCancel={() => {
                setShowProductForm(false);
                setEditingProduct(null);
              }}
            />
          )}

          {products.length === 0 && !showProductForm && (
            <div className="text-center py-12 bg-cream/40 rounded-2xl">
              <p className="text-foreground/60 mb-4">Aún no tienes productos publicados.</p>
              <button
                type="button"
                onClick={() => setShowProductForm(true)}
                className="px-6 py-3 bg-coffee text-white rounded-full font-semibold"
              >
                Agregar primer producto
              </button>
            </div>
          )}

          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white border border-cream rounded-xl"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-coffee">{p.name}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        p.published ? "bg-green/10 text-green" : "bg-cream text-foreground/50"
                      }`}
                    >
                      {p.published ? "Publicado" : "Borrador"}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/60">
                    ${p.pricePerKg}/kg · {p.origin} · {p.type}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => togglePublished(p)}
                    className="px-3 py-1.5 text-xs border border-cream rounded-full hover:bg-cream"
                  >
                    {p.published ? "Ocultar" : "Publicar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct(p);
                      setShowProductForm(true);
                    }}
                    className="px-3 py-1.5 text-xs border border-cream rounded-full hover:bg-cream"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(p.id)}
                    className="px-3 py-1.5 text-xs text-red-600 border border-red-100 rounded-full hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "apariencia" && (
        <StoreThemeEditor theme={theme} storeName={store.storeName} onSave={handleThemeSave} />
      )}

      {tab === "tienda" && (
        <div className="bg-white border border-cream rounded-2xl p-6 space-y-4 text-sm">
          <div className="grid sm:grid-cols-2 gap-4">
            <InfoRow label="Nombre" value={store.storeName} />
            <InfoRow label="Propietario" value={store.ownerName} />
            <InfoRow label="Email" value={store.email} />
            <InfoRow label="URL pública" value={`/tiendas/${slug}`} />
          </div>
          <p className="text-foreground/60 pt-4 border-t border-cream">
            Tu tienda está activa. Los compradores pueden ver tus productos en el marketplace central
            y en tu página personalizada con los colores y textos que configures.
          </p>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-foreground/50 block">{label}</span>
      <span className="font-medium text-coffee">{value}</span>
    </div>
  );
}
