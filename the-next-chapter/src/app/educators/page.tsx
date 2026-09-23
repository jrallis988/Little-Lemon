import type { Metadata } from "next";
import Link from "next/link";
import { books, getBookBySlug } from "@/data/books";
import { educatorHub } from "@/data/educators";
import { ResourceDownload } from "@/components/resources/ResourceDownload";
import { BookCard } from "@/components/books/BookCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { campaign } from "@/data/campaign";

export const metadata: Metadata = {
  title: "Educators & Librarians",
  description:
    "Reading guides, classroom activities, discussion questions, and printable materials for the Fall 2026 collection.",
};

export default function EducatorsPage() {
  const frwResources = educatorHub.resources.filter(
    (r) => r.relatedToFallReadingWeek
  );
  const bookResources = educatorHub.resources.filter(
    (r) => r.bookSlug && !r.relatedToFallReadingWeek
  );
  const generalResources = educatorHub.resources.filter(
    (r) => !r.bookSlug && !r.relatedToFallReadingWeek
  );

  return (
    <>
      <section className="border-b border-line bg-forest text-cream">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-amber">
            Resource Hub
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            For Educators &amp; Librarians
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg">
            {educatorHub.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              href="/fall-reading-week"
              variant="outline"
              size="md"
              className="border-cream text-cream hover:bg-cream hover:text-forest"
            >
              Fall Reading Week
            </Button>
            <Button href="/books" variant="primary" size="md">
              Browse Fall Books
            </Button>
          </div>
        </div>
      </section>

      {/* Categories overview */}
      <section className="border-b border-line py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {educatorHub.categories.map((category) => (
              <li key={category.id} className="border-t-2 border-amber pt-4">
                <h2 className="font-display text-base font-bold text-ink">
                  {category.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {category.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Age/grade chart highlight */}
      <section className="bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Quick Reference"
            title="Age & Grade Recommendations"
            description="At-a-glance guidance for matching Fall 2026 titles to your readers."
          />
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 pr-4 font-display text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Title
                  </th>
                  <th className="py-3 pr-4 font-display text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Ages
                  </th>
                  <th className="py-3 pr-4 font-display text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Grades
                  </th>
                  <th className="py-3 pr-4 font-display text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Genre
                  </th>
                  <th className="py-3 font-display text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.slug} className="border-b border-line">
                    <td className="py-3 pr-4">
                      <Link
                        href={`/books/${book.slug}`}
                        className="font-medium text-ink hover:text-burgundy"
                      >
                        {book.title}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-ink-muted">{book.ageRange}</td>
                    <td className="py-3 pr-4 text-ink-muted">
                      {book.gradeRange}
                    </td>
                    <td className="py-3 pr-4 text-ink-muted">{book.genre}</td>
                    <td className="py-3 text-ink-muted">{book.readingLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Fall Reading Week resources */}
      <section className="border-t border-line py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow={campaign.fallReadingWeek.dates}
            title="Fall Reading Week Resources"
            description="Programming kits and print materials for October 12–18, 2026."
          />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {frwResources.map((resource) => (
              <li key={resource.id}>
                <ResourceDownload
                  title={resource.title}
                  description={resource.description}
                  type={resource.type}
                  meta={resource.audience}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Book-specific resources */}
      <section className="border-t border-line bg-cream-dark py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="By Title"
            title="Book Resources"
            description="Discussion guides, activities, and worksheets tied to individual Fall releases."
          />
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookResources.map((resource) => {
              const book = resource.bookSlug
                ? getBookBySlug(resource.bookSlug)
                : undefined;
              return (
                <li key={resource.id}>
                  <article className="flex h-full flex-col border border-line bg-paper p-6">
                    <div className="flex flex-wrap gap-2">
                      <Tag variant="forest">{resource.type}</Tag>
                      <Tag>{resource.audience}</Tag>
                    </div>
                    <h3 className="mt-3 font-display text-base font-bold text-ink">
                      {resource.title}
                    </h3>
                    {book && (
                      <p className="mt-1 text-xs text-ink-muted">
                        For{" "}
                        <Link
                          href={`/books/${book.slug}`}
                          className="text-burgundy underline-offset-2 hover:underline"
                        >
                          {book.title}
                        </Link>
                      </p>
                    )}
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                      {resource.description}
                    </p>
                    <button
                      type="button"
                      className="mt-4 self-start font-display text-xs font-bold uppercase tracking-wider text-burgundy underline-offset-2 hover:underline"
                    >
                      Download PDF
                    </button>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* General / printables */}
      <section className="border-t border-line py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Print & Promo"
            title="Printable Materials & Lists"
            description="Shelf talkers, recommendation lists, and tools for bookstore and library displays."
          />
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {generalResources.map((resource) => (
              <li key={resource.id}>
                <ResourceDownload
                  title={resource.title}
                  description={resource.description}
                  type={resource.type}
                  meta={resource.audience}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Book recommendations */}
      <section className="border-t border-line bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Catalog"
            title="Recommend These Books"
            description="Featured Fall 2026 titles ready for classroom libraries and display tables."
          />
          <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {books.filter((b) => b.featured).slice(0, 4).map((book) => (
              <li key={book.slug}>
                <BookCard book={book} />
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href="/find-a-book" variant="secondary" size="md">
              Use Find Their Next Book
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
