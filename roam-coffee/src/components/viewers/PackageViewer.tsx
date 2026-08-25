import { useState } from 'react';
import { varieties, type VarietyId } from '../../data/brand';
import { CoffeeBag } from '../packaging/CoffeeBag';
import { BagDieline } from '../packaging/BagDieline';

const faces = ['front', 'back', 'detail', 'dieline'] as const;
type Face = (typeof faces)[number];

export function PackageViewer() {
  const [varietyId, setVarietyId] = useState<VarietyId>('north');
  const [face, setFace] = useState<Face>('front');
  const variety = varieties.find((v) => v.id === varietyId)!;

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
        {face === 'front' && <CoffeeBag variety={variety} face="front" width={260} />}
        {face === 'back' && <CoffeeBag variety={variety} face="back" width={260} />}
        {face === 'detail' && (
          <div style={{ display: 'grid', gap: '1rem', color: '#E8E4DC', maxWidth: 420 }}>
            <CoffeeBag variety={variety} face="front" width={180} />
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
        {face === 'dieline' && <BagDieline variety={variety} width={560} />}
      </div>
      <div className="viewer-note">
        Package viewer — front, back, detail, and production dieline for each variety.
      </div>
    </div>
  );
}
