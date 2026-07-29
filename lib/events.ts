export type CampaignEvent = {
  id: string;
  title: string;
  type: string;
  date: string | null;
  time?: string;
  location: string;
  city: string;
  region: string;
  description: string;
  tba?: boolean;
};

export const events: CampaignEvent[] = [
  {
    id: "tba-town-hall",
    title: "Town Hall",
    type: "Town Hall",
    date: null,
    location: "Location TBA",
    city: "TBA",
    region: "Statewide",
    description: "Date TBD · 2026 — Details on social & email.",
    tba: true,
  },
  {
    id: "more-soon",
    title: "More stops coming soon",
    type: "Meet & Greet",
    date: null,
    location: "Across New Hampshire",
    city: "Statewide",
    region: "Statewide",
    description: "Nick is planning stops in all ten counties. Check back or join the email list.",
    tba: true,
  },
];

export function formatEventDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function buildGoogleCalendarUrl(event: CampaignEvent): string | null {
  if (!event.date || !event.time) return null;
  const start = `${event.date.replace(/-/g, "")}T${event.time.replace(":", "")}00`;
  const endHour = String(Number(event.time.slice(0, 2)) + 1).padStart(2, "0");
  const end = `${event.date.replace(/-/g, "")}T${endHour}${event.time.slice(2)}00`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: `${event.location}, ${event.city}, NH`,
    ctz: "America/New_York",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
