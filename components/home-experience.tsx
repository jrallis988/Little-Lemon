"use client";

import dynamic from "next/dynamic";
import { AppPromo } from "@/components/app-promo";
import { BrandPerks } from "@/components/brand-perks";
import { ClubLocator } from "@/components/club-locator";
import { GetStarted } from "@/components/get-started";
import { PlanetFitnessLogo } from "@/components/brand-logo";
import { PricingDisclaimer } from "@/components/pricing-disclaimer";
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

export function HomeExperience() {
  return (
    <SelectedClubProvider>
      <ClubLocator />
      <BrandPerks />
      <PricingMatrix />
      <PricingDisclaimer />
      <SummerPass />
      <AppPromo />
      <VirtualTour />
      <GetStarted />
      <footer className="pf-grad-footer text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 md:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <a href="#clubs" className="inline-flex">
              <PlanetFitnessLogo
                className="[&_span]:text-pf-yellow"
                markClassName="h-9 w-9"
              />
            </a>
            <a
              href="https://www.planetfitness.com/mobileapp"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-pf-purple transition hover:bg-white/90"
            >
              Download the PF App
            </a>
          </div>

          <div className="grid gap-8 border-t border-white/20 pt-6 text-sm text-white/85 sm:grid-cols-3">
            <div>
              <p className="mb-2 font-semibold text-white">Explore</p>
              <ul className="space-y-1.5">
                <li>
                  <a className="hover:underline" href="#clubs">
                    Find a Club
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#pricing">
                    Memberships
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#tour">
                    Virtual Tour
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#summer-pass">
                    Summer Pass
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="/join">
                    Join Now
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-semibold text-white">Legal</p>
              <ul className="space-y-1.5 text-white/75">
                <li>
                  <a
                    className="hover:underline"
                    href="https://www.planetfitness.com/privacy-policy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    className="hover:underline"
                    href="https://www.planetfitness.com/terms-conditions"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Terms and Conditions of Use
                  </a>
                </li>
                <li>
                  <a
                    className="hover:underline"
                    href="https://www.planetfitness.com/accessibility"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-white/70 sm:text-right">
              <p>Find a club, compare plans, and join here.</p>
              <p className="mt-1">
                Crowd Meter, check-in, and digital keytag live in the app.
              </p>
              <p className="mt-4 text-xs text-white/55">
                © 2026 Planet Fitness Franchising, LLC. Locations independently
                owned and operated.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </SelectedClubProvider>
  );
}
