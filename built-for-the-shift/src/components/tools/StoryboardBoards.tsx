const BOARDS = [
  { n: '01', title: 'ENTER', note: 'Wide rink. Breath before the burst.', mode: 'reset' },
  { n: '02', title: 'ACCELERATE', note: 'Low angle strides. Skate enters frame.', mode: 'accelerate' },
  { n: '03', title: 'PRODUCT CUT', note: 'Track matte to skate. Callout land.', mode: 'control' },
  { n: '04', title: 'CUT', note: 'Hard wipe. Edge pressure type.', mode: 'cut' },
  { n: '05', title: 'CONTACT', note: 'Impact squash. Helmet/pads.', mode: 'impact' },
  { n: '06', title: 'RELEASE', note: 'Stick → puck path. Expand.', mode: 'release' },
  { n: '07', title: 'STAT', note: 'Technical readout over hold.', mode: 'control' },
  { n: '08', title: 'RESOLVE', note: 'BUILT FOR THE SHIFT. End hold.', mode: 'reset' },
] as const

export function StoryboardBoards() {
  return (
    <div className="sb-boards">
      {BOARDS.map((b) => (
        <article key={b.n} className="sb-panel" data-mode={b.mode}>
          <div className="sb-panel__frame">
            <span className="sb-panel__n tech">{b.n}</span>
            <strong className="display">{b.title}</strong>
            <span className="sb-panel__mode tech">{b.mode}</span>
          </div>
          <p>{b.note}</p>
        </article>
      ))}
    </div>
  )
}
