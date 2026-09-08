import { useEffect, useRef, useState } from "react";
import { MotionPreview, type MotionKind } from "./MotionPreview";
import { photos } from "../data/brand";
import "./MotionReel.css";

const sequence: { kind: MotionKind; label: string; ms: number }[] = [
  { kind: "intro", label: "Intro sting", ms: 2800 },
  { kind: "series", label: "Series ID", ms: 2200 },
  { kind: "lowerthird", label: "Lower third", ms: 2200 },
  { kind: "stat", label: "Stat reveal", ms: 2000 },
  { kind: "transition", label: "Transition", ms: 1200 },
  { kind: "endcard", label: "End card", ms: 2400 },
];

/**
 * Autoplay motion language demo + drop-in slot for an AE/Premiere reel export.
 * Place `courtside-reel.mp4` in /public/assets/motion/ to replace the prototype.
 */
export function MotionReel() {
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [hasVideo, setHasVideo] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const probe = document.createElement("video");
    probe.preload = "metadata";
    probe.src = "./assets/motion/courtside-reel.mp4";
    const onMeta = () => setHasVideo(true);
    const onErr = () => setHasVideo(false);
    probe.addEventListener("loadedmetadata", onMeta);
    probe.addEventListener("error", onErr);
    return () => {
      probe.removeEventListener("loadedmetadata", onMeta);
      probe.removeEventListener("error", onErr);
    };
  }, []);

  useEffect(() => {
    if (!playing) {
      if (timer.current) window.clearTimeout(timer.current);
      return;
    }
    const current = sequence[step];
    timer.current = window.setTimeout(() => {
      setStep((s) => {
        const next = s + 1;
        if (next >= sequence.length) {
          setPlaying(false);
          return 0;
        }
        return next;
      });
    }, current.ms);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [playing, step]);

  const startSequence = () => {
    setStep(0);
    setPlaying(true);
  };

  return (
    <div className="motion-reel">
      <div className="motion-reel__grid">
        <div className="motion-reel__demo">
          <div className="motion-reel__head">
            <span className="label-chip">Motion sequence · ~12s</span>
            <button
              type="button"
              className={`btn ${playing ? "btn--signal" : "btn--ghost"}`}
              onClick={startSequence}
              disabled={playing}
            >
              {playing ? "Playing…" : "Play full sequence"}
            </button>
          </div>
          <MotionPreview
            key={`${sequence[step].kind}-${step}-${playing}`}
            kind={sequence[step].kind}
            seriesLabel="FILM ROOM"
          />
          <ol className="motion-reel__steps" aria-label="Sequence steps">
            {sequence.map((s, i) => (
              <li key={s.kind} className={i === step ? "is-active" : ""}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </li>
            ))}
          </ol>
        </div>

        <aside className="motion-reel__slot">
          <span className="label-chip">AE / Premiere reel slot</span>
          {hasVideo ? (
            <video
              className="motion-reel__video"
              controls
              playsInline
              poster={photos.actionDrive}
              src="./assets/motion/courtside-reel.mp4"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="motion-reel__placeholder">
              <img src={photos.actionDrive} alt="" />
              <div>
                <strong>Drop in your motion reel</strong>
                <p>
                  Export from After Effects → Premiere as
                  <code> assets/motion/courtside-reel.mp4 </code>
                  (10–20s). This slot auto-detects the file — no code change.
                </p>
                <p className="motion-reel__spec">
                  Spec: 1920×1080 · H.264 · under 8MB preferred
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
