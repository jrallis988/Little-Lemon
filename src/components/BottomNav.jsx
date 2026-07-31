import { NavLink } from 'react-router-dom'
import { navItems } from '../data/content'
import { NavIcon } from './Icons'

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `bottom-nav__item${isActive ? ' is-active' : ''}`
          }
        >
          {({ isActive }) => (
            <>
              <span className="bottom-nav__icon">
                <NavIcon name={item.icon} active={isActive} />
              </span>
              <span className="bottom-nav__label">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
