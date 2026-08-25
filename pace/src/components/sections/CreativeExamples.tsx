import { creativeAssets } from '../../data/content'

function visualClass(approach: string, pillar: string) {
  if (approach === 'Educational' || pillar === 'Training') return 'asset-visual--training'
  if (approach === 'Community' || pillar === 'Community') return 'asset-visual--community'
  if (approach === 'People-led' || pillar === 'People') return 'asset-visual--people'
  if (pillar === 'Culture') return 'asset-visual--culture'
  return 'asset-visual--product'
}

export function CreativeExamples() {
  return (
    <section className="section" id="creative">
      <div className="shell">
        <p className="section-kicker">08 — Creative examples</p>
        <h2 className="section-title">Twelve campaign assets ready for analysis.</h2>
        <p className="section-lede">
          Presentation frames for Instagram, TikTok, and YouTube creative. Final
          polish happens in Photoshop, Illustrator, Figma, Premiere, and After
          Effects — these boards establish the system the data will judge.
        </p>
        <div className="asset-grid">
          {creativeAssets.map((asset) => (
            <article className="asset-tile" key={asset.id}>
              <div
                className={`asset-visual ${visualClass(asset.approach, asset.pillar)}`}
                aria-hidden
              />
              {asset.pillar === 'Product' ? (
                <div className="shoe-mark" aria-hidden />
              ) : (
                <div className="runner-mark" aria-hidden />
              )}
              <div className="asset-body">
                <div className="asset-platform">
                  {asset.platform} · {asset.format}
                </div>
                <h3 className="asset-title">{asset.title}</h3>
                <p className="asset-caption">{asset.caption}</p>
                <div className="tag-row">
                  <span className="tag tag-lime">{asset.pillar}</span>
                  <span className="tag">{asset.approach}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
