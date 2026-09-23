type Props = {
  onReplay: () => void
  playing?: boolean
  label?: string
  children?: React.ReactNode
}

export function StageControls({ onReplay, playing, label = 'Replay', children }: Props) {
  return (
    <div className="stage-controls">
      <button type="button" className="btn btn--ghost btn--tiny" onClick={onReplay} disabled={playing}>
        {playing ? 'Playing…' : label}
      </button>
      {children}
    </div>
  )
}
