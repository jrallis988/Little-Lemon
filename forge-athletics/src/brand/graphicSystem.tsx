import type { ReactNode } from 'react'

/** Reusable graphic-language primitives for FORGE */

type FrameProps = {
  children?: ReactNode
  label?: string
  className?: string
}

export function CropFrame({ children, label, className }: FrameProps) {
  return (
    <div className={`crop-frame ${className ?? ''}`}>
      <span className="crop-corner crop-tl" aria-hidden />
      <span className="crop-corner crop-tr" aria-hidden />
      <span className="crop-corner crop-bl" aria-hidden />
      <span className="crop-corner crop-br" aria-hidden />
      {label && <span className="crop-label">{label}</span>}
      {children}
    </div>
  )
}

export function MeasureRule({
  label = '01',
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <div className={`measure-rule ${className ?? ''}`} aria-hidden>
      <span className="measure-tick" />
      <span className="measure-line" />
      <span className="measure-tick" />
      <span className="measure-label">{label}</span>
    </div>
  )
}

export function TrainingNotation({
  set = 'SET 03',
  rep = 'REP 08',
  load = 'MASS 95',
}: {
  set?: string
  rep?: string
  load?: string
}) {
  return (
    <div className="training-notation" aria-hidden>
      <span>{set}</span>
      <span className="tn-sep">/</span>
      <span>{rep}</span>
      <span className="tn-sep">/</span>
      <span>{load}</span>
    </div>
  )
}

export function LargeNumber({
  value,
  caption,
}: {
  value: string
  caption?: string
}) {
  return (
    <div className="large-number">
      <span className="ln-value">{value}</span>
      {caption && <span className="ln-caption">{caption}</span>}
    </div>
  )
}

export function HatchPattern({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="forge-hatch"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="8"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#forge-hatch)" />
    </svg>
  )
}
