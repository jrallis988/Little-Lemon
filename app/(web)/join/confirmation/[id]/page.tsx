import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, KeyRound, QrCode, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getClubById } from "@/lib/clubs";
import { getMembershipById } from "@/lib/memberships";
import {
  formatCurrency,
  getLocalPricing,
  getPlan,
} from "@/lib/pricing";
import { todaysHoursLabel } from "@/lib/hours";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Membership ${id}`,
    robots: { index: false, follow: false },
  };
}

export default async function JoinConfirmationPage({ params }: PageProps) {
  const { id } = await params;
  const membership = await getMembershipById(id);
  if (!membership) notFound();

  const plan = getPlan(membership.plan);
  const club = getClubById(membership.clubId);
  const local = getLocalPricing(club, membership.plan);
  const email = encodeURIComponent(membership.member.email);
  const loginHref = `/app/login?email=${email}&mode=forgot&next=${encodeURIComponent("/app/check-in")}&from=join`;
  const keytagHref = `/app/login?email=${email}&mode=forgot&next=${encodeURIComponent("/app/keytag")}&from=join`;
  const hours = club ? todaysHoursLabel(club.schedule) : null;

  const nextSteps = [
    {
      icon: KeyRound,
      title: "Set your app password",
      body: `Use ${membership.member.email} with Forgot password to unlock the member app.`,
      href: loginHref,
      cta: "Set password & continue",
      primary: true,
    },
    {
      icon: ScanLine,
      title: "Check in at the club",
      body: "After sign-in, issue a door token and validate with access control.",
      href: loginHref,
      cta: "Go to check-in",
      primary: false,
    },
    {
      icon: QrCode,
      title: "Open your digital keytag",
      body: "Keep a signed door barcode ready — including offline cache at the desk.",
      href: keytagHref,
      cta: "Open digital keytag",
      primary: false,
    },
  ] as const;

  return (
    <div className="bg-white text-pf-ink">
      <div className="mx-auto max-w-2xl px-4 py-8 md:px-6 md:py-10">
        <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-700">
          <Check className="h-4 w-4" aria-hidden />
          Membership active
        </p>
        <h1 className="pf-type-section mt-3 text-pf-ink md:text-5xl">
          You’re in, {membership.member.firstName}
        </h1>
        <p className="mt-2 text-sm text-pf-ink/70 md:text-base">
          Your {plan.name} at {membership.clubName} is saved. Finish app setup
          so you can check in and use your digital keytag.
        </p>

        {club ? (
          <div className="mt-4 rounded-2xl border border-pf-purple/20 bg-pf-purple-soft/60 px-4 py-3 text-sm text-pf-ink">
            <p className="font-semibold text-pf-purple">{club.name}</p>
            <p className="mt-0.5 text-pf-ink/70">
              {club.address}, {club.city}, {club.state} {club.zip}
              {hours ? ` · ${hours}` : null}
            </p>
            <p className="mt-1 text-xs text-pf-ink/60">
              Local rate {formatCurrency(local.monthlyDues)}/mo · annual fee{" "}
              {formatCurrency(local.annualFee)} billed in {local.annualFeeMonth}
            </p>
          </div>
        ) : null}

        <ol className="mt-6 space-y-3" aria-label="Next steps">
          {nextSteps.map((step, index) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-2xl border border-pf-line bg-white p-4"
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
                <h2 className="pf-type-impact mt-1 text-xl text-pf-ink">
                  {step.title}
                </h2>
                <p className="mt-1 text-sm text-pf-ink/65">{step.body}</p>
                <Button
                  asChild
                  variant={step.primary ? "purple" : "outline"}
                  size="sm"
                  className="mt-3"
                >
                  <Link href={step.href}>{step.cta}</Link>
                </Button>
              </div>
            </li>
          ))}
        </ol>

        <dl className="mt-6 space-y-2.5 rounded-3xl border border-pf-line bg-pf-mist/80 p-5 text-sm">
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
            <dd className="font-semibold break-all">
              {membership.member.email}
            </dd>
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
            <dt className="text-pf-ink/55">Annual fee</dt>
            <dd className="font-semibold">
              {formatCurrency(local.annualFee)} · {local.annualFeeMonth}
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
        </dl>

        <div className="mt-5 flex flex-wrap gap-2">
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
    </div>
  );
}
