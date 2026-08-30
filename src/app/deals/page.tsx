import type { Metadata } from "next";

import { WeeklyAdBoard } from "@/components/deals/weekly-ad-board";

export const metadata: Metadata = {
  title: "Weekly deals",
  description:
    "This week’s circular, BOGOs, and clipable coupon wallet at Walgreens RX.",
};

export default function DealsPage() {
  return <WeeklyAdBoard />;
}
