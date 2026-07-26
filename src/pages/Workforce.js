import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { workforceTracks } from "../data/siteContent";

function Workforce() {
  return (
    <>
      <PageHero
        brand="Workforce Development"
        title="Train for the job. Strengthen the North Country."
        copy="WMCC partners with businesses and learners on short-term skills training, professional development, and customized employer programs."
        image="/images/welding.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Business &amp; community training</p>
            <h2>Affordable pathways to upskill and reskill.</h2>
            <p>
              Advance personal, organizational, and regional economic growth with
              training offered on campus in Berlin, at the Littleton Academic
              Center, online, or at your worksite.
            </p>
          </div>
          <div className="area-grid">
            {workforceTracks.map((track) => (
              <article key={track.title} className="area-item">
                <h3>{track.title}</h3>
                <p>{track.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container split">
          <div className="split-copy">
            <p className="eyebrow">How to get started</p>
            <h2>Three easy ways to begin.</h2>
            <ol className="numbered-list">
              <li>Browse current workforce offerings on wmcc.edu.</li>
              <li>
                Contact the Berlin campus to discuss customized training for your
                team.
              </li>
              <li>
                Call{" "}
                <a href="tel:6037521113">(603) 752-1113</a> to register or ask
                about upcoming sessions.
              </li>
            </ol>
            <p>
              From CDL and welding to healthcare and culinary skills, WMCC helps
              learners move quickly from training to work.
            </p>
          </div>
          <div className="info-panel">
            <h3>Employer partnerships</h3>
            <p>
              We work with manufacturers, healthcare providers, municipalities,
              hospitality businesses, and community organizations across northern
              New Hampshire.
            </p>
            <ul>
              <li>
                <a href="tel:6037521113">(603) 752-1113</a>
              </li>
              <li>
                <a href="mailto:wmcc@ccsnh.edu">wmcc@ccsnh.edu</a>
              </li>
            </ul>
            <Link className="btn btn-gold" to="/contact">
              Request Training Info
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Workforce;
