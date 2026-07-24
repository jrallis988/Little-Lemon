import type { PrescriptionStatus, SearchIntent } from "@/lib/types";

export const PRESCRIPTION_STATUS_ORDER: PrescriptionStatus[] = [
  "received",
  "filling",
  "ready",
];

export const PRESCRIPTION_STATUS_LABEL: Record<PrescriptionStatus, string> = {
  received: "Received",
  filling: "Filling",
  ready: "Ready",
  picked_up: "Picked up",
};

export const SEARCH_INTENT_LABEL: Record<SearchIntent, string> = {
  clinical: "Clinical service",
  pharmacy: "Pharmacy",
  retail: "Shop",
  general: "Search",
};

export const SEARCH_INTENT_DESCRIPTION: Record<SearchIntent, string> = {
  clinical: "Vaccines, testing, and appointments",
  pharmacy: "Refills, transfers, and Rx tracking",
  retail: "Health, beauty, and essentials",
  general: "Browse all results",
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatPoints(points: number): string {
  return new Intl.NumberFormat("en-US").format(points);
}

export function getStatusProgress(status: PrescriptionStatus): number {
  switch (status) {
    case "received":
      return 33;
    case "filling":
      return 66;
    case "ready":
    case "picked_up":
      return 100;
    default:
      return 0;
  }
}
