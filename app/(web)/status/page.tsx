import type { Metadata } from "next";
import Link from "next/link";
import { isDemoAuthEnabled } from "@/lib/auth-shared";
import { getStoreBackend } from "@/lib/db";
import { paymentsConfigured } from "@/lib/payments";
import { buildScorecard } from "@/lib/quality";

export const metadata: Metadata = {
  title: "Status",
  description:
    "Operational status and concept quality scorecard for Planet Fitness Stratham.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const LAUNCH_STEPS = [
  {
    id: "secrets",
    title: "Set Worker secrets",
    detail: "AUTH_SECRET, ACCESS_CONTROL_SECRET, NEXT_PUBLIC_SITE_URL",
  },
  {
    id: "claim",
    title: "Claim preview into your Cloudflare account",
    detail: "Use the claim URL from wrangler deploy --temporary, or Connect to Git.",
  },
  {
    id: "kv",
    title: "Bind durable KV (PF_STORE)",
    detail: "Run bash scripts/setup-kv.sh after wrangler login, then redeploy.",
  },
  {
    id: "demo",
    title: "Keep demo auth off",
    detail: "ALLOW_DEMO_AUTH must stay false/unset in production.",
  },
] as const;

export default async function StatusPage() {
  const storeBackend = await getStoreBackend();
  const hasAuthSecret = Boolean(
    process.env.AUTH_SECRET?.trim() || process.env.STRIPE_SECRET_KEY?.trim()
  );
  const accessSecretConfigured = Boolean(
    process.env.ACCESS_CONTROL_SECRET?.trim() || hasAuthSecret
  );
  const siteUrlConfigured = Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim());
  const demoAuthEnabled = isDemoAuthEnabled();

  const checks: Record<string, boolean | string> = {
    authSecretConfigured: hasAuthSecret,
    accessSecretConfigured,
    stripeConfigured: paymentsConfigured(),
    demoAuthEnabled,
    clubsApiConfigured: Boolean(process.env.CLUBS_API_URL?.trim()),
    siteUrlConfigured,
    storeBackend,
  };

  const scores = buildScorecard({
    authSecretConfigured: hasAuthSecret,
    accessSecretConfigured,
    siteUrlConfigured,
    demoAuthEnabled,
    storeBackend,
    stripeConfigured: paymentsConfigured(),
  });

  const launchDone = {
    secrets: hasAuthSecret && accessSecretConfigured && siteUrlConfigured,
    kv: storeBackend === "kv" || storeBackend === "file",
    demo: !demoAuthEnabled,
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
            Runtime health, launch checklist for 9→10, and the quality bar for
            this concept.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-600" aria-hidden />
            Service up · store: {storeBackend}
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-black uppercase tracking-tight">
            Launch checklist
          </h2>
          <p className="mt-2 text-sm text-pf-muted">
            Complete these to raise launch readiness from 9 to a technical 10.
            Franchise endorsement is still separate for commercial go-live.
          </p>
          <ol className="mt-6 space-y-3">
            {LAUNCH_STEPS.map((step) => {
              const done =
                step.id === "secrets"
                  ? launchDone.secrets
                  : step.id === "kv"
                    ? launchDone.kv
                    : step.id === "demo"
                      ? launchDone.demo
                      : siteUrlConfigured;
              return (
                <li
                  key={step.id}
                  className="flex gap-3 rounded-2xl border border-pf-line bg-[#faf8fc] p-4"
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      done
                        ? "bg-emerald-600 text-white"
                        : "bg-pf-purple/15 text-pf-purple"
                    }`}
                    aria-hidden
                  >
                    {done ? "✓" : "·"}
                  </span>
                  <div>
                    <p className="font-semibold text-pf-ink">{step.title}</p>
                    <p className="mt-1 text-sm text-pf-muted">{step.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-t border-black/10 px-4 py-12 sm:px-6 lg:px-8">
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
            Live scores from this environment. Launch updates when KV is bound
            and secrets are set.
          </p>
          <ul className="mt-8 space-y-5">
            {scores.map((item) => (
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
