import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { BottomNav } from './BottomNav'

const titles = {
  '/': 'Nickelodeon | Homepage',
  '/schedule': 'Nickelodeon | Schedule',
  '/shows': 'Nickelodeon | Shows',
  '/stream': 'Nickelodeon | Stream',
  '/arcade': 'Nickelodeon | Arcade',
  '/vault': 'Nickelodeon | Vault',
}

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = titles[pathname] || 'Nickelodeon'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="app-shell">
      <div className="app-shell__glow" aria-hidden="true" />
      <main className="app-main">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
