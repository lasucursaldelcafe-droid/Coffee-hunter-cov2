import Link from "next/link";

export function TestimonialBanner() {
  return (
    <section className="py-20 lg:py-24 bg-white border-y border-black/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-trade-ink leading-snug mb-8">
          &ldquo;Excelente forma de explorar marcas de café colombiano que quizá no habría descubierto por mi cuenta.&rdquo;
        </blockquote>
        <p className="text-trade-muted font-semibold mb-2">María Fernanda · Coffee shop en Bogotá</p>
        <p className="text-sm text-green font-semibold uppercase tracking-widest mb-10">
          Plataforma de café de especialidad · Colombia
        </p>
        <Link href="/crear-tienda" className="btn-trade btn-trade-primary btn-trade-pill">
          Empezar ahora
        </Link>
      </div>
    </section>
  );
}
