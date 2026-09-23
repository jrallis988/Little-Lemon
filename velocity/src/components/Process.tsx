const steps = [
  {
    num: '01',
    title: 'Sketch',
    body: 'Block athlete mass, concept word, and negative space for type.',
  },
  {
    num: '02',
    title: 'Type Exploration',
    body: 'Test scale, crop, rotation, and tracking while protecting readability.',
  },
  {
    num: '03',
    title: 'Photo Selection',
    body: 'Choose the plate where the decisive moment is already legible.',
  },
  {
    num: '04',
    title: 'Composition',
    body: 'Lock hierarchy: concept → athlete → numeric → brand.',
  },
  {
    num: '05',
    title: 'Refinement',
    body: 'Masking, grade, grain, and graphic devices in support roles.',
  },
  {
    num: '06',
    title: 'Final',
    body: 'Print-ready poster with digital adaptations derived afterward.',
  },
]

export function Process() {
  return (
    <section className="section section--paper" id="process">
      <div className="section__inner">
        <p className="section__eyebrow">13 — Process</p>
        <h2 className="section__title">Development</h2>
        <p className="section__lead">Concise and visual. The finished work remains the star.</p>

        <div className="process-steps">
          {steps.map((s) => (
            <article className="process-step" key={s.num}>
              <p className="process-step__num">{s.num}</p>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>

        <div className="process-visual" aria-hidden>
          <div className="process-thumb process-thumb--sketch">
            <span className="process-thumb__tag">Sketch</span>
          </div>
          <div className="process-thumb process-thumb--type">
            DRIVE
            <span className="process-thumb__tag">Type</span>
          </div>
          <div className="process-thumb process-thumb--photo">
            <img src="/velocity/dist/posters/running.jpg" alt="" />
            <span className="process-thumb__tag">Photo</span>
          </div>
          <div className="process-thumb process-thumb--comp">
            <img src="/velocity/dist/posters/running.jpg" alt="" />
            <span className="process-thumb__tag">Compose</span>
          </div>
          <div className="process-thumb process-thumb--refine">
            <img src="/velocity/dist/posters/running.jpg" alt="" />
            <span className="process-thumb__tag">Refine</span>
          </div>
          <div className="process-thumb process-thumb--final">
            <img src="/velocity/dist/posters/running.jpg" alt="" />
            <span
              style={{
                position: 'absolute',
                left: '6%',
                bottom: '18%',
                fontFamily: 'var(--display)',
                fontSize: '1.3rem',
                color: '#fff',
              }}
            >
              DRIVE
            </span>
            <span className="process-thumb__tag">Final</span>
          </div>
        </div>
      </div>
    </section>
  )
}
