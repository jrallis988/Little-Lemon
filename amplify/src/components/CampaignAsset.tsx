import type { assetLibrary } from '../data/campaign'
import { graphicUrl, photoUrl, textureUrl } from './PhotoSlot'

type AssetItem = (typeof assetLibrary)[number]

export function CampaignAsset({ asset }: { asset: AssetItem }) {
  return (
    <article className={`asset asset--${asset.kind}`} aria-label={asset.label}>
      {asset.kind === 'wordmark' && (
        <img src={graphicUrl('logo-wordmark')} alt="" className="asset__preview" />
      )}
      {asset.kind === 'turnitup' && (
        <img src={graphicUrl('campaign-wordmark')} alt="" className="asset__preview" />
      )}
      {asset.kind === 'photo' && (
        <img src={photoUrl('artist-echo')} alt="" className="asset__preview asset__preview--cover" />
      )}
      {asset.kind === 'texture' && (
        <img src={textureUrl('hatch')} alt="" className="asset__preview asset__preview--cover" />
      )}
      {asset.kind === 'devices' && (
        <div className="asset__swatch" aria-hidden="true">
          <i /><i /><i /><i />
        </div>
      )}
      {asset.kind === 'motion' && (
        <img src={textureUrl('frequency-bars')} alt="" className="asset__preview" />
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
