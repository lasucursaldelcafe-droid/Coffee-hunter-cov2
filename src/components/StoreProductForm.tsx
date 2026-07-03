"use client";

import { useState } from "react";

interface ProductFormData {
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
  imageUrl?: string;
}

interface StoreProductFormProps {
  initial?: ProductFormData;
  onSave: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
}

export function StoreProductForm({ initial, onSave, onCancel }: StoreProductFormProps) {
  const [form, setForm] = useState<ProductFormData>({
    name: initial?.name ?? "",
    origin: initial?.origin ?? "Colombia",
    description: initial?.description ?? "",
    pricePerKg: initial?.pricePerKg ?? 0,
    score: initial?.score ?? undefined,
    process: initial?.process ?? "",
    variety: initial?.variety ?? "",
    type: initial?.type ?? "verde",
    profile: initial?.profile ?? [],
    altitude: initial?.altitude ?? "",
    imageUrl: initial?.imageUrl ?? "",
    published: initial?.published ?? true,
    id: initial?.id,
  });
  const [profileText, setProfileText] = useState((initial?.profile ?? []).join(", "));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onSave({
        ...form,
        profile: profileText
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-cream/30 border border-cream rounded-2xl p-6 space-y-4">
      <h3 className="font-display font-bold text-coffee">
        {initial?.id ? "Editar producto" : "Nuevo producto"}
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nombre *">
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputClass}
          />
        </Field>
        <Field label="Origen">
          <input
            value={form.origin}
            onChange={(e) => setForm((f) => ({ ...f, origin: e.target.value }))}
            className={inputClass}
          />
        </Field>
        <Field label="Precio USD/kg *">
          <input
            type="number"
            step="0.01"
            min="0.01"
            required
            value={form.pricePerKg || ""}
            onChange={(e) => setForm((f) => ({ ...f, pricePerKg: Number(e.target.value) }))}
            className={inputClass}
          />
        </Field>
        <Field label="Puntaje SCA">
          <input
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={form.score ?? ""}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                score: e.target.value ? Number(e.target.value) : null,
              }))
            }
            className={inputClass}
          />
        </Field>
        <Field label="Tipo">
          <select
            value={form.type}
            onChange={(e) =>
              setForm((f) => ({ ...f, type: e.target.value as ProductFormData["type"] }))
            }
            className={inputClass}
          >
            <option value="verde">Café verde</option>
            <option value="tostado">Café tostado</option>
            <option value="maquila">Maquila</option>
          </select>
        </Field>
        <Field label="Proceso">
          <input
            value={form.process}
            onChange={(e) => setForm((f) => ({ ...f, process: e.target.value }))}
            className={inputClass}
          />
        </Field>
        <Field label="Variedad">
          <input
            value={form.variety}
            onChange={(e) => setForm((f) => ({ ...f, variety: e.target.value }))}
            className={inputClass}
          />
        </Field>
        <Field label="Foto del producto (URL)">
          <input
            type="url"
            value={form.imageUrl ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
            placeholder="https://ejemplo.com/foto-cafe.jpg"
            className={inputClass}
          />
        </Field>
        <Field label="Altitud">
          <input
            value={form.altitude}
            onChange={(e) => setForm((f) => ({ ...f, altitude: e.target.value }))}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Perfil sensorial (separado por comas)">
        <input
          value={profileText}
          onChange={(e) => setProfileText(e.target.value)}
          placeholder="Floral, Cítrico, Dulce"
          className={inputClass}
        />
      </Field>

      <Field label="Descripción">
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className={`${inputClass} resize-none`}
        />
      </Field>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
          className="w-4 h-4 accent-green"
        />
        Publicar en marketplace y tienda pública
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button type="button" onClick={onCancel} className="px-5 py-2 border border-cream rounded-full">
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-coffee text-white rounded-full font-semibold disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Guardar producto"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-coffee mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-2.5 rounded-xl border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-green/30";
