import Link from "next/link";

export interface PublicStoreCardData {
  slug: string;
  storeName: string;
  ownerName: string;
  country: string;
  city?: string | null;
  specialty: string;
  description?: string | null;
  productCount?: number;
}

interface PublicStoreCardProps {
  store: PublicStoreCardData;
}

export function PublicStoreCard({ store }: PublicStoreCardProps) {
  const location = store.city ? `${store.city}, ${store.country}` : store.country;

  return (
    <article className="group bg-white rounded-2xl border border-cream overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="h-32 bg-gradient-to-br from-green/20 to-cream relative">
        <div className="absolute bottom-4 left-4">
          <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center">
            <span className="text-xl font-bold text-coffee">{store.storeName.charAt(0)}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display text-lg font-bold text-coffee mb-1">{store.storeName}</h3>
        <p className="text-sm text-foreground/60 mb-3">
          {store.ownerName} · {location}
        </p>
        <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
          {store.description || store.specialty}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-xs text-foreground/60">
            {store.productCount !== undefined && <span>{store.productCount} productos</span>}
            {store.productCount !== undefined && <span> · </span>}
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
