import { brand } from "../data/brand";
import { Logo } from "../components/Logo";
import "./Closing.css";

const outputs = [
  { n: "1", l: "Sports media identity" },
  { n: "6+", l: "Content series" },
  { n: "4", l: "Design modes" },
  { n: "∞", l: "Video formats" },
  { n: "2", l: "Desktop + mobile" },
  { n: "2", l: "Long-form + short-form" },
  { n: "3", l: "Motion + data + social" },
  { n: "1", l: "Scalable design system" },
];

export function Closing() {
  return (
    <section className="section section--dark closing" id="closing">
      <div className="wrap">
        <p className="section__eyebrow">Final system</p>
        <h2 className="section__title">Delivered</h2>
        <div className="closing__outputs">
          {outputs.map((o) => (
            <article key={o.l}>
              <strong className="num-display">{o.n}</strong>
              <span>{o.l}</span>
            </article>
          ))}
        </div>
        <div className="closing__end">
          <Logo variant="wordmark" inverted />
          <p className="closing__tag">{brand.tagline}</p>
          <p className="closing__disclaimer">{brand.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
