import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { StoreRegistrationForm } from "@/components/StoreRegistrationForm";
import { CommissionBanner } from "@/components/CommissionBanner";
import { storePlans } from "@/lib/data";

export const metadata: Metadata = {
  title: "Crear tu tienda — sin suscripción",
  description:
    "Monta tu coffee shop en Colombia Green Coffee. Comisión fija del 8% por venta, $0 de cuota mensual. Catálogo, logística y datos retail incluidos.",
};

export default function CrearTiendaPage() {
  const plan = storePlans[0];

  return (
    <div className="py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Vender en la plataforma"
          title="Tu tienda profesional, sin costo mensual"
          description="Regístrate gratis y paga solo un 8% fijo cuando vendes. Recolectamos datos retail para que tomes decisiones certeras en tu mercado."
        />

        <div className="mb-10">
          <CommissionBanner />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-6 rounded-2xl border border-green bg-green/5">
            <h3 className="font-display font-bold text-coffee text-lg mb-4">
              {plan.name}
            </h3>
            <ul className="space-y-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-foreground/75">
                  <svg className="w-4 h-4 text-green shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-cream bg-white">
            <h3 className="font-display font-bold text-coffee text-lg mb-4">
              Para compradores
            </h3>
            <ul className="space-y-2.5">
              {[
                "Catálogo con puntaje SCA y trazabilidad",
                "Cotización directa por producto",
                "Perfiles de taza verificados",
                "Logística internacional integrada",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/75">
                  <svg className="w-4 h-4 text-gold shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-cream shadow-sm p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-coffee mb-2">
            Alta de tienda
          </h2>
          <p className="text-sm text-foreground/60 mb-6">
            3 pasos · sin tarjeta · comisión solo al vender
          </p>
          <StoreRegistrationForm />
        </div>
      </div>
    </div>
  );
}
