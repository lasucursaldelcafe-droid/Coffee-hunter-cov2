import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { RetailReportForm } from "@/components/RetailReportForm";
import { CommissionBanner } from "@/components/CommissionBanner";
import Link from "next/link";
import { formatCommissionRate } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Panel del vendedor",
  description: "Gestiona tu tienda, reportes retail y ventas en Colombia Green Coffee.",
};

export default function PanelPage() {
  return (
    <div className="py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeading
          eyebrow="Panel vendedor"
          title="Tu operación en un solo lugar"
          description={`Comisión ${formatCommissionRate()} por venta · sin suscripción. Reporta ventas retail para alimentar datos de mercado y mejorar tu visibilidad.`}
        />

        <CommissionBanner />

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "Ventas", desc: "Comisión descontada al concretar cada pedido", icon: "💰" },
            { title: "Retail", desc: "Reporta kg, canal y precio por periodo", icon: "📊" },
            { title: "Tienda", desc: "Perfil profesional visible para compradores", icon: "🏪" },
          ].map((card) => (
            <div key={card.title} className="p-5 rounded-2xl border border-cream bg-white">
              <span className="text-2xl mb-2 block" aria-hidden>{card.icon}</span>
              <h3 className="font-display font-bold text-coffee">{card.title}</h3>
              <p className="text-sm text-foreground/65 mt-1">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-cream p-6 sm:p-8 shadow-sm">
          <h2 className="font-display text-xl font-bold text-coffee mb-2">
            Reporte de ventas retail
          </h2>
          <p className="text-sm text-foreground/60 mb-6">
            Datos agregados para mapas de demanda, precios y canales. Información confidencial por tienda.
          </p>
          <RetailReportForm />
        </div>

        <p className="text-center text-sm text-foreground/50">
          ¿Aún no tienes tienda?{" "}
          <Link href="/crear-tienda" className="text-green font-semibold hover:underline">
            Crear tienda gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
