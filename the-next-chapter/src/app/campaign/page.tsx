import type { Metadata } from "next";
import Link from "next/link";
import { books } from "@/data/books";
import { BookCover } from "@/components/books/BookCover";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { campaign } from "@/data/campaign";

export const metadata: Metadata = {
  title: "Campaign System",
  description:
    "Strategy, identity, and integrated system behind The Next Chapter Fall 2026 publishing campaign.",
};

const ecosystem = [
  { label: "Social Media", detail: "Seasonal posts drive awareness to the campaign site." },
  { label: "Email", detail: "Three newsletter editions deepen discovery month by month." },
  { label: "School / Library Materials", detail: "Print kits and QR cards land educators here." },
  { label: "Bookstore Promotion", detail: "Shelf talkers and window posters point to Fall Reading Week." },
  { label: "QR Codes", detail: "Physical → digital bridge for every print application." },
  { label: "This Website", detail: "The hub for catalog, recommendations, and resources." },
  { label: "Book Discovery", detail: "Filters and Find Their Next Book match readers to titles." },
  { label: "Action", detail: "Purchase, library request, or educator download." },
];

const printApps = [
  {
    title: "Window Poster",
    size: "18 × 24 in",
    use: "Bookstore & library windows during Fall Reading Week",
  },
  {
    title: "Shelf Talker",
    size: "3 × 5 in",
    use: "Endcaps and face-outs for each Fall title",
  },
  {
    title: "Bookmark",
    size: "2 × 7 in",
    use: "Checkout inserts and classroom giveaways",
  },
  {
    title: "Classroom Kit Cover",
    size: "8.5 × 11 in",
    use: "Packet cover for daily FRW lesson outlines",
  },
  {
    title: "QR Landing Card",
    size: "4 × 6 in",
    use: "Foyer tables directing visitors to this site",
  },
  {
    title: "Newsletter Masthead",
    size: "600 px wide",
    use: "Reusable header for seasonal email editions",
  },
];

