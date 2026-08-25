import { brand } from "../data/brand";
import { Logo } from "../components/Logo";
import "./Closing.css";

const delivered = [
  "Brand System",
  "Channel Identity",
  "Content Architecture",
  "Thumbnail System",
  "Athlete Package",
  "Film Room",
  "Training",
  "Gear",
  "Game Day",
  "Motion",
  "Shorts",
  "Content Ecosystem",
  "Performance Thinking",
];

export function Closing() {
  return (
    <section className="section section--dark closing" id="closing">
      <div className="wrap">
        <p className="section__eyebrow">21 · Case Study</p>
        <h2 className="section__title">Delivered</h2>
        <ul className="closing__list">
          {delivered.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <div className="closing__end">
          <Logo variant="wordmark" inverted />
          <p className="closing__tag">{brand.tagline}</p>
          <p className="closing__disclaimer">{brand.disclaimer}</p>
          <p className="closing__apps">
            Demonstrates workflow thinking across Photoshop, Illustrator, After
            Effects, Premiere Pro, and Figma — with replaceable asset slots in this
            React presentation.
          </p>
        </div>
      </div>
    </section>
  );
}
