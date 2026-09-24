import type { Metadata } from "next";
import { books } from "@/data/books";
import { FindABookFlow } from "@/components/find-a-book/FindABookFlow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { campaign } from "@/data/campaign";

export const metadata: Metadata = {
  title: "Find Their Next Book",
  description: `Answer a few questions and get personalized recommendations from the ${campaign.season} children's and middle-grade catalog.`,
};

export default function FindABookPage() {
  return (
    <>
      <section className="border-b border-line bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Book Discovery"
            title="Find Their Next Book"
            description="A short recommendation experience for parents, teachers, and librarians. Answers are matched against our Fall 2026 catalog metadata — not random picks."
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <FindABookFlow books={books} />
        </div>
      </section>
    </>
  );
}
