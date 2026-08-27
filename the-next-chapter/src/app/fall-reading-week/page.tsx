import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Fall Reading Week",
  description: "October 12–18, 2026 — A week-long celebration connecting schools, libraries, bookstores, and families.",
};

export default function FallReadingWeekPage() {
  return (
    <ComingSoonPage
      title="Fall Reading Week"
      description="October 12–18, 2026. The full event landing page with daily activities, resources, and participating locations is coming in the next development phase."
    />
  );
}
