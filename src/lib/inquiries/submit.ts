import { v4 as uuidv4 } from "uuid";
import { db, initDatabase } from "@/lib/db";
import { buyerInquiries } from "@/lib/db/schema";
import type { BuyerInquiryInput } from "@/lib/validations/inquiry";

export async function submitBuyerInquiry(input: BuyerInquiryInput) {
  await initDatabase();

  const id = uuidv4();
  await db.insert(buyerInquiries).values({
    id,
    productId: input.productId,
    productName: input.productName,
    buyerName: input.buyerName,
    company: input.company ?? "",
    email: input.email.toLowerCase(),
    country: input.country,
    channel: input.channel,
    volumeKg: input.volumeKg ?? null,
    message: input.message ?? "",
    status: "pending",
    createdAt: new Date(),
  });

  return { id };
}
