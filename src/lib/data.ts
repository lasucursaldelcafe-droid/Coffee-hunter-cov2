export interface CoffeeProduct {
  id: string;
  name: string;
  origin: string;
  score: number;
  process: string;
  variety: string;
  type: "verde" | "tostado" | "maquila";
  pricePerKg: number;
  description: string;
  altitude: string;
  profile: string[];
}

export interface CoffeeStore {
  id: string;
  name: string;
  slug: string;
  owner: string;
  description: string;
  specialty: string;
  country: string;
  rating: number;
  products: number;
  image: string;
}

export interface LogisticsService {
  id: string;
  title: string;
  description: string;
  regions: string[];
  icon: string;
}

export const products: CoffeeProduct[] = [
  {
    id: "1",
    name: "Huila Gesha Natural",
    origin: "Huila",
    score: 88.5,
    process: "Natural",
    variety: "Gesha",
    type: "verde",
    pricePerKg: 28,
    description:
      "Microlote de altura con notas florales de jazmín, bergamota y durazno. Trazabilidad completa desde la finca.",
    altitude: "1.850 msnm",
    profile: ["Floral", "Cítrico", "Dulce"],
  },
  {
    id: "2",
    name: "Cauca Sudan Rume",
    origin: "Cauca",
    score: 89.2,
    process: "Lavado",
    variety: "Sudan Rume",
    type: "verde",
    pricePerKg: 32,
    description:
      "Variedad exótica con perfil complejo: frutos rojos, cacao y especias suaves. Ideal para competencias.",
    altitude: "1.920 msnm",
    profile: ["Frutal", "Especiado", "Cacao"],
  },
  {
    id: "3",
    name: "Tolima Wush Wush Honey",
    origin: "Tolima",
    score: 87.8,
    process: "Honey",
    variety: "Wush Wush",
    type: "verde",
    pricePerKg: 26,
    description:
      "Proceso honey que realza la dulzura natural con notas de miel, mango y caramelo.",
    altitude: "1.750 msnm",
    profile: ["Dulce", "Tropical", "Miel"],
  },
  {
    id: "4",
    name: "Nariño Bourbon Rosado",
    origin: "Nariño",
    score: 86.5,
    process: "Lavado",
    variety: "Bourbon Rosado",
    type: "tostado",
    pricePerKg: 18,
    description:
      "Tostado medio para espresso y filtro. Cuerpo sedoso con acidez brillante de frutos rojos.",
    altitude: "1.680 msnm",
    profile: ["Frutos rojos", "Chocolate", "Nuez"],
  },
  {
    id: "5",
    name: "Antioquia Castillo Especial",
    origin: "Antioquia",
    score: 85.0,
    process: "Lavado",
    variety: "Castillo",
    type: "tostado",
    pricePerKg: 12,
    description:
      "Café de volumen con excelente consistencia. Perfecto para blends y líneas comerciales.",
    altitude: "1.600 msnm",
    profile: ["Chocolate", "Caramelo", "Nuez"],
  },
  {
    id: "6",
    name: "Marca Propia — Maquila Premium",
    origin: "Multi-región",
    score: 87.0,
    process: "Personalizable",
    variety: "Blend especial",
    type: "maquila",
    pricePerKg: 22,
    description:
      "Desarrollamos tu marca de café con perfiles únicos, empaque personalizado y lotes desde 50 kg.",
    altitude: "1.500–2.000 msnm",
    profile: ["Personalizado", "Trazable", "Premium"],
  },
];

export const stores: CoffeeStore[] = [
  {
    id: "1",
    name: "Café del Origén",
    slug: "cafe-del-origen",
    owner: "María Fernanda López",
    description:
      "Tienda especializada en microlotes de Huila y Cauca con envío a toda Latinoamérica.",
    specialty: "Microlotes de altura",
    country: "Colombia",
    rating: 4.9,
    products: 12,
    image: "origen",
  },
  {
    id: "2",
    name: "Green Bean Berlin",
    slug: "green-bean-berlin",
    owner: "Thomas Weber",
    description:
      "Distribuidor europeo de café verde colombiano para tostadores artesanales.",
    specialty: "Café verde para tostadores",
    country: "Alemania",
    rating: 4.8,
    products: 8,
    image: "berlin",
  },
  {
    id: "3",
    name: "Tokyo Roast Lab",
    slug: "tokyo-roast-lab",
    owner: "Yuki Tanaka",
    description:
      "Laboratorio de tostión japonés con variedades exóticas colombianas de puntaje 87+.",
    specialty: "Variedades exóticas",
    country: "Japón",
    rating: 4.7,
    products: 15,
    image: "tokyo",
  },
  {
    id: "4",
    name: "Andes Specialty Co.",
    slug: "andes-specialty",
    owner: "Carlos Mendoza",
    description:
      "Marca propia de café tostado con maquila desde nuestra plataforma. Perfiles únicos andinos.",
    specialty: "Marca propia / Maquila",
    country: "Perú",
    rating: 4.6,
    products: 6,
    image: "andes",
  },
];

export const logisticsServices: LogisticsService[] = [
  {
    id: "1",
    title: "Exportación de café verde",
    description:
      "Gestión completa de exportación: certificados fitosanitarios, documentación aduanera y coordinación con navieras y aerolíneas.",
    regions: ["EE.UU.", "Europa", "Asia", "Oceanía"],
    icon: "ship",
  },
  {
    id: "2",
    title: "Envío de café tostado",
    description:
      "Logística especializada para café tostado con control de temperatura y tiempos de tránsito optimizados.",
    regions: ["América", "Europa", "Medio Oriente"],
    icon: "plane",
  },
  {
    id: "3",
    title: "Maquila y distribución de marca",
    description:
      "Producción, empaque y distribución internacional de tu marca de café. Desde el grano hasta el estante.",
    regions: ["Global"],
    icon: "package",
  },
  {
    id: "4",
    title: "Operadores logísticos aliados",
    description:
      "Red de operadores certificados en cada región para última milla, almacenamiento y cumplimiento regulatorio.",
    regions: ["15+ países"],
    icon: "network",
  },
];

export const origins = [
  { name: "Huila", description: "Notas florales y cítricas, altitudes de 1.500–2.100 msnm" },
  { name: "Cauca", description: "Perfiles frutales intensos y variedades exóticas" },
  { name: "Tolima", description: "Dulzura equilibrada y cuerpo medio-alto" },
  { name: "Nariño", description: "Acidez brillante y tazas complejas" },
  { name: "Antioquia", description: "Consistencia y volúmenes para blends premium" },
  { name: "Quindío", description: "Cafés suaves con notas de chocolate y caramelo" },
];

export const storePlans = [
  {
    name: "Comisión por venta",
    price: 0,
    commission: 8,
    description: "Sin suscripción — pagas solo cuando vendes",
    features: [
      "0 USD de cuota mensual",
      "8% fijo por cada venta concretada",
      "Tienda profesional personalizada",
      "Catálogo de café de especialidad",
      "Reportes retail y datos de mercado",
      "Logística internacional opcional",
    ],
    highlighted: true,
  },
] as const;
