import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CLUBS } from "@/lib/clubs";
import { MEMBERSHIP_PLANS, formatCurrency, type MembershipTier } from "@/lib/pricing";

type JoinPageProps = {
  searchParams: Promise<{ club?: string; plan?: string }>;
};

export default async function JoinPage({ searchParams }: JoinPageProps) {
  const params = await searchParams;
  const club = CLUBS.find((item) => item.id === params.club) ?? null;
  const planId = (params.plan === "classic" || params.plan === "black-card"
    ? params.plan
    : "black-card") as MembershipTier;
  const plan =
    MEMBERSHIP_PLANS.find((item) => item.id === planId) ?? MEMBERSHIP_PLANS[1];

  return (
    <div className="min-h-[70vh] bg-[linear-gradient(180deg,var(--pf-mist),#ffffff_40%)]">
      <div className="container max-w-2xl py-14 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pf-purple">
          Streamlined checkout
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-pf-ink md:text-5xl">
          Join {plan.name}
        </h1>
        <p className="mt-3 text-pf-ink/70">
          Multi-step signup is next. For now, confirm your club and plan—fees
          stay visible before you continue.
        </p>

        <div className="mt-8 space-y-4 rounded-xl border border-pf-line bg-white p-6 shadow-lift">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-pf-ink/50">
              Home club
            </p>
            <p className="mt-1 font-display text-2xl text-pf-ink">
              {club ? club.name : "Select a club first"}
            </p>
            {club ? (
              <p className="mt-1 text-sm text-pf-ink/65">
                {club.address}, {club.city}, {club.state} {club.zip}
              </p>
            ) : (
              <Button asChild variant="link" className="mt-1 h-auto px-0">
                <Link href="/#clubs">Find a club</Link>
              </Button>
            )}
          </div>

          <div className="border-t border-pf-line pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-pf-ink/50">
              Plan &amp; dues
            </p>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-pf-ink/60">Membership</dt>
                <dd className="font-semibold">{plan.name}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-pf-ink/60">Monthly dues</dt>
                <dd className="font-semibold">
                  {formatCurrency(plan.monthlyDues)} / month
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-pf-ink/60">Enrollment fee</dt>
                <dd className="font-semibold">
                  {formatCurrency(plan.enrollmentFee)}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-pf-ink/60">
                  Annual fee ({plan.annualFeeMonth})
                </dt>
                <dd className="font-semibold">
                  {formatCurrency(plan.annualFee)} / year
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-pf-ink/60">Cancellation</dt>
                <dd className="font-semibold">Anytime · $0 fee</dd>
              </div>
            </dl>
          </div>

          <Button size="lg" className="w-full" disabled={!club}>
            Continue to checkout
          </Button>
          <p className="text-center text-xs text-pf-ink/50">
            Checkout steps (identity → payment → confirm) ship in the next
            iteration.
          </p>
        </div>
      </div>
    </div>
  );
}
