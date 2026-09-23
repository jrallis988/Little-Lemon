import "./FilmGraphics.css";

/** Editorial court / shot / play diagram graphics for FILM ROOM. */
export function CourtDiagram() {
  return (
    <svg
      className="film-svg"
      viewBox="0 0 320 180"
      role="img"
      aria-label="Half-court diagram with drive path"
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
      <circle cx="55" cy="90" r="8" fill="none" stroke="#FF3B00" strokeWidth="2" />
      <circle cx="130" cy="70" r="6" fill="#B8FF3C" />
      <circle cx="155" cy="110" r="6" fill="#B8FF3C" />
      <circle cx="190" cy="85" r="6" fill="#FF3B00" />
      <path
        d="M190 85 L90 90"
        stroke="#FF3B00"
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      <text
        x="200"
        y="82"
        fill="#fff"
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
        <circle key={`m${i}`} cx={x} cy={y} r="5" fill="#B8FF3C" />
      ))}
      {misses.map(([x, y], i) => (
        <g key={`x${i}`} stroke="#FF3B00" strokeWidth="2">
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

export function HeatMap() {
  return (
    <svg className="film-svg" viewBox="0 0 220 200" role="img" aria-label="Court heat map">
      <rect width="220" height="200" fill="#0e0e10" />
      <defs>
        <radialGradient id="h1" cx="30%" cy="40%" r="40%">
          <stop offset="0%" stopColor="#FF3B00" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FF3B00" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="h2" cx="70%" cy="55%" r="35%">
          <stop offset="0%" stopColor="#B8FF3C" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#B8FF3C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="h3" cx="50%" cy="25%" r="28%">
          <stop offset="0%" stopColor="#3ECFFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3ECFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M20 180 H200 V40 H140 A50 50 0 0 0 80 40 H20 Z"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="2"
      />
      <ellipse cx="70" cy="90" rx="55" ry="40" fill="url(#h1)" />
      <ellipse cx="150" cy="110" rx="45" ry="35" fill="url(#h2)" />
      <ellipse cx="110" cy="55" rx="35" ry="28" fill="url(#h3)" />
      <text
        x="16"
        y="24"
        fill="rgba(255,255,255,0.55)"
        fontFamily="Barlow Condensed, sans-serif"
        fontSize="11"
        letterSpacing="1.5"
      >
        TOUCH HEAT · HALF
      </text>
    </svg>
  );
}

export function PassRoutes() {
  return (
    <svg className="film-svg" viewBox="0 0 320 180" role="img" aria-label="Passing routes">
      <rect width="320" height="180" fill="#0e0e10" />
      <rect x="20" y="20" width="280" height="140" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      {[
        [60, 90, "1"],
        [140, 50, "2"],
        [140, 130, "3"],
        [220, 70, "4"],
        [250, 120, "5"],
      ].map(([x, y, n]) => (
        <g key={String(n)}>
          <circle cx={Number(x)} cy={Number(y)} r="12" fill="none" stroke="#3ECFFF" strokeWidth="2" />
          <text
            x={Number(x)}
            y={Number(y) + 4}
            textAnchor="middle"
            fill="#fff"
            fontFamily="Barlow Condensed, sans-serif"
            fontSize="12"
            fontWeight="700"
          >
            {n}
          </text>
        </g>
      ))}
      <path d="M72 90 L128 55" stroke="#B8FF3C" strokeWidth="2" markerEnd="url(#arrow)" />
      <path d="M152 55 L208 70" stroke="#B8FF3C" strokeWidth="2" />
      <path d="M152 125 L238 120" stroke="#FF3B00" strokeWidth="2" strokeDasharray="5 4" />
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#B8FF3C" />
        </marker>
      </defs>
      <text x="16" y="24" fill="rgba(255,255,255,0.55)" fontFamily="Barlow Condensed, sans-serif" fontSize="11" letterSpacing="1.5">
        PASSING ROUTES · HORN SET
      </text>
    </svg>
  );
}

export function FreezeAnnotation() {
  return (
    <div className="freeze">
      <div className="freeze__frame">
        <span className="freeze__tag">FREEZE · 04:12</span>
        <div className="freeze__callout freeze__callout--a">
          <strong>HELP</strong>
          <span>Late rotate</span>
        </div>
        <div className="freeze__callout freeze__callout--b">
          <strong>GAP</strong>
          <span>Drive window</span>
        </div>
        <svg className="freeze__arrows" viewBox="0 0 200 100" aria-hidden="true">
          <path d="M40 70 L110 40" stroke="#3ECFFF" strokeWidth="2" fill="none" />
          <path d="M150 30 L120 55" stroke="#FF3B00" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
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

export function PlayerTrack() {
  return (
    <div className="track">
      <div className="track__head">
        <span>PLAYER TRACK</span>
        <strong>VALE · #22</strong>
      </div>
      <div className="track__meters">
        <div>
          <em>DISTANCE</em>
          <strong className="num-display">2.4</strong>
          <span>mi</span>
        </div>
        <div>
          <em>SPRINTS</em>
          <strong className="num-display">18</strong>
        </div>
        <div>
          <em>TOUCHES</em>
          <strong className="num-display">64</strong>
        </div>
      </div>
    </div>
  );
}
