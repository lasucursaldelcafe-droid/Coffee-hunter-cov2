import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { StoreRegistrationForm } from "@/components/StoreRegistrationForm";
import { storePlans } from "@/lib/data";

export const metadata: Metadata = {
  title: "Crear tu coffee shop",
  description:
    "Inscríbete en Colombia Green Coffee y monta tu propia tienda de café. Accede a catálogo, logística internacional y maquila de marca.",
};

export default function CrearTiendaPage() {
  return (
    <div className="py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Coffee Shop Marketplace"
          title="Crea tu coffee shop en minutos"
          description="Únete a nuestra plataforma y vende café colombiano de especialidad. Elige tu plan, configura tu tienda y empieza a vender con logística internacional incluida."
        />

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {storePlans.map((plan) => (
            <div
              key={plan.name}
              className={`p-5 rounded-xl border ${
                plan.highlighted ? "border-green bg-green/5" : "border-cream"
              }`}
            >
              <h3 className="font-display font-bold text-coffee">{plan.name}</h3>
              <p className="text-2xl font-bold text-coffee mt-1 mb-3">
                {plan.price === 0 ? "Gratis" : `$${plan.price}/mes`}
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground/70">
                    <svg className="w-4 h-4 text-green shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-cream p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-coffee mb-6">
            Formulario de inscripción
          </h2>
          <StoreRegistrationForm />
        </div>
      </div>
    </div>
  );
}
