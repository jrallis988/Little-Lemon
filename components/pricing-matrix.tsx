"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Minus, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSelectedClub } from "@/components/selected-club-context";
import { track } from "@/lib/analytics";
import {
  MEMBERSHIP_PLANS,
  PRICING_MATRIX,
  formatCurrency,
  getLocalPricing,
  type MembershipTier,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

function CellValue({
  value,
  onDark = false,
}: {
  value: string;
  onDark?: boolean;
}) {
  const negative =
    value.toLowerCase().startsWith("not included") ||
    value.toLowerCase().includes("not included") ||
    value.toLowerCase() === "—";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium",
        negative
          ? onDark
            ? "text-white/40"
            : "text-pf-ink/40"
          : onDark
            ? "text-white"
            : "text-pf-ink"
      )}
    >
      {negative ? (
        <Minus className="h-3.5 w-3.5" aria-hidden />
      ) : value.toLowerCase().includes("included") ||
        value.toLowerCase().includes("anytime") ? (
        <Check
          className={cn(
            "h-3.5 w-3.5",
            onDark ? "text-pf-yellow" : "text-pf-purple"
          )}
          aria-hidden
        />
      ) : null}
      {value}
    </span>
  );
}

export function PricingMatrix() {
  const { club } = useSelectedClub();
  const clubId = club?.id ?? null;

  const joinHref = (tier: MembershipTier) =>
    clubId ? `/join?club=${clubId}&plan=${tier}` : `/join?plan=${tier}`;

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative scroll-mt-14 overflow-hidden bg-pf-mist text-pf-ink"
    >
      <div className="relative">
        <div className="grid h-28 grid-cols-3 gap-0.5 sm:h-36 md:h-44">
          <div className="relative">
            <Image
              src="/images/hero-gym.jpg"
              alt=""
              fill
              className="object-cover object-[center_40%]"
              sizes="33vw"
              loading="lazy"
            />
          </div>
          <div className="relative">
            <Image
              src="/images/floor-gym.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="33vw"
              loading="lazy"
            />
          </div>
          <div className="relative">
            <Image
              src="/images/cardio-gym.jpg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="33vw"
              loading="lazy"
            />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pf-purple-deep via-pf-purple/50 to-pf-purple/20" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-3 md:px-5">
          <div>
            <h2
              id="pricing-heading"
              className="font-display text-2xl tracking-tight text-white sm:text-3xl md:text-4xl"
            >
              Memberships
            </h2>
            {club ? (
              <p className="mt-1 max-w-2xl text-sm text-white/80">
                Local rates for{" "}
                <span className="font-semibold text-white">{club.name}</span>.
                Both get you access to The Judgement Free Zone®, and tons of
                cardio and strength equipment.
              </p>
            ) : (
              <p className="mt-1 max-w-2xl text-sm text-white/70">
                We offer the PF Black Card® Membership and Classic Membership.
                Both get you access to The Judgement Free Zone®, and tons of
                cardio and strength equipment. Pick a club to lock local dues.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-white to-pf-mist px-4 py-5 md:px-6 md:py-6">
        <div className="mx-auto grid max-w-5xl gap-3 lg:grid-cols-2">
          {MEMBERSHIP_PLANS.map((plan, index) => {
            const featured = plan.id === "black-card";
            const local = getLocalPricing(club, plan.id);
            const unavailable = club ? !local.available : false;
            return (
              <article
                key={plan.id}
                className={cn(
                  "animate-fade-up rounded-3xl p-5 shadow-[0_8px_24px_-12px_rgba(61,9,88,0.35)] md:p-6",
                  featured
                    ? "pf-grad-black-card text-white"
                    : "border border-pf-line/80 bg-white text-pf-ink",
                  unavailable && "opacity-55"
                )}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className={cn(
                      "font-display text-2xl tracking-tight uppercase",
                      featured ? "text-white" : "text-pf-ink"
                    )}
                  >
                    {featured ? "PF Black Card®" : plan.name}
                  </h3>
                  {unavailable ? (
                    <Badge className="bg-black/20 text-white">
                      Not at this club
                    </Badge>
                  ) : featured ? (
                    <Badge variant="yellow">
                      {club ? "Local rate" : "Best Value"}
                    </Badge>
                  ) : (
                    <Badge className="bg-pf-mist text-pf-purple">
                      {club ? "Local rate" : "Home club"}
                    </Badge>
                  )}
                </div>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    featured ? "text-white/75" : "text-pf-ink/65"
                  )}
                >
                  {plan.tagline}
                </p>
                <div className="mt-4">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p
                        className={cn(
                          "text-xs",
                          featured ? "text-white/65" : "text-pf-ink/55"
                        )}
                      >
                        Starting at
                      </p>
                      <p className="flex items-end gap-1">
                        <span
                          className={cn(
                            "font-display text-4xl tracking-tight md:text-5xl",
                            featured ? "text-pf-yellow" : "text-pf-purple"
                          )}
                        >
                          {formatCurrency(local.monthlyDues)}
                        </span>
                        <span
                          className={cn(
                            "mb-1 text-sm",
                            featured ? "text-white/60" : "text-pf-ink/50"
                          )}
                        >
                          /mo*
                        </span>
                      </p>
                      <p
                        className={cn(
                          "text-xs",
                          featured ? "text-white/55" : "text-pf-ink/50"
                        )}
                      >
                        plus taxes &amp; fees
                      </p>
                    </div>
                    <dl
                      className={cn(
                        "grid grid-cols-3 gap-x-3 text-[11px] uppercase tracking-wide",
                        featured ? "text-white/55" : "text-pf-ink/50"
                      )}
                    >
                      <div>
                        <dt>Enroll</dt>
                        <dd
                          className={cn(
                            "text-sm font-semibold normal-case tracking-normal",
                            featured ? "text-white" : "text-pf-ink"
                          )}
                        >
                          {formatCurrency(local.enrollmentFee)}
                        </dd>
                      </div>
                      <div>
                        <dt>Annual</dt>
                        <dd
                          className={cn(
                            "text-sm font-semibold normal-case tracking-normal",
                            featured ? "text-white" : "text-pf-ink"
                          )}
                        >
                          {formatCurrency(local.annualFee)}
                        </dd>
                      </div>
                      <div>
                        <dt>Cancel</dt>
                        <dd
                          className={cn(
                            "text-sm font-semibold normal-case tracking-normal",
                            featured ? "text-white" : "text-pf-ink"
                          )}
                        >
                          $0 fee
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <ul
                  className={cn(
                    "mt-4 grid gap-1.5 border-t pt-3 sm:grid-cols-2",
                    featured ? "border-white/15" : "border-pf-line"
                  )}
                >
                  {plan.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 h-3.5 w-3.5 shrink-0",
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
                {unavailable ? (
                  <Button className="mt-4 w-full" disabled>
                    Unavailable here
                  </Button>
                ) : (
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <Button
                      asChild
                      variant={featured ? "outline" : "outline"}
                      className={
                        featured
                          ? "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                          : undefined
                      }
                    >
                      <a href="#pricing-compare">Learn More</a>
                    </Button>
                    <Button asChild variant={featured ? "app" : "purple"}>
                      <Link
                        href={joinHref(plan.id)}
                        onClick={() =>
                          track("plan_select", {
                            plan: plan.id,
                            clubId,
                            source: "pricing_matrix",
                          })
                        }
                      >
                        Join Now
                      </Link>
                    </Button>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div
          id="pricing-compare"
          className="mx-auto mt-4 max-w-5xl scroll-mt-16 overflow-hidden rounded-2xl pf-grad-footer text-white shadow-[0_8px_24px_-12px_rgba(61,9,88,0.4)]"
        >
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <caption className="sr-only">
              Classic vs Black Card membership comparison
            </caption>
            <thead>
              <tr className="bg-black/15">
                <th
                  scope="col"
                  className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white/55 md:px-5"
                >
                  At the gym
                </th>
                <th
                  scope="col"
                  className="px-4 py-2.5 font-display text-lg md:px-5"
                >
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
                      <p className="mt-0.5 font-normal text-[11px] text-white/45">
                        {row.note}
                      </p>
                    ) : null}
                  </th>
                  <td className="px-4 py-2.5 md:px-5">
                    <CellValue value={row.classic} onDark />
                  </td>
                  <td className="px-4 py-2.5 md:px-5">
                    <CellValue value={row.blackCard} onDark />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mx-auto mt-3 flex max-w-5xl items-start gap-2 text-xs text-pf-ink/60 md:text-sm">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-pf-purple" />
          {club
            ? `Card rates are confirmed for ${club.name}. Matrix shows national starting ranges.`
            : "Pick a club to confirm local dues on the cards. Matrix shows national starting ranges."}{" "}
          Check-in and digital keytag live in the Planet Fitness app.
        </p>
      </div>
    </section>
  );
}
