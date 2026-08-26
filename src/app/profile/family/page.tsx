"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, Users } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmptyState } from "@/components/design/empty-state";
import { TrustCallout } from "@/components/design/trust-callout";
import { cn } from "@/lib/utils";

interface Member {
  id: string;
  name: string;
  relation: string | null;
  dateOfBirth: string | null;
  notes: string | null;
}

export default function FamilyPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [limit, setLimit] = useState(0);
  const [membershipEnabled, setMembershipEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [notes, setNotes] = useState("");

  async function load() {
    const res = await fetch("/api/me/family");
    if (res.status === 401) throw new Error("Sign in required");
    if (!res.ok) throw new Error("Could not load family profiles.");
    const data = (await res.json()) as { members: Member[]; limit: number };
    setMembers(data.members);
    setLimit(data.limit);
  }

  useEffect(() => {
    Promise.all([
      fetch("/api/config").then(async (res) => {
        if (!res.ok) return { launch: { membership: true, familyProfiles: true } };
        return res.json() as Promise<{
          launch: { membership: boolean; familyProfiles: boolean };
        }>;
      }),
      load(),
    ])
      .then(([config]) => {
        setMembershipEnabled(
          config.launch.membership && config.launch.familyProfiles
        );
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function addMember(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/me/family", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          relation: relation || null,
          dateOfBirth: dateOfBirth || null,
          notes: notes || null,
        }),
      });
      const data = (await res.json()) as { error?: string; code?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not add member.");
      setName("");
      setRelation("");
      setDateOfBirth("");
      setNotes("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add member.");
    } finally {
      setSaving(false);
    }
  }

  async function removeMember(id: string) {
    setSaving(true);
    try {
      const res = await fetch(`/api/me/family?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Could not remove member.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove member.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 size-5 animate-spin" />
        Loading family profiles…
      </div>
    );
  }

  if (error === "Sign in required") {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-semibold">Sign in required</h1>
        <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "mt-5")}>
          Sign in
        </Link>
      </div>
    );
  }

  if (!membershipEnabled) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-semibold">Not available in limited launch</h1>
        <p className="mt-3 text-muted-foreground">
          Family profiles are a Plus benefit and are disabled during the v1
          launch.
        </p>
        <Link href="/profile" className="mt-6 inline-block text-sm font-medium text-primary hover:underline">
          ← Back to account
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
        <header className="space-y-1.5">
          <p className="text-sm font-medium text-primary">Plus benefit</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Family & dependents
          </h1>
          <p className="text-muted-foreground">
            Manage household members so you can keep coupons and fills organized
            for caregivers.
          </p>
        </header>

        <TrustCallout title="Privacy first">
          Family profiles stay on your account. We never sell health query or
          medication data.
        </TrustCallout>

        {limit === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-5 text-center">
            <Users className="mx-auto size-8 text-primary" />
            <h2 className="mt-3 font-display text-xl font-semibold">
              Included with Trump RX Plus
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Upgrade to manage up to 5 family members and dependents.
            </p>
            <Link
              href="/membership"
              className={cn(buttonVariants({ size: "lg" }), "mt-4")}
            >
              View membership
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              {members.length} of {limit} profiles used.
            </p>

            {members.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No family members yet"
                description="Add a spouse, child, or dependent you help manage fills for."
              />
            ) : (
              <ul className="space-y-2">
                {members.map((m) => (
                  <li
                    key={m.id}
                    className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-border bg-card p-4"
                  >
                    <div>
                      <p className="font-semibold">{m.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {[m.relation, m.dateOfBirth].filter(Boolean).join(" · ") ||
                          "Household member"}
                      </p>
                      {m.notes && (
                        <p className="mt-1 text-sm text-muted-foreground">{m.notes}</p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={saving}
                      onClick={() => void removeMember(m.id)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}

            {members.length < limit && (
              <form
                onSubmit={addMember}
                className="space-y-3 rounded-2xl border border-border bg-card p-4 sm:p-5"
              >
                <h2 className="font-display text-xl font-semibold">Add member</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="relation">Relation</Label>
                    <Input
                      id="relation"
                      value={relation}
                      onChange={(e) => setRelation(e.target.value)}
                      placeholder="Spouse, child, parent…"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="dob">Date of birth (optional)</Label>
                    <Input
                      id="dob"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      placeholder="YYYY-MM-DD"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="notes">Notes</Label>
                    <Input
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Allergy notes, preferred pharmacy…"
                      className="h-11"
                    />
                  </div>
                </div>
                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}
                <Button type="submit" disabled={saving} className="min-h-11">
                  {saving && <Loader2 className="animate-spin" />}
                  Save family member
                </Button>
              </form>
            )}
          </>
        )}

        <Link href="/profile" className="text-sm font-medium text-primary hover:underline">
          ← Back to account
        </Link>
      </div>
    </div>
  );
}
