"use client";

import { AppHighlights } from "@/components/app-highlights";
import { AppPromo } from "@/components/app-promo";
import { BrandPerks } from "@/components/brand-perks";
import { ClubGear } from "@/components/club-gear";
import { ExploreClubsNearYou } from "@/components/explore-clubs";
import { GetStarted } from "@/components/get-started";
import { JoinOffer } from "@/components/join-offer";
import { LandingHero } from "@/components/landing-hero";
import { LocationsSpotlight } from "@/components/locations-spotlight";
import { MembershipsOverview } from "@/components/memberships-overview";
import { SelectedClubProvider } from "@/components/selected-club-context";
import { SpaAmenities } from "@/components/spa-amenities";
import { SummerPass } from "@/components/summer-pass";
import { VirtualTour } from "@/components/virtual-tour";
import { WorkoutGuidesPromo } from "@/components/workout-guides-promo";

/**
 * Landing order from PF desktop references:
 * STRONG hero → Explore Clubs → Memberships → then supporting sections.
 */
export function HomeExperience() {
  return (
    <SelectedClubProvider>
      <LandingHero />
      <ExploreClubsNearYou />
      <MembershipsOverview />
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
