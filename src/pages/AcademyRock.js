import { useState } from "react";
import { Link } from "react-router-dom";
import { academyCast, academyEpisodes, getShowsByIds } from "../data/content";
import {
  AcademyStageArt,
  CastAvatar,
  EpisodeThumb,
  PlayIcon,
} from "../components/Illustrations";
import ContentRow from "../components/ContentRow";
import VideoPlayer from "../components/VideoPlayer";
import { useLibrary } from "../library/LibraryContext";

export default function AcademyRock() {
  const [activeId, setActiveId] = useState(academyEpisodes[0].id);
  const [autoPlay, setAutoPlay] = useState(false);
  const active = academyEpisodes.find((ep) => ep.id === activeId) || academyEpisodes[0];
  const { isInWatchlist, toggleWatchlist, markProgress, getProgress } = useLibrary();
  const saved = isInWatchlist("academy-rock");

  const playEpisode = (ep) => {
    setActiveId(ep.id);
    setAutoPlay(true);
    markProgress("academy-rock", Math.min(0.92, 0.12 + ep.number * 0.08));
    document.getElementById("player")?.scrollIntoView?.({ behavior: "smooth", block: "center" });
  };

  const handleProgress = (ratio) => {
    const base = (active.number - 1) / academyEpisodes.length;
    const within = ratio / academyEpisodes.length;
    markProgress("academy-rock", Math.min(0.95, base + within + 0.05));
  };

  return (
    <>
      <section className="hero title-hero schoolhouse-hero" aria-label="Academy Rock">
        <div className="hero-media">
          <AcademyStageArt />
        </div>
        <div className="hero-scrim schoolhouse-scrim" />
        <div className="hero-content schoolhouse-content">
          <p className="hero-eyebrow schoolhouse-eyebrow">Disney Jr · Educational Musical</p>
          <h1 className="hero-title-logo schoolhouse-title">
            Academy <span>Rock</span>
          </h1>
          <p className="hero-meta">2024 · 1 Season · 5 Shorts · Ages 2–5 · Learn & Sing</p>
          <p className="hero-lede">
            Catchy classroom anthems that stick — letters, numbers, shapes, and kindness, set to a
            beat kids can’t stop humming.
          </p>
          <div className="hero-ctas">
            <button
              type="button"
              className="btn btn-play btn-schoolhouse"
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

      <div className="catalog title-catalog schoolhouse-catalog">
        <section className="section episodes-section" id="episodes" aria-labelledby="episodes-title">
          <div className="section-head">
            <h2 className="content-row-title schoolhouse-section-title" id="episodes-title">
              Lesson Songs
            </h2>
            <p className="section-copy">Season 1 · Short musical shorts for little learners</p>
          </div>

          <div className="episode-list schoolhouse-episodes">
            {academyEpisodes.map((ep) => (
              <button
                key={ep.id}
                type="button"
                className={`episode chalk-card${ep.id === activeId ? " active" : ""}`}
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
                  <p className="episode-subject">{ep.subject}</p>
                  <p>{ep.description}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="player-panel schoolhouse-player" id="player" aria-live="polite">
            <div className="player-stage has-video">
              <VideoPlayer
                key={active.id}
                src={active.videoUrl}
                title={`Academy Rock · ${active.title}`}
                autoPlay={autoPlay}
                onProgress={handleProgress}
                onEnded={() => {
                  const next = academyEpisodes.find((ep) => ep.number === active.number + 1);
                  if (next) playEpisode(next);
                }}
              />
            </div>
            <div className="player-copy">
              <p className="player-ep-label">
                {active.subject} · Episode {active.number} · {active.duration}
              </p>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="cast-title">
          <div className="section-head">
            <h2 className="content-row-title schoolhouse-section-title" id="cast-title">
              Class Band
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
            "count-with-coco",
            "rainbow-bus",
            "sunny-paws",
            "garden-grove",
            "starlight-story",
          ]).map((s) => ({ ...s, progress: getProgress(s.id) ?? s.progress }))}
        />
      </div>
    </>
  );
}
