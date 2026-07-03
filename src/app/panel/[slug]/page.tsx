import type { Metadata } from "next";
import { StoreAdminDashboard } from "@/components/StoreAdminDashboard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = {
  title: "Administrar tienda",
};

export default async function StorePanelPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <div className="py-12 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <StoreAdminDashboard slug={slug} />
      </div>
    </div>
  );
}
