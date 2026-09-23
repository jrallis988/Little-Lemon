import type { ReactNode } from "react";
import "./VideoFrame.css";

interface Props {
  photo?: string;
  label?: string;
  children?: ReactNode;
  className?: string;
  grade?: boolean;
  aspect?: "16/9" | "9/16";
}

/** 16:9 (or vertical) video canvas for packaging mockups. */
export function VideoFrame({
  photo,
  label,
  children,
  className = "",
  grade = true,
  aspect = "16/9",
}: Props) {
  return (
    <div
      className={`video-frame video-frame--${aspect === "9/16" ? "vert" : "wide"} ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {photo && (
        <img src={photo} alt="" className="video-frame__photo" loading="lazy" />
      )}
      {grade && <div className="video-frame__grade" aria-hidden="true" />}
      <div className="video-frame__content">{children}</div>
      {label && <span className="video-frame__label">{label}</span>}
    </div>
  );
}
