import Link from "next/link";
import { SectionHeading, ServiceCard } from "@/components/SectionHeading";
import { CoffeeCard } from "@/components/CoffeeCard";
import { StoreCard } from "@/components/StoreCard";
import { products, stores, origins } from "@/lib/data";

export default function HomePage() {
  const featuredProducts = products.slice(0, 3);
  const featuredStores = stores.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-cream overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-green blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-coffee blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="inline-block px-4 py-1.5 bg-green/10 text-green text-sm font-semibold rounded-full mb-6">
                Plataforma integral de café colombiano
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-coffee leading-tight mb-6">
                Del origen al mundo,{" "}
                <span className="text-green">café con identidad</span>
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed mb-8 max-w-xl">
                Conectamos productores colombianos de café excepcional con tostadores,
                marcas y consumidores globales. Café verde, tostado, maquila de marcas
                premium y logística internacional — todo en una plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/crear-tienda"
                  className="px-8 py-4 bg-coffee text-white font-semibold rounded-full hover:bg-coffee-dark transition-colors text-center"
                >
                  Monta tu coffee shop
                </Link>
                <Link
                  href="/catalogo"
                  className="px-8 py-4 border-2 border-coffee text-coffee font-semibold rounded-full hover:bg-coffee hover:text-white transition-colors text-center"
                >
                  Explorar catálogo
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-up-delay-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="text-3xl font-bold text-green">87+</div>
                    <div className="text-sm text-foreground/60">Puntaje SCA promedio</div>
                  </div>
                  <div className="bg-coffee text-white p-6 rounded-2xl shadow-lg">
                    <div className="text-3xl font-bold">15+</div>
                    <div className="text-sm text-white/70">Países de envío</div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="text-3xl font-bold text-coffee">50+</div>
                    <div className="text-sm text-foreground/60">Coffee shops activas</div>
                  </div>
                  <div className="bg-green text-white p-6 rounded-2xl shadow-lg">
                    <div className="text-3xl font-bold">100%</div>
                    <div className="text-sm text-white/70">Trazabilidad</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Nuestros servicios"
            title="Todo lo que necesitas para llevar café colombiano al mundo"
            description="Desde la finca hasta la taza de tu cliente, con operadores logísticos certificados y perfiles únicos de alto puntaje."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              title="Café verde"
              description="Microlotes, nanolotes y variedades exóticas con trazabilidad completa desde la semilla hasta la exportación."
              href="/catalogo?tipo=verde"
              icon={
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22c4.97 0 9-4.03 9-9 0-3.87-2.69-7.13-6.31-8.01C13.81 3.62 12.93 3 12 3s-1.81.62-2.69 1.99C5.69 5.87 3 9.13 3 13c0 4.97 4.03 9 9 9z" />
                </svg>
              }
            />
            <ServiceCard
              title="Café tostado"
              description="Perfiles de tueste personalizados para retail, HORECA y suscripción. Envío internacional con control de temperatura."
              href="/catalogo?tipo=tostado"
              icon={
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.5 3H6c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 3.96.12 7.22-3.06 7.22-7v-1h.5c1.38 0 2.5-1.12 2.5-2.5S19.88 3 18.5 3z" />
                </svg>
              }
            />
            <ServiceCard
              title="Maquila de marca"
              description="Desarrollamos tu marca de café premium: blend único, empaque personalizado y lotes desde 50 kg."
              href="/maquila"
              icon={
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              }
            />
            <ServiceCard
              title="Logística internacional"
              description="Operadores logísticos aliados en 15+ países. Certificados, aduanas y última milla incluidos."
              href="/logistica"
              icon={
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Marketplace CTA */}
      <section className="py-20 lg:py-28 bg-slate text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Coffee Shop Marketplace"
                title="Monta tu propia tienda de café"
                description="Inscríbete en nuestra plataforma y vende café verde, tostado o tu marca propia. Accede a nuestro catálogo, logística internacional y red de operadores."
                align="left"
                light
              />
              <ul className="space-y-3 mb-8">
                {[
                  "Página de tienda personalizada en minutos",
                  "Acceso al catálogo de café de especialidad",
                  "Logística internacional integrada",
                  "Planes desde gratis hasta enterprise",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/80">
                    <svg className="w-5 h-5 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/crear-tienda"
                className="inline-block px-8 py-4 bg-gold text-coffee-dark font-semibold rounded-full hover:bg-gold/90 transition-colors"
              >
                Crear mi coffee shop gratis
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredStores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 lg:py-28 bg-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Catálogo destacado"
            title="Cafés de alto puntaje con perfiles únicos"
            description="Seleccionamos microlotes y variedades exóticas con puntajes SCA de 85+. Cada grano lleva trazabilidad, intención y una historia que contar."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featuredProducts.map((product) => (
              <CoffeeCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/catalogo"
              className="inline-block px-8 py-3 border-2 border-coffee text-coffee font-semibold rounded-full hover:bg-coffee hover:text-white transition-colors"
            >
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

      {/* Origins */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Orígenes"
            title="Regiones cafeteras de Colombia"
            description="Trabajamos con cafés cultivados por encima de 1.500 metros sobre el nivel del mar, con trazabilidad completa desde la semilla hasta la exportación."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {origins.map((origin) => (
              <div
                key={origin.name}
                className="p-6 rounded-2xl border border-cream hover:border-green/30 hover:shadow-md transition-all"
              >
                <h3 className="font-display text-xl font-bold text-coffee mb-2">{origin.name}</h3>
                <p className="text-foreground/70 text-sm">{origin.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            ¿Listo para llevar café colombiano al mundo?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Únete a nuestra plataforma como tostador, distribuidor o marca.
            Te acompañamos desde el origen hasta la puerta de tu cliente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/crear-tienda"
              className="px-8 py-4 bg-white text-green font-semibold rounded-full hover:bg-cream transition-colors"
            >
              Crear mi tienda
            </Link>
            <Link
              href="/logistica"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              Conocer logística
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
