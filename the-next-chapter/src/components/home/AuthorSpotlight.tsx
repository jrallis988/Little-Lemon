import type { Book } from "@/types/book";
import { BookCover } from "@/components/books/BookCover";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";

interface AuthorSpotlightProps {
  book: Book;
}

export function AuthorSpotlight({ book }: AuthorSpotlightProps) {
  return (
    <section
      className="border-t border-line bg-cream-dark py-16 md:py-24"
      aria-labelledby="author-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-burgundy">
          Author Spotlight
        </p>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <BookCover
            title={book.title}
            author={book.author.name}
            cover={book.cover}
            size="lg"
          />

          <div>
            <Tag variant="forest">{book.genre}</Tag>
            <h2
              id="author-heading"
              className="mt-4 font-display text-3xl font-bold text-ink md:text-4xl"
            >
              {book.author.name}
            </h2>
            <p className="mt-1 font-accent text-lg text-burgundy">
              Author of <em>{book.title}</em>
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted">
              {book.author.bio}
            </p>
            <blockquote className="mt-8 border-l-2 border-amber pl-6">
              <p className="font-accent text-lg italic leading-relaxed text-ink">
                &ldquo;{book.hook}&rdquo;
              </p>
            </blockquote>
            <Button
              href={`/books/${book.slug}`}
              variant="ghost"
              size="sm"
              className="mt-8"
            >
              Read About the Book
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
