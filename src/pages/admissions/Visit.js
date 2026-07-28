import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import SectionNav from "../../components/SectionNav";
import { visitEvents } from "../../data/siteContent";
import { APPLY_URL } from "../../data/links";
import { admissionsNav } from "./admissionsNav";

function Visit() {
  return (
    <>
      <PageHero
        brand="Admissions & Aid"
        title="Plan your visit"
        copy="See campus, learn about programs, and get questions answered by college staff — through tours, Open Houses, and Express Admissions Days at Berlin, Littleton, or North Conway."
        image="/images/campus-exterior.jpg"
        actions={[
          {
            label: "Request Info",
            to: "/contact",
            className: "btn btn-gold",
          },
          {
            label: "Apply Now",
            to: APPLY_URL,
            external: true,
            className: "btn btn-ghost-light",
          },
        ]}
      />
      <SectionNav label="Admissions section" items={admissionsNav} />

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Upcoming events</p>
            <h2>Find a day that works for you.</h2>
            <p>
              Check the{" "}
              <a
                href="https://www.wmcc.edu/events/"
                target="_blank"
                rel="noreferrer"
              >
                WMCC events calendar
              </a>{" "}
              for the latest dates, then join us for Open Houses, info nights, and
              Express Admissions Days.
            </p>
          </div>
          <div className="event-list">
            {visitEvents.map((event) => (
              <article key={`${event.title}-${event.date}`} className="event-item">
                <p className="event-date">{event.date}</p>
                <h3>{event.title}</h3>
                <p className="event-time">{event.time}</p>
                <p>{event.copy}</p>
                {event.href ? (
                  <a
                    className="text-link"
                    href={event.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View calendar
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container split">
          <div className="split-copy">
            <p className="eyebrow">Campus tours</p>
            <h2>Schedule a personalized tour.</h2>
            <p>
              Visit the Berlin campus or Littleton Academic Center to see labs,
              classrooms, and student spaces — and ask about programs, transfer,
              and financial aid.
            </p>
            <ul className="check-list">
              <li>Berlin Campus · 2020 Riverside Drive</li>
              <li>Littleton Academic Center · 646 Union Street</li>
              <li>North Conway Academic Center · 2541 White Mountain Highway</li>
              <li>Learn about Nursing and other program-specific sessions</li>
            </ul>
          </div>
          <div className="info-panel">
            <h3>Contact Admissions</h3>
            <ul>
              <li>
                <a href="tel:6037521113">(603) 752-1113</a>
              </li>
              <li>
                <a href="tel:6034441326">Littleton: (603) 444-1326</a>
              </li>
              <li>
                <a href="mailto:wmcc@ccsnh.edu">wmcc@ccsnh.edu</a>
              </li>
            </ul>
            <Link className="btn btn-gold" to="/contact">
              Request Info
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Visit;
