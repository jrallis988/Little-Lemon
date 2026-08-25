import {
  CourtDiagram,
  PossessionBreakdown,
  ShotChart,
} from "../components/FilmGraphics";
import { StatCard } from "../components/StatCard";
import { VideoFrame } from "../components/VideoFrame";
import { photos } from "../data/brand";

export function FilmRoom() {
  return (
    <section className="section" id="filmroom">
      <div className="wrap">
        <p className="section__eyebrow">08 · Film Room Graphics</p>
        <h2 className="section__title">Sports Editorial Analysis</h2>
        <p className="section__lede">
          Player stats, shot charts, court diagrams, comparisons, and possession
          breakdowns — understandable, branded, never financial-software chrome.
        </p>

        <div className="pkg-grid" style={{ marginBottom: "1.25rem" }}>
          <VideoFrame photo={photos.filmRoom} label="Series open">
            <div className="pkg-open">
              <span className="series-tag" style={{ color: "var(--series-film)" }}>
                FILM ROOM
              </span>
              <strong className="pkg-open__name">WHY THIS WORKS</strong>
            </div>
          </VideoFrame>
          <StatCard
            variant="compare"
            title="REED"
            subtitle="Player comparison"
            stats={[
              { label: "PPG", value: "27.4" },
              { label: "APG", value: "6.7" },
              { label: "TS%", value: "61" },
              { label: "USG", value: "28%" },
            ]}
            compareName="LEAGUE AVG"
            compareStats={[
              { label: "PPG", value: "22.1" },
              { label: "APG", value: "5.2" },
              { label: "TS%", value: "57" },
              { label: "USG", value: "24%" },
            ]}
          />
        </div>

        <div className="pkg-grid pkg-grid--3">
          <CourtDiagram />
          <ShotChart />
          <StatCard
            variant="game"
            title="GAME"
            subtitle="Final box"
            stats={[
              { label: "PTS", value: "32" },
              { label: "REB", value: "9" },
              { label: "AST", value: "8" },
              { label: "FG", value: "12-21" },
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
