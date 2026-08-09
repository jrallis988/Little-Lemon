"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, Loader2, Rocket } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LaunchItem {
  id: string;
  title: string;
  status: "ready" | "pending" | "optional" | "manual";
  detail: string;
  envKeys?: string[];
  href?: string;
}

interface LegalItem {
  id: string;
  title: string;
  completed: boolean;
  note: string | null;
}

interface LaunchPayload {
  items: LaunchItem[];
  score: { ready: number; total: number; percent: number };
  productionBlocked: boolean;
  legalItems: LegalItem[];
}

export default function AdminLaunchPage() {
  const [data, setData] = useState<LaunchPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [probeMsg, setProbeMsg] = useState<string | null>(null);
  const [probing, setProbing] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/launch");
    if (res.status === 403 || res.status === 401) {
      throw new Error("Admin access required (ADMIN_EMAILS).");
    }
    if (!res.ok) throw new Error("Could not load launch checklist.");
    setData((await res.json()) as LaunchPayload);
  }, []);

  useEffect(() => {
    load()
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [load]);

  async function probe(target: string) {
    setProbing(target);
    setProbeMsg(null);
    try {
      const res = await fetch("/api/admin/launch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target }),
      });
      const body = (await res.json()) as { ok?: boolean; detail?: string };
      setProbeMsg(
        `${target}: ${body.ok ? "OK" : "Needs attention"} — ${body.detail ?? ""}`
      );
    } catch {
      setProbeMsg(`${target}: probe failed`);
    } finally {
      setProbing(null);
    }
  }

  async function toggleLegal(id: string, completed: boolean) {
    const res = await fetch("/api/admin/launch", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed }),
    });
    if (!res.ok) {
      setProbeMsg("Could not update legal checklist.");
      return;
    }
    await load();
  }

  if (loading) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 size-5 animate-spin" />
        Loading launch control…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-lg space-y-4 px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold">Launch Control</h1>
        <p className="text-muted-foreground">{error ?? "Unavailable"}</p>
        <Link href="/login" className={cn(buttonVariants())}>
          Sign in
        </Link>
      </div>
    );
  }

  const legalDone = data.legalItems.filter((l) => l.completed).length;

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          Go-live
        </p>
        <h1 className="flex items-center gap-2 font-display text-3xl font-semibold">
          <Rocket className="size-7 text-primary" />
          Launch Control
        </h1>
        <p className="text-muted-foreground">
          Track the remaining ops items: Postgres, partners, Stripe, chat
          staffing, and legal sign-off.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href="/admin"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            Ops overview
          </Link>
          <Link
            href="/admin/messages"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            Support inbox
          </Link>
        </div>
      </header>

      <section className="rounded-2xl border border-border bg-card p-5">
        <p className="text-sm text-muted-foreground">Auto-detected readiness</p>
        <p className="font-display text-4xl font-semibold tabular-nums">
          {data.score.percent}%
        </p>
        <p className="text-sm text-muted-foreground">
          {data.score.ready} of {data.score.total} required integrations ready
          {data.productionBlocked
            ? " — production still blocked on pending items."
            : " — integrations look ready; finish legal checklist below."}
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-savings transition-all"
            style={{ width: `${data.score.percent}%` }}
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Checklist</h2>
        <ul className="space-y-2">
          {data.items.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-border bg-card px-4 py-3"
            >
              <div className="flex items-start gap-3">
                {item.status === "ready" ? (
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-savings" />
                ) : (
                  <Circle className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{item.title}</p>
                    <span
                      className={cn(
                        "rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase",
                        item.status === "ready" && "bg-savings/15 text-savings",
                        item.status === "pending" && "bg-amber-100 text-amber-900",
                        item.status === "optional" && "bg-muted text-muted-foreground",
                        item.status === "manual" && "bg-primary/10 text-primary"
                      )}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {item.detail}
                  </p>
                  {item.envKeys && item.envKeys.length > 0 && (
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {item.envKeys.join(" · ")}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Connectivity probes</h2>
        <p className="text-sm text-muted-foreground">
          Test keys without leaving the admin. Chat notify sends a real test to
          ADMIN_EMAILS when Resend is configured.
        </p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["stripe", "Stripe"],
              ["resend", "Resend"],
              ["twilio", "Twilio"],
              ["switch", "Smart Switch"],
              ["pricing", "Pricing API"],
              ["chat_notify", "Test chat email"],
            ] as const
          ).map(([id, label]) => (
            <Button
              key={id}
              type="button"
              variant="outline"
              disabled={!!probing}
              onClick={() => void probe(id)}
            >
              {probing === id ? <Loader2 className="animate-spin" /> : null}
              {label}
            </Button>
          ))}
        </div>
        {probeMsg && (
          <p className="text-sm text-muted-foreground" role="status">
            {probeMsg}
          </p>
        )}
      </section>

      <section id="legal" className="scroll-mt-24 space-y-3">
        <h2 className="font-display text-xl font-semibold">
          Legal / brand checklist
        </h2>
        <p className="text-sm text-muted-foreground">
          {legalDone}/{data.legalItems.length} complete — mark items after
          counsel review. Pages:{" "}
          <Link href="/terms" className="text-primary underline-offset-2 hover:underline">
            Terms
          </Link>
          {" · "}
          <Link href="/privacy" className="text-primary underline-offset-2 hover:underline">
            Privacy
          </Link>
        </p>
        <ul className="space-y-2">
          {data.legalItems.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3 rounded-xl border border-border px-4 py-3"
            >
              <input
                type="checkbox"
                className="mt-1 size-4"
                checked={item.completed}
                onChange={(e) => void toggleLegal(item.id, e.target.checked)}
                aria-label={item.title}
              />
              <div>
                <p className="font-medium">{item.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">Local / deploy helpers</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <code className="text-xs">npm run setup:env</code> — generate
            AUTH_SECRET and print required vars
          </li>
          <li>
            <code className="text-xs">npm run db:use-postgres</code> — switch
            Prisma provider to postgresql
          </li>
          <li>
            See <code className="text-xs">docs/DEPLOY.md</code> and{" "}
            <code className="text-xs">docs/PARTNERS.md</code>
          </li>
        </ul>
      </section>
    </div>
  );
}
