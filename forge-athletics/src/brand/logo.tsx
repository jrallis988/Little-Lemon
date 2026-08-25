import type { ReactNode } from 'react'

/**
 * FORGE ATHLETICS — Logo System (SVG)
 *
 * Geometric construction: 8×8 unit grid, unit = 8.
 * Stem width = 2u, arm height = 2u, anvil plate = 1u × 8u.
 * The “anvil plate” baseline distinguishes the mark from a generic F
 * and references forging metal on a solid surface.
 *
 * Authored as precise SVG for this case-study presentation.
 * Production masters live in Adobe Illustrator.
 */

export type LogoVariant =
  | 'primary'
  | 'secondary'
  | 'wordmark'
  | 'symbol'
  | 'horizontal'
  | 'vertical'
  | 'oneColor'
  | 'reversed'
  | 'small'

type LogoProps = {
  variant?: LogoVariant
  className?: string
  title?: string
}

const BLACK = '#121212'
const BONE = '#F0EDE6'

/** Symbol — geometric F with anvil plate on 64×64 artboard */
export function ForgeSymbol({
  fill = BLACK,
  className,
  title = 'FORGE symbol',
}: {
  fill?: string
  className?: string
  title?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* Vertical stem: x=8,y=8 w=16 h=40 → then plate extends */}
      <rect x="8" y="8" width="16" height="40" fill={fill} />
      {/* Top arm */}
      <rect x="8" y="8" width="48" height="12" fill={fill} />
      {/* Middle arm — optically shorter */}
      <rect x="8" y="28" width="36" height="12" fill={fill} />
      {/* Anvil plate — full width baseline */}
      <rect x="8" y="52" width="48" height="4" fill={fill} />
    </svg>
  )
}

/** Wordmark only */
export function ForgeWordmark({
  fill = BLACK,
  className,
  stacked = false,
  small = false,
}: {
  fill?: string
  className?: string
  stacked?: boolean
  small?: boolean
}) {
  if (stacked) {
    return (
      <svg
        className={className}
        viewBox="0 0 280 120"
        role="img"
        aria-label="FORGE ATHLETICS"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>FORGE ATHLETICS</title>
        <text
          x="140"
          y="58"
          textAnchor="middle"
          fill={fill}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 72,
            letterSpacing: '0.08em',
          }}
        >
          FORGE
        </text>
        <text
          x="140"
          y="96"
          textAnchor="middle"
          fill={fill}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: '0.32em',
          }}
        >
          ATHLETICS
        </text>
      </svg>
    )
  }

  return (
    <svg
      className={className}
      viewBox={small ? '0 0 200 28' : '0 0 320 40'}
      role="img"
      aria-label="FORGE ATHLETICS"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>FORGE ATHLETICS</title>
      <text
        x="0"
        y={small ? 20 : 28}
        fill={fill}
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: small ? 22 : 32,
          letterSpacing: '0.1em',
        }}
      >
        FORGE
      </text>
      <text
        x={small ? 78 : 118}
        y={small ? 20 : 28}
        fill={fill}
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 500,
          fontSize: small ? 9 : 11,
          letterSpacing: '0.28em',
        }}
      >
        ATHLETICS
      </text>
    </svg>
  )
}

/** Primary lockup — symbol + stacked wordmark (vertical) */
function PrimaryVertical({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 200 260" role="img" aria-label="FORGE ATHLETICS">
      <title>FORGE ATHLETICS — primary vertical</title>
      <g transform="translate(68, 16)">
        <rect x="0" y="0" width="16" height="40" fill={fill} />
        <rect x="0" y="0" width="48" height="12" fill={fill} />
        <rect x="0" y="20" width="36" height="12" fill={fill} />
        <rect x="0" y="44" width="48" height="4" fill={fill} />
      </g>
      <text
        x="100"
        y="140"
        textAnchor="middle"
        fill={fill}
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: 56,
          letterSpacing: '0.08em',
        }}
      >
        FORGE
      </text>
      <text
        x="100"
        y="172"
        textAnchor="middle"
        fill={fill}
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.36em',
        }}
      >
        ATHLETICS
      </text>
    </svg>
  )
}

