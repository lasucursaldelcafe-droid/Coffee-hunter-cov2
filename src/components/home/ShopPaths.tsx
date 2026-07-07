import Link from "next/link";

const paths = [
  {
    badge: "8% comisión",
    title: "Monta tu coffee shop",
    description:
      "Regístrate gratis y vende café verde, tostado o tu marca propia con tienda personalizada.",
    cta: "Crear tienda",
    href: "/crear-tienda",
  },
  {
    badge: "SCA 85+",
    title: "Explora el catálogo",
    description:
      "Desde lavados brillantes hasta naturales audaces — microlotes curados de especialidad colombiana.",
    cta: "Ver catálogo",
    href: "/catalogo",
  },
  {
    badge: "15+ países",
    title: "Logística internacional",
    description:
      "Operadores aliados para exportación, tostado y última milla. Del origen a la puerta de tu cliente.",
    cta: "Conocer logística",
    href: "/logistica",
  },
];

export function ShopPaths() {
  return (
    <section className="py-20 lg:py-28 bg-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-trade-ink">
            Más formas de vender y comprar café colombiano
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {paths.map((path) => (
            <article key={path.title} className="trade-card p-8 flex flex-col">
              <span className="inline-block self-start px-3 py-1 bg-green/10 text-green text-xs font-bold uppercase tracking-wide rounded-full mb-6">
                {path.badge}
              </span>
              <h3 className="font-display text-xl font-bold text-coffee mb-3">{path.title}</h3>
              <p className="text-trade-muted text-sm leading-relaxed flex-1 mb-8">{path.description}</p>
              <Link
                href={path.href}
                className="btn-trade btn-trade-primary btn-trade-square w-full text-center"
              >
                {path.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
