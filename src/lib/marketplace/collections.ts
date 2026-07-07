import type { MarketplaceProduct } from "@/lib/marketplace/types";

export interface CuratedCollection {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  match: (product: MarketplaceProduct) => boolean;
}

export const curatedCollections: CuratedCollection[] = [
  {
    slug: "huila-gesha",
    title: "Huila Gesha",
    subtitle: "Floral y cítrico de altura",
    description:
      "Microlotes de Gesha y variedades florales del departamento de Huila. Tazas con notas de jazmín, bergamota y durazno — ideales para competencias y retail premium.",
    badge: "SCA 87+",
    match: (p) =>
      p.origin.toLowerCase().includes("huila") ||
      p.variety.toLowerCase().includes("gesha"),
  },
  {
    slug: "variedades-exoticas",
    title: "Variedades exóticas",
    subtitle: "Gesha, Sudan Rume, Wush Wush",
    description:
      "Cafés de variedades raras con perfiles complejos. Para tostadores que buscan diferenciación y compradores que valoran la trazabilidad genética.",
    badge: "Edición limitada",
    match: (p) => {
      const v = p.variety.toLowerCase();
      return (
        v.includes("gesha") ||
        v.includes("sudan") ||
        v.includes("wush") ||
        p.score >= 87
      );
    },
  },
  {
    slug: "verde-tostadores",
    title: "Verde para tostadores",
    subtitle: "Lotes listos para tu laboratorio",
    description:
      "Café verde de especialidad con trazabilidad completa. Perfecto para tostadores artesanales, exportadores y distribuidores B2B.",
    badge: "B2B",
    match: (p) => p.type === "verde",
  },
  {
    slug: "tostado-retail",
    title: "Tostado retail",
    subtitle: "Perfiles listos para tu cafetería",
    description:
      "Cafés tostados con consistencia y puntaje SCA verificado. Para cafeterías, e-commerce y HORECA que necesitan rotación confiable.",
    badge: "Listo para servir",
    match: (p) => p.type === "tostado",
  },
  {
    slug: "microlotes-premium",
    title: "Microlotes premium",
    subtitle: "Puntaje 87+ SCA",
    description:
      "Selección de lotes con puntaje superior a 87 puntos. Curados por nuestro equipo para compradores que no negocian la calidad.",
    badge: "87+ pts",
    match: (p) => p.score >= 87,
  },
  {
    slug: "marca-propia",
    title: "Marca propia y maquila",
    subtitle: "Tu café, tu identidad",
    description:
      "Servicios de maquila y desarrollo de marca. Desde 50 kg con empaque personalizado, perfiles a medida y logística internacional.",
    badge: "White label",
    match: (p) => p.type === "maquila",
  },
];

export function getCollectionBySlug(slug: string): CuratedCollection | undefined {
  return curatedCollections.find((c) => c.slug === slug);
}

export function filterProductsForCollection(
  products: MarketplaceProduct[],
  collection: CuratedCollection,
): MarketplaceProduct[] {
  return products.filter(collection.match).sort((a, b) => b.score - a.score);
}
