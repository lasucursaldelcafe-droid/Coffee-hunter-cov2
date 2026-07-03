import { StoreCustomPageView } from "@/components/StoreCustomPageView";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string; pageSlug: string }>;
}

export default async function StoreCustomPage({ params }: PageProps) {
  const { slug, pageSlug } = await params;
  return <StoreCustomPageView slug={slug} pageSlug={pageSlug} />;
}
