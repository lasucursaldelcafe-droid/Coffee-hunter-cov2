"use client";

import { useState } from "react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  published: boolean;
}

interface StoreBlogManagerProps {
  slug: string;
  token: string;
  initialPosts: BlogPost[];
  onRefresh: () => Promise<void>;
}

export function StoreBlogManager({ slug, token, initialPosts, onRefresh }: StoreBlogManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", coverImageUrl: "", published: false });
  const [editingId, setEditingId] = useState<string | null>(null);

  const headers = { "Content-Type": "application/json", "X-Store-Token": token };

  const savePost = async () => {
    const url = editingId ? `/api/panel/${slug}/blog/${editingId}` : `/api/panel/${slug}/blog`;
    const res = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers,
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error("No se pudo guardar");
    setShowForm(false);
    setEditingId(null);
    setForm({ title: "", excerpt: "", content: "", coverImageUrl: "", published: false });
    await onRefresh();
  };

  const deletePost = async (id: string) => {
    if (!confirm("¿Eliminar entrada?")) return;
    await fetch(`/api/panel/${slug}/blog/${id}`, { method: "DELETE", headers });
    await onRefresh();
  };

  const startEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImageUrl: post.coverImageUrl,
      published: post.published,
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/60">Blog de tu coffee shop — visible en tu tienda pública.</p>
        <button type="button" onClick={() => { setShowForm(true); setEditingId(null); }} className="px-5 py-2 bg-green text-white rounded-full text-sm font-semibold">
          + Nueva entrada
        </button>
      </div>

      {showForm && (
        <div className="bg-cream/30 border border-cream rounded-2xl p-6 space-y-3">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Título" className={inputClass} />
          <input value={form.coverImageUrl} onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })} placeholder="URL imagen portada" className={inputClass} />
          <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Extracto" className={inputClass} />
          <textarea rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Contenido del artículo" className={`${inputClass} resize-none`} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Publicar
          </label>
          <div className="flex gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-cream rounded-full">Cancelar</button>
            <button type="button" onClick={() => void savePost()} className="px-4 py-2 bg-coffee text-white rounded-full">Guardar</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {initialPosts.map((post) => (
          <div key={post.id} className="flex gap-4 p-4 bg-white border border-cream rounded-xl">
            {post.coverImageUrl && (
              <img src={post.coverImageUrl} alt="" className="w-20 h-20 rounded-lg object-cover shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-coffee">{post.title}</h4>
              <p className="text-sm text-foreground/60 truncate">{post.excerpt || post.content.slice(0, 80)}</p>
              <span className={`text-xs ${post.published ? "text-green" : "text-foreground/40"}`}>
                {post.published ? "Publicado" : "Borrador"}
              </span>
            </div>
            <div className="flex gap-2 shrink-0">
              <button type="button" onClick={() => startEdit(post)} className="text-xs px-3 py-1 border border-cream rounded-full">Editar</button>
              <button type="button" onClick={() => void deletePost(post.id)} className="text-xs px-3 py-1 text-red-600 border border-red-100 rounded-full">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-cream bg-white";
