import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/home/PageHero";
import { curatedCollections } from "@/lib/marketplace/collections";

export const metadata: Metadata = {
  title: "Colecciones curadas",
  description:
    "Colecciones editoriales de café colombiano de especialidad: Huila Gesha, variedades exóticas, verde para tostadores y más.",
};

export default function ColeccionesPage() {
  return (
    <>
      <PageHero
        eyebrow="Curación editorial"
        title="Colecciones curadas"
        description="Selecciones temáticas inspiradas en el modelo Trade Coffee, adaptadas al mercado B2B de café colombiano."
        primaryCta={{ label: "Encuentra tu café", href: "/encuentra-tu-cafe" }}
        secondaryCta={{ label: "Catálogo completo", href: "/catalogo" }}
        compact
      />

      <div className="py-12 lg:py-16 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {curatedCollections.map((collection) => (
              <Link
                key={collection.slug}
                href={`/catalogo/coleccion/${collection.slug}`}
                className="group trade-card p-8 flex flex-col"
              >
                <span className="inline-block self-start px-3 py-1 bg-green/10 text-green text-xs font-bold uppercase tracking-wide rounded-full mb-4">
                  {collection.badge}
                </span>
                <h2 className="font-display text-xl font-bold text-coffee mb-2 group-hover:text-green transition-colors">
                  {collection.title}
                </h2>
                <p className="text-sm font-medium text-trade-muted mb-3">{collection.subtitle}</p>
                <p className="text-sm text-trade-muted leading-relaxed flex-1">{collection.description}</p>
                <span className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-green group-hover:gap-3 transition-all">
                  Explorar colección
                  <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
