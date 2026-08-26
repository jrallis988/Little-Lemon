import type { BusinessSnapshot, ThomasNotice } from "./types";

/** Demo notices for Business Home — Know → Notice → Act */
export const BUSINESS_NOTICES: ThomasNotice[] = [
  {
    id: "n1",
    title: "House Porter is moving faster than usual",
    detail:
      "Selling about 22% above its normal weekly rate. You may run short before Saturday service.",
    severity: "watch",
    actions: [
      { label: "Prepare order", target: "home" },
      { label: "Ask Thomas", target: "chat" },
    ],
  },
  {
    id: "n2",
    title: "Three inventory discrepancies need review",
    detail:
      "Session IPA, Bright Pilsner, and Cabernet are still flagged from today’s cellar checks.",
    severity: "urgent",
    actions: [
      { label: "Review count", target: "inventory" },
      { label: "Check history", target: "audit" },
    ],
  },
  {
    id: "n3",
    title: "REG-01 has closed short three times this week",
    detail:
      "Modest shortfalls, but the pattern is worth a quiet look before tonight’s close.",
    severity: "watch",
    actions: [
      { label: "Check history", target: "audit" },
      { label: "Ask Thomas", target: "chat" },
    ],
  },
  {
    id: "n4",
    title: "Cabernet inventory may run low before Saturday",
    detail:
      "Weekend reservations and recent pours suggest you’ll want another case on the floor.",
    severity: "watch",
    actions: [
      { label: "Prepare order", target: "home" },
      { label: "Ask Thomas", target: "chat" },
    ],
  },
  {
    id: "n5",
    title: "Two products have not moved in 30 days",
    detail:
      "Bright Pilsner and a spare vermouth lot are sitting quiet — consider a special or return.",
    severity: "info",
    actions: [
      { label: "Check history", target: "audit" },
      { label: "Ask Thomas", target: "chat" },
    ],
  },
];

export const BUSINESS_SNAPSHOT: BusinessSnapshot = {
  inventoryExact: 12,
  inventoryMinor: 3,
  inventoryAttention: 3,
  tonightClose: "Not closed yet",
  recentDiscrepancies: 3,
  runningLow: 4,
};

export const BUSINESS_SUGGESTED_ACTIONS = [
  { label: "Review flagged counts", target: "inventory" as const },
  { label: "Start tonight’s close", target: "shift" as const },
  { label: "Ask Thomas about the house", target: "chat" as const },
];
