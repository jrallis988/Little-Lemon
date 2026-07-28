export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink-soft py-24 md:py-32">
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-foam/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="stagger max-w-2xl">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            About
          </p>
          <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
            Interfaces that feel considered, not crowded.
          </h2>
          <p className="reveal mt-5 text-base leading-relaxed text-sand/85 md:text-lg">
            I&apos;m a developer focused on product surfaces first—clear React and
            Next.js UIs—then the systems that power them: FastAPI services, RAG
            pipelines, and playable web prototypes when interaction is the idea.
          </p>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            Creative game work (world-building, narrative, wireframes) lives on the
            artistic track. Engineering demos—loops, rendering, Phaser/Three builds—
            ship here. Based in New Hampshire; collaborate remotely.
          </p>
        </div>

        <aside className="reveal border-l border-foam/40 pl-6 md:pl-8">
          <p className="font-display text-xl font-semibold leading-snug text-chalk md:text-2xl">
            Open to front-end, product engineering, interactive prototypes, and
            AI-assisted app collaborations.
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.16em] text-sand/65">
            Available for new work
          </p>
        </aside>
      </div>
    </section>
  );
}
