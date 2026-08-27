import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Find a Book",
  description: "Answer a few questions and we'll recommend stories from our Fall 2026 catalog.",
};

export default function FindABookPage() {
  return (
    <ComingSoonPage
      title="Find Their Next Book"
      description="Our personalized recommendation experience is coming in the next development phase. Browse the Fall Books catalog in the meantime."
    />
  );
}
