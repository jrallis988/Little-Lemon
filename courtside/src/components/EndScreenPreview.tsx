import "./EndScreenPreview.css";

export type EndScreenLayout = "subscribe" | "next" | "recommended" | "playlist";

interface Props {
  layout: EndScreenLayout;
  nextTitle?: string;
  playlistName?: string;
}

/**
 * End-screen templates that leave safe zones for YouTube UI elements.
 * Critical brand type sits clear of element hotspots.
 */
export function EndScreenPreview({
  layout,
  nextTitle = "THE WORK NOBODY SEES",
  playlistName = "THE PLAYER",
}: Props) {
  return (
    <div className={`end-screen end-screen--${layout}`}>
      <div className="end-screen__safe" aria-hidden="true">
        <span className="end-screen__hotspot end-screen__hotspot--left" />
        <span className="end-screen__hotspot end-screen__hotspot--right" />
      </div>
      <div className="end-screen__brand">
        <strong className="brand-mark">COURTSIDE</strong>
        <span>EVERY POSSESSION HAS A STORY.</span>
      </div>
      {layout === "subscribe" && (
        <p className="end-screen__cta">Subscribe for every possession.</p>
      )}
      {layout === "next" && (
        <div className="end-screen__next-label">
          <span>UP NEXT</span>
          <strong>{nextTitle}</strong>
        </div>
      )}
      {layout === "recommended" && (
        <div className="end-screen__next-label">
          <span>WATCH NEXT</span>
          <strong>More from COURTSIDE</strong>
        </div>
      )}
      {layout === "playlist" && (
        <div className="end-screen__next-label">
          <span>PLAYLIST</span>
          <strong>{playlistName}</strong>
        </div>
      )}
      <span className="end-screen__note">
        Safe zones reserved for YouTube end-screen elements
      </span>
    </div>
  );
}
