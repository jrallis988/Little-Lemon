import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function FindBookTeaser() {
  return (
    <section
      className="border-y border-line bg-paper py-16 md:py-24"
      aria-labelledby="find-book-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            eyebrow="Book Discovery"
            title="Find Their Next Book"
            description="Not sure where to start? Answer a few quick questions about age, reading level, and interests — and we'll recommend stories from our Fall 2026 catalog."
          />

          <div className="space-y-4">
            <ol className="space-y-3 border-l-2 border-amber pl-6">
              {[
                "Who are we finding a book for?",
                "How confident are they as a reader?",
                "What are they interested in?",
                "What kind of story are they looking for?",
              ].map((step, i) => (
                <li
                  key={step}
                  className="font-display text-sm font-bold text-ink-muted"
                >
                  <span className="mr-2 text-amber">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
            <Button href="/find-a-book" variant="secondary" size="lg">
              Start the Quiz
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
