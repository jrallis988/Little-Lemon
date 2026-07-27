"use client";

import dynamic from "next/dynamic";
import { ClubLocator } from "@/components/club-locator";
import { SelectedClubProvider } from "@/components/selected-club-context";

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
      <PricingMatrix />
      <footer className="pf-grad-footer text-white">
        <div className="flex flex-col gap-4 px-4 py-8 md:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-2xl tracking-tight text-pf-yellow">
              Planet Fitness
            </p>
            <a
              href="https://www.planetfitness.com/mobileapp"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-pf-purple transition hover:bg-white/90"
            >
              Download the PF App
            </a>
          </div>
          <div className="grid gap-6 border-t border-white/20 pt-5 text-sm text-white/85 sm:grid-cols-3">
            <div>
              <p className="mb-2 font-semibold text-white">Info</p>
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
                  <a className="hover:underline" href="/join">
                    Join Now
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-semibold text-white">Legal</p>
              <ul className="space-y-1.5 text-white/75">
                <li>Privacy Policy</li>
                <li>Terms and Conditions of Use</li>
                <li>Accessibility</li>
              </ul>
            </div>
            <div className="text-white/70 sm:text-right">
              <p>Find a club and join here.</p>
              <p className="mt-1">Day-to-day gym tools live in the app.</p>
              <p className="mt-4 text-xs text-white/55">
                © 2026 Planet Fitness Franchising, LLC.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </SelectedClubProvider>
  );
}
