import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { brand } from '../data/campaign'

interface ReelProps {
  playing: boolean
  showSafeAreas?: boolean
}

export function Reel({ playing, showSafeAreas = false }: ReelProps) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: playing ? -1 : 0, paused: !playing })
      gsap.set('.reel-step', { autoAlpha: 0, y: 18 })

      tl.to('.reel-step--hook', { autoAlpha: 1, y: 0, duration: 0.35 })
        .to('.reel-step--hook', { autoAlpha: 0, y: -12, duration: 0.25, delay: 1.4 })
        .to('.reel-step--brand', { autoAlpha: 1, y: 0, duration: 0.3 })
        .to('.reel-step--brand', { autoAlpha: 0, y: -12, duration: 0.25, delay: 2.2 })
        .to('.reel-step--cuts', { autoAlpha: 1, y: 0, duration: 0.25 })
        .to('.reel-step--cuts .cut', {
          autoAlpha: 1,
          stagger: 0.35,
          duration: 0.2,
        })
        .to('.reel-step--cuts', { autoAlpha: 0, duration: 0.2, delay: 0.4 })
        .to('.reel-step--info', { autoAlpha: 1, y: 0, duration: 0.3 })
        .to('.reel-step--info', { autoAlpha: 0, y: -10, duration: 0.25, delay: 2.2 })
        .to('.reel-step--cta', { autoAlpha: 1, y: 0, duration: 0.35 })
        .to('.reel-step--cta', { autoAlpha: 1, duration: 2.2 })

      if (playing) tl.play(0)
      else {
        gsap.set('.reel-step--hook', { autoAlpha: 1, y: 0 })
      }

      return () => {
        tl.kill()
      }
    }, root)

    return () => ctx.revert()
  }, [playing])

  return (
    <div className="motion-stage" ref={root} aria-label="15-second Reel prototype">
      {showSafeAreas && <div className="social-frame__safe" aria-hidden="true" />}
      <div className="motion-stage__chrome" aria-hidden="true" />
      <div className="reel-proto">
        <div className="reel-step reel-step--hook">
          <p className="reel-proto__hook">VOLUME UP</p>
        </div>
        <div className="reel-step reel-step--brand">
          <p className="reel-proto__brand">{brand.name}</p>
          <p className="reel-proto__meta">Three days. One volume.</p>
        </div>
        <div className="reel-step reel-step--cuts">
          <p className="reel-proto__hook cut" style={{ opacity: 0 }}>
            ECHO PARK
          </p>
          <p className="reel-proto__meta cut" style={{ opacity: 0 }}>
            LUNA STATIC · NOVA REED · THE KILNS
          </p>
        </div>
        <div className="reel-step reel-step--info">
          <p className="reel-proto__brand" style={{ fontSize: '2.4rem' }}>
            AUG 14–16
          </p>
          <p className="reel-proto__meta">Portland, OR · Riverside Grounds</p>
        </div>
        <div className="reel-step reel-step--cta">
          <p className="reel-proto__brand">{brand.name}</p>
          <p className="reel-proto__cta">{brand.campaign}</p>
          <p className="reel-proto__meta">{brand.ticketUrl}</p>
        </div>
      </div>
    </div>
  )
}
