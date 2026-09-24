import type { ReactNode } from 'react';
import { RoamLogo } from './components/logo/RoamLogo';
import { PackageViewer } from './components/viewers/PackageViewer';
import { FamilyViewer, RetailViewer, ProductionViewer, GalleryGrid } from './components/viewers/Viewers';
import { LabelSystemDemo } from './components/packaging/Labels';
import { RtdCan } from './components/packaging/RtdCan';
import { GiftBox } from './components/packaging/GiftBox';
import { HotCup, ColdCup, CupSleeve, TakeawayBag } from './components/packaging/Cups';
import { TravelMug, CeramicMug, ToteBag, TShirt, Hat } from './components/packaging/Merch';
import { WallMenu, PrintedMenu, Storefront, InteriorGraphics } from './components/packaging/Retail';
import {
  ShelfSystem,
  RetailPoster,
  PosCounterCard,
  PosWindowPoster,
  PosMenuInsert,
  PosShelfSign,
  PosTakeawayCard,
  PosLargePoster,
} from './components/packaging/Pos';
import { BagDieline } from './components/packaging/BagDieline';
import { CoffeeBag } from './components/packaging/CoffeeBag';
import {
  AdobeWorkflow,
  ExportManifest,
  PreflightChecklist,
  ProcessTimeline,
} from './components/sections/Process';
import { ExportStatusPanel } from './components/sections/ExportStatus';
import { ColorSystem, InsightStrip, SpecSheet, TypeSpecimen } from './components/sections/SystemBoards';
import { brand, caseStudyNav, rtdProducts, varieties } from './data/brand';

const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