export default function CampaignPage() {
  return (
    <>
      <section className="grain-overlay relative overflow-hidden bg-ink text-cream">
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-amber">
            Case Study
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-6xl">
            The Next Chapter
            <span className="mt-2 block font-accent text-2xl font-normal uppercase tracking-wide text-amber md:text-3xl">
              An integrated Fall 2026 publishing campaign
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-cream/75 md:text-lg">
            Rather than eight disconnected title launches, {campaign.publisher}{" "}
            needed one seasonal system — graphic design, publishing strategy,
            UX, and front-end development operating as a single experience.
          </p>
        </div>
      </section>

      {/* Problem → Strategy */}
      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              eyebrow="01 — The Problem"
              title="Eight titles. One season. Scattered attention."
              description="Parents, teachers, librarians, and booksellers all needed different entry points — but the publisher couldn't afford eight separate campaigns."
            />
          </div>
          <div>
            <SectionHeader
              eyebrow="02 — The Strategy"
              title="One campaign identity. Many doors in."
              description="Lead with a recognizable seasonal brand, then route each audience to the tools they need: discovery for parents, resources for educators, events for communities."
            />
            <ul className="mt-8 space-y-3">
              {[
                "Unified Fall 2026 brand system",
                "Catalog + recommendation as twin discovery paths",
                "Fall Reading Week as the physical/digital bridge",
                "Newsletter as recurring seasonal touchpoint",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-l-2 border-amber pl-4 text-sm text-ink-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Identity */}
      <section className="border-y border-line bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="03 — Campaign Identity"
            title="Publishing + editorial + fall"
            description="Expressive slab display, brass accents, forest and burgundy — contemporary children's publishing, not a cartoon playground or a SaaS landing page."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Forest", swatch: "bg-forest", hex: "#243D32" },
              { name: "Burgundy", swatch: "bg-burgundy", hex: "#6B2D3C" },
              { name: "Brass", swatch: "bg-amber", hex: "#B8923A" },
              { name: "Ink", swatch: "bg-ink", hex: "#161310" },
            ].map((color) => (
              <div key={color.name} className="border border-line bg-cream p-4">
                <div className={`h-16 w-full ${color.swatch}`} />
                <p className="mt-3 font-display text-xs font-bold uppercase tracking-wider">
                  {color.name}
                </p>
                <p className="text-xs text-ink-muted">{color.hex}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="border border-line bg-cream p-6">
              <p className="font-display text-3xl font-bold">Arcanite Slab</p>
              <p className="mt-2 text-sm text-ink-muted">Display · headlines · navigation</p>
            </div>
            <div className="border border-line bg-cream p-6">
              <p className="font-accent text-2xl uppercase tracking-wide">
                Goudy Heavyface
              </p>
              <p className="mt-2 text-sm text-ink-muted">Accent · taglines · author bylines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cover system */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="04 — Cover System"
            title="Eight titles. One visual family."
            description="Each cover shares spine treatment, title plate, and Harborlight mark — while illustration language stays unique to the story."
          />
          <ul className="stagger-in mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4 md:gap-6">
            {books.map((book) => (
              <li key={book.slug}>
                <Link href={`/books/${book.slug}`} className="group block">
                  <BookCover
                    title={book.title}
                    author={book.author.name}
                    cover={book.cover}
                    size="md"
                  />
                  <p className="mt-3 font-display text-xs font-bold leading-snug text-ink group-hover:text-burgundy">
                    {book.title}
                  </p>
                  <Tag className="mt-1">{book.genre}</Tag>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="border-t border-line bg-forest py-14 text-cream md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="05 — Campaign Ecosystem"
            title="How the pieces connect"
            description="The website is the center of a larger integrated system — not a destination that stands alone."
            dark
          />
          <ol className="mt-12 grid gap-0 md:grid-cols-4">
            {ecosystem.map((step, i) => (
              <li
                key={step.label}
                className="border-t border-cream/20 p-5 md:border-l md:border-t-0 md:first:border-l-0"
              >
                <span className="font-display text-xs font-bold text-amber">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-sm font-bold uppercase tracking-wider">
                  {step.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Print applications */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="06 — Print Applications"
            title="Designed to leave the screen"
            description="Every print piece carries campaign identity and a QR path back to digital discovery."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {printApps.map((app) => (
              <li
                key={app.title}
                className="flex flex-col border border-line bg-paper p-6"
              >
                <div className="mb-5 flex aspect-[4/3] items-center justify-center border border-dashed border-line bg-cream-dark/50">
                  <div className="border border-ink/20 bg-cream px-6 py-8 text-center shadow-sm">
                    <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-burgundy">
                      The Next Chapter
                    </p>
                    <p className="mt-2 font-accent text-sm uppercase text-ink">
                      {app.title}
                    </p>
                    <p className="mt-3 font-display text-[0.6rem] tracking-wider text-ink-muted">
                      {app.size}
                    </p>
                  </div>
                </div>
                <h3 className="font-display text-base font-bold text-ink">
                  {app.title}
                </h3>
                <p className="mt-1 text-xs text-ink-muted">{app.size}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {app.use}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Digital experience map */}
      <section className="border-t border-line bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="07 — Digital Experience"
            title="Explore the live system"
            description="Every route below is part of the Fall 2026 campaign platform."
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/", label: "Homepage", desc: "Seasonal campaign launch" },
              { href: "/books", label: "Fall Catalog", desc: "Filterable discovery" },
              { href: "/find-a-book", label: "Find a Book", desc: "Recommendation quiz" },
              { href: "/fall-reading-week", label: "Fall Reading Week", desc: "Oct 12–18 event" },
              { href: "/educators", label: "Educator Hub", desc: "Guides & printables" },
              { href: "/newsletter", label: "Newsletter", desc: "Three seasonal editions" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-baseline justify-between gap-4 border border-line bg-cream px-5 py-4 transition-colors hover:border-burgundy"
                >
                  <span>
                    <span className="font-display text-sm font-bold text-ink">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-ink-muted">
                      {item.desc}
                    </span>
                  </span>
                  <span className="font-display text-xs text-burgundy">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/books" variant="primary" size="lg">
              Browse the Catalog
            </Button>
            <Button href="/find-a-book" variant="outline" size="lg">
              Try the Quiz
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
