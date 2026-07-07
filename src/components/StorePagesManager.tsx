"use client";

import { useState } from "react";

interface StorePageItem {
  id: string;
  slug: string;
  navLabel: string;
  title: string;
  content: string;
  published: boolean;
  sortOrder: number;
}

interface StorePagesManagerProps {
  slug: string;
  token: string;
  initialPages: StorePageItem[];
  onRefresh: () => Promise<void>;
}

export function StorePagesManager({ slug, token, initialPages, onRefresh }: StorePagesManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ navLabel: "", title: "", content: "", published: false, sortOrder: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);

  const headers = { "Content-Type": "application/json", "X-Store-Token": token };

  const savePage = async () => {
    const url = editingId ? `/api/panel/${slug}/paginas/${editingId}` : `/api/panel/${slug}/paginas`;
    const res = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers,
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error("No se pudo guardar");
    setShowForm(false);
    setEditingId(null);
    setForm({ navLabel: "", title: "", content: "", published: false, sortOrder: 0 });
    await onRefresh();
  };

  const deletePage = async (id: string) => {
    if (!confirm("¿Eliminar página?")) return;
    await fetch(`/api/panel/${slug}/paginas/${id}`, { method: "DELETE", headers });
    await onRefresh();
  };

  const startEdit = (page: StorePageItem) => {
    setEditingId(page.id);
    setForm({
      navLabel: page.navLabel,
      title: page.title,
      content: page.content,
      published: page.published,
      sortOrder: page.sortOrder,
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/60">
          Crea páginas dentro de tu tienda (ej: Nosotros, Menú, Eventos). Aparecen en la navegación pública.
        </p>
        <button type="button" onClick={() => { setShowForm(true); setEditingId(null); }} className="px-5 py-2 bg-green text-white rounded-full text-sm font-semibold">
          + Nueva página
        </button>
      </div>

      {showForm && (
        <div className="bg-cream/30 border border-cream rounded-2xl p-6 space-y-3">
          <input value={form.navLabel} onChange={(e) => setForm({ ...form, navLabel: e.target.value })} placeholder="Etiqueta menú (ej: Nosotros)" className={inputClass} />
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Título de la página" className={inputClass} />
          <textarea rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Contenido" className={`${inputClass} resize-none`} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Publicar
          </label>
          <div className="flex gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-cream rounded-full">Cancelar</button>
            <button type="button" onClick={() => void savePage()} className="px-4 py-2 bg-coffee text-white rounded-full">Guardar</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {initialPages.map((page) => (
          <div key={page.id} className="flex justify-between items-center p-4 bg-white border border-cream rounded-xl">
            <div>
              <h4 className="font-semibold text-coffee">{page.navLabel} — {page.title}</h4>
              <p className="text-xs text-foreground/50">/tiendas/{slug}/pagina/{page.slug}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => startEdit(page)} className="text-xs px-3 py-1 border border-cream rounded-full">Editar</button>
              <button type="button" onClick={() => void deletePage(page.id)} className="text-xs px-3 py-1 text-red-600 border border-red-100 rounded-full">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-cream bg-white";
