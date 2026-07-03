import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { PLATFORM_COMMISSION_RATE } from "@/lib/platform";

export const coffeeStores = sqliteTable("coffee_stores", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  storeName: text("store_name").notNull(),
  ownerName: text("owner_name").notNull(),
  email: text("email").notNull().unique(),
  country: text("country").notNull(),
  city: text("city").default(""),
  phone: text("phone").default(""),
  specialty: text("specialty").notNull(),
  businessType: text("business_type").notNull().default("tostador"),
  retailChannel: text("retail_channel").default(""),
  monthlyVolumeKg: integer("monthly_volume_kg"),
  commissionRate: real("commission_rate").notNull().default(PLATFORM_COMMISSION_RATE),
  description: text("description").default(""),
  status: text("status").notNull().default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const retailSalesReports = sqliteTable("retail_sales_reports", {
  id: text("id").primaryKey(),
  storeId: text("store_id"),
  storeEmail: text("store_email").notNull(),
  storeName: text("store_name").notNull(),
  periodMonth: text("period_month").notNull(),
  channel: text("channel").notNull(),
  productName: text("product_name").notNull(),
  unitsSold: integer("units_sold"),
  kgSold: real("kg_sold").notNull(),
  avgPriceUsd: real("avg_price_usd"),
  city: text("city").default(""),
  region: text("region").default(""),
  notes: text("notes").default(""),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const buyerInquiries = sqliteTable("buyer_inquiries", {
  id: text("id").primaryKey(),
  productId: text("product_id").notNull(),
  productName: text("product_name").notNull(),
  buyerName: text("buyer_name").notNull(),
  company: text("company").default(""),
  email: text("email").notNull(),
  country: text("country").notNull(),
  channel: text("channel").notNull(),
  volumeKg: integer("volume_kg"),
  message: text("message").default(""),
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
