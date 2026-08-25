import { brand } from "../data/brand";
import "./CaseFrame.css";

const pillars = [
  {
    title: "Challenge",
    body: "Create a scalable visual identity for a modern basketball media channel.",
  },
  {
    title: "Audience",
    body: brand.audience,
  },
  {
    title: "Insight",
    body: "Sports audiences consume different kinds of basketball content but should immediately recognize the source.",
  },
  {
    title: "Strategy",
    body: "Create one flexible COURTSIDE identity capable of supporting multiple recurring content franchises.",
  },
];

export function CaseFrame() {
  return (
    <section className="section" id="challenge">
      <div className="wrap">
        <p className="section__eyebrow">Case Study</p>
        <h2 className="section__title">Concept</h2>
        <p className="case-concept brand-mark">{brand.tagline}</p>
        <div className="case-grid">
          {pillars.map((p) => (
            <article key={p.title} className="case-card">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
