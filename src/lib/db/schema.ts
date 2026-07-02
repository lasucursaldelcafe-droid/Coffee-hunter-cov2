import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const coffeeStores = sqliteTable("coffee_stores", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  storeName: text("store_name").notNull(),
  ownerName: text("owner_name").notNull(),
  email: text("email").notNull().unique(),
  country: text("country").notNull(),
  specialty: text("specialty").notNull(),
  plan: text("plan").notNull().default("Starter"),
  description: text("description").default(""),
  status: text("status").notNull().default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const logisticsQuotes = sqliteTable("logistics_quotes", {
  id: text("id").primaryKey(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  country: text("country").notNull(),
  serviceType: text("service_type").notNull(),
  volumeKg: integer("volume_kg"),
  message: text("message").default(""),
  status: text("status").notNull().default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
