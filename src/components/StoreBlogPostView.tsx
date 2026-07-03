"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StoreThemeWrapper } from "@/components/StoreThemeWrapper";
import type { StoreTheme } from "@/lib/stores/theme";

interface PageProps {
  slug: string;
  postSlug: string;
}

export function StoreBlogPostView({ slug, postSlug }: PageProps) {
  const [post, setPost] = useState<{ title: string; content: string; excerpt: string; coverImageUrl: string } | null>(null);
  const [theme, setTheme] = useState<StoreTheme | null>(null);
  const [storeName, setStoreName] = useState("");

  useEffect(() => {
    fetch(`/api/tiendas/${slug}`)
      .then((r) => r.json())
      .then((data: { theme: StoreTheme; store: { storeName: string }; blogPosts: Array<{ slug: string; title: string; content: string; excerpt: string; coverImageUrl: string }> }) => {
        setTheme(data.theme);
        setStoreName(data.store.storeName);
        setPost(data.blogPosts.find((p) => p.slug === postSlug) ?? null);
      });
  }, [slug, postSlug]);

  if (!post || !theme) {
    return <p className="text-center py-20 text-foreground/60">Cargando...</p>;
  }

  return (
    <StoreThemeWrapper theme={theme} className="min-h-screen py-12">
      <article className="max-w-3xl mx-auto px-4">
        <Link href={`/tiendas/${slug}`} className="text-sm text-green mb-6 inline-block">← {storeName}</Link>
        {post.coverImageUrl && <img src={post.coverImageUrl} alt="" className="w-full h-64 object-cover rounded-2xl mb-8" />}
        <h1 className="font-display text-3xl font-bold text-coffee mb-4">{post.title}</h1>
        {post.excerpt && <p className="text-lg text-foreground/70 mb-6">{post.excerpt}</p>}
        <div className="prose prose-coffee whitespace-pre-wrap text-foreground/80 leading-relaxed">{post.content}</div>
      </article>
    </StoreThemeWrapper>
  );
}
