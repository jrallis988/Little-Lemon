export function HeroStageArt() {
  return (
    <svg viewBox="0 0 1440 820" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7ec8ff" />
          <stop offset="45%" stopColor="#ff8fc8" />
          <stop offset="100%" stopColor="#ffc107" />
        </linearGradient>
        <linearGradient id="stageGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0b2e" />
          <stop offset="100%" stopColor="#3d1a6e" />
        </linearGradient>
        <radialGradient id="spot" cx="70%" cy="35%" r="35%">
          <stop offset="0%" stopColor="#fff59d" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fff59d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="820" fill="url(#skyGrad)" />
      <circle cx="1180" cy="140" r="70" fill="#fff8e1" opacity="0.9" />
      <circle className="pulse-ring" cx="1180" cy="140" r="95" fill="none" stroke="#fff" strokeWidth="6" opacity="0.35" />

      {/* Clouds */}
      <g fill="#fff" opacity="0.7">
        <ellipse cx="220" cy="120" rx="90" ry="36" />
        <ellipse cx="280" cy="110" rx="60" ry="28" />
        <ellipse cx="520" cy="160" rx="70" ry="28" />
        <ellipse cx="980" cy="200" rx="80" ry="30" />
      </g>

      {/* Stage */}
      <rect x="0" y="520" width="1440" height="300" fill="url(#stageGrad)" />
      <ellipse cx="900" cy="540" rx="320" ry="90" fill="url(#spot)" />
      <rect x="620" y="500" width="560" height="24" rx="8" fill="#39e6c4" />
      <rect x="640" y="460" width="80" height="40" rx="6" fill="#ff4d6d" />
      <rect x="760" y="440" width="100" height="60" rx="8" fill="#00b4e4" />
      <rect x="900" y="450" width="90" height="50" rx="8" fill="#ffc107" />
      <rect x="1030" y="465" width="70" height="35" rx="6" fill="#ff1f7a" />

      {/* Characters simplified */}
      <g transform="translate(700,360)">
        <circle cx="40" cy="40" r="34" fill="#ffb4a2" />
        <rect x="18" y="72" width="44" height="55" rx="14" fill="#ff4d6d" />
        <circle cx="28" cy="36" r="4" fill="#0c2340" />
        <circle cx="52" cy="36" r="4" fill="#0c2340" />
        <path d="M28 50 Q40 58 52 50" stroke="#0c2340" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g transform="translate(820,340)">
        <circle cx="40" cy="40" r="34" fill="#ffccbc" />
        <rect x="18" y="72" width="44" height="60" rx="14" fill="#39e6c4" />
        <circle cx="28" cy="36" r="4" fill="#0c2340" />
        <circle cx="52" cy="36" r="4" fill="#0c2340" />
        <path d="M28 50 Q40 56 52 50" stroke="#0c2340" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="70" cy="100" rx="18" ry="12" fill="#1a0b2e" />
      </g>
      <g transform="translate(950,350)">
        <circle cx="40" cy="40" r="34" fill="#ffe0b2" />
        <rect x="18" y="72" width="44" height="55" rx="14" fill="#00b4e4" />
        <circle cx="28" cy="36" r="4" fill="#0c2340" />
        <circle cx="52" cy="36" r="4" fill="#0c2340" />
        <path d="M28 48 Q40 58 52 48" stroke="#0c2340" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      {/* Floating notes */}
      <g className="note" fill="#fff">
        <text x="1080" y="300" fontSize="48" fontFamily="Fredoka, sans-serif">♪</text>
      </g>
      <g className="note" fill="#39e6c4">
        <text x="1160" y="380" fontSize="56" fontFamily="Fredoka, sans-serif">♫</text>
      </g>
      <g className="note" fill="#ffc107">
        <text x="1240" y="280" fontSize="40" fontFamily="Fredoka, sans-serif">♪</text>
      </g>
    </svg>
  );
}

