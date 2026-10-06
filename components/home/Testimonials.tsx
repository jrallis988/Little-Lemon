import { testimonials } from "@/lib/testimonials";
import { SectionIntro } from "@/components/SectionIntro";
import { PORTFOLIO_MODE } from "@/lib/demo";

export function Testimonials() {
  const featured = testimonials.find((t) => t.featured) ?? testimonials[0];
  const supporting = testimonials.filter((t) => t.id !== featured?.id);

  if (!featured) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="bg-slate">
      <div className="mx-auto max-w-content section-pad">
        <SectionIntro
          overline="What New Hampshire Is Saying"
          title="Voices from across the Granite State."
          tone="dark"
          titleId="testimonials-heading"
        />

        <blockquote className="mt-10 border border-white/10 bg-ink/30 p-7 sm:p-11">
          <p className="font-quote text-[clamp(1.25rem,2vw,1.75rem)] italic leading-[1.55] text-white">
            “{featured.quote}”
          </p>
          <footer className="mt-6 text-base font-semibold text-white/65">
            — {featured.name}, {featured.town}
          </footer>
        </blockquote>

        {supporting.length > 0 ? (
          <ul className="mt-6 grid gap-5 md:grid-cols-2">
            {supporting.map((t) => (
              <li key={t.id} className="border border-white/10 bg-ink/20 p-7">
                <p className="font-quote text-quote italic text-white/90">
                  “{t.quote}”
                </p>
                <p className="mt-4 text-sm font-semibold text-white/55">
                  — {t.name}, {t.town}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
        {PORTFOLIO_MODE ? (
          <p className="mt-6 text-sm text-white/45">
            Sample quotes for this case study — not attributed to real supporters.
          </p>
        ) : null}
      </div>
    </section>
  );
}
