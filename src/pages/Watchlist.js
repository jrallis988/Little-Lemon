import { Link } from "react-router-dom";
import { ShowPoster } from "../components/Illustrations";
import { useLibrary } from "../library/LibraryContext";

export default function Watchlist() {
  const { watchlistShows, toggleWatchlist, getProgress } = useLibrary();

  return (
    <div className="page-panel watchlist-page">
      <header className="page-panel-head">
        <p className="hero-eyebrow">My Stuff</p>
        <h1 className="page-panel-title">Watchlist</h1>
        <p className="page-panel-copy">
          Save shows for later. Add titles from Academy Rock or any poster rail.
        </p>
      </header>

      {watchlistShows.length === 0 ? (
        <div className="empty-state-card">
          <p className="empty-state">Your watchlist is empty.</p>
          <Link to="/disney-jr" className="btn btn-play">
            Browse Disney Jr.
          </Link>
        </div>
      ) : (
        <div className="poster-grid" role="list">
          {watchlistShows.map((show) => {
            const progress = getProgress(show.id) ?? show.progress;
            return (
              <div key={show.id} className="watchlist-card" role="listitem">
                <Link to={show.to} className="rail-tile" aria-label={show.title}>
                  <div className="rail-art">
                    <ShowPoster
                      id={`watchlist-${show.id}`}
                      colors={show.palette}
                      title={show.title}
                    />
                    {typeof progress === "number" && (
                      <div className="rail-progress" aria-hidden="true">
                        <span style={{ width: `${Math.round(progress * 100)}%` }} />
                      </div>
                    )}
                  </div>
                  <span className="rail-label">{show.title}</span>
                  <span className="rail-sub">{show.meta}</span>
                </Link>
                <button
                  type="button"
                  className="btn btn-details watchlist-remove"
                  onClick={() => toggleWatchlist(show.id)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
