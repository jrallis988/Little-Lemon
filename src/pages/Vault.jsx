import { PageHeader } from '../components/PageHeader'
import { vaultItems } from '../data/content'

export function Vault() {
  return (
    <div className="page page--vault">
      <PageHeader title="Vault" />

      <section className="intro">
        <p className="intro__lead">
          Classics, deep cuts, and full-series rewinds from the Nick archives.
        </p>
      </section>

      <section className="vault-list" aria-label="Vault collection">
        {vaultItems.map((item, index) => (
          <article
            key={item.id}
            className="vault-card"
            style={{ animationDelay: `${0.05 * index}s` }}
          >
            <div className="vault-card__era">{item.era}</div>
            <h2 className="vault-card__title">{item.title}</h2>
            <p className="vault-card__blurb">{item.blurb}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
