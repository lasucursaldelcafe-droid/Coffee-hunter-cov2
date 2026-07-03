"use client";

import { STORE_TEMPLATE_PRESETS, type StoreTemplateId } from "@/lib/stores/templates";

interface StoreTemplateSelectorProps {
  currentTemplate: string;
  onSelect: (templateId: StoreTemplateId) => void;
  disabled?: boolean;
}

export function StoreTemplateSelector({ currentTemplate, onSelect, disabled }: StoreTemplateSelectorProps) {
  const active = currentTemplate in STORE_TEMPLATE_PRESETS ? currentTemplate : "advanced";

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-display font-bold text-coffee">Plantilla visual</h3>
        <p className="text-sm text-foreground/60 mt-1">
          Elige el estilo de tu coffee shop. Al cambiar plantilla se aplican colores sugeridos (puedes ajustarlos después).
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(STORE_TEMPLATE_PRESETS).map((preset) => {
          const isActive = preset.id === active;
          return (
            <button
              key={preset.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(preset.id)}
              className={`text-left rounded-2xl border-2 overflow-hidden transition-all hover:shadow-md disabled:opacity-50 ${
                isActive ? "border-green shadow-md ring-2 ring-green/20" : "border-cream"
              }`}
            >
              <div
                className="h-20 p-4 flex flex-col justify-end text-white"
                style={{
                  background: `linear-gradient(135deg, ${preset.theme.themePrimaryColor}, ${preset.theme.themeAccentColor})`,
                }}
              >
                <span className="text-xs uppercase tracking-wide opacity-90">{preset.tagline}</span>
              </div>
              <div className="p-4 bg-white">
                <p className="font-semibold text-coffee text-sm">{preset.label}</p>
                <p className="text-xs text-foreground/55 mt-1 line-clamp-2">{preset.description}</p>
                <div className="flex gap-1.5 mt-3">
                  <span className="w-5 h-5 rounded-full border border-cream" style={{ backgroundColor: preset.theme.themePrimaryColor }} />
                  <span className="w-5 h-5 rounded-full border border-cream" style={{ backgroundColor: preset.theme.themeAccentColor }} />
                  <span className="w-5 h-5 rounded-full border border-cream" style={{ backgroundColor: preset.theme.themeBackgroundColor }} />
                </div>
                {isActive && (
                  <span className="inline-block mt-2 text-xs font-semibold text-green">Activa</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
