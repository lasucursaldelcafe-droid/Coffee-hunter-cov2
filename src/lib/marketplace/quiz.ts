import type { MarketplaceProduct } from "@/lib/marketplace/types";

export type BuyerRole = "tostador" | "cafeteria" | "distribuidor" | "marca";
export type CoffeeTypePref = "verde" | "tostado" | "maquila" | "cualquiera";
export type VolumeRange = "menos-100" | "100-500" | "500-2000" | "mas-2000";
export type BudgetRange = "economico" | "medio" | "premium" | "sin-limite";

export interface QuizAnswers {
  role: BuyerRole;
  volume: VolumeRange;
  coffeeType: CoffeeTypePref;
  origin: string;
  budget: BudgetRange;
}

export interface QuizRecommendation {
  product: MarketplaceProduct;
  score: number;
  reasons: string[];
}

const roleTypeMap: Record<BuyerRole, CoffeeTypePref[]> = {
  tostador: ["verde", "cualquiera"],
  cafeteria: ["tostado", "cualquiera"],
  distribuidor: ["verde", "tostado", "cualquiera"],
  marca: ["maquila", "verde", "cualquiera"],
};

const budgetMax: Record<BudgetRange, number> = {
  economico: 15,
  medio: 25,
  premium: 35,
  "sin-limite": Infinity,
};

export const quizQuestions = [
  {
    id: "role" as const,
    title: "¿Cuál es tu perfil de comprador?",
    options: [
      { value: "tostador", label: "Tostador / exportador", desc: "Compro café verde para tostar" },
      { value: "cafeteria", label: "Cafetería / retail", desc: "Necesito café tostado listo" },
      { value: "distribuidor", label: "Distribuidor B2B", desc: "Revendo a tostadores o retail" },
      { value: "marca", label: "Marca propia", desc: "Quiero desarrollar mi propia línea" },
    ],
  },
  {
    id: "volume" as const,
    title: "¿Volumen mensual estimado?",
    options: [
      { value: "menos-100", label: "Menos de 100 kg", desc: "Microlotes y pruebas" },
      { value: "100-500", label: "100 – 500 kg", desc: "Operación artesanal" },
      { value: "500-2000", label: "500 – 2.000 kg", desc: "Escala regional" },
      { value: "mas-2000", label: "Más de 2.000 kg", desc: "Volumen comercial" },
    ],
  },
  {
    id: "coffeeType" as const,
    title: "¿Qué tipo de café buscas?",
    options: [
      { value: "verde", label: "Café verde", desc: "Grano sin tostar" },
      { value: "tostado", label: "Café tostado", desc: "Listo para servir" },
      { value: "maquila", label: "Maquila / marca", desc: "Desarrollo white label" },
      { value: "cualquiera", label: "Aún no lo sé", desc: "Recomiéndame" },
    ],
  },
  {
    id: "origin" as const,
    title: "¿Origen preferido?",
    options: [
      { value: "Huila", label: "Huila", desc: "Floral y cítrico" },
      { value: "Cauca", label: "Cauca", desc: "Frutal intenso" },
      { value: "Tolima", label: "Tolima", desc: "Dulce y equilibrado" },
      { value: "Nariño", label: "Nariño", desc: "Acidez brillante" },
      { value: "cualquiera", label: "Sin preferencia", desc: "Me interesa la calidad" },
    ],
  },
  {
    id: "budget" as const,
    title: "¿Presupuesto por kg (USD)?",
    options: [
      { value: "economico", label: "Hasta $15", desc: "Volumen y consistencia" },
      { value: "medio", label: "$15 – $25", desc: "Especialidad accesible" },
      { value: "premium", label: "$25 – $35", desc: "Microlotes premium" },
      { value: "sin-limite", label: "Sin límite", desc: "Lo mejor disponible" },
    ],
  },
] as const;

export function scoreProductForQuiz(
  product: MarketplaceProduct,
  answers: QuizAnswers,
): QuizRecommendation {
  let score = 0;
  const reasons: string[] = [];

  const preferredTypes = roleTypeMap[answers.role];
  const typeMatch =
    answers.coffeeType !== "cualquiera"
      ? product.type === answers.coffeeType
      : preferredTypes.includes(product.type) || preferredTypes.includes("cualquiera");

  if (typeMatch) {
    score += 30;
    reasons.push(`Tipo ${product.type} alineado con tu perfil`);
  }

  if (answers.origin === "cualquiera" || product.origin.includes(answers.origin)) {
    score += 25;
    if (answers.origin !== "cualquiera") {
      reasons.push(`Origen ${product.origin}`);
    }
  }

  if (product.pricePerKg <= budgetMax[answers.budget]) {
    score += 20;
    reasons.push(`Precio $${product.pricePerKg}/kg dentro de tu rango`);
  } else if (answers.budget === "sin-limite") {
    score += 15;
  }

  if (product.score >= 87) {
    score += 15;
    reasons.push(`Puntaje SCA ${product.score}`);
  } else if (product.score >= 85) {
    score += 8;
  }

  if (answers.volume === "menos-100" && product.score >= 87) {
    score += 10;
    reasons.push("Microlote ideal para pruebas");
  }
  if (
    (answers.volume === "500-2000" || answers.volume === "mas-2000") &&
    product.type === "verde" &&
    product.variety.toLowerCase().includes("castillo")
  ) {
    score += 10;
    reasons.push("Buen volumen para operación comercial");
  }

  return { product, score, reasons };
}

export function getQuizRecommendations(
  products: MarketplaceProduct[],
  answers: QuizAnswers,
  limit = 6,
): QuizRecommendation[] {
  return products
    .map((p) => scoreProductForQuiz(p, answers))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function getRecommendedCollectionSlug(answers: QuizAnswers): string {
  if (answers.coffeeType === "maquila" || answers.role === "marca") {
    return "marca-propia";
  }
  if (answers.coffeeType === "tostado" || answers.role === "cafeteria") {
    return "tostado-retail";
  }
  if (answers.origin === "Huila") {
    return "huila-gesha";
  }
  if (answers.budget === "premium" || answers.budget === "sin-limite") {
    return "microlotes-premium";
  }
  if (answers.coffeeType === "verde" || answers.role === "tostador") {
    return "verde-tostadores";
  }
  return "variedades-exoticas";
}
