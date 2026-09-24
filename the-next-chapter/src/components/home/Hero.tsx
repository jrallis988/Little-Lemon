import { Button } from "@/components/ui/Button";
import { BookCover } from "@/components/books/BookCover";
import { campaign } from "@/data/campaign";
import type { Book } from "@/types/book";

interface HeroProps {
  featuredBooks: Book[];
}

export function Hero({ featuredBooks }: HeroProps) {
  const stack = featuredBooks.slice(0, 3);

  return (
    <section className="grain-overlay relative overflow-hidden bg-forest text-cream">
      {/* Atmospheric layers */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 40%, rgba(196,133,58,0.18), transparent 55%),
            radial-gradient(ellipse 50% 40% at 10% 80%, rgba(107,45,60,0.25), transparent 50%),
            linear-gradient(165deg, #243d32 0%, var(--forest) 45%, #1e3329 100%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -12deg,
            transparent,
            transparent 48px,
            currentColor 48px,
            currentColor 49px
          )`,
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:py-28">
        <div className="animate-rise max-w-2xl">
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-amber">
            {campaign.season} · {campaign.publisher}
          </p>

          <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.92] tracking-tight md:text-7xl lg:text-[5.5rem]">
            The Next
            <br />
            Chapter
          </h1>

          <p className="mt-6 font-accent text-2xl uppercase tracking-wide text-amber md:text-3xl">
            {campaign.tagline}
          </p>

          <p className="mt-7 max-w-lg text-base leading-relaxed text-cream/80 md:text-lg">
            Eight new stories for readers ages 7–14. One seasonal campaign
            connecting families, educators, libraries, and bookstores.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/books" variant="primary" size="lg">
              Explore Fall Books
            </Button>
            <Button
              href="/find-a-book"
              variant="outline"
              size="lg"
              className="border-cream/80 text-cream hover:bg-cream hover:text-forest"
            >
              Find Their Next Book
            </Button>
          </div>
        </div>

        {/* Cover stack — dominant visual */}
        <div
          className="animate-rise-delay relative mx-auto flex h-[340px] w-full max-w-md items-end justify-center md:h-[420px] lg:mx-0 lg:max-w-none"
          aria-hidden="true"
        >
          {stack.map((book, i) => {
            const transforms = [
              "translate(-58%, -8%) rotate(-14deg)",
              "translate(-50%, 0%) rotate(0deg)",
              "translate(-42%, -6%) rotate(12deg)",
            ];
            const z = [1, 3, 2][i];
            return (
              <div
                key={book.slug}
                className="absolute bottom-4 left-1/2 origin-bottom transition-transform duration-500 hover:z-20 hover:-translate-y-2"
                style={{
                  transform: transforms[i],
                  zIndex: z,
                }}
              >
                <BookCover
                  title={book.title}
                  author={book.author.name}
                  cover={book.cover}
                  size="lg"
                  className="shadow-[8px_16px_40px_rgba(0,0,0,0.45)]"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
