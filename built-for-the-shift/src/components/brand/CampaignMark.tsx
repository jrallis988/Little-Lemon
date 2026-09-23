/** Campaign lockup mark — vector placeholder for Illustrator final. */
export function CampaignMark({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <div className={`campaign-mark campaign-mark--${size}`}>
      <svg viewBox="0 0 280 64" fill="none" aria-hidden="true" className="campaign-mark__svg">
        <path
          d="M8 48 L48 12 L72 36 L120 8 L160 40 L200 16 L272 16"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <rect x="252" y="40" width="14" height="14" fill="var(--shift-volt)" />
      </svg>
      <div className="campaign-mark__type">
        <span className="campaign-mark__built">BUILT FOR</span>
        <span className="campaign-mark__shift">THE SHIFT.</span>
      </div>
    </div>
  )
}

export function AdvertisingContrast() {
  return (
    <div className="contrast">
      <article className="contrast__col contrast__col--away">
        <p className="tech">NOT THIS</p>
        <h3 className="display">Broadcast Package</h3>
        <ul>
          <li>Network opens</li>
          <li>Scorebugs & matchups</li>
          <li>Lower thirds as the hero</li>
          <li>TV-graphics identity</li>
        </ul>
      </article>
      <article className="contrast__col contrast__col--toward">
        <p className="tech">THIS</p>
        <h3 className="display">Sports Advertising</h3>
        <ul>
          <li>Campaign film</li>
          <li>Athlete × product stories</li>
          <li>Performance → equipment</li>
          <li>Social / retail / arena system</li>
        </ul>
      </article>
    </div>
  )
}
