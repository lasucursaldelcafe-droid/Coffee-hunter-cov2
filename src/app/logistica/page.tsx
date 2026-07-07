import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { logisticsServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Logística internacional",
  description:
    "Operadores logísticos para envío internacional de café verde, tostado y maquila de marca. Más de 15 países con certificados y cumplimiento aduanero.",
};

const iconMap: Record<string, React.ReactNode> = {
  ship: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15h18M5 15l-1-4h16l-1 4M7 11V7a2 2 0 012-2h6a2 2 0 012 2v4M9 19h6" />
    </svg>
  ),
  plane: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  package: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  network: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
};

const processSteps = [
  {
    step: "01",
    title: "Solicitud y cotización",
    description: "Indícanos origen, destino, tipo de café y volumen. Te enviamos cotización en 24 horas.",
  },
  {
    step: "02",
    title: "Documentación",
    description: "Gestionamos certificados fitosanitarios, permisos de importación y documentación aduanera.",
  },
  {
    step: "03",
    title: "Embarque",
    description: "Coordinamos con navieras, aerolíneas o transporte terrestre según destino y urgencia.",
  },
  {
    step: "04",
    title: "Seguimiento y entrega",
    description: "Tracking en tiempo real hasta la entrega. Operadores locales para última milla.",
  },
];

export default function LogisticaPage() {
  return (
    <>
      <section className="bg-slate text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Logística internacional"
            title="Operadores logísticos de café a todo el mundo"
            description="Enviamos café verde, tostado y productos de maquila a más de 15 países. Certificados, aduanas y cumplimiento regulatorio incluidos."
            light
          />
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {logisticsServices.map((service) => (
              <div
                key={service.id}
                className="p-8 bg-white rounded-2xl border border-cream hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 rounded-xl bg-cream flex items-center justify-center text-coffee mb-6">
                  {iconMap[service.icon]}
                </div>
                <h3 className="font-display text-xl font-bold text-coffee mb-3">
                  {service.title}
                </h3>
                <p className="text-foreground/70 mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.regions.map((region) => (
                    <span
                      key={region}
                      className="px-3 py-1 bg-green/10 text-green text-xs font-semibold rounded-full"
                    >
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Proceso"
            title="¿Cómo funciona?"
            description="De la bodega en Colombia a la puerta de tu cliente, en 4 pasos."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item) => (
              <div key={item.step} className="text-center p-6">
                <div className="text-4xl font-display font-bold text-green/30 mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-lg font-bold text-coffee mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            ¿Necesitas enviar café internacionalmente?
          </h2>
          <p className="text-white/80 mb-4">
            Contáctanos para una cotización personalizada. Verificamos los requisitos
            de importación de tu país antes de cada envío.
          </p>
          <p className="text-white/60 text-sm mb-8">
            ¿Gestión de envíos empresariales? Usa la app{" "}
            <a
              href="https://github.com/lasucursaldelcafe-droid/Programa-de-logistca"
              className="underline hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Programa Operativo
            </a>{" "}
            (repositorio separado).
          </p>
          <Link
            href="/crear-tienda"
            className="inline-block px-8 py-4 bg-white text-green font-semibold rounded-full hover:bg-cream transition-colors"
          >
            Solicitar cotización
          </Link>
        </div>
      </section>
    </>
  );
}
