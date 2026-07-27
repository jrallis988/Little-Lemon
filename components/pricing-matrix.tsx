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
      className="relative scroll-mt-14 overflow-hidden bg-[#0f0618] text-white"
    >
      {/* Photo rail — fills visual width before pricing */}
      <div className="relative">
        <div className="grid h-28 grid-cols-3 gap-0.5 sm:h-36 md:h-44">
          <div className="relative">
            <Image
              src="/images/hero-gym.jpg"
              alt=""
              fill
              className="object-cover object-[center_40%]"
              sizes="33vw"
            />
          </div>
          <div className="relative">
            <Image
              src="/images/floor-gym.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
          <div className="relative">
            <Image
              src="/images/cardio-gym.jpg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="33vw"
            />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f0618] via-[#0f0618]/35 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-3 md:px-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pf-yellow">
              Membership options
            </p>
            <h2
              id="pricing-heading"
              className="font-display text-2xl tracking-tight text-white sm:text-3xl md:text-4xl"
            >
              Two ways to join. Full price list on the page.
            </h2>
          </div>
        </div>
      </div>

      <div className="px-0 py-0 md:py-0">
        <div className="grid gap-0.5 lg:grid-cols-2">
          {MEMBERSHIP_PLANS.map((plan, index) => {
            const featured = plan.id === "black-card";
            return (
              <article
                key={plan.id}
                className={cn(
                  "animate-fade-up p-4 md:p-5",
                  featured
                    ? "bg-[linear-gradient(160deg,#5c2d91_0%,#2f124a_100%)] ring-1 ring-inset ring-pf-yellow"
                    : "bg-[#1a0d28] ring-1 ring-inset ring-white/10"
                )}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-2xl tracking-tight">
                    {plan.name}
                  </h3>
                  {featured ? (
                    <Badge variant="yellow">Most chosen</Badge>
                  ) : (
                    <Badge className="bg-white/10 text-white">Home club</Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-white/70">{plan.tagline}</p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                  <p className="flex items-end gap-1">
                    <span className="font-display text-4xl tracking-tight">
                      {formatCurrency(plan.monthlyDues)}
                    </span>
                    <span className="mb-1 text-sm text-white/55">/ month</span>
                  </p>
                  <dl className="grid grid-cols-3 gap-x-3 text-[11px] uppercase tracking-wide text-white/55">
                    <div>
                      <dt>Enroll</dt>
                      <dd className="text-sm font-semibold normal-case tracking-normal text-white">
                        {formatCurrency(plan.enrollmentFee)}
                      </dd>
                    </div>
                    <div>
                      <dt>Annual</dt>
                      <dd className="text-sm font-semibold normal-case tracking-normal text-white">
                        {formatCurrency(plan.annualFee)}
                      </dd>
                    </div>
                    <div>
                      <dt>Cancel</dt>
                      <dd className="text-sm font-semibold normal-case tracking-normal text-white">
                        $0 fee
                      </dd>
                    </div>
                  </dl>
                </div>
                <ul className="mt-3 grid gap-1 border-t border-white/15 pt-3 sm:grid-cols-2">
                  {plan.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-sm">
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pf-yellow"
                        aria-hidden
                      />
                      <span className="text-white/85">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={featured ? "default" : "outline"}
                  className={cn(
                    "mt-3 w-full",
                    !featured &&
                      "border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Link href={joinHref(plan.id)}>Start with {plan.name}</Link>
                </Button>
              </article>
            );
          })}
        </div>

        <div className="overflow-x-auto bg-black/50">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <caption className="sr-only">
              Classic vs Black Card membership comparison
            </caption>
            <thead>
              <tr className="bg-white/5">
                <th
                  scope="col"
                  className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white/45 md:px-5"
                >
                  At the gym
                </th>
                <th scope="col" className="px-4 py-2.5 font-display text-lg md:px-5">
                  Classic
                </th>
                <th
                  scope="col"
                  className="px-4 py-2.5 font-display text-lg text-pf-yellow md:px-5"
                >
                  Black Card
                </th>
              </tr>
            </thead>
            <tbody>
              {PRICING_MATRIX.map((row) => (
                <tr key={row.label} className="border-t border-white/10">
                  <th
                    scope="row"
                    className="px-4 py-2.5 text-left text-sm font-semibold text-white md:px-5"
                  >
                    {row.label}
                    {row.note ? (
                      <p className="mt-0.5 font-normal text-[11px] text-white/40">
                        {row.note}
                      </p>
                    ) : null}
                  </th>
                  <td className="px-4 py-2.5 md:px-5">
                    <CellValue value={row.classic} />
                  </td>
                  <td className="px-4 py-2.5 md:px-5">
                    <CellValue value={row.blackCard} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="flex items-start gap-2 px-4 py-3 text-xs text-white/55 md:px-5 md:text-sm">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-pf-yellow" />
          Starting rates shown. Your club confirms the final local price before
          you pay. Check-in and digital keytag live in the Planet Fitness app.
        </p>
      </div>
    </section>
  );
}
