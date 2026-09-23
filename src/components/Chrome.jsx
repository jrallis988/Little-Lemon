import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  characters,
  footerColumns,
  searchIndex,
  sideLinks,
  topTabs,
} from '../data/content'
import { NickSplat } from './Brand'

const NICK_USER_KEY = 'nick-see-my-nick'

function loadNickUser() {
  try {
    return localStorage.getItem(NICK_USER_KEY) || ''
  } catch {
    return ''
  }
}

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
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [searchMsg, setSearchMsg] = useState('')
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [nickUser, setNickUser] = useState(() => loadNickUser())
  const [authMsg, setAuthMsg] = useState('')

  useEffect(() => {
    setNickUser(loadNickUser())
  }, [])

  const runSearch = (event) => {
    event.preventDefault()
    const needle = query.trim().toLowerCase()
    if (!needle) {
      setSearchMsg('Type a show, game, or hub.')
      return
    }

    const hit = searchIndex.find(
      (row) =>
        row.q.includes(needle) ||
        row.label.toLowerCase().includes(needle) ||
        needle.split(/\s+/).some((part) => part.length > 2 && row.q.includes(part)),
    )

    if (!hit) {
      setSearchMsg('No match — try slime, spongebob, or nick jr.')
      return
    }

    setSearchMsg(`Going to ${hit.label}…`)
    navigate(hit.to)
  }

  const logIn = (event) => {
    event.preventDefault()
    const name = user.trim() || 'SlimeKid'
    if (pass.trim().length < 1) {
      setAuthMsg('Enter any password (it’s pretend).')
      return
    }
    try {
      localStorage.setItem(NICK_USER_KEY, name)
    } catch {
      /* ignore */
    }
    setNickUser(name)
    setAuthMsg('')
    setPass('')
  }

  const logOut = () => {
    try {
      localStorage.removeItem(NICK_USER_KEY)
    } catch {
      /* ignore */
    }
    setNickUser('')
    setUser('')
    setAuthMsg('Logged out of See My Nick.')
  }

  const signUp = () => {
    const name = user.trim() || `NickFan${Math.floor(Math.random() * 90 + 10)}`
    setUser(name)
    setPass(pass || 'slime')
    try {
      localStorage.setItem(NICK_USER_KEY, name)
    } catch {
      /* ignore */
    }
    setNickUser(name)
    setAuthMsg(`Signed up as ${name} (local only).`)
  }

  return (
    <aside className="side-rail">
      <Link to="/" className="side-rail__brand" aria-label="Nick.com home">
        <NickSplat />
      </Link>

      <form className="side-search" onSubmit={runSearch}>
        <label className="side-search__label" htmlFor="nick-search">
          Search Nick.com
        </label>
        <div className="side-search__row">
          <input
            id="nick-search"
            type="search"
            placeholder="games, show, star…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Go</button>
        </div>
        {searchMsg ? <p className="side-search__msg">{searchMsg}</p> : null}
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

      <div className={`login-box${nickUser ? ' is-in' : ''}`}>
        <p className="login-box__title">See My Nick</p>
        {nickUser ? (
          <>
            <p className="login-box__hello">
              Welcome back, <strong>{nickUser}</strong>!
            </p>
            <p className="login-box__note">Local pretend session — no real account.</p>
            <button type="button" className="btn-nick" onClick={logOut}>
              Log Out
            </button>
          </>
        ) : (
          <form onSubmit={logIn} className="login-box__form">
            <label>
              UserName
              <input
                type="text"
                autoComplete="username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                autoComplete="current-password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </label>
            <div className="login-box__actions">
              <button type="submit" className="btn-nick">
                Log In
              </button>
              <button type="button" className="btn-nick btn-nick--ghost" onClick={signUp}>
                Sign Up
              </button>
            </div>
          </form>
        )}
        {authMsg ? <p className="login-box__msg">{authMsg}</p> : null}
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
