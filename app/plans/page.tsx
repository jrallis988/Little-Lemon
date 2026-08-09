import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { plans } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plans & Pricing",
  description:
    "Compare Morgan Bright Classroom, School, and District plans with clear starting prices for academic software purchasing.",
};

export default function PlansPage() {
  return (
    <>
      <PageHero
        eyebrow="Plans & pricing"
        title="Transparent starting prices. Clear upgrade path."
        description="Start with a classroom seat, expand to a full campus, or roll out across a district. Annual billing available on every plan."
        actions={
          <>
            <Link href="/demo?type=pricing" className="btn-primary">
              Get a quote
            </Link>
            <Link href="/demo" className="btn-outline">
              Request a demo
            </Link>
          </>
        }
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-site gap-6 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`relative flex h-full flex-col rounded border bg-white p-6 shadow-card ${
                plan.featured ? "border-accent ring-2 ring-accent/20" : "border-line"
              }`}
            >
              {plan.featured ? (
                <span className="absolute -top-3 left-6 bg-accent px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] text-white">
                  Most popular
                </span>
              ) : null}
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-accent">
                {plan.bestFor}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-navy">{plan.name}</h2>
              <p className="mt-3 text-ink">
                <span className="text-3xl font-bold">{plan.price}</span>{" "}
                <span className="text-sm font-semibold text-mute">
                  {plan.priceSuffix}
                </span>
              </p>
              <p className="mt-1 text-sm text-mute">{plan.billingNote}</p>
              <p className="mt-4 text-base leading-relaxed text-mute">
                {plan.summary}
              </p>
              <ul className="mt-6 flex-1 space-y-2 border-t border-line pt-5">
                {plan.highlights.map((item) => (
                  <li key={item} className="text-sm text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/demo?type=pricing&plan=${plan.name}`}
                className="btn-primary mt-8"
              >
                Request {plan.name} pricing
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-paper-warm">
        <div className="mx-auto max-w-site px-5 py-12 sm:px-8 sm:py-16">
          <h2 className="text-2xl font-bold text-navy">Pricing notes</h2>
          <ul className="mt-4 space-y-2 text-base text-mute">
            <li>Classroom plans can be purchased by individual teachers.</li>
            <li>School and District plans are quoted based on seat count and rollout scope.</li>
            <li>Pilot pricing is available for first-semester campus evaluations.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
