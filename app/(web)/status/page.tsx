import type { Metadata } from "next";
import Link from "next/link";
import { isDemoAuthEnabled } from "@/lib/auth-shared";
import { getStoreBackend } from "@/lib/db";
import { paymentsConfigured } from "@/lib/payments";
import { CONCEPT_SCORES } from "@/lib/quality";

export const metadata: Metadata = {
  title: "Status",
  description:
    "Operational status and concept quality scorecard for Planet Fitness Stratham.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function StatusPage() {
  const storeBackend = await getStoreBackend();
  const hasAuthSecret = Boolean(
    process.env.AUTH_SECRET?.trim() || process.env.STRIPE_SECRET_KEY?.trim()
  );
  const checks: Record<string, boolean | string> = {
    authSecretConfigured: hasAuthSecret,
    accessSecretConfigured: Boolean(
      process.env.ACCESS_CONTROL_SECRET?.trim() || hasAuthSecret
    ),
    stripeConfigured: paymentsConfigured(),
    demoAuthEnabled: isDemoAuthEnabled(),
    clubsApiConfigured: Boolean(process.env.CLUBS_API_URL?.trim()),
    siteUrlConfigured: Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim()),
    storeBackend,
  };

  return (
    <div className="bg-white text-pf-ink">
      <section className="border-b border-black/10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-pf-purple">
            Operations
          </p>
          <h1 className="mt-2 font-display text-4xl font-black uppercase tracking-tight">
            Status
          </h1>
          <p className="mt-3 text-sm text-pf-muted">
            Runtime health for this concept deploy, plus the quality bar we hold
            the product to.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-600" aria-hidden />
            All systems nominal
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-black uppercase tracking-tight">
            Health checks
          </h2>
          <dl className="mt-6 divide-y divide-pf-line rounded-2xl border border-pf-line bg-[#faf8fc]">
            {Object.entries(checks).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
              >
                <dt className="font-medium text-pf-ink/70">{key}</dt>
                <dd className="font-semibold text-pf-ink">
                  {typeof value === "boolean"
                    ? value
                      ? "yes"
                      : "no"
                    : String(value)}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-pf-muted">
            Probe:{" "}
            <Link
              href="/api/health"
              className="text-pf-purple underline-offset-2 hover:underline"
            >
              /api/health
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-black/10 bg-[#faf8fc] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-black uppercase tracking-tight">
            Quality scorecard
          </h2>
          <p className="mt-2 text-sm text-pf-muted">
            Concept product bar. Commercial franchise launch stays capped without
            PF endorsement and production systems.
          </p>
          <ul className="mt-8 space-y-5">
            {CONCEPT_SCORES.map((item) => (
              <li key={item.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-black uppercase text-pf-ink">
                    {item.label}
                  </h3>
                  <p className="font-display text-2xl font-black text-pf-purple">
                    {item.score}
                    <span className="text-base text-pf-ink/40">/{item.max}</span>
                  </p>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/5">
                  <div
                    className="h-full rounded-full bg-pf-purple"
                    style={{ width: `${(item.score / item.max) * 100}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-pf-muted">{item.note}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/product"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-pf-purple px-6 text-sm font-bold text-white"
            >
              Product overview
            </Link>
            <Link
              href="/screens"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/15 px-6 text-sm font-bold"
            >
              Screen map
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
