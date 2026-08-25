import { StatCard } from "../components/StatCard";
import { VideoFrame } from "../components/VideoFrame";
import { athlete, photos } from "../data/brand";
import "./Packages.css";

export function AthleteProfile() {
  return (
    <section className="section section--dark" id="profile">
      <div className="wrap">
        <p className="section__eyebrow">07 · Athlete Profile Film</p>
        <h2 className="section__title">More Cinematic</h2>
        <p className="section__lede">
          Visual package for a 5–8 minute athlete profile. Quieter, more filmic
          than the interview system — still unmistakably COURTSIDE.
        </p>

        <VideoFrame photo={photos.documentary} label="Opening sequence">
          <div className="pkg-cinematic">
            <span className="pkg-cinematic__series">THE PLAYER</span>
            <strong className="pkg-cinematic__name">{athlete.nameUpper}</strong>
            <span className="pkg-cinematic__title">{athlete.episode}</span>
          </div>
        </VideoFrame>

        <div className="pkg-grid pkg-grid--3" style={{ marginTop: "1.25rem" }}>
          <VideoFrame photo={photos.trainingLab} label="Location title">
            <div className="pkg-loc">
              <span>LOCATION</span>
              <strong>{athlete.gym}</strong>
              <span>{athlete.location}</span>
            </div>
          </VideoFrame>
          <VideoFrame photo={photos.athletePortrait} label="Name graphic">
            <div className="pkg-cinematic">
              <strong className="pkg-cinematic__name" style={{ fontSize: "2.2rem" }}>
                REED
              </strong>
              <span className="pkg-cinematic__title">
                {athlete.position} · {athlete.team}
              </span>
            </div>
          </VideoFrame>
          <StatCard
            variant="season"
            subtitle="Season line"
            title="REED"
            stats={athlete.stats.map((s) => ({ label: s.label, value: s.value }))}
            animate
          />
        </div>

        <div className="pkg-grid" style={{ marginTop: "1.25rem" }}>
          <VideoFrame photo={photos.handsBall} label="Pull quote">
            <div className="pkg-quote">
              <blockquote>“{athlete.quote}”</blockquote>
            </div>
          </VideoFrame>
          <VideoFrame photo={photos.trainingLab} label="Training chapter">
            <div className="pkg-chapter">
              <span>CHAPTER</span>
              <strong>THE WORK</strong>
            </div>
          </VideoFrame>
          <VideoFrame photo={photos.gamedayArena} label="Game-day chapter">
            <div className="pkg-chapter">
              <span>CHAPTER</span>
              <strong>GAME NIGHT</strong>
            </div>
          </VideoFrame>
          <VideoFrame label="Closing title">
            <div className="pkg-chapter">
              <span className="brand-mark" style={{ fontSize: "2rem" }}>
                COURTSIDE
              </span>
              <strong style={{ fontSize: "1rem", color: "var(--cs-signal)" }}>
                EVERY POSSESSION HAS A STORY.
              </strong>
            </div>
          </VideoFrame>
        </div>
      </div>
    </section>
  );
}
