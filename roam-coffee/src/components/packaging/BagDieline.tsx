import type { CoffeeVariety } from '../../data/brand';

/** Flat production dieline for a side-gusset coffee bag */
export function BagDieline({
  variety,
  showGuides = true,
  width = 640,
}: {
  variety: CoffeeVariety;
  showGuides?: boolean;
  width?: number;
}) {
  const height = width * 0.72;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 900 650"
      role="img"
      aria-label={`${variety.name} bag dieline with artwork`}
    >
      <defs>
        <pattern id="bleedHatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#E8A090" strokeWidth="1.5" opacity="0.5" />
        </pattern>
      </defs>

      <rect width="900" height="650" fill="#1A232C" />

      {/* Legend */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#E8E4DC">
        <rect x="24" y="20" width="14" height="14" fill="none" stroke="#E85A4A" strokeWidth="2" strokeDasharray="3 2" />
        <text x="46" y="31">BLEED 0.125"</text>
        <rect x="160" y="20" width="14" height="14" fill="none" stroke="#5BCAA8" strokeWidth="2" />
        <text x="182" y="31">TRIM</text>
        <rect x="240" y="20" width="14" height="14" fill="none" stroke="#6EA8FF" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="262" y="31">SAFE</text>
        <line x1="340" y1="27" x2="360" y2="27" stroke="#F0C674" strokeWidth="2" strokeDasharray="5 3" />
        <text x="368" y="31">FOLD</text>
        <rect x="440" y="20" width="14" height="14" fill="#3D7A78" opacity="0.5" />
        <text x="462" y="31">SEAL</text>
      </g>

      {/* Bleed area */}
      <rect x="40" y="60" width="820" height="520" fill="url(#bleedHatch)" opacity="0.35" />
      {showGuides && (
        <rect x="40" y="60" width="820" height="520" fill="none" stroke="#E85A4A" strokeWidth="2" strokeDasharray="6 4" />
      )}

      {/* Trim / panel structure: left gusset | front | right gusset | back */}
      <g transform="translate(55, 75)">
        {/* Left gusset */}
        <rect x="0" y="40" width="90" height="400" fill={variety.color} />
        <text
          x="45"
          y="250"
          textAnchor="middle"
          fill="#F3EFE8"
          fontFamily="Syne, sans-serif"
          fontSize="14"
          letterSpacing="0.2em"
          transform="rotate(-90 45 250)"
        >
          {variety.name}
        </text>

        {/* Front panel artwork */}
        <rect x="90" y="40" width="280" height="400" fill={variety.colorSoft} />
        <rect x="90" y="40" width="280" height="28" fill={variety.color} />
        <text
          x="230"
          y="59"
          textAnchor="middle"
          fill="#F3EFE8"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="8"
          letterSpacing="0.2em"
        >
          WHOLE BEAN
        </text>
        <text
          x="230"
          y="200"
          textAnchor="middle"
          fill={variety.ink}
          fontFamily="Syne, sans-serif"
          fontWeight="700"
          fontSize="42"
          letterSpacing="0.12em"
        >
          {variety.name}
        </text>
        <text
          x="230"
          y="230"
          textAnchor="middle"
          fill={variety.color}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="11"
          letterSpacing="0.18em"
        >
          {variety.roast.toUpperCase()}
        </text>
        <text
          x="230"
          y="280"
          textAnchor="middle"
          fill={variety.ink}
          fontFamily="Figtree, sans-serif"
          fontSize="12"
        >
          {variety.notes.join(' · ')}
        </text>
        <rect x="90" y="380" width="280" height="60" fill={variety.ink} />
        <text x="110" y="415" fill="#F3EFE8" fontFamily="Syne, sans-serif" fontSize="10" letterSpacing="0.08em">
          ROAM COFFEE
        </text>

        {/* Right gusset */}
        <rect x="370" y="40" width="90" height="400" fill={variety.color} opacity="0.85" />

        {/* Back panel */}
        <rect x="460" y="40" width="280" height="400" fill="#FBF8F3" />
        <text x="480" y="80" fill={variety.ink} fontFamily="Syne, sans-serif" fontWeight="700" fontSize="14" letterSpacing="0.15em">
          ROAM
        </text>
        <text x="480" y="120" fill={variety.ink} fontFamily="Syne, sans-serif" fontSize="11" letterSpacing="0.1em">
          ORIGIN
        </text>
        <text x="480" y="140" fill={variety.ink} fontFamily="Figtree, sans-serif" fontSize="13">
          {variety.origin}
        </text>
        <text x="480" y="180" fill={variety.ink} fontFamily="Syne, sans-serif" fontSize="11" letterSpacing="0.1em">
          BREW
        </text>
        <text x="480" y="200" fill={variety.ink} fontFamily="Figtree, sans-serif" fontSize="12">
          {variety.brew}
        </text>
        <rect x="480" y="320" width="100" height="40" fill="#fff" stroke={variety.ink} />
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x={486 + i * 6} y="326" width="2.5" height="28" fill={variety.ink} />
        ))}
        <text x="480" y="390" fill={variety.ink} opacity="0.5" fontFamily="IBM Plex Mono, monospace" fontSize="9">
          NET WT {variety.weight}
        </text>

        {/* Seal zone top */}
        <rect x="0" y="0" width="740" height="40" fill="#3D7A78" opacity="0.45" />
        <text
          x="370"
          y="25"
          textAnchor="middle"
          fill="#E8E4DC"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="10"
          letterSpacing="0.2em"
        >
          HEAT SEAL ZONE
        </text>

        {/* Fold lines */}
        {showGuides && (
          <>
            <line x1="90" y1="0" x2="90" y2="440" stroke="#F0C674" strokeWidth="1.5" strokeDasharray="8 5" />
            <line x1="370" y1="0" x2="370" y2="440" stroke="#F0C674" strokeWidth="1.5" strokeDasharray="8 5" />
            <line x1="460" y1="0" x2="460" y2="440" stroke="#F0C674" strokeWidth="1.5" strokeDasharray="8 5" />
            <rect x="0" y="0" width="740" height="440" fill="none" stroke="#5BCAA8" strokeWidth="2" />
            <rect x="14" y="54" width="712" height="372" fill="none" stroke="#6EA8FF" strokeWidth="1.5" strokeDasharray="5 4" />
          </>
        )}
      </g>

      <text
        x="450"
        y="620"
        textAnchor="middle"
        fill="#9AA6AE"
        fontFamily="Figtree, sans-serif"
        fontSize="13"
      >
        Flat artwork → fold on gusset lines → fill → heat-seal top → finished bag
      </text>
    </svg>
  );
}
