import { EndScreenPreview } from "../components/EndScreenPreview";
import { VideoFrame } from "../components/VideoFrame";
import { YouTubeThumbnail } from "../components/YouTubeThumbnail";
import { photos, thumbnails } from "../data/brand";
import "./Packages.css";

export function TrainingLab() {
  return (
    <section className="section section--dark" id="lab">
      <div className="wrap">
        <p className="section__eyebrow">09 · Training Video Package</p>
        <h2 className="section__title">THE LAB</h2>
        <p className="section__lede">
          Educational graphics for “3 Ways to Create Space” — clearer instruction
          without looking like a fitness app.
        </p>

        <div className="pkg-grid">
          <YouTubeThumbnail concept={thumbnails[4]} showCategory />
          <VideoFrame photo={photos.trainingLab} label="Opening title">
            <div className="pkg-open">
              <span className="series-tag" style={{ color: "var(--series-lab)" }}>
                THE LAB
              </span>
              <strong className="pkg-open__name">3 WAYS TO CREATE SPACE</strong>
            </div>
          </VideoFrame>
        </div>

        <div className="pkg-grid pkg-grid--3" style={{ marginTop: "1.25rem" }}>
          <VideoFrame photo={photos.trainingLab} label="Exercise number">
            <div className="lab-stack" style={{ position: "absolute", left: "6%", bottom: "12%" }}>
              <div className="lab-card">
                <span>EXERCISE</span>
                <strong>02 / 03</strong>
              </div>
            </div>
          </VideoFrame>
          <VideoFrame photo={photos.trainingLab} label="Instruction card">
            <div className="lab-stack" style={{ position: "absolute", left: "6%", bottom: "12%" }}>
              <div className="lab-card">
                <span>STEP</span>
                <strong>Reject the screen. Attack the closeout.</strong>
              </div>
            </div>
          </VideoFrame>
          <VideoFrame photo={photos.handsBall} label="Key takeaway">
            <div className="lab-stack" style={{ position: "absolute", left: "6%", bottom: "12%" }}>
              <div className="lab-card">
                <span>TAKEAWAY</span>
                <strong>Space is created before the catch.</strong>
              </div>
            </div>
          </VideoFrame>
        </div>

        <div className="pkg-grid" style={{ marginTop: "1.25rem" }}>
          <VideoFrame photo={photos.trainingLab} label="Slow-motion label">
            <div className="lab-stack" style={{ position: "absolute", left: "6%", top: "10%" }}>
              <div className="lab-card">
                <span>SLOW MOTION</span>
                <strong>0.5× · FOOTWORK</strong>
              </div>
            </div>
            <div className="lab-progress" aria-hidden="true">
              <span />
            </div>
          </VideoFrame>
          <EndScreenPreview layout="playlist" playlistName="THE LAB" />
        </div>
      </div>
    </section>
  );
}
