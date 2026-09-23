import "./Logo.css";

interface Props {
  variant?: "full" | "mark" | "wordmark";
  inverted?: boolean;
  className?: string;
}

/** Logo placeholder — replace SVG with Illustrator export. */
export function Logo({
  variant = "full",
  inverted = false,
  className = "",
}: Props) {
  return (
    <div
      className={`cs-logo cs-logo--${variant} ${inverted ? "cs-logo--inv" : ""} ${className}`}
      aria-label="COURTSIDE logo"
    >
      {(variant === "full" || variant === "mark") && (
        <svg
          className="cs-logo__mark"
          viewBox="0 0 48 48"
          aria-hidden="true"
          fill="none"
        >
          <rect
            x="3"
            y="3"
            width="42"
            height="42"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <circle
            cx="24"
            cy="24"
            r="11"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M24 13v22M13 24h22M16.5 16.5c5 3.2 10 3.2 15 0M16.5 31.5c5-3.2 10-3.2 15 0"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M8 40h10l4-8 4 8h10" stroke="var(--cs-orange)" strokeWidth="2.5" />
        </svg>
      )}
      {(variant === "full" || variant === "wordmark") && (
        <span className="cs-logo__word brand-mark">COURTSIDE</span>
      )}
    </div>
  );
}
