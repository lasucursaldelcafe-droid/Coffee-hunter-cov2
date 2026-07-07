import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/home/PageHero";
import { origins } from "@/lib/data";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Colombia Green Coffee conecta productores colombianos de café de especialidad con el mundo.",
};

const values = [
  {
    title: "Obsesión por la calidad",
    description: "Cada café con puntaje SCA y trazabilidad. No vendemos commodity.",
  },
  {
    title: "Comunidad cafetera",
    description: "Impulsamos coffee shops independientes como Trade impulsa tostadores locales.",
  },
  {
    title: "Comercio directo",
    description: "Relaciones con productores en Huila, Cauca, Tolima, Nariño y más.",
  },
  {
    title: "Plataforma abierta",
    description: "Cualquier tostador o marca monta su tienda sin suscripción mensual.",
  },
];

const stats = [
  { value: "85+", label: "Puntaje SCA mínimo" },
  { value: "15+", label: "Países de envío" },
  { value: "8%", label: "Comisión por venta" },
  { value: "$0", label: "Cuota mensual" },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nuestra historia"
        title="Café elegido por gente que vive el café"
        description="Como Trade Coffee descubre tostadores ocultos en EE.UU., nosotros reunimos los mejores coffee shops y microlotes colombianos en un solo lugar — para que descubras cafés que no encontrarías solo."
        primaryCta={{ label: "Cómo funciona", href: "/como-funciona" }}
        secondaryCta={{ label: "Explorar catálogo", href: "/catalogo" }}
      />

      <section className="py-12 bg-warm border-b border-black/5">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-bold text-coffee">{stat.value}</p>
              <p className="text-sm text-trade-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-eyebrow">La diferencia CGC</p>
              <h2 className="font-display text-3xl font-bold text-trade-ink mb-6 leading-tight">
                Hay café excepcional en Colombia si sabes dónde buscar
              </h2>
              <p className="text-trade-muted leading-relaxed mb-4">
                Está en las fincas de altura, en los tostadores que conocen a sus productores
                y en las marcas que cuentan una historia con cada lote. Esa magia merece
                llegar más lejos.
              </p>
              <p className="text-trade-muted leading-relaxed">
                Creamos una plataforma integral: catálogo central, tiendas independientes,
                logística internacional y maquila de marca. Sin suscripción — solo comisión
                cuando vendes.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((value) => (
                <div key={value.title} className="trade-card p-5">
                  <h3 className="font-display font-bold text-coffee mb-2 text-sm">{value.title}</h3>
                  <p className="text-xs text-trade-muted leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow text-center">Orígenes</p>
          <h2 className="font-display text-3xl font-bold text-trade-ink text-center mb-12">
            Regiones donde operamos
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {origins.map((origin) => (
              <div key={origin.name} className="trade-card p-5">
                <h3 className="font-display font-bold text-coffee">{origin.name}</h3>
                <p className="text-sm text-trade-muted mt-1">{origin.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-trade-ink text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold mb-4">Únete a la plataforma</h2>
          <p className="text-white/75 mb-8">
            Tostador, distribuidor o emprendedor — monta tu coffee shop y vende al mundo.
          </p>
          <Link href="/crear-tienda" className="btn-trade btn-trade-primary btn-trade-pill bg-white text-trade-ink hover:bg-cream">
            Crear mi coffee shop
          </Link>
        </div>
      </section>
    </>
  );
}
