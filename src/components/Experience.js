import experience from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="bg-ink py-24 md:py-32">
      <div className="container">
        <div className="mb-12 max-w-2xl stagger">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Experience & education
          </p>
          <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
            Where I studied and worked.
          </h2>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            A communication and digital media foundation, studio practice, and
            hands-on operations experience—feeding how I design and ship interfaces.
          </p>
        </div>

        <ul className="stagger max-w-3xl">
          {experience.map((item) => (
            <li key={item.id} className="reveal border-t border-sand/14 py-7">
              <p className="text-sm uppercase tracking-[0.16em] text-foam">{item.kind}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-chalk">{item.org}</h3>
              <p className="mt-2 text-base text-sand/85">{item.role}</p>
              {item.bullets ? (
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-sand/75 md:text-base">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foam" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
          <li className="border-t border-sand/14" aria-hidden="true" />
        </ul>
      </div>
    </section>
  );
}
