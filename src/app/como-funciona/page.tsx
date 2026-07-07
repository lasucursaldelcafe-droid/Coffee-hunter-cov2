import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/home/PageHero";
import { CommissionBanner } from "@/components/CommissionBanner";
import { ShopPaths } from "@/components/home/ShopPaths";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PlatformDifference } from "@/components/home/PlatformDifference";

export const metadata: Metadata = {
  title: "Cómo funciona",
  description:
    "Entiende el modelo de negocio de Colombia Green Coffee: marketplace de coffee shops, catálogo curado y comisión del 8% sin suscripción.",
};

const tradeComparison = [
  {
    trade: "Agrega 55+ tostadores independientes de EE.UU.",
    cgc: "Agrega coffee shops y marcas colombianas de especialidad",
  },
  {
    trade: "Quiz personalizado → suscripción recurrente",
    cgc: "Registro gratis → tienda propia + catálogo central",
  },
  {
    trade: "30 colecciones curadas por expertos",
    cgc: "Catálogo por origen, proceso y tipo (verde/tostado/maquila)",
  },
  {
    trade: "500+ cafés à la carte",
    cgc: "Microlotes de plataforma + productos de cada tienda",
  },
  {
    trade: "Envío tostado bajo demanda",
    cgc: "Logística internacional + maquila de marca",
  },
  {
    trade: "Ingresos: suscripción + margen producto",
    cgc: "Ingresos: 8% comisión por venta (sin mensualidad)",
  },
];

const actorFlows = [
  {
    role: "Comprador",
    steps: [
      "Explora el catálogo unificado (plataforma + tiendas)",
      "Filtra por origen, tipo o puntaje SCA",
      "Solicita cotización o compra en la tienda del vendedor",
      "Recibe con logística integrada si aplica",
    ],
  },
  {
    role: "Vendedor (coffee shop)",
    steps: [
      "Regístrate gratis en /crear-tienda",
      "Personaliza tu tienda (plantilla, productos, blog)",
      "Publicas productos visibles en tu tienda y el catálogo central",
      "Pagas 8% solo cuando concretas una venta",
    ],
  },
  {
    role: "Plataforma CGC",
    steps: [
      "Curación de catálogo base y verificación de tiendas",
      "Marketplace unificado y panel de administración",
      "Comisión del 8% por transacción",
      "Servicios adicionales: logística, maquila, datos retail",
    ],
  },
];

export default function ComoFuncionaPage() {
  return (
    <>
      <PageHero
        eyebrow="Modelo de negocio"
        title="Cómo funciona Colombia Green Coffee"
        description="Somos el Trade Coffee del café colombiano B2B: reunimos vendedores independientes, curamos calidad y conectamos compradores — sin suscripción para vender."
        primaryCta={{ label: "Crear mi tienda", href: "/crear-tienda" }}
        secondaryCta={{ label: "Ver catálogo", href: "/catalogo" }}
      />

      <section className="py-12 bg-warm">
        <div className="max-w-4xl mx-auto px-4">
          <CommissionBanner />
        </div>
      </section>

      <PlatformDifference />
      <HowItWorks />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow text-center">Paralelo con Trade Coffee</p>
          <h2 className="font-display text-3xl font-bold text-trade-ink text-center mb-12">
            Mismo modelo, mercado distinto
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="text-left py-4 pr-4 font-semibold text-trade-muted">Trade Coffee (B2C EE.UU.)</th>
                  <th className="text-left py-4 font-semibold text-coffee">Colombia Green Coffee (B2B global)</th>
                </tr>
              </thead>
              <tbody>
                {tradeComparison.map((row) => (
                  <tr key={row.trade} className="border-b border-black/5">
                    <td className="py-4 pr-4 text-trade-muted">{row.trade}</td>
                    <td className="py-4 text-coffee font-medium">{row.cgc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ShopPaths />

      <section className="py-16 lg:py-24 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow text-center">Flujos por actor</p>
          <h2 className="font-display text-3xl font-bold text-trade-ink text-center mb-12">
            Quién hace qué en la plataforma
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {actorFlows.map((actor) => (
              <article key={actor.role} className="trade-card p-8">
                <h3 className="font-display text-xl font-bold text-coffee mb-6">{actor.role}</h3>
                <ol className="space-y-4">
                  {actor.steps.map((step, i) => (
                    <li key={step} className="flex gap-3 text-sm text-trade-muted">
                      <span className="font-bold text-green shrink-0">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-trade-ink text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold mb-4">Listo para empezar</h2>
          <p className="text-white/75 mb-8">
            Lee el informe completo en <code className="text-gold">docs/06-MODELO-NEGOCIO.md</code> o crea tu tienda ahora.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/crear-tienda" className="btn-trade btn-trade-primary btn-trade-pill bg-white text-trade-ink hover:bg-cream">
              Crear coffee shop
            </Link>
            <Link href="/catalogo" className="btn-trade btn-trade-secondary btn-trade-pill text-white border-white/30 hover:bg-white/10">
              Explorar catálogo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
