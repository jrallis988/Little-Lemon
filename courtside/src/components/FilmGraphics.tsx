import "./FilmGraphics.css";

/** Editorial court / shot / play diagram graphics for FILM ROOM. */
export function CourtDiagram() {
  return (
    <svg
      className="film-svg"
      viewBox="0 0 320 180"
      role="img"
      aria-label="Half-court diagram"
    >
      <rect width="320" height="180" fill="#0e0e10" />
      <rect
        x="20"
        y="20"
        width="280"
        height="140"
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="2"
      />
      <rect
        x="20"
        y="55"
        width="70"
        height="70"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
      />
      <path
        d="M90 55 A35 35 0 0 1 90 125"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
      />
      <circle
        cx="55"
        cy="90"
        r="8"
        fill="none"
        stroke="var(--cs-orange)"
        strokeWidth="2"
      />
      <circle cx="130" cy="70" r="6" fill="var(--cs-signal)" />
      <circle cx="155" cy="110" r="6" fill="var(--cs-signal)" />
      <circle cx="190" cy="85" r="6" fill="var(--cs-orange)" />
      <path
        d="M190 85 L90 90"
        stroke="var(--cs-orange)"
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      <text
        x="200"
        y="82"
        fill="var(--cs-white)"
        fontFamily="Barlow Condensed, sans-serif"
        fontSize="14"
        fontWeight="700"
      >
        DRIVE
      </text>
    </svg>
  );
}

export function ShotChart() {
  const makes = [
    [40, 50],
    [55, 70],
    [70, 45],
    [90, 80],
    [110, 55],
    [130, 90],
    [150, 40],
    [170, 75],
    [60, 100],
    [100, 30],
  ];
  const misses = [
    [45, 90],
    [80, 35],
    [120, 70],
    [160, 50],
    [95, 95],
  ];
  return (
    <svg
      className="film-svg"
      viewBox="0 0 220 200"
      role="img"
      aria-label="Shot chart"
    >
      <rect width="220" height="200" fill="#0e0e10" />
      <path
        d="M20 180 H200 V40 H140 A50 50 0 0 0 80 40 H20 Z"
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="2"
      />
      <circle
        cx="110"
        cy="55"
        r="12"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
      />
      {makes.map(([x, y], i) => (
        <circle key={`m${i}`} cx={x} cy={y} r="5" fill="var(--cs-signal)" />
      ))}
      {misses.map(([x, y], i) => (
        <g key={`x${i}`} stroke="var(--cs-orange)" strokeWidth="2">
          <line x1={x - 4} y1={y - 4} x2={x + 4} y2={y + 4} />
          <line x1={x + 4} y1={y - 4} x2={x - 4} y2={y + 4} />
        </g>
      ))}
      <text
        x="16"
        y="24"
        fill="rgba(255,255,255,0.55)"
        fontFamily="Barlow Condensed, sans-serif"
        fontSize="11"
        letterSpacing="1.5"
      >
        SHOT CHART · Q3
      </text>
    </svg>
  );
}

export function PossessionBreakdown() {
  return (
    <div className="possession">
      <div className="possession__step">
        <span>01</span>
        <strong>Catch</strong>
        <p>Weak-side flare</p>
      </div>
      <div className="possession__step">
        <span>02</span>
        <strong>Reject</strong>
        <p>Decline screen</p>
      </div>
      <div className="possession__step">
        <span>03</span>
        <strong>Attack</strong>
        <p>Closeout drive</p>
      </div>
      <div className="possession__step possession__step--result">
        <span>04</span>
        <strong>Finish</strong>
        <p>+2 / foul</p>
      </div>
    </div>
  );
}
