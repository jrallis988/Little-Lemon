const groups = [
  {
    title: "Front-end",
    items: [
      "TypeScript",
      "React & Next.js",
      "Tailwind CSS",
      "Accessible, responsive UI",
      "Component-driven design",
    ],
  },
  {
    title: "AI & backend",
    items: [
      "Python & FastAPI",
      "LangChain / LlamaIndex",
      "Chroma & Pinecone",
      "OpenAI & Anthropic SDKs",
      "API design & Postman",
    ],
  },
  {
    title: "Ship & ops",
    items: [
      "Git & GitHub",
      "GitHub Actions CI/CD",
      "Vercel (frontend)",
      "Railway / Render (backend)",
      "Docker / OrbStack",
    ],
  },
  {
    title: "Exploring next",
    items: [
      "React Native + Expo",
      "NativeWind",
      "iOS Simulator workflows",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-ink py-24 md:py-32">
      <div className="container">
        <div className="mb-12 max-w-2xl stagger">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Stack
          </p>
          <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
            A blueprint built to ship.
          </h2>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            Front-end craft first, with a clear path through AI backends and
            deployment—so demos become products.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 stagger">
          {groups.map((group) => (
            <div key={group.title} className="reveal">
              <h3 className="font-display text-xl font-bold text-foam-soft">{group.title}</h3>
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
