"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

import { useSelectedStore } from "@/lib/store/store-selection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TransferPage() {
  const { store } = useSelectedStore();
  const [submitted, setSubmitted] = useState(false);
  const [rxNumber, setRxNumber] = useState("");
  const [fromPharmacy, setFromPharmacy] = useState("");
  const [medication, setMedication] = useState("");
  const [phone, setPhone] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-health/25 bg-surface-elevated/90 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 size-7 text-health" aria-hidden />
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight">
                Transfer requested
              </h1>
              <p className="mt-2 text-muted-foreground">
                We&apos;ll contact {fromPharmacy || "your pharmacy"} and move
                eligible prescriptions to {store.name}.
              </p>
            </div>
          </div>
          <Button
            className="mt-6 bg-brand text-brand-foreground hover:bg-brand/90"
            nativeButton={false}
            render={<Link href="/pharmacy" />}
          >
            Back to pharmacy
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Transfer prescriptions
      </h1>
      <p className="mt-2 text-muted-foreground">
        Move your Rx to {store.name}. Have your current pharmacy phone and Rx
        number ready.
      </p>

      <form className="mt-8 space-y-5" onSubmit={submit}>
        <div className="space-y-2">
          <Label htmlFor="from">Current pharmacy</Label>
          <Input
            id="from"
            value={fromPharmacy}
            onChange={(event) => setFromPharmacy(event.target.value)}
            placeholder="Neighborhood Pharmacy"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Pharmacy phone</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="(415) 555-0199"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rx">Rx number (optional)</Label>
          <Input
            id="rx"
            value={rxNumber}
            onChange={(event) => setRxNumber(event.target.value)}
            placeholder="4829103"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="med">Medication name</Label>
          <Textarea
            id="med"
            value={medication}
            onChange={(event) => setMedication(event.target.value)}
            placeholder="Atorvastatin 20 mg"
            required
          />
        </div>
        <Button
          type="submit"
          className="bg-brand text-brand-foreground hover:bg-brand/90"
        >
          Submit transfer
        </Button>
      </form>
    </div>
  );
}
