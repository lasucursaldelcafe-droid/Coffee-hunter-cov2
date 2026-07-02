import Link from "next/link";
import type { CoffeeStore } from "@/lib/data";

const storeGradients: Record<string, string> = {
  origen: "from-green/30 to-green/10",
  berlin: "from-slate/30 to-slate/10",
  tokyo: "from-coffee/30 to-coffee/10",
  andes: "from-gold/30 to-gold/10",
};

interface StoreCardProps {
  store: CoffeeStore;
}

export function StoreCard({ store }: StoreCardProps) {
  const gradient = storeGradients[store.image] ?? "from-cream to-cream/50";

  return (
    <article className="group bg-white rounded-2xl border border-cream overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className={`h-32 bg-gradient-to-br ${gradient} relative`}>
        <div className="absolute bottom-4 left-4">
          <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center">
            <span className="text-xl font-bold text-coffee">
              {store.name.charAt(0)}
            </span>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full">
          <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-semibold text-coffee">{store.rating}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display text-lg font-bold text-coffee mb-1">{store.name}</h3>
        <p className="text-sm text-foreground/60 mb-3">
          {store.owner} · {store.country}
        </p>
        <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{store.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-xs text-foreground/60">
            <span>{store.products} productos</span>
            <span>·</span>
            <span>{store.specialty}</span>
          </div>
          <Link
            href={`/tiendas/${store.slug}`}
            className="text-sm font-semibold text-green hover:text-green-light transition-colors"
          >
            Visitar →
          </Link>
        </div>
      </div>
    </article>
  );
}
