"use client";

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
        negative ? "text-pf-ink/45" : "text-pf-ink"
      )}
    >
      {negative ? (
        <Minus className="h-3.5 w-3.5" aria-hidden />
      ) : value.toLowerCase().includes("included") ||
        value.toLowerCase().includes("anytime") ? (
        <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
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
      className="scroll-mt-24 border-t border-pf-line/80 bg-white"
    >
      <div className="container py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pf-purple">
            Membership options
          </p>
          <h2
            id="pricing-heading"
            className="mt-3 font-display text-4xl tracking-tight text-pf-ink md:text-5xl"
          >
            Two ways to join. The full price list stays visible.
          </h2>
          <p className="mt-3 text-base text-pf-ink/70 md:text-lg">
            Classic for your home club. Black Card if you want more locations and
            spa amenities. Monthly dues, annual fee, and cancel terms—all right
            here.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {MEMBERSHIP_PLANS.map((plan, index) => {
            const featured = plan.id === "black-card";
            return (
              <article
                key={plan.id}
                className={cn(
                  "animate-fade-up rounded-xl border p-6 md:p-7",
                  featured
                    ? "border-pf-purple bg-[linear-gradient(165deg,#2f124a_0%,#5c2d91_55%,#6e3aa8_100%)] text-white shadow-lift"
                    : "border-pf-line bg-pf-mist/40 text-pf-ink"
                )}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-3xl tracking-tight">
                    {plan.name}
                  </h3>
                  {featured ? (
                    <Badge variant="yellow">Most chosen</Badge>
                  ) : (
                    <Badge variant="muted">Home club</Badge>
                  )}
                </div>
                <p
                  className={cn(
                    "mt-2 text-sm",
                    featured ? "text-white/75" : "text-pf-ink/65"
                  )}
                >
                  {plan.tagline}
                </p>
                <p className="mt-6 flex items-end gap-1">
                  <span className="font-display text-5xl tracking-tight">
                    {formatCurrency(plan.monthlyDues)}
                  </span>
                  <span
                    className={cn(
                      "mb-1 text-sm font-medium",
                      featured ? "text-white/70" : "text-pf-ink/55"
                    )}
                  >
                    / month
                  </span>
                </p>
                <dl
                  className={cn(
                    "mt-4 space-y-2 border-t pt-4 text-sm",
                    featured ? "border-white/15" : "border-pf-line"
                  )}
                >
                  <div className="flex justify-between gap-3">
                    <dt className={featured ? "text-white/65" : "text-pf-ink/55"}>
                      Enrollment fee
                    </dt>
                    <dd className="font-semibold">
                      {formatCurrency(plan.enrollmentFee)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className={featured ? "text-white/65" : "text-pf-ink/55"}>
                      Annual fee ({plan.annualFeeMonth})
                    </dt>
                    <dd className="font-semibold">
                      {formatCurrency(plan.annualFee)} / year
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className={featured ? "text-white/65" : "text-pf-ink/55"}>
                      Cancellation
                    </dt>
                    <dd className="font-semibold">Anytime · $0 fee</dd>
                  </div>
                </dl>
                <ul className="mt-5 space-y-2">
                  {plan.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          featured ? "text-pf-yellow" : "text-pf-purple"
                        )}
                        aria-hidden
                      />
                      <span className={featured ? "text-white/90" : "text-pf-ink/80"}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={featured ? "default" : "purple"}
                  size="lg"
                  className="mt-6 w-full"
                >
                  <Link href={joinHref(plan.id)}>Start with {plan.name}</Link>
                </Button>
              </article>
            );
          })}
        </div>

        <div className="mt-10 animate-fade-up overflow-x-auto rounded-xl border border-pf-line [animation-delay:160ms]">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <caption className="sr-only">
              Side-by-side comparison of Classic and Black Card membership fees
              and what’s included at the gym
            </caption>
            <thead>
              <tr className="bg-pf-mist/80">
                <th
                  scope="col"
                  className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-pf-ink/55 md:px-5"
                >
                  What you pay &amp; get at the gym
                </th>
                <th
                  scope="col"
                  className="px-4 py-4 font-display text-xl text-pf-ink md:px-5"
                >
                  Classic
                </th>
                <th
                  scope="col"
                  className="px-4 py-4 font-display text-xl text-pf-purple md:px-5"
                >
                  Black Card
                </th>
              </tr>
            </thead>
            <tbody>
              {PRICING_MATRIX.map((row) => (
                <tr
                  key={row.label}
                  className="border-t border-pf-line align-top"
                >
                  <th
                    scope="row"
                    className="px-4 py-4 text-sm font-semibold text-pf-ink md:px-5"
                  >
                    {row.label}
                    {row.note ? (
                      <p className="mt-1 font-normal text-xs text-pf-ink/50">
                        {row.note}
                      </p>
                    ) : null}
                  </th>
                  <td className="px-4 py-4 md:px-5">
                    <CellValue value={row.classic} />
                  </td>
                  <td className="px-4 py-4 md:px-5">
                    <CellValue value={row.blackCard} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-lg bg-pf-mist/70 px-4 py-3 text-sm text-pf-ink/70">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-pf-purple" />
          <p>
            Starting rates shown above. Your club confirms the final local price
            before you pay. After you join, use the Planet Fitness app to check
            in, open the door with your digital keytag, and manage your account.
          </p>
        </div>
      </div>
    </section>
  );
}
