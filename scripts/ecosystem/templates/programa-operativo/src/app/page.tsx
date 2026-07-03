import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm uppercase tracking-wide text-[var(--coffee)]">
        La Sucursal del Café
      </p>
      <h1 className="mt-2 text-4xl font-bold text-[var(--coffee)]">
        Programa Operativo — Logística
      </h1>
      <p className="mt-4 text-lg">
        Atendemos solicitudes logísticas de empresas: cotizaciones, rutas y seguimiento de
        cargas de café y productos relacionados.
      </p>

      <section className="mt-10 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Estado</h2>
        <ul className="mt-4 space-y-2 text-sm">
          <li>✅ Bootstrap desde ecosistema La Sucursal</li>
          <li>⏸ Formulario de solicitudes (próximo sprint)</li>
          <li>⏸ Integración con Colombia Green Coffee /logistica</li>
        </ul>
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/logistica"
          className="rounded-lg bg-[var(--green)] px-4 py-2 text-white"
        >
          Ver logística en Colombia Green Coffee
        </Link>
        <a
          href="mailto:lasucursaldelcafe@gmail.com"
          className="rounded-lg border border-[var(--coffee)] px-4 py-2 text-[var(--coffee)]"
        >
          Contactar
        </a>
      </div>
    </main>
  );
}
