"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TransferRow {
  id: string;
  patientName: string;
  contactEmail: string | null;
  contactPhone: string | null;
  drugName: string;
  strength: string | null;
  quantity: string | null;
  fromPharmacyName: string;
  fromPharmacyPhone: string | null;
  toPharmacyName: string | null;
  status: string;
  adminNotes: string | null;
  assignedTo: string | null;
  notes: string | null;
  createdAt: string;
  user: { email: string; name: string | null } | null;
  toPharmacy: { name: string; phone: string } | null;
}

export default function AdminTransfersPage() {
  const [transfers, setTransfers] = useState<TransferRow[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("submitted");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const active = transfers.find((t) => t.id === activeId) ?? null;

  async function load(status = filter) {
    const qs = status === "all" ? "" : `?status=${encodeURIComponent(status)}`;
    const res = await fetch(`/api/admin/transfers${qs}`);
    if (res.status === 403 || res.status === 401) {
      throw new Error("Admin access required (ADMIN_EMAILS).");
    }
    if (!res.ok) throw new Error("Could not load transfers.");
    const data = (await res.json()) as { transfers: TransferRow[] };
    setTransfers(data.transfers);
    if (!activeId && data.transfers[0]) setActiveId(data.transfers[0].id);
  }

  useEffect(() => {
    setLoading(true);
    load(filter)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (active) setNote(active.adminNotes ?? "");
  }, [active]);

  async function update(patch: Record<string, unknown>) {
    if (!activeId) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/transfers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: activeId, ...patch }),
      });
      const data = (await res.json()) as { transfer?: TransferRow; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Update failed");
      setTransfers((prev) =>
        prev.map((t) => (t.id === data.transfer!.id ? data.transfer! : t))
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
        Loading transfer queue…
      </div>
    );
  }

  if (error && transfers.length === 0) {
    return (
      <div className="mx-auto max-w-lg space-y-4 px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold">Rx transfers</h1>
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
          <h1 className="font-display text-3xl font-semibold">Rx transfer queue</h1>
          <p className="mt-1 text-muted-foreground">
            Review patient transfer requests and coordinate with receiving pharmacies.
          </p>
        </div>
        <Link href="/admin" className="text-sm font-medium text-primary hover:underline">
          Ops overview
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {["submitted", "in_review", "completed", "canceled", "all"].map((s) => (
          <Button
            key={s}
            size="sm"
            variant={filter === s ? "default" : "outline"}
            onClick={() => setFilter(s)}
          >
            {s.replaceAll("_", " ")}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <ul className="max-h-[70dvh] space-y-2 overflow-auto">
          {transfers.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => setActiveId(t.id)}
                className={cn(
                  "w-full rounded-xl border px-3 py-3 text-left text-sm",
                  activeId === t.id
                    ? "border-primary bg-secondary"
                    : "border-border bg-card hover:bg-muted/40"
                )}
              >
                <p className="font-medium">{t.drugName}</p>
                <p className="text-muted-foreground">
                  {t.patientName} · {t.status.replaceAll("_", " ")}
                </p>
              </button>
            </li>
          ))}
        </ul>

        <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          {!active ? (
            <p className="text-muted-foreground">Select a transfer.</p>
          ) : (
            <div className="space-y-4 text-sm">
              <div>
                <h2 className="font-display text-2xl font-semibold capitalize">
                  {active.drugName}
                </h2>
                <p className="text-muted-foreground">
                  {active.patientName} · {new Date(active.createdAt).toLocaleString()}
                </p>
              </div>
              <dl className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-lg bg-muted/50 px-3 py-2">
                  <dt className="text-muted-foreground">From</dt>
                  <dd>{active.fromPharmacyName}</dd>
                  {active.fromPharmacyPhone && <dd>{active.fromPharmacyPhone}</dd>}
                </div>
                <div className="rounded-lg bg-muted/50 px-3 py-2">
                  <dt className="text-muted-foreground">To</dt>
                  <dd>{active.toPharmacyName ?? active.toPharmacy?.name ?? "TBD"}</dd>
                  {active.toPharmacy?.phone && <dd>{active.toPharmacy.phone}</dd>}
                </div>
                <div className="rounded-lg bg-muted/50 px-3 py-2">
                  <dt className="text-muted-foreground">Contact</dt>
                  <dd>{active.contactEmail ?? active.user?.email ?? "—"}</dd>
                  {active.contactPhone && <dd>{active.contactPhone}</dd>}
                </div>
                <div className="rounded-lg bg-muted/50 px-3 py-2">
                  <dt className="text-muted-foreground">Fill details</dt>
                  <dd>
                    {[active.strength, active.quantity].filter(Boolean).join(" · ") ||
                      "—"}
                  </dd>
                </div>
              </dl>
              {active.notes && (
                <p className="rounded-lg bg-muted/40 px-3 py-2 whitespace-pre-wrap">
                  {active.notes}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {["submitted", "in_review", "completed", "canceled"].map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={active.status === status ? "default" : "outline"}
                    disabled={saving}
                    onClick={() => void update({ status })}
                  >
                    {status.replaceAll("_", " ")}
                  </Button>
                ))}
              </div>
              <div className="space-y-2">
                <label className="font-medium" htmlFor="adminNotes">
                  Ops notes
                </label>
                <textarea
                  id="adminNotes"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2"
                />
                <Button
                  disabled={saving}
                  onClick={() =>
                    void update({
                      adminNotes: note || null,
                      status: active.status === "submitted" ? "in_review" : active.status,
                    })
                  }
                >
                  {saving && <Loader2 className="animate-spin" />}
                  Save notes
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
