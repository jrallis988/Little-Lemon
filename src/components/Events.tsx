import {
  dateForWeekday,
  formatEventDay,
  thisWeekLabel,
  weeklyEvents,
} from "../data/events";
import { links } from "../data/links";
import { useInView } from "../hooks/useInView";

export function Events() {
  const { ref, visible } = useInView<HTMLElement>();
  const weekLabel = thisWeekLabel();
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const upcoming = [...weeklyEvents]
    .map((event) => {
      const date = dateForWeekday(event.dayOffset);
      return { ...event, date };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <section id="events" ref={ref} className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-site">
        <div
          className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          } transition-all duration-700`}
        >
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
                This week
              </p>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                {weekLabel}
              </span>
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
              What’s on at Towle Farm
            </h2>
            <p className="mt-4 max-w-lg text-steel">
              This week’s campus calendar — trivia, trucks, and Backyard hangs.
              Schedules can shift; Facebook has the latest.
            </p>
          </div>
          <a
            href={links.facebook}
            target="_blank"
            rel="noreferrer"
            className="inline-flex self-start border border-ink/20 px-5 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:border-ink hover:bg-ink hover:text-foam"
          >
            See live lineup
          </a>
        </div>

        <ul className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
          {upcoming.map((event, index) => {
            const isToday = event.date.getTime() === now.getTime();
            const isPast = event.date.getTime() < now.getTime();
            return (
              <li
                key={`${event.title}-${event.dayOffset}`}
                className={`grid gap-2 py-6 transition-all duration-700 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.7fr)_minmax(0,1.2fr)] md:gap-8 ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                } ${isPast && visible ? "!opacity-50" : ""}`}
                style={{ transitionDelay: visible ? `${100 + index * 80}ms` : "0ms" }}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-bold uppercase tracking-wide md:text-3xl">
                      {event.title}
                    </h3>
                    {isToday ? (
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-buoy">
                        Today
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm font-medium uppercase tracking-[0.14em] text-tide">
                    {event.where}
                  </p>
                </div>
                <div className="md:pt-1">
                  <p className="font-medium text-ink/90">{formatEventDay(event.date)}</p>
                  <p className="text-sm text-steel">{event.time}</p>
                </div>
                <p className="text-steel md:pt-1">{event.detail}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
