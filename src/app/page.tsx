import { HomeHero } from "@/components/home/HomeHero";
import { FindDoctorBand } from "@/components/home/FindDoctorBand";
import { RankingsTicker } from "@/components/home/RankingsTicker";
import { HomeActionCards } from "@/components/home/HomeActionCards";
import { FeatureStories } from "@/components/home/FeatureStories";
import { GivingSection } from "@/components/home/GivingSection";
import { EspanolBanner } from "@/components/home/EspanolBanner";
import { LatestFromBch } from "@/components/home/LatestFromBch";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FindDoctorBand />
      <RankingsTicker />
      <HomeActionCards />
      <FeatureStories />
      <GivingSection />
      <EspanolBanner />
      <LatestFromBch />
      <NewsletterSignup />
    </>
  );
}
