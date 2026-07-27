import { ClubLocator } from "@/components/club-locator";
import { Hero } from "@/components/hero";
import { PricingMatrix } from "@/components/pricing-matrix";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClubLocator />
      <PricingMatrix />
      <footer className="border-t border-white/10 bg-pf-ink text-white">
        <div className="container flex flex-col gap-1 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-lg tracking-tight text-pf-yellow">
            Planet Fitness
          </p>
          <p>
            Find a club and start a membership here. Day-to-day gym tools live in
            the app.
          </p>
        </div>
      </footer>
    </>
  );
}
