import { Link } from "react-router-dom";
import {
  focusAreas,
  reasons,
  newsItems,
  events,
  actionTiles,
} from "../data/content";
import { VIRTUAL_TOUR } from "../data/campus";
import usePageMeta from "../hooks/usePageMeta";

const heroImage = "/media/campus-hero.jpg";
const campusImage = "/media/sweeney-hall.jpg";
const statsImage = "/media/stats-nursing.jpg";

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
          {/* Closed book with spine */}
          <rect x="12" y="8" width="24" height="32" rx="2" />
          <path d="M18 8v32" />
          <path d="M22 16h10M22 22h10M22 28h7" />
        </svg>
      );
    case "bookstore":
      return (
        <svg {...props}>
          <path d="M6 20h36v20H6z" />
          <path d="M4 20l6-10h28l6 10" />
          <path d="M12 20v-6h5v6M21.5 20v-6h5v6M31 20v-6h5v6" />
          <path d="M20 40V28h8v12" />
          <path d="M10 26h6M10 31h5" />
          <path d="M32 26h5M32 31h4" />
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
          <circle cx="24" cy="24" r="14" />
          <path d="M24 10v28" />
          <path d="M10 24h28" />
          <path d="M15 12c5 5 5 19 0 24" />
          <path d="M33 12c-5 5-5 19 0 24" />
          <path d="M12 17c8 3 16 3 24 0" />
          <path d="M12 31c8-3 16-3 24 0" />
        </svg>
      );
    case "early":
      return (
        <svg {...props}>
          <path d="M8 20 24 12l16 8-16 8z" />
          <path d="M14 23v8c4 3 12 3 16 0v-8" />
          <path d="M40 20v10" />
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
    { value: "70+", label: "Degree and certificate programs" },
    { value: "4,600", label: "Students served annually" },
    { value: "60%", label: "of students receive financial aid" },
    { value: "18", label: "Average class size for day classes" },
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
            Concord&apos;s Community College — 70+ career and transfer programs
            on a full riverside campus.
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
        aria-label="Quick links"
      >
        <div className="section-intro">
          <h2>Quick links</h2>
          <p>Jump to the campus tools students reach for every week.</p>
        </div>
        <div className="action-grid">
          {actionTiles.map((tile) => (
            <ActionTile key={tile.label} tile={tile} />
          ))}
        </div>
      </section>

      <section className="facts-band" aria-label="NHTI at a glance">
        <div
          className="facts-band__media"
          style={{ backgroundImage: `url(${statsImage})` }}
          role="img"
          aria-label="NHTI healthcare student practicing clinical skills"
        />
        <div className="facts-band__stats">
          {highlights.map((item) => (
            <div key={item.label} className="facts-band__item">
              <p className="facts-band__value">{item.value}</p>
              <p className="facts-band__label">{item.label}</p>
            </div>
          ))}
        </div>
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
          aria-label="Sweeney Hall on the NHTI campus with autumn trees and a yellow Lynx banner"
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
