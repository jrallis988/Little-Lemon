import {
  CourtDiagram,
  FreezeAnnotation,
  HeatMap,
  PassRoutes,
  PlayerTrack,
  PossessionBreakdown,
  ShotChart,
} from "../components/FilmGraphics";
import { StatCard } from "../components/StatCard";
import { VideoFrame } from "../components/VideoFrame";
import { photos } from "../data/brand";

export function FilmRoom() {
  return (
    <section className="section section--emphasis" id="filmroom">
      <div className="wrap">
        <p className="section__eyebrow">Priority board · Performance mode</p>
        <h2 className="section__title">Film Room Language</h2>
        <p className="section__lede">
          A visual language for explaining sports — tracking, routes, heat,
          freeze-frame notes — not just showing highlights.
        </p>

        <VideoFrame photo={photos.filmRoom} label="Series open">
          <div className="pkg-open">
            <span className="series-tag" style={{ color: "var(--series-film)" }}>
              FILM ROOM
            </span>
            <strong className="pkg-open__name">WHY THIS WORKS</strong>
          </div>
        </VideoFrame>

        <div className="pkg-grid pkg-grid--3" style={{ marginTop: "1.25rem" }}>
          <CourtDiagram />
          <ShotChart />
          <HeatMap />
        </div>

        <div className="pkg-grid" style={{ marginTop: "1.25rem" }}>
          <PassRoutes />
          <FreezeAnnotation />
        </div>

        <div className="pkg-grid" style={{ marginTop: "1.25rem" }}>
          <PlayerTrack />
          <StatCard
            variant="compare"
            title="VALE"
            subtitle="Player comparison"
            stats={[
              { label: "PPG", value: "22.1" },
              { label: "FG%", value: "48" },
              { label: "3PT", value: "39%" },
              { label: "STL", value: "1.8" },
            ]}
            compareName="LEAGUE"
            compareStats={[
              { label: "PPG", value: "18.4" },
              { label: "FG%", value: "45" },
              { label: "3PT", value: "35%" },
              { label: "STL", value: "1.1" },
            ]}
          />
        </div>

        <div style={{ marginTop: "1.25rem" }}>
          <h3 style={{ marginBottom: "0.75rem", fontSize: "1.1rem" }}>
            Possession Breakdown
          </h3>
          <PossessionBreakdown />
        </div>
      </div>
    </section>
  );
}
