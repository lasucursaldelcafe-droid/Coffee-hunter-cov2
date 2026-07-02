import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { origins } from "@/lib/data";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Colombia Green Coffee conecta productores colombianos de café de especialidad con el mundo. Trazabilidad, calidad y logística internacional.",
};

const values = [
  {
    title: "Trazabilidad total",
    description: "Cada grano tiene historia: desde la finca, pasando por el procesamiento, hasta la exportación.",
  },
  {
    title: "Calidad certificada",
    description: "Cafés evaluados por Q-Graders con puntajes SCA de 85+. No vendemos café genérico.",
  },
  {
    title: "Comercio directo",
    description: "Relaciones directas con productores en Huila, Cauca, Tolima, Nariño y más regiones.",
  },
  {
    title: "Plataforma abierta",
    description: "Cualquier tostador o marca puede montar su tienda y acceder a nuestra red logística.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Quiénes somos"
            title="Conectamos el café colombiano con el mundo"
            description="En Colombia Green Coffee unimos a productores que cultivan cafés excepcionales con tostadores, marcas y consumidores que valoran el origen, la trazabilidad y la calidad. No vendemos café genérico: entregamos identidad, estrategia y valor en cada grano."
          />
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-coffee mb-6">
                Nuestra misión
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Inspirados en la excelencia del café colombiano de especialidad, creamos una
                plataforma integral que va más allá de la venta de café verde. Ofrecemos
                logística internacional, maquila de marcas premium y un marketplace donde
                cualquier emprendedor puede montar su propia coffee shop.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Trabajamos con cafés cultivados por encima de 1.500 metros sobre el nivel del
                mar, con perfiles florales, frutales, especiados y caramelizados. Desde lotes
                únicos de Gesha y Sudan Rume hasta volúmenes regionales con consistencia
                excepcional.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {values.map((value) => (
                <div key={value.title} className="p-5 bg-white rounded-xl border border-cream">
                  <h3 className="font-display font-bold text-coffee mb-2 text-sm">
                    {value.title}
                  </h3>
                  <p className="text-xs text-foreground/70">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Orígenes"
            title="Regiones donde operamos"
            description="Seleccionamos cafés de las mejores regiones cafeteras de Colombia con trazabilidad completa."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {origins.map((origin) => (
              <div key={origin.name} className="p-5 bg-white rounded-xl border border-cream">
                <h3 className="font-display font-bold text-coffee">{origin.name}</h3>
                <p className="text-sm text-foreground/70 mt-1">{origin.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-green text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold mb-4">
            Únete a nuestra plataforma
          </h2>
          <p className="text-white/80 mb-8">
            Ya seas tostador, distribuidor o emprendedor, tenemos un lugar para ti.
          </p>
          <Link
            href="/crear-tienda"
            className="inline-block px-8 py-4 bg-white text-green font-semibold rounded-full hover:bg-cream transition-colors"
          >
            Crear mi coffee shop
          </Link>
        </div>
      </section>
    </>
  );
}
