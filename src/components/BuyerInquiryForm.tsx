"use client";

import { useState } from "react";
import { retailChannels } from "@/lib/platform";

interface BuyerInquiryFormProps {
  productId: string;
  productName: string;
}

export function BuyerInquiryForm({ productId, productName }: BuyerInquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    buyerName: "",
    company: "",
    email: "",
    country: "",
    channel: "",
    volumeKg: "",
    message: "",
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
      const res = await fetch("/api/cotizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          productName,
          ...form,
          volumeKg: form.volumeKg ? Number(form.volumeKg) : undefined,
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
      <div className="rounded-2xl bg-green/5 border border-green/20 p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-green text-white flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-lg font-bold text-coffee mb-2">Solicitud enviada</h3>
        <p className="text-sm text-foreground/70">
          Un especialista te contactará con disponibilidad, muestras y logística para{" "}
          <strong>{productName}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-foreground/60 mb-2">
        Cotización profesional para compradores retail, HORECA y mayoristas.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="buyerName"
          required
          placeholder="Tu nombre *"
          value={form.buyerName}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="company"
          placeholder="Empresa / tienda"
          value={form.company}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="email"
          type="email"
          required
          placeholder="Correo *"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="country"
          required
          placeholder="País *"
          value={form.country}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <select
          name="channel"
          required
          value={form.channel}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Canal de compra *</option>
          {retailChannels.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          name="volumeKg"
          type="number"
          min="1"
          placeholder="Volumen estimado (kg)"
          value={form.volumeKg}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <textarea
        name="message"
        rows={3}
        placeholder="¿Qué perfil buscas, destino y plazos?"
        value={form.message}
        onChange={handleChange}
        className={`${inputClass} resize-none`}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={loading} className={btnPrimary}>
        {loading ? "Enviando..." : "Solicitar cotización"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green";

const btnPrimary =
  "w-full px-8 py-3.5 bg-coffee text-white font-semibold rounded-full hover:bg-coffee-dark transition-colors disabled:opacity-50";
