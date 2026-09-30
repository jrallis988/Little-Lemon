import type { Interpretation, Visit } from "./types";
import type { CheckinRecord } from "./types";

const TIME_ZONE = "America/New_York";

function clean(value: string): string {
  return value.replace(/[\u202f\u00a0]/g, " ");
}

const weekdayDate = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  timeZone: TIME_ZONE,
});

const clockTime = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: TIME_ZONE,
});

const calendarDay = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: TIME_ZONE,
});

const hourOnly = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  hourCycle: "h23",
  timeZone: TIME_ZONE,
});

export function greeting(now = new Date()): string {
  const hour = Number(hourOnly.format(now));
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function ageLabel(birthDate: string, now = new Date()): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthDate);
  if (!match) return "";
  const birthYear = Number(match[1]);
  const birthMonth = Number(match[2]);
  const birthDay = Number(match[3]);
  let years = now.getUTCFullYear() - birthYear;
  let months = now.getUTCMonth() + 1 - birthMonth;
  const days = now.getUTCDate() - birthDay;
  if (days < 0) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  if (years < 0) return "Not yet born";
  if (years === 0 && months === 0) return "Less than a month";
  if (years === 0) return months === 1 ? "1 month" : `${months} months`;
  const yearLabel = years === 1 ? "1 year" : `${years} years`;
  if (months <= 0) return yearLabel;
  const monthLabel = months === 1 ? "1 month" : `${months} months`;
  return `${yearLabel}, ${monthLabel}`;
}

export function formatWhen(iso: string): string {
  const date = new Date(iso);
  return clean(`${weekdayDate.format(date)} · ${clockTime.format(date)}`);
}

export function formatDay(iso: string): string {
  const date = new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso);
  return clean(calendarDay.format(date));
}

export function formatMoney(cents: number): string {
  return clean(
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100),
  );
}

export function formatMeasure(value: number, unit: string): string {
  const rounded = Math.round(value * 10) / 10;
  return `${rounded} ${unit}`;
}

export function ordinal(value: number): string {
  const rounded = Math.round(value);
  const mod100 = rounded % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${rounded}th`;
  switch (rounded % 10) {
    case 1:
      return `${rounded}st`;
    case 2:
      return `${rounded}nd`;
    case 3:
      return `${rounded}rd`;
    default:
      return `${rounded}th`;
  }
}

export function interpretationLabel(value: Interpretation | undefined): string | null {
  switch (value) {
    case "high":
      return "High";
    case "low":
      return "Low";
    case "critical":
      return "Critical";
    case "abnormal":
      return "Abnormal";
    case "normal":
      return "Normal";
    default:
      return null;
  }
}

export function needsReview(value: Interpretation | undefined): boolean {
  return value === "high" || value === "low" || value === "critical" || value === "abnormal";
}

export type CheckinAvailability = "done" | "open" | "closed" | "unavailable";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function echeckinState(
  visit: Visit,
  completed: CheckinRecord | undefined,
  now = new Date(),
): CheckinAvailability {
  if (completed) return "done";
  if (visit.status !== "booked") return "unavailable";
  const start = new Date(visit.start).getTime();
  const current = now.getTime();
  if (Number.isNaN(start) || start < current) return "unavailable";
  if (start - current <= WEEK_MS) return "open";
  return "closed";
}

export function hostOf(iss: string): string {
  try {
    return new URL(iss).host;
  } catch {
    return iss;
  }
}

export function oneParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}
