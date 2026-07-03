import {
  formatCommissionRate,
  formatCommissionExample,
  PLATFORM_COMMISSION_PERCENT,
} from "@/lib/platform";

export function CommissionBanner() {
  const example = formatCommissionExample(1000);

  return (
    <div className="rounded-2xl border border-green/20 bg-gradient-to-br from-green/5 to-cream/50 p-6 sm:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <span className="inline-block px-3 py-1 bg-green text-white text-xs font-semibold rounded-full mb-3">
            Modelo transparente
          </span>
          <h3 className="font-display text-2xl font-bold text-coffee mb-2">
            {formatCommissionRate()} por venta · $0 de suscripción
          </h3>
          <p className="text-foreground/70 max-w-xl">
            Crear tu tienda es gratis. Solo cobramos una comisión fija del{" "}
            {PLATFORM_COMMISSION_PERCENT}% cuando concretas una venta. Sin sorpresas ni planes mensuales.
          </p>
        </div>

        <div className="shrink-0 bg-white rounded-xl border border-cream p-5 min-w-[220px] shadow-sm">
          <p className="text-xs uppercase tracking-wide text-foreground/50 mb-3">Ejemplo venta $1,000</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-foreground/60">Venta</span>
              <span className="font-semibold text-coffee">{example.sale}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/60">Comisión ({PLATFORM_COMMISSION_PERCENT}%)</span>
              <span className="font-semibold text-coffee">{example.commission}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-cream">
              <span className="font-medium text-coffee">Recibes</span>
              <span className="font-bold text-green text-lg">{example.net}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
