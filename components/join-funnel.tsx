"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Check, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { track } from "@/lib/analytics";
import { getClubById, type Club } from "@/lib/clubs";
import {
  dueToday,
  formatCurrency,
  getLocalPricing,
  getPlan,
  type MembershipTier,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "confirm", label: "Club & plan" },
  { id: "identity", label: "About you" },
  { id: "payment", label: "Payment" },
  { id: "done", label: "You’re in" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

type JoinFunnelProps = {
  initialClubId?: string;
  initialPlan?: string;
};

type IdentityForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type PaymentForm = {
  nameOnCard: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  zip: string;
};

function FeeSummary({
  club,
  planId,
  pricing,
}: {
  club: Club | null;
  planId: MembershipTier;
  pricing: ReturnType<typeof getLocalPricing>;
}) {
  const plan = getPlan(planId);
  return (
    <aside className="border border-white/15 bg-white/5 p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-pf-yellow">
        Confirmed for this club
      </p>
      <p className="mt-1 font-display text-xl text-white">
        {club ? club.name : "Select a club"}
      </p>
      {club ? (
        <p className="mt-0.5 text-xs text-white/55">
          {club.city}, {club.state} {club.zip}
        </p>
      ) : (
        <Link href="/#clubs" className="mt-1 inline-block text-sm text-pf-yellow underline">
          Find a club
        </Link>
      )}

      <dl className="mt-4 space-y-2 border-t border-white/10 pt-3 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-white/55">Plan</dt>
          <dd className="font-semibold">{plan.name}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-white/55">Monthly dues</dt>
          <dd className="font-semibold">
            {formatCurrency(pricing.monthlyDues)} / mo
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-white/55">Enrollment</dt>
          <dd className="font-semibold">
            {formatCurrency(pricing.enrollmentFee)}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-white/55">
            Annual ({pricing.annualFeeMonth})
          </dt>
          <dd className="font-semibold">
            {formatCurrency(pricing.annualFee)} / yr
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-white/55">Cancel</dt>
          <dd className="font-semibold">Anytime · $0</dd>
        </div>
        <div className="flex justify-between gap-3 border-t border-white/10 pt-2">
          <dt className="text-white/55">Due today</dt>
          <dd className="font-semibold text-pf-yellow">
            {formatCurrency(dueToday(pricing))}
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-[11px] text-white/45">
        Local club rate—not a national average. No hidden fees on this page.
      </p>
    </aside>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold text-white/65">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export function JoinFunnel({ initialClubId, initialPlan }: JoinFunnelProps) {
  const club = useMemo(
    () => (initialClubId ? getClubById(initialClubId) : null),
    [initialClubId]
  );

  const availablePlans = useMemo(() => {
    if (!club) return ["classic", "black-card"] as MembershipTier[];
    return (["classic", "black-card"] as MembershipTier[]).filter(
      (tier) => club.pricing[tier].available
    );
  }, [club]);

  const defaultPlan =
    initialPlan === "classic" || initialPlan === "black-card"
      ? initialPlan
      : availablePlans.includes("black-card")
        ? "black-card"
        : "classic";

  const [step, setStep] = useState<StepId>("confirm");
  const [planId, setPlanId] = useState<MembershipTier>(
    availablePlans.includes(defaultPlan) ? defaultPlan : availablePlans[0]
  );
  const [identity, setIdentity] = useState<IdentityForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [payment, setPayment] = useState<PaymentForm>({
    nameOnCard: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    zip: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pricing = getLocalPricing(club, planId);
  const stepIndex = STEPS.findIndex((item) => item.id === step);

  useEffect(() => {
    track("join_step", { step, clubId: club?.id ?? null, plan: planId });
  }, [step, club?.id, planId]);

  useEffect(() => {
    if (!pricing.available && availablePlans[0]) {
      setPlanId(availablePlans[0]);
    }
  }, [pricing.available, availablePlans]);

  function goNext() {
    setError(null);
    if (step === "confirm") {
      if (!club) {
        setError("Pick a home club before continuing.");
        return;
      }
      if (!pricing.available) {
        setError("That plan isn’t offered at this club.");
        return;
      }
      track("plan_select", { clubId: club.id, plan: planId });
      setStep("identity");
      return;
    }
    if (step === "identity") {
      if (
        !identity.firstName.trim() ||
        !identity.lastName.trim() ||
        !identity.email.trim() ||
        !identity.phone.trim()
      ) {
        setError("Fill in your name, email, and phone.");
        return;
      }
      if (!identity.email.includes("@")) {
        setError("Enter a valid email.");
        return;
      }
      setStep("payment");
      return;
    }
    if (step === "payment") {
      if (
        !payment.nameOnCard.trim() ||
        payment.cardNumber.replace(/\s/g, "").length < 12 ||
        payment.expiry.length < 4 ||
        payment.cvc.length < 3 ||
        payment.zip.length < 5
      ) {
        setError("Check your card details and billing ZIP.");
        return;
      }
      setSubmitting(true);
      window.setTimeout(() => {
        track("join_complete", {
          clubId: club?.id ?? null,
          plan: planId,
          dueToday: dueToday(pricing),
        });
        setSubmitting(false);
        setStep("done");
      }, 700);
    }
  }

  function goBack() {
    setError(null);
    if (step === "identity") setStep("confirm");
    if (step === "payment") setStep("identity");
  }

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] bg-[#14081f] text-white">
      <div className="mx-auto grid max-w-5xl gap-4 px-4 py-6 md:grid-cols-[minmax(0,1fr)_17rem] md:px-6 md:py-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pf-yellow">
            Start your membership
          </p>
          <h1 className="mt-1 font-display text-3xl tracking-tight md:text-4xl">
            Join in a few short steps
          </h1>

          <ol className="mt-4 flex flex-wrap gap-1.5">
            {STEPS.map((item, index) => {
              const done = index < stepIndex;
              const active = item.id === step;
              return (
                <li
                  key={item.id}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold",
                    active && "bg-pf-yellow text-pf-ink",
                    done && !active && "bg-white/15 text-white",
                    !active && !done && "bg-white/5 text-white/45"
                  )}
                >
                  {done ? <Check className="h-3 w-3" aria-hidden /> : null}
                  <span>
                    {index + 1}. {item.label}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="mt-5 border border-white/15 bg-[#1a0d28] p-4 md:p-5">
            {step === "confirm" && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-display text-2xl">Confirm club & plan</h2>
                  <p className="mt-1 text-sm text-white/65">
                    Fees on the right are the local rate for this club.
                  </p>
                </div>
                {!club ? (
                  <Button asChild>
                    <Link href="/#clubs">Find a club first</Link>
                  </Button>
                ) : (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {availablePlans.map((tier) => {
                      const local = getLocalPricing(club, tier);
                      const plan = getPlan(tier);
                      const selected = planId === tier;
                      return (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setPlanId(tier)}
                          className={cn(
                            "border p-3 text-left transition",
                            selected
                              ? "border-pf-yellow bg-pf-yellow/10"
                              : "border-white/15 hover:border-white/35"
                          )}
                        >
                          <p className="font-display text-xl">{plan.name}</p>
                          <p className="mt-1 text-sm text-white/70">
                            {formatCurrency(local.monthlyDues)} / month
                          </p>
                          <p className="mt-1 text-xs text-white/50">
                            Enroll {formatCurrency(local.enrollmentFee)} · Annual{" "}
                            {formatCurrency(local.annualFee)}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {step === "identity" && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-display text-2xl">About you</h2>
                  <p className="mt-1 text-sm text-white/65">
                    We’ll use this for your membership and the PF app invite.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field id="firstName" label="First name">
                    <Input
                      id="firstName"
                      value={identity.firstName}
                      onChange={(e) =>
                        setIdentity((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                      className="border-white/15 bg-black/30 text-white"
                      autoComplete="given-name"
                    />
                  </Field>
                  <Field id="lastName" label="Last name">
                    <Input
                      id="lastName"
                      value={identity.lastName}
                      onChange={(e) =>
                        setIdentity((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                      className="border-white/15 bg-black/30 text-white"
                      autoComplete="family-name"
                    />
                  </Field>
                  <Field id="email" label="Email">
                    <Input
                      id="email"
                      type="email"
                      value={identity.email}
                      onChange={(e) =>
                        setIdentity((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="border-white/15 bg-black/30 text-white"
                      autoComplete="email"
                    />
                  </Field>
                  <Field id="phone" label="Mobile phone">
                    <Input
                      id="phone"
                      type="tel"
                      value={identity.phone}
                      onChange={(e) =>
                        setIdentity((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="border-white/15 bg-black/30 text-white"
                      autoComplete="tel"
                    />
                  </Field>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-display text-2xl">Payment</h2>
                  <p className="mt-1 text-sm text-white/65">
                    Demo checkout only—nothing is charged. Due today stays{" "}
                    {formatCurrency(dueToday(pricing))}.
                  </p>
                </div>
                <div className="grid gap-3">
                  <Field id="nameOnCard" label="Name on card">
                    <Input
                      id="nameOnCard"
                      value={payment.nameOnCard}
                      onChange={(e) =>
                        setPayment((prev) => ({
                          ...prev,
                          nameOnCard: e.target.value,
                        }))
                      }
                      className="border-white/15 bg-black/30 text-white"
                      autoComplete="cc-name"
                    />
                  </Field>
                  <Field id="cardNumber" label="Card number">
                    <Input
                      id="cardNumber"
                      inputMode="numeric"
                      value={payment.cardNumber}
                      onChange={(e) =>
                        setPayment((prev) => ({
                          ...prev,
                          cardNumber: e.target.value,
                        }))
                      }
                      className="border-white/15 bg-black/30 text-white"
                      placeholder="4242 4242 4242 4242"
                      autoComplete="cc-number"
                    />
                  </Field>
                  <div className="grid grid-cols-3 gap-3">
                    <Field id="expiry" label="Expiry">
                      <Input
                        id="expiry"
                        value={payment.expiry}
                        onChange={(e) =>
                          setPayment((prev) => ({
                            ...prev,
                            expiry: e.target.value,
                          }))
                        }
                        className="border-white/15 bg-black/30 text-white"
                        placeholder="MM/YY"
                        autoComplete="cc-exp"
                      />
                    </Field>
                    <Field id="cvc" label="CVC">
                      <Input
                        id="cvc"
                        value={payment.cvc}
                        onChange={(e) =>
                          setPayment((prev) => ({
                            ...prev,
                            cvc: e.target.value,
                          }))
                        }
                        className="border-white/15 bg-black/30 text-white"
                        autoComplete="cc-csc"
                      />
                    </Field>
                    <Field id="zip" label="ZIP">
                      <Input
                        id="zip"
                        value={payment.zip}
                        onChange={(e) =>
                          setPayment((prev) => ({
                            ...prev,
                            zip: e.target.value,
                          }))
                        }
                        className="border-white/15 bg-black/30 text-white"
                        autoComplete="postal-code"
                      />
                    </Field>
                  </div>
                </div>
              </div>
            )}

            {step === "done" && (
              <div className="space-y-3 py-2 text-center sm:text-left">
                <p className="inline-flex items-center gap-2 bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">
                  <Check className="h-4 w-4" aria-hidden />
                  Membership started
                </p>
                <h2 className="font-display text-3xl">
                  You’re set, {identity.firstName || "member"}.
                </h2>
                <p className="text-sm text-white/70">
                  {getPlan(planId).name} at {club?.name}. Download the Planet
                  Fitness app for check-in and your digital keytag—those stay in
                  the app, not on this site.
                </p>
                <div className="flex flex-wrap justify-center gap-2 pt-2 sm:justify-start">
                  <Button asChild>
                    <a
                      href="https://www.planetfitness.com/mobileapp"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => track("app_banner_click", { source: "join_done" })}
                    >
                      Get the app
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                    <Link href="/">Back to clubs</Link>
                  </Button>
                </div>
              </div>
            )}

            {error ? (
              <p className="mt-4 text-sm text-red-300" role="alert">
                {error}
              </p>
            ) : null}

            {step !== "done" ? (
              <div className="mt-5 flex items-center gap-2">
                {step !== "confirm" ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden />
                    Back
                  </Button>
                ) : null}
                <Button
                  type="button"
                  className="flex-1"
                  onClick={goNext}
                  disabled={submitting || (step === "confirm" && !club)}
                >
                  {submitting
                    ? "Starting membership…"
                    : step === "payment"
                      ? `Pay ${formatCurrency(dueToday(pricing))} & join`
                      : "Continue"}
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="md:sticky md:top-20 md:self-start">
          <FeeSummary club={club} planId={planId} pricing={pricing} />
        </div>
      </div>
    </div>
  );
}
