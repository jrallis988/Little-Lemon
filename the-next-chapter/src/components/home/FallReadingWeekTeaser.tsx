import { Button } from "@/components/ui/Button";
import { campaign } from "@/data/campaign";

export function FallReadingWeekTeaser() {
  return (
    <section
      className="relative overflow-hidden bg-burgundy py-16 text-cream md:py-24"
      aria-labelledby="frw-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-amber">
              Campaign Event
            </p>
            <h2
              id="frw-heading"
              className="mt-3 font-display text-3xl font-bold leading-tight md:text-5xl"
            >
              {campaign.fallReadingWeek.title}
            </h2>
            <p className="mt-2 font-accent text-lg uppercase tracking-wide text-amber/90">
              {campaign.fallReadingWeek.dates}
            </p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/80">
              A week-long celebration connecting schools, libraries, independent
              bookstores, and families. Daily reading activities, classroom
              resources, and community events across the country.
            </p>
            <Button
              href="/fall-reading-week"
              variant="outline"
              size="lg"
              className="mt-8 border-cream text-cream hover:bg-cream hover:text-burgundy"
            >
              Learn About the Event
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1 opacity-80" aria-hidden="true">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
              <div
                key={i}
                className="flex aspect-square flex-col items-center justify-center border border-cream/20 bg-burgundy-dark/50"
              >
                <span className="font-display text-[0.6rem] font-bold uppercase tracking-wider text-amber">
                  {day}
                </span>
                <span className="font-display text-lg font-bold text-cream">
                  {12 + i}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
