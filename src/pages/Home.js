import { Link } from "react-router-dom";
import {
  focusAreas,
  reasons,
  newsItems,
  events,
  programs,
  actionTiles,
} from "../data/content";
import { VIRTUAL_TOUR } from "../data/campus";
import usePageMeta from "../hooks/usePageMeta";

const heroImage = "/media/campus-hero.jpg";
const campusImage = "/media/campus-hero.jpg";

function ActionIcon({ name }) {
  const props = {
    viewBox: "0 0 48 48",
    width: "40",
    height: "40",
    "aria-hidden": "true",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    case "library":
      return (
        <svg {...props}>
          <path d="M10 8h10v32H10zM28 8h10v32H28z" />
          <path d="M20 12h8M20 24h8M20 36h8" />
        </svg>
      );
    case "bookstore":
      return (
        <svg {...props}>
          <path d="M12 16h24l-2 22H14z" />
          <path d="M16 16V12a8 8 0 0 1 16 0v4" />
        </svg>
      );
    case "map":
      return (
        <svg {...props}>
          <path d="M24 8c-6 0-10 4.5-10 10 0 8 10 20 10 20s10-12 10-20c0-5.5-4-10-10-10z" />
          <circle cx="24" cy="18" r="3.5" />
        </svg>
      );
    case "it":
      return (
        <svg {...props}>
          <rect x="8" y="12" width="32" height="20" rx="2" />
          <path d="M18 40h12M24 32v8" />
          <path d="M16 20h4M22 20h10" />
        </svg>
      );
    case "events":
      return (
        <svg {...props}>
          <rect x="10" y="12" width="28" height="26" rx="2" />
          <path d="M10 20h28M18 8v8M30 8v8M18 28h4M26 28h8" />
        </svg>
      );
    case "residence":
      return (
        <svg {...props}>
          <path d="M8 22 24 10l16 12v16H8z" />
          <path d="M20 38V26h8v12" />
        </svg>
      );
    case "athletics":
      return (
        <svg {...props}>
          <circle cx="24" cy="24" r="12" />
          <path d="M12 24h24M24 12c4 4 4 20 0 24M24 12c-4 4-4 20 0 24" />
        </svg>
      );
    case "early":
      return (
        <svg {...props}>
          <path d="M24 38V22" />
          <path d="M24 22c-6-2-10 2-10 8 6 0 10-4 10-8zM24 22c6-2 10 2 10 8-6 0-10-4-10-8z" />
          <path d="M24 14c0-4 3-6 6-6" />
        </svg>
      );
    default:
      return null;
  }
}

function ActionTile({ tile }) {
  const content = (
    <>
      <span className="action-tile__icon">
        <ActionIcon name={tile.icon} />
      </span>
      <span className="action-tile__label">{tile.label}</span>
    </>
  );

  if (tile.to) {
    return (
      <Link to={tile.to} className="action-tile">
        {content}
      </Link>
    );
  }

  return (
    <a
      href={tile.href}
      className="action-tile"
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </a>
  );
}

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

  const spotlightEvents = events.slice(0, 3);

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
            <a
              className="btn btn--ghost"
              href={VIRTUAL_TOUR}
              target="_blank"
              rel="noreferrer"
            >
              Take a Virtual Tour
            </a>
          </div>
        </div>
      </section>

      <section
        className="section section--tight action-grid-section"
        aria-label="Student resources"
      >
        <div className="section-intro">
          <h2>Campus essentials</h2>
          <p>
            Tools students use every week — without repeating Apply, Aid, or Tour
            from the header above.
          </p>
        </div>
        <div className="action-grid">
          {actionTiles.map((tile) => (
            <ActionTile key={tile.label} tile={tile} />
          ))}
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
          <Link to="/residence-life" className="text-link">
            Explore residence life
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

      <section className="spotlight-band">
        <div className="spotlight-band__inner">
          <div className="spotlight-band__copy">
            <p className="eyebrow">This season on campus</p>
            <h2>Events, workforce trainings, and open houses</h2>
            <p>
              Skip another Apply button — jump into what&apos;s happening next,
              from admissions visits to short-term workforce programs.
            </p>
            <div className="hero__actions">
              <Link to="/events" className="btn btn--solid">
                View events
              </Link>
              <Link to="/workforce" className="btn btn--ghost-dark">
                Workforce education
              </Link>
            </div>
          </div>
          <ul className="spotlight-list">
            {spotlightEvents.map((event) => (
              <li key={event.id}>
                <time dateTime={event.date}>{event.displayDate}</time>
                <div>
                  <h3>{event.title}</h3>
                  <p>{event.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Home;
