import Link from "next/link";
import { origins } from "@/lib/data";

export function OriginMarquee() {
  const cities = origins.map((o) => o.name);
  const doubled = [...cities, ...cities];

  return (
    <section className="py-20 lg:py-28 bg-trade-ink text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Tu pasaporte al mejor café colombiano
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
          Descubre algo nuevo con cada lote o encuentra un favorito y repítelo. Del origen al mundo.
        </p>
        <Link href="/catalogo" className="btn-trade btn-trade-primary btn-trade-pill bg-white text-trade-ink hover:bg-cream">
          Explorar catálogo
        </Link>
      </div>

      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((city, i) => (
            <span
              key={`${city}-${i}`}
              className="mx-8 text-2xl sm:text-3xl font-display font-bold text-white/30"
            >
              {city}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
