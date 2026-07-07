import Link from "next/link";
import type { CoffeeProduct } from "@/lib/data";

const typeLabels = {
  verde: "Café verde",
  tostado: "Café tostado",
  maquila: "Maquila",
};

const typeColors = {
  verde: "bg-green/10 text-green",
  tostado: "bg-coffee/10 text-coffee",
  maquila: "bg-gold/20 text-coffee-dark",
};

interface CoffeeCardProps {
  product: CoffeeProduct;
}

export function CoffeeCard({ product }: CoffeeCardProps) {
  return (
    <article className="group trade-card hover:shadow-xl transition-all duration-300">
      <div className="h-48 bg-gradient-to-br from-cream to-cream/50 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-coffee/10 flex items-center justify-center">
            <svg className="w-12 h-12 text-coffee/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.5 3H6c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 3.96.12 7.22-3.06 7.22-7v-1h.5c1.38 0 2.5-1.12 2.5-2.5S19.88 3 18.5 3zM16 10V5h2.5c.28 0 .5.22.5.5S18.78 6 18.5 6H16v4z" />
            </svg>
          </div>
        </div>
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[product.type]}`}>
            {typeLabels[product.type]}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full">
          <span className="text-sm font-bold text-coffee">{product.score}</span>
          <span className="text-xs text-foreground/50"> pts</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-display text-lg font-bold text-coffee group-hover:text-green transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-foreground/60">{product.origin} · {product.altitude}</p>
          </div>
        </div>

        <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{product.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.profile.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-cream text-xs text-coffee rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-cream">
          <div>
            <span className="text-2xl font-bold text-coffee">${product.pricePerKg}</span>
            <span className="text-sm text-foreground/50"> /kg</span>
          </div>
          <Link
            href={`/catalogo/${product.id}`}
            className="px-4 py-2 bg-coffee text-white text-sm font-semibold rounded-full hover:bg-coffee-dark transition-colors"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}
