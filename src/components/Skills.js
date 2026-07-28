const groups = [
  {
    title: "Core languages & environment",
    items: [
      "JavaScript (ES6+)",
      "TypeScript",
      "Python",
      "VS Code / Cursor",
      "Git & GitHub",
      "iTerm2 / Warp · Homebrew",
    ],
  },
  {
    title: "Front-end web & mobile",
    items: [
      "HTML5",
      "Modern CSS / SCSS",
      "React & Next.js",
      "Tailwind CSS",
      "Cross-platform mobile UI",
      "Touch-optimized interfaces",
    ],
  },
  {
    title: "Data science & backend",
    items: [
      "Pandas & NumPy",
      "Data cleaning",
      "Structured data pipelines",
      "FastAPI",
      "Serverless architecture",
      "REST APIs & JSON",
    ],
  },
  {
    title: "Cloud & hosting",
    items: [
      "AWS Amplify, Lambda, S3, CloudFront",
      "Azure Static Web Apps & App Service",
      "Vercel",
      "GitHub Pages",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-ink-soft py-24 md:py-32">
      <div
        className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full bg-foam/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container relative">
        <div className="mb-12 max-w-2xl stagger">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Toolkit
          </p>
          <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
            The essential developer toolkit.
          </h2>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            Languages, product UI, data/backends, and cloud hosting—the stack I use
            to ship from idea to production. Interactive prototypes (Phaser, Three.js,
            canvas) live in the Play section when the work calls for them.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 stagger">
          {groups.map((group) => (
            <div key={group.title} className="reveal">
              <h3 className="font-display text-lg font-bold text-foam-soft md:text-xl">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-sand/10 pb-3 text-base text-sand/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
