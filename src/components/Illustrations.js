export function HeroStageArt() {
  return <AcademyStageArt />;
}

/** Schoolhouse Rock–inspired educational cartoon stage for Academy Rock */
export function AcademyStageArt({ compact = false }) {
  const h = compact ? 520 : 820;
  return (
    <svg viewBox={`0 0 1440 ${h}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="shrSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5ec8ff" />
          <stop offset="55%" stopColor="#9ad8ff" />
          <stop offset="100%" stopColor="#ffe082" />
        </linearGradient>
        <pattern id="chalkDots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#fff" opacity="0.18" />
        </pattern>
      </defs>

      {/* Bright cartoon sky */}
      <rect width="1440" height={h} fill="url(#shrSky)" />
      <circle cx="1180" cy="120" r="78" fill="#ffeb3b" stroke="#f9a825" strokeWidth="8" />
      <circle className="pulse-ring" cx="1180" cy="120" r="98" fill="none" stroke="#fff59d" strokeWidth="6" opacity="0.55" />

      {/* Clouds — bold & simple */}
      <g fill="#fff" stroke="#1a237e" strokeWidth="5" strokeLinejoin="round">
        <ellipse cx="180" cy="110" rx="70" ry="32" />
        <ellipse cx="230" cy="100" rx="48" ry="28" />
        <ellipse cx="480" cy="150" rx="60" ry="26" />
        <ellipse cx="980" cy="180" rx="55" ry="24" />
      </g>

      {/* Green hill */}
      <ellipse cx="720" cy={h + 40} rx="900" ry="220" fill="#43a047" stroke="#1b5e20" strokeWidth="8" />

      {/* Red schoolhouse */}
      <g transform="translate(820,210)">
        <rect x="40" y="120" width="280" height="200" fill="#e53935" stroke="#212121" strokeWidth="7" />
        <polygon points="20,120 180,20 340,120" fill="#c62828" stroke="#212121" strokeWidth="7" strokeLinejoin="round" />
        {/* Bell tower */}
        <rect x="150" y="45" width="60" height="50" fill="#ffc107" stroke="#212121" strokeWidth="6" />
        <polygon points="140,45 180,10 220,45" fill="#e53935" stroke="#212121" strokeWidth="6" strokeLinejoin="round" />
        <ellipse cx="180" cy="70" rx="14" ry="16" fill="#ffeb3b" stroke="#212121" strokeWidth="4" />
        {/* Door & windows */}
        <rect x="145" y="220" width="70" height="100" fill="#6d4c41" stroke="#212121" strokeWidth="6" />
        <circle cx="200" cy="275" r="6" fill="#ffeb3b" stroke="#212121" strokeWidth="3" />
        <rect x="70" y="160" width="55" height="45" fill="#81d4fa" stroke="#212121" strokeWidth="5" />
        <rect x="235" y="160" width="55" height="45" fill="#81d4fa" stroke="#212121" strokeWidth="5" />
        <line x1="97" y1="160" x2="97" y2="205" stroke="#212121" strokeWidth="4" />
        <line x1="70" y1="182" x2="125" y2="182" stroke="#212121" strokeWidth="4" />
        <line x1="262" y1="160" x2="262" y2="205" stroke="#212121" strokeWidth="4" />
        <line x1="235" y1="182" x2="290" y2="182" stroke="#212121" strokeWidth="4" />
      </g>

      {/* Chalkboard */}
      <g transform="translate(520,280)">
        <rect x="0" y="0" width="260" height="170" rx="6" fill="#1b5e20" stroke="#5d4037" strokeWidth="14" />
        <rect x="0" y="0" width="260" height="170" fill="url(#chalkDots)" />
        <text x="28" y="70" fill="#fffde7" fontFamily="Bangers, Fredoka, sans-serif" fontSize="42">
          A B C
        </text>
        <text x="28" y="120" fill="#fff59d" fontFamily="Bangers, Fredoka, sans-serif" fontSize="36">
          1 2 3 ♪
        </text>
        <rect x="90" y="175" width="80" height="18" fill="#8d6e63" stroke="#212121" strokeWidth="4" />
      </g>

      {/* Cartoon kids with instruments — bold outlines */}
      <g transform="translate(200,360)">
        <circle cx="50" cy="48" r="38" fill="#ffcc80" stroke="#212121" strokeWidth="5" />
        <path d="M18 40 Q50 8 82 40" fill="#5d4037" stroke="#212121" strokeWidth="4" />
        <circle cx="38" cy="46" r="5" fill="#212121" />
        <circle cx="62" cy="46" r="5" fill="#212121" />
        <path d="M38 62 Q50 72 62 62" stroke="#212121" strokeWidth="4" fill="none" strokeLinecap="round" />
        <rect x="22" y="88" width="56" height="70" rx="12" fill="#e53935" stroke="#212121" strokeWidth="5" />
        {/* Tambourine */}
        <circle cx="95" cy="120" r="22" fill="#ffeb3b" stroke="#212121" strokeWidth="5" />
        <circle cx="95" cy="120" r="10" fill="none" stroke="#212121" strokeWidth="3" />
      </g>

      <g transform="translate(340,340)">
        <circle cx="50" cy="48" r="38" fill="#ffe0b2" stroke="#212121" strokeWidth="5" />
        <path d="M18 42 Q50 5 82 42" fill="#212121" />
        <circle cx="38" cy="46" r="5" fill="#212121" />
        <circle cx="62" cy="46" r="5" fill="#212121" />
        <path d="M38 60 Q50 70 62 60" stroke="#212121" strokeWidth="4" fill="none" strokeLinecap="round" />
        <rect x="22" y="88" width="56" height="78" rx="12" fill="#1e88e5" stroke="#212121" strokeWidth="5" />
        {/* Drum */}
        <ellipse cx="100" cy="130" rx="26" ry="18" fill="#8d6e63" stroke="#212121" strokeWidth="5" />
        <ellipse cx="100" cy="122" rx="26" ry="12" fill="#ff8a65" stroke="#212121" strokeWidth="4" />
      </g>

      <g transform="translate(480,370)">
        <circle cx="50" cy="48" r="36" fill="#ffccbc" stroke="#212121" strokeWidth="5" />
        <path d="M20 42 Q50 12 80 42" fill="#6a1b9a" stroke="#212121" strokeWidth="3" />
        <circle cx="38" cy="46" r="5" fill="#212121" />
        <circle cx="62" cy="46" r="5" fill="#212121" />
        <path d="M38 60 Q50 70 62 60" stroke="#212121" strokeWidth="4" fill="none" strokeLinecap="round" />
        <rect x="24" y="86" width="52" height="68" rx="12" fill="#43a047" stroke="#212121" strokeWidth="5" />
      </g>

      {/* Floating letters & notes */}
      <g className="note" fontFamily="Bangers, Fredoka, sans-serif" fontSize="52" fill="#e53935" stroke="#212121" strokeWidth="2">
        <text x="160" y="250">A</text>
      </g>
      <g className="note" fontFamily="Bangers, Fredoka, sans-serif" fontSize="48" fill="#1e88e5" stroke="#212121" strokeWidth="2">
        <text x="260" y="200">2</text>
      </g>
      <g className="note" fill="#f9a825" stroke="#212121" strokeWidth="2">
        <text x="1280" y="280" fontSize="64" fontFamily="Bangers, Fredoka, sans-serif">♪</text>
      </g>
      <g className="note" fill="#e53935" stroke="#212121" strokeWidth="2">
        <text x="1340" y="360" fontSize="52" fontFamily="Bangers, Fredoka, sans-serif">♫</text>
      </g>
      <g className="note" fontFamily="Bangers, Fredoka, sans-serif" fontSize="44" fill="#43a047" stroke="#212121" strokeWidth="2">
        <text x="70" y="320">+</text>
      </g>
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
