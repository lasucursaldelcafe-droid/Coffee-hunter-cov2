import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/home/PageHero";
import { logisticsServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Logística internacional",
  description:
    "Operadores logísticos para envío internacional de café verde, tostado y maquila. Más de 15 países.",
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
    description: "Indícanos origen, destino, tipo de café y volumen. Cotización en 24 horas.",
  },
  {
    step: "02",
    title: "Documentación",
    description: "Certificados fitosanitarios, permisos de importación y aduanas.",
  },
  {
    step: "03",
    title: "Embarque",
    description: "Navieras, aerolíneas o transporte terrestre según destino.",
  },
  {
    step: "04",
    title: "Entrega",
    description: "Tracking en tiempo real. Operadores locales para última milla.",
  },
];

const trustPoints = [
  "15+ países de cobertura",
  "Certificados y cumplimiento aduanero",
  "Red de operadores aliados",
  "Trazabilidad lote a lote",
];

export default function LogisticaPage() {
  return (
    <>
      <PageHero
        eyebrow="Logística internacional"
        title="Del origen a la puerta de tu cliente"
        description="Como Trade entrega café tostado bajo demanda, nosotros movemos café verde, tostado y marcas de maquila con operadores certificados en todo el mundo."
        primaryCta={{ label: "Crear tienda con logística", href: "/crear-tienda" }}
        secondaryCta={{ label: "Ver catálogo", href: "/catalogo" }}
      />

      <section className="py-12 bg-warm border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-trade-muted">
            {trustPoints.map((point) => (
              <span key={point} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green" />
                {point}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow text-center">Servicios</p>
          <h2 className="font-display text-3xl font-bold text-trade-ink text-center mb-12">
            Operadores para cada tipo de envío
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {logisticsServices.map((service) => (
              <article key={service.id} className="trade-card p-8">
                <div className="w-14 h-14 rounded-xl bg-warm flex items-center justify-center text-coffee mb-6">
                  {iconMap[service.icon]}
                </div>
                <h3 className="font-display text-xl font-bold text-coffee mb-3">{service.title}</h3>
                <p className="text-trade-muted mb-4 leading-relaxed">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.regions.map((region) => (
                    <span key={region} className="px-3 py-1 bg-green/10 text-green text-xs font-semibold rounded-full">
                      {region}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow text-center">Proceso</p>
          <h2 className="font-display text-3xl font-bold text-trade-ink text-center mb-14">
            Cuatro pasos, de Colombia al mundo
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item) => (
              <div key={item.step}>
                <span className="text-4xl font-display font-bold text-coffee/15 block mb-3">{item.step}</span>
                <h3 className="font-display font-bold text-coffee mb-2">{item.title}</h3>
                <p className="text-sm text-trade-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-trade-ink text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold mb-4">¿Necesitas enviar café internacionalmente?</h2>
          <p className="text-white/75 mb-4">
            Las tiendas de la plataforma acceden a logística integrada. También cotizamos envíos puntuales.
          </p>
          <p className="text-white/50 text-sm mb-8">
            Gestión empresarial avanzada:{" "}
            <a
              href="https://github.com/lasucursaldelcafe-droid/Programa-de-logistca"
              className="underline hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Programa Operativo
            </a>
          </p>
          <Link href="/crear-tienda" className="btn-trade btn-trade-primary btn-trade-pill bg-white text-trade-ink hover:bg-cream">
            Solicitar acceso
          </Link>
        </div>
      </section>
    </>
  );
}
