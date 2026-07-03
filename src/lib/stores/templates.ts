import type { ButtonStyle } from "@/lib/stores/theme";

export type StoreTemplateId =
  | "advanced"
  | "casa_del_cafe"
  | "pergamino"
  | "tropicalia"
  | "starbucks"
  | "juan_valdez";

export type HeroVariant = "gradient" | "minimal" | "bold" | "heritage" | "corporate";
export type NavVariant = "pill" | "underline" | "bar";
export type CardVariant = "soft" | "bordered" | "elevated" | "flat";

export interface TemplateThemeDefaults {
  themePrimaryColor: string;
  themeAccentColor: string;
  themeBackgroundColor: string;
  themeButtonStyle: ButtonStyle;
}

export interface StoreTemplatePreset {
  id: StoreTemplateId;
  label: string;
  tagline: string;
  description: string;
  available: true;
  theme: TemplateThemeDefaults;
  layout: {
    heroVariant: HeroVariant;
    navVariant: NavVariant;
    cardVariant: CardVariant;
    logoShape: "rounded" | "circle" | "square";
    headingClass: string;
  };
}

export const STORE_TEMPLATE_PRESETS: Record<StoreTemplateId, StoreTemplatePreset> = {
  advanced: {
    id: "advanced",
    label: "Coffee Shop avanzado",
    tagline: "Marketplace profesional",
    description: "Layout flexible con hero gradiente, ideal para cualquier coffee shop.",
    available: true,
    theme: {
      themePrimaryColor: "#68190e",
      themeAccentColor: "#2d5a27",
      themeBackgroundColor: "#f7e9e0",
      themeButtonStyle: "pill",
    },
    layout: {
      heroVariant: "gradient",
      navVariant: "pill",
      cardVariant: "soft",
      logoShape: "rounded",
      headingClass: "font-display",
    },
  },
  casa_del_cafe: {
    id: "casa_del_cafe",
    label: "Casa del Café · Prisma",
    tagline: "Tradición colombiana",
    description: "Tonos cálidos madera y crema, estilo acogedor tipo Casa del Café.",
    available: true,
    theme: {
      themePrimaryColor: "#4A2C2A",
      themeAccentColor: "#D4A574",
      themeBackgroundColor: "#FAF6F1",
      themeButtonStyle: "rounded",
    },
    layout: {
      heroVariant: "heritage",
      navVariant: "underline",
      cardVariant: "bordered",
      logoShape: "circle",
      headingClass: "font-display tracking-tight",
    },
  },
  pergamino: {
    id: "pergamino",
    label: "Pergamino",
    tagline: "Especialidad minimalista",
    description: "Estética pergamino y tipografía limpia, inspirada en cafés de origen.",
    available: true,
    theme: {
      themePrimaryColor: "#2C2416",
      themeAccentColor: "#C4A77D",
      themeBackgroundColor: "#F5F0E8",
      themeButtonStyle: "square",
    },
    layout: {
      heroVariant: "minimal",
      navVariant: "underline",
      cardVariant: "flat",
      logoShape: "square",
      headingClass: "font-serif tracking-wide",
    },
  },
  tropicalia: {
    id: "tropicalia",
    label: "Tropicalia",
    tagline: "Vibrante y moderno",
    description: "Colores tropicales audaces para marcas jóvenes y experiencias sensoriales.",
    available: true,
    theme: {
      themePrimaryColor: "#FF6B35",
      themeAccentColor: "#004E64",
      themeBackgroundColor: "#FFF8F0",
      themeButtonStyle: "pill",
    },
    layout: {
      heroVariant: "bold",
      navVariant: "bar",
      cardVariant: "elevated",
      logoShape: "rounded",
      headingClass: "font-display uppercase tracking-wider",
    },
  },
  starbucks: {
    id: "starbucks",
    label: "Starbucks-style",
    tagline: "Corporativo global",
    description: "Verde icónico, fondo claro y navegación tipo barra — estilo cadena internacional.",
    available: true,
    theme: {
      themePrimaryColor: "#00704A",
      themeAccentColor: "#1E3932",
      themeBackgroundColor: "#F2F0EB",
      themeButtonStyle: "rounded",
    },
    layout: {
      heroVariant: "corporate",
      navVariant: "bar",
      cardVariant: "elevated",
      logoShape: "circle",
      headingClass: "font-display font-bold",
    },
  },
  juan_valdez: {
    id: "juan_valdez",
    label: "Juan Valdez-style",
    tagline: "Orgullo cafetero",
    description: "Rojo característico y marrón café, identidad colombiana de exportación.",
    available: true,
    theme: {
      themePrimaryColor: "#C8102E",
      themeAccentColor: "#3D2314",
      themeBackgroundColor: "#FFF5F0",
      themeButtonStyle: "rounded",
    },
    layout: {
      heroVariant: "heritage",
      navVariant: "pill",
      cardVariant: "bordered",
      logoShape: "rounded",
      headingClass: "font-display",
    },
  },
};

export const STORE_TEMPLATES = Object.values(STORE_TEMPLATE_PRESETS);

export function resolveTemplateId(raw: string | null | undefined): StoreTemplateId {
  if (raw && raw in STORE_TEMPLATE_PRESETS) {
    return raw as StoreTemplateId;
  }
  return "advanced";
}

export function getTemplatePreset(id: string | null | undefined): StoreTemplatePreset {
  return STORE_TEMPLATE_PRESETS[resolveTemplateId(id)];
}

export function getTemplateThemeDefaults(id: StoreTemplateId): TemplateThemeDefaults {
  return STORE_TEMPLATE_PRESETS[id].theme;
}

export function logoShapeClass(shape: StoreTemplatePreset["layout"]["logoShape"]): string {
  if (shape === "circle") return "rounded-full";
  if (shape === "square") return "rounded-lg";
  return "rounded-2xl";
}

export function cardWrapperClass(variant: CardVariant): string {
  if (variant === "flat") return "bg-transparent border-b border-cream/80";
  if (variant === "bordered") return "bg-white border-2 border-cream/80";
  if (variant === "elevated") return "bg-white shadow-lg border-0";
  return "bg-white border border-cream";
}

export function navItemClass(
  variant: NavVariant,
  active: boolean,
  primaryColor: string,
  btnRadius: string,
): { className: string; style?: { color?: string; borderColor?: string; backgroundColor?: string } } {
  if (variant === "underline") {
    return {
      className: `px-2 py-2 text-sm font-semibold border-b-2 transition-colors ${
        active ? "border-current" : "border-transparent text-foreground/60 hover:text-coffee"
      }`,
      style: active ? { color: primaryColor, borderColor: primaryColor } : undefined,
    };
  }
  if (variant === "bar") {
    return {
      className: `px-4 py-2 text-sm font-semibold ${btnRadius} transition-colors ${
        active ? "text-white" : "text-foreground/70 hover:bg-white/50"
      }`,
      style: active ? { backgroundColor: primaryColor } : undefined,
    };
  }
  return {
    className: `px-4 py-2 text-sm font-semibold ${btnRadius} transition-colors ${
      active ? "text-white" : "text-coffee bg-white/70 hover:bg-white"
    }`,
    style: active ? { backgroundColor: primaryColor } : undefined,
  };
}
