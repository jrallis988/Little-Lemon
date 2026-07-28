import { SITE } from "../data";

export default function About() {
  const { history } = SITE;

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <p className="section__eyebrow">{history.eyebrow}</p>
      <h2 className="section__title" id="about-title">
        {history.title}
      </h2>
      <p className="section__copy">{history.copy}</p>
      <ul className="about__points">
        {history.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </section>
  );
}
