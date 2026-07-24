import { formatDistanceToNow, format, parseISO, isValid } from "date-fns";

export function formatRelative(iso: string): string {
  try {
    const date = parseISO(iso);
    if (!isValid(date)) return "";
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return "";
  }
}

export function formatDateTime(iso: string): string {
  try {
    const date = parseISO(iso);
    if (!isValid(date)) return "";
    return format(date, "MMM d, yyyy · h:mm a");
  } catch {
    return "";
  }
}

export function formatDate(iso: string): string {
  try {
    const date = parseISO(iso);
    if (!isValid(date)) return "";
    return format(date, "MMMM d, yyyy");
  } catch {
    return "";
  }
}

export function formatShortDate(iso: string): string {
  try {
    const date = parseISO(iso);
    if (!isValid(date)) return "";
    return format(date, "MMM d");
  } catch {
    return "";
  }
}
