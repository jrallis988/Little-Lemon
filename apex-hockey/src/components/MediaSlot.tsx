import type { ReactNode } from "react";

type PlaceholderProps = {
  src?: string;
  label: string;
  className?: string;
  framed?: boolean;
  ratio?: string;
  children?: ReactNode;
};

/** Drop final photography into /public/assets and update content.ts paths */
export function MediaSlot({
  src,
  label,
  className = "",
  framed = false,
  ratio,
  children,
}: PlaceholderProps) {
  return (
    <div
      className={`media-slot replace-slot ${framed ? "frame-crop" : ""} ${className}`.trim()}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {src ? (
        <img className="replace-slot__art" src={src} alt="" />
      ) : (
        <div className="media-slot__fallback" aria-hidden="true">
          {children}
        </div>
      )}
      <span className="replace-slot__label">{label}</span>
    </div>
  );
}
