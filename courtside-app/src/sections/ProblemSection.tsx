import { brand, photos } from "../data/brand";
import "./ProblemSection.css";

export function ProblemSection() {
  return (
    <section className="section problem" id="challenge">
      <div className="wrap problem__grid">
        <div>
          <p className="section__eyebrow">What COURTSIDE solves</p>
          <h2 className="section__title">One channel. Many formats. No system.</h2>
          <p className="problem__body">{brand.problem}</p>
          <ul className="problem__list">
            <li>Athlete stories and interviews</li>
            <li>Film / strategy analysis</li>
            <li>Training and skill content</li>
            <li>Gear and product reviews</li>
            <li>Game-day and live energy</li>
            <li>Culture, fans, and community</li>
          </ul>
          <p className="problem__result">
            Without a shared system, each format invents its own look — and the
            channel stops feeling like one brand.
          </p>
        </div>
        <div className="problem__mosaic" aria-hidden="true">
          <img src={photos.athleteWoman} alt="" />
          <img src={photos.filmRoom} alt="" />
          <img src={photos.gearSneaker} alt="" />
          <img src={photos.crowdFans} alt="" />
          <img src={photos.soccerAthlete} alt="" />
          <img src={photos.teamHuddle} alt="" />
        </div>
      </div>
    </section>
  );
}
