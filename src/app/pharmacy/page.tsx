import type { Metadata } from "next";
import Link from "next/link";

import { CLINICAL_SERVICES } from "@/lib/data/catalog";
import { PharmacyDashboard } from "@/components/pharmacy/pharmacy-dashboard";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pharmacy & Health",
  description:
    "Refill prescriptions, track fills visually, and manage caregiver profiles.",
};

export default function PharmacyPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-10 sm:px-6">
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/pharmacy/transfer" />}
        >
          Transfer Rx
        </Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/pharmacy/auto-refill" />}
        >
          Auto-refill
        </Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/pharmacy/schedule" />}
        >
          Schedule visit
        </Button>
      </div>

      <PharmacyDashboard />

      <section id="services" aria-labelledby="clinical-heading" className="space-y-6">
        <div>
          <h2
            id="clinical-heading"
            className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Clinical services
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Schedule vaccines and testing without leaving the pharmacy experience.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLINICAL_SERVICES.map((service) => (
            <li
              key={service.id}
              className="rounded-2xl border border-border/80 bg-surface-elevated/90 p-5"
            >
              <h3 className="font-display text-lg font-semibold">{service.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {service.description}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {service.durationMinutes} minutes
                {service.availableToday ? " · Available today" : ""}
              </p>
              <Button
                className="mt-4 bg-health text-health-foreground hover:bg-health/90"
                nativeButton={false}
                render={<Link href={service.href} />}
              >
                Schedule
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
