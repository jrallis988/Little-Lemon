const groups = [
  {
    title: "Languages & markup",
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript basics"],
  },
  {
    title: "Libraries & tooling",
    items: ["React", "React Router", "Tailwind CSS", "Formik & Yup", "Git"],
  },
  {
    title: "Craft focus",
    items: [
      "Responsive layouts",
      "Accessible UI",
      "Motion & micro-interactions",
      "Performance basics",
      "Design handoff",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-ink py-24 md:py-32">
      <div className="container">
        <div className="mb-12 max-w-2xl stagger">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Skills
          </p>
          <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
            A practical front-end toolkit.
          </h2>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            Tools I use to design in the browser and ship maintainable interfaces.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3 stagger">
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
