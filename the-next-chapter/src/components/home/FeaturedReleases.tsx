import type { Book } from "@/types/book";
import { BookCard } from "@/components/books/BookCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

interface FeaturedReleasesProps {
  books: Book[];
}

export function FeaturedReleases({ books }: FeaturedReleasesProps) {
  const [lead, ...rest] = books.slice(0, 4);

  return (
    <section className="py-16 md:py-24" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Fall 2026"
            title="Featured Fall Releases"
            description="New stories arriving September through November — handpicked from our seasonal catalog."
          />
          <Button href="/books" variant="ghost" size="sm">
            View All Books
          </Button>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {lead && (
            <div className="border-b border-line pb-12 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12">
              <BookCard book={lead} variant="featured" />
            </div>
          )}

          <ul className="grid gap-8 sm:grid-cols-2">
            {rest.map((book) => (
              <li key={book.slug}>
                <BookCard book={book} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
