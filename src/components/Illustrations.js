export function HeroStageArt() {
  return (
    <svg viewBox="0 0 1440 820" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#2a1248" />
          <stop offset="40%" stopColor="#5c1d6e" />
          <stop offset="75%" stopColor="#c43b6e" />
          <stop offset="100%" stopColor="#1a0b2e" />
        </linearGradient>
        <radialGradient id="spot" cx="72%" cy="42%" r="38%">
          <stop offset="0%" stopColor="#ffe082" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffe082" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="820" fill="url(#skyGrad)" />
      <ellipse cx="1040" cy="320" rx="380" ry="240" fill="url(#spot)" />
      <circle cx="1180" cy="140" r="64" fill="#fff3c4" opacity="0.85" />

      <rect x="0" y="560" width="1440" height="260" fill="#0a0614" opacity="0.55" />
      <rect x="700" y="520" width="520" height="18" rx="6" fill="#39e6c4" />
      <rect x="730" y="470" width="70" height="50" rx="8" fill="#ff4d6d" />
      <rect x="840" y="450" width="90" height="70" rx="10" fill="#00b4e4" />
      <rect x="970" y="460" width="80" height="60" rx="10" fill="#ffc107" />
      <rect x="1090" y="480" width="60" height="40" rx="8" fill="#ff1f7a" />

      <g transform="translate(780,370)">
        <circle cx="40" cy="40" r="34" fill="#ffb4a2" />
        <rect x="18" y="72" width="44" height="55" rx="14" fill="#ff4d6d" />
        <circle cx="28" cy="36" r="4" fill="#0c2340" />
        <circle cx="52" cy="36" r="4" fill="#0c2340" />
        <path d="M28 50 Q40 58 52 50" stroke="#0c2340" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g transform="translate(900,350)">
        <circle cx="40" cy="40" r="34" fill="#ffccbc" />
        <rect x="18" y="72" width="44" height="60" rx="14" fill="#39e6c4" />
        <circle cx="28" cy="36" r="4" fill="#0c2340" />
        <circle cx="52" cy="36" r="4" fill="#0c2340" />
        <path d="M28 50 Q40 56 52 50" stroke="#0c2340" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="70" cy="100" rx="18" ry="12" fill="#1a0b2e" />
      </g>
      <g transform="translate(1030,360)">
        <circle cx="40" cy="40" r="34" fill="#ffe0b2" />
        <rect x="18" y="72" width="44" height="55" rx="14" fill="#00b4e4" />
        <circle cx="28" cy="36" r="4" fill="#0c2340" />
        <circle cx="52" cy="36" r="4" fill="#0c2340" />
        <path d="M28 48 Q40 58 52 48" stroke="#0c2340" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      <g className="note" fill="#fff">
        <text x="1120" y="280" fontSize="48" fontFamily="Outfit, sans-serif">♪</text>
      </g>
      <g className="note" fill="#39e6c4">
        <text x="1200" y="360" fontSize="56" fontFamily="Outfit, sans-serif">♫</text>
      </g>
      <g className="note" fill="#ffc107">
        <text x="1280" y="260" fontSize="40" fontFamily="Outfit, sans-serif">♪</text>
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
          <stop offset="0%" stopColor="#0a0614" />
          <stop offset="45%" stopColor="#2a1248" />
          <stop offset="100%" stopColor="#c43b6e" />
        </linearGradient>
        <radialGradient id="neonGlow" cx="68%" cy="40%" r="40%">
          <stop offset="0%" stopColor="#39e6c4" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#39e6c4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height={h} fill="url(#rockBg)" />
      <ellipse cx="1000" cy="260" rx="360" ry="220" fill="url(#neonGlow)" />

      <g transform="translate(900,180)">
        <rect x="0" y="80" width="120" height="160" rx="12" fill="#0d0618" stroke="#39e6c4" strokeWidth="4" />
        <circle cx="60" cy="145" r="28" fill="none" stroke="#39e6c4" strokeWidth="5" className="pulse-ring" />
        <circle cx="60" cy="145" r="10" fill="#39e6c4" />
        <rect x="20" y="210" width="80" height="10" rx="3" fill="#ff4d6d" />
      </g>
      <g transform="translate(1060,140)">
        <ellipse cx="50" cy="160" rx="48" ry="70" fill="#ff4d6d" />
        <rect x="42" y="20" width="16" height="110" rx="6" fill="#ffc107" />
        <circle cx="50" cy="150" r="16" fill="#1a0b2e" />
        <rect x="38" y="0" width="24" height="28" rx="4" fill="#39e6c4" />
      </g>

      <g transform="translate(640,220)">
        <circle cx="50" cy="50" r="42" fill="#ffb4a2" />
        <path d="M20 45 Q50 10 80 45" fill="#0c2340" />
        <rect x="22" y="92" width="56" height="70" rx="16" fill="#ff4d6d" />
        <circle cx="36" cy="48" r="5" fill="#0c2340" />
        <circle cx="64" cy="48" r="5" fill="#0c2340" />
        <path d="M36 66 Q50 76 64 66" stroke="#0c2340" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g transform="translate(760,200)">
        <circle cx="50" cy="50" r="42" fill="#ffccbc" />
        <rect x="22" y="92" width="56" height="78" rx="16" fill="#39e6c4" />
        <circle cx="36" cy="48" r="5" fill="#0c2340" />
        <circle cx="64" cy="48" r="5" fill="#0c2340" />
        <path d="M36 66 Q50 74 64 66" stroke="#0c2340" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="90" cy="130" rx="22" ry="16" fill="#1a0b2e" stroke="#ffc107" strokeWidth="3" />
      </g>

      <g className="note" fill="#39e6c4">
        <text x="560" y="180" fontSize="64" fontFamily="Outfit, sans-serif">♪</text>
      </g>
      <g className="note" fill="#ffc107">
        <text x="1200" y="220" fontSize="52" fontFamily="Outfit, sans-serif">♫</text>
      </g>

      <rect x="0" y={h - 120} width="1440" height="120" fill="#040714" opacity="0.65" />
      <rect x="540" y={h - 140} width="620" height="18" rx="6" fill="#39e6c4" />
    </svg>
  );
}

/** Landscape Disney+ style title card */
export function ShowPoster({ colors, title, id }) {
  const [a, b, c] = colors;
  const gradId = `pg-${id || title.replace(/\s+/g, "-").toLowerCase()}`;
  const glowId = `glow-${id || title.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </linearGradient>
        <linearGradient id={glowId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="40%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.65" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill={`url(#${gradId})`} />
      <circle cx="310" cy="70" r="78" fill={c || "#fff"} opacity="0.22" />
      <circle cx="70" cy="170" r="56" fill="#000" opacity="0.18" />
      <ellipse cx="220" cy="100" rx="40" ry="40" fill="#ffccbc" opacity="0.9" />
      <rect x="198" y="135" width="44" height="48" rx="14" fill={c || "#fff"} opacity="0.85" />
      <rect width="400" height="225" fill={`url(#${glowId})`} />
      <text
        x="18"
        y="200"
        fill="#fff"
        fontFamily="Outfit, sans-serif"
        fontSize="22"
        fontWeight="700"
      >
        {title}
      </text>
    </svg>
  );
}

function BrandTileShell({ id, children, featured, stops }) {
  return (
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="brand-tile-art">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          {stops.map((stop, i) => (
            <stop key={i} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
      </defs>
      <rect width="320" height="180" rx="10" fill={`url(#${id})`} />
      <rect
        x="1.5"
        y="1.5"
        width="317"
        height="177"
        rx="9"
        fill="none"
        stroke={featured ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.14)"}
        strokeWidth="2"
      />
      {children}
    </svg>
  );
}

/** Studio brand marks — Disney Jr uses the distinct magenta + yellow Jr mark. */
export function BrandTile({ variant, featured }) {
  switch (variant) {
    case "disney":
      return (
        <BrandTileShell
          id="grad-disney"
          featured={featured}
          stops={[
            { offset: "0%", color: "#14213d" },
            { offset: "100%", color: "#0a0f1c" },
          ]}
        >
          <text x="160" y="102" textAnchor="middle" fill="#fff" fontFamily="Georgia, serif" fontSize="42" fontStyle="italic" fontWeight="700">
            Disney
          </text>
        </BrandTileShell>
      );
    case "pixar":
      return (
        <BrandTileShell
          id="grad-pixar"
          featured={featured}
          stops={[
            { offset: "0%", color: "#152238" },
            { offset: "100%", color: "#0a0f1c" },
          ]}
        >
          <text x="160" y="104" textAnchor="middle" fill="#fff" fontFamily="Outfit, sans-serif" fontSize="40" fontWeight="800" letterSpacing="2">
            PIXAR
          </text>
        </BrandTileShell>
      );
    case "marvel":
      return (
        <BrandTileShell
          id="grad-marvel"
          featured={featured}
          stops={[
            { offset: "0%", color: "#1a0a0a" },
            { offset: "100%", color: "#0a0f1c" },
          ]}
        >
          <rect x="70" y="62" width="180" height="56" rx="4" fill="#e62429" />
          <text x="160" y="100" textAnchor="middle" fill="#fff" fontFamily="Outfit, sans-serif" fontSize="30" fontWeight="800" letterSpacing="1">
            MARVEL
          </text>
        </BrandTileShell>
      );
    case "star-wars":
      return (
        <BrandTileShell
          id="grad-sw"
          featured={featured}
          stops={[
            { offset: "0%", color: "#141414" },
            { offset: "100%", color: "#050505" },
          ]}
        >
          <text x="160" y="88" textAnchor="middle" fill="#ffe81f" fontFamily="Outfit, sans-serif" fontSize="26" fontWeight="800" letterSpacing="3">
            STAR
          </text>
          <text x="160" y="118" textAnchor="middle" fill="#ffe81f" fontFamily="Outfit, sans-serif" fontSize="26" fontWeight="800" letterSpacing="3">
            WARS
          </text>
        </BrandTileShell>
      );
    case "nat-geo":
      return (
        <BrandTileShell
          id="grad-natgeo"
          featured={featured}
          stops={[
            { offset: "0%", color: "#161616" },
            { offset: "100%", color: "#0a0a0a" },
          ]}
        >
          <rect x="118" y="38" width="84" height="104" fill="none" stroke="#ffcc00" strokeWidth="8" />
          <text x="160" y="158" textAnchor="middle" fill="#fff" fontFamily="Outfit, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1">
            NATIONAL GEOGRAPHIC
          </text>
        </BrandTileShell>
      );
    case "disney-jr":
    default:
      return (
        <BrandTileShell
          id="grad-disney-jr"
          featured={featured}
          stops={[
            { offset: "0%", color: "#ff2e86" },
            { offset: "55%", color: "#e0186a" },
            { offset: "100%", color: "#9b0f6a" },
          ]}
        >
          {/* Soft sparkles for preschool recognition */}
          <circle cx="48" cy="42" r="5" fill="#ffd54f" opacity="0.9" />
          <circle cx="278" cy="50" r="4" fill="#fff59d" opacity="0.85" />
          <circle cx="292" cy="130" r="6" fill="#ffd54f" opacity="0.75" />
          <text
            x="160"
            y="82"
            textAnchor="middle"
            fill="#fff"
            fontFamily="Georgia, serif"
            fontSize="34"
            fontStyle="italic"
            fontWeight="700"
          >
            Disney
          </text>
          <text
            x="160"
            y="128"
            textAnchor="middle"
            fill="#ffd54f"
            fontFamily="Fredoka, Outfit, sans-serif"
            fontSize="44"
            fontWeight="700"
          >
            Jr.
          </text>
        </BrandTileShell>
      );
  }
}

export function EpisodeThumb({ color }) {
  return (
    <svg viewBox="0 0 240 135" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="240" height="135" fill="#16182a" />
      <rect width="240" height="135" fill={color} opacity="0.35" />
      <circle cx="120" cy="68" r="28" fill={color} opacity="0.95" />
      <polygon points="113,54 113,82 136,68" fill="#040714" />
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
          <stop offset="0%" stopColor="#0a0614" />
          <stop offset="100%" stopColor="#2a1248" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#playerBg)" />
      <circle className="pulse-ring" cx="400" cy="210" r="90" fill="none" stroke={color} strokeWidth="4" opacity="0.35" />
      <circle cx="400" cy="210" r="64" fill={color} />
      <polygon points="385,180 385,240 430,210" fill="#040714" />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}
