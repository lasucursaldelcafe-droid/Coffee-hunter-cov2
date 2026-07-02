import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stores } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return stores.map((store) => ({ slug: store.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = stores.find((s) => s.slug === slug);
  if (!store) return { title: "Tienda no encontrada" };
  return {
    title: store.name,
    description: store.description,
  };
}

export default async function TiendaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const store = stores.find((s) => s.slug === slug);

  if (!store) {
    notFound();
  }

  return (
    <div className="py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/tiendas" className="text-sm text-green hover:text-green-light mb-6 inline-block">
          ← Volver a coffee shops
        </Link>

        <div className="bg-white rounded-2xl border border-cream overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-green/20 to-cream flex items-end p-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
                <span className="text-3xl font-bold text-coffee">{store.name.charAt(0)}</span>
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-coffee">{store.name}</h1>
                <p className="text-foreground/60">{store.owner} · {store.country}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="px-4 py-2 bg-cream rounded-full text-sm">
                <span className="text-foreground/60">Especialidad:</span>{" "}
                <span className="font-semibold text-coffee">{store.specialty}</span>
              </div>
              <div className="px-4 py-2 bg-cream rounded-full text-sm">
                <span className="text-foreground/60">Productos:</span>{" "}
                <span className="font-semibold text-coffee">{store.products}</span>
              </div>
              <div className="px-4 py-2 bg-cream rounded-full text-sm flex items-center gap-1">
                <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-coffee">{store.rating}</span>
              </div>
            </div>

            <p className="text-foreground/70 leading-relaxed mb-8">{store.description}</p>

            <div className="bg-cream/50 rounded-xl p-6 text-center">
              <p className="text-foreground/60 mb-4">
                Esta tienda es parte del marketplace de Colombia Green Coffee.
                Los productos se gestionan desde la plataforma con logística integrada.
              </p>
              <Link
                href="/catalogo"
                className="inline-block px-6 py-3 bg-coffee text-white font-semibold rounded-full hover:bg-coffee-dark transition-colors"
              >
                Ver catálogo de la plataforma
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
