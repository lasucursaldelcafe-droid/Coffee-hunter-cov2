/** Comisión fija de la plataforma — sin suscripción mensual */
export const PLATFORM_COMMISSION_RATE = 0.08;

export const PLATFORM_COMMISSION_PERCENT = Math.round(PLATFORM_COMMISSION_RATE * 100);

export function formatCommissionRate(): string {
  return `${PLATFORM_COMMISSION_PERCENT}%`;
}

export function formatCommissionExample(saleUsd: number): {
  sale: string;
  commission: string;
  net: string;
} {
  const commission = saleUsd * PLATFORM_COMMISSION_RATE;
  const net = saleUsd - commission;
  return {
    sale: `$${saleUsd.toFixed(2)}`,
    commission: `$${commission.toFixed(2)}`,
    net: `$${net.toFixed(2)}`,
  };
}

export const platformBenefits = [
  "Sin cuota mensual ni suscripción",
  `Comisión fija del ${PLATFORM_COMMISSION_PERCENT}% solo cuando vendes`,
  "Página de tienda profesional y catálogo integrado",
  "Logística internacional y maquila disponibles",
  "Panel de ventas y reportes retail incluidos",
  "Datos de mercado para decisiones certeras",
] as const;

export const retailChannels = [
  { value: "cafe", label: "Cafetería / coffee shop" },
  { value: "supermercado", label: "Supermercado / retail" },
  { value: "online", label: "E-commerce / D2C" },
  { value: "horeca", label: "HORECA (hoteles, restaurantes)" },
  { value: "mayorista", label: "Mayorista / distribuidor" },
  { value: "mixto", label: "Varios canales" },
] as const;

export const businessTypes = [
  { value: "tostador", label: "Tostador artesanal" },
  { value: "retail", label: "Marca retail / tienda física" },
  { value: "exportador", label: "Exportador / trader" },
  { value: "marca_propia", label: "Marca propia / maquila" },
  { value: "distribuidor", label: "Distribuidor regional" },
] as const;
