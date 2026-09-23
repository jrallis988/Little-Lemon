const examples = [
  {
    title: 'Hockey — Release',
    image: '/velocity/dist/posters/hockey.jpg',
    finalWord: 'RELEASE',
  },
  {
    title: 'Basketball — Rise',
    image: '/velocity/dist/posters/basketball.jpg',
    finalWord: 'RISE',
  },
  {
    title: 'Running — Drive',
    image: '/velocity/dist/posters/running.jpg',
    finalWord: 'DRIVE',
  },
]

const steps = ['Source', 'Masking', 'Environment', 'Graphics', 'Typography', 'Final'] as const

export function Compositing() {
  return (
    <section className="section" id="compositing">
      <div className="section__inner">
        <p className="section__eyebrow">07 — Compositing</p>
        <h2 className="section__title">Build stages</h2>
        <p className="section__lead">
          Professional stage presentation — not a faux Photoshop UI. Each example shows how a plate
          becomes campaign artwork.
        </p>

        <div className="comp-stack">
          {examples.map((ex) => (
            <div className="comp-example" key={ex.title}>
              <h3>{ex.title}</h3>
              <div className="comp-flow">
                {steps.map((step) => (
                  <div
                    className={`comp-step comp-step--${step.toLowerCase()}`}
                    key={`${ex.title}-${step}`}
                  >
                    <div
                      className="comp-step__frame"
                      data-word={step === 'Typography' || step === 'Final' ? ex.finalWord : undefined}
                    >
                      <img src={ex.image} alt="" />
                      {(step === 'Typography' || step === 'Final') && (
                        <span
                          style={{
                            position: 'absolute',
                            left: '4%',
                            bottom: '12%',
                            fontFamily: 'var(--display)',
                            fontSize: '1.4rem',
                            letterSpacing: '0.03em',
                            zIndex: 2,
                          }}
                        >
                          {ex.finalWord}
                        </span>
                      )}
                    </div>
                    <p className="comp-step__label">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
