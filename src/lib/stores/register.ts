import { eq, desc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db, initDatabase } from "@/lib/db";
import { coffeeStores } from "@/lib/db/schema";
import { DEFAULT_COMMISSION_RATE, slugifyStoreName, type StoreRegistrationInput } from "@/lib/validations/store";

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
  const adminToken = uuidv4();
  await db.insert(coffeeStores).values({
    id,
    slug,
    adminToken,
    storeName: input.storeName,
    ownerName: input.ownerName,
    email: input.email.toLowerCase(),
    country: input.country,
    city: input.city ?? "",
    phone: input.phone ?? "",
    specialty: input.specialty,
    businessType: input.businessType,
    retailChannel: input.retailChannel ?? "",
    monthlyVolumeKg: input.monthlyVolumeKg ?? null,
    commissionRate: DEFAULT_COMMISSION_RATE,
    description: input.description ?? "",
    status: "active",
    createdAt: new Date(),
  });

  return { id, slug, adminToken, commissionRate: DEFAULT_COMMISSION_RATE };
}

export async function countCoffeeStores(): Promise<number> {
  await initDatabase();
  const rows = await db.select({ id: coffeeStores.id }).from(coffeeStores);
  return rows.length;
}

export async function listPublicStores() {
  await initDatabase();
  return db
    .select({
      id: coffeeStores.id,
      slug: coffeeStores.slug,
      storeName: coffeeStores.storeName,
      ownerName: coffeeStores.ownerName,
      country: coffeeStores.country,
      city: coffeeStores.city,
      specialty: coffeeStores.specialty,
      businessType: coffeeStores.businessType,
      retailChannel: coffeeStores.retailChannel,
      description: coffeeStores.description,
      status: coffeeStores.status,
      commissionRate: coffeeStores.commissionRate,
      createdAt: coffeeStores.createdAt,
    })
    .from(coffeeStores)
    .where(eq(coffeeStores.status, "active"))
    .orderBy(desc(coffeeStores.createdAt));
}

export async function getStoreBySlug(slug: string) {
  await initDatabase();
  const rows = await db
    .select()
    .from(coffeeStores)
    .where(eq(coffeeStores.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}
