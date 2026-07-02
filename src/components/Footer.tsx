import Link from "next/link";

const footerLinks = {
  plataforma: [
    { href: "/catalogo", label: "Catálogo de café" },
    { href: "/tiendas", label: "Coffee Shops" },
    { href: "/crear-tienda", label: "Crear tu tienda" },
    { href: "/maquila", label: "Maquila de marca" },
  ],
  servicios: [
    { href: "/logistica", label: "Logística internacional" },
    { href: "/catalogo?tipo=verde", label: "Café verde" },
    { href: "/catalogo?tipo=tostado", label: "Café tostado" },
    { href: "/nosotros", label: "Sobre nosotros" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center">
                <span className="text-white font-bold text-lg">CG</span>
              </div>
              <span className="font-display font-bold text-lg">Colombia Green Coffee</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Conectamos productores colombianos de café de especialidad con el mundo.
              Café verde, tostado, maquila de marcas premium y logística internacional.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gold">
              Plataforma
            </h3>
            <ul className="space-y-2">
              {footerLinks.plataforma.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gold">
              Servicios
            </h3>
            <ul className="space-y-2">
              {footerLinks.servicios.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gold">
              Contacto
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>info@colombiagreencoffee.com</li>
              <li>Bogotá, Colombia</li>
              <li>Envíos a más de 15 países</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Colombia Green Coffee. Todos los derechos reservados.
          </p>
          <p className="text-sm text-white/50">
            Inspirado en la excelencia del café colombiano de especialidad
          </p>
        </div>
      </div>
    </footer>
  );
}
