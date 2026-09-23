import { posters } from '../data/posters'

const pages = [
  { id: 'cover', title: 'VELOCITY', sub: 'Sports Poster & Art Direction Series' },
  { id: 'concept', title: 'Motion Defines the Moment', sub: 'Athletic action as design system' },
  { id: 'language', title: 'Motion Language', sub: 'Direction → Composition' },
  { id: 'collection', title: 'Poster Collection', sub: 'Six sports · One system' },
  { id: 'intensity', title: 'Campaign Intensity', sub: 'Rule-breaking hero pieces' },
  { id: 'applications', title: 'Applications', sub: 'Print · Arena · Digital · Apparel' },
]

export function Lookbook() {
  return (
    <section className="section section--paper" id="lookbook">
      <div className="section__inner">
        <p className="section__eyebrow">InDesign Lookbook</p>
        <h2 className="section__title">Printed presentation</h2>
        <p className="section__lead">
          A six-spread lookbook structure for the finished collection — ready to export from InDesign
          or print from the dedicated lookbook page.
        </p>

        <div className="lookbook-actions">
          <a className="lookbook-actions__btn" href="/velocity/dist/lookbook.html" target="_blank" rel="noreferrer">
            Open Printable Lookbook →
          </a>
          <p>Use browser Print → Save as PDF for a reviewable PDF deliverable.</p>
        </div>

        <div className="lookbook lookbook--rich" aria-label="Lookbook page structure">
          {pages.map((p, i) => (
            <article className={`lookbook__page${i === 0 ? ' lookbook__page--cover' : ''}`} key={p.id}>
              <p className="lookbook__spread">0{i + 1}</p>
              <div>
                <h4>{p.title}</h4>
                <p>{p.sub}</p>
              </div>
                  {i === 3 && (
                <div className="lookbook__thumbs" aria-hidden>
                  {posters.slice(0, 3).map((poster) => (
                    <img key={poster.id} src={poster.finished} alt="" />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
