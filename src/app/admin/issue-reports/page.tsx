"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IssueReport {
  id: string;
  referenceCode: string;
  category: string;
  pagePath: string | null;
  drugId: string | null;
  pharmacyId: string | null;
  details: string;
  email: string | null;
  status: string;
  createdAt: string;
}

export default function AdminIssueReportsPage() {
  const [reports, setReports] = useState<IssueReport[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("received");

  const active = reports.find((r) => r.id === activeId) ?? null;

  async function load(status = filter) {
    const qs = status === "all" ? "" : `?status=${encodeURIComponent(status)}`;
    const res = await fetch(`/api/admin/issue-reports${qs}`);
    if (res.status === 403 || res.status === 401) {
      throw new Error("Admin access required (ADMIN_EMAILS).");
    }
    if (!res.ok) throw new Error("Could not load issue reports.");
    const data = (await res.json()) as { reports: IssueReport[] };
    setReports(data.reports);
    if (!activeId && data.reports[0]) setActiveId(data.reports[0].id);
    return data.reports;
  }

  useEffect(() => {
    setLoading(true);
    load(filter)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  async function updateStatus(status: string) {
    if (!activeId) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/issue-reports", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: activeId, status }),
      });
      const data = (await res.json()) as {
        report?: IssueReport;
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Update failed");
      setReports((prev) =>
        prev.map((r) => (r.id === data.report!.id ? data.report! : r))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 size-5 animate-spin" />
        Loading issue reports…
      </div>
    );
  }

  if (error && reports.length === 0) {
    return (
      <div className="mx-auto max-w-lg space-y-4 px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold">Issue reports</h1>
        <p className="text-muted-foreground">{error}</p>
        <Link href="/login" className={cn(buttonVariants())}>
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold">Issue reports</h1>
          <p className="mt-1 text-muted-foreground">
            Contextual reports from medication, pharmacy, and pricing screens.
          </p>
        </div>
        <Link href="/admin" className="text-sm font-medium text-primary hover:underline">
          Ops overview
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {["received", "reviewed", "closed", "all"].map((s) => (
          <Button
            key={s}
            size="sm"
            variant={filter === s ? "default" : "outline"}
            onClick={() => setFilter(s)}
          >
            {s}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <ul className="max-h-[70dvh] space-y-2 overflow-auto">
          {reports.length === 0 && (
            <li className="rounded-xl border border-border px-4 py-6 text-sm text-muted-foreground">
              No reports in this filter.
            </li>
          )}
          {reports.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => setActiveId(r.id)}
                className={cn(
                  "w-full rounded-xl border px-3 py-3 text-left text-sm transition-colors",
                  activeId === r.id
                    ? "border-primary bg-secondary"
                    : "border-border bg-card hover:bg-muted/40"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">
                    {r.category.replaceAll("_", " ")}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {r.referenceCode}
                  </span>
                </div>
                <p className="mt-1 text-muted-foreground">
                  {r.status} · {new Date(r.createdAt).toLocaleString()}
                </p>
              </button>
            </li>
          ))}
        </ul>

        <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          {!active ? (
            <p className="text-muted-foreground">Select a report.</p>
          ) : (
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-2xl font-semibold capitalize">
                  {active.category.replaceAll("_", " ")}
                </h2>
                <p className="font-mono text-sm text-muted-foreground">
                  {active.referenceCode}
                </p>
                <p className="text-sm text-muted-foreground">
                  {active.email || "No email"} ·{" "}
                  {new Date(active.createdAt).toLocaleString()}
                </p>
              </div>
              <dl className="grid gap-2 text-sm sm:grid-cols-2">
                <div className="rounded-lg bg-muted/50 px-3 py-2">
                  <dt className="text-muted-foreground">Page</dt>
                  <dd className="break-all">{active.pagePath || "—"}</dd>
                </div>
                <div className="rounded-lg bg-muted/50 px-3 py-2">
                  <dt className="text-muted-foreground">Drug ID</dt>
                  <dd>{active.drugId || "—"}</dd>
                </div>
                <div className="rounded-lg bg-muted/50 px-3 py-2 sm:col-span-2">
                  <dt className="text-muted-foreground">Pharmacy ID</dt>
                  <dd>{active.pharmacyId || "—"}</dd>
                </div>
              </dl>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {active.details}
              </p>
              <div className="flex flex-wrap gap-2">
                {["received", "reviewed", "closed"].map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={active.status === status ? "default" : "outline"}
                    disabled={saving}
                    onClick={() => void updateStatus(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
