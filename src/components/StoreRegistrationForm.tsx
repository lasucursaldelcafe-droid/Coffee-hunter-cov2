"use client";

import { useState } from "react";
import { storePlans } from "@/lib/data";

interface StoreRegistrationFormProps {
  mode?: "full" | "compact";
}

export function StoreRegistrationForm({ mode = "full" }: StoreRegistrationFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    storeName: "",
    ownerName: "",
    email: "",
    country: "",
    specialty: "",
    plan: "Starter",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/tiendas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Error al registrar la tienda");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6 bg-green/5 rounded-2xl border border-green/20">
        <div className="w-16 h-16 rounded-full bg-green text-white flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-coffee mb-3">
          ¡Tu tienda está en camino!
        </h3>
        <p className="text-foreground/70 max-w-md mx-auto">
          Hemos recibido tu solicitud para <strong>{form.storeName}</strong>.
          Te enviaremos un correo a <strong>{form.email}</strong> con los pasos para activar tu coffee shop.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {mode === "full" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {storePlans.map((plan) => (
            <label
              key={plan.name}
              className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${
                form.plan === plan.name
                  ? "border-green bg-green/5"
                  : "border-cream hover:border-green/30"
              } ${plan.highlighted ? "ring-2 ring-green/20" : ""}`}
            >
              <input
                type="radio"
                name="plan"
                value={plan.name}
                checked={form.plan === plan.name}
                onChange={handleChange}
                className="sr-only"
              />
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-green text-white text-xs font-semibold rounded-full">
                  Popular
                </span>
              )}
              <div className="text-center">
                <h4 className="font-display font-bold text-coffee">{plan.name}</h4>
                <p className="text-2xl font-bold text-coffee mt-1">
                  {plan.price === 0 ? "Gratis" : `$${plan.price}`}
                  {plan.price > 0 && <span className="text-sm font-normal text-foreground/50">/mes</span>}
                </p>
                <p className="text-xs text-foreground/60 mt-2">{plan.description}</p>
              </div>
            </label>
          ))}
        </div>
      )}

      {step === 1 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="storeName" className="block text-sm font-medium text-coffee mb-1.5">
                Nombre de tu coffee shop *
              </label>
              <input
                id="storeName"
                name="storeName"
                type="text"
                required
                value={form.storeName}
                onChange={handleChange}
                placeholder="Ej: Café del Origén"
                className="w-full px-4 py-3 rounded-xl border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green"
              />
            </div>
            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-coffee mb-1.5">
                Tu nombre *
              </label>
              <input
                id="ownerName"
                name="ownerName"
                type="text"
                required
                value={form.ownerName}
                onChange={handleChange}
                placeholder="Nombre completo"
                className="w-full px-4 py-3 rounded-xl border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-coffee mb-1.5">
                Correo electrónico *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 rounded-xl border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green"
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-coffee mb-1.5">
                País *
              </label>
              <input
                id="country"
                name="country"
                type="text"
                required
                value={form.country}
                onChange={handleChange}
                placeholder="Ej: Colombia, Alemania..."
                className="w-full px-4 py-3 rounded-xl border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            disabled={!form.storeName || !form.ownerName || !form.email || !form.country}
            className="w-full sm:w-auto px-8 py-3 bg-coffee text-white font-semibold rounded-full hover:bg-coffee-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-coffee mb-1.5">
              Especialidad de tu tienda *
            </label>
            <select
              id="specialty"
              name="specialty"
              required
              value={form.specialty}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green"
            >
              <option value="">Selecciona una opción</option>
              <option value="Café verde para tostadores">Café verde para tostadores</option>
              <option value="Café tostado retail">Café tostado retail</option>
              <option value="Microlotes de altura">Microlotes de altura</option>
              <option value="Variedades exóticas">Variedades exóticas</option>
              <option value="Marca propia / Maquila">Marca propia / Maquila</option>
              <option value="Distribución internacional">Distribución internacional</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-coffee mb-1.5">
              Cuéntanos sobre tu proyecto
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="¿Qué tipo de café ofrecerás? ¿A qué mercado te diriges?"
              className="w-full px-4 py-3 rounded-xl border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green resize-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-cream text-coffee font-semibold rounded-full hover:bg-cream transition-colors"
            >
              Atrás
            </button>
            <button
              type="submit"
              disabled={loading || !form.specialty}
              className="flex-1 sm:flex-none px-8 py-3 bg-green text-white font-semibold rounded-full hover:bg-green-light transition-colors disabled:opacity-50"
            >
              {loading ? "Registrando..." : "Crear mi coffee shop"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
