import { brand } from "../data/brand";
import "./CaseFrame.css";

export function IdeaSection() {
  return (
    <section className="section idea" id="idea-section">
      <div className="wrap">
        <p className="section__eyebrow">Creative philosophy</p>
        <p className="case-concept brand-mark">{brand.tagline}</p>
        <p className="idea__phil">{brand.philosophy}</p>
        <div className="case-grid">
          <article className="case-card">
            <h3>Audience</h3>
            <p>{brand.audience}</p>
          </article>
          <article className="case-card">
            <h3>Insight</h3>
            <p>
              Fans consume different kinds of sports content — but should
              immediately recognize the source.
            </p>
          </article>
          <article className="case-card">
            <h3>Strategy</h3>
            <p>
              One flexible COURTSIDE identity with design modes that support
              multiple recurring franchises without becoming six brands.
            </p>
          </article>
          <article className="case-card case-card--accent">
            <h3>Concept</h3>
            <p>
              Package every possession — story, number, or highlight — as a
              recognizable unit across long-form, Shorts, and social.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
