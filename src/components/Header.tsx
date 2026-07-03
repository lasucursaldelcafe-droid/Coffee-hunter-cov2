"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/catalogo", label: "Comprar" },
  { href: "/tiendas", label: "Tiendas" },
  { href: "/panel", label: "Vender" },
  { href: "/logistica", label: "Logística" },
  { href: "/nosotros", label: "Nosotros" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center">
              <span className="text-white font-bold text-lg">CG</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-coffee text-lg leading-tight block">
                Colombia Green Coffee
              </span>
              <span className="text-xs text-green tracking-wide">
                Especialidad · Logística · Marketplace
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-coffee transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/catalogo"
              className="text-sm font-medium text-coffee hover:text-coffee-dark transition-colors"
            >
              Explorar catálogo
            </Link>
            <Link
              href="/crear-tienda"
              className="px-5 py-2.5 bg-coffee text-white text-sm font-semibold rounded-full hover:bg-coffee-dark transition-colors"
            >
              Crear tienda gratis
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-coffee"
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
          <nav className="lg:hidden pb-4 border-t border-cream pt-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-2 py-2 text-sm font-medium text-foreground/80 hover:text-coffee"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/crear-tienda"
              className="block mt-3 px-5 py-2.5 bg-coffee text-white text-sm font-semibold rounded-full text-center"
              onClick={() => setOpen(false)}
            >
              Crear mi tienda
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
