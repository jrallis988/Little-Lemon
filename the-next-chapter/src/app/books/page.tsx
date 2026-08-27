import type { Metadata } from "next";
import { books } from "@/data/books";
import { BookCatalog } from "@/components/books/BookCatalog";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { campaign } from "@/data/campaign";

export const metadata: Metadata = {
  title: "Fall Books",
  description: `Browse the complete ${campaign.season} children's and middle-grade catalog. Filter by age, genre, interest, and reading level.`,
};

export default function BooksPage() {
  return (
    <>
      <section className="border-b border-line bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow={campaign.season}
            title="Fall Books"
            description="Eight new releases for readers ages 7–14. Browse the complete catalog or use filters to find the right story."
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <BookCatalog books={books} />
      </section>
    </>
  );
}
