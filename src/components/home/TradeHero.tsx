import Link from "next/link";

export function TradeHero() {
  return (
    <section className="relative min-h-[85vh] flex items-end overflow-hidden bg-trade-ink">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(to top, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.55) 45%, rgba(26,26,26,0.35) 100%),
            radial-gradient(ellipse at 70% 30%, rgba(45,90,39,0.45) 0%, transparent 55%),
            radial-gradient(ellipse at 20% 80%, rgba(104,25,14,0.5) 0%, transparent 50%)
          `,
        }}
      />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-green blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[28rem] h-[28rem] rounded-full bg-coffee blur-[100px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 pt-32">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            Encuentra tu próximo café colombiano, una y otra vez
          </h1>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
            Reunimos los mejores coffee shops y microlotes de origen en un solo lugar — para que descubras
            cafés que quizá nunca habrías encontrado por tu cuenta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/crear-tienda" className="btn-trade btn-trade-primary btn-trade-pill">
              Crear mi coffee shop
            </Link>
            <Link href="/catalogo" className="btn-trade btn-trade-secondary btn-trade-pill text-white border-white/30 hover:bg-white/10 hover:border-white/50">
              Explorar catálogo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
