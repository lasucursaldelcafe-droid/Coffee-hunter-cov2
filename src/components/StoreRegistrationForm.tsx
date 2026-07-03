"use client";

import { useState } from "react";
import { businessTypes, retailChannels } from "@/lib/platform";
import { formatCommissionRate } from "@/lib/platform";
import { submitStoreRegistration } from "@/lib/stores/submit-client";
import { saveStoreAdminSession } from "@/lib/stores/session";

interface StoreRegistrationFormProps {
  mode?: "full" | "compact";
}

const STEPS = ["Tu tienda", "Perfil comercial", "Confirmar"];

export function StoreRegistrationForm({ mode = "full" }: StoreRegistrationFormProps) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [panelUrl, setPanelUrl] = useState("/panel");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    storeName: "",
    ownerName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    businessType: "tostador",
    specialty: "",
    retailChannel: "",
    monthlyVolumeKg: "",
    description: "",
    acceptCommission: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const canContinueStep0 =
    form.storeName && form.ownerName && form.email && form.country;
  const canContinueStep1 =
    form.businessType && form.specialty && form.retailChannel;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.acceptCommission) {
      setError("Debes aceptar el modelo de comisión por venta");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await submitStoreRegistration({
        storeName: form.storeName,
        ownerName: form.ownerName,
        email: form.email,
        phone: form.phone,
        country: form.country,
        city: form.city,
        specialty: form.specialty,
        businessType: form.businessType,
        retailChannel: form.retailChannel,
        monthlyVolumeKg: form.monthlyVolumeKg
          ? Number(form.monthlyVolumeKg)
          : undefined,
        description: form.description,
        acceptCommission: true,
      });
      if (result) {
        saveStoreAdminSession(result.slug, result.adminToken);
        setPanelUrl(result.panelUrl);
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
          ¡Tu tienda está lista!
        </h3>
        <p className="text-foreground/70 max-w-md mx-auto mb-6">
          <strong>{form.storeName}</strong> ya está activa. Administra productos, colores y textos
          desde tu panel. Tus productos aparecerán también en el catálogo principal.
        </p>
        <a
          href={panelUrl}
          className="inline-block px-6 py-3 bg-coffee text-white font-semibold rounded-full hover:bg-coffee-dark transition-colors"
        >
          Ir a mi panel de administración
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {mode === "full" && (
        <div className="flex items-center justify-between gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1 flex flex-col items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  i <= step
                    ? "bg-green text-white"
                    : "bg-cream text-foreground/40"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-xs text-center hidden sm:block ${
                  i === step ? "text-coffee font-semibold" : "text-foreground/50"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      )}

      {step === 0 && (
        <div className="space-y-4 animate-fade-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nombre de tu tienda *" id="storeName">
              <input
                id="storeName"
                name="storeName"
                required
                value={form.storeName}
                onChange={handleChange}
                placeholder="Ej: Café del Origén"
                className={inputClass}
              />
            </Field>
            <Field label="Tu nombre *" id="ownerName">
              <input
                id="ownerName"
                name="ownerName"
                required
                value={form.ownerName}
                onChange={handleChange}
                placeholder="Nombre completo"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Correo electrónico *" id="email">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className={inputClass}
              />
            </Field>
            <Field label="Teléfono / WhatsApp" id="phone">
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+57 300 123 4567"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="País *" id="country">
              <input
                id="country"
                name="country"
                required
                value={form.country}
                onChange={handleChange}
                placeholder="Colombia, Alemania..."
                className={inputClass}
              />
            </Field>
            <Field label="Ciudad" id="city">
              <input
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Bogotá, Medellín..."
                className={inputClass}
              />
            </Field>
          </div>

          <button
            type="button"
            onClick={() => setStep(1)}
            disabled={!canContinueStep0}
            className={btnPrimary}
          >
            Continuar
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4 animate-fade-up">
          <Field label="Tipo de negocio *" id="businessType">
            <select
              id="businessType"
              name="businessType"
              required
              value={form.businessType}
              onChange={handleChange}
              className={inputClass}
            >
              {businessTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Canal principal de venta *" id="retailChannel">
            <select
              id="retailChannel"
              name="retailChannel"
              required
              value={form.retailChannel}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Selecciona tu canal</option>
              {retailChannels.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Especialidad de tu tienda *" id="specialty">
            <select
              id="specialty"
              name="specialty"
              required
              value={form.specialty}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Selecciona una opción</option>
              <option value="Café verde para tostadores">Café verde para tostadores</option>
              <option value="Café tostado retail">Café tostado retail</option>
              <option value="Microlotes de altura">Microlotes de altura</option>
              <option value="Variedades exóticas">Variedades exóticas</option>
              <option value="Marca propia / Maquila">Marca propia / Maquila</option>
              <option value="Distribución internacional">Distribución internacional</option>
            </select>
          </Field>

          <Field label="Volumen mensual estimado (kg)" id="monthlyVolumeKg">
            <input
              id="monthlyVolumeKg"
              name="monthlyVolumeKg"
              type="number"
              min={0}
              value={form.monthlyVolumeKg}
              onChange={handleChange}
              placeholder="Ej: 500"
              className={inputClass}
            />
          </Field>

          <Field label="Cuéntanos sobre tu proyecto" id="description">
            <textarea
              id="description"
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="¿Qué vendes, a quién y en qué mercados?"
              className={`${inputClass} resize-none`}
            />
          </Field>

          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(0)} className={btnSecondary}>
              Atrás
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!canContinueStep1}
              className={btnPrimary}
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-fade-up">
          <div className="rounded-xl bg-cream/60 p-5 space-y-3 text-sm">
            <SummaryRow label="Tienda" value={form.storeName} />
            <SummaryRow label="Contacto" value={`${form.ownerName} · ${form.email}`} />
            <SummaryRow label="Ubicación" value={`${form.city ? `${form.city}, ` : ""}${form.country}`} />
            <SummaryRow
              label="Modelo"
              value={`Comisión ${formatCommissionRate()} por venta · $0/mes`}
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border border-cream hover:border-green/30 transition-colors">
            <input
              type="checkbox"
              name="acceptCommission"
              checked={form.acceptCommission}
              onChange={handleChange}
              className="mt-1 w-4 h-4 accent-green"
            />
            <span className="text-sm text-foreground/80">
              Acepto el modelo de comisión fija del {formatCommissionRate()} sobre cada venta
              concretada. Entiendo que no hay cuota mensual ni costo por crear la tienda.
            </span>
          </label>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
          )}

          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)} className={btnSecondary}>
              Atrás
            </button>
            <button
              type="submit"
              disabled={loading || !form.acceptCommission}
              className={`flex-1 sm:flex-none ${btnPrimary} bg-green hover:bg-green-light`}
            >
              {loading ? "Registrando..." : "Crear mi tienda gratis"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-coffee mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-foreground/50">{label}</span>
      <span className="font-medium text-coffee text-right">{value}</span>
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green transition-shadow";

const btnPrimary =
  "px-8 py-3 bg-coffee text-white font-semibold rounded-full hover:bg-coffee-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

const btnSecondary =
  "px-6 py-3 border border-cream text-coffee font-semibold rounded-full hover:bg-cream transition-colors";
