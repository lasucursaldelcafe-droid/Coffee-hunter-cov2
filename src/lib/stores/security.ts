import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { db, initDatabase } from "@/lib/db";
import { coffeeStores } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";

export async function setStorePassword(storeId: string, password: string) {
  await initDatabase();
  const passwordHash = await hashPassword(password);
  await db
    .update(coffeeStores)
    .set({ passwordHash })
    .where(eq(coffeeStores.id, storeId));
}

export async function verifyStorePassword(storeId: string, password: string): Promise<boolean> {
  await initDatabase();
  const rows = await db
    .select({ passwordHash: coffeeStores.passwordHash })
    .from(coffeeStores)
    .where(eq(coffeeStores.id, storeId))
    .limit(1);
  const hash = rows[0]?.passwordHash;
  if (!hash) return false;
  const { verifyPassword } = await import("@/lib/auth/password");
  return verifyPassword(password, hash);
}

export function createEmailVerificationToken(): string {
  return uuidv4();
}

export async function requestEmailVerification(storeId: string): Promise<string> {
  await initDatabase();
  const token = createEmailVerificationToken();
  await db
    .update(coffeeStores)
    .set({ emailVerificationToken: token })
    .where(eq(coffeeStores.id, storeId));
  return token;
}

export async function verifyEmailByToken(token: string): Promise<boolean> {
  await initDatabase();
  const rows = await db
    .select({ id: coffeeStores.id })
    .from(coffeeStores)
    .where(eq(coffeeStores.emailVerificationToken, token))
    .limit(1);
  const store = rows[0];
  if (!store) return false;
  await db
    .update(coffeeStores)
    .set({ emailVerified: true, emailVerificationToken: null })
    .where(eq(coffeeStores.id, store.id));
  return true;
}

export function getSecurityStatus(store: typeof coffeeStores.$inferSelect) {
  return {
    hasPassword: Boolean(store.passwordHash),
    emailVerified: store.emailVerified,
    setupComplete: Boolean(store.passwordHash) && store.emailVerified,
  };
}
