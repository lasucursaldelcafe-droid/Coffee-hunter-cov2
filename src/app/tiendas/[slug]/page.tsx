import type { Metadata } from "next";
import { StorePublicView } from "@/components/StorePublicView";
import { getStoreBySlug } from "@/lib/stores/register";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = await getStoreBySlug(slug);
  if (!store) return { title: "Tienda no encontrada" };
  return {
    title: store.storeName,
    description: store.description ?? store.specialty,
  };
}

export default async function TiendaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <StorePublicView slug={slug} />;
}
