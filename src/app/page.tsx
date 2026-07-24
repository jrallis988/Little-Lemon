import { siteConfig } from "@/lib/site";

/**
 * Scaffold landing — hero structure only.
 * Work grid, brand systems, and about modules land in subsequent increments.
 */
export default function HomePage() {
  return (
    <section className="mx-auto max-w-gallery px-gutter">
      <div className="grid-gallery min-h-[calc(100dvh-var(--nav-height))] items-end border-b border-ink/15 pb-16 pt-20 lg:pb-20 lg:pt-28">
        <div className="col-span-4 md:col-span-6 lg:col-span-8">
          <p className="index-label mb-6">
            <span className="text-accent">01</span>
            <span className="mx-2 text-ink/20">/</span>
            Graphic Designer · Digital Media
          </p>

          <h1 className="text-display-xl text-balance text-ink">
            {siteConfig.name}
            <span className="text-accent">.</span>
          </h1>

          <p className="mt-8 max-w-prose text-body text-ink-muted">
            Brand identity systems, UI/UX, web architecture, and digital design
            ventures — built with editorial precision and zero algorithmic
            bloat.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#work" className="cta">
              View Work
            </a>
            <a href="#contact" className="cta-ghost">
              Contact
            </a>
          </div>
        </div>

        <aside className="col-span-4 mt-12 md:col-span-2 md:mt-0 lg:col-span-4 lg:justify-self-end">
          <dl className="frame space-y-4 p-5 md:max-w-xs lg:ml-auto">
            <div>
              <dt className="index-label">Discipline</dt>
              <dd className="mt-1 font-mono text-meta uppercase tracking-[0.08em] text-ink">
                Identity · Interface · System
              </dd>
            </div>
            <div className="rule pt-4">
              <dt className="index-label">Status</dt>
              <dd className="mt-1 font-mono text-meta uppercase tracking-[0.08em] text-accent">
                {siteConfig.status.label}
              </dd>
            </div>
            <div className="rule pt-4">
              <dt className="index-label">Grid</dt>
              <dd className="mt-1 font-mono text-meta uppercase tracking-[0.08em] text-ink">
                12-col · 1440 max
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      {/* Anchors reserved for upcoming sections */}
      <div id="work" className="scroll-mt-nav" />
      <div id="brand-identity" className="scroll-mt-nav" />
      <div id="about" className="scroll-mt-nav" />
      <div id="contact" className="scroll-mt-nav" />
    </section>
  );
}
