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

/** Sample calendar for this case study (not a live tour). */
export const events: CampaignEvent[] = [
  {
    id: "portsmouth-town-hall",
    title: "Portsmouth Town Hall",
    type: "Town Hall",
    date: "2026-10-12",
    time: "18:00",
    location: "City Hall Atrium",
    city: "Portsmouth",
    region: "Seacoast",
    description:
      "Write-in how-to, Q&A on costs and term limits, and a chance to meet Team Varga.",
  },
  {
    id: "concord-kitchen-table",
    title: "Concord Kitchen-Table Conversation",
    type: "Meet & Greet",
    date: "2026-10-18",
    time: "11:00",
    location: "West Street Ward House",
    city: "Concord",
    region: "Capital",
    description:
      "Small-group conversation on veterans, healthcare costs, and independent representation.",
  },
  {
    id: "manchester-canvass-kickoff",
    title: "Manchester Canvass Kickoff",
    type: "Volunteer",
    date: "2026-10-25",
    time: "09:00",
    location: "Victory Park",
    city: "Manchester",
    region: "Hillsborough",
    description:
      "Neighborhood walks, literature, and a brief training on the November 3 write-in.",
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
