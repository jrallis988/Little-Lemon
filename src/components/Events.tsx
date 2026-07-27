import { useInView } from "../hooks/useInView";
import { events } from "../data/events";
import { links } from "../data/links";

export function Events() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section id="events" ref={ref} className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-site">
        <div
          className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          } transition-all duration-700`}
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
              Calendar
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
              What’s on at Towle Farm
            </h2>
            <p className="mt-4 max-w-lg text-steel">
              Trivia, live music, food trucks, and Backyard hangs — the campus
              stays busy year-round.
            </p>
          </div>
          <a
            href={links.facebook}
            target="_blank"
            rel="noreferrer"
            className="inline-flex self-start border border-ink/20 px-5 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:border-ink hover:bg-ink hover:text-foam"
          >
            See this week’s lineup
          </a>
        </div>

        <ul className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
          {events.map((event, index) => (
            <li
              key={event.title}
              className={`grid gap-2 py-6 transition-all duration-700 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.7fr)_minmax(0,1.2fr)] md:gap-8 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: visible ? `${100 + index * 80}ms` : "0ms" }}
            >
              <div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-wide md:text-3xl">
                  {event.title}
                </h3>
                <p className="mt-1 text-sm font-medium uppercase tracking-[0.14em] text-tide">
                  {event.where}
                </p>
              </div>
              <p className="font-medium text-ink/80 md:pt-1">{event.when}</p>
              <p className="text-steel md:pt-1">{event.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
