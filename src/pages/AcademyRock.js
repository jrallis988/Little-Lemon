import { useState } from "react";
import { Link } from "react-router-dom";
import { academyCast, academyEpisodes } from "../data/content";
import {
  AcademyStageArt,
  CastAvatar,
  EpisodeThumb,
  PlayerArt,
} from "../components/Illustrations";

export default function AcademyRock() {
  const [activeId, setActiveId] = useState(academyEpisodes[0].id);
  const active = academyEpisodes.find((ep) => ep.id === activeId) || academyEpisodes[0];

  return (
    <>
      <section className="rock-hero" aria-label="Academy Rock">
        <div className="rock-hero-media">
          <AcademyStageArt />
        </div>
        <div className="rock-hero-scrim" />
        <div className="rock-hero-content">
          <p className="section-kicker" style={{ color: "var(--rock-neon)", marginBottom: "0.75rem" }}>
            Disney Jr original
          </p>
          <h1 className="rock-logo">
            <span>Disney Jr presents</span>
            Academy Rock
          </h1>
          <p>
            A music-filled series where kids find their voice, share the spotlight, and turn
            every oops into an encore.
          </p>
          <div className="rock-hero-ctas">
            <button
              type="button"
              className="btn btn-rock"
              onClick={() => {
                document.getElementById("episodes")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Play episode 1
            </button>
            <Link to="/" className="btn btn-ghost">
              Back to Disney Jr
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="episodes" aria-labelledby="episodes-title">
        <div className="section-head">
          <p className="section-kicker">Season 1</p>
          <h2 className="section-title" id="episodes-title">
            Episodes
          </h2>
          <p className="section-copy">
            Tap an episode to preview it on the stage. Perfect for short, joyful watch-together
            moments.
          </p>
        </div>

        <div className="episode-list">
          {academyEpisodes.map((ep) => (
            <button
              key={ep.id}
              type="button"
              className={`episode${ep.id === activeId ? " active" : ""}`}
              onClick={() => setActiveId(ep.id)}
              aria-pressed={ep.id === activeId}
            >
              <div className="episode-thumb">
                <EpisodeThumb color={ep.color} />
              </div>
              <div className="episode-info">
                <h3>
                  {ep.number}. {ep.title}
                </h3>
                <p>{ep.description}</p>
              </div>
              <span className="episode-meta">{ep.duration}</span>
            </button>
          ))}
        </div>

        <div className="player-panel" aria-live="polite">
          <div className="player-stage">
            <PlayerArt color={active.color} />
            <div className="player-label">
              <span>
                Now playing · Ep {active.number}
              </span>
              <span>{active.duration}</span>
            </div>
          </div>
          <div className="player-copy">
            <h3>{active.title}</h3>
            <p>{active.description}</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="cast-title">
        <div className="section-head">
          <p className="section-kicker">Meet the band</p>
          <h2 className="section-title" id="cast-title">
            Friends of Academy Rock
          </h2>
          <p className="section-copy">
            Every instrument has a personality—and every friend has a solo waiting to shine.
          </p>
        </div>
        <div className="cast-row">
          {academyCast.map((member) => (
            <article key={member.id} className="cast-item">
              <div className="cast-avatar">
                <CastAvatar colors={member.colors} name={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
