import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { athleticTeams, clubs } from "../data/siteContent";

function StudentExperience() {
  return (
    <>
      <PageHero
        brand="Student Experience"
        title="Life beyond the classroom."
        copy="Athletics, clubs, wellness resources, and a Student Success Center — built to help you belong, lead, and thrive at Great Bay."
        image="/images/students.jpg"
      />

      <section className="section">
        <div className="container split">
          <div className="split-copy">
            <p className="eyebrow">Athletics</p>
            <h2>Compete as a Heron.</h2>
            <p>
              GBCC is a member of the Yankee Small College Conference (YSCC)
              within the United States Collegiate Athletic Association (USCAA).
              Intramurals and the Fitness Center offer non-competitive ways to
              stay active too.
            </p>
            <ul className="check-list">
              {athleticTeams.map((team) => (
                <li key={team}>{team}</li>
              ))}
            </ul>
            <p className="fine-print">
              Athletics: (603) 427-7733 · greatbayathletics@ccsnh.edu
            </p>
          </div>
          <figure className="split-media">
            <img
              src="/images/graduation.jpg"
              alt="Great Bay students celebrating campus community"
            />
          </figure>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Clubs &amp; organizations</p>
            <h2>20+ ways to connect and lead.</h2>
            <p>
              Join an academic, cultural, recreational, or leadership group —
              or work with Student Life to start a new club.
            </p>
          </div>
          <div className="club-grid">
            {clubs.map((group) => (
              <article key={group.group} className="club-group">
                <h3>{group.group}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container area-grid">
          <article className="area-item">
            <h3>Student Success Center</h3>
            <p>
              A hub for student life, activities funding through SGA, and
              day-to-day support that keeps you connected to campus.
            </p>
          </article>
          <article className="area-item">
            <h3>Mental wellbeing</h3>
            <p>
              Confidential resources and referrals to help students manage
              stress, balance responsibilities, and stay on track.
            </p>
          </article>
          <article className="area-item">
            <h3>Wellness &amp; fitness</h3>
            <p>
              Use the Fitness Center, intramurals, and wellness programming to
              build healthy habits alongside your classes.
            </p>
          </article>
          <article className="area-item">
            <h3>Community resources</h3>
            <p>
              Local Seacoast supports for food, housing, transportation, and
              other needs that can affect student success.
            </p>
          </article>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-inner">
          <div>
            <p className="eyebrow light">Get involved</p>
            <h2>Your community is waiting.</h2>
            <p>
              Contact Student Life in the Student Success Center at (603)
              427-7632 to learn about clubs, events, and leadership roles.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="btn btn-gold" to="/admissions">
              Become a Student
            </Link>
            <Link className="btn btn-ghost-light" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default StudentExperience;
