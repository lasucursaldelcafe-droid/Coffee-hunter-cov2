import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { StoreCard } from "@/components/StoreCard";
import { stores } from "@/lib/data";

export const metadata: Metadata = {
  title: "Coffee Shops",
  description:
    "Explora las coffee shops de nuestra plataforma. Tostadores, distribuidores y marcas de café de especialidad de todo el mundo.",
};

export default function TiendasPage() {
  return (
    <div className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Marketplace"
          title="Coffee Shops de la plataforma"
          description="Descubre tiendas creadas por tostadores, distribuidores y marcas que venden café colombiano de especialidad a través de Colombia Green Coffee."
        />

        <div className="flex justify-center mb-12">
          <Link
            href="/crear-tienda"
            className="px-8 py-4 bg-green text-white font-semibold rounded-full hover:bg-green-light transition-colors"
          >
            + Crear mi coffee shop
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </div>
    </div>
  );
}
