import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { clubs } from "../data/siteContent";

function StudentExperience() {
  return (
    <>
      <PageHero
        brand="Student Experience"
        title="Life beyond the classroom."
        copy="Clubs, wellness resources, advising, and a welcoming North Country campus community — built to help you belong, lead, and thrive at WMCC."
        image="/images/students.jpg"
      />

      <section className="section">
        <div className="container split">
          <div className="split-copy">
            <p className="eyebrow">Campus community</p>
            <h2>Belong in the White Mountains.</h2>
            <p>
              From student organizations to outdoor recreation nearby, WMCC
              connects academic momentum with a supportive community in Berlin
              and Littleton.
            </p>
            <ul className="check-list">
              <li>Student Senate leadership opportunities</li>
              <li>Honor society and academic clubs</li>
              <li>Events that bring campus together</li>
              <li>Access to advising, tutoring, and wellness support</li>
            </ul>
          </div>
          <figure className="split-media">
            <img
              src="/images/graduation.jpg"
              alt="White Mountains Community College students celebrating campus community"
            />
          </figure>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Clubs &amp; organizations</p>
            <h2>Ways to connect and lead.</h2>
            <p>
              Join an academic, leadership, or interest group — or talk with
              Student Life about getting involved.
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
            <h3>Academic support</h3>
            <p>
              Advising and tutoring help you stay on track from your first
              semester through graduation or transfer.
            </p>
          </article>
          <article className="area-item">
            <h3>Mental wellbeing</h3>
            <p>
              Confidential resources and referrals help students manage stress,
              balance responsibilities, and stay focused.
            </p>
          </article>
          <article className="area-item">
            <h3>Accessibility services</h3>
            <p>
              Students can request accommodations and support that make campus
              learning more accessible.
            </p>
          </article>
          <article className="area-item">
            <h3>North Country resources</h3>
            <p>
              Local supports for food, transportation, housing, and other needs
              that can affect student success.
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
              Contact Student Life or Admissions to learn about clubs, events,
              and support services at WMCC.
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
