export type Venue = {
  id: string;
  name: string;
  capacity: string;
  setting: string;
  bestFor: string[];
  note: string;
  image: string;
};

export const venues: Venue[] = [
  {
    id: "heritage-room",
    name: "Heritage Room",
    capacity: "Up to 30 guests",
    setting: "Indoor",
    bestFor: ["Rehearsal dinners", "Team dinners", "Birthday toasts"],
    note: "Intimate indoor space with campus character — ideal for seated gatherings and private pours.",
    image: "campus-entrance",
  },
  {
    id: "the-field",
    name: "The Field",
    capacity: "Up to 200 guests",
    setting: "Outdoor · tented",
    bestFor: ["Weddings", "Corporate outings", "Large celebrations"],
    note: "Open lawn energy with tented coverage options — string lights, trucks, and room to roam.",
    image: "campus-day",
  },
  {
    id: "backyard-patio",
    name: "Backyard Patio",
    capacity: "Up to 80 guests",
    setting: "Outdoor",
    bestFor: ["Happy hours", "Alumni nights", "Casual receptions"],
    note: "Patio tables, heaters in season, and easy access to the taps.",
    image: "campus-patio",
  },
];