function Section({
  id,
  label,
  title,
  lead,
  children,
}: {
  id: string;
  label: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section className="section" id={id}>
      <div className="shell">
        <p className="section-label">{label}</p>
        <h2 className="section-title">{title}</h2>
        {lead ? <p className="section-lead">{lead}</p> : null}
        <div className="section-body">{children}</div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="app">
      <a className="skip-link" href="#challenge">
        Skip to case study
      </a>

      <header className="site-header">
        <div className="shell header-inner">
          <a href="/index.html" className="back-link">
            ← Artistic Fountain
          </a>
          <nav className="case-nav" aria-label="Case study">
            {caseStudyNav.slice(0, 8).map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
            <a href="#gallery">Gallery</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-media" aria-hidden>
          <img src={img('roam-hero-atmosphere.png')} alt="" />
          <div className="hero-veil" />
        </div>
        <div className="shell hero-inner">
          <p className="hero-kicker animate-rise">Packaging & Retail Identity</p>
          <h1 className="hero-brand animate-rise-delay">
            <span>ROAM</span>
            <span className="hero-brand-sub">COFFEE</span>
          </h1>
          <p className="hero-line animate-rise-delay-2">{brand.tagline}</p>
          <div className="hero-mark animate-rise-delay-2">
            <RoamLogo variant="symbol" ink="#F3EFE8" accent="#B85A32" width={72} height={72} />
          </div>
        </div>
      </section>

      <Section
        id="challenge"
        label="Challenge"
        title="Can this identity leave the screen and survive the shelf?"
        lead="Build a specialty coffee system that works across bags, dielines, cups, menus, and a small shop — not a logo deck."
      >
        <InsightStrip
          items={[
            { label: 'Audience', value: 'Ages 20–45' },
            { label: 'Channels', value: 'Pack · Retail · POS' },
            { label: 'Proof', value: 'Physical first' },
          ]}
        />
        <div className="panel-dark panel-pad prose" style={{ marginTop: '1.25rem' }}>
          <p>
            Specialty coffee lives under fluorescent light, in a customer’s hand, and on a gusset that has to fold
            cleanly. Hierarchy has to hold at arm’s length. Four SKUs have to read as one family without becoming
            palette swaps. Production thinking starts before the mockup.
          </p>
        </div>
      </Section>

      <Section
        id="concept"
        label="Concept"
        title={brand.tagline}
        lead="Travel as attitude — warmth, curiosity, motion — never as luggage tags or destination kitsch."
      >
        <div className="concept-split">
          <div className="concept-copy">
            <div className="panel panel-pad">
              <p className="kicker">Positioning</p>
              <p>
                ROAM is coffee for mornings before a flight, afternoons between errands, and evenings when the route
                home is the long way. Premium and approachable. Contemporary without cold minimalism.
              </p>
            </div>
            <div className="panel panel-pad">
              <p className="kicker">Avoided</p>
              <p>
                Rustic burlap, excessive brown, fake vintage seals, hipster clichés, and generic beige-luxury
                packaging. Ink, ember, teal, and directional color carry the system instead.
              </p>
            </div>
          </div>
          <figure className="concept-photo">
            <img src={img('roam-bag-hero.png')} alt="ROAM coffee bag hero still" />
          </figure>
        </div>
      </Section>

      <Section
        id="identity"
        label="Identity"
        title="A mark built for distance, print, and quiet confidence."
        lead="Primary lockup, wordmark, symbol, secondary, one-color, reversed, and small-scale."
      >
        <div className="identity-grid">
          <div className="panel panel-pad identity-card">
            <p className="kicker">Primary</p>
            <RoamLogo variant="primary" />
          </div>
          <div className="panel panel-pad identity-card">
            <p className="kicker">Wordmark</p>
            <RoamLogo variant="wordmark" />
          </div>
          <div className="panel panel-pad identity-card">
            <p className="kicker">Symbol</p>
            <RoamLogo variant="symbol" />
          </div>
          <div className="panel panel-pad identity-card">
            <p className="kicker">Secondary</p>
            <RoamLogo variant="secondary" />
          </div>
          <div className="panel panel-pad identity-card">
            <p className="kicker">One-color</p>
            <RoamLogo variant="oneColor" />
          </div>
          <div className="panel-dark panel-pad identity-card">
            <p className="kicker" style={{ color: '#5A9A97' }}>
              Reversed
            </p>
            <RoamLogo variant="reversed" />
          </div>
          <div className="panel panel-pad identity-card">
            <p className="kicker">Small-scale</p>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <RoamLogo variant="small" />
              <RoamLogo variant="small" width={20} height={20} />
            </div>
          </div>
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <TypeSpecimen />
        </div>
        <div style={{ marginTop: '1.25rem' }}>
          <ColorSystem />
        </div>
      </Section>

      <Section
        id="architecture"
        label="Product Architecture"
        title="Four directions. Four cups. One family."
        lead="North, East, South, and West — immediately distinguishable, clearly ROAM."
      >
        <div className="grid-4">
          {varieties.map((v) => (
            <article key={v.id} className="panel variety-card" style={{ borderTop: `4px solid ${v.color}` }}>
              <div className="panel-pad">
                <h3 style={{ color: v.ink, marginBottom: '0.25rem' }}>{v.name}</h3>
                <p
                  style={{
                    color: v.color,
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                  }}
                >
                  {v.roast.toUpperCase()}
                </p>
                <p style={{ color: v.ink, opacity: 0.8, marginTop: '0.75rem' }}>{v.notes.join(' · ')}</p>
                <p style={{ color: v.ink, opacity: 0.55, fontSize: '0.9rem' }}>{v.origin}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="packaging"
        label="Packaging"
        title="Coffee bags — front, back, detail, dieline."
        lead="Brand, product, roast, flavor, origin, weight, brew info, and barcode placeholder on every SKU."
      >
        <figure className="bleed-photo">
          <img src={img('roam-bag-family.png')} alt="ROAM coffee bag family product still" />
          <figcaption>Product family still — four bags, one system.</figcaption>
        </figure>
        <div style={{ marginTop: '1.5rem' }}>
          <PackageViewer />
        </div>
      </Section>

      <Section
        id="dielines"
        label="Dielines"
        title="From flat production file to finished package."
        lead="Bleed, trim, safe, fold, seal, and artwork — production knowledge, not only mockups."
      >
        <BagDieline variety={varieties[0]} width={700} />
        <div className="grid-2" style={{ marginTop: '1.25rem' }}>
          <div className="panel-dark panel-pad prose">
            <p>
              Artwork sits on a side-gusset dieline. Color bars clear the seal zone. Fold lines separate left gusset,
              front, right gusset, and back. After print: fold, fill, heat-seal — the flat file becomes the bag.
            </p>
          </div>
          <SpecSheet variety={varieties[0]} />
        </div>
      </Section>

      <Section
        id="family"
        label="Product Family"
        title="One system, four destinations."
        lead="Typography, illustration, pattern, and geographic reference create variation — not a palette swap."
      >
        <FamilyViewer />
      </Section>

      <Section
        id="labels"
        label="Label System"
        title="Variable data without breaking the system."
        lead="Reusable labels for roast, origin, batch, roast date, and flavor notes."
      >
        <div className="panel panel-pad">
          <LabelSystemDemo />
        </div>
      </Section>

      <Section
        id="rtd"
        label="Ready-to-Drink"
        title="Cold brew that feels related — not copied."
        lead="Original, Oat, and Vanilla. Front, back, nutrition, and family presentation."
      >
        <figure className="bleed-photo">
          <img src={img('roam-rtd-family.png')} alt="ROAM cold brew cans" />
          <figcaption>RTD family — related structure, distinct from the bags.</figcaption>
        </figure>
        <div className="rtd-row" style={{ marginTop: '1.5rem' }}>
          {rtdProducts.map((p) => (
            <div key={p.id} className="rtd-pair">
              <RtdCan product={p} face="front" width={130} />
              <RtdCan product={p} face="back" width={130} />
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="box"
        label="Gift Box"
        title="The ROAM Collection."
        lead="Four coffees. Four regions. One box — exterior, interior, and information card."
      >
        <div className="grid-2">
          <div className="panel-dark panel-pad" style={{ display: 'grid', placeItems: 'center' }}>
            <GiftBox view="exterior" />
          </div>
          <div className="panel-dark panel-pad" style={{ display: 'grid', placeItems: 'center' }}>
            <GiftBox view="interior" />
          </div>
        </div>
        <div className="panel panel-pad" style={{ marginTop: '1rem', display: 'grid', placeItems: 'center' }}>
          <GiftBox view="card" />
        </div>
      </Section>

      <Section
        id="cups"
        label="Cup System"
        title="Identity on disposable objects."
        lead="Hot cup, cold cup, sleeve, and takeaway bag — logo placement shifts with the form."
      >
        <div className="merch-row">
          <HotCup />
          <ColdCup />
          <div style={{ display: 'grid', gap: '1rem', alignContent: 'center' }}>
            <CupSleeve />
            <TakeawayBag />
          </div>
        </div>
      </Section>

      <Section
        id="merch"
        label="Merchandise"
        title="Restrained goods people might actually buy."
        lead="Travel mug, ceramic mug, tote, tee, and hat — quieter than the packaging, still unmistakably ROAM."
      >
        <div className="merch-row">
          <TravelMug />
          <CeramicMug />
          <ToteBag />
          <TShirt />
          <Hat />
        </div>
      </Section>

      <Section
        id="retail"
        label="Retail"
        title="Graphics for a small shop — exterior and interior."
        lead="Storefront sign, window graphics, hours, door, menu board, wayfinding, pickup, and shelf strips."
      >
        <figure className="bleed-photo">
          <img src={img('roam-storefront.png')} alt="ROAM coffee shop exterior mood" />
          <figcaption>Exterior mood — signage has to read from the sidewalk.</figcaption>
        </figure>
        <div style={{ display: 'grid', gap: '1.25rem', marginTop: '1.5rem' }}>
          <Storefront width={700} />
          <InteriorGraphics width={700} />
          <RetailViewer />
        </div>
      </Section>

      <Section
        id="menu"
        label="Menu"
        title="Hierarchy that changes with distance."
        lead="Wall menus favor category and price at a glance. Printed menus carry detail and supporting lines."
      >
        <div className="grid-2">
          <div>
            <p className="kicker" style={{ marginBottom: '0.75rem' }}>
              Wall menu
            </p>
            <WallMenu width={480} />
          </div>
          <div>
            <p className="kicker" style={{ marginBottom: '0.75rem' }}>
              Printed menu
            </p>
            <PrintedMenu />
          </div>
        </div>
      </Section>

      <Section
        id="shelf"
        label="Retail Shelf"
        title="Packaging has to win at arm’s length."
        lead="Bags, shelf labels, price cards, descriptions, and small promotional signage in a competitive set."
      >
        <ShelfSystem />
      </Section>

      <Section
        id="pos"
        label="Point of Sale"
        title="Go somewhere warm."
        lead="A winter campaign inside the ROAM system — counter card, window poster, insert, shelf sign, takeaway card, large format."
      >
        <div className="merch-row" style={{ alignItems: 'flex-start' }}>
          <PosCounterCard />
          <PosWindowPoster />
          <PosMenuInsert />
          <PosShelfSign />
          <PosTakeawayCard />
          <PosLargePoster />
        </div>
      </Section>

      <Section
        id="posters"
        label="Poster Series"
        title="Retail posters with typography at the center."
        lead="Start somewhere. Take the long way. Coffee for wherever you’re going."
      >
        <div className="poster-row">
          <RetailPoster line={'START\nSOMEWHERE.'} sub="Open daily · 7am–6pm" tone="ink" />
          <RetailPoster line={'TAKE THE\nLONG WAY.'} sub="Whole bean · cold brew · espresso" tone="ember" />
          <RetailPoster line={'COFFEE FOR\nWHEREVER.'} sub="North · East · South · West" tone="teal" />
        </div>
      </Section>

      <Section
        id="hierarchy"
        label="Information Design"
        title="Attractive without sacrificing usability."
        lead="Brand → product → roast → origin → flavor → brewing → legal."
      >
        <div className="hierarchy-demo panel panel-pad">
          <ol className="hierarchy-list">
            <li>
              <strong>Brand</strong> — ROAM mark and wordmark, first read at distance
            </li>
            <li>
              <strong>Product</strong> — NORTH / EAST / SOUTH / WEST as the hero name
            </li>
            <li>
              <strong>Roast</strong> — secondary line in mono, color-coded
            </li>
            <li>
              <strong>Origin</strong> — supporting geographic proof
            </li>
            <li>
              <strong>Flavor</strong> — three-note sensory summary
            </li>
            <li>
              <strong>Brewing</strong> — back panel utility
            </li>
            <li>
              <strong>Legal / required</strong> — weight, barcode, packer line in the quiet zone
            </li>
          </ol>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <CoffeeBag variety={varieties[1]} width={200} />
          </div>
        </div>
      </Section>

      <Section
        id="process"
        label="Process"
        title="From positioning to press-ready thinking."
        lead="Strategy through identity, packaging, retail, and production — with a clear path for Adobe originals."
      >
        <ProcessTimeline />
      </Section>

      <Section
        id="tools"
        label="Tools"
        title="Illustrator first. Photoshop and InDesign where they belong."
        lead="This React site presents the system. Final artwork lives in professional design applications."
      >
        <AdobeWorkflow />
        <div style={{ marginTop: '1.25rem' }}>
          <ExportManifest />
        </div>
        <div style={{ marginTop: '1.25rem' }}>
          <ExportStatusPanel />
        </div>
      </Section>

      <Section
        id="production"
        label="Production"
        title="Files that can go to press."
        lead="CMYK thinking, spot accents, bleed, trim, safe areas, dielines, barcode placement, and preflight."
      >
        <ProductionViewer />
        <div style={{ marginTop: '1.25rem' }}>
          <PreflightChecklist />
        </div>
        <div className="grid-2" style={{ marginTop: '1.25rem' }}>
          <div className="panel-dark panel-pad prose">
            <p className="kicker" style={{ color: '#5A9A97' }}>
              Demonstrated here
            </p>
            <p>
              Annotated dieline, barcode clearance, flat-to-finished comparison, and a production spec for North.
              Presentation uses SVG + photography comps; press files export as PDF/X from Illustrator.
            </p>
          </div>
          <div className="panel-dark panel-pad prose">
            <p className="kicker" style={{ color: '#5A9A97' }}>
              Not claimed
            </p>
            <p>
              No simulated press checks, substrate testing, or converter setup. Those belong on press with a
              printer — this shows the graphic production thinking that precedes them.
            </p>
          </div>
        </div>
      </Section>

      <Section id="gallery" label="Gallery" title="The finished system, large.">
        <GalleryGrid />
      </Section>

      <Section id="final" label="Final System" title="Off the screen, into the world.">
        <div className="panel panel-pad final-note">
          <p>
            ROAM COFFEE is a fictional self-initiated portfolio project created to demonstrate packaging design,
            retail graphics, typography, production design, and physical brand implementation.
          </p>
          <p style={{ marginTop: '1rem', opacity: 0.7, fontSize: '0.95rem' }}>
            This React presentation exists to show the work. The visual system is designed for Illustrator,
            Photoshop, and InDesign production workflows.
          </p>
        </div>
      </Section>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <RoamLogo variant="secondary" ink="#F3EFE8" accent="#B85A32" />
          <p className="muted">Fictional brand · Portfolio case study · Artistic Fountain</p>
        </div>
      </footer>
    </div>
  );
}
