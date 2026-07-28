export default function Focus() {
  const tracks = [
    {
      title: "Artistic Fountain",
      subtitle: "Creative track",
      items: [
        "Game design & narrative concepting",
        "Visual world-building and character mockups",
        "UI/UX wireframes for playable surfaces",
      ],
    },
    {
      title: "Developer Portfolio",
      subtitle: "Engineering track",
      items: [
        "Playable web prototypes (canvas, Phaser, Three.js)",
        "Interactive simulations with real game loops",
        "Custom code builds embedded in React / Next.js",
      ],
    },
  ];

  const include = [
    "Custom React / Next.js frontends with clear UI components",
    "Python / FastAPI backends and well-tested APIs",
    "RAG and AI apps with LangChain or LlamaIndex",
    "Web game prototypes and interactive visual toys",
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
            Where game development lives—and what stays out.
          </h2>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            Creative exploration feeds the Artistic Fountain. Engineering demos—playable
            prototypes, loops, and rendering—belong in this portfolio.
          </p>
        </div>

        <div className="mb-14 grid gap-10 md:grid-cols-2 stagger">
          {tracks.map((track) => (
            <div key={track.title} className="reveal border-l border-foam/40 pl-5 md:pl-6">
              <p className="text-sm uppercase tracking-[0.16em] text-sand/65">{track.subtitle}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-chalk">{track.title}</h3>
              <ul className="mt-4 space-y-3">
                {track.items.map((item) => (
                  <li key={item} className="text-base text-sand/85">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
