const frames = [
  {
    state: 'Start',
    title: 'Find your rhythm',
    music: 'BPM rising · familiar openers',
    type: 'Open · Controlled · Spacious',
    color: '#2F6BFF',
  },
  {
    state: 'Flow',
    title: 'Hold your pace',
    music: 'Matched tempo · sustained energy',
    type: 'Rhythmic · Repeated · Consistent',
    color: '#1DB954',
  },
  {
    state: 'Push',
    title: 'Pick it up',
    music: 'Higher energy · denser edits',
    type: 'Compressed · Bold · Faster',
    color: '#C5FF3D',
  },
  {
    state: 'Beat',
    title: 'Go for it',
    music: 'Power track · peak intensity',
    type: 'Oversized · Dense · Explosive',
    color: '#FF5A36',
  },
  {
    state: 'Recover',
    title: 'Bring it down',
    music: 'Lower BPM · longer breath',
    type: 'Open · Quiet · Slower',
    color: '#8B5CFF',
  },
]

export function MotionBoard() {
  return (
    <section className="section" id="motion">
      <div className="shell">
        <p className="section-kicker">09b — Motion system</p>
        <h2 className="section-title">Type and color move with the soundtrack.</h2>
        <p className="section-lede">
          Storyboard frames for a campaign film—energy shifts with the music,
          not with a fitness dashboard.
        </p>
        <div className="motion-reel">
          {frames.map((frame, i) => (
            <article
              className="motion-frame"
              key={frame.state}
              style={{ ['--motion-accent' as string]: frame.color }}
            >
              <div className="motion-screen">
                <span className="motion-timecode">
                  {String(i * 3).padStart(2, '0')}:00
                </span>
                <p className="motion-state">{frame.state}</p>
                <h3>{frame.title}</h3>
                <div className="motion-wave" aria-hidden />
                <p className="motion-track">{frame.music}</p>
              </div>
              <p className="motion-type">{frame.type}</p>
            </article>
          ))}
        </div>
        <p className="gallery-note">
          Prototyped as still frames here. Final motion would be cut in Premiere /
          After Effects with licensed tracks and kinetic type.
        </p>
      </div>
    </section>
  )
}
