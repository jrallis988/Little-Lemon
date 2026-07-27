import { Link } from "react-router-dom";
import { ShowPoster } from "./Illustrations";

export default function ContentRow({ id, title, shows }) {
  if (!shows?.length) return null;

  return (
    <section className="content-row" id={id} aria-labelledby={`${id}-title`}>
      <div className="content-row-head">
        <h2 className="content-row-title" id={`${id}-title`}>
          {title}
        </h2>
      </div>
      <div className="rail" role="list">
        {shows.map((show) => (
          <Link
            key={show.id}
            to={show.to}
            className={`rail-tile${show.featured ? " featured" : ""}`}
            role="listitem"
            aria-label={show.title}
          >
            <div className="rail-art">
              <ShowPoster id={`${id}-${show.id}`} colors={show.palette} title={show.title} />
              {typeof show.progress === "number" && (
                <div className="rail-progress" aria-hidden="true">
                  <span style={{ width: `${Math.round(show.progress * 100)}%` }} />
                </div>
              )}
            </div>
            <span className="rail-label">{show.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
