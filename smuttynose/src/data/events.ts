export type EventItem = {
  title: string;
  dayOffset: number; // 0 = Sunday ... 6 = Saturday within current week
  time: string;
  where: string;
  detail: string;
};

/** Recurring weekly campus happenings — resolved to this week's dates in the UI */
export const weeklyEvents: EventItem[] = [
  {
    title: "Trivia Night",
    dayOffset: 3, // Wednesday
    time: "6:00–8:30 PM",
    where: "Restaurant",
    detail: "Trivia with DJ Koko. First come, first serve seating.",
  },
  {
    title: "Live Music on the Patio",
    dayOffset: 4, // Thursday
    time: "Afternoon–evening",
    where: "Patio / Backyard",
    detail:
      "Live sets when scheduled — check Campus Events or Facebook for this week’s lineup.",
  },
  {
    title: "Backyard Club",
    dayOffset: 5, // Friday
    time: "Noon–8 PM",
    where: "The Backyard",
    detail: "Cold pours, patio hangs, and rotating live music.",
  },
  {
    title: "Food Truck Friday",
    dayOffset: 5,
    time: "Noon–7 PM",
    where: "Campus",
    detail: "Rotating local trucks — check Facebook for this week’s vendor.",
  },
  {
    title: "Weekend Backyard",
    dayOffset: 6, // Saturday
    time: "Noon–8 PM",
    where: "The Backyard",
    detail: "All-day patio energy. Dogs welcome. Live sets when scheduled.",
  },
  {
    title: "Sunday Sessions",
    dayOffset: 0, // Sunday
    time: "11 AM–7 PM",
    where: "The Backyard",
    detail: "Sunday hours open at 11 AM. Easy pours and family-friendly hangs.",
  },
];

export function startOfWeek(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day);
  return d;
}

export function dateForWeekday(dayOffset: number, from = new Date()) {
  const start = startOfWeek(from);
  const d = new Date(start);
  d.setDate(start.getDate() + dayOffset);
  return d;
}

export function formatEventDay(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function thisWeekLabel(from = new Date()) {
  const start = startOfWeek(from);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${start.toLocaleDateString("en-US", opts)} – ${end.toLocaleDateString("en-US", opts)}`;
}
