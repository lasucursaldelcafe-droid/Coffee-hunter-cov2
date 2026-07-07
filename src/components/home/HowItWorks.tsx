const steps = [
  {
    step: "01",
    title: "Crea tu tienda o explora el catálogo",
    description: "Regístrate gratis como coffee shop o navega microlotes curados de especialidad.",
  },
  {
    step: "02",
    title: "Personaliza y publica productos",
    description: "Elige plantilla visual, sube tus cafés y aparece en tu tienda y el marketplace.",
  },
  {
    step: "03",
    title: "Vende con logística integrada",
    description: "Comisión 8% por venta. Operadores aliados en 15+ países cuando lo necesites.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-24 bg-warm border-y border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="section-eyebrow text-center">Cómo funciona</p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-trade-ink text-center mb-14 max-w-3xl mx-auto">
          Del registro a la venta internacional en tres pasos
        </h2>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((item) => (
            <div key={item.step} className="relative">
              <span className="text-5xl font-bold text-coffee/15 font-display leading-none mb-4 block">
                {item.step}
              </span>
              <h3 className="font-display text-lg font-bold text-coffee mb-3">{item.title}</h3>
              <p className="text-trade-muted text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
