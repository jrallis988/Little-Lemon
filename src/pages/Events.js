import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { eventItems } from "../data/siteContent";

function Events() {
  return (
    <>
      <PageHero
        brand="Campus"
        title="Events calendar"
        copy="Express Admissions days, info sessions, open houses, and campus happenings."
        image="/images/campus-lobby.jpg"
      />

      <section className="section">
        <div className="container events-list">
          {eventItems.map((event) => (
            <article key={event.id} className="event-card">
              <div className="event-date-block">
                <span>{event.dateLabel}</span>
                <span>{event.time}</span>
              </div>
              <div>
                <h2>
                  <Link to={`/events/${event.id}`}>{event.title}</Link>
                </h2>
                <p className="event-location">{event.location}</p>
                <p>{event.summary}</p>
                <Link className="text-link" to={`/events/${event.id}`}>
                  Event details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Events;
