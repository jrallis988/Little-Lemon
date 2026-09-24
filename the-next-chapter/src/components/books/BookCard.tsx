import Link from "next/link";
import type { Book } from "@/types/book";
import { BookCover } from "./BookCover";
import { Tag } from "@/components/ui/Tag";

interface BookCardProps {
  book: Book;
  variant?: "default" | "featured" | "compact";
}

export function BookCard({ book, variant = "default" }: BookCardProps) {
  if (variant === "featured") {
    return (
      <article className="group">
        <Link href={`/books/${book.slug}`} className="block">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
            <div className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1">
              <BookCover
                title={book.title}
                author={book.author.name}
                cover={book.cover}
                size="lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <Tag variant="burgundy">{book.genre}</Tag>
              <h3 className="mt-3 font-display text-xl font-bold leading-snug text-ink transition-colors group-hover:text-burgundy md:text-2xl">
                {book.title}
              </h3>
              <p className="mt-1 font-accent text-sm text-ink-muted">
                by {book.author.name}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                {book.hook}
              </p>
              <p className="mt-4 font-display text-xs font-bold uppercase tracking-wider text-burgundy">
                Ages {book.ageRange} · {book.publicationDate}
              </p>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group">
        <Link href={`/books/${book.slug}`} className="flex gap-4">
          <BookCover
            title={book.title}
            author={book.author.name}
            cover={book.cover}
            size="sm"
          />
          <div>
            <h3 className="font-display text-sm font-bold leading-snug text-ink transition-colors group-hover:text-burgundy">
              {book.title}
            </h3>
            <p className="mt-0.5 text-xs text-ink-muted">{book.author.name}</p>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group">
      <Link href={`/books/${book.slug}`} className="block">
        <div className="transition-transform duration-300 group-hover:-translate-y-1">
          <BookCover
            title={book.title}
            author={book.author.name}
            cover={book.cover}
            size="md"
          />
        </div>
        <div className="mt-4">
          <Tag>{book.genre}</Tag>
          <h3 className="mt-2 font-display text-base font-bold leading-snug text-ink transition-colors group-hover:text-burgundy">
            {book.title}
          </h3>
          <p className="mt-1 text-sm text-ink-muted">{book.author.name}</p>
          <p className="mt-2 font-display text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted/70">
            Ages {book.ageRange}
          </p>
        </div>
      </Link>
    </article>
  );
}
