import { PlaylistIdentity } from "../components/PlaylistIdentity";
import { athletes, photos, seriesList } from "../data/brand";
import "./ContentSystem.css";

export function ContentSystem() {
  return (
    <section className="section section--dark" id="series">
      <div className="wrap">
        <p className="section__eyebrow">Content architecture</p>
        <h2 className="section__title">Six series. Controlled difference.</h2>
        <p className="section__lede">
          Each franchise gets a mode, accent role, and graphic device — still
          clearly COURTSIDE. Distinguishable. Unified.
        </p>
        <div className="grid-3">
          {seriesList.map((s) => (
            <div key={s.id} className="series-wrap">
              <PlaylistIdentity series={s} />
              <ul className="series-meta">
                <li>
                  <strong>Mode</strong> {s.mode}
                </li>
                <li>
                  <strong>Accent</strong> {s.accentRole}
                </li>
                <li>
                  <strong>Device</strong> {s.device}
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="roster" style={{ marginTop: "2.5rem" }}>
          <h3 className="brand-block__h">Roster range — not one athlete</h3>
          <div className="roster__grid">
            {athletes.map((a) => (
              <figure key={a.id} className="roster__card">
                <img src={a.photo} alt="" />
                <figcaption>
                  <strong>{a.nameUpper}</strong>
                  <span>
                    {a.role} · {a.sport}
                  </span>
                </figcaption>
              </figure>
            ))}
            <figure className="roster__card">
              <img src={photos.crowdFans} alt="" />
              <figcaption>
                <strong>FANS</strong>
                <span>Crowd · Culture</span>
              </figcaption>
            </figure>
            <figure className="roster__card">
              <img src={photos.teamHuddle} alt="" />
              <figcaption>
                <strong>TEAM</strong>
                <span>Collective · Game Day</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
