import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/home/PageHero";
import { CommissionBanner } from "@/components/CommissionBanner";
import { StoreRegistrationForm } from "@/components/StoreRegistrationForm";
import { storePlans } from "@/lib/data";

export const metadata: Metadata = {
  title: "Crear tu tienda — sin suscripción",
  description:
    "Monta tu coffee shop en Colombia Green Coffee. Comisión fija del 8% por venta, $0 de cuota mensual. Catálogo, logística y datos retail incluidos.",
};

const benefits = [
  {
    title: "Tienda en minutos",
    description: "Página personalizada, plantillas visuales y panel de administración.",
  },
  {
    title: "Comisión transparente",
    description: "Solo 8% por venta concretada. Cero mensualidad.",
  },
  {
    title: "Catálogo + logística",
    description: "Acceso al marketplace central y operadores en 15+ países.",
  },
];

const steps = [
  "Completa el formulario con datos de tu negocio",
  "Personaliza apariencia y publica productos",
  "Comparte tu tienda y vende en el catálogo central",
];

export default function CrearTiendaPage() {
  const plan = storePlans[0];

  return (
    <>
      <PageHero
        eyebrow="Coffee Shop Marketplace"
        title="Tu tienda profesional, sin costo mensual"
        description="Regístrate gratis y paga solo un 8% fijo cuando vendes. Catálogo, logística y datos retail incluidos."
        primaryCta={{ label: "Empezar abajo", href: "#registro" }}
        secondaryCta={{ label: "Ya tengo tienda", href: "/panel" }}
      />

      <section className="py-12 lg:py-16 bg-white border-b border-black/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommissionBanner />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 lg:gap-14 mb-12">
            {benefits.map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-lg font-bold text-coffee mb-3">{item.title}</h3>
                <p className="text-trade-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="trade-card p-6 border-green/30 bg-green/5">
              <h3 className="font-display font-bold text-coffee text-lg mb-4">{plan.name}</h3>
              <ul className="space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-trade-muted">
                    <svg className="w-4 h-4 text-green shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="trade-card p-6">
              <h3 className="font-display font-bold text-coffee text-lg mb-4">Para compradores</h3>
              <ul className="space-y-2.5">
                {[
                  "Catálogo con puntaje SCA y trazabilidad",
                  "Cotización directa por producto",
                  "Perfiles de taza verificados",
                  "Logística internacional integrada",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-trade-muted">
                    <svg className="w-4 h-4 text-gold shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="trade-card p-8 lg:p-10 bg-warm border-0">
            <p className="section-eyebrow">Cómo funciona</p>
            <ol className="grid sm:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-trade-ink text-white text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-sm text-trade-muted leading-relaxed pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="registro" className="py-16 lg:py-20 bg-warm scroll-mt-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-trade-ink mb-3">
              Alta de tienda
            </h2>
            <p className="text-trade-muted text-sm">
              3 pasos · sin tarjeta · comisión solo al vender. ¿Ya tienes cuenta?{" "}
              <Link href="/panel" className="text-green font-semibold hover:underline">
                Entrar al panel
              </Link>
            </p>
          </div>

          <div className="trade-card p-6 sm:p-10">
            <StoreRegistrationForm />
          </div>
        </div>
      </section>
    </>
  );
}
