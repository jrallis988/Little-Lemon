"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminOverview {
  counts: Record<string, number>;
  switchAnalytics: {
    byStatus: Array<{ status: string; count: number }>;
    recent: Array<{
      id: string;
      status: string;
      confidence: number | null;
      liveSwitch: boolean;
      pharmacyName: string | null;
      createdAt: string;
    }>;
  };
  launch: Record<string, boolean | string | number>;
}

export default function AdminPage() {
  const [data, setData] = useState<AdminOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/overview")
      .then(async (res) => {
        if (res.status === 403 || res.status === 401) {
          throw new Error(
            "Admin access denied. Sign in with an email listed in ADMIN_EMAILS."
          );
        }
        if (!res.ok) throw new Error("Could not load admin overview.");
        return res.json() as Promise<AdminOverview>;
      })
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 size-5 animate-spin" />
        Loading admin…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-lg space-y-4 px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold">Admin</h1>
        <p className="text-muted-foreground">{error ?? "Unavailable"}</p>
        <Link href="/login" className={cn(buttonVariants())}>
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Ops overview</h1>
        <p className="mt-1 text-muted-foreground">
          Formulary counts, support queues, and launch gates for the current
          mode.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          <Link
            href="/admin/messages"
            className="inline-flex text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            Chat inbox →
          </Link>
          <Link
            href="/admin/tickets"
            className="inline-flex text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            Support tickets →
          </Link>
          {data.launch.membershipEnabled === true && (
            <Link
              href="/admin/transfers"
              className="inline-flex text-sm font-medium text-primary underline-offset-2 hover:underline"
            >
              Rx transfers →
            </Link>
          )}
          <Link
            href="/admin/pharmacies"
            className="inline-flex text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            Pharmacy partners →
          </Link>
          <Link
            href="/admin/medication-requests"
            className="inline-flex text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            Medication requests →
          </Link>
          <Link
            href="/admin/issue-reports"
            className="inline-flex text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            Issue reports →
          </Link>
          <Link
            href="/admin/launch"
            className="inline-flex text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            Launch Control →
          </Link>
        </div>
      </div>

      <section className="grid gap-3 sm:grid-cols-3">
        {Object.entries(data.counts).map(([key, value]) => (
          <div
            key={key}
            className="rounded-xl border border-border bg-card px-4 py-3"
          >
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {key}
            </p>
            <p className="font-display text-2xl font-semibold tabular-nums">
              {value}
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-semibold">Launch gates</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {Object.entries(data.launch).map(([key, value]) => {
            const isBool = typeof value === "boolean";
            const ok = isBool ? value : true;
            const display = isBool
              ? value
                ? "ready"
                : "pending"
              : String(value);
            return (
              <li
                key={key}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm"
              >
                <span>{key}</span>
                <span
                  className={
                    isBool
                      ? ok
                        ? "font-medium text-savings"
                        : "text-muted-foreground"
                      : "font-medium tabular-nums"
                  }
                >
                  {display}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-semibold">Switch by status</h2>
        <ul className="space-y-1 text-sm">
          {data.switchAnalytics.byStatus.length === 0 && (
            <li className="text-muted-foreground">No prechecks logged yet.</li>
          )}
          {data.switchAnalytics.byStatus.map((row) => (
            <li
              key={row.status}
              className="flex justify-between border-b border-border py-2"
            >
              <span>{row.status.replaceAll("_", " ")}</span>
              <span className="tabular-nums">{row.count}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-semibold">
          Recent switch events
        </h2>
        <ul className="space-y-2">
          {data.switchAnalytics.recent.map((e) => (
            <li
              key={e.id}
              className="rounded-lg border border-border px-3 py-2 text-sm"
            >
              <p className="font-medium">
                {e.status.replaceAll("_", " ")}
                {e.pharmacyName ? ` · ${e.pharmacyName}` : ""}
              </p>
              <p className="text-muted-foreground">
                {new Date(e.createdAt).toLocaleString()}
                {e.confidence != null
                  ? ` · ${Math.round(e.confidence * 100)}%`
                  : ""}
                {e.liveSwitch ? " · live switch" : " · network rules"}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-sm text-muted-foreground">
        See <code className="text-xs">docs/LIMITED_V1_LAUNCH.md</code> for v1
        scope and <code className="text-xs">docs/LAUNCH.md</code> for the full
        production checklist.
      </p>
    </div>
  );
}
