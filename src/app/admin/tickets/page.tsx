"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatCurrency } from "@/lib/pricing";
import { cn } from "@/lib/utils";

interface TicketNote {
  id: string;
  authorEmail: string;
  body: string;
  createdAt: string;
}

interface Ticket {
  id: string;
  email: string;
  name: string | null;
  subject: string;
  category: string;
  status: string;
  priority: string;
  body: string;
  pharmacyName: string | null;
  drugName: string | null;
  expectedPrice: number | null;
  chargedPrice: number | null;
  resolution: string | null;
  assignedTo: string | null;
  createdAt: string;
  notes: TicketNote[];
}

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("open");

  const active = tickets.find((t) => t.id === activeId) ?? null;

  async function load(status = filter) {
    const qs = status === "all" ? "" : `?status=${encodeURIComponent(status)}`;
    const res = await fetch(`/api/admin/tickets${qs}`);
    if (res.status === 403 || res.status === 401) {
      throw new Error("Admin access required (ADMIN_EMAILS).");
    }
    if (!res.ok) throw new Error("Could not load tickets.");
    const data = (await res.json()) as { tickets: Ticket[] };
    setTickets(data.tickets);
    if (!activeId && data.tickets[0]) setActiveId(data.tickets[0].id);
    return data.tickets;
  }

  useEffect(() => {
    setLoading(true);
    load(filter)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  async function update(patch: Record<string, unknown>) {
    if (!activeId) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/tickets", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: activeId, ...patch }),
      });
      const data = (await res.json()) as { ticket?: Ticket; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Update failed");
      setTickets((prev) =>
        prev.map((t) => (t.id === data.ticket!.id ? data.ticket! : t))
      );
      setNote("");
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
        Loading ticket queue…
      </div>
    );
  }

  if (error && tickets.length === 0) {
    return (
      <div className="mx-auto max-w-lg space-y-4 px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold">Support tickets</h1>
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
          <h1 className="font-display text-3xl font-semibold">Support tickets</h1>
          <p className="mt-1 text-muted-foreground">
            Triage counter issues, stock problems, and account requests.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/messages" className="text-sm font-medium text-primary hover:underline">
            Live chat inbox
          </Link>
          <Link href="/admin" className="text-sm font-medium text-primary hover:underline">
            Ops overview
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {["open", "in_progress", "resolved", "closed", "all"].map((s) => (
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
          {tickets.length === 0 && (
            <li className="rounded-xl border border-border px-4 py-6 text-sm text-muted-foreground">
              No tickets in this filter.
            </li>
          )}
          {tickets.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => setActiveId(t.id)}
                className={cn(
                  "w-full rounded-xl border px-3 py-3 text-left text-sm transition-colors",
                  activeId === t.id
                    ? "border-primary bg-secondary"
                    : "border-border bg-card hover:bg-muted/40"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{t.subject}</span>
                  <span className="text-xs uppercase text-muted-foreground">
                    {t.priority}
                  </span>
                </div>
                <p className="mt-1 text-muted-foreground">
                  {t.category.replaceAll("_", " ")} · {t.status.replaceAll("_", " ")}
                </p>
              </button>
            </li>
          ))}
        </ul>

        <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          {!active ? (
            <p className="text-muted-foreground">Select a ticket.</p>
          ) : (
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-2xl font-semibold">{active.subject}</h2>
                <p className="text-sm text-muted-foreground">
                  {active.name || "Visitor"} · {active.email} ·{" "}
                  {new Date(active.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{active.body}</p>
              <dl className="grid gap-2 text-sm sm:grid-cols-2">
                <div className="rounded-lg bg-muted/50 px-3 py-2">
                  <dt className="text-muted-foreground">Pharmacy</dt>
                  <dd>{active.pharmacyName || "—"}</dd>
                </div>
                <div className="rounded-lg bg-muted/50 px-3 py-2">
                  <dt className="text-muted-foreground">Medication</dt>
                  <dd>{active.drugName || "—"}</dd>
                </div>
                <div className="rounded-lg bg-muted/50 px-3 py-2">
                  <dt className="text-muted-foreground">Expected</dt>
                  <dd>
                    {active.expectedPrice != null
                      ? formatCurrency(active.expectedPrice)
                      : "—"}
                  </dd>
                </div>
                <div className="rounded-lg bg-muted/50 px-3 py-2">
                  <dt className="text-muted-foreground">Charged</dt>
                  <dd>
                    {active.chargedPrice != null
                      ? formatCurrency(active.chargedPrice)
                      : "—"}
                  </dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-2">
                {["open", "in_progress", "resolved", "closed"].map((status) => (
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
                <label className="text-sm font-medium" htmlFor="note">
                  Internal note / resolution
                </label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                />
                <Button
                  disabled={saving || !note.trim()}
                  onClick={() =>
                    void update({
                      note,
                      resolution: note,
                      status:
                        active.status === "open" ? "in_progress" : active.status,
                    })
                  }
                >
                  {saving && <Loader2 className="animate-spin" />}
                  Save note
                </Button>
              </div>

              {active.notes.length > 0 && (
                <ul className="space-y-2 border-t border-border pt-3 text-sm">
                  {active.notes.map((n) => (
                    <li key={n.id} className="rounded-lg bg-muted/40 px-3 py-2">
                      <p className="text-xs text-muted-foreground">
                        {n.authorEmail} · {new Date(n.createdAt).toLocaleString()}
                      </p>
                      <p className="mt-1 whitespace-pre-wrap">{n.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
