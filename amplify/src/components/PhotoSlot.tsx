/** Resolves replaceable campaign assets under /assets/ */

const BASE = import.meta.env.BASE_URL

export function photoUrl(slot: string, ext: 'svg' | 'jpg' | 'png' = 'svg') {
  return `${BASE}assets/photography/${slot}.${ext}`
}

export function graphicUrl(name: string, ext: 'svg' | 'png' = 'svg') {
  return `${BASE}assets/graphics/${name}.${ext}`
}

export function textureUrl(name: string, ext: 'svg' | 'png' = 'svg') {
  return `${BASE}assets/textures/${name}.${ext}`
}

interface PhotoSlotProps {
  slot: string
  alt?: string
  className?: string
  label?: string
}

/** Drop a finished JPG/PNG with the same filename to replace the SVG stand-in. */
export function PhotoSlot({ slot, alt = '', className = '', label }: PhotoSlotProps) {
  return (
    <div className={`photo-slot ${className}`} data-slot={slot}>
      <img
        src={photoUrl(slot)}
        alt={alt}
        className="photo-slot__img"
        loading="lazy"
        onError={(e) => {
          // If svg missing, keep empty — CSS fallback shows
          const el = e.currentTarget
          el.style.display = 'none'
        }}
      />
      {label && <span className="photo-slot__label">{label}</span>}
    </div>
  )
}
