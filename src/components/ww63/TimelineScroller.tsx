import { useEffect, useMemo, useState } from "react";
import { timelineEras, timelineEvents } from "../../data/ww63";

export function TimelineScroller() {
  const [activeId, setActiveId] = useState(timelineEvents[0].id);
  const [progress, setProgress] = useState(0);

  const activeEvent = useMemo(
    () => timelineEvents.find((event) => event.id === activeId) ?? timelineEvents[0],
    [activeId]
  );
  const activeEra = useMemo(
    () => timelineEras.find((era) => era.id === activeEvent.eraId) ?? timelineEras[0],
    [activeEvent]
  );

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-timeline-event]"));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) {
          const id = visible.target.dataset.timelineEvent;
          if (id) setActiveId(id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.2, 0.5, 0.8] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const index = timelineEvents.findIndex((event) => event.id === activeId);
    setProgress(index <= 0 ? 0 : index / (timelineEvents.length - 1));
  }, [activeId]);

  const scrubTo = (index: number) => {
    const event = timelineEvents[index];
    const node = document.querySelector<HTMLElement>(`[data-timeline-event="${event.id}"]`);
    node?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="timeline" className="relative py-20 sm:py-28" aria-labelledby="timeline-heading">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
            Part 1 · Historical timeline
          </p>
          <h2
            id="timeline-heading"
            className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
            style={{ fontWeight: 700 }}
          >
            Sixty-three years, scrubbed into view.
          </h2>
          <p className="mt-4 font-serif text-lg leading-relaxed text-ink/65 sm:text-xl">
            Move from Jean’s living room to clinical-era wellness—one milestone at a time.
          </p>
        </div>

        <div className="mt-10 sticky top-[4.5rem] z-20 rounded-2xl border border-ink/8 bg-paper/95 p-4 shadow-glow backdrop-blur-md sm:p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink/40">
                {activeEra.range}
              </p>
              <p className="mt-1 font-display text-lg font-bold text-ink sm:text-xl" style={{ fontWeight: 700 }}>
                {activeEra.title}
              </p>
            </div>
            <p className="font-sans text-sm font-semibold text-cobalt-700">
              {activeEvent.year} · {activeEvent.title}
            </p>
          </div>

          <div className="mt-4">
            <label className="sr-only" htmlFor="timeline-scrubber">
              Scrub timeline years
            </label>
            <input
              id="timeline-scrubber"
              type="range"
              min={0}
              max={timelineEvents.length - 1}
              step={1}
              value={timelineEvents.findIndex((event) => event.id === activeId)}
              onChange={(event) => scrubTo(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-cobalt-100 accent-cobalt-600"
            />
            <div className="mt-2 flex justify-between font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/35">
              <span>1961</span>
              <span>Today</span>
            </div>
          </div>

          <div className="mt-3 progress-track h-1">
            <div
              className="progress-fill bg-gradient-to-r from-cobalt-600 to-tide transition-[width] duration-500"
              style={{ width: `${Math.max(progress * 100, 4)}%` }}
            />
          </div>

          <div className="mt-4 hidden gap-2 overflow-x-auto pb-1 sm:flex">
            {timelineEras.map((era) => {
              const selected = era.id === activeEra.id;
              return (
                <button
                  key={era.id}
                  type="button"
                  onClick={() => {
                    const first = timelineEvents.find((event) => event.eraId === era.id);
                    if (first) scrubTo(timelineEvents.findIndex((event) => event.id === first.id));
                  }}
                  className={`shrink-0 rounded-xl px-3 py-2 text-left transition ${
                    selected ? "bg-cobalt-600 text-white" : "bg-mist text-ink/70 hover:bg-cobalt-100"
                  }`}
                >
                  <span className="block font-sans text-[0.6rem] font-semibold uppercase tracking-[0.16em] opacity-70">
                    {era.range}
                  </span>
                  <span className="mt-0.5 block font-sans text-xs font-semibold">{era.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <ol className="relative mt-12 space-y-8 before:absolute before:bottom-4 before:left-[1.15rem] before:top-4 before:w-px before:bg-cobalt-200 sm:before:left-1/2 sm:before:-translate-x-1/2">
          {timelineEvents.map((event, index) => {
            const isActive = event.id === activeId;
            const left = index % 2 === 0;
            return (
              <li
                key={event.id}
                data-timeline-event={event.id}
                className={`relative grid gap-4 sm:grid-cols-2 sm:gap-10 ${
                  left ? "" : "sm:[&>article]:col-start-2"
                }`}
              >
                <span
                  className={`absolute left-[0.85rem] top-6 z-10 h-3 w-3 rounded-full border-2 border-paper sm:left-1/2 sm:-translate-x-1/2 ${
                    isActive ? "bg-tide scale-125" : "bg-cobalt-600"
                  } transition`}
                  aria-hidden="true"
                />
                <article
                  className={`ml-10 rounded-[1.5rem] border p-6 transition duration-500 sm:ml-0 ${
                    isActive
                      ? "border-cobalt-200 bg-white shadow-glow"
                      : "border-ink/8 bg-white/60"
                  } ${left ? "sm:mr-8" : "sm:ml-8"}`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-2xl font-bold text-cobalt-700" style={{ fontWeight: 700 }}>
                      {event.year}
                    </span>
                    <span className="rounded-lg bg-mist px-2 py-1 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/50">
                      {event.tag}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
                    {event.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink/65 sm:text-base">
                    {event.body}
                  </p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
