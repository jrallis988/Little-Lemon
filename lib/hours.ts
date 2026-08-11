export type Weekday = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export type DaySchedule =
  | { kind: "open24" }
  | { kind: "closed" }
  | { kind: "range"; openMinutes: number; closeMinutes: number };

export type WeeklySchedule = Record<Weekday, DaySchedule>;

export type DisplayHoursRow = {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
};

const WEEKDAYS: Weekday[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export function parseClock(label: string): number {
  const normalized = label.trim().toUpperCase();
  if (normalized === "12:00 AM" || normalized === "MIDNIGHT") return 0;
  if (normalized === "12:00 PM" || normalized === "NOON") return 12 * 60;

  const match = normalized.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);
  if (!match) return 0;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const meridiem = match[3];
  if (meridiem === "AM" && hours === 12) hours = 0;
  if (meridiem === "PM" && hours !== 12) hours += 12;
  return hours * 60 + minutes;
}

export function formatMinutes(total: number): string {
  const hours24 = Math.floor(total / 60) % 24;
  const minutes = total % 60;
  const meridiem = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${meridiem}`;
}

export function weekdayFromDate(date: Date): Weekday {
  return WEEKDAYS[date.getDay()];
}

/** True if `now` falls inside today's schedule (handles overnight ranges). */
export function isOpenAt(schedule: WeeklySchedule, now = new Date()): boolean {
  const day = weekdayFromDate(now);
  const today = schedule[day];
  if (today.kind === "open24") return true;
  if (today.kind === "closed") return false;

  const minutes = now.getHours() * 60 + now.getMinutes();
  const { openMinutes, closeMinutes } = today;

  if (openMinutes === closeMinutes) return true;
  if (openMinutes < closeMinutes) {
    return minutes >= openMinutes && minutes < closeMinutes;
  }
  // Overnight (e.g. 10pm–6am)
  return minutes >= openMinutes || minutes < closeMinutes;
}

export function todaysHoursLabel(
  schedule: WeeklySchedule,
  now = new Date()
): string {
  const today = schedule[weekdayFromDate(now)];
  if (today.kind === "open24") return "Open 24 hours today";
  if (today.kind === "closed") return "Closed today";
  return `Today ${formatMinutes(today.openMinutes)} – ${formatMinutes(today.closeMinutes)}`;
}

export function toDisplayHours(schedule: WeeklySchedule): DisplayHoursRow[] {
  const mon = schedule.mon;
  const tue = schedule.tue;
  const wed = schedule.wed;
  const thu = schedule.thu;
  const sameWeekdayBlock =
    JSON.stringify(mon) === JSON.stringify(tue) &&
    JSON.stringify(tue) === JSON.stringify(wed) &&
    JSON.stringify(wed) === JSON.stringify(thu);

  const rows: DisplayHoursRow[] = [];

  const push = (day: string, slot: DaySchedule) => {
    if (slot.kind === "open24") {
      rows.push({ day, open: "24 hours", close: "" });
      return;
    }
    if (slot.kind === "closed") {
      rows.push({ day, open: "", close: "", closed: true });
      return;
    }
    rows.push({
      day,
      open: formatMinutes(slot.openMinutes),
      close: formatMinutes(slot.closeMinutes),
    });
  };

  if (sameWeekdayBlock) push("Mon–Thu", mon);
  else {
    push("Mon", mon);
    push("Tue", tue);
    push("Wed", wed);
    push("Thu", thu);
  }
  push("Fri", schedule.fri);
  push("Sat", schedule.sat);
  push("Sun", schedule.sun);
  return rows;
}

export function formatHours(row: DisplayHoursRow): string {
  if (row.closed) return "Closed";
  if (!row.close) return row.open;
  return `${row.open} – ${row.close}`;
}

/** Common PF-style weekday 24h / weekend limited template */
export function scheduleWeekday24(options: {
  friClose: number;
  satOpen: number;
  satClose: number;
  sunOpen: number;
  sunClose: number;
}): WeeklySchedule {
  return {
    sun: { kind: "range", openMinutes: options.sunOpen, closeMinutes: options.sunClose },
    mon: { kind: "open24" },
    tue: { kind: "open24" },
    wed: { kind: "open24" },
    thu: { kind: "open24" },
    fri: { kind: "range", openMinutes: 0, closeMinutes: options.friClose },
    sat: {
      kind: "range",
      openMinutes: options.satOpen,
      closeMinutes: options.satClose,
    },
  };
}

/** Open & staffed 24/7 (e.g. Planet Fitness Stratham, NH). */
export function scheduleOpen247(): WeeklySchedule {
  return {
    sun: { kind: "open24" },
    mon: { kind: "open24" },
    tue: { kind: "open24" },
    wed: { kind: "open24" },
    thu: { kind: "open24" },
    fri: { kind: "open24" },
    sat: { kind: "open24" },
  };
}
