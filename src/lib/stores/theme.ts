import type { CSSProperties } from "react";

export type ButtonStyle = "pill" | "rounded" | "square";

export interface StoreTheme {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  heroTitle: string;
  heroSubtitle: string;
  buttonStyle: ButtonStyle;
}

export const DEFAULT_STORE_THEME: StoreTheme = {
  primaryColor: "#68190e",
  accentColor: "#2d5a27",
  backgroundColor: "#f7e9e0",
  heroTitle: "",
  heroSubtitle: "",
  buttonStyle: "pill",
};

export function themeFromStore(store: {
  storeName: string;
  description?: string | null;
  themePrimaryColor?: string | null;
  themeAccentColor?: string | null;
  themeBackgroundColor?: string | null;
  themeHeroTitle?: string | null;
  themeHeroSubtitle?: string | null;
  themeButtonStyle?: string | null;
}): StoreTheme {
  return {
    primaryColor: store.themePrimaryColor || DEFAULT_STORE_THEME.primaryColor,
    accentColor: store.themeAccentColor || DEFAULT_STORE_THEME.accentColor,
    backgroundColor: store.themeBackgroundColor || DEFAULT_STORE_THEME.backgroundColor,
    heroTitle: store.themeHeroTitle || store.storeName,
    heroSubtitle: store.themeHeroSubtitle || store.description || "",
    buttonStyle: (store.themeButtonStyle as ButtonStyle) || "pill",
  };
}

export function themeToCssVars(theme: StoreTheme): CSSProperties {
  return {
    ["--store-primary" as string]: theme.primaryColor,
    ["--store-accent" as string]: theme.accentColor,
    ["--store-bg" as string]: theme.backgroundColor,
  };
}

export function buttonRadiusClass(style: ButtonStyle): string {
  if (style === "square") return "rounded-lg";
  if (style === "rounded") return "rounded-xl";
  return "rounded-full";
}
