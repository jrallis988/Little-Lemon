import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { books, getBookBySlug, getRelatedBooks } from "@/data/books";
import { BookCover } from "@/components/books/BookCover";
import { BookCard } from "@/components/books/BookCard";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return { title: "Book Not Found" };

  return {
    title: book.title,
    description: book.hook,
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const relatedBooks = getRelatedBooks(book);

  return (
    <>
      {/* Hero / Title Block */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-ink-muted">
              <li>
                <Link href="/books" className="hover:text-burgundy">
                  Fall Books
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink">{book.title}</li>
            </ol>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            <BookCover
              title={book.title}
              author={book.author.name}
              cover={book.cover}
              size="xl"
            />

            <div>
              <Tag variant="burgundy">{book.genre}</Tag>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-ink md:text-5xl lg:text-6xl">
                {book.title}
              </h1>
              <p className="mt-3 font-accent text-xl text-ink-muted md:text-2xl">
                by {book.author.name}
              </p>

              <p className="mt-6 max-w-2xl font-accent text-lg italic leading-relaxed text-burgundy md:text-xl">
                {book.hook}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-line pt-8 sm:grid-cols-3">
                <div>
                  <dt className="font-display text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">
                    Ages
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{book.ageRange}</dd>
                </div>
                <div>
                  <dt className="font-display text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">
                    Grades
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{book.gradeRange}</dd>
                </div>
                <div>
                  <dt className="font-display text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">
                    Pages
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{book.pageCount}</dd>
                </div>
                <div>
                  <dt className="font-display text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">
                    Publication
                  </dt>
                  <dd className="mt-1 text-sm font-medium">
                    {book.publicationDate}
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">
                    Reading Level
                  </dt>
                  <dd className="mt-1 text-sm font-medium">
                    {book.readingLevelLabel}
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">
                    ISBN
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{book.isbn}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <dt className="font-display text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">
                  Available Formats
                </dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {book.formats.map((format) => (
                    <Tag key={format}>{format}</Tag>
                  ))}
                </dd>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="#" variant="primary" size="lg">
                  Find at a Bookstore
                </Button>
                <Button href="#" variant="outline" size="lg">
                  Request at Your Library
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Synopsis */}
      <section className="py-12 md:py-16" aria-labelledby="synopsis-heading">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mx-auto max-w-3xl">
            <h2
              id="synopsis-heading"
              className="font-display text-xs font-bold uppercase tracking-[0.2em] text-burgundy"
            >
              About the Book
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-muted md:text-lg md:leading-relaxed">
              {book.synopsis}
            </p>
          </div>
        </div>
      </section>

      {/* Excerpt */}
      <section
        className="border-y border-line bg-cream-dark py-12 md:py-16"
        aria-labelledby="excerpt-heading"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mx-auto max-w-3xl">
            <h2
              id="excerpt-heading"
              className="font-display text-xs font-bold uppercase tracking-[0.2em] text-burgundy"
            >
              Read an Excerpt
            </h2>
            <div className="mt-6 whitespace-pre-line border-l-2 border-amber pl-6 text-base leading-relaxed text-ink md:text-lg md:leading-relaxed">
              {book.excerpt}
            </div>
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="py-12 md:py-16" aria-labelledby="themes-heading">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mx-auto max-w-3xl">
            <h2
              id="themes-heading"
              className="font-display text-xs font-bold uppercase tracking-[0.2em] text-burgundy"
            >
              Themes & Interests
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {book.themes.map((theme) => (
                <Tag key={theme} variant="forest">
                  {theme}
                </Tag>
              ))}
              {book.interests.map((interest) => (
                <Tag key={interest} variant="amber">
                  {interest}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Author */}
      <section
        className="border-t border-line bg-paper py-12 md:py-16"
        aria-labelledby="author-heading"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mx-auto max-w-3xl">
            <h2
              id="author-heading"
              className="font-display text-xs font-bold uppercase tracking-[0.2em] text-burgundy"
            >
              About the Author
            </h2>
            <h3 className="mt-4 font-display text-2xl font-bold text-ink">
              {book.author.name}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {book.author.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Educator Resources */}
      {book.educatorResources.length > 0 && (
        <section
          className="border-t border-line py-12 md:py-16"
          aria-labelledby="resources-heading"
        >
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHeader
              eyebrow="For Educators"
              title="Educator Resources"
              description="Download guides, activities, and discussion materials for classroom and library use."
            />

            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {book.educatorResources.map((resource) => (
                <li
                  key={resource.title}
                  className="border border-line bg-paper p-6"
                >
                  <Tag variant="forest">{resource.type}</Tag>
                  <h3 className="mt-3 font-display text-base font-bold text-ink">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {resource.description}
                  </p>
                  <button
                    type="button"
                    className="mt-4 font-display text-xs font-bold uppercase tracking-wider text-burgundy underline-offset-2 hover:underline"
                  >
                    Download PDF
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button href="/educators" variant="ghost" size="sm">
                View All Educator Resources
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <section
          className="border-t border-line bg-cream-dark py-12 md:py-16"
          aria-labelledby="related-heading"
        >
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHeader
              eyebrow="Keep Reading"
              title="Related Books"
              description="More stories from the Fall 2026 collection you might enjoy."
            />

            <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3">
              {relatedBooks.map((related) => (
                <li key={related.slug}>
                  <BookCard book={related} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
