import { Button } from "@/components/ui/Button";
import { campaign } from "@/data/campaign";

export function Hero() {
  return (
    <section className="grain-overlay relative overflow-hidden bg-forest text-cream">
      <div
        className="absolute inset-0 opacity-[0.07]"
        aria-hidden="true"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-amber">
            {campaign.season} Collection
          </p>

          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            The Next
            <br />
            Chapter
          </h1>

          <p className="mt-6 font-accent text-2xl uppercase tracking-wide text-amber md:text-3xl">
            {campaign.tagline}
          </p>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg">
            Eight new stories for readers ages 7–14, releasing this fall from{" "}
            {campaign.publisher}. Adventure, mystery, friendship, and discovery
            await in our seasonal children&apos;s and middle-grade collection.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/books" variant="primary" size="lg">
              Explore Fall Books
            </Button>
            <Button
              href="/find-a-book"
              variant="outline"
              size="lg"
              className="border-cream text-cream hover:bg-cream hover:text-forest"
            >
              Find Their Next Book
            </Button>
          </div>
        </div>

        <div
          className="absolute -right-8 bottom-0 hidden h-64 w-64 opacity-10 lg:block xl:-right-4 xl:h-80 xl:w-80"
          aria-hidden="true"
        >
          <svg viewBox="0 0 200 200" className="h-full w-full text-amber">
            <path
              fill="currentColor"
              d="M100 10 L110 70 L170 70 L120 105 L140 170 L100 135 L60 170 L80 105 L30 70 L90 70 Z"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
