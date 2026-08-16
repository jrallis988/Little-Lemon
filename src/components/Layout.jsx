import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { BottomBar, CharacterStrip, SideRail, TopTabs } from './Chrome'

const titles = {
  '/': 'Nickelodeon | Nick.com',
  '/games': 'Nickelodeon | Games',
  '/shows': 'Nickelodeon | Shows',
  '/music': 'Nickelodeon | Music',
  '/video': 'Nickelodeon | Video',
  '/fan': 'Nickelodeon | Your World',
  '/more': 'Nickelodeon | More',
}

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = titles[pathname] || 'Nick.com'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="nick-stage">
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
