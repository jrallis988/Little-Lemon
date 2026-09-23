import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { hubs, hubOfferings } from "../data/hubs";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function HubsPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return hubs;
    return hubs.filter(
      (hub) =>
        hub.zip.includes(q) ||
        hub.city.toLowerCase().includes(q) ||
        hub.neighborhood.toLowerCase().includes(q) ||
        hub.name.toLowerCase().includes(q)
    );
  }, [query]);

  const weekCalendar = useMemo(() => {
    const byDay = Object.fromEntries(WEEK_DAYS.map((day) => [day, []]));
    hubs.forEach((hub) => {
      hub.nextEvents.forEach((event) => {
        if (byDay[event.day]) {
          byDay[event.day].push({
            ...event,
            hub: hub.name,
            neighborhood: hub.neighborhood,
          });
        }
      });
    });
    return WEEK_DAYS.map((day) => ({
      day,
      events: byDay[day].sort((a, b) => a.time.localeCompare(b.time)),
    }));
  }, []);

  return (
    <>
      <section className="border-b border-paper-line bg-paper pb-14 pt-28 md:pb-16 md:pt-32">
        <div className="container">
          <p className="eyebrow-accent">Hub locator & space explorer</p>
          <h1 className="display mt-5 max-w-4xl text-4xl md:text-6xl">
            Find a Neighborhood Resource Hub near you
          </h1>
          <p className="lede mt-5 max-w-2xl">
            Open doors, local rhythms, and practical support—without the
            paperwork maze. Search by zip, city, or neighborhood.
          </p>

          <form
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="sr-only" htmlFor="hub-search">
              Search hubs by zip, city, or neighborhood
            </label>
            <input
              id="hub-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter zip, city, or neighborhood"
              className="w-full border border-paper-line bg-paper-soft px-5 py-3 font-body text-charcoal outline-none placeholder:text-charcoal-soft focus:border-violet"
            />
            <button type="submit" className="btn-primary shrink-0">
              Search Hubs
            </button>
          </form>
        </div>
      </section>

      <section className="section-pad bg-paper-soft">
        <div className="container">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="display text-3xl md:text-4xl">
              {results.length} hub{results.length === 1 ? "" : "s"} found
            </h2>
            <Link to="/get-support" className="btn-ghost !py-2 text-xs">
              Need help choosing?
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {results.map((hub) => (
              <article key={hub.id} className="surface-card p-7">
                <p className="micro-label text-chartreuse">
                  {hub.neighborhood} · {hub.city}, {hub.state} {hub.zip}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-charcoal-deep">
                  {hub.name}
                </h3>
                <p className="mt-2 font-body text-sm text-charcoal-soft">
                  {hub.hours}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {hub.offerings.map((item) => (
                    <li
                      key={item}
                      className="border border-paper-line px-2.5 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-paper-line pt-5">
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-soft">
                    This week
                  </p>
                  <ul className="mt-3 space-y-2">
                    {hub.nextEvents.map((event) => (
                      <li
                        key={`${event.day}-${event.title}`}
                        className="flex justify-between gap-4 font-body text-sm text-charcoal"
                      >
                        <span>
                          <span className="micro-label text-chartreuse">
                            {event.day}
                          </span>{" "}
                          {event.title}
                        </span>
                        <span className="shrink-0 text-charcoal-soft">
                          {event.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {results.length === 0 && (
            <p className="mt-8 font-body text-charcoal">
              No hubs matched that search. Try another zip or city—or{" "}
              <Link to="/get-support" className="text-violet hover:underline">
                Find Your Track
              </Link>{" "}
              for guided support.
            </p>
          )}
        </div>
      </section>

      <section id="calendar" className="section-pad border-y border-paper-line bg-paper">
        <div className="container">
          <div className="max-w-3xl">
            <p className="eyebrow-accent">Live schedule & calendar</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">
              Weekly community rhythms
            </h2>
            <p className="lede mt-5">
              Open studio nights, peer circles, and neighborhood gatherings across
              the network—come as you are.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {weekCalendar.map(({ day, events }) => (
              <div
                key={day}
                className="min-h-[180px] border border-paper-line bg-paper-soft p-5 shadow-card"
              >
                <p className="font-display text-lg font-semibold text-charcoal-deep">
                  {day}
                </p>
                {events.length === 0 ? (
                  <p className="mt-4 font-body text-sm text-charcoal-soft">
                    Open drop-in hours vary by hub.
                  </p>
                ) : (
                  <ul className="mt-4 space-y-4">
                    {events.map((event) => (
                      <li key={`${day}-${event.hub}-${event.title}`}>
                        <p className="font-body text-sm font-semibold text-charcoal-deep">
                          {event.time} · {event.title}
                        </p>
                        <p className="mt-1 font-body text-xs text-charcoal-soft">
                          {event.neighborhood}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper-soft">
        <div className="container">
          <div className="max-w-3xl">
            <p className="eyebrow-accent">Inside a hub</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">
              Spaces built for belonging and next steps
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {hubOfferings.map((item, index) => (
              <article key={item.title} className="surface-card p-6">
                <span className="micro-label text-chartreuse">0{index + 1}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-charcoal-deep">
                  {item.title}
                </h3>
                <p className="mt-3 font-body leading-relaxed text-charcoal">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HubsPage;
