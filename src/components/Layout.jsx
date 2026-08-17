import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { BottomBar, CharacterStrip, SideRail, TopTabs } from './Chrome'
import { SlimeCursor } from './Chaos'

const titles = {
  '/': 'Nickelodeon | Homepage',
  '/games': 'Nickelodeon | Games',
  '/shows': 'Nickelodeon | Shows',
  '/video': 'Nickelodeon | Video',
  '/fan': 'Nickelodeon | Your World',
  '/more': 'Nickelodeon | More',
  '/nick-jr': 'Nickelodeon | Nick Jr.',
  '/nick-news': 'Nickelodeon | Nick News',
  '/weekenders': 'Nickelodeon | Nick Weekenders',
  '/orbitz': 'Nickelodeon | Nick Orbitz',
}

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = titles[pathname] || 'Nick.com'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="nick-stage">
      <SlimeCursor />

      <div className="chaos-ticker" aria-hidden="true">
        <div className="chaos-ticker__track">
          <span>
            SLIME &gt; SLEEK · KIDS DESERVE CHAOS · CLICK EVERYTHING · NOT A
            BOARDROOM · GAMES ON THE HOMEPAGE · POLLS · CODES · MESS ·
          </span>
          <span>
            SLIME &gt; SLEEK · KIDS DESERVE CHAOS · CLICK EVERYTHING · NOT A
            BOARDROOM · GAMES ON THE HOMEPAGE · POLLS · CODES · MESS ·
          </span>
        </div>
      </div>

      <div className="ad-banner" role="note">
        <span className="ad-banner__tag">Ad</span>
        <strong>SpongeBob 10-Lane Bowling</strong>
        <span>— roll for slime high scores this weekend only!</span>
        <button type="button" className="ad-banner__cta">
          Play Free
        </button>
      </div>

      <TopTabs />

      <div className="nick-frame">
        <div className="nick-frame__jag" aria-hidden="true" />
        <CharacterStrip />
        <div className="nick-grid">
          <SideRail />
          <main className="nick-main">
            <Outlet />
          </main>
        </div>
        <BottomBar />
      </div>
    </div>
  )
}
