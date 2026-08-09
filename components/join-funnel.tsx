"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { StripeElementsPay } from "@/components/member/stripe-elements-pay";

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

type Consents = {
  membershipAgreement: boolean;
  recurringBilling: boolean;
  ageAttestation: boolean;
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
    <aside className="rounded-3xl pf-grad-black-card p-4 text-white shadow-[0_8px_24px_-12px_rgba(61,9,88,0.45)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-pf-yellow">
        Confirmed for this club
      </p>
      <p className="mt-1 font-display text-xl text-white">
        {club ? club.name : "Select a club"}
      </p>
      {club ? (
        <p className="mt-0.5 text-xs text-white/60">
          {club.city}, {club.state} {club.zip}
        </p>
      ) : (
        <Link href="/#clubs" className="mt-1 inline-block text-sm text-pf-yellow underline">
          Find a club
        </Link>
      )}

      <dl className="mt-4 space-y-2 border-t border-white/15 pt-3 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-white/60">Plan</dt>
          <dd className="font-semibold">{plan.name}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-white/60">Monthly dues</dt>
          <dd className="font-semibold text-pf-yellow">
            {formatCurrency(pricing.monthlyDues)} / mo
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-white/60">Enrollment</dt>
          <dd className="font-semibold">
            {formatCurrency(pricing.enrollmentFee)}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-white/60">
            Annual ({pricing.annualFeeMonth})
          </dt>
          <dd className="font-semibold">
            {formatCurrency(pricing.annualFee)} / yr
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-white/60">Cancel</dt>
          <dd className="font-semibold">Anytime · $0</dd>
        </div>
        <div className="flex justify-between gap-3 border-t border-white/15 pt-2">
          <dt className="text-white/60">Due today</dt>
          <dd className="font-semibold text-pf-yellow">
            {formatCurrency(dueToday(pricing))}
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-[11px] text-white/50">
        Local club rate—not a national average. Taxes may apply at your club.
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
      <label htmlFor={id} className="text-xs font-semibold text-pf-ink/65">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export function JoinFunnel({ initialClubId, initialPlan }: JoinFunnelProps) {
  const router = useRouter();
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
  const [consents, setConsents] = useState<Consents>({
    membershipAgreement: false,
    recurringBilling: false,
    ageAttestation: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [membershipId, setMembershipId] = useState<string | null>(null);
  const [paymentMode, setPaymentMode] = useState<"test" | "stripe">("test");
  const [stripeReady, setStripeReady] = useState(false);
  const [payPath, setPayPath] = useState<"test" | "checkout" | "elements">(
    "test"
  );
  const [elementsClientSecret, setElementsClientSecret] = useState<string | null>(
    null
  );
  const [elementsPublishableKey, setElementsPublishableKey] = useState("");

  const pricing = getLocalPricing(club, planId);
  const stepIndex = STEPS.findIndex((item) => item.id === step);
  const needsCardFields = payPath === "test";

  useEffect(() => {
    track("join_step", { step, clubId: club?.id ?? null, plan: planId });
  }, [step, club?.id, planId]);

  useEffect(() => {
    if (!pricing.available && availablePlans[0]) {
      setPlanId(availablePlans[0]);
    }
  }, [pricing.available, availablePlans]);

  useEffect(() => {
    void fetch("/api/checkout")
      .then((res) => res.json())
      .then(
        (data: {
          configured?: boolean;
          preferredMode?: "checkout" | "elements" | "none";
        }) => {
          if (!data.configured) return;
          setStripeReady(true);
          setPayPath(data.preferredMode === "elements" ? "elements" : "checkout");
        }
      )
      .catch(() => undefined);
  }, []);

  async function completeElementsPayment(paymentIntentId: string) {
    if (!membershipId) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          membershipId,
          paymentIntentId,
          brand: "Card",
          last4: "****",
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Could not finalize payment.");
      }
      setPaymentMode("stripe");
      track("join_complete", {
        clubId: club?.id ?? null,
        plan: planId,
        membershipId,
        dueToday: dueToday(pricing),
        paymentsMode: "stripe_elements",
      });
      setStep("done");
      router.prefetch(`/join/confirmation/${membershipId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Join failed.");
    } finally {
      setSubmitting(false);
    }
  }

  async function submitMembership() {
    if (!club) return;
    setSubmitting(true);
    setError(null);
    try {
      if (payPath === "checkout" || payPath === "elements") {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: payPath,
            clubId: club.id,
            plan: planId,
            member: identity,
            consents,
          }),
        });
        const data = (await response.json()) as {
          error?: string;
          mode?: string;
          url?: string;
          membershipId?: string;
          clientSecret?: string;
          publishableKey?: string;
        };
        if (!response.ok) {
          throw new Error(data.error ?? "Could not start Stripe payment.");
        }
        if (data.membershipId) setMembershipId(data.membershipId);
        if (payPath === "checkout" && data.url) {
          track("join_checkout_redirect", {
            clubId: club.id,
            plan: planId,
            membershipId: data.membershipId ?? null,
          });
          window.location.href = data.url;
          return;
        }
        if (payPath === "elements" && data.clientSecret) {
          setElementsClientSecret(data.clientSecret);
          setElementsPublishableKey(data.publishableKey ?? "");
          setPaymentMode("stripe");
          return;
        }
        throw new Error("Stripe response was incomplete.");
      }

      const response = await fetch("/api/memberships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clubId: club.id,
          plan: planId,
          member: identity,
          consents,
          payment,
        }),
      });
      const data = (await response.json()) as {
        error?: string;
        paymentsMode?: "test" | "stripe";
        membership?: { id: string };
      };
      if (!response.ok || !data.membership?.id) {
        throw new Error(data.error ?? "Could not start membership.");
      }
      setMembershipId(data.membership.id);
      setPaymentMode(data.paymentsMode ?? "test");
      track("join_complete", {
        clubId: club.id,
        plan: planId,
        membershipId: data.membership.id,
        dueToday: dueToday(pricing),
        paymentsMode: data.paymentsMode ?? "test",
      });
      // Clear sensitive card fields from memory after success.
      setPayment((prev) => ({
        ...prev,
        cardNumber: "",
        cvc: "",
      }));
      setStep("done");
      router.prefetch(`/join/confirmation/${data.membership.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Join failed.");
    } finally {
      setSubmitting(false);
    }
  }

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
      if (needsCardFields) {
        if (
          !payment.nameOnCard.trim() ||
          payment.cardNumber.replace(/\s/g, "").length < 13 ||
          payment.expiry.length < 4 ||
          payment.cvc.length < 3 ||
          payment.zip.length < 5
        ) {
          setError("Check your card details and billing ZIP.");
          return;
        }
      }
      if (
        !consents.membershipAgreement ||
        !consents.recurringBilling ||
        !consents.ageAttestation
      ) {
        setError("Accept all required agreements to continue.");
        return;
      }
      void submitMembership();
    }
  }

  function goBack() {
    setError(null);
    if (step === "identity") setStep("confirm");
    if (step === "payment") setStep("identity");
  }

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] bg-gradient-to-b from-pf-mist via-white to-pf-purple-soft text-pf-ink">
      <div className="mx-auto grid max-w-5xl gap-4 px-4 py-6 md:grid-cols-[minmax(0,1fr)_17rem] md:px-6 md:py-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pf-purple">
            Start your membership
          </p>
          <h1 className="mt-1 font-display text-3xl tracking-tight text-pf-ink md:text-4xl">
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
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                    active && "bg-pf-btn text-white",
                    done && !active && "bg-pf-purple-soft text-pf-purple",
                    !active && !done && "bg-white text-pf-ink/40 ring-1 ring-pf-line"
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

          <div className="mt-5 rounded-3xl border border-pf-line bg-white p-4 shadow-[0_8px_24px_-14px_rgba(61,9,88,0.25)] md:p-5">
            {step === "confirm" && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-display text-2xl text-pf-ink">Confirm club & plan</h2>
                  <p className="mt-1 text-sm text-pf-ink/65">
                    Fees on the right are the local rate for this club.
                  </p>
                </div>
                {!club ? (
                  <Button asChild variant="purple">
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
                            "rounded-2xl border p-3 text-left transition",
                            selected
                              ? "border-transparent pf-grad-black-card text-white"
                              : "border-pf-line bg-pf-mist/60 hover:border-pf-purple"
                          )}
                        >
                          <p className="font-display text-xl">{plan.name}</p>
                          <p
                            className={cn(
                              "mt-1 text-sm",
                              selected ? "text-pf-yellow" : "text-pf-purple"
                            )}
                          >
                            {formatCurrency(local.monthlyDues)} / month
                          </p>
                          <p
                            className={cn(
                              "mt-1 text-xs",
                              selected ? "text-white/60" : "text-pf-ink/50"
                            )}
                          >
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
                  <h2 className="font-display text-2xl text-pf-ink">About you</h2>
                  <p className="mt-1 text-sm text-pf-ink/65">
                    We’ll use this for your membership record and PF app invite.
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
                      className="border-pf-line bg-white text-pf-ink"
                      autoComplete="given-name"
                      required
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
                      className="border-pf-line bg-white text-pf-ink"
                      autoComplete="family-name"
                      required
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
                      className="border-pf-line bg-white text-pf-ink"
                      autoComplete="email"
                      required
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
                      className="border-pf-line bg-white text-pf-ink"
                      autoComplete="tel"
                      required
                    />
                  </Field>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-display text-2xl text-pf-ink">Payment & agreements</h2>
                  <p className="mt-1 text-sm text-pf-ink/65">
                    Due today: {formatCurrency(dueToday(pricing))}. Prefer Stripe
                    Checkout or Elements when configured; otherwise test
                    authorization stores only brand + last 4.
                  </p>
                </div>

                {stripeReady ? (
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        ["checkout", "Stripe Checkout"],
                        ["elements", "Stripe Elements"],
                        ["test", "Test card form"],
                      ] as const
                    ).map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setPayPath(id);
                          setElementsClientSecret(null);
                          setError(null);
                        }}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition",
                          payPath === id
                            ? "bg-pf-btn text-white ring-pf-btn"
                            : "bg-white text-pf-ink/70 ring-pf-line"
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                ) : null}

                {needsCardFields ? (
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
                        className="border-pf-line bg-white text-pf-ink"
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
                        className="border-pf-line bg-white text-pf-ink"
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
                          className="border-pf-line bg-white text-pf-ink"
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
                          className="border-pf-line bg-white text-pf-ink"
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
                          className="border-pf-line bg-white text-pf-ink"
                          autoComplete="postal-code"
                        />
                      </Field>
                    </div>
                  </div>
                ) : (
                  <p className="rounded-2xl bg-pf-mist/80 px-3 py-2 text-sm text-pf-ink/70">
                    {payPath === "checkout"
                      ? "You’ll finish on Stripe-hosted Checkout after accepting agreements."
                      : "Accept agreements, then we’ll load Stripe Elements for card entry."}
                  </p>
                )}

                {elementsClientSecret && membershipId && elementsPublishableKey ? (
                  <StripeElementsPay
                    publishableKey={elementsPublishableKey}
                    clientSecret={elementsClientSecret}
                    membershipId={membershipId}
                    onPaid={(paymentIntentId) => {
                      void completeElementsPayment(paymentIntentId);
                    }}
                    onError={(message) => setError(message || null)}
                  />
                ) : null}

                <fieldset className="space-y-3 rounded-2xl bg-pf-mist/70 p-3">
                  <legend className="px-1 text-xs font-bold uppercase tracking-wide text-pf-purple">
                    Required agreements
                  </legend>
                  <label className="flex items-start gap-2 text-sm text-pf-ink/80">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={consents.membershipAgreement}
                      onChange={(e) =>
                        setConsents((prev) => ({
                          ...prev,
                          membershipAgreement: e.target.checked,
                        }))
                      }
                    />
                    <span>
                      I agree to the{" "}
                      <a
                        href="/legal/membership"
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-pf-purple underline"
                      >
                        Membership Agreement / Terms
                      </a>
                      .
                    </span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-pf-ink/80">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={consents.recurringBilling}
                      onChange={(e) =>
                        setConsents((prev) => ({
                          ...prev,
                          recurringBilling: e.target.checked,
                        }))
                      }
                    />
                    <span>
                      I authorize recurring monthly dues of{" "}
                      {formatCurrency(pricing.monthlyDues)} plus the annual fee
                      of {formatCurrency(pricing.annualFee)} when billed.
                    </span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-pf-ink/80">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={consents.ageAttestation}
                      onChange={(e) =>
                        setConsents((prev) => ({
                          ...prev,
                          ageAttestation: e.target.checked,
                        }))
                      }
                    />
                    <span>
                      I confirm I am 18+, or 13–17 joining with a parent/guardian.
                    </span>
                  </label>
                </fieldset>
              </div>
            )}

            {step === "done" && (
              <div className="space-y-3 py-2 text-center sm:text-left">
                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-700">
                  <Check className="h-4 w-4" aria-hidden />
                  Membership created
                </p>
                <h2 className="font-display text-3xl text-pf-ink">
                  You’re set, {identity.firstName || "member"}.
                </h2>
                <p className="text-sm text-pf-ink/70">
                  {getPlan(planId).name} at {club?.name}. Membership ID{" "}
                  <span className="font-semibold text-pf-purple">
                    {membershipId}
                  </span>
                  . Payment mode:{" "}
                  <span className="font-semibold">
                    {paymentMode === "stripe" ? "Stripe" : "test authorization"}
                  </span>
                  .
                </p>
                <p className="text-sm text-pf-ink/65">
                  Download the Planet Fitness app for check-in and your digital
                  keytag—those stay in the app.
                </p>
                <div className="flex flex-wrap justify-center gap-2 pt-2 sm:justify-start">
                  {membershipId ? (
                    <Button asChild variant="purple">
                      <Link href={`/join/confirmation/${membershipId}`}>
                        View confirmation
                      </Link>
                    </Button>
                  ) : null}
                  <Button asChild variant="app" className="bg-pf-btn text-white hover:brightness-110">
                    <a
                      href="https://www.planetfitness.com/mobileapp"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => track("app_banner_click", { source: "join_done" })}
                    >
                      Download the PF App
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/">Back to clubs</Link>
                  </Button>
                </div>
              </div>
            )}

            {error ? (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            {step !== "done" ? (
              <div className="mt-5 flex items-center gap-2">
                {step !== "confirm" ? (
                  <Button type="button" variant="outline" onClick={goBack}>
                    <ChevronLeft className="h-4 w-4" aria-hidden />
                    Back
                  </Button>
                ) : null}
                <Button
                  type="button"
                  variant="purple"
                  className="flex-1"
                  onClick={goNext}
                  disabled={
                    submitting ||
                    (step === "confirm" && !club) ||
                    (step === "payment" &&
                      payPath === "elements" &&
                      Boolean(elementsClientSecret))
                  }
                  aria-busy={submitting}
                >
                  {submitting
                    ? payPath === "checkout"
                      ? "Redirecting to Stripe…"
                      : "Creating membership…"
                    : step === "payment"
                      ? payPath === "checkout"
                        ? `Continue to Stripe Checkout · ${formatCurrency(dueToday(pricing))}`
                        : payPath === "elements" && elementsClientSecret
                          ? "Complete payment above"
                          : payPath === "elements"
                            ? `Continue to Stripe Elements · ${formatCurrency(dueToday(pricing))}`
                            : `Pay ${formatCurrency(dueToday(pricing))} & join`
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
