import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

type BuildFn = (tl: gsap.core.Timeline, root: HTMLElement) => void

export function useMotionReplay(build: BuildFn, deps: unknown[] = []) {
  const rootRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const [playing, setPlaying] = useState(false)

  const play = useCallback(() => {
    const root = rootRef.current
    if (!root) return
    tlRef.current?.kill()
    gsap.killTweensOf(root.querySelectorAll('*'))
    const tl = gsap.timeline({
      onStart: () => setPlaying(true),
      onComplete: () => setPlaying(false),
    })
    tlRef.current = tl
    build(tl, root)
  }, [build, ...deps])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const t = window.setTimeout(play, 120)
    return () => {
      window.clearTimeout(t)
      tlRef.current?.kill()
    }
  }, [play])

  return { rootRef, play, playing }
}

export const pulseEase = 'power3.out'
export const snapEase = 'power4.out'
export const softEase = 'power2.inOut'
