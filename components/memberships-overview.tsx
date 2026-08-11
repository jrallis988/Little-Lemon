"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSelectedClub } from "@/components/selected-club-context";
import { track } from "@/lib/analytics";
import {
  MEMBERSHIP_PLANS,
  formatCurrency,
  getLocalPricing,
} from "@/lib/pricing";
import { HOME_CLUB } from "@/lib/home-club";
import { getClubById } from "@/lib/clubs";

/**
 * Memberships dual-card section from the PF desktop reference.
 */
export function MembershipsOverview() {
  const { club } = useSelectedClub();
  const home = club ?? getClubById(HOME_CLUB.id);
  const clubId = home?.id ?? HOME_CLUB.id;

  const classic = home
    ? getLocalPricing(home, "classic")
    : {
        monthlyDues: MEMBERSHIP_PLANS[0]!.monthlyDues,
        available: true,
      };
  const black = home
    ? getLocalPricing(home, "black-card")
    : {
        monthlyDues: MEMBERSHIP_PLANS[1]!.monthlyDues,
        available: true,
      };

  const joinHref = (plan: "classic" | "black-card") =>
    `/join?club=${clubId}&plan=${plan}`;

  return (
    <section
      id="pricing"
      aria-labelledby="memberships-heading"
      className="scroll-mt-14 bg-white px-4 py-12 text-pf-ink md:px-6 md:py-16"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="memberships-heading"
          className="pf-type-section text-center text-pf-ink"
        >
          Memberships
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center font-sans text-base leading-relaxed text-pf-ink/70">
          We offer the PF Black Card® Membership and Classic Membership. Both
          get you access to The Judgement Free Zone®, and tons of cardio and
          strength equipment.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {/* Black Card */}
          <article className="relative flex flex-col rounded-3xl bg-[#2a1250] p-6 text-white shadow-[0_16px_40px_-20px_rgba(42,18,80,0.65)] md:p-7">
            <span className="absolute right-5 top-5 rounded-full bg-pf-yellow px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-pf-ink">
              Best Value
            </span>
            <h3 className="pr-24 font-display text-2xl uppercase tracking-tight">
              PF Black Card®
            </h3>
            <p className="mt-4 font-display text-3xl text-pf-yellow md:text-4xl">
              Starting at {formatCurrency(black.monthlyDues)}
              <span className="text-2xl">/mo</span>
              <span className="align-super text-base">*</span>
            </p>
            <p className="mt-1 text-sm text-white/70">plus taxes &amp; fees</p>
            <p className="mt-4 text-sm leading-relaxed text-white/90">
              Access to any club, bring a guest anytime, PF+ premium digital
              workouts, and so much more!
            </p>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8">
              <Link
                href="#welcome"
                className="text-sm font-semibold text-white underline-offset-2 hover:underline"
              >
                Learn More
              </Link>
              <Button asChild variant="app" className="rounded-full">
                <Link
                  href={joinHref("black-card")}
                  onClick={() =>
                    track("plan_select", {
                      plan: "black-card",
                      clubId,
                      source: "memberships_overview",
                    })
                  }
                >
                  Join Now
                </Link>
              </Button>
            </div>
          </article>

          {/* Classic */}
          <article className="relative flex flex-col rounded-3xl bg-[#f0f0f3] p-6 text-pf-ink ring-1 ring-black/5 md:p-7">
            <h3 className="font-display text-2xl uppercase tracking-tight">
              Classic
            </h3>
            <p className="mt-4 font-display text-3xl text-pf-purple md:text-4xl">
              Starting at {formatCurrency(classic.monthlyDues)}
              <span className="text-2xl">/mo</span>
              <span className="align-super text-base">*</span>
            </p>
            <p className="mt-1 text-sm text-pf-ink/60">plus taxes &amp; fees</p>
            <p className="mt-4 text-sm leading-relaxed text-pf-ink/75">
              Our standard membership, with unlimited access to your home club.
            </p>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8">
              <Link
                href="#welcome"
                className="text-sm font-semibold text-pf-purple underline-offset-2 hover:underline"
              >
                Learn More
              </Link>
              <Button asChild variant="purple" className="rounded-full">
                <Link
                  href={joinHref("classic")}
                  onClick={() =>
                    track("plan_select", {
                      plan: "classic",
                      clubId,
                      source: "memberships_overview",
                    })
                  }
                >
                  Join Now
                </Link>
              </Button>
            </div>
          </article>
        </div>

        <p className="mt-6 text-center text-[11px] text-pf-ink/50">
          *Starting rates for {home?.name ?? HOME_CLUB.name}. Final dues are
          confirmed before you join.
        </p>
      </div>
    </section>
  );
}
