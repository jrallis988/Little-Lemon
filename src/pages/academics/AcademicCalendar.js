import PageHero from "../../components/PageHero";
import SectionNav from "../../components/SectionNav";
import { academicCalendarItems, academicsNav } from "../../data/academicsContent";

function AcademicCalendar() {
  return (
    <>
      <PageHero
        brand="Academics"
        title="Calendar & schedule"
        copy="Use this planning page to stay on top of registration windows, semester milestones, and course scheduling rhythms."
        image="/images/campus-lobby.jpg"
      />
      <SectionNav label="Academics section" items={academicsNav} />

      <section className="section">
        <div className="container">
          <div className="section-intro narrow">
            <p className="eyebrow">Academic planning</p>
            <h2>Know the key dates before you register.</h2>
            <p>
              Great Bay publishes full official calendars and registration
              documents each term. This page gives students a clear planning
              overview before they dive into detailed term documents.
            </p>
          </div>
          <div className="timeline-grid">
            {academicCalendarItems.map((block) => (
              <article key={block.term} className="timeline-card">
                <h3>{block.term}</h3>
                <ul className="timeline-list">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container callout-row">
          <div>
            <h2>Need the full catalog or official forms?</h2>
            <p>
              Use the academic catalog for detailed course descriptions and keep
              an eye on registration documents for refund dates, freeze dates,
              and disbursement timing.
            </p>
          </div>
          <a
            className="btn btn-navy"
            href="https://catalog.greatbay.edu/"
            target="_blank"
            rel="noreferrer"
          >
            Open Catalog
          </a>
        </div>
      </section>
    </>
  );
}

export default AcademicCalendar;
