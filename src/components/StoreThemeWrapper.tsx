"use client";

import type { CSSProperties, ReactNode } from "react";
import type { StoreTheme } from "@/lib/stores/theme";
import { themeToCssVars } from "@/lib/stores/theme";

interface StoreThemeWrapperProps {
  theme: StoreTheme;
  children: ReactNode;
  className?: string;
}

export function StoreThemeWrapper({ theme, children, className = "" }: StoreThemeWrapperProps) {
  const style: CSSProperties = {
    ...themeToCssVars(theme),
    backgroundColor: theme.backgroundColor,
  };

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
}
