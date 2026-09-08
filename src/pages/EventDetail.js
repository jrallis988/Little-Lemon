import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { getEventById } from "../data/siteContent";

function EventDetail() {
  const { eventId } = useParams();
  const event = getEventById(eventId);

  if (!event) {
    return (
      <section className="section">
        <div className="container">
          <h1>Event not found</h1>
          <Link className="btn btn-navy" to="/events">
            Back to events
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        brand="Events"
        title={event.title}
        copy={`${event.date} · ${event.time}`}
        image="/images/campus-lobby.jpg"
        compact
      />

      <section className="section">
        <div className="container article-layout">
          <article className="article-main">
            <p className="event-location">{event.location}</p>
            <p className="lede">{event.summary}</p>
            {event.body?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="article-actions">
              <Link className="btn btn-gold" to="/contact">
                Reserve / request info
              </Link>
              <Link className="btn btn-navy" to="/admissions/visit">
                Visit campus
              </Link>
            </div>
          </article>
          <aside className="article-aside content-page-card">
            <h3>Add to your plan</h3>
            <p>
              Arrive a few minutes early, bring questions, and check with admissions
              if you need accessibility accommodations.
            </p>
            <Link className="text-link" to="/events">
              All events
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}

export default EventDetail;
