import { useEffect, useRef, useState } from "react";

const modes = [
  {
    name: "All-In",
    detail: "Focused structure when you want accelerated, intentional progress.",
    level: 92,
  },
  {
    name: "Lose",
    detail: "Steady Points-based momentum built for ordinary, busy weeks.",
    level: 68,
  },
  {
    name: "Maintain",
    detail: "Protect your results—or breathe—when life gets loud.",
    level: 40,
  },
];

export function Modes() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="modes"
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="modes-heading"
    >
      <div className="absolute inset-0">
        <img
          src="/images/walk.jpg"
          alt=""
          className="h-full w-full object-cover object-[center_40%]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-paper/88" />
        <div className="absolute inset-0 bg-gradient-to-br from-mist/90 via-paper/80 to-cobalt-50/70" />
      </div>

      <div className="section-shell relative">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
          <div>
            <div className="overflow-hidden rounded-[1.75rem]">
              <img
                src="/images/kitchen.jpg"
                alt="Someone preparing a simple, colorful meal in a bright kitchen"
                className="h-64 w-full object-cover sm:h-80 lg:h-[26rem]"
                loading="lazy"
              />
            </div>
            <p className="mt-4 font-serif text-base text-ink/60 sm:text-lg">
              Real weeks include busy kitchens, long walks, and plans that can bend without
              breaking.
            </p>
          </div>

          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
              Modes
            </p>
            <h2
              id="modes-heading"
              className="mt-3 max-w-xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
              style={{ fontWeight: 700 }}
            >
              Your plan should flex when your week does.
            </h2>
            <p className="mt-4 max-w-lg font-serif text-lg leading-relaxed text-ink/65 sm:text-xl">
              Dial structure up or down without starting over. Modes keep Weight Watchers honest
              about real life—vacations, deadlines, and everything between.
            </p>

            <div className="mt-8 rounded-[1.75rem] border border-ink/8 bg-white/90 p-5 shadow-glow backdrop-blur-sm sm:p-7">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ink/40">
                Structure level
              </p>
              <div className="mt-4 space-y-3">
                {modes.map((mode, index) => {
                  const selected = active === index;
                  return (
                    <button
                      key={mode.name}
                      type="button"
                      onClick={() => setActive(index)}
                      className={`w-full rounded-2xl px-4 py-4 text-left transition ${
                        selected
                          ? "bg-cobalt-600 text-white"
                          : "bg-transparent text-ink hover:bg-mist"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span
                          className="font-display text-xl font-bold"
                          style={{ fontWeight: 700 }}
                        >
                          {mode.name}
                        </span>
                        <span
                          className={`font-sans text-xs font-semibold ${
                            selected ? "text-white/75" : "text-ink/35"
                          }`}
                        >
                          {mode.level}%
                        </span>
                      </div>
                      <div
                        className={`mt-3 h-1.5 overflow-hidden rounded-full ${
                          selected ? "bg-white/25" : "bg-cobalt-100"
                        }`}
                      >
                        <div
                          className={`h-full origin-left rounded-full transition-transform duration-700 ${
                            selected ? "bg-white" : "bg-cobalt-600"
                          }`}
                          style={{
                            transform: `scaleX(${visible ? mode.level / 100 : 0})`,
                          }}
                        />
                      </div>
                      <p
                        className={`mt-3 font-sans text-sm leading-relaxed ${
                          selected ? "text-white/80" : "text-ink/60"
                        }`}
                      >
                        {mode.detail}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
