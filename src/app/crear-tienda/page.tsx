import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/home/PageHero";
import { StoreRegistrationForm } from "@/components/StoreRegistrationForm";

export const metadata: Metadata = {
  title: "Crear tu coffee shop",
  description:
    "Inscríbete en Colombia Green Coffee y monta tu propia tienda de café. Comisión fija por venta, sin cuota mensual.",
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
  return (
    <>
      <PageHero
        eyebrow="Coffee Shop Marketplace"
        title="Crea tu coffee shop en minutos"
        description="Únete a la plataforma y vende café colombiano de especialidad. Sin suscripción — pagas solo cuando vendes."
        primaryCta={{ label: "Empezar abajo", href: "#registro" }}
        secondaryCta={{ label: "Ya tengo tienda", href: "/panel" }}
      />

      <section className="py-16 lg:py-20 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 lg:gap-14 mb-16">
            {benefits.map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-lg font-bold text-coffee mb-3">{item.title}</h3>
                <p className="text-trade-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
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
              Formulario de inscripción
            </h2>
            <p className="text-trade-muted text-sm">
              ¿Ya tienes cuenta?{" "}
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
