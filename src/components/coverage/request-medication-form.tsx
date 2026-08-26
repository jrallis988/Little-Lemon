"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RequestMedicationFormProps {
  initialName?: string;
  className?: string;
}

export function RequestMedicationForm({
  initialName = "",
  className,
}: RequestMedicationFormProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/medication-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          medicationName: name,
          email,
          notes,
        }),
      });
      const data = (await res.json()) as {
        error?: string;
        referenceCode?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Could not submit request");
      setReference(data.referenceCode ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit request");
    } finally {
      setPending(false);
    }
  }

  if (reference) {
    return (
      <div className={className}>
        <p className="text-sm font-semibold text-foreground">Request received</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Reference number:{" "}
          <span className="font-mono font-semibold text-foreground">
            {reference}
          </span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          TrumpRx currently supports a limited selection of medications. Coverage
          may expand over time; this request helps prioritize what to evaluate
          next.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="req-med-name">Medication name</Label>
          <Input
            id="req-med-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            className="h-10"
            placeholder="Brand or generic name"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="req-med-email">Email (optional)</Label>
          <Input
            id="req-med-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10"
            placeholder="If you want a follow-up"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="req-med-notes">Notes (optional)</Label>
          <textarea
            id="req-med-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Dosage, why it matters, etc."
          />
        </div>
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" disabled={pending} className="min-h-10">
          {pending && <Loader2 className="animate-spin" />}
          Request this medication
        </Button>
      </div>
    </form>
  );
}
