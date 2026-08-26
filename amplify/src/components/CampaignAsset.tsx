import type { assetLibrary } from '../data/campaign'

type AssetItem = (typeof assetLibrary)[number]

export function CampaignAsset({ asset }: { asset: AssetItem }) {
  return (
    <article className={`asset asset--${asset.kind}`} aria-label={asset.label}>
      {asset.kind === 'devices' && (
        <div className="asset__swatch" aria-hidden="true">
          <i /><i /><i /><i />
        </div>
      )}
      <h3 className="asset__label">
        {asset.kind === 'wordmark'
          ? 'AMPLIFY'
          : asset.kind === 'turnitup'
            ? 'TURN IT UP.'
            : asset.label}
      </h3>
      <p className="asset__note">{asset.note}</p>
    </article>
  )
}
