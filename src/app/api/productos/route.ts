import { NextResponse } from "next/server";
import { getMarketplaceProducts } from "@/lib/marketplace/catalog";

export async function GET() {
  try {
    const products = await getMarketplaceProducts();
    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ products: [] });
  }
}
