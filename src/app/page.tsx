import {
  HomeHero,
  HomePharmacyPreview,
  HomeServices,
  HomeShopPreview,
} from "@/components/home/home-sections";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomePharmacyPreview />
      <HomeServices />
      <HomeShopPreview />
    </>
  );
}
