import { EndScreenPreview } from "../components/EndScreenPreview";
import { LowerThird } from "../components/LowerThird";
import { StatCard } from "../components/StatCard";
import { VideoFrame } from "../components/VideoFrame";
import { YouTubeThumbnail } from "../components/YouTubeThumbnail";
import { athlete, photos, thumbnails } from "../data/brand";
import "./Packages.css";

export function AthleteInterview() {
  return (
    <section className="section" id="interview">
      <div className="wrap">
        <p className="section__eyebrow">06 · Athlete Interview Package</p>
        <h2 className="section__title">Support the Athlete</h2>
        <p className="section__lede">
          Complete graphics package for a fictional interview — graphics support
          the subject rather than overpowering the conversation.
        </p>

        <div className="pkg-grid">
          <YouTubeThumbnail concept={thumbnails[0]} showCategory />
          <VideoFrame photo={photos.athletePortrait} label="Opening title">
            <div className="pkg-open">
              <span className="series-tag">THE PLAYER</span>
              <strong className="pkg-open__name">{athlete.nameUpper}</strong>
              <span className="pkg-open__ep">INTERVIEW</span>
            </div>
          </VideoFrame>
        </div>

        <div className="pkg-grid pkg-grid--3" style={{ marginTop: "1.25rem" }}>
          <VideoFrame photo={photos.athletePortrait} label="Name / title" grade>
            <div className="pkg-corner">
              <LowerThird
                kind="athlete"
                primary={athlete.nameUpper}
                secondary={`${athlete.position} · ${athlete.team}`}
                animate={false}
              />
            </div>
          </VideoFrame>
          <VideoFrame photo={photos.documentary} label="Quote graphic">
            <div className="pkg-quote">
              <span className="series-tag">THE PLAYER</span>
              <blockquote>“{athlete.quote}”</blockquote>
              <cite>{athlete.nameUpper}</cite>
            </div>
          </VideoFrame>
          <StatCard
            variant="card"
            title={athlete.nameUpper}
            subtitle="Season"
            stats={athlete.stats.map((s) => ({ label: s.label, value: s.value }))}
          />
        </div>

        <div className="pkg-grid" style={{ marginTop: "1.25rem" }}>
          <VideoFrame photo={photos.handsBall} label="Chapter card">
            <div className="pkg-chapter">
              <span>CHAPTER 02</span>
              <strong>ORIGINS</strong>
            </div>
          </VideoFrame>
          <VideoFrame label="Transition">
            <div className="pkg-transition">
              <span className="brand-mark">CS</span>
            </div>
          </VideoFrame>
          <EndScreenPreview layout="subscribe" />
        </div>
      </div>
    </section>
  );
}
