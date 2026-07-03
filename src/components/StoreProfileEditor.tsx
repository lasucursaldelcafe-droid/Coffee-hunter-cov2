"use client";

import { useState } from "react";
import type { PurchaseLocation, SocialLinks } from "@/lib/stores/social";
import { SocialLinksEditor } from "@/components/SocialLinksEditor";

export interface StoreProfileData {
  storeName: string;
  ownerName: string;
  phone: string;
  country: string;
  city: string;
  specialty: string;
  description: string;
  logoUrl: string;
  coverImageUrl: string;
  physicalAddress: string;
  physicalCity: string;
  physicalCountry: string;
  purchaseLocations: PurchaseLocation[];
  socialLinks: SocialLinks;
}

interface StoreProfileEditorProps {
  initial: StoreProfileData;
  onSave: (data: StoreProfileData) => Promise<void>;
}

export function StoreProfileEditor({ initial, onSave }: StoreProfileEditorProps) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const updateLocation = (index: number, field: keyof PurchaseLocation, value: string) => {
    setForm((f) => {
      const locations = [...f.purchaseLocations];
      locations[index] = { ...locations[index], [field]: value };
      return { ...f, purchaseLocations: locations };
    });
  };

  const addLocation = () => {
    setForm((f) => ({
      ...f,
      purchaseLocations: [...f.purchaseLocations, { name: "", address: "", url: "" }],
    }));
  };

  const removeLocation = (index: number) => {
    setForm((f) => ({
      ...f,
      purchaseLocations: f.purchaseLocations.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await onSave(form);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-4">
        <h3 className="font-display font-bold text-coffee">Información de la tienda</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nombre">
            <input value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Propietario">
            <input value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Teléfono">
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Especialidad">
            <input value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Logo (URL)">
            <input value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} placeholder="https://..." className={inputClass} />
          </Field>
          <Field label="Portada (URL)">
            <input value={form.coverImageUrl} onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })} placeholder="https://..." className={inputClass} />
          </Field>
        </div>
        <Field label="Descripción">
          <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputClass} resize-none`} />
        </Field>
      </section>

      <section className="space-y-4 border-t border-cream pt-8">
        <h3 className="font-display font-bold text-coffee">Punto físico principal</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Dirección">
            <input value={form.physicalAddress} onChange={(e) => setForm({ ...form, physicalAddress: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Ciudad">
            <input value={form.physicalCity} onChange={(e) => setForm({ ...form, physicalCity: e.target.value })} className={inputClass} />
          </Field>
          <Field label="País">
            <input value={form.physicalCountry} onChange={(e) => setForm({ ...form, physicalCountry: e.target.value })} className={inputClass} />
          </Field>
        </div>
      </section>

      <section className="space-y-4 border-t border-cream pt-8">
        <div className="flex justify-between items-center">
          <h3 className="font-display font-bold text-coffee">Dónde conseguir el café</h3>
          <button type="button" onClick={addLocation} className="text-sm text-green font-semibold">+ Punto de venta</button>
        </div>
        {form.purchaseLocations.map((loc, i) => (
          <div key={i} className="grid sm:grid-cols-3 gap-3 p-4 bg-cream/30 rounded-xl">
            <input value={loc.name} onChange={(e) => updateLocation(i, "name", e.target.value)} placeholder="Nombre" className={inputClass} />
            <input value={loc.address} onChange={(e) => updateLocation(i, "address", e.target.value)} placeholder="Dirección" className={inputClass} />
            <div className="flex gap-2">
              <input value={loc.url ?? ""} onChange={(e) => updateLocation(i, "url", e.target.value)} placeholder="URL (opcional)" className={`${inputClass} flex-1`} />
              <button type="button" onClick={() => removeLocation(i)} className="px-3 text-red-600 text-sm">×</button>
            </div>
          </div>
        ))}
      </section>

      <section className="border-t border-cream pt-8">
        <SocialLinksEditor
          links={form.socialLinks}
          onChange={(socialLinks) => setForm({ ...form, socialLinks })}
        />
      </section>

      <button type="submit" disabled={saving} className="px-6 py-3 bg-coffee text-white rounded-full font-semibold disabled:opacity-50">
        {saving ? "Guardando..." : "Guardar perfil completo"}
      </button>
      {saved && <p className="text-sm text-green">Perfil actualizado</p>}
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

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-green/30";
