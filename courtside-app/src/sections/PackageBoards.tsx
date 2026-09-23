import { EndScreenPreview } from "../components/EndScreenPreview";
import { LowerThird } from "../components/LowerThird";
import { StatCard } from "../components/StatCard";
import { VideoFrame } from "../components/VideoFrame";
import { YouTubeThumbnail } from "../components/YouTubeThumbnail";
import { athletes, photos, thumbnails } from "../data/brand";
import "./Packages.css";

/** Condensed editorial + training + game packages — multi-athlete. */
export function PackageBoards() {
  return (
    <>
      <section className="section" id="interview">
        <div className="wrap">
          <p className="section__eyebrow">Editorial mode</p>
          <h2 className="section__title">Athlete packages</h2>
          <p className="section__lede">
            Interview and profile systems support the subject — across athletes,
            not a single-player campaign.
          </p>
          <div className="pkg-grid">
            <YouTubeThumbnail concept={thumbnails[0]} showCategory />
            <VideoFrame photo={photos.athleteWoman} label="Opening · Editorial">
              <div className="pkg-cinematic">
                <span className="pkg-cinematic__series">THE PLAYER</span>
                <strong className="pkg-cinematic__name">
                  {athletes[1].nameUpper}
                </strong>
                <span className="pkg-cinematic__title">THE WORK NOBODY SEES</span>
              </div>
            </VideoFrame>
          </div>
          <div className="pkg-grid pkg-grid--3" style={{ marginTop: "1.25rem" }}>
            <VideoFrame photo={photos.athleteYouth} label="Younger athlete">
              <div className="pkg-corner">
                <LowerThird
                  kind="athlete"
                  primary={athletes[2].nameUpper}
                  secondary={`${athletes[2].role} · ${athletes[2].team}`}
                  animate={false}
                />
              </div>
            </VideoFrame>
            <VideoFrame photo={photos.coachWoman} label="Coach ID">
              <div className="pkg-corner">
                <LowerThird
                  kind="coach"
                  primary={athletes[4].nameUpper}
                  secondary="Head Coach · Metro United"
                  animate={false}
                />
              </div>
            </VideoFrame>
            <StatCard
              variant="card"
              title={athletes[1].nameUpper}
              subtitle="Season"
              stats={[
                { label: "PPG", value: "22.1" },
                { label: "RPG", value: "7.4" },
                { label: "APG", value: "3.2" },
                { label: "3PT", value: "39%" },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section section--dark" id="lab">
        <div className="wrap">
          <p className="section__eyebrow">Performance mode · Education</p>
          <h2 className="section__title">THE LAB</h2>
          <p className="section__lede">
            Cyan instruction system — clearer teaching without looking like a
            fitness app.
          </p>
          <div className="pkg-grid">
            <YouTubeThumbnail concept={thumbnails[4]} showCategory />
            <VideoFrame photo={photos.trainingLab} label="Opening">
              <div className="pkg-open">
                <span className="series-tag" style={{ color: "var(--series-lab)" }}>
                  THE LAB
                </span>
                <strong className="pkg-open__name">3 WAYS TO CREATE SPACE</strong>
              </div>
            </VideoFrame>
          </div>
          <div className="pkg-grid pkg-grid--3" style={{ marginTop: "1.25rem" }}>
            <VideoFrame photo={photos.athleteYouth} label="Exercise">
              <div className="lab-stack" style={{ position: "absolute", left: "6%", bottom: "12%" }}>
                <div className="lab-card">
                  <span>EXERCISE</span>
                  <strong>02 / 03</strong>
                </div>
              </div>
            </VideoFrame>
            <VideoFrame photo={photos.trainingLab} label="Takeaway">
              <div className="lab-stack" style={{ position: "absolute", left: "6%", bottom: "12%" }}>
                <div className="lab-card">
                  <span>TAKEAWAY</span>
                  <strong>Space is created before the catch.</strong>
                </div>
              </div>
            </VideoFrame>
            <EndScreenPreview layout="playlist" playlistName="THE LAB" />
          </div>
        </div>
      </section>

      <section className="section" id="gameday">
        <div className="wrap">
          <p className="section__eyebrow">Game mode</p>
          <h2 className="section__title">GAME DAY</h2>
          <p className="section__lede">
            Fast score, matchup, and recap energy — orange action, still COURTSIDE.
          </p>
          <div className="pkg-grid pkg-grid--3">
            <VideoFrame photo={photos.gamedayArena} label="Pregame">
              <div className="pkg-open">
                <span className="series-tag">GAME DAY</span>
                <strong className="pkg-open__name">TIP-OFF</strong>
              </div>
            </VideoFrame>
            <VideoFrame photo={photos.teamHuddle} label="Matchup">
              <div className="gd-match">
                <span>METRO</span>
                <em>VS</em>
                <span>COAST</span>
              </div>
            </VideoFrame>
            <VideoFrame label="Final">
              <div className="gd-score">
                <span>FINAL</span>
                <strong style={{ color: "var(--cs-signal)" }}>104–98</strong>
              </div>
            </VideoFrame>
          </div>
        </div>
      </section>
    </>
  );
}
