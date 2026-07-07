import { TradeHero } from "@/components/home/TradeHero";
import { ReadySection } from "@/components/home/ReadySection";
import { PlatformDifference } from "@/components/home/PlatformDifference";
import { HowItWorks } from "@/components/home/HowItWorks";
import { StoreSpotlight } from "@/components/home/StoreSpotlight";
import { FeaturedCatalog } from "@/components/home/FeaturedCatalog";
import { ShopPaths } from "@/components/home/ShopPaths";
import { TestimonialBanner } from "@/components/home/TestimonialBanner";
import { OriginMarquee } from "@/components/home/OriginMarquee";
import { products, stores } from "@/lib/data";

export default function HomePage() {
  const featuredProducts = products.slice(0, 3);
  const featuredStores = stores.slice(0, 4);

  return (
    <>
      <TradeHero />
      <ReadySection />
      <PlatformDifference />
      <HowItWorks />
      <StoreSpotlight stores={featuredStores} />
      <FeaturedCatalog products={featuredProducts} />
      <ShopPaths />
      <TestimonialBanner />
      <OriginMarquee />
    </>
  );
}
