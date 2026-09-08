import { useState } from "react";
import { Link } from "react-router-dom";
import { academyCast, academyEpisodes, getShowsByIds } from "../data/content";
import {
  AcademyStageArt,
  CastAvatar,
  EpisodeThumb,
  PlayIcon,
  PlayerArt,
} from "../components/Illustrations";
import ContentRow from "../components/ContentRow";
import { useLibrary } from "../library/LibraryContext";

export default function AcademyRock() {
  const [activeId, setActiveId] = useState(academyEpisodes[0].id);
  const active = academyEpisodes.find((ep) => ep.id === activeId) || academyEpisodes[0];
  const { isInWatchlist, toggleWatchlist, markProgress, getProgress } = useLibrary();
  const saved = isInWatchlist("academy-rock");

  const playEpisode = (ep) => {
    setActiveId(ep.id);
    // Progress climbs with later episodes so Continue Watching feels real
    const progress = Math.min(0.92, 0.18 + ep.number * 0.14);
    markProgress("academy-rock", progress);
    document.getElementById("player")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <section className="hero title-hero" aria-label="Academy Rock">
        <div className="hero-media">
          <AcademyStageArt />
        </div>
        <div className="hero-scrim" />
        <div className="hero-content">
          <p className="hero-eyebrow">Disney Jr Original</p>
          <h1 className="hero-title-logo">Academy Rock</h1>
          <p className="hero-meta">2024 · 1 Season · 5 Episodes · Ages 2–5</p>
          <p className="hero-lede">
            A music-filled series where kids find their voice, share the spotlight, and turn every
            oops into an encore.
          </p>
          <div className="hero-ctas">
            <button
              type="button"
              className="btn btn-play"
              onClick={() => playEpisode(academyEpisodes[0])}
            >
              <PlayIcon /> Play Episode 1
            </button>
            <button
              type="button"
              className="btn btn-details"
              onClick={() => toggleWatchlist("academy-rock")}
              aria-pressed={saved}
            >
              {saved ? "In Watchlist" : "+ Watchlist"}
            </button>
            <Link to="/search" className="btn btn-details">
              More Like This
            </Link>
          </div>
        </div>
      </section>

      <div className="catalog title-catalog">
        <section className="section episodes-section" id="episodes" aria-labelledby="episodes-title">
          <div className="section-head">
            <h2 className="content-row-title" id="episodes-title">
              Episodes
            </h2>
            <p className="section-copy">Season 1</p>
          </div>

          <div className="episode-list">
            {academyEpisodes.map((ep) => (
              <button
                key={ep.id}
                type="button"
                className={`episode${ep.id === activeId ? " active" : ""}`}
                onClick={() => playEpisode(ep)}
                aria-pressed={ep.id === activeId}
              >
                <span className="episode-num">{ep.number}</span>
                <div className="episode-thumb">
                  <EpisodeThumb color={ep.color} />
                </div>
                <div className="episode-info">
                  <div className="episode-top">
                    <h3>{ep.title}</h3>
                    <span className="episode-meta">{ep.duration}</span>
                  </div>
                  <p>{ep.description}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="player-panel" id="player" aria-live="polite">
            <div className="player-stage">
              <PlayerArt color={active.color} />
              <div className="player-label">
                <span className="btn btn-play player-play-badge">
                  <PlayIcon /> Playing · Ep {active.number}
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
            <h2 className="content-row-title" id="cast-title">
              Suggested
            </h2>
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

        <ContentRow
          id="more-like"
          title="More Like This"
          shows={getShowsByIds([
            "sunny-paws",
            "rainbow-bus",
            "little-harbor",
            "count-with-coco",
            "starlight-story",
          ]).map((s) => ({ ...s, progress: getProgress(s.id) ?? s.progress }))}
        />
      </div>
    </>
  );
}
