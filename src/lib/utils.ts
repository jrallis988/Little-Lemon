import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours <= 0) return `${minutes} min`;
  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}

export function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function extractDomain(rawUrl: string): string {
  try {
    const url = new URL(rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return rawUrl.replace(/^https?:\/\//, "").split("/")[0] ?? rawUrl;
  }
}

export function createId(prefix = "id"): string {
  return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
}

export function todayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}
