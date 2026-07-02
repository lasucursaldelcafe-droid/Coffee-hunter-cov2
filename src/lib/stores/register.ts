import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db, initDatabase } from "@/lib/db";
import { coffeeStores } from "@/lib/db/schema";
import {
  slugifyStoreName,
  type StoreRegistrationInput,
} from "@/lib/validations/store";

export async function registerCoffeeStore(input: StoreRegistrationInput) {
  await initDatabase();

  const existing = await db
    .select({ id: coffeeStores.id })
    .from(coffeeStores)
    .where(eq(coffeeStores.email, input.email.toLowerCase()))
    .limit(1);

  if (existing.length > 0) {
    throw new Error("DUPLICATE_EMAIL");
  }

  const baseSlug = slugifyStoreName(input.storeName) || "tienda";
  const slug = `${baseSlug}-${uuidv4().slice(0, 8)}`;

  const id = uuidv4();
  await db.insert(coffeeStores).values({
    id,
    slug,
    storeName: input.storeName,
    ownerName: input.ownerName,
    email: input.email.toLowerCase(),
    country: input.country,
    specialty: input.specialty,
    plan: input.plan,
    description: input.description ?? "",
    status: "pending",
    createdAt: new Date(),
  });

  return { id, slug };
}

export async function countCoffeeStores(): Promise<number> {
  await initDatabase();
  const rows = await db.select({ id: coffeeStores.id }).from(coffeeStores);
  return rows.length;
}
