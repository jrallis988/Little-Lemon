"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import { CLINICAL_SERVICES } from "@/lib/data/catalog";
import { useSelectedStore } from "@/lib/store/store-selection";
import type { AppointmentRequest } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "walgreens-appointments-v1";

export function ScheduleForm() {
  const searchParams = useSearchParams();
  const { store } = useSelectedStore();
  const initialService =
    searchParams.get("service") ?? CLINICAL_SERVICES[0]?.id ?? "";

  const [serviceId, setServiceId] = useState(initialService);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("10:00");
  const [contactEmail, setContactEmail] = useState("jordan.lee@email.com");
  const [contactPhone, setContactPhone] = useState("(415) 555-0100");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<AppointmentRequest | null>(
    null,
  );

  const service = useMemo(
    () => CLINICAL_SERVICES.find((item) => item.id === serviceId),
    [serviceId],
  );

  function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (!service) {
      setError("Choose a service.");
      return;
    }
    if (!preferredDate) {
      setError("Pick a preferred date.");
      return;
    }
    if (!contactEmail.includes("@")) {
      setError("Enter a contact email.");
      return;
    }

    const appointment: AppointmentRequest = {
      id: `APT-${Date.now().toString().slice(-6)}`,
      serviceId: service.id,
      serviceName: service.name,
      storeId: store.id,
      storeName: store.name,
      preferredDate,
      preferredTime,
      contactEmail,
      contactPhone,
      notes: notes.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = window.localStorage.getItem(STORAGE_KEY);
      const list = existing
        ? (JSON.parse(existing) as AppointmentRequest[])
        : [];
      list.unshift(appointment);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 20)));
    } catch {
      // ignore persistence errors
    }
    setConfirmation(appointment);
  }

  if (confirmation) {
    return (
      <div className="rounded-2xl border border-health/25 bg-surface-elevated/90 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 size-7 text-health" aria-hidden />
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              Request received
            </h1>
            <p className="mt-2 text-muted-foreground">
              Confirmation #{confirmation.id} for {confirmation.serviceName} at{" "}
              {confirmation.storeName}.
            </p>
          </div>
        </div>
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Preferred</dt>
            <dd className="font-medium">
              {confirmation.preferredDate} · {confirmation.preferredTime}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Contact</dt>
            <dd className="font-medium">{confirmation.contactEmail}</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-muted-foreground">
          Demo booking — a pharmacy team would confirm this slot. No PHI is sent
          to a real backend.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            className="bg-health text-health-foreground hover:bg-health/90"
            nativeButton={false}
            render={<Link href="/pharmacy" />}
          >
            Back to pharmacy
          </Button>
          <Button variant="outline" onClick={() => setConfirmation(null)}>
            Book another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Schedule a visit
      </h1>
      <p className="mt-2 text-muted-foreground">
        Request a vaccine or test at {store.name}. We&apos;ll confirm by email
        in a real pharmacy workflow.
      </p>

      <form className="mt-8 space-y-5" onSubmit={submit}>
        <div className="space-y-2">
          <Label htmlFor="service">Service</Label>
          <select
            id="service"
            className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            value={serviceId}
            onChange={(event) => setServiceId(event.target.value)}
          >
            {CLINICAL_SERVICES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
                {!item.availableToday ? " (call to confirm)" : ""}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="date">Preferred date</Label>
            <Input
              id="date"
              type="date"
              value={preferredDate}
              onChange={(event) => setPreferredDate(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Preferred time</Label>
            <Input
              id="time"
              type="time"
              value={preferredTime}
              onChange={(event) => setPreferredTime(event.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={contactEmail}
            onChange={(event) => setContactEmail(event.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={contactPhone}
            onChange={(event) => setContactPhone(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes (optional)</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Allergies, preferred pharmacist, etc."
          />
        </div>
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        <Button
          type="submit"
          className="bg-health text-health-foreground hover:bg-health/90"
        >
          Request appointment
        </Button>
      </form>
    </>
  );
}
