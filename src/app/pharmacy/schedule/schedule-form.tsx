"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import { getBookingDays, getBookingSlots } from "@/lib/data/booking-slots";
import { CLINICAL_SERVICES } from "@/lib/data/catalog";
import { useSelectedStore } from "@/lib/store/store-selection";
import type { AppointmentRequest } from "@/lib/types";
import { cn } from "@/lib/utils";
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
  const days = useMemo(() => getBookingDays(5), []);

  const [serviceId, setServiceId] = useState(initialService);
  const [preferredDate, setPreferredDate] = useState(days[0]?.date ?? "");
  const [preferredTime, setPreferredTime] = useState("");
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

  const slots = useMemo(
    () =>
      preferredDate && serviceId
        ? getBookingSlots(preferredDate, serviceId)
        : [],
    [preferredDate, serviceId],
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
    if (!preferredTime) {
      setError("Choose an available time slot.");
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
        Choose a service, day, and open slot at {store.name}. Walk-ins may still
        be available at the counter.
      </p>

      <form className="mt-8 space-y-6" onSubmit={submit}>
        <div className="space-y-2">
          <Label htmlFor="service">Service</Label>
          <select
            id="service"
            className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            value={serviceId}
            onChange={(event) => {
              setServiceId(event.target.value);
              setPreferredTime("");
            }}
          >
            {CLINICAL_SERVICES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
                {!item.availableToday ? " (call to confirm)" : ""}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium">Day</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {days.map((day) => (
              <button
                key={day.id}
                type="button"
                onClick={() => {
                  setPreferredDate(day.date);
                  setPreferredTime("");
                }}
                className={cn(
                  "rounded-xl border px-3 py-3 text-left transition-colors",
                  preferredDate === day.date
                    ? "border-health bg-health/10 text-health"
                    : "border-border hover:border-health/40",
                )}
                aria-pressed={preferredDate === day.date}
              >
                <span className="block text-xs font-medium uppercase tracking-wide">
                  {day.weekday}
                </span>
                <span className="mt-1 block text-sm font-semibold text-foreground">
                  {day.label}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium">Available times</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {slots.map((slot) => (
              <button
                key={slot.id}
                type="button"
                disabled={!slot.available}
                onClick={() => setPreferredTime(slot.time)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  !slot.available && "cursor-not-allowed opacity-40",
                  slot.available &&
                    preferredTime === slot.time &&
                    "border-health bg-health text-health-foreground",
                  slot.available &&
                    preferredTime !== slot.time &&
                    "border-border hover:border-health/40",
                )}
                aria-pressed={preferredTime === slot.time}
              >
                {slot.time}
                {!slot.available ? " · full" : ""}
              </button>
            ))}
          </div>
        </fieldset>

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
