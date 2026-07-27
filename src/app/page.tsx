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

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeQuickPaths />
      <HomeDeals />
      <HomeHealthMatters />
      <HomeCategories />
      <HomePharmacyPreview />
      <HomePickup />
      <HomeFollow />
      <HomeShopPreview />
    </>
  );
}
