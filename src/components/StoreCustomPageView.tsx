"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StoreThemeWrapper } from "@/components/StoreThemeWrapper";
import type { StoreTheme } from "@/lib/stores/theme";

interface PageProps {
  slug: string;
  pageSlug: string;
}

export function StoreCustomPageView({ slug, pageSlug }: PageProps) {
  const [page, setPage] = useState<{ title: string; content: string } | null>(null);
  const [theme, setTheme] = useState<StoreTheme | null>(null);
  const [storeName, setStoreName] = useState("");

  useEffect(() => {
    fetch(`/api/tiendas/${slug}`)
      .then((r) => r.json())
      .then((data: { theme: StoreTheme; store: { storeName: string }; pages: Array<{ slug: string; title: string; content: string }> }) => {
        setTheme(data.theme);
        setStoreName(data.store.storeName);
        setPage(data.pages.find((p) => p.slug === pageSlug) ?? null);
      });
  }, [slug, pageSlug]);

  if (!page || !theme) {
    return <p className="text-center py-20 text-foreground/60">Cargando...</p>;
  }

  return (
    <StoreThemeWrapper theme={theme} className="min-h-screen py-12">
      <article className="max-w-3xl mx-auto px-4">
        <Link href={`/tiendas/${slug}`} className="text-sm text-green mb-6 inline-block">← {storeName}</Link>
        <h1 className="font-display text-3xl font-bold text-coffee mb-6">{page.title}</h1>
        <div className="whitespace-pre-wrap text-foreground/80 leading-relaxed">{page.content}</div>
      </article>
    </StoreThemeWrapper>
  );
}
