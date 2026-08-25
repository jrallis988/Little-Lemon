import { EndScreenPreview } from "../components/EndScreenPreview";
import { LowerThird } from "../components/LowerThird";
import { VideoFrame } from "../components/VideoFrame";
import { photos } from "../data/brand";
import "./Packages.css";

export function GameDayPackage() {
  return (
    <section className="section section--dark" id="gameday">
      <div className="wrap">
        <p className="section__eyebrow">11 · Game-Day Package</p>
        <h2 className="section__title">Fast. Exciting. On Brand.</h2>
        <p className="section__lede">
          Higher energy treatment for competition coverage — still clearly COURTSIDE.
        </p>

        <div className="pkg-grid pkg-grid--3">
          <VideoFrame photo={photos.gamedayArena} label="Pregame title">
            <div className="pkg-open">
              <span className="series-tag">GAME DAY</span>
              <strong className="pkg-open__name">TIP-OFF</strong>
            </div>
          </VideoFrame>
          <VideoFrame photo={photos.gamedayArena} label="Location">
            <div className="pkg-loc">
              <span>ARENA</span>
              <strong>RIVERFRONT GARDEN</strong>
              <span>BROOKLYN, NY</span>
            </div>
          </VideoFrame>
          <VideoFrame photo={photos.actionDrive} label="Matchup">
            <div className="gd-match">
              <span>METRO</span>
              <em>VS</em>
              <span>COAST</span>
            </div>
          </VideoFrame>
        </div>

        <div className="pkg-grid pkg-grid--3" style={{ marginTop: "1.25rem" }}>
          <VideoFrame label="Score graphic">
            <div className="gd-score">
              <span>Q3 · 4:12</span>
              <strong>78–74</strong>
            </div>
          </VideoFrame>
          <VideoFrame photo={photos.athletePortrait} label="Player intro">
            <div className="pkg-corner">
              <LowerThird
                kind="athlete"
                primary="MARCUS REED"
                secondary="Starting PG · #3"
                animate={false}
              />
            </div>
          </VideoFrame>
          <VideoFrame label="Halftime">
            <div className="gd-score">
              <span>HALFTIME</span>
              <strong>42–39</strong>
            </div>
          </VideoFrame>
        </div>

        <div className="pkg-grid" style={{ marginTop: "1.25rem" }}>
          <VideoFrame label="Final score">
            <div className="gd-score">
              <span>FINAL</span>
              <strong style={{ color: "var(--cs-signal)" }}>104–98</strong>
            </div>
          </VideoFrame>
          <EndScreenPreview layout="recommended" />
        </div>
      </div>
    </section>
  );
}
