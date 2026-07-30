import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { plans } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plans & Pricing",
  description:
    "Compare Morgan Bright Classroom, School, and District plans for academic software purchasing.",
};

export default function PlansPage() {
  return (
    <>
      <PageHero
        eyebrow="Plans"
        title="Choose the license that fits your setting."
        description="Start with a classroom seat, expand to a full campus, or roll out across a district with centralized administration."
        actions={
          <>
            <Link href="/demo?type=pricing" className="btn-primary">
              Get pricing
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
              className="flex h-full flex-col rounded border border-line bg-white p-6 shadow-card"
            >
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-accent">
                {plan.bestFor}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-navy">{plan.name}</h2>
              <p className="mt-2 text-lg font-semibold text-ink">{plan.price}</p>
              <p className="mt-3 text-base leading-relaxed text-mute">
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
    </>
  );
}
