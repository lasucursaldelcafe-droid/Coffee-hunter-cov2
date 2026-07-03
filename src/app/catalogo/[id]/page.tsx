import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { BuyerInquiryForm } from "@/components/BuyerInquiryForm";
import { TrustBadges } from "@/components/TrustBadges";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.name,
    description: product.description,
  };
}

const typeLabels = {
  verde: "Café verde",
  tostado: "Café tostado",
  maquila: "Maquila",
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/catalogo" className="text-sm text-green hover:text-green-light mb-8 inline-block">
          ← Volver al catálogo
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <div className="rounded-2xl bg-gradient-to-br from-cream to-white border border-cream p-10 mb-6">
              <TrustBadges />
              <div className="mt-8">
                <span className="text-xs font-semibold uppercase tracking-wide text-green">
                  {typeLabels[product.type]}
                </span>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-coffee mt-2 mb-3">
                  {product.name}
                </h1>
                <p className="text-foreground/65">
                  {product.origin} · {product.altitude} · {product.process} · {product.variety}
                </p>
              </div>

              <div className="mt-8 flex items-end gap-2">
                <span className="text-4xl font-bold text-coffee">${product.pricePerKg}</span>
                <span className="text-foreground/50 pb-1">USD / kg</span>
                <span className="ml-auto px-3 py-1 bg-coffee text-white rounded-full text-sm font-bold">
                  {product.score} SCA
                </span>
              </div>
            </div>

            <p className="text-foreground/75 leading-relaxed mb-6">{product.description}</p>

            <div className="flex flex-wrap gap-2">
              {product.profile.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-cream rounded-full text-sm text-coffee">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl border border-cream shadow-lg p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-coffee mb-1">
                Solicitar cotización
              </h2>
              <p className="text-sm text-foreground/55 mb-6">
                Para retail, HORECA, mayoristas y tostadores. Respuesta en 24–48 h hábiles.
              </p>
              <BuyerInquiryForm productId={product.id} productName={product.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
