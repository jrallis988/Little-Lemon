import Link from "next/link";
import type { NewsletterModule } from "@/data/newsletters";
import { getBookBySlug } from "@/data/books";
import { BookCover } from "@/components/books/BookCover";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";

const typeLabels: Record<NewsletterModule["type"], string> = {
  featured: "Featured Release",
  "new-books": "New Books",
  author: "Author Spotlight",
  "editors-pick": "Editor's Pick",
  activity: "Reading Activity",
  upcoming: "Upcoming",
  "fall-reading-week": "Fall Reading Week",
  cta: "Take Action",
};

export function NewsletterModuleBlock({ module }: { module: NewsletterModule }) {
  const book = module.bookSlug ? getBookBySlug(module.bookSlug) : undefined;
  const isAccent =
    module.type === "featured" ||
    module.type === "fall-reading-week" ||
    module.type === "cta";

  return (
    <section
      className={`border-b border-line px-6 py-8 md:px-10 md:py-10 ${
        isAccent ? "bg-cream-dark" : "bg-paper"
      }`}
      aria-labelledby={`module-${module.type}-${module.title}`}
    >
      <Tag variant={isAccent ? "burgundy" : "default"}>
        {typeLabels[module.type]}
      </Tag>
      <h2
        id={`module-${module.type}-${module.title}`}
        className="mt-3 font-display text-xl font-bold text-ink md:text-2xl"
      >
        {module.title}
      </h2>

      {book && (module.type === "featured" || module.type === "author") ? (
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
          <Link href={`/books/${book.slug}`} className="shrink-0">
            <BookCover
              title={book.title}
              author={book.author.name}
              cover={book.cover}
              size="sm"
            />
          </Link>
          <div>
            <p className="font-display text-base font-bold text-ink">
              {book.title}
            </p>
            <p className="mt-0.5 text-sm text-ink-muted">
              by {book.author.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {module.body}
            </p>
            {module.ctaHref && module.ctaLabel && (
              <Button
                href={module.ctaHref}
                variant="ghost"
                size="sm"
                className="mt-4"
              >
                {module.ctaLabel}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
            {module.body}
          </p>
          {module.ctaHref && module.ctaLabel && (
            <Button
              href={module.ctaHref}
              variant={module.type === "cta" ? "primary" : "ghost"}
              size="sm"
              className="mt-4"
            >
              {module.ctaLabel}
            </Button>
          )}
        </>
      )}
    </section>
  );
}
