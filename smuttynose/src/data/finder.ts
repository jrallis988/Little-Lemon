export type RetailHit = {
  name: string;
  type: "Package store" | "Bar" | "Restaurant" | "Grocery";
  city: string;
  state: string;
  miles: number;
  address: string;
};

/** Demo distribution hits for common Seacoast ZIP lookups */
export const finderDemo: Record<string, RetailHit[]> = {
  "03842": [
    {
      name: "Smuttynose Towle Farm",
      type: "Restaurant",
      city: "Hampton",
      state: "NH",
      miles: 0.2,
      address: "105 Towle Farm Road",
    },
    {
      name: "Hampton Beach Package",
      type: "Package store",
      city: "Hampton",
      state: "NH",
      miles: 3.1,
      address: "Ocean Blvd area",
    },
    {
      name: "The Goat",
      type: "Bar",
      city: "Hampton",
      state: "NH",
      miles: 4.4,
      address: "Ashworth Ave",
    },
  ],
  "03801": [
    {
      name: "Portsmouth Brewery vicinity accounts",
      type: "Bar",
      city: "Portsmouth",
      state: "NH",
      miles: 12.0,
      address: "Downtown Portsmouth",
    },
    {
      name: "State Liquor & Wine Outlet",
      type: "Package store",
      city: "Portsmouth",
      state: "NH",
      miles: 11.2,
      address: "Traffic Circle area",
    },
    {
      name: "The Press Room",
      type: "Restaurant",
      city: "Portsmouth",
      state: "NH",
      miles: 12.4,
      address: "Congress St",
    },
  ],
  default: [
    {
      name: "New Hampshire Liquor & Wine Outlet",
      type: "Package store",
      city: "Seacoast region",
      state: "NH",
      miles: 8.5,
      address: "Multiple locations",
    },
    {
      name: "Independent package stores",
      type: "Package store",
      city: "Greater Boston / Seacoast",
      state: "NH/MA",
      miles: 15,
      address: "Ask for Finestkind & classics",
    },
    {
      name: "Craft-friendly pubs",
      type: "Bar",
      city: "Regional",
      state: "NH/ME/MA",
      miles: 18,
      address: "Rotating draft accounts",
    },
  ],
};

export function lookupRetail(query: string): RetailHit[] {
  const cleaned = query.trim().toLowerCase();
  if (!cleaned) return [];

  const zip = cleaned.replace(/\D/g, "").slice(0, 5);
  if (zip && finderDemo[zip]) return finderDemo[zip];

  if (cleaned.includes("hampton") || cleaned.includes("03842")) {
    return finderDemo["03842"];
  }
  if (cleaned.includes("portsmouth") || cleaned.includes("03801")) {
    return finderDemo["03801"];
  }
  return finderDemo.default;
}
