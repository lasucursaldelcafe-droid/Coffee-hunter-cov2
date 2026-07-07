import Link from "next/link";

const highlights = [
  {
    title: "Café verde de altura",
    description: "Microlotes con trazabilidad desde la finca. Perfiles únicos de Huila, Cauca y Nariño.",
    href: "/catalogo?tipo=verde",
    label: "Ver verde",
  },
  {
    title: "Monta tu coffee shop",
    description: "Tu tienda online en minutos. Comisión fija del 8% — sin cuota mensual.",
    href: "/crear-tienda",
    label: "Empezar gratis",
  },
];

export function ReadySection() {
  return (
    <section className="py-16 lg:py-20 bg-warm border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-trade-ink mb-4">
            ¿Listo para encontrar tu café?
          </h2>
          <p className="text-trade-muted text-lg">
            Regístrate como vendedor en minutos o explora colecciones curadas de especialidad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {highlights.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group trade-card p-8 lg:p-10 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <h3 className="font-display text-xl lg:text-2xl font-bold text-coffee mb-3 group-hover:text-green transition-colors">
                  {item.title}
                </h3>
                <p className="text-trade-muted leading-relaxed">{item.description}</p>
              </div>
              <span className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-green group-hover:gap-3 transition-all">
                {item.label}
                <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
