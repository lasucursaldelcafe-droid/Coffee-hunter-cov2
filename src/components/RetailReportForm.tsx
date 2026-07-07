"use client";

import { useState } from "react";
import { retailChannels } from "@/lib/platform";

export function RetailReportForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    storeEmail: "",
    storeName: "",
    periodMonth: new Date().toISOString().slice(0, 7),
    channel: "",
    productName: "",
    unitsSold: "",
    kgSold: "",
    avgPriceUsd: "",
    city: "",
    region: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/retail/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          unitsSold: form.unitsSold ? Number(form.unitsSold) : undefined,
          kgSold: Number(form.kgSold),
          avgPriceUsd: form.avgPriceUsd ? Number(form.avgPriceUsd) : undefined,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Error al enviar");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl bg-green/5 border border-green/20 p-6 text-center">
        <p className="font-semibold text-coffee mb-1">Reporte registrado</p>
        <p className="text-sm text-foreground/70">
          Tus datos retail alimentan el mapa de mercado de la plataforma.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="storeName"
          required
          placeholder="Nombre de la tienda *"
          value={form.storeName}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="storeEmail"
          type="email"
          required
          placeholder="Correo de la tienda *"
          value={form.storeEmail}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="periodMonth"
          type="month"
          required
          value={form.periodMonth}
          onChange={handleChange}
          className={inputClass}
        />
        <select
          name="channel"
          required
          value={form.channel}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Canal de venta *</option>
          {retailChannels.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <input
        name="productName"
        required
        placeholder="Producto vendido *"
        value={form.productName}
        onChange={handleChange}
        className={inputClass}
      />

      <div className="grid sm:grid-cols-3 gap-4">
        <input
          name="kgSold"
          type="number"
          step="0.1"
          min="0.1"
          required
          placeholder="Kg vendidos *"
          value={form.kgSold}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="unitsSold"
          type="number"
          min="0"
          placeholder="Unidades"
          value={form.unitsSold}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="avgPriceUsd"
          type="number"
          step="0.01"
          min="0"
          placeholder="Precio prom. USD/kg"
          value={form.avgPriceUsd}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="city"
          placeholder="Ciudad"
          value={form.city}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="region"
          placeholder="Región / departamento"
          value={form.region}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <textarea
        name="notes"
        rows={2}
        placeholder="Notas (opcional)"
        value={form.notes}
        onChange={handleChange}
        className={`${inputClass} resize-none`}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={loading} className={btnPrimary}>
        {loading ? "Enviando..." : "Enviar reporte retail"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green";

const btnPrimary =
  "w-full sm:w-auto px-8 py-3 bg-green text-white font-semibold rounded-full hover:bg-green-light transition-colors disabled:opacity-50";