/** Horizontal lockup — symbol left, wordmark right */
function PrimaryHorizontal({ fill, compact }: { fill: string; compact?: boolean }) {
  const vb = compact ? '0 0 280 64' : '0 0 360 72'
  return (
    <svg viewBox={vb} role="img" aria-label="FORGE ATHLETICS">
      <title>FORGE ATHLETICS — horizontal</title>
      <g transform="translate(4, 10) scale(0.9)">
        <rect x="0" y="0" width="16" height="40" fill={fill} />
        <rect x="0" y="0" width="48" height="12" fill={fill} />
        <rect x="0" y="20" width="36" height="12" fill={fill} />
        <rect x="0" y="44" width="48" height="4" fill={fill} />
      </g>
      <line
        x1="64"
        y1="14"
        x2="64"
        y2="58"
        stroke={fill}
        strokeWidth="1"
        opacity="0.35"
      />
      <text
        x="80"
        y={compact ? 36 : 40}
        fill={fill}
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: compact ? 28 : 36,
          letterSpacing: '0.08em',
        }}
      >
        FORGE
      </text>
      <text
        x={compact ? 168 : 198}
        y={compact ? 36 : 40}
        fill={fill}
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 500,
          fontSize: compact ? 9 : 10,
          letterSpacing: '0.28em',
        }}
      >
        ATHLETICS
      </text>
    </svg>
  )
}

/** Secondary — wordmark with thin measurement rule */
function SecondaryMark({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 300 80" role="img" aria-label="FORGE ATHLETICS">
      <title>FORGE ATHLETICS — secondary</title>
      <text
        x="150"
        y="42"
        textAnchor="middle"
        fill={fill}
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: 48,
          letterSpacing: '0.1em',
        }}
      >
        FORGE
      </text>
      <line x1="40" y1="54" x2="260" y2="54" stroke={fill} strokeWidth="1" />
      {/* Measurement ticks */}
      <line x1="40" y1="50" x2="40" y2="58" stroke={fill} strokeWidth="1" />
      <line x1="150" y1="50" x2="150" y2="58" stroke={fill} strokeWidth="1" />
      <line x1="260" y1="50" x2="260" y2="58" stroke={fill} strokeWidth="1" />
      <text
        x="150"
        y="72"
        textAnchor="middle"
        fill={fill}
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 500,
          fontSize: 10,
          letterSpacing: '0.36em',
        }}
      >
        ATHLETICS
      </text>
    </svg>
  )
}

export function ForgeLogo({ variant = 'primary', className, title }: LogoProps) {
  const isReversed = variant === 'reversed'
  const fill = isReversed ? BONE : BLACK

  let content: ReactNode

  switch (variant) {
    case 'symbol':
    case 'oneColor':
      content = <ForgeSymbol fill={fill} title={title} />
      break
    case 'wordmark':
      content = <ForgeWordmark fill={fill} />
      break
    case 'secondary':
      content = <SecondaryMark fill={fill} />
      break
    case 'horizontal':
    case 'primary':
      content = <PrimaryHorizontal fill={fill} />
      break
    case 'vertical':
      content = <PrimaryVertical fill={fill} />
      break
    case 'small':
      content = <PrimaryHorizontal fill={fill} compact />
      break
    case 'reversed':
      content = <PrimaryHorizontal fill={BONE} />
      break
    default:
      content = <PrimaryHorizontal fill={fill} />
  }

  const darkGround = isReversed

  return (
    <div
      className={className}
      style={{
        background: darkGround ? BLACK : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: darkGround ? '1.5rem' : 0,
      }}
      data-variant={variant}
    >
      {content}
    </div>
  )
}

/** Construction diagram showing the 8-unit grid */
export function LogoConstruction({ className }: { className?: string }) {
  const u = 8
  return (
    <svg
      className={className}
      viewBox="0 0 160 160"
      role="img"
      aria-label="Logo geometric construction on 8-unit grid"
    >
      <title>Logo construction grid</title>
      {/* Grid */}
      {Array.from({ length: 9 }).map((_, i) => (
        <g key={i}>
          <line
            x1={16}
            y1={16 + i * u}
            x2={16 + 8 * u}
            y2={16 + i * u}
            stroke="#6E7276"
            strokeWidth="0.5"
            opacity="0.45"
          />
          <line
            x1={16 + i * u}
            y1={16}
            x2={16 + i * u}
            y2={16 + 8 * u}
            stroke="#6E7276"
            strokeWidth="0.5"
            opacity="0.45"
          />
        </g>
      ))}
      {/* Mark at 2× for clarity within diagram */}
      <g transform="translate(16, 16)">
        <rect x={u} y={u} width={2 * u} height={5 * u} fill="#121212" opacity="0.92" />
        <rect x={u} y={u} width={6 * u} height={1.5 * u} fill="#121212" opacity="0.92" />
        <rect x={u} y={3.5 * u} width={4.5 * u} height={1.5 * u} fill="#121212" opacity="0.92" />
        <rect x={u} y={6.5 * u} width={6 * u} height={0.5 * u} fill="#A84828" />
      </g>
      {/* Dimension labels */}
      <text
        x="80"
        y="148"
        textAnchor="middle"
        fill="#6E7276"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 8,
          letterSpacing: '0.12em',
        }}
      >
        8 × 8 UNIT GRID · STEM = 2u · PLATE = 0.5u
      </text>
    </svg>
  )
}
