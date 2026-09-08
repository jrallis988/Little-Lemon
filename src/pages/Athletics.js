import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import SectionNav from "../components/SectionNav";
import { IconTrophy } from "../components/Icons";
import { studentSectionNav } from "../data/navigation";
import { athleticTeams } from "../data/siteContent";

function Athletics() {
  return (
    <>
      <PageHero
        brand="Student Experience"
        title="Athletics — Compete as a Heron"
        copy="GBCC is a member of the Yankee Small College Conference (YSCC) within the USCAA. In 2025 the men’s basketball team won the conference championship."
        image="/images/students.jpg"
      />
      <SectionNav label="Student Experience" items={studentSectionNav} />

      <section className="section">
        <div className="container athletics-layout">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-icon"><IconTrophy accent /></span>
              Varsity athletics
            </p>
            <h2>Herons teams</h2>
            <p>
              Compete, train, and represent Great Bay while staying on track academically.
              Intramurals and Fitness Center access are available for non-varsity students too.
            </p>
            <ul className="check-list athletics-teams">
              {athleticTeams.map((team) => (
                <li key={team}>{team}</li>
              ))}
            </ul>
            <div className="detail-block">
              <h3>Athletics contact</h3>
              <p>
                (603) 427-7733
                <br />
                <a href="mailto:greatbayathletics@ccsnh.edu">greatbayathletics@ccsnh.edu</a>
              </p>
            </div>
            <div className="article-actions">
              <Link className="btn btn-gold" to="/student-experience/clubs">
                Clubs & intramurals
              </Link>
              <Link className="btn btn-navy" to="/student-experience/wellness">
                Fitness & wellness
              </Link>
            </div>
          </div>

          <aside className="athletics-aside">
            <article className="content-page-card">
              <IconTrophy accent />
              <h3>Why Herons athletics</h3>
              <ul className="check-list light-list">
                <li>YSCC conference competition</li>
                <li>USCAA national affiliation</li>
                <li>Academic support for student-athletes</li>
                <li>Community game-day energy on the Seacoast</li>
              </ul>
            </article>
            <article className="athletics-note">
              <h3>Recruiting & walk-ons</h3>
              <p>
                Interested in joining a roster? Contact Athletics for coach connections,
                eligibility basics, and seasonal timelines.
              </p>
              <Link className="text-link" to="/contact">
                Request athletics info
              </Link>
            </article>
          </aside>
        </div>
      </section>
    </>
  );
}

export default Athletics;
