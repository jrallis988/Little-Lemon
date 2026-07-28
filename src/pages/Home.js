import { Link } from "react-router-dom";
import { focusAreas, reasons, newsItems, events, programs } from "../data/content";
import usePageMeta from "../hooks/usePageMeta";

const heroImage = "/media/campus-hero.jpg";
const campusImage = "/media/campus-hero.jpg";

function Home() {
  usePageMeta({
    title: "Home",
    description:
      "NHTI – Concord's Community College. Affordable career and transfer programs on a full riverside campus in Concord, NH.",
  });

  const highlights = [
    { value: `${programs.length}+`, label: "Degree and certificate programs" },
    { value: "4,600+", label: "Students served annually" },
    { value: "240", label: "Acre riverside campus" },
  ];

  return (
    <>
      <section className="hero">
        <div
          className="hero__media"
          style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="NHTI campus quad with Little Hall and the Student Center in Concord, New Hampshire"
        />
        <div className="hero__veil" aria-hidden="true" />
        <div className="hero__content">
          <p className="hero__brand reveal">NHTI</p>
          <h1 className="hero__headline reveal reveal--delay-1">
            Learn where New Hampshire works.
          </h1>
          <p className="hero__support reveal reveal--delay-2">
            Concord&apos;s Community College — {programs.length}+ career and
            transfer programs on a full riverside campus.
          </p>
          <div className="hero__actions reveal reveal--delay-3">
            <Link to="/admissions" className="btn btn--solid">
              Apply now
            </Link>
            <Link to="/campus" className="btn btn--ghost">
              Visit campus
            </Link>
          </div>
        </div>
      </section>

      <section className="stat-strip" aria-label="NHTI at a glance">
        {highlights.map((item) => (
          <div key={item.label} className="stat-strip__item">
            <p className="stat-strip__value">{item.value}</p>
            <p className="stat-strip__label">{item.label}</p>
          </div>
        ))}
      </section>

      <section className="section section--tight">
        <div className="section-intro">
          <h2>Paths that open doors</h2>
          <p>
            From nursing clinics to engineering labs, choose a focus that meets
            New Hampshire where demand is rising.
          </p>
        </div>
        <div className="pathway-list">
          {focusAreas.slice(0, 4).map((area) => (
            <Link
              key={area.id}
              to="/academics"
              className="pathway-link"
              state={{ focus: area.id }}
            >
              <span className="pathway-link__title">{area.title}</span>
              <span className="pathway-link__text">{area.summary}</span>
              <span className="pathway-link__cue" aria-hidden="true">
                Explore
              </span>
            </Link>
          ))}
        </div>
        <div className="section-follow">
          <Link to="/academics" className="text-link">
            Search all programs
          </Link>
        </div>
      </section>

      <section className="split-band">
        <div
          className="split-band__media"
          style={{ backgroundImage: `url(${campusImage})` }}
          role="img"
          aria-label="NHTI campus buildings across the quad lawn"
        />
        <div className="split-band__copy">
          <h2>The only NH community college with residence halls</h2>
          <p>
            A 240-acre campus on the Merrimack River gives you classes, clubs,
            athletics, and housing in one place — without the private-college
            price tag.
          </p>
          <Link to="/campus" className="text-link">
            See campus life
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-intro">
          <h2>Why students choose NHTI</h2>
          <p>Accessible education with a complete collegiate experience.</p>
        </div>
        <div className="reason-grid">
          {reasons.map((reason) => (
            <article key={reason.title} className="reason">
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--muted">
        <div className="home-split">
          <div>
            <div className="news-head">
              <h2>Campus news</h2>
              <Link to="/news" className="text-link">
                All news
              </Link>
            </div>
            <ul className="news-list">
              {newsItems.map((item) => (
                <li key={item.id}>
                  <time dateTime={item.date}>{item.displayDate}</time>
                  <p>
                    <Link to={`/news/${item.id}`}>{item.title}</Link>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="news-head">
              <h2>Upcoming events</h2>
              <Link to="/events" className="text-link">
                All events
              </Link>
            </div>
            <ul className="news-list">
              {events.slice(0, 3).map((event) => (
                <li key={event.id}>
                  <time dateTime={event.date}>{event.displayDate}</time>
                  <p>
                    <Link to="/events">{event.title}</Link>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band__inner">
          <h2>Ready when you are</h2>
          <p>
            $0 application fee. Day, evening, hybrid, and online options —
            including accelerated 8-week courses.
          </p>
          <div className="hero__actions">
            <Link to="/admissions" className="btn btn--solid">
              Start your application
            </Link>
            <Link to="/academics" className="btn btn--ghost-dark">
              Browse programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
