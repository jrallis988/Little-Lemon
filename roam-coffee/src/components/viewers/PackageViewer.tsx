import { useState } from 'react';
import { varieties, type VarietyId } from '../../data/brand';
import { exportUrl, packagingExports } from '../../data/exports';
import { useExportAsset } from '../../hooks/useExportAsset';
import { CoffeeBag } from '../packaging/CoffeeBag';
import { BagDieline } from '../packaging/BagDieline';
import { ExportImage } from '../ui/ExportImage';

const faces = ['front', 'back', 'detail', 'dieline'] as const;
type Face = (typeof faces)[number];

export function PackageViewer() {
  const [varietyId, setVarietyId] = useState<VarietyId>('north');
  const [face, setFace] = useState<Face>('front');
  const variety = varieties.find((v) => v.id === varietyId)!;
  const files = packagingExports[varietyId];

  const frontSrc = exportUrl('02-packaging', files.front);
  const backSrc = exportUrl('02-packaging', files.back);
  const dielineSrc = exportUrl('02-packaging', files.dieline);

  const frontState = useExportAsset(frontSrc);
  const backState = useExportAsset(backSrc);
  const dielineState = useExportAsset(dielineSrc);

  const usingExport =
    (face === 'front' && frontState === 'ready') ||
    (face === 'back' && backState === 'ready') ||
    (face === 'detail' && frontState === 'ready') ||
    (face === 'dieline' && dielineState === 'ready');

  return (
    <div className="viewer">
      <div className="viewer-bar" role="tablist" aria-label="Variety">
        {varieties.map((v) => (
          <button
            key={v.id}
            type="button"
            className="viewer-tab"
            role="tab"
            aria-selected={varietyId === v.id}
            onClick={() => setVarietyId(v.id)}
          >
            {v.name}
          </button>
        ))}
      </div>
      <div className="viewer-bar" role="tablist" aria-label="View">
        {faces.map((f) => (
          <button
            key={f}
            type="button"
            className="viewer-tab"
            role="tab"
            aria-selected={face === f}
            onClick={() => setFace(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div className="viewer-stage">
        {face === 'front' && (
          <ExportImage
            src={frontSrc}
            alt={`${variety.name} bag front`}
            maxWidth={280}
            fallback={<CoffeeBag variety={variety} face="front" width={260} />}
          />
        )}
        {face === 'back' && (
          <ExportImage
            src={backSrc}
            alt={`${variety.name} bag back`}
            maxWidth={280}
            fallback={<CoffeeBag variety={variety} face="back" width={260} />}
          />
        )}
        {face === 'detail' && (
          <div style={{ display: 'grid', gap: '1rem', color: '#E8E4DC', maxWidth: 420 }}>
            <ExportImage
              src={frontSrc}
              alt={`${variety.name} bag detail`}
              maxWidth={200}
              fallback={<CoffeeBag variety={variety} face="front" width={180} />}
            />
            <div style={{ fontFamily: 'Figtree, sans-serif', fontSize: '0.95rem' }}>
              <p style={{ margin: '0 0 0.5rem', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.2rem' }}>
                {variety.name} — {variety.roast}
              </p>
              <p style={{ margin: '0 0 0.5rem', color: '#9AA6AE' }}>{variety.story}</p>
              <p style={{ margin: 0, fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.8rem', color: variety.color }}>
                {variety.origin} · {variety.notes.join(' · ')}
              </p>
            </div>
          </div>
        )}
        {face === 'dieline' && (
          <ExportImage
            src={dielineSrc}
            alt={`${variety.name} dieline`}
            maxWidth={640}
            fallback={<BagDieline variety={variety} width={560} />}
          />
        )}
      </div>
      <div className="viewer-note">
        {usingExport
          ? 'Showing Adobe export from public/exports/02-packaging/.'
          : 'Showing SVG scaffold — add roam-{variety}-front/back/dieline.png to replace.'}
      </div>
    </div>
  );
}
