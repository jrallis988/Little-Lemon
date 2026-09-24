import type { Metadata } from "next";
import { books } from "@/data/books";
import { BookCatalog } from "@/components/books/BookCatalog";
import { BookCover } from "@/components/books/BookCover";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { campaign } from "@/data/campaign";

export const metadata: Metadata = {
  title: "Fall Books",
  description: `Browse the complete ${campaign.season} children's and middle-grade catalog. Filter by age, genre, interest, and reading level.`,
};

export default function BooksPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-forest text-cream">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
        >
          <div className="absolute -right-4 top-6 flex gap-3 opacity-80 md:right-8">
            {books.slice(0, 4).map((book, i) => (
              <div
                key={book.slug}
                className="hidden sm:block"
                style={{
                  transform: `rotate(${(i - 1.5) * 4}deg) translateY(${i % 2 ? 8 : 0}px)`,
                }}
              >
                <BookCover
                  title={book.title}
                  author={book.author.name}
                  cover={book.cover}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <SectionHeader
            eyebrow={campaign.season}
            title="Fall Books"
            description="Eight new releases for readers ages 7–14. Browse the complete catalog or use filters to find the right story."
            dark
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <BookCatalog books={books} />
      </section>
    </>
  );
}
