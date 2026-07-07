import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/home/PageHero";

export const metadata: Metadata = {
  title: "Maquila de marca",
  description:
    "Desarrollamos tu marca de café premium con perfiles únicos, empaque personalizado y distribución internacional.",
};

const maquilaFeatures = [
  {
    title: "Desarrollo de perfil",
    description:
      "Q-Graders diseñan blends únicos para tu mercado: floral, chocolateado o frutal.",
  },
  {
    title: "Tueste personalizado",
    description:
      "Espresso, filtro, cold brew. Consistencia lote a lote con trazabilidad completa.",
  },
  {
    title: "Empaque y branding",
    description:
      "Bolsa con válvula, caja o granel. Tu marca lista para estante o e-commerce.",
  },
  {
    title: "Distribución global",
    description:
      "Producción en Colombia y envío internacional con nuestra red logística.",
  },
];

const maquilaSteps = [
  "Briefing: visión, mercado y perfil deseado",
  "Muestras: 3–5 perfiles para cata",
  "Desarrollo: ajuste hasta tu aprobación",
  "Producción: lotes desde 50 kg",
  "Lanzamiento: empaque, etiquetado y envío",
];

export default function MaquilaPage() {
  return (
    <>
      <PageHero
        eyebrow="Maquila de marca"
        title="Tu marca de café premium, hecha en Colombia"
        description="Trade agrega tostadores independientes; nosotros creamos tu marca propia con perfiles únicos, empaque y distribución — como un roaster partner, pero con tu identidad."
        primaryCta={{ label: "Iniciar proyecto", href: "/crear-tienda" }}
        secondaryCta={{ label: "Cómo funciona", href: "/como-funciona" }}
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow text-center">Servicio completo</p>
          <h2 className="font-display text-3xl font-bold text-trade-ink text-center mb-12">
            Del grano al estante con tu nombre
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {maquilaFeatures.map((feature) => (
              <article key={feature.title} className="trade-card p-8">
                <h3 className="font-display text-xl font-bold text-coffee mb-3">{feature.title}</h3>
                <p className="text-trade-muted leading-relaxed">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-warm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow text-center">Proceso</p>
          <h2 className="font-display text-3xl font-bold text-trade-ink text-center mb-10">
            De la idea a tu marca en 5 pasos
          </h2>
          <ol className="space-y-4">
            {maquilaSteps.map((step, index) => (
              <li key={step} className="trade-card p-5 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-trade-ink text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {index + 1}
                </span>
                <span className="text-trade-muted text-sm pt-1 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-black/5 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-trade-ink mb-4">
            ¿Tienes una idea para tu marca?
          </h2>
          <p className="text-trade-muted mb-8">
            Regístrate en la plataforma y cuéntanos tu proyecto. Consulta inicial sin compromiso.
          </p>
          <Link href="/crear-tienda" className="btn-trade btn-trade-primary btn-trade-pill">
            Iniciar proyecto de maquila
          </Link>
        </div>
      </section>
    </>
  );
}
