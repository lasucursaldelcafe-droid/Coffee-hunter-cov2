import Link from "next/link";

const pillars = [
  {
    title: "Somos especialistas en café colombiano",
    description:
      "Conocemos origen, procesos y logística. Piensa en nosotros como tu guía desde la finca hasta el cliente final.",
  },
  {
    title: "Descubrimos los mejores coffee shops",
    description:
      "Buscamos tostadores y marcas independientes, probamos sus cafés y destacamos los que valen la pena compartir.",
  },
  {
    title: "Te conectamos con lo que necesitas",
    description:
      "Catálogo central, tienda propia y logística internacional — todo en una plataforma pensada para vender mejor.",
  },
];

export function PlatformDifference() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-eyebrow">La diferencia CGC</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-trade-ink leading-tight">
            Nerds del café, para que tú no tengas que serlo
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-14 mb-14">
          {pillars.map((pillar) => (
            <div key={pillar.title}>
              <h3 className="font-display text-xl font-bold text-coffee mb-4 leading-snug">
                {pillar.title}
              </h3>
              <p className="text-trade-muted leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/crear-tienda" className="btn-trade btn-trade-primary btn-trade-pill">
            Empezar ahora
          </Link>
        </div>
      </div>
    </section>
  );
}
