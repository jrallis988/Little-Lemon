const tools = [
  {
    title: "Weight Health Score",
    copy: "A clearer picture than the scale alone—habits, sleep, activity, and recovery in one signal.",
  },
  {
    title: "AI Body Scanner",
    copy: "See fat loss and muscle preservation over time, especially useful alongside GLP-1 care.",
  },
  {
    title: "GLP-1 Success",
    copy: "Dose tracking, side-effect guidance, protein goals, and strength training that protects what matters.",
  },
];

export function Tools() {
  return (
    <section id="tools" className="py-20 sm:py-28" aria-labelledby="tools-heading">
      <div className="section-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="relative">
            <div className="overflow-hidden rounded-[1.75rem]">
              <img
                src="/images/movement.jpg"
                alt="Someone training with focused, sustainable movement"
                className="h-[28rem] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-ink/5 bg-white/95 p-5 shadow-glow backdrop-blur sm:left-8 sm:right-auto sm:w-72">
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink/40">
                Today
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
                Health Score 78
              </p>
              <div className="mt-3 progress-track">
                <div className="progress-fill w-[78%] bg-gradient-to-r from-cobalt-600 to-tide" />
              </div>
              <p className="mt-2 font-sans text-xs text-ink/55">
                Sleep + protein looking strong this week
              </p>
            </div>
          </div>

          <div className="lg:pl-4">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
              Beyond the scale
            </p>
            <h2
              id="tools-heading"
              className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
              style={{ fontWeight: 700 }}
            >
              Tools that make progress visible.
            </h2>
            <p className="mt-4 max-w-lg font-serif text-lg leading-relaxed text-ink/65 sm:text-xl">
              Sixty years of behavior science, now paired with modern signals—so you know what’s
              working even when the number on the scale stalls.
            </p>

            <ul className="mt-10 space-y-7">
              {tools.map((tool, index) => (
                <li key={tool.title} className="border-t border-ink/10 pt-6">
                  <div className="flex gap-4">
                    <span className="font-display text-sm font-bold text-cobalt-600" style={{ fontWeight: 700 }}>
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
                        {tool.title}
                      </h3>
                      <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-ink/65 sm:text-base">
                        {tool.copy}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
