"use client";

import Link from "next/link";
import { useState } from "react";
import { PromoBar } from "@/components/home/PromoBar";

const shopLinks = [
  { href: "/catalogo", label: "Catálogo", desc: "Microlotes y variedades de especialidad" },
  { href: "/catalogo?tipo=verde", label: "Café verde", desc: "Para tostadores y exportadores" },
  { href: "/catalogo?tipo=tostado", label: "Café tostado", desc: "Perfiles listos para retail" },
];

const platformLinks = [
  { href: "/tiendas", label: "Coffee Shops", desc: "Directorio de tiendas activas" },
  { href: "/crear-tienda", label: "Crear tienda", desc: "Comisión 8% · sin mensualidad" },
  { href: "/panel", label: "Panel vendedor", desc: "Administra tu coffee shop" },
];

const aboutLinks = [
  { href: "/como-funciona", label: "Cómo funciona", desc: "Modelo de negocio de la plataforma" },
  { href: "/logistica", label: "Logística", desc: "Envíos a 15+ países" },
  { href: "/maquila", label: "Maquila", desc: "Tu marca de café premium" },
  { href: "/nosotros", label: "Nosotros", desc: "Nuestra historia" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/5">
      <PromoBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-display font-bold text-lg text-trade-ink tracking-tight">
            Colombia Green Coffee
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: "shop", label: "Comprar", links: shopLinks },
              { id: "platform", label: "Vender", links: platformLinks },
              { id: "about", label: "Servicios", links: aboutLinks },
            ].map((group) => (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => setMegaOpen(group.id)}
                onMouseLeave={() => setMegaOpen(null)}
              >
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-trade-ink/80 hover:text-trade-ink transition-colors"
                >
                  {group.label}
                </button>
                {megaOpen === group.id && (
                  <div className="absolute top-full left-0 w-72 bg-white border border-black/5 shadow-xl rounded-xl p-4 mt-1">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-3 py-3 rounded-lg hover:bg-warm transition-colors"
                      >
                        <span className="block text-sm font-semibold text-coffee">{link.label}</span>
                        <span className="block text-xs text-trade-muted mt-0.5">{link.desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/panel" className="text-sm font-medium text-trade-ink/70 hover:text-trade-ink">
              Iniciar sesión
            </Link>
            <Link href="/crear-tienda" className="btn-trade btn-trade-primary btn-trade-pill px-6 py-2.5 text-sm">
              Empezar
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-trade-ink"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <nav className="lg:hidden pb-6 border-t border-black/5 pt-4 space-y-1">
            {[...shopLinks, ...platformLinks, ...aboutLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-2 py-3 text-sm font-medium text-trade-ink/80 hover:text-coffee"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Link href="/panel" className="btn-trade btn-trade-secondary btn-trade-pill text-center" onClick={() => setOpen(false)}>
                Iniciar sesión
              </Link>
              <Link href="/crear-tienda" className="btn-trade btn-trade-primary btn-trade-pill text-center" onClick={() => setOpen(false)}>
                Empezar
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
