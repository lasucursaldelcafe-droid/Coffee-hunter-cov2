"use client";

import { SOCIAL_PLATFORMS, type SocialLinks } from "@/lib/stores/social";

interface SocialLinksEditorProps {
  links: SocialLinks;
  onChange: (links: SocialLinks) => void;
}

export function SocialLinksEditor({ links, onChange }: SocialLinksEditorProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="font-display font-bold text-coffee">Redes sociales</h3>
        {SOCIAL_PLATFORMS.map((platform) => (
          <div key={platform.key}>
            <label className="block text-sm font-medium text-coffee mb-1">{platform.label}</label>
            <input
              type="url"
              value={links[platform.key] ?? ""}
              onChange={(e) => onChange({ ...links, [platform.key]: e.target.value })}
              placeholder={platform.placeholder}
              className="w-full px-4 py-2.5 rounded-xl border border-cream bg-white text-sm"
            />
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-display font-bold text-coffee mb-4">Vista previa</h3>
        <div className="bg-white border border-cream rounded-2xl p-6 space-y-3">
          {SOCIAL_PLATFORMS.filter((p) => links[p.key]).length === 0 && (
            <p className="text-sm text-foreground/50">Agrega enlaces para ver la vista previa</p>
          )}
          {SOCIAL_PLATFORMS.filter((p) => links[p.key]).map((platform) => (
            <a
              key={platform.key}
              href={links[platform.key]}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-cream hover:bg-cream/50 transition-colors"
            >
              <span className="w-10 h-10 rounded-full bg-coffee/10 flex items-center justify-center text-coffee font-bold text-sm">
                {platform.label.charAt(0)}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-coffee text-sm">{platform.label}</p>
                <p className="text-xs text-foreground/50 truncate">{links[platform.key]}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
