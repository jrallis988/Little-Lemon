export type EventItem = {
  title: string;
  when: string;
  where: string;
  detail: string;
};

export const events: EventItem[] = [
  {
    title: "Trivia Night",
    when: "Weekly · 6:00–8:30 PM",
    where: "Restaurant",
    detail: "Trivia with DJ Koko. First come, first serve seating.",
  },
  {
    title: "Backyard Club",
    when: "Fri–Sun · Noon–8 PM",
    where: "The Backyard",
    detail: "Cold pours, patio hangs, and rotating live music all season.",
  },
  {
    title: "Food Truck Lineup",
    when: "Rotating weekly",
    where: "Campus",
    detail: "Local trucks keep the menu fresh — check Facebook for this week’s schedule.",
  },
  {
    title: "Members-Only Parties",
    when: "Annual",
    where: "Towle Farm",
    detail: "Suds Club exclusive invites for release parties and member nights.",
  },
];
