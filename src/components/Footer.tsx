import Link from "next/link";

const footerLinks = {
  comprar: [
    { href: "/catalogo", label: "Catálogo" },
    { href: "/catalogo?tipo=verde", label: "Café verde" },
    { href: "/catalogo?tipo=tostado", label: "Café tostado" },
    { href: "/tiendas", label: "Coffee Shops" },
  ],
  vender: [
    { href: "/crear-tienda", label: "Crear tienda" },
    { href: "/panel", label: "Panel vendedor" },
    { href: "/maquila", label: "Maquila" },
    { href: "/logistica", label: "Logística" },
  ],
  empresa: [
    { href: "/como-funciona", label: "Cómo funciona" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/crear-tienda", label: "Comisión 8%" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-warm border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display font-bold text-lg text-trade-ink block mb-4">
              Colombia Green Coffee
            </Link>
            <p className="text-trade-muted text-sm leading-relaxed max-w-xs">
              Del origen al mundo. Café verde, tostado, maquila y marketplace para coffee shops independientes.
            </p>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-trade-ink mb-4 capitalize">
                {group}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-trade-muted hover:text-coffee transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-black/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-trade-muted">
          <p>© {new Date().getFullYear()} Colombia Green Coffee</p>
          <p>Bogotá, Colombia · Envíos internacionales</p>
        </div>
      </div>
    </footer>
  );
}
