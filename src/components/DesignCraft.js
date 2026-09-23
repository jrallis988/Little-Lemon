import { Link } from "react-router-dom";
import ProjectVisual from "./project/ProjectVisual";

export default function DesignCraft() {
  return (
    <section id="design" className="relative overflow-hidden bg-ink-soft py-24 md:py-32">
      <div
        className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-foam/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container relative">
        <div className="mb-12 max-w-2xl stagger">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Design craft
          </p>
          <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
            From visual systems to shipped UI.
          </h2>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            Through Artistic Fountain, I practice brand and layout systems that translate
            into component-friendly front-end work—tokens, hierarchy, and reusable patterns.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 stagger">
          <article className="reveal">
            <ProjectVisual
              label="Artistic Fountain brand system"
              src="/projects/artistic-fountain-system.svg"
              tone="play"
              className="min-h-[240px]"
            />
            <h3 className="mt-5 font-display text-xl font-bold text-foam-soft md:text-2xl">
              Brand &amp; type systems
            </h3>
            <p className="mt-3 text-base leading-relaxed text-sand/85">
              Color, type scale, and component rhythm defined first—so interfaces stay
              consistent as they grow.
            </p>
          </article>
          <article className="reveal">
            <ProjectVisual
              label="Design structure to built UI"
              src="/projects/design-to-code.svg"
              tone="default"
              className="min-h-[240px]"
            />
            <h3 className="mt-5 font-display text-xl font-bold text-foam-soft md:text-2xl">
              Design → development
            </h3>
            <p className="mt-3 text-base leading-relaxed text-sand/85">
              Structure becomes components: buttons, fields, and layout shells that match
              the system instead of one-off styles.
            </p>
          </article>
        </div>

        <div className="reveal mt-12 flex flex-wrap gap-3">
          <Link to="/work/little-lemon" className="btn-primary">
            See it in a case study
          </Link>
          <Link to="/engineering" className="btn-ghost">
            How I build
          </Link>
        </div>
      </div>
    </section>
  );
}
