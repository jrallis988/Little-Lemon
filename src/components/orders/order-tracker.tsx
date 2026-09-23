"use client";

import { Check } from "lucide-react";

import {
  getOrderProgress,
  orderStatusLabel,
  statusStepsFor,
} from "@/lib/order-lifecycle";
import type { PlacedOrder } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export function OrderTracker({
  order,
  className,
}: {
  order: PlacedOrder;
  className?: string;
}) {
  const steps = statusStepsFor(order.fulfillment);
  const currentIndex = Math.max(0, steps.indexOf(order.status));
  const progress = getOrderProgress(order.fulfillment, order.status);
  const latest = order.updates[order.updates.length - 1];

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-surface-elevated/90 p-5",
        className,
      )}
      aria-label={`Order ${order.id} status`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">
            {order.fulfillment === "pickup" ? "Pickup progress" : "Delivery progress"}
          </p>
          <p className="mt-1 font-display text-lg font-semibold tracking-tight">
            {orderStatusLabel(order.status)}
          </p>
        </div>
        <p
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-semibold",
            order.status === "ready" || order.status === "delivered"
              ? "bg-health/10 text-health"
              : order.status === "picked_up"
                ? "bg-muted text-muted-foreground"
                : "bg-brand/10 text-brand",
          )}
        >
          {orderStatusLabel(order.status)}
        </p>
      </div>

      <div className="mt-5">
        <Progress value={progress} className="h-2" aria-hidden />
        <ol
          className={cn(
            "mt-4 grid gap-2",
            steps.length === 4 ? "grid-cols-4" : "grid-cols-3",
          )}
          aria-label="Order progress steps"
        >
          {steps.map((step, index) => {
            const complete = index <= currentIndex;
            const current = index === currentIndex;
            return (
              <li
                key={step}
                className="flex flex-col items-center gap-2 text-center"
              >
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                    complete
                      ? "border-health bg-health text-health-foreground"
                      : "border-border bg-muted text-muted-foreground",
                    current &&
                      order.status !== "ready" &&
                      order.status !== "picked_up" &&
                      order.status !== "delivered" &&
                      "animate-tracker-pulse",
                  )}
                  aria-current={current ? "step" : undefined}
                >
                  {complete ? <Check className="size-4" aria-hidden /> : index + 1}
                </span>
                <span
                  className={cn(
                    "text-[11px] font-medium leading-tight sm:text-xs",
                    complete ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {orderStatusLabel(step)}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {latest ? (
        <p className="mt-4 text-sm text-muted-foreground" role="status">
          {latest.note}
        </p>
      ) : null}
    </div>
  );
}
