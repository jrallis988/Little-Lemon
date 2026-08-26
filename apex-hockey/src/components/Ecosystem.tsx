import { ecosystem } from "../data/content";

export function Ecosystem() {
  return (
    <section className="section ecosystem" id="ecosystem" aria-labelledby="eco-title">
      <div className="section__inner">
        <p className="section__eyebrow">09 — Beyond Social</p>
        <h2 id="eco-title" className="section__title">
          A campaign inside hockey.
        </h2>
        <p className="section__lead">
          APEX should feel capable of living in the rink environment — boards, scoreboards,
          clinics, equipment — with social as one channel, not the whole idea.
        </p>
        <ul className="ecosystem__grid">
          {ecosystem.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
