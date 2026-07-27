import { Link } from "react-router-dom";
import { Community } from "../components/Community";
import { Hero } from "../components/Hero";
import { Join } from "../components/Join";
import { Modes } from "../components/Modes";
import { Pathways } from "../components/Pathways";
import { Tools } from "../components/Tools";

export function HomePage() {
  return (
    <main>
      <Hero />
      <section className="border-y border-ink/8 bg-mist/40 py-10" aria-label="Weight Watchers 63 campaign">
        <div className="section-shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
              Weight Watchers 63
            </p>
            <p className="mt-2 max-w-xl font-serif text-lg text-ink/75 sm:text-xl">
              Trace 63 years of community, science, and habit formation—from Jean’s living room to
              today’s clinical era.
            </p>
          </div>
          <Link
            to="/63"
            className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-cobalt-600 px-6 py-3.5 font-sans text-sm font-semibold text-white transition hover:bg-cobalt-700"
          >
            Explore the campaign
          </Link>
        </div>
      </section>
      <Pathways />
      <Modes />
      <Tools />
      <Community />
      <Join />
    </main>
  );
}
