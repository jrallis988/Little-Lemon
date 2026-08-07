const skills = [
  "HTML, CSS, JavaScript",
  "React",
  "Responsive & accessible UI",
  "Design systems",
  "Git & GitHub",
];

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div
        className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full bg-foam/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container relative">
        <div className="mb-12 max-w-2xl stagger">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Skills
          </p>
          <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
            Core front-end toolkit.
          </h2>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            Focused skills for building accessible, performance-minded interfaces—
            and the collaboration habits to ship them.
          </p>
        </div>

        <ul className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <li
              key={skill}
              className="reveal border-t border-foam/35 pt-5 font-display text-xl font-bold text-chalk md:text-2xl"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
