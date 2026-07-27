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
    <div className="min-h-[70vh] bg-[#14081f] text-white">
      <div className="container max-w-xl py-10 md:py-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pf-yellow">
          Start your membership
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight md:text-5xl">
          Join with {plan.name}
        </h1>
        <p className="mt-2 text-sm text-white/70 md:text-base">
          Confirm your club and plan. Every fee stays visible before you finish
          signing up.
        </p>

        <div className="mt-6 space-y-4 border border-white/15 bg-white/5 p-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
              Home club
            </p>
            <p className="mt-1 font-display text-2xl">
              {club ? club.name : "Select a club first"}
            </p>
            {club ? (
              <p className="mt-1 text-sm text-white/65">
                {club.address}, {club.city}, {club.state} {club.zip}
              </p>
            ) : (
              <Button asChild variant="link" className="mt-1 h-auto px-0 text-pf-yellow">
                <Link href="/#clubs">Find a club</Link>
              </Button>
            )}
          </div>

          <div className="border-t border-white/15 pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
              Plan &amp; dues
            </p>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-white/55">Membership</dt>
                <dd className="font-semibold">{plan.name}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-white/55">Monthly dues</dt>
                <dd className="font-semibold">
                  {formatCurrency(plan.monthlyDues)} / month
                </dd>
              </div>
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
          </div>

          <Button size="lg" className="w-full" disabled={!club}>
            Continue
          </Button>
          <p className="text-center text-xs text-white/45">
            Next: a short sign-up—your info, payment, then you’re set to work out.
          </p>
        </div>
      </div>
    </div>
  );
}
