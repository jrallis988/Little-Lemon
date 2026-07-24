export type PressItem = {
  id: string;
  outlet: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
};

export const pressItems: PressItem[] = [
  {
    id: "concord-monitor",
    outlet: "Concord Monitor",
    date: "2026-07-08",
    title: "Hale opens Concord HQ with focus on housing and heat bills",
    excerpt:
      "The Concord native framed the race around affordability, promising town halls in all ten counties before Labor Day.",
    href: "#press",
  },
  {
    id: "union-leader",
    outlet: "New Hampshire Union Leader",
    date: "2026-06-22",
    title: "Independent voters eye Hale’s Main Street pitch",
    excerpt:
      "A hardware-store upbringing and operations background are central to Hale’s appeal with undecided Granite Staters.",
    href: "#press",
  },
  {
    id: "nhpr",
    outlet: "NHPR",
    date: "2026-06-04",
    title: "On the trail: Hale talks public lands and local schools in the North Country",
    excerpt:
      "From Berlin to Littleton, Hale tied conservation access to rural jobs and kept the focus on constituent service.",
    href: "#press",
  },
];

export function formatPressDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
