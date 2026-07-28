export default function Focus() {
  const include = [
    "Custom React / Next.js frontends with clear UI components",
    "Python / FastAPI backends and well-tested APIs",
    "RAG and AI apps with LangChain or LlamaIndex",
    "Git workflows, CI/CD, and clean deploy paths",
  ];

  const leaveOut = [
    "Enterprise SaaS as primary codebases (Dynamics, Salesforce, Power BI)",
    "Marketing platforms treated as portfolio projects (e.g. Mailchimp)",
    "Security-distro tooling as a core skill signal (e.g. Parrot OS)",
  ];

  return (
    <section id="focus" className="relative overflow-hidden bg-ink-soft py-24 md:py-32">
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-foam/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container relative">
        <div className="mb-12 max-w-2xl stagger">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Focus
          </p>
          <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
            What belongs in the portfolio—and what doesn&apos;t.
          </h2>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            I ship product code: interfaces people use, APIs that stay maintainable,
            and AI features grounded in real data. Enterprise platforms stay as
            integrations—not the demo.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 stagger">
          <div className="reveal">
            <h3 className="font-display text-xl font-bold text-foam-soft">Include</h3>
            <ul className="mt-5 space-y-4">
              {include.map((item) => (
                <li key={item} className="flex gap-3 border-b border-sand/10 pb-4 text-base text-sand/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foam" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <h3 className="font-display text-xl font-bold text-sand/70">Leave out</h3>
            <ul className="mt-5 space-y-4">
              {leaveOut.map((item) => (
                <li key={item} className="flex gap-3 border-b border-sand/10 pb-4 text-base text-sand/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sand/35" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
