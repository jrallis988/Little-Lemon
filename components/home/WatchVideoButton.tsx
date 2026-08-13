"use client";

import { useEffect, useId, useRef, useState } from "react";
import { candidate } from "@/lib/candidate";

/** Hero secondary CTA — opens an accessible video lightbox (Politicly-style Watch Video). */
export function WatchVideoButton() {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const video = candidate.introVideo;
  const embedSrc = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`;

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="varga-watch-video"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <span className="varga-watch-video__label">Watch Video</span>
        <span className="varga-watch-video__play" aria-hidden>
          <i className="fa fa-play" />
        </span>
      </button>

      {open && (
        <div className="varga-video-lightbox" role="presentation">
          <button
            type="button"
            className="varga-video-lightbox__backdrop"
            aria-label="Close video"
            onClick={() => setOpen(false)}
          />
          <div
            className="varga-video-lightbox__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="varga-video-lightbox__toolbar">
              <h2 id={titleId} className="varga-video-lightbox__title">
                {video.title}
              </h2>
              <button
                ref={closeRef}
                type="button"
                className="varga-video-lightbox__close"
                aria-label="Close video"
                onClick={() => setOpen(false)}
              >
                <i className="fa fa-times" aria-hidden />
              </button>
            </div>
            <div className="varga-video-lightbox__frame">
              <iframe
                title={video.title}
                src={embedSrc}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
