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
      <section className="hero schoolhouse-hero" aria-label="Featured: Academy Rock">
        <div className="hero-media">
          <HeroStageArt />
        </div>
        <div className="hero-scrim schoolhouse-scrim" />
        <div className="hero-content schoolhouse-content">
          <p className="hero-eyebrow schoolhouse-eyebrow">Disney Jr · Educational Musical</p>
          <h1 className="hero-title-logo schoolhouse-title">
            Academy <span>Rock</span>
          </h1>
          <p className="hero-meta">2024 · 1 Season · Ages 2–5 · Learn & Sing</p>
          <p className="hero-lede">
            Catchy classroom anthems that stick — letters, numbers, and kindness set to a beat.
          </p>
          <div className="hero-ctas">
            <Link to="/academy-rock" className="btn btn-play btn-schoolhouse">
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
