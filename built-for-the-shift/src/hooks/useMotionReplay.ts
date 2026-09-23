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
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    tlRef.current?.kill()
    gsap.killTweensOf(root.querySelectorAll('*'))
    const tl = gsap.timeline({
      onStart: () => setPlaying(true),
      onComplete: () => setPlaying(false),
    })
    tlRef.current = tl
    build(tl, root)
    if (reduced) {
      tl.progress(1)
      setPlaying(false)
    }
  }, [build, ...deps])

  useEffect(() => {
    const t = window.setTimeout(play, 80)
    return () => {
      window.clearTimeout(t)
      const tl = tlRef.current
      if (tl) {
        tl.progress(1)
        tl.kill()
      }
    }
  }, [play])

  return { rootRef, play, playing }
}

export const easeOut = 'power3.out'
export const easeCut = 'power4.out'
export const easeSoft = 'power2.inOut'
