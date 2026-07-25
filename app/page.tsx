import { ClubLocator } from "@/components/club-locator";
import { Hero } from "@/components/hero";
import { PricingMatrix } from "@/components/pricing-matrix";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClubLocator />
      <PricingMatrix />
      <footer className="border-t border-pf-line bg-pf-mist/50">
        <div className="container flex flex-col gap-2 py-10 text-sm text-pf-ink/60 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-lg tracking-tight text-pf-purple">
            Planet Fitness
          </p>
          <p>
            Website for discovery &amp; signup. Member tools live in the mobile
            app.
          </p>
        </div>
      </footer>
    </>
  );
}
