import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const WORDS = ['LOUD', 'LIVE', 'TOGETHER', 'AMPLIFY', 'TURN IT UP.'] as const

interface MotionTypographyProps {
  playing: boolean
}

export function MotionTypography({ playing }: MotionTypographyProps) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!root.current) return

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.type-proto__word')
      gsap.set(words, { autoAlpha: 0, scale: 0.92, y: 20 })

      const tl = gsap.timeline({ repeat: playing ? -1 : 0, paused: !playing })

      words.forEach((word, i) => {
        const hold = i === words.length - 1 ? 1.1 : 0.55
        tl.to(word, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.22,
          ease: 'power2.out',
        }).to(word, {
          autoAlpha: 0,
          scale: 1.06,
          y: -16,
          duration: 0.18,
          delay: hold,
          ease: 'power1.in',
        })
      })

      if (playing) tl.play(0)
      else gsap.set(words[0], { autoAlpha: 1, scale: 1, y: 0 })
    }, root)

    return () => ctx.revert()
  }, [playing])

  return (
    <div className="motion-stage" ref={root} aria-label="Motion typography prototype">
      <div className="type-proto">
        {WORDS.map((word) => (
          <p
            key={word}
            className="type-proto__word"
            style={{ color: word.includes('TURN') ? 'var(--signal)' : word === 'AMPLIFY' ? 'var(--volt)' : undefined }}
          >
            {word}
          </p>
        ))}
      </div>
    </div>
  )
}
