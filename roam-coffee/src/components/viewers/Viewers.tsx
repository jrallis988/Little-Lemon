import { useState } from 'react';
import { rtdProducts, varieties } from '../../data/brand';
import { FamilyPresentation } from '../packaging/GiftBox';
import { RtdCan } from '../packaging/RtdCan';
import { WallMenu, PrintedMenu, Storefront, InteriorGraphics } from '../packaging/Retail';
import {
  PosCounterCard,
  PosWindowPoster,
  PosMenuInsert,
  PosShelfSign,
  PosTakeawayCard,
  PosLargePoster,
  ShelfSystem,
} from '../packaging/Pos';
import { CoffeeBag } from '../packaging/CoffeeBag';
import { BagDieline } from '../packaging/BagDieline';

export function FamilyViewer() {
  const [id, setId] = useState(varieties[0].id);
  const v = varieties.find((x) => x.id === id)!;
  return (
    <div className="viewer">
      <div className="viewer-bar" role="tablist" aria-label="Product family">
        {varieties.map((item) => (
          <button
            key={item.id}
            type="button"
            className="viewer-tab"
            role="tab"
            aria-selected={id === item.id}
            onClick={() => setId(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="viewer-stage" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <FamilyPresentation />
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <CoffeeBag variety={v} face="front" width={200} />
          <CoffeeBag variety={v} face="back" width={200} />
        </div>
      </div>
      <div className="viewer-note">
        Shared structure with directional pattern, color, and typography — not a recolor of one bag.
      </div>
    </div>
  );
}

const retailTabs = ['packaging', 'signage', 'menu', 'pos'] as const;

export function RetailViewer() {
  const [tab, setTab] = useState<(typeof retailTabs)[number]>('packaging');
  return (
    <div className="viewer">
      <div className="viewer-bar" role="tablist" aria-label="Retail view">
        {retailTabs.map((t) => (
          <button
            key={t}
            type="button"
            className="viewer-tab"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className="viewer-stage">
        {tab === 'packaging' && <ShelfSystem />}
        {tab === 'signage' && (
          <div style={{ display: 'grid', gap: '1.5rem', width: '100%' }}>
            <Storefront width={600} />
            <InteriorGraphics width={600} />
          </div>
        )}
        {tab === 'menu' && (
          <div style={{ display: 'grid', gap: '1.5rem', width: '100%', justifyItems: 'center' }}>
            <WallMenu width={520} />
            <PrintedMenu />
          </div>
        )}
        {tab === 'pos' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <PosCounterCard />
            <PosWindowPoster />
            <PosMenuInsert />
            <PosShelfSign />
            <PosTakeawayCard />
            <PosLargePoster />
          </div>
        )}
      </div>
      <div className="viewer-note">Retail view — packaging on shelf, signage, menus, and seasonal POS.</div>
    </div>
  );
}

export function ProductionViewer() {
  const [mode, setMode] = useState<'flat' | 'finished'>('flat');
  const variety = varieties[1];
  return (
    <div className="viewer">
      <div className="viewer-bar" role="tablist" aria-label="Production">
        <button type="button" className="viewer-tab" role="tab" aria-selected={mode === 'flat'} onClick={() => setMode('flat')}>
          Flat artwork
        </button>
        <button type="button" className="viewer-tab" role="tab" aria-selected={mode === 'finished'} onClick={() => setMode('finished')}>
          Finished package
        </button>
      </div>
      <div className="viewer-stage">
        {mode === 'flat' ? <BagDieline variety={variety} width={580} /> : <CoffeeBag variety={variety} width={260} />}
      </div>
      <div className="viewer-note">
        Production view — dieline with bleed, trim, safe, fold, and seal versus the finished bag.
      </div>
    </div>
  );
}

export function GalleryGrid() {
  return (
    <div className="gallery-grid">
      <div className="gallery-item panel" style={{ padding: '1rem' }}>
        <FamilyPresentation />
      </div>
      <div className="gallery-item panel" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', background: '#1A232C' }}>
        {rtdProducts.map((p) => (
          <RtdCan key={p.id} product={p} width={110} />
        ))}
      </div>
      <div className="gallery-item" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div className="panel" style={{ padding: '1rem', display: 'grid', placeItems: 'center' }}>
          <Storefront width={400} />
        </div>
        <div className="panel-dark" style={{ padding: '1rem', display: 'grid', placeItems: 'center' }}>
          <PosLargePoster />
        </div>
      </div>
    </div>
  );
}
