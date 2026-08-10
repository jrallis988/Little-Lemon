"use client";

import dynamic from "next/dynamic";
import { AppHighlights } from "@/components/app-highlights";
import { AppPromo } from "@/components/app-promo";
import { BrandPerks } from "@/components/brand-perks";
import { ClubGear } from "@/components/club-gear";
import { ClubLocator } from "@/components/club-locator";
import { GetStarted } from "@/components/get-started";
import { JoinOffer } from "@/components/join-offer";
import { LocationsSpotlight } from "@/components/locations-spotlight";
import { SelectedClubProvider } from "@/components/selected-club-context";
import { SpaAmenities } from "@/components/spa-amenities";
import { SummerPass } from "@/components/summer-pass";
import { VirtualTour } from "@/components/virtual-tour";
import { WelcomeHero } from "@/components/welcome-hero";
import { WorkoutGuidesPromo } from "@/components/workout-guides-promo";

const PricingMatrix = dynamic(
  () =>
    import("@/components/pricing-matrix").then((mod) => mod.PricingMatrix),
  {
    ssr: true,
    loading: () => <div className="min-h-64 pf-grad-clubs" aria-hidden />,
  }
);

/**
 * Public web screens from PF mobile + desktop references:
 * hero → clubs → memberships → summer pass → offer → welcome/perks →
 * locations → app promo → workout guides → highlights → spa → gear →
 * tour → get started.
 */
export function HomeExperience() {
  return (
    <SelectedClubProvider>
      <WelcomeHero />
      <ClubLocator />
      <PricingMatrix />
      <SummerPass />
      <JoinOffer />
      <BrandPerks />
      <LocationsSpotlight />
      <AppPromo />
      <WorkoutGuidesPromo />
      <AppHighlights />
      <SpaAmenities />
      <ClubGear />
      <VirtualTour />
      <GetStarted />
    </SelectedClubProvider>
  );
}
