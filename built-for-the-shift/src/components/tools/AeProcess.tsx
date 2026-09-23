const PANELS = [
  {
    id: 'timeline',
    title: 'Timeline Structure',
    items: ['Master_Comp_30', 'Pre_Athlete', 'Pre_Product', 'Pre_Type', 'Pre_EndCard', 'Audio_Bed'],
    note: 'Pre-comps named by job — not by effect.',
  },
  {
    id: 'graph',
    title: 'Graph Editor',
    items: ['Accelerate = steep ease-out', 'Cut = hard linear snaps', 'Reset = long settle'],
    note: 'Easing follows on-ice energy, not one global curve.',
  },
  {
    id: 'track',
    title: 'Tracking / Mattes',
    items: ['Null → skate track', 'Track matte product isolate', 'Mask feather for ice spray'],
    note: 'Athlete plate drives product reveal timing.',
  },
  {
    id: 'expr',
    title: 'Expressions / Templates',
    items: ['ctrl_athleteName', 'ctrl_statValue', 'ctrl_productSKU', 'ctrl_format'],
    note: 'Essential Graphics–ready controllers for scale production.',
  },
] as const

export function AeProcessPanels() {
  return (
    <div className="ae-grid">
      {PANELS.map((p) => (
        <article key={p.id} className="ae-panel">
          <h3 className="tech">{p.title}</h3>
          <ul>
            {p.items.map((item) => (
              <li key={item}>
                <code>{item}</code>
              </li>
            ))}
          </ul>
          <p>{p.note}</p>
        </article>
      ))}
    </div>
  )
}

const DELIVERABLES = [
  { file: 'SHIFT_Hero_30_16x9.mp4', spec: '1920×1080 · 23.976 · ProRes / H.264' },
  { file: 'SHIFT_Hero_15_16x9.mp4', spec: 'Cutdown · OLV / paid' },
  { file: 'SHIFT_Hero_06_1x1.mp4', spec: '1080×1080 · paid bumper' },
  { file: 'SHIFT_Social_9x16_Reel.mp4', spec: '1080×1920 · Reels / TikTok / Shorts' },
  { file: 'SHIFT_Social_4x5_Feed.mp4', spec: '1080×1350 · IG feed' },
  { file: 'SHIFT_AthleteIntro_Template.aep', spec: 'Editable EG controls' },
  { file: 'SHIFT_ProductReveal_Template.aep', spec: 'SKU / callouts / benefit' },
  { file: 'SHIFT_KeyArt_Horizontal.psd', spec: 'From motion style frame' },
  { file: 'SHIFT_Retail_Loop_9x16.mp4', spec: 'In-store silent loop' },
  { file: 'SHIFT_Arena_Sting_16x9.mp4', spec: '0.8–1.2s sting' },
] as const

export function DeliveryPackage() {
  return (
    <div className="delivery">
      <p className="kicker" style={{ color: 'var(--shift-volt)' }}>
        Delivery Package · Naming Convention
      </p>
      <div className="delivery-table">
        {DELIVERABLES.map((d) => (
          <div key={d.file} className="delivery-row">
            <code>{d.file}</code>
            <span>{d.spec}</span>
          </div>
        ))}
      </div>
      <p className="placeholder-note">
        Drop finals into <code>public/media/</code> using these names — web slots already map to them.
      </p>
    </div>
  )
}
