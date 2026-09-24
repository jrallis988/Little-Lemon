import ExternalLink from "../../components/ExternalLink";
import PageHero from "../../components/PageHero";
import SectionNav from "../../components/SectionNav";
import { campuses } from "../../data/campuses";
import { visitEventTypes } from "../../data/siteContent";
import {
  APPLY_URL,
  REQUEST_INFO_URL,
  WMCC_EVENTS_URL,
} from "../../data/links";
import { admissionsNav } from "./admissionsNav";

function Visit() {
  return (
    <>
      <PageHero
        brand="Admissions & Aid"
        title="Plan your visit"
        copy="See campus, learn about programs, and get questions answered by college staff — through tours, Open Houses, and Express Admissions Days at Berlin, Littleton, or across the Mount Washington Valley."
        image="/images/campus-exterior.jpg"
        actions={[
          {
            label: "Request Info",
            to: REQUEST_INFO_URL,
            external: true,
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
              WMCC publishes Open Houses, info nights, Express Admissions Days,
              and program sessions on the official events calendar. Dates change
              each term — always confirm there before you travel.
            </p>
          </div>
          <div className="event-list">
            {visitEventTypes.map((event) => (
              <article key={event.title} className="event-item">
                <p className="event-date">{event.kind}</p>
                <h3>{event.title}</h3>
                <p>{event.copy}</p>
                <ExternalLink className="text-link" href={WMCC_EVENTS_URL}>
                  Check the events calendar
                </ExternalLink>
              </article>
            ))}
          </div>
          <div className="section-cta">
            <ExternalLink className="btn btn-gold" href={WMCC_EVENTS_URL}>
              Open WMCC Events Calendar
            </ExternalLink>
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
              and financial aid. Mount Washington Valley students can also call
              the North Conway line for advising and visit options.
            </p>
            <ul className="check-list">
              {campuses.map((campus) => (
                <li key={campus.id}>
                  {campus.name} · {campus.addressLines[0]}
                </li>
              ))}
              <li>Learn about Nursing and other program-specific sessions</li>
            </ul>
          </div>
          <div className="info-panel">
            <h3>Contact Admissions</h3>
            <ul>
              {campuses.map((campus) => (
                <li key={campus.id}>
                  <a href={campus.phoneHref}>
                    {campus.id}: {campus.phone}
                  </a>
                </li>
              ))}
              <li>
                <a href="mailto:wmcc@ccsnh.edu">wmcc@ccsnh.edu</a>
              </li>
            </ul>
            <ExternalLink
              className="btn btn-gold"
              href={REQUEST_INFO_URL}
              trackName="request_info_click"
              trackProps={{ location: "visit" }}
            >
              Request Info
            </ExternalLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default Visit;
