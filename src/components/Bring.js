const pillars = [
  {
    title: "Front-end & mobile craft",
    body: "I build responsive web apps and cross-platform mobile interfaces using React, Next.js, and modern CSS/Tailwind—focused on clean layouts and smooth user journeys.",
  },
  {
    title: "Backend & data processing",
    body: "I use Python, FastAPI, and data libraries like Pandas to handle the logic, structuring, and processing that powers what the user sees.",
  },
  {
    title: "Cloud & infrastructure",
    body: "I deploy and manage apps efficiently on AWS and Azure, so everything ships reliably from the repository to production.",
  },
  {
    title: "A design-driven mindset",
    body: "Drawing from my background in design, I care deeply about visual hierarchy, typography, and clean design systems—because code and design shouldn't live in two different worlds.",
  },
];

export default function Bring() {
  return (
    <section id="bring" className="bg-ink py-24 md:py-32">
      <div className="container">
        <div className="mb-12 max-w-2xl stagger">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            What I bring
          </p>
          <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
            What I bring to the table.
          </h2>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            Design roots, full-stack execution, and cloud delivery—so the interface
            and the infrastructure stay in sync.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 stagger">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="reveal border-t border-foam/35 pt-5">
              <h3 className="font-display text-xl font-bold text-foam-soft md:text-2xl">
                {pillar.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-sand/85">{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