export function AcademyStageArt({ compact = false }) {
  const h = compact ? 520 : 720;
  return (
    <svg viewBox={`0 0 1440 ${h}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="rockBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a0b2e" />
          <stop offset="55%" stopColor="#3a1466" />
          <stop offset="100%" stopColor="#ff1f7a" />
        </linearGradient>
        <radialGradient id="neonGlow" cx="65%" cy="40%" r="40%">
          <stop offset="0%" stopColor="#39e6c4" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#39e6c4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height={h} fill="url(#rockBg)" />
      <ellipse cx="980" cy="260" rx="360" ry="220" fill="url(#neonGlow)" />

      {/* Amp & guitar silhouettes */}
      <g transform="translate(880,180)">
        <rect x="0" y="80" width="120" height="160" rx="12" fill="#0d0618" stroke="#39e6c4" strokeWidth="4" />
        <circle cx="60" cy="145" r="28" fill="none" stroke="#39e6c4" strokeWidth="5" className="pulse-ring" />
        <circle cx="60" cy="145" r="10" fill="#39e6c4" />
        <rect x="20" y="210" width="80" height="10" rx="3" fill="#ff4d6d" />
      </g>
      <g transform="translate(1040,140)">
        <ellipse cx="50" cy="160" rx="48" ry="70" fill="#ff4d6d" />
        <rect x="42" y="20" width="16" height="110" rx="6" fill="#ffc107" />
        <circle cx="50" cy="150" r="16" fill="#1a0b2e" />
        <rect x="38" y="0" width="24" height="28" rx="4" fill="#39e6c4" />
      </g>

      {/* Band kids */}
      <g transform="translate(620,220)">
        <circle cx="50" cy="50" r="42" fill="#ffb4a2" />
        <path d="M20 45 Q50 10 80 45" fill="#0c2340" />
        <rect x="22" y="92" width="56" height="70" rx="16" fill="#ff4d6d" />
        <circle cx="36" cy="48" r="5" fill="#0c2340" />
        <circle cx="64" cy="48" r="5" fill="#0c2340" />
        <path d="M36 66 Q50 76 64 66" stroke="#0c2340" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g transform="translate(740,200)">
        <circle cx="50" cy="50" r="42" fill="#ffccbc" />
        <rect x="22" y="92" width="56" height="78" rx="16" fill="#39e6c4" />
        <circle cx="36" cy="48" r="5" fill="#0c2340" />
        <circle cx="64" cy="48" r="5" fill="#0c2340" />
        <path d="M36 66 Q50 74 64 66" stroke="#0c2340" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="90" cy="130" rx="22" ry="16" fill="#1a0b2e" stroke="#ffc107" strokeWidth="3" />
      </g>

      <g className="note" fill="#39e6c4">
        <text x="560" y="180" fontSize="64" fontFamily="Fredoka, sans-serif">♪</text>
      </g>
      <g className="note" fill="#ffc107">
        <text x="1180" y="220" fontSize="52" fontFamily="Fredoka, sans-serif">♫</text>
      </g>
      <g className="note" fill="#fff">
        <text x="500" y="280" fontSize="40" fontFamily="Fredoka, sans-serif">♪</text>
      </g>

      {/* Floor */}
      <rect x="0" y={h - 120} width="1440" height="120" fill="#0d0618" opacity="0.55" />
      <rect x="520" y={h - 140} width="620" height="22" rx="8" fill="#39e6c4" />
    </svg>
  );
}

export function ShowPoster({ colors, title, id }) {
  const [a, b, c] = colors;
  const gradId = `pg-${id || title.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="300" height="400" fill={`url(#${gradId})`} />
      <circle cx="150" cy="150" r="70" fill={c} opacity="0.35" />
      <circle cx="150" cy="150" r="48" fill={c} opacity="0.85" />
      <text
        x="150"
        y="320"
        textAnchor="middle"
        fill="#fff"
        fontFamily="Fredoka, sans-serif"
        fontSize="22"
        fontWeight="600"
      >
        {title.split(" ")[0]}
      </text>
    </svg>
  );
}

export function EpisodeThumb({ color }) {
  return (
    <svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="160" height="100" fill="#1a0b2e" />
      <circle cx="80" cy="50" r="28" fill={color} opacity="0.9" />
      <polygon points="74,38 74,62 96,50" fill="#1a0b2e" />
    </svg>
  );
}

export function CastAvatar({ colors, name }) {
  const [a, b] = colors;
  const gradId = `cast-${name.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="120" height="120" fill={`url(#${gradId})`} />
      <circle cx="60" cy="48" r="28" fill="#ffccbc" />
      <ellipse cx="60" cy="108" rx="36" ry="28" fill="#fff" opacity="0.9" />
      <circle cx="50" cy="46" r="3.5" fill="#0c2340" />
      <circle cx="70" cy="46" r="3.5" fill="#0c2340" />
      <path d="M50 58 Q60 66 70 58" stroke="#0c2340" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function PlayerArt({ color = "#39e6c4" }) {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="playerBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a0b2e" />
          <stop offset="100%" stopColor="#3a1466" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#playerBg)" />
      <circle className="pulse-ring" cx="400" cy="210" r="90" fill="none" stroke={color} strokeWidth="6" opacity="0.4" />
      <circle cx="400" cy="210" r="64" fill={color} />
      <polygon points="385,180 385,240 430,210" fill="#1a0b2e" />
      <g className="note" fill="#ffc107">
        <text x="520" y="150" fontSize="42" fontFamily="Fredoka, sans-serif">♪</text>
      </g>
      <g className="note" fill="#fff">
        <text x="240" y="280" fontSize="36" fontFamily="Fredoka, sans-serif">♫</text>
      </g>
    </svg>
  );
}
