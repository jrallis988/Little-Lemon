"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Minus, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MEMBERSHIP_PLANS,
  PRICING_MATRIX,
  formatCurrency,
  type MembershipTier,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

function CellValue({ value }: { value: string }) {
  const negative =
    value.toLowerCase().startsWith("not included") ||
    value.toLowerCase() === "—";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium",
        negative ? "text-white/40" : "text-white"
      )}
    >
      {negative ? (
        <Minus className="h-3.5 w-3.5" aria-hidden />
      ) : value.toLowerCase().includes("included") ||
        value.toLowerCase().includes("anytime") ? (
        <Check className="h-3.5 w-3.5 text-pf-yellow" aria-hidden />
      ) : null}
      {value}
    </span>
  );
}

export function PricingMatrix({
  clubId,
}: {
  clubId?: string | null;
}) {
  const joinHref = (tier: MembershipTier) =>
    clubId ? `/join?club=${clubId}&plan=${tier}` : `/join?plan=${tier}`;

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative scroll-mt-20 overflow-hidden bg-[#14081f] text-white"
    >
      <div className="absolute inset-0 opacity-40">
        <Image
          src="/images/floor-gym.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#14081f]/85" />
      </div>

      <div className="container relative py-8 md:py-9">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-end">
          <div className="animate-fade-up">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pf-yellow">
              Membership options
            </p>
            <h2
              id="pricing-heading"
              className="mt-1 font-display text-3xl tracking-tight md:text-4xl"
            >
              Two ways to join. Full price list, no surprises.
            </h2>
          </div>
          <p className="animate-fade-up text-sm text-white/70 [animation-delay:60ms] md:text-base">
            Classic for your home club. Black Card for more locations and spa
            perks. Dues, annual fee, and cancel terms stay on this page.
          </p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {MEMBERSHIP_PLANS.map((plan, index) => {
            const featured = plan.id === "black-card";
            return (
              <article
                key={plan.id}
                className={cn(
                  "animate-fade-up border p-5",
                  featured
                    ? "border-pf-yellow/50 bg-[linear-gradient(160deg,#5c2d91_0%,#2f124a_100%)]"
                    : "border-white/15 bg-white/5"
                )}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                    {plan.name}
                  </h3>
                  {featured ? (
                    <Badge variant="yellow">Most chosen</Badge>
                  ) : (
                    <Badge className="bg-white/10 text-white">Home club</Badge>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-white/70">{plan.tagline}</p>
                <p className="mt-4 flex items-end gap-1">
                  <span className="font-display text-4xl tracking-tight md:text-5xl">
                    {formatCurrency(plan.monthlyDues)}
                  </span>
                  <span className="mb-1 text-sm font-medium text-white/60">
                    / month
                  </span>
                </p>
                <dl className="mt-3 space-y-1.5 border-t border-white/15 pt-3 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-white/55">Enrollment fee</dt>
                    <dd className="font-semibold">
                      {formatCurrency(plan.enrollmentFee)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-white/55">
                      Annual fee ({plan.annualFeeMonth})
                    </dt>
                    <dd className="font-semibold">
                      {formatCurrency(plan.annualFee)} / year
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-white/55">Cancellation</dt>
                    <dd className="font-semibold">Anytime · $0 fee</dd>
                  </div>
                </dl>
                <ul className="mt-4 space-y-1.5">
                  {plan.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-pf-yellow"
                        aria-hidden
                      />
                      <span className="text-white/85">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={featured ? "default" : "outline"}
                  size="lg"
                  className={cn(
                    "mt-5 w-full",
                    !featured &&
                      "border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Link href={joinHref(plan.id)}>Start with {plan.name}</Link>
                </Button>
              </article>
            );
          })}
        </div>

        <div className="mt-6 animate-fade-up overflow-x-auto border border-white/15 bg-black/25 [animation-delay:120ms]">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <caption className="sr-only">
              Side-by-side comparison of Classic and Black Card membership fees
              and what’s included at the gym
            </caption>
            <thead>
              <tr className="bg-white/5">
                <th
                  scope="col"
                  className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-white/50 md:px-5"
                >
                  What you pay &amp; get at the gym
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-display text-xl text-white md:px-5"
                >
                  Classic
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-display text-xl text-pf-yellow md:px-5"
                >
                  Black Card
                </th>
              </tr>
            </thead>
            <tbody>
              {PRICING_MATRIX.map((row) => (
                <tr
                  key={row.label}
                  className="border-t border-white/10 align-top"
                >
                  <th
                    scope="row"
                    className="px-4 py-3 text-sm font-semibold text-white md:px-5"
                  >
                    {row.label}
                    {row.note ? (
                      <p className="mt-1 font-normal text-xs text-white/45">
                        {row.note}
                      </p>
                    ) : null}
                  </th>
                  <td className="px-4 py-3 md:px-5">
                    <CellValue value={row.classic} />
                  </td>
                  <td className="px-4 py-3 md:px-5">
                    <CellValue value={row.blackCard} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-start gap-3 border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-pf-yellow" />
          <p>
            Starting rates shown above. Your club confirms the final local price
            before you pay. After you join, use the Planet Fitness app to check
            in, unlock the door, and manage your account.
          </p>
        </div>
      </div>
    </section>
  );
}
