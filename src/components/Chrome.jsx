import { Link, NavLink } from 'react-router-dom'
import { characters, footerColumns, sideLinks, topTabs } from '../data/content'
import { NickSplat } from './Brand'

export function TopTabs() {
  return (
    <nav className="top-tabs" aria-label="Primary">
      {topTabs.map((tab) => (
        <NavLink
          key={tab.label}
          to={tab.to}
          end={Boolean(tab.end)}
          className={({ isActive }) =>
            `top-tabs__tab top-tabs__tab--${tab.tone}${isActive ? ' is-active' : ''}`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}

export function CharacterStrip() {
  return (
    <div className="char-strip" aria-label="Jump to a show">
      {characters.map((c) => (
        <Link
          key={c.id}
          to={`/shows#${c.id}`}
          className="char-strip__item"
          title={c.name}
          style={{ '--char-color': c.color }}
        >
          <span className="char-strip__bubble" aria-hidden="true">
            {c.emoji}
          </span>
          <span className="char-strip__name">{c.name}</span>
        </Link>
      ))}
    </div>
  )
}

export function SideRail() {
  return (
    <aside className="side-rail">
      <Link to="/" className="side-rail__brand" aria-label="Nick.com home">
        <NickSplat />
      </Link>

      <form
        className="side-search"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <label className="side-search__label" htmlFor="nick-search">
          Search Nick.com
        </label>
        <div className="side-search__row">
          <input id="nick-search" type="search" placeholder="games, show, star…" />
          <button type="submit">Go</button>
        </div>
      </form>

      <nav className="side-nav" aria-label="Quick links">
        {sideLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            end={Boolean(link.end)}
            className="side-nav__link"
          >
            <span className="side-nav__dot" aria-hidden="true" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="login-box">
        <p className="login-box__title">See My Nick</p>
        <label>
          UserName
          <input type="text" autoComplete="username" />
        </label>
        <label>
          Password
          <input type="password" autoComplete="current-password" />
        </label>
        <div className="login-box__actions">
          <button type="button" className="btn-nick">
            Log In
          </button>
          <button type="button" className="btn-nick btn-nick--ghost">
            Sign Up
          </button>
        </div>
      </div>

      <div className="side-extra">
        <Link to="/">Home</Link>
        <Link to="/weekenders">Nick Weekenders</Link>
        <Link to="/orbitz">Nick Orbitz</Link>
        <Link to="/parents">Parents</Link>
      </div>
    </aside>
  )
}

export function BottomBar() {
  return (
    <footer className="site-footer">
      <div className="site-footer__chars">
        {characters.slice(0, 8).map((c) => (
          <Link key={c.id} to="/shows" title={c.name} className="site-footer__char">
            <span aria-hidden="true">{c.emoji}</span>
          </Link>
        ))}
      </div>
      <div className="site-footer__columns">
        {footerColumns.map((col) => (
          <nav key={col.title} className="site-footer__col" aria-label={col.title}>
            <h2>{col.title}</h2>
            {col.links.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <p className="site-footer__note">
        Unofficial fan redesign inspired by classic Nick.com — not affiliated with
        Paramount or Nickelodeon.
      </p>
    </footer>
  )
}
