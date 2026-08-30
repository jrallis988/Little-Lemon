import {
  HomeCategories,
  HomeDeals,
  HomeFollow,
  HomeHealthMatters,
  HomeHero,
  HomePharmacyPreview,
  HomePickup,
  HomeQuickPaths,
  HomeShopPreview,
} from "@/components/home/home-sections";
import { HomeForYou } from "@/components/home/home-for-you";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeQuickPaths />
      <HomeDeals />
      <HomeForYou />
      <HomeHealthMatters />
      <HomeCategories />
      <HomePharmacyPreview />
      <HomePickup />
      <HomeFollow />
      <HomeShopPreview />
    </>
  );
}
