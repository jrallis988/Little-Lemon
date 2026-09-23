import { testimonials } from "@/lib/testimonials";
import { SectionIntro } from "@/components/SectionIntro";

/**
 * Homepage testimonials. Sample quotes stay in lib/testimonials.ts for content
 * drafting, but this section only renders confirmed (non-placeholder) entries.
 */
export function Testimonials() {
  const confirmed = testimonials.filter((t) => !t.placeholder);
  const featured = confirmed.find((t) => t.featured) ?? confirmed[0];
  const supporting = confirmed.filter((t) => t.id !== featured?.id);

  if (!featured) {
    return (
      <section aria-labelledby="testimonials-heading" className="bg-slate">
        <div className="mx-auto max-w-content section-pad">
          <SectionIntro
            overline="What New Hampshire Is Saying"
            title="Neighbor voices, coming soon."
            tone="dark"
            titleId="testimonials-heading"
          />
          <p className="mt-8 max-w-2xl text-base text-white/70">
            Real quotes from Granite Staters will appear here once supporters
            approve them. Until then we are not publishing sample names.
          </p>
          <p className="mt-6">
            <a
              href="/contact"
              className="font-semibold text-white underline-offset-2 hover:underline"
            >
              Share your story with the campaign →
            </a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="testimonials-heading" className="bg-slate">
      <div className="mx-auto max-w-content section-pad">
        <SectionIntro
          overline="What New Hampshire Is Saying"
          title="Real voices from across the Granite State."
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
      </div>
    </section>
  );
}
