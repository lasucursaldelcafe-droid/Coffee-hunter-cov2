import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Maquila de marca",
  description:
    "Desarrollamos tu marca de café premium con perfiles únicos, empaque personalizado y distribución internacional. Lotes desde 50 kg.",
};

const maquilaFeatures = [
  {
    title: "Desarrollo de perfil",
    description:
      "Nuestros Q-Graders diseñan blends únicos adaptados a tu mercado. Desde notas florales hasta perfiles chocolateados.",
  },
  {
    title: "Tueste personalizado",
    description:
      "Perfiles de tueste a medida para espresso, filtro, cold brew o cualquier método. Consistencia lote a lote.",
  },
  {
    title: "Empaque y branding",
    description:
      "Diseño de empaque, etiquetas y presentación. Bolsa con válvula, caja o formato a granel según tu canal.",
  },
  {
    title: "Distribución global",
    description:
      "Producción en Colombia y envío internacional. Tu marca llega a cualquier país con nuestra red logística.",
  },
];

const maquilaSteps = [
  "Briefing: Cuéntanos tu visión, mercado y perfil deseado",
  "Muestras: Recibes 3-5 perfiles para cata y selección",
  "Desarrollo: Ajustamos el blend hasta tu aprobación",
  "Producción: Lotes mínimos desde 50 kg con trazabilidad",
  "Lanzamiento: Empaque, etiquetado y envío a tu destino",
];

export default function MaquilaPage() {
  return (
    <>
      <section className="bg-coffee text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Maquila de marca"
            title="Tu marca de café premium, hecha en Colombia"
            description="Desarrollamos marcas de café de alto puntaje con perfiles únicos. Desde el grano hasta el estante, con maquila completa y distribución internacional."
            light
          />
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {maquilaFeatures.map((feature) => (
              <div
                key={feature.title}
                className="p-8 rounded-2xl border border-cream hover:border-green/30 transition-colors"
              >
                <h3 className="font-display text-xl font-bold text-coffee mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-cream/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Proceso"
            title="De la idea a tu marca en 5 pasos"
          />

          <ol className="space-y-4">
            {maquilaSteps.map((step, index) => (
              <li
                key={step}
                className="flex items-start gap-4 p-4 bg-white rounded-xl border border-cream"
              >
                <span className="w-8 h-8 rounded-full bg-green text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {index + 1}
                </span>
                <span className="text-foreground/80 pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-coffee mb-4">
            ¿Tienes una idea para tu marca de café?
          </h2>
          <p className="text-foreground/70 mb-8">
            Agenda una consulta gratuita con nuestro equipo de desarrollo de producto.
          </p>
          <Link
            href="/crear-tienda"
            className="inline-block px-8 py-4 bg-coffee text-white font-semibold rounded-full hover:bg-coffee-dark transition-colors"
          >
            Iniciar proyecto de maquila
          </Link>
        </div>
      </section>
    </>
  );
}
