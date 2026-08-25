import { useEffect } from 'react'
import { posters, type PosterId } from '../data/posters'
import { Poster } from './Poster'

interface LightboxProps {
  id: PosterId | null
  onClose: () => void
}

export function Lightbox({ id, onClose }: LightboxProps) {
  const poster = posters.find((p) => p.id === id) ?? null

  useEffect(() => {
    if (!id) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [id, onClose])

  if (!poster) return null

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${poster.sport} poster — ${poster.concept}`}
      onClick={onClose}
    >
      <button type="button" className="lightbox__close" onClick={onClose}>
        Close ✕
      </button>
      <div onClick={(e) => e.stopPropagation()}>
        <Poster poster={poster} />
      </div>
    </div>
  )
}
