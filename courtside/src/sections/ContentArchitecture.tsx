import { PlaylistIdentity } from "../components/PlaylistIdentity";
import { seriesList } from "../data/brand";

export function ContentArchitecture() {
  return (
    <section className="section section--dark" id="series">
      <div className="wrap">
        <p className="section__eyebrow">03 · Content Architecture</p>
        <h2 className="section__title">Six Series. One Brand.</h2>
        <p className="section__lede">
          Each franchise gets a recognizable accent and photo language inside
          the COURTSIDE system — not six unrelated brands.
        </p>
        <div className="grid-3">
          {seriesList.map((s) => (
            <PlaylistIdentity key={s.id} series={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
