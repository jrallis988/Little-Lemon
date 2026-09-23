import { Link } from "react-router-dom";
import { events } from "../data/content";
import usePageMeta from "../hooks/usePageMeta";

function Events() {
  usePageMeta({
    title: "Events",
    description:
      "NHTI open houses, info sessions, and campus events in Concord, New Hampshire.",
  });

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Events</p>
        <h1>Visit, learn, and get connected</h1>
        <p className="page-hero__lede">
          Open houses, info sessions, and campus traditions help you meet the
          people and places that make NHTI feel like home.
        </p>
      </section>

      <section className="section">
        <div className="event-list">
          {events.map((event) => (
            <article key={event.id} className="event-item">
              <div className="event-item__date">
                <time dateTime={event.date}>{event.displayDate}</time>
                <span>{event.time}</span>
              </div>
              <div>
                <h2>{event.title}</h2>
                <p className="event-item__location">{event.location}</p>
                <p>{event.summary}</p>
              </div>
              <div className="event-item__actions">
                <Link
                  to="/admissions"
                  className="btn btn--ghost-dark btn--compact"
                >
                  RSVP interest
                </Link>
                {event.sourceUrl ? (
                  <a
                    className="text-link"
                    href={event.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Details
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band cta-band--compact">
        <div className="cta-band__inner">
          <h2>Can&apos;t make an event?</h2>
          <p>
            Schedule a campus visit or take the virtual tour anytime — Admissions
            is ready when you are.
          </p>
          <div className="hero__actions">
            <Link to="/admissions" className="btn btn--solid">
              Plan a visit
            </Link>
            <a
              className="btn btn--ghost"
              href="https://ccsnhmaps.college-tour.com/maps/map.php?ID=6"
              target="_blank"
              rel="noreferrer"
            >
              Virtual tour
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Events;
