import { useEffect, useRef } from "react";

/**
 * Native HTML5 player for Academy Rock demo streams.
 * Reports watch progress so Continue Watching stays in sync.
 */
export default function VideoPlayer({
  src,
  title,
  autoPlay = false,
  onProgress,
  onEnded,
}) {
  const videoRef = useRef(null);
  const lastReport = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    video.load();
    if (autoPlay) {
      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          // Autoplay with sound may be blocked — user can press play.
        });
      }
    }
  }, [src, autoPlay]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration || !onProgress) return;
    const now = Date.now();
    if (now - lastReport.current < 1500) return;
    lastReport.current = now;
    const ratio = video.currentTime / video.duration;
    if (ratio > 0.02) onProgress(ratio);
  };

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        className="video-player-el"
        controls
        playsInline
        preload="metadata"
        src={src}
        title={title}
        aria-label={title ? `Playing ${title}` : "Video player"}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onEnded}
      />
    </div>
  );
}
