import { assets, photoLanguage } from "../data/content";
import { MediaSlot } from "./MediaSlot";

export function PhotoLanguage() {
  return (
    <section className="section photo-lang" id="photo" aria-labelledby="photo-title">
      <div className="section__inner">
        <p className="section__eyebrow">08 — Photographic Language</p>
        <h2 id="photo-title" className="section__title">
          Performance and culture.
        </h2>
        <p className="section__lead">
          Not only full-body game action. Ice-level, spray, equipment, bench, and decision faces —
          the campaign shows how hockey feels between the highlights.
        </p>
        <ul className="photo-lang__grid">
          {photoLanguage.map((shot) => (
            <li key={shot.id}>
              <MediaSlot
                src={assets[shot.srcKey]}
                label={shot.title}
                framed
                ratio="5 / 4"
              />
              <h3>{shot.title}</h3>
              <p>{shot.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
