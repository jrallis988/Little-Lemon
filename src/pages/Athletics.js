import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import SectionNav from "../components/SectionNav";
import { IconTrophy } from "../components/Icons";
import { studentSectionNav } from "../data/navigation";
import { athleticTeams } from "../data/siteContent";

const upcomingGames = [
  {
    date: "Sep 12",
    sport: "Men’s Basketball",
    opponent: "Scrimmage — Campus Open Practice",
    time: "6:00 PM",
  },
  {
    date: "Sep 18",
    sport: "Women’s Volleyball",
    opponent: "vs. Regional Scrimmage Partner",
    time: "5:30 PM",
  },
  {
    date: "Oct 3",
    sport: "Men’s Soccer / Track",
    opponent: "Herons Fall Classic (home)",
    time: "All day",
  },
  {
    date: "Oct 21",
    sport: "Women’s Basketball",
    opponent: "Alumni Night Exhibition",
    time: "7:00 PM",
  },
];

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

            <h2>Upcoming schedule highlights</h2>
            <div className="schedule-table-wrap">
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Team</th>
                    <th>Event</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingGames.map((game) => (
                    <tr key={`${game.date}-${game.sport}`}>
                      <td>{game.date}</td>
                      <td>{game.sport}</td>
                      <td>{game.opponent}</td>
                      <td>{game.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="fine-print">
              Sample seasonal highlights for planning. Confirm final times with Athletics.
            </p>

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
