import { v4 as uuidv4 } from "uuid";
import { db, initDatabase } from "@/lib/db";
import { retailSalesReports } from "@/lib/db/schema";
import type { RetailReportInput } from "@/lib/validations/retail";

export async function submitRetailReport(input: RetailReportInput) {
  await initDatabase();

  const id = uuidv4();
  await db.insert(retailSalesReports).values({
    id,
    storeId: null,
    storeEmail: input.storeEmail.toLowerCase(),
    storeName: input.storeName,
    periodMonth: input.periodMonth,
    channel: input.channel,
    productName: input.productName,
    unitsSold: input.unitsSold ?? null,
    kgSold: input.kgSold,
    avgPriceUsd: input.avgPriceUsd ?? null,
    city: input.city ?? "",
    region: input.region ?? "",
    notes: input.notes ?? "",
    createdAt: new Date(),
  });

  return { id };
}
