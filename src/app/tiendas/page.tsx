import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/home/PageHero";
import { StoreCard } from "@/components/StoreCard";
import { stores } from "@/lib/data";

export const metadata: Metadata = {
  title: "Coffee Shops",
  description:
    "Explora las coffee shops de nuestra plataforma. Tostadores, distribuidores y marcas de café de especialidad.",
};

export default function TiendasPage() {
  return (
    <>
      <PageHero
        eyebrow="Marketplace"
        title="Coffee shops de la plataforma"
        description="Tostadores, distribuidores y marcas independientes que venden café colombiano de especialidad a través de Colombia Green Coffee."
        primaryCta={{ label: "Crear mi coffee shop", href: "/crear-tienda" }}
        secondaryCta={{ label: "Explorar catálogo", href: "/catalogo" }}
        compact
      />

      <section className="py-12 lg:py-16 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <p className="text-sm text-trade-muted">
              {stores.length} tiendas destacadas en la plataforma
            </p>
            <Link href="/crear-tienda" className="btn-trade btn-trade-primary btn-trade-pill text-sm px-6 py-2.5 self-start">
              + Crear mi coffee shop
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {stores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-black/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-trade-ink mb-4">
            ¿Quieres aparecer aquí?
          </h2>
          <p className="text-trade-muted mb-8">
            Regístrate gratis, personaliza tu tienda y empieza a vender con comisión del 8% por venta.
          </p>
          <Link href="/crear-tienda" className="btn-trade btn-trade-primary btn-trade-pill">
            Crear mi tienda
          </Link>
        </div>
      </section>
    </>
  );
}
