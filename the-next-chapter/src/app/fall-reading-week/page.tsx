import type { Metadata } from "next";
import Link from "next/link";
import { getBookBySlug } from "@/data/books";
import { fallReadingWeek } from "@/data/fall-reading-week";
import { BookCover } from "@/components/books/BookCover";
import { ResourceDownload } from "@/components/resources/ResourceDownload";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { campaign } from "@/data/campaign";

export const metadata: Metadata = {
  title: "Fall Reading Week",
  description: `${fallReadingWeek.dates} — A week-long celebration connecting schools, libraries, bookstores, and families.`,
};

export default function FallReadingWeekPage() {
  const featuredSlugs = fallReadingWeek.dailyActivities
    .map((d) => d.bookSlug)
    .filter(Boolean) as string[];
  const featuredBooks = featuredSlugs
    .map((slug) => getBookBySlug(slug))
    .filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="grain-overlay relative overflow-hidden bg-burgundy text-cream">
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-amber">
            {campaign.name}
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
            {fallReadingWeek.title}
          </h1>
          <p className="mt-3 font-accent text-xl uppercase tracking-wide text-amber md:text-2xl">
            {fallReadingWeek.dates}
          </p>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg">
            {fallReadingWeek.overview}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              href="#daily-activities"
              variant="outline"
              size="lg"
              className="border-cream text-cream hover:bg-cream hover:text-burgundy"
            >
              See Daily Activities
            </Button>
            <Button href="#reading-guide" variant="primary" size="lg">
              Download Reading Guide
            </Button>
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="border-b border-line py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Why It Matters"
            title="One Week. Many Readers."
            description="Fall Reading Week is designed as a bridge between print promotion and digital discovery — QR codes on posters and shelf talkers lead here."
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {fallReadingWeek.goals.map((goal) => (
              <li
                key={goal}
                className="flex gap-3 border-l-2 border-amber pl-4 text-sm leading-relaxed text-ink-muted md:text-base"
              >
                {goal}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured Books */}
      <section className="bg-paper py-12 md:py-16" aria-labelledby="featured-frw">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Featured Titles"
            title="Books of the Week"
            description="Each day highlights a Fall 2026 title — use them for read-alouds, displays, and community programming."
          />
          <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-7">
            {featuredBooks.map(
              (book) =>
                book && (
                  <li key={book.slug}>
                    <Link href={`/books/${book.slug}`} className="group block">
                      <BookCover
                        title={book.title}
                        author={book.author.name}
                        cover={book.cover}
                        size="sm"
                      />
                      <p className="mt-2 font-display text-xs font-bold leading-snug text-ink group-hover:text-burgundy">
                        {book.title}
                      </p>
                    </Link>
                  </li>
                )
            )}
          </ul>
        </div>
      </section>

      {/* Daily Activities */}
      <section
        id="daily-activities"
        className="border-t border-line py-12 md:py-16"
        aria-labelledby="daily-heading"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Schedule"
            title="Daily Reading Activities"
            description="A theme for every day of the week — adaptable for classrooms, libraries, and bookstores."
          />
          <ol className="mt-10 space-y-0 divide-y divide-line border border-line">
            {fallReadingWeek.dailyActivities.map((day) => {
              const book = day.bookSlug
                ? getBookBySlug(day.bookSlug)
                : undefined;
              return (
                <li
                  key={day.date}
                  className="grid gap-4 bg-paper p-5 md:grid-cols-[7rem_1fr_auto] md:items-start md:gap-8 md:p-6"
                >
                  <div>
                    <p className="font-display text-xs font-bold uppercase tracking-wider text-burgundy">
                      {day.day}
                    </p>
                    <p className="mt-1 text-sm text-ink-muted">{day.date}</p>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">
                      {day.theme}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {day.activity}
                    </p>
                    {book && (
                      <p className="mt-2 text-sm">
                        <span className="text-ink-muted">Featured: </span>
                        <Link
                          href={`/books/${book.slug}`}
                          className="font-medium text-burgundy underline-offset-2 hover:underline"
                        >
                          {book.title}
                        </Link>
                      </p>
                    )}
                  </div>
                  <Tag variant="amber">{day.day.slice(0, 3)}</Tag>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Classroom + Library Resources */}
      <section className="border-t border-line bg-cream-dark py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="For Schools"
                title="Classroom Resources"
              />
              <ul className="mt-8 grid gap-4">
                {fallReadingWeek.classroomResources.map((resource) => (
                  <li key={resource.title}>
                    <ResourceDownload
                      title={resource.title}
                      description={resource.description}
                      type={resource.type}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeader
                eyebrow="For Libraries"
                title="Library Resources"
              />
              <ul className="mt-8 grid gap-4">
                {fallReadingWeek.libraryResources.map((resource) => (
                  <li key={resource.title}>
                    <ResourceDownload
                      title={resource.title}
                      description={resource.description}
                      type={resource.type}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reading Guide + QR */}
      <section
        id="reading-guide"
        className="border-t border-line py-12 md:py-16"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader
                eyebrow="Take Home"
                title={fallReadingWeek.readingGuide.title}
                description={fallReadingWeek.readingGuide.description}
              />
              <Button variant="primary" size="lg" className="mt-8" href="#">
                Download Family Guide PDF
              </Button>
            </div>
            <div className="border border-line bg-paper p-8 text-center">
              <div
                className="mx-auto flex h-32 w-32 items-center justify-center border-2 border-dashed border-ink/30 bg-cream"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 100 100"
                  className="h-24 w-24 text-ink"
                  fill="currentColor"
                >
                  <rect x="10" y="10" width="25" height="25" />
                  <rect x="65" y="10" width="25" height="25" />
                  <rect x="10" y="65" width="25" height="25" />
                  <rect x="40" y="40" width="8" height="8" />
                  <rect x="52" y="40" width="8" height="8" />
                  <rect x="40" y="52" width="8" height="8" />
                  <rect x="65" y="52" width="8" height="8" />
                  <rect x="52" y="65" width="8" height="8" />
                  <rect x="65" y="65" width="25" height="8" />
                  <rect x="82" y="73" width="8" height="17" />
                </svg>
              </div>
              <p className="mt-4 font-display text-xs font-bold uppercase tracking-wider text-ink">
                Scan to join Fall Reading Week
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                Print materials — posters, bookmarks, shelf talkers — use QR
                codes that land on this page, connecting physical promotion to
                digital discovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Participating Locations */}
      <section className="border-t border-line bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Community"
            title="Participating Locations"
            description="A sample of schools, libraries, and independent bookstores joining Fall Reading Week. (Fictional demonstration list.)"
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {fallReadingWeek.locations.map((location) => (
              <li
                key={location.name}
                className="border border-line bg-cream px-4 py-4"
              >
                <Tag
                  variant={
                    location.type === "School"
                      ? "forest"
                      : location.type === "Library"
                        ? "burgundy"
                        : "amber"
                  }
                >
                  {location.type}
                </Tag>
                <p className="mt-2 font-display text-sm font-bold text-ink">
                  {location.name}
                </p>
                <p className="mt-1 text-xs text-ink-muted">
                  {location.city}, {location.state}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-line bg-burgundy py-12 text-cream md:py-16">
        <div className="mx-auto max-w-2xl px-5 text-center md:px-8">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Get Fall Reading Week Updates
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-cream/75">
            Subscribe for daily theme reminders, new resources, and featured
            bookstore events during the week.
          </p>
          <div className="mt-8 flex justify-center">
            <NewsletterForm source="Fall Reading Week" dark />
          </div>
        </div>
      </section>
    </>
  );
}
