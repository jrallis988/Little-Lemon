"use client";

import { Check } from "lucide-react";

import {
  getStatusProgress,
  PRESCRIPTION_STATUS_LABEL,
  PRESCRIPTION_STATUS_ORDER,
} from "@/lib/pharmacy";
import type { Prescription, PrescriptionStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface PrescriptionTrackerProps {
  prescription: Prescription;
  className?: string;
}

function statusIndex(status: PrescriptionStatus): number {
  if (status === "picked_up") return PRESCRIPTION_STATUS_ORDER.length - 1;
  return PRESCRIPTION_STATUS_ORDER.indexOf(status);
}

export function PrescriptionTracker({
  prescription,
  className,
}: PrescriptionTrackerProps) {
  const currentIndex = statusIndex(prescription.status);
  const progress = getStatusProgress(prescription.status);

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-surface-elevated/90 p-5",
        className,
      )}
      aria-label={`${prescription.medicationName} order status`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight text-foreground">
            {prescription.medicationName}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {prescription.dosage} · Rx #{prescription.rxNumber}
          </p>
        </div>
        <p className="rounded-md bg-health/10 px-2.5 py-1 text-xs font-semibold text-health">
          {PRESCRIPTION_STATUS_LABEL[prescription.status]}
        </p>
      </div>

      <div className="mt-5">
        <Progress value={progress} className="h-2" aria-hidden />
        <ol className="mt-4 grid grid-cols-3 gap-2" aria-label="Fill progress">
          {PRESCRIPTION_STATUS_ORDER.map((step, index) => {
            const complete = index <= currentIndex;
            const current = index === currentIndex;
            return (
              <li key={step} className="flex flex-col items-center gap-2 text-center">
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                    complete
                      ? "border-health bg-health text-health-foreground"
                      : "border-border bg-muted text-muted-foreground",
                    current && prescription.status !== "ready" && "animate-tracker-pulse",
                  )}
                  aria-current={current ? "step" : undefined}
                >
                  {complete ? <Check className="size-4" aria-hidden /> : index + 1}
                </span>
                <span
                  className={cn(
                    "text-xs font-medium",
                    complete ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {PRESCRIPTION_STATUS_LABEL[step]}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <dl className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Pickup store</dt>
          <dd className="font-medium text-foreground">{prescription.storeName}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">
            {prescription.status === "ready" ? "Ready since" : "Estimated ready"}
          </dt>
          <dd className="font-medium text-foreground">
            {prescription.readyBy
              ? new Date(prescription.readyBy).toLocaleString(undefined, {
                  weekday: "short",
                  hour: "numeric",
                  minute: "2-digit",
                })
              : "Calculating"}
          </dd>
        </div>
      </dl>
    </div>
  );
}
