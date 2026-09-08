import { Link } from "react-router-dom";
import { getShowsByIds, homeRows } from "../data/content";
import { HeroStageArt, PlayIcon } from "../components/Illustrations";
import BrandRow from "../components/BrandRow";
import ContentRow from "../components/ContentRow";
import { useLibrary } from "../library/LibraryContext";

export default function Home() {
  const { continueShows, getProgress } = useLibrary();

  const rows = homeRows.map((row) => {
    if (row.id === "continue") {
      return {
        ...row,
        shows: continueShows.length
          ? continueShows
          : getShowsByIds(row.showIds).map((s) => ({
              ...s,
              progress: getProgress(s.id) ?? s.progress,
            })),
      };
    }
    return {
      ...row,
      shows: getShowsByIds(row.showIds).map((s) => ({
        ...s,
        progress: getProgress(s.id) ?? s.progress,
      })),
    };
  });

  return (
    <>
      <section className="hero" aria-label="Featured: Academy Rock">
        <div className="hero-media">
          <HeroStageArt />
        </div>
        <div className="hero-scrim" />
        <div className="hero-content">
          <p className="hero-eyebrow">Disney Jr · Original Series</p>
          <h1 className="hero-title-logo">Academy Rock</h1>
          <p className="hero-meta">2024 · 1 Season · Ages 2–5 · Music</p>
          <p className="hero-lede">
            Kids find their voice, share the spotlight, and turn every oops into an encore.
          </p>
          <div className="hero-ctas">
            <Link to="/academy-rock" className="btn btn-play">
              <PlayIcon /> Play
            </Link>
            <Link to="/disney-jr" className="btn btn-details">
              Explore Disney Jr.
            </Link>
          </div>
        </div>
      </section>

      <div className="catalog">
        <BrandRow />

        {rows.map((row) => (
          <ContentRow key={row.id} id={row.id} title={row.title} shows={row.shows} />
        ))}
      </div>
    </>
  );
}
