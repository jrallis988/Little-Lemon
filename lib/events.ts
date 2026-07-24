export type NhRegion =
  | "Rockingham"
  | "Hillsborough"
  | "Grafton"
  | "Merrimack"
  | "Strafford"
  | "Carroll"
  | "Belknap"
  | "Cheshire"
  | "Sullivan"
  | "Coos";

export type CampaignEvent = {
  id: string;
  title: string;
  type: "Town Hall" | "Meet & Greet" | "Diner Stop" | "Canvass Kickoff";
  date: string; // ISO date YYYY-MM-DD
  time: string;
  endTime: string;
  location: string;
  city: string;
  region: NhRegion;
  description: string;
};

export const events: CampaignEvent[] = [
  {
    id: "exeter-town-hall",
    title: "Exeter Town Hall Listening Session",
    type: "Town Hall",
    date: "2026-08-12",
    time: "18:30",
    endTime: "20:00",
    location: "Exeter Town Hall",
    city: "Exeter",
    region: "Rockingham",
    description:
      "Open Q&A on cost of living, small business, and protecting the Seacoast.",
  },
  {
    id: "manchester-diner",
    title: "Breakfast at Red Arrow Diner",
    type: "Diner Stop",
    date: "2026-08-15",
    time: "08:00",
    endTime: "09:30",
    location: "Red Arrow Diner",
    city: "Manchester",
    region: "Hillsborough",
    description:
      "Grab coffee, share what’s on your mind, and meet neighbors from across the city.",
  },
  {
    id: "hanover-meet",
    title: "Upper Valley Meet & Greet",
    type: "Meet & Greet",
    date: "2026-08-19",
    time: "17:00",
    endTime: "18:30",
    location: "Lou’s Restaurant & Bakery",
    city: "Hanover",
    region: "Grafton",
    description:
      "Conversation on rural broadband, public lands, and keeping young people in NH.",
  },
  {
    id: "concord-canvass",
    title: "Capitol Corridor Canvass Kickoff",
    type: "Canvass Kickoff",
    date: "2026-08-22",
    time: "10:00",
    endTime: "13:00",
    location: "Campaign HQ — Main Street",
    city: "Concord",
    region: "Merrimack",
    description:
      "Training, lawn signs, and door-to-door routes for volunteers of all experience levels.",
  },
  {
    id: "dover-town-hall",
    title: "Dover Community Town Hall",
    type: "Town Hall",
    date: "2026-08-26",
    time: "19:00",
    endTime: "20:30",
    location: "Dover City Hall Auditorium",
    city: "Dover",
    region: "Strafford",
    description:
      "A focused evening on education, workforce, and Main Street retail.",
  },
  {
    id: "north-conway-meet",
    title: "Mount Washington Valley Gathering",
    type: "Meet & Greet",
    date: "2026-09-02",
    time: "16:00",
    endTime: "17:30",
    location: "Schouler Park Pavilion",
    city: "North Conway",
    region: "Carroll",
    description:
      "Tourism jobs, conservation, and year-round housing for mountain communities.",
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

export function buildGoogleCalendarUrl(event: CampaignEvent): string {
  const start = `${event.date.replace(/-/g, "")}T${event.time.replace(":", "")}00`;
  const end = `${event.date.replace(/-/g, "")}T${event.endTime.replace(":", "")}00`;
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

export function buildIcsDataUri(event: CampaignEvent): string {
  const dtStart = `${event.date.replace(/-/g, "")}T${event.time.replace(":", "")}00`;
  const dtEnd = `${event.date.replace(/-/g, "")}T${event.endTime.replace(":", "")}00`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Varga for Senate//EN",
    "BEGIN:VEVENT",
    `UID:${event.id}@vargaforsenate.nh`,
    `DTSTART;TZID=America/New_York:${dtStart}`,
    `DTEND;TZID=America/New_York:${dtEnd}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location}\\, ${event.city}\\, NH`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
