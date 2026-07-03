import { StoreBlogPostView } from "@/components/StoreBlogPostView";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string; postSlug: string }>;
}

export default async function StoreBlogPostPage({ params }: PageProps) {
  const { slug, postSlug } = await params;
  return <StoreBlogPostView slug={slug} postSlug={postSlug} />;
}
