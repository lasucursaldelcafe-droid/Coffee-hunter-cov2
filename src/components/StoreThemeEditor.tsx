"use client";

import { useState } from "react";
import type { StoreTheme, ButtonStyle } from "@/lib/stores/theme";
import { StoreTemplateSelector } from "@/components/StoreTemplateSelector";
import { getTemplateThemeDefaults, type StoreTemplateId } from "@/lib/stores/templates";

interface StoreThemeEditorProps {
  theme: StoreTheme;
  storeName: string;
  storeTemplate: string;
  onSave: (updates: Record<string, string>) => Promise<void>;
}

export function StoreThemeEditor({ theme, storeName, storeTemplate, onSave }: StoreThemeEditorProps) {
  const [template, setTemplate] = useState(storeTemplate);
  const [form, setForm] = useState({
    themePrimaryColor: theme.primaryColor,
    themeAccentColor: theme.accentColor,
    themeBackgroundColor: theme.backgroundColor,
    themeHeroTitle: theme.heroTitle || storeName,
    themeHeroSubtitle: theme.heroSubtitle,
    themeButtonStyle: theme.buttonStyle,
    description: theme.heroSubtitle,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleTemplateSelect = async (templateId: StoreTemplateId) => {
    setTemplate(templateId);
    const defaults = getTemplateThemeDefaults(templateId);
    const updated = {
      ...form,
      themePrimaryColor: defaults.themePrimaryColor,
      themeAccentColor: defaults.themeAccentColor,
      themeBackgroundColor: defaults.themeBackgroundColor,
      themeButtonStyle: defaults.themeButtonStyle,
    };
    setForm(updated);
    setSaving(true);
    setSaved(false);
    try {
      await onSave({
        storeTemplate: templateId,
        themePrimaryColor: defaults.themePrimaryColor,
        themeAccentColor: defaults.themeAccentColor,
        themeBackgroundColor: defaults.themeBackgroundColor,
        themeButtonStyle: defaults.themeButtonStyle,
        themeHeroTitle: updated.themeHeroTitle,
        themeHeroSubtitle: updated.themeHeroSubtitle,
        description: updated.description,
      });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await onSave({ ...form, storeTemplate: template });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-10">
      <StoreTemplateSelector
        currentTemplate={template}
        onSelect={(id) => void handleTemplateSelect(id)}
        disabled={saving}
      />

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8 border-t border-cream pt-8">
        <div className="space-y-4">
          <h3 className="font-display font-bold text-coffee">Personalizar colores y textos</h3>

          <ColorField label="Color principal" value={form.themePrimaryColor} onChange={(v) => setForm((f) => ({ ...f, themePrimaryColor: v }))} />
          <ColorField label="Color de acento" value={form.themeAccentColor} onChange={(v) => setForm((f) => ({ ...f, themeAccentColor: v }))} />
          <ColorField label="Fondo de la tienda" value={form.themeBackgroundColor} onChange={(v) => setForm((f) => ({ ...f, themeBackgroundColor: v }))} />

          <div>
            <label className="block text-sm font-medium text-coffee mb-1.5">Forma de botones</label>
            <select
              value={form.themeButtonStyle}
              onChange={(e) => setForm((f) => ({ ...f, themeButtonStyle: e.target.value as ButtonStyle }))}
              className="w-full px-4 py-3 rounded-xl border border-cream bg-white"
            >
              <option value="pill">Redondeados (pill)</option>
              <option value="rounded">Esquinas suaves</option>
              <option value="square">Cuadrados</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee mb-1.5">Título del hero</label>
            <input value={form.themeHeroTitle} onChange={(e) => setForm((f) => ({ ...f, themeHeroTitle: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-cream bg-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee mb-1.5">Subtítulo / descripción</label>
            <textarea
              rows={3}
              value={form.themeHeroSubtitle}
              onChange={(e) => setForm((f) => ({ ...f, themeHeroSubtitle: e.target.value, description: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-cream bg-white resize-none"
            />
          </div>

          <button type="submit" disabled={saving} className="px-6 py-3 bg-coffee text-white rounded-full font-semibold disabled:opacity-50">
            {saving ? "Guardando..." : "Guardar apariencia"}
          </button>
          {saved && <p className="text-sm text-green">Cambios guardados</p>}
        </div>

        <div>
          <h3 className="font-display font-bold text-coffee mb-4">Vista previa</h3>
          <div className="rounded-2xl border border-cream overflow-hidden" style={{ backgroundColor: form.themeBackgroundColor }}>
            <div className="p-8 text-white" style={{ background: `linear-gradient(135deg, ${form.themePrimaryColor}, ${form.themeAccentColor})` }}>
              <h4 className="font-display text-2xl font-bold">{form.themeHeroTitle || storeName}</h4>
              <p className="mt-2 opacity-90 text-sm">{form.themeHeroSubtitle || "Tu tienda de café"}</p>
            </div>
            <div className="p-6">
              <button
                type="button"
                style={{ backgroundColor: form.themePrimaryColor }}
                className={`px-6 py-2 text-white text-sm font-semibold ${
                  form.themeButtonStyle === "pill" ? "rounded-full" : form.themeButtonStyle === "rounded" ? "rounded-xl" : "rounded-lg"
                }`}
              >
                Ver productos
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-coffee mb-1.5">{label}</label>
      <div className="flex gap-3 items-center">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-12 h-12 rounded-lg border border-cream cursor-pointer" />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-cream bg-white font-mono text-sm" />
      </div>
    </div>
  );
}
