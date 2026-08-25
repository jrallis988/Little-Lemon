export function LargeFormat() {
  return (
    <section className="section section--soft" id="large-format">
      <div className="section__inner">
        <p className="section__eyebrow">10 — Large Format</p>
        <h2 className="section__title">Scale changes hierarchy</h2>
        <p className="section__lead">
          At arena and billboard scale, concept words become architecture. Secondary data steps back;
          photography and one primary message lead.
        </p>

        <div className="large-format">
          <div className="ribbon">
            <p className="ribbon__label">Arena Ribbon Display</p>
            <div className="ribbon__stage">
              <img src="./posters/hockey.jpg" alt="" />
              <div className="ribbon__type">
                <p className="poster__concept" style={{ margin: 0 }}>
                  RELEASE
                </p>
                <p className="ribbon__meta">
                  Single word + athlete plate. Stats drop off the ribbon; brand mark remains quiet top-left in full systems.
                </p>
              </div>
            </div>
          </div>

          <div className="ribbon">
            <p className="ribbon__label">Stadium Wall / Billboard</p>
            <div className="ribbon__stage" style={{ height: 'clamp(160px, 28vw, 240px)' }}>
              <img src="./posters/snowboard.jpg" alt="" style={{ width: '55%' }} />
              <div className="ribbon__type">
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--display)',
                      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                      letterSpacing: '0.2em',
                      margin: '0 0 0.5rem',
                    }}
                  >
                    VELOCITY
                  </p>
                  <p className="poster__concept" style={{ margin: 0, fontSize: 'clamp(2.8rem, 9vw, 5.5rem)' }}>
                    AIR
                  </p>
                </div>
                <p className="ribbon__meta">
                  Extreme width favors asymmetric crop. Environment carries scale; type stays sparse.
                </p>
              </div>
            </div>
          </div>

          <div className="ribbon">
            <p className="ribbon__label">Retail Window</p>
            <div className="ribbon__stage">
              <img src="./posters/basketball.jpg" alt="" style={{ width: '35%' }} />
              <div className="ribbon__type">
                <p className="poster__concept" style={{ margin: 0 }}>
                  RISE
                </p>
                <p className="ribbon__meta">
                  Vertical glass reads like the poster. Window vinyl can isolate the athlete silhouette against interior light.
                </p>
              </div>
            </div>
          </div>

          <p className="large-note">
            Hierarchy rule: as physical size increases, message count decreases. One concept word,
            one athlete, one brand — then stop.
          </p>
        </div>
      </div>
    </section>
  )
}
