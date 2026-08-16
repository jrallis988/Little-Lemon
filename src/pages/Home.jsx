import { useState } from 'react'
import { Link } from 'react-router-dom'
import { games, latelyRows, poll, shopBits, shows, videos } from '../data/content'

export function Home() {
  const [vote, setVote] = useState(poll.options[0])
  const [voted, setVoted] = useState(false)

  return (
    <div className="portal">
      <section className="hero-feature">
        <div className="hero-feature__badge">Featured Fun House</div>
        <h1 className="hero-feature__title">Jimmy Neutron&apos;s Fun House</h1>
        <p className="hero-feature__copy">
          Gadgets, goo, and giant bugs — click around, play now, and unlock
          secret rooms like it&apos;s 2004 again.
        </p>
        <div className="hero-feature__actions">
          <Link className="btn-nick btn-nick--big" to="/games">
            Play Now
          </Link>
          <Link className="btn-nick btn-nick--ghost" to="/shows">
            Meet Jimmy
          </Link>
        </div>
        <div className="hero-feature__art" aria-hidden="true">
          <span className="blob blob--brain">🧠</span>
          <span className="blob blob--bug">🐛</span>
        </div>
      </section>

      <div className="portal-cols">
        <div className="portal-cols__main">
          <section className="tile-row">
            <Link to="/games" className="mega-tile mega-tile--games">
              <span className="mega-tile__label">Games</span>
              <strong>SpongeBob Arcade</strong>
              <p>Bubble-pop races, jellyfishing, and slime bonuses.</p>
              <span className="mega-tile__emoji" aria-hidden="true">
                🧽
              </span>
            </Link>
            <Link to="/shows" className="mega-tile mega-tile--shows">
              <span className="mega-tile__label">Shows</span>
              <strong>Live + Toons</strong>
              <p>Unfabulous, Drake &amp; Josh, and Nicktoon premieres.</p>
              <span className="mega-tile__emoji" aria-hidden="true">
                📺
              </span>
            </Link>
          </section>

          <section className="lately" aria-label="Lately on Nick.com">
            <h2 className="panel-title">Lately on Nick.com</h2>
            {latelyRows.map((row) => (
              <div key={row.id} className={`lately__band lately__band--${row.tone}`}>
                <div className="lately__head">{row.label}</div>
                <div className="lately__items">
                  {row.items.map((item) => (
                    <button key={item} type="button" className="chip">
                      {item}
                    </button>
                  ))}
                </div>
                <Link className="lately__more" to={`/${row.id === 'weblab' ? 'video' : row.id === 'world' ? 'fan' : row.id}`}>
                  More {row.label}
                </Link>
              </div>
            ))}
          </section>

          <section className="also-on">
            <h2 className="panel-title">Also on Nick.com</h2>
            <div className="also-on__grid">
              {shopBits.map((bit) => (
                <article key={bit.id} className="also-card">
                  <h3>{bit.title}</h3>
                  <p>{bit.blurb}</p>
                  <button type="button" className="btn-nick btn-nick--small">
                    Check it out
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="portal-cols__side">
          <section className="video-box">
            <h2 className="panel-title panel-title--sm">Video</h2>
            <div className="video-box__screen" role="img" aria-label="Video player preview">
              <button type="button" className="video-box__play" aria-label="Play preview">
                ▶
              </button>
              <span>Drake &amp; Josh · New clip</span>
            </div>
            <ul className="video-box__list">
              {videos.slice(0, 3).map((v) => (
                <li key={v.id}>
                  <button type="button">
                    <span className="thumb" aria-hidden="true" />
                    <span>
                      <strong>{v.title}</strong>
                      <small>{v.length}</small>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="poll-box">
            <h2 className="panel-title panel-title--sm">Daily Poll</h2>
            <p className="poll-box__q">{poll.question}</p>
            <fieldset disabled={voted}>
              <legend className="sr-only">Choose one</legend>
              {poll.options.map((opt) => (
                <label key={opt} className="poll-box__opt">
                  <input
                    type="radio"
                    name="poll"
                    value={opt}
                    checked={vote === opt}
                    onChange={() => setVote(opt)}
                  />
                  {opt}
                </label>
              ))}
            </fieldset>
            <button
              type="button"
              className="btn-nick"
              onClick={() => setVoted(true)}
              disabled={voted}
            >
              {voted ? 'Thanks!' : 'Vote'}
            </button>
            {voted ? (
              <p className="poll-box__result">You voted: {vote}. Results refresh at midnight!</p>
            ) : null}
          </section>

          <section className="highlight-box">
            <h2 className="panel-title panel-title--sm">Nick.com Highlights</h2>
            <div className="highlight-box__card">
              <span aria-hidden="true">🏈</span>
              <div>
                <strong>Hey Arnold! Flashback</strong>
                <p>City stories, football-head wisdom, and weekend marathons.</p>
                <Link to="/shows">Watch the hub →</Link>
              </div>
            </div>
          </section>

          <section className="hot-list">
            <h2 className="panel-title panel-title--sm">Hot Plays</h2>
            <ul>
              {games.slice(0, 4).map((g) => (
                <li key={g.id}>
                  <Link to="/games">
                    <span className="hot-list__dot" style={{ background: g.accent }} />
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <section className="show-marquee" aria-label="Popular shows">
        {shows.slice(0, 6).map((show) => (
          <Link
            key={show.id}
            to={`/shows#${show.id}`}
            className="show-marquee__card"
            style={{ background: show.tone }}
          >
            <span>{show.tag}</span>
            <strong>{show.title}</strong>
          </Link>
        ))}
      </section>
    </div>
  )
}
