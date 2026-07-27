import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import SectionNav from "../../components/SectionNav";
import { visitEvents } from "../../data/siteContent";
import { admissionsNav } from "./admissionsNav";

function Visit() {
  return (
    <>
      <PageHero
        brand="Admissions & Aid"
        title="Plan your visit"
        copy="See campus, learn about programs, and get questions answered by college staff — through tours, Open Houses, and Express Admissions Days."
        image="/images/campus-exterior.jpg"
      />
      <SectionNav label="Admissions section" items={admissionsNav} />

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Upcoming events</p>
            <h2>Find a day that works for you.</h2>
          </div>
          <div className="event-list">
            {visitEvents.map((event) => (
              <article key={`${event.title}-${event.date}`} className="event-item">
                <p className="event-date">{event.date}</p>
                <h3>{event.title}</h3>
                <p className="event-time">{event.time}</p>
                <p>{event.copy}</p>
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
              Prospective students are not required to meet with an admissions
              counselor as part of the formal process — but a visit can help you
              prepare and decide what’s next.
            </p>
            <ul className="check-list">
              <li>Tour classrooms, labs, and student spaces</li>
              <li>Ask about programs, transfer, and financial aid</li>
              <li>Learn about Nursing and other program-specific sessions</li>
            </ul>
          </div>
          <div className="info-panel">
            <h3>Contact Admissions</h3>
            <ul>
              <li>
                <a href="tel:6034277632">(603) 427-7632</a>
              </li>
              <li>
                <a href="mailto:greatbayadmissions@ccsnh.edu">
                  greatbayadmissions@ccsnh.edu
                </a>
              </li>
              <li>320 Corporate Drive, Portsmouth, NH 03801</li>
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
