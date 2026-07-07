import Link from "next/link";
import { StoreCard } from "@/components/StoreCard";
import type { CoffeeStore } from "@/lib/data";

interface StoreSpotlightProps {
  stores: CoffeeStore[];
}

export function StoreSpotlight({ stores }: StoreSpotlightProps) {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-xl">
            <span className="section-eyebrow">Spotlight de tiendas</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-trade-ink leading-tight">
              Coffee shops que orgullosamente impulsamos
            </h2>
            <p className="text-trade-muted mt-4 leading-relaxed">
              Tostadores y marcas independientes que conocen a sus productores, cuidan cada lote
              y comparten su pasión en cada taza.
            </p>
          </div>
          <Link
            href="/tiendas"
            className="btn-trade btn-trade-secondary btn-trade-pill shrink-0 self-start sm:self-auto"
          >
            Ver todas las tiendas
          </Link>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto snap-x snap-mandatory scrollbar-hide">
        {stores.map((store) => (
          <div key={store.id} className="min-w-[300px] sm:min-w-[340px] snap-start shrink-0">
            <StoreCard store={store} />
          </div>
        ))}
      </div>
    </section>
  );
}
