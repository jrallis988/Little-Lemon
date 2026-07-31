import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { networkStrip, networks } from '../data/content'

export function Home() {
  const featured = networks.filter((n) => n.id !== 'nick-at-nite')

  return (
    <div className="page page--home">
      <PageHeader title="Home" />

      <section className="intro">
        <p className="intro__lead">
          Equal spotlight on every Nick network block – dive in.
        </p>
      </section>

      <div className="network-strip" role="list" aria-label="Network blocks">
        {networkStrip.map((name) => (
          <span key={name} role="listitem" className="network-strip__item">
            {name}
          </span>
        ))}
      </div>

      <section className="network-grid" aria-label="Network showcase">
        {featured.map((network, index) => (
          <article
            key={network.id}
            className="network-card"
            style={{
              background: network.gradient,
              animationDelay: `${0.08 * index}s`,
            }}
          >
            <h2 className="network-card__name">{network.name}</h2>
            <p className="network-card__blurb">{network.blurb}</p>
            <p className="network-card__now">
              Also on now <span aria-hidden="true">•</span> {network.nowPlaying}
            </p>
          </article>
        ))}
      </section>

      <section className="home-cta">
        <h2 className="section-title">Every network. Equal energy.</h2>
        <p className="section-copy">
          Premieres, live events, and five balanced block rails — no single-show
          takeover.
        </p>
        <div className="home-cta__actions">
          <Link className="btn btn--primary" to="/schedule">
            See schedule
          </Link>
          <Link className="btn btn--ghost" to="/stream">
            Start streaming
          </Link>
        </div>
      </section>
    </div>
  )
}
