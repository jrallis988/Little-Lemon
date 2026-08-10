import { CreditCard, Gauge, Search } from "lucide-react";
import { PricingDisclaimer } from "@/components/pricing-disclaimer";
import { PlanetFitnessLogo } from "@/components/brand-logo";

const CARDS = [
  {
    href: "#clubs",
    label: "Find your perfect fit",
    icon: Search,
  },
  {
    href: "#pricing",
    label: "Learn More",
    icon: Gauge,
  },
  {
    href: "/join",
    label: "Set it and forget it",
    icon: CreditCard,
  },
];

export function GetStarted() {
  return (
    <section
      aria-labelledby="get-started-heading"
      className="bg-[#f6f6f8] text-pf-ink"
    >
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
        <h2
          id="get-started-heading"
          className="text-center font-display text-3xl tracking-tight md:text-4xl"
        >
          Get Started Today
        </h2>

        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {CARDS.map((card) => (
            <li key={card.label}>
              <a
                href={card.href}
                className="flex h-full flex-col items-center justify-center rounded-2xl bg-white px-5 py-8 text-center shadow-[0_8px_20px_-14px_rgba(61,9,88,0.35)] ring-1 ring-black/5 transition hover:-translate-y-0.5"
              >
                <card.icon
                  className="h-8 w-8 text-pf-purple"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="mt-3 text-base font-semibold text-pf-ink">
                  {card.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm leading-relaxed text-pf-ink/70 md:text-[15px]">
          Ready to join the Judgement Free Zone®? Find a club near you, compare
          Classic and PF Black Card® memberships, then join online in a few
          short steps. Use the Planet Fitness app for Crowd Meter, digital
          keytag, check-in, and on-demand workout guides — those stay in the
          member app, not on this acquisition site.
        </p>
      </div>

      <div className="bg-pf-purple px-4 py-4 md:px-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <PlanetFitnessLogo
            className="[&_span]:text-white"
            markClassName="h-9 w-9"
          />
          <a
            href="/join"
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-pf-purple"
          >
            Get started for free
          </a>
        </div>
      </div>

      <PricingDisclaimer />
    </section>
  );
}
