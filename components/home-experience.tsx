"use client";

import dynamic from "next/dynamic";
import { AppHighlights } from "@/components/app-highlights";
import { AppPromo } from "@/components/app-promo";
import { BrandPerks } from "@/components/brand-perks";
import { ClubLocator } from "@/components/club-locator";
import { GetStarted } from "@/components/get-started";
import { JoinOffer } from "@/components/join-offer";
import { SelectedClubProvider } from "@/components/selected-club-context";
import { SummerPass } from "@/components/summer-pass";
import { VirtualTour } from "@/components/virtual-tour";

const PricingMatrix = dynamic(
  () =>
    import("@/components/pricing-matrix").then((mod) => mod.PricingMatrix),
  {
    ssr: true,
    loading: () => <div className="min-h-64 pf-grad-clubs" aria-hidden />,
  }
);

/** Public web acquisition composition (Screens 01–20). */
export function HomeExperience() {
  return (
    <SelectedClubProvider>
      <JoinOffer />
      <ClubLocator />
      <PricingMatrix />
      <SummerPass />
      <BrandPerks />
      <AppPromo />
      <AppHighlights />
      <VirtualTour />
      <GetStarted />
    </SelectedClubProvider>
  );
}
