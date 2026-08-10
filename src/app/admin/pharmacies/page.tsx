"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PharmacyRow {
  id: string;
  name: string;
  chain: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  partnerStatus: string;
  discountTier: string;
  acceptsTrumpRxCoupon: boolean;
  adminNotes: string | null;
  pharmacyDeskNote: string | null;
  _count: { contracts: number; coupons: number };
}

export default function AdminPharmaciesPage() {
  const [pharmacies, setPharmacies] = useState<PharmacyRow[]>([]);
  const [summary, setSummary] = useState<Array<{ status: string; count: number }>>(
    []
  );
  const [q, setQ] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const active = pharmacies.find((p) => p.id === activeId) ?? null;

  async function load(query = q) {
    const res = await fetch(
      `/api/admin/pharmacies${query ? `?q=${encodeURIComponent(query)}` : ""}`
    );
    if (res.status === 403 || res.status === 401) {
      throw new Error("Admin access required (ADMIN_EMAILS).");
    }
    if (!res.ok) throw new Error("Could not load pharmacies.");
    const data = (await res.json()) as {
      pharmacies: PharmacyRow[];
      summary: Array<{ status: string; count: number }>;
    };
    setPharmacies(data.pharmacies);
    setSummary(data.summary);
    if (!activeId && data.pharmacies[0]) {
      setActiveId(data.pharmacies[0].id);
      setNotes(data.pharmacies[0].adminNotes ?? "");
    }
  }

  useEffect(() => {
    load()
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (active) setNotes(active.adminNotes ?? "");
  }, [active]);

  async function patch(update: Record<string, unknown>) {
    if (!activeId) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/pharmacies", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: activeId, ...update }),
      });
      const data = (await res.json()) as { pharmacy?: PharmacyRow; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Update failed");
      setPharmacies((prev) =>
        prev.map((p) => (p.id === data.pharmacy!.id ? data.pharmacy! : p))
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
        Loading pharmacy partners…
      </div>
    );
  }

  if (error && pharmacies.length === 0) {
    return (
      <div className="mx-auto max-w-lg space-y-4 px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold">Pharmacy partners</h1>
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
          <h1 className="font-display text-3xl font-semibold">Pharmacy partners</h1>
          <p className="mt-1 text-muted-foreground">
            Onboard, audit network status, discount tiers, and desk notes.
          </p>
        </div>
        <Link href="/admin" className="text-sm font-medium text-primary hover:underline">
          Ops overview
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {summary.map((s) => (
          <span
            key={s.status}
            className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium"
          >
            {s.status}: {s.count}
          </span>
        ))}
      </div>

      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          void load(q);
        }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, city, zip, chain…"
            className="h-11 pl-9"
          />
        </div>
        <Button type="submit" className="min-h-11">
          Search
        </Button>
      </form>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <ul className="max-h-[70dvh] space-y-2 overflow-auto">
          {pharmacies.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setActiveId(p.id)}
                className={cn(
                  "w-full rounded-xl border px-3 py-3 text-left text-sm",
                  activeId === p.id
                    ? "border-primary bg-secondary"
                    : "border-border bg-card hover:bg-muted/40"
                )}
              >
                <p className="font-medium">{p.name}</p>
                <p className="text-muted-foreground">
                  {p.city}, {p.state} {p.zip} · {p.partnerStatus} · {p.discountTier}
                </p>
              </button>
            </li>
          ))}
        </ul>

        <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          {!active ? (
            <p className="text-muted-foreground">Select a pharmacy.</p>
          ) : (
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-2xl font-semibold">{active.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {active.chain} · {active.phone} · {active._count.contracts} contracts ·{" "}
                  {active._count.coupons} coupons
                </p>
                <Link
                  href={`/pharmacies/${active.id}`}
                  className="mt-1 inline-flex text-sm font-medium text-primary hover:underline"
                >
                  Open public page →
                </Link>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">Partner status</p>
                <div className="flex flex-wrap gap-2">
                  {["active", "pending", "suspended"].map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={active.partnerStatus === status ? "default" : "outline"}
                      disabled={saving}
                      onClick={() => void patch({ partnerStatus: status })}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">Discount tier</p>
                <div className="flex flex-wrap gap-2">
                  {["standard", "preferred", "select"].map((tier) => (
                    <Button
                      key={tier}
                      size="sm"
                      variant={active.discountTier === tier ? "default" : "outline"}
                      disabled={saving}
                      onClick={() => void patch({ discountTier: tier })}
                    >
                      {tier}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                disabled={saving}
                onClick={() =>
                  void patch({
                    acceptsTrumpRxCoupon: !active.acceptsTrumpRxCoupon,
                  })
                }
              >
                Coupons: {active.acceptsTrumpRxCoupon ? "accepted" : "call to confirm"}
              </Button>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="adminNotes">
                  Admin notes
                </label>
                <textarea
                  id="adminNotes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                />
                <Button
                  disabled={saving}
                  onClick={() => void patch({ adminNotes: notes || null })}
                >
                  {saving && <Loader2 className="animate-spin" />}
                  Save notes
                </Button>
              </div>

              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
