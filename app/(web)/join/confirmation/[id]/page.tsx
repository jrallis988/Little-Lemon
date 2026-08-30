import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, KeyRound, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getClubById } from "@/lib/clubs";
import { getMembershipById } from "@/lib/memberships";
import { formatCurrency, getPlan } from "@/lib/pricing";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Membership ${id}`,
    robots: { index: false, follow: false },
  };
}

const NEXT_STEPS = [
  {
    icon: KeyRound,
    title: "Set your app password",
    body: "Use the email on this confirmation with Forgot password to create your member login.",
    href: "/app/login",
    cta: "Open sign in",
  },
  {
    icon: Smartphone,
    title: "Open the member app",
    body: "Check in, view your digital black card, and manage your home club from the app.",
    href: "/app",
    cta: "Go to member app",
  },
] as const;

export default async function JoinConfirmationPage({ params }: PageProps) {
  const { id } = await params;
  const membership = await getMembershipById(id);
  if (!membership) notFound();

  const plan = getPlan(membership.plan);
  const club = getClubById(membership.clubId);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:px-6">
      <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-700">
        <Check className="h-4 w-4" aria-hidden />
        Membership active
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-tight text-pf-ink">
        You’re in, {membership.member.firstName}
      </h1>
      <p className="mt-2 text-pf-ink/70">
        Your {plan.name} membership at {membership.clubName} is saved. Finish
        setup below so you can use the member app.
      </p>

      <ol className="mt-8 space-y-4" aria-label="Next steps">
        {NEXT_STEPS.map((step, index) => (
          <li
            key={step.title}
            className="flex gap-4 rounded-2xl border border-pf-line bg-white p-5"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pf-purple/10 text-pf-purple"
              aria-hidden
            >
              <step.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-pf-purple">
                Step {index + 1}
              </p>
              <h2 className="mt-1 font-display text-xl text-pf-ink">
                {step.title}
              </h2>
              <p className="mt-1 text-sm text-pf-ink/65">{step.body}</p>
              <Button asChild variant="purple" size="sm" className="mt-3">
                <Link href={step.href}>{step.cta}</Link>
              </Button>
            </div>
          </li>
        ))}
      </ol>

      <dl className="mt-8 space-y-3 rounded-3xl border border-pf-line bg-[#faf8fc] p-5 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-pf-ink/55">Membership ID</dt>
          <dd className="font-semibold text-pf-purple">{membership.id}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-pf-ink/55">Member</dt>
          <dd className="font-semibold">
            {membership.member.firstName} {membership.member.lastName}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-pf-ink/55">Email</dt>
          <dd className="font-semibold break-all">{membership.member.email}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-pf-ink/55">Home club</dt>
          <dd className="font-semibold">{membership.clubName}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-pf-ink/55">Plan</dt>
          <dd className="font-semibold">{plan.name}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-pf-ink/55">Monthly dues</dt>
          <dd className="font-semibold">
            {formatCurrency(membership.monthlyDues)} / mo
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-pf-ink/55">Paid today</dt>
          <dd className="font-semibold">
            {formatCurrency(membership.dueToday)}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-pf-ink/55">Card on file</dt>
          <dd className="font-semibold">
            {membership.payment.brand} •••• {membership.payment.last4}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-pf-ink/55">Agreements accepted</dt>
          <dd className="font-semibold">
            {new Date(membership.consents.acceptedAt).toLocaleString()}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-2">
        {club ? (
          <Button asChild variant="outline">
            <Link href={`/gyms/${club.slug}`}>View home club</Link>
          </Button>
        ) : null}
        <Button asChild variant="outline">
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </div>
  );
}
