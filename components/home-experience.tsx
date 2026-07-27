"use client";

import dynamic from "next/dynamic";
import { ClubLocator } from "@/components/club-locator";
import { SelectedClubProvider } from "@/components/selected-club-context";

const PricingMatrix = dynamic(
  () =>
    import("@/components/pricing-matrix").then((mod) => mod.PricingMatrix),
  {
    ssr: true,
    loading: () => (
      <div className="min-h-64 bg-[#0f0618]" aria-hidden />
    ),
  }
);

export function HomeExperience() {
  return (
    <SelectedClubProvider>
      <ClubLocator />
      <PricingMatrix />
      <footer className="border-t border-white/10 bg-black text-white">
        <div className="flex flex-col gap-1 px-4 py-4 text-sm text-white/55 md:flex-row md:items-center md:justify-between md:px-6">
          <p className="font-display text-base tracking-tight text-pf-yellow">
            Planet Fitness
          </p>
          <p>
            Find a club and join here. Day-to-day gym tools live in the app.
          </p>
        </div>
      </footer>
    </SelectedClubProvider>
  );
}
