import type { Metadata } from "next";
import { PageHero } from "@/components/home/PageHero";
import { CoffeeQuiz } from "@/components/CoffeeQuiz";

export const metadata: Metadata = {
  title: "Encuentra tu café",
  description:
    "Quiz B2B de 5 preguntas para recomendarte cafés colombianos de especialidad según tu perfil de comprador, volumen y presupuesto.",
};

export default function EncuentraTuCafePage() {
  return (
    <>
      <PageHero
        eyebrow="Matching inteligente"
        title="Encuentra tu café"
        description="Responde 5 preguntas sobre tu negocio y te recomendamos productos y colecciones del catálogo — como el quiz de Trade Coffee, adaptado a compradores B2B."
        primaryCta={{ label: "Ver colecciones", href: "/catalogo/coleccion" }}
        secondaryCta={{ label: "Catálogo completo", href: "/catalogo" }}
        compact
      />

      <div className="py-12 lg:py-16 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CoffeeQuiz />
        </div>
      </div>
    </>
  );
}
