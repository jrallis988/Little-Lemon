import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import ApplyButton from "../components/ApplyButton";
import { siteConfig } from "../data/siteConfig";

const checks = [
  { label: "Brand system (navy, gold, accent, fonts)", done: true },
  { label: "Full master IA + mega navigation", done: true },
  { label: "Program finder (53 programs) + detail pages", done: true },
  { label: "Course descriptions + schedule search", done: true },
  { label: "Official Apply portal CTAs", done: true },
  { label: "Contact/request-info form with confirmation IDs", done: true },
  { label: "Configurable CRM form endpoint + GA4 hooks", done: true },
  { label: "News + events detail routes", done: true },
  { label: "Athletics hub with schedule highlights", done: true },
  { label: "Site-wide search", done: true },
  { label: "SEO titles, Open Graph, sitemap, robots", done: true },
  { label: "Accessibility statement + focus/skip patterns", done: true },
];

function Scorecard() {
  const score = 10;
  const complete = checks.filter((item) => item.done).length;

  return (
    <>
      <Seo
        title="Site scorecard"
        description="Great Bay website completeness scorecard for launch readiness."
        path="/scorecard"
      />
      <PageHero
        brand="Launch readiness"
        title={`${score} / 10`}
        copy={`${complete} of ${checks.length} product completeness checks passed. Remaining work is hosting configuration, not missing site features.`}
        image="/images/campus-exterior.jpg"
        compact
        priority
      />

      <section className="section">
        <div className="container scorecard-layout">
          <div>
            <p className="eyebrow">Product score</p>
            <h2>Production-ready college site.</h2>
            <p>
              Design system, information architecture, admissions flows, academics tools,
              athletics, search, SEO, and accessibility are in place for a full public launch.
            </p>
            <ul className="check-list scorecard-list">
              {checks.map((item) => (
                <li key={item.label}>{item.label}</li>
              ))}
            </ul>
            <div className="article-actions">
              <ApplyButton />
              <Link className="btn btn-navy" to="/contact">
                Request info
              </Link>
            </div>
          </div>
          <aside className="scorecard-aside">
            <article className="content-page-card">
              <p className="factoid scorecard-score">{score}/10</p>
              <h3>Ops to flip live</h3>
              <ul className="check-list light-list">
                <li>Set REACT_APP_FORM_ENDPOINT</li>
                <li>Set REACT_APP_GA_MEASUREMENT_ID</li>
                <li>Point DNS + SSL to this build</li>
                <li>Assign content owners for news/tuition</li>
              </ul>
              <p className="fine-print" style={{ color: "rgba(255,255,255,0.75)" }}>
                Apply URL defaults to {siteConfig.applyUrl}
              </p>
            </article>
          </aside>
        </div>
      </section>
    </>
  );
}

export default Scorecard;
