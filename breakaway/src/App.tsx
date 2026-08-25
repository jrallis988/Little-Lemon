import { ISSUE, SECTIONS } from "./data/publication";
import { SpreadViewer } from "./components/SpreadViewer";
import { TypographyViewer } from "./components/TypographyViewer";
import { GridStudio } from "./components/GridStudio";
import { DigitalComparison } from "./components/DigitalComparison";
import { PhotoCompare } from "./components/PhotoCompare";
import { PromoStrip } from "./components/PromoStrip";
import { MagazineSpread } from "./components/MagazineSpread";
import "./App.css";

const NAV = [
  { id: "challenge", label: "Challenge" },
  { id: "concept", label: "Concept" },
  { id: "direction", label: "Direction" },
  { id: "type", label: "Typography" },
  { id: "grid", label: "Grid" },
  { id: "publication", label: "Publication" },
  { id: "features", label: "Features" },
  { id: "production", label: "Production" },
  { id: "digital", label: "Digital" },
  { id: "promo", label: "Promo" },
];

export default function App() {
  return (
    <div className="archive">
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a className="site-brand" href="../../index.html">
          Artistic Fountain
        </a>
        <p className="site-mark">
          <span>BREAKAWAY</span>
          <span>Editorial Case Study</span>
        </p>
        <nav className="site-nav" aria-label="Case study">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="main">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Self-initiated · Print editorial · InDesign</p>
            <h1>
              <span className="hero-mast">BREAKAWAY</span>
              <span className="hero-tag">{ISSUE.tagline}</span>
            </h1>
            <p className="hero-lede">
              A {ISSUE.pages}-page independent sports &amp; athlete journal — designed to demonstrate
              professional Adobe InDesign production, typography, grid systems, and multi-page
              consistency.
            </p>
            <dl className="hero-specs">
              <div>
                <dt>Format</dt>
                <dd>{ISSUE.format}</dd>
              </div>
              <div>
                <dt>Issue</dt>
                <dd>
                  No. {ISSUE.number} · {ISSUE.season}
                </dd>
              </div>
              <div>
                <dt>Grid</dt>
                <dd>{ISSUE.columns}-column · {ISSUE.baseline} baseline</dd>
              </div>
            </dl>
          </div>
          <div className="hero-cover" aria-hidden="true">
            <MagazineSpread kind="cover" variant="cover-a" />
          </div>
        </section>

        <section id="challenge" className="block">
          <div className="block-head">
            <p className="eyebrow">01</p>
            <h2>Challenge</h2>
          </div>
          <p className="prose">
            Create a contemporary sports publication capable of balancing long-form journalism,
            photography, statistics, equipment, and athlete storytelling — without resembling team
            marketing or social content.
          </p>
        </section>

        <section id="concept" className="block block--split">
          <div className="block-head">
            <p className="eyebrow">02</p>
            <h2>Concept</h2>
          </div>
          <div>
            <p className="concept-line">BEYOND THE SCORE.</p>
            <p className="prose">
              BREAKAWAY treats sport as culture, craft, and decision-making. The score is context;
              the publication’s job is everything surrounding it — preparation, equipment geometry,
              the photograph that freezes intent.
            </p>
          </div>
        </section>

        <section id="direction" className="block">
          <div className="block-head">
            <p className="eyebrow">03</p>
            <h2>Editorial Direction</h2>
          </div>
          <p className="prose narrow">
            Restrained identity: editorial, athletic, contemporary, intelligent, premium. Masthead
            in condensed display, cool paper stock, vermillion accent for urgency without franchise
            color language.
          </p>
          <ul className="section-list">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <strong>{s.name}</strong>
                <span>{s.desc}</span>
              </li>
            ))}
          </ul>
          <div className="swatches" aria-label="Color system">
            <div style={{ background: "#0B0B0B" }}>
              <span>Ink</span>
            </div>
            <div style={{ background: "#EBEEF1", color: "#0B0B0B" }}>
              <span>Paper</span>
            </div>
            <div style={{ background: "#E62314" }}>
              <span>Accent</span>
            </div>
            <div style={{ background: "#2C3E4E" }}>
              <span>Steel</span>
            </div>
            <div style={{ background: "#9EB6C4", color: "#0B0B0B" }}>
              <span>Ice</span>
            </div>
          </div>
        </section>

        <section id="type" className="block">
          <div className="block-head">
            <p className="eyebrow">04</p>
            <h2>Typography</h2>
          </div>
          <p className="prose narrow">
            Hierarchy is the primary craft demonstration: display, deck, body, caption, data, and
            utility — each with deliberate scale, leading, tracking, and measure.
          </p>
          <TypographyViewer />
        </section>

        <section id="grid" className="block">
          <div className="block-head">
            <p className="eyebrow">05</p>
            <h2>Grid System</h2>
          </div>
          <p className="prose narrow">
            One {ISSUE.columns}-column modular grid with {ISSUE.baseline} baseline. Layouts vary
            dramatically — article, photo-led, data-led, opening, interview — while sharing
            margins, folio, and running headers.
          </p>
          <GridStudio />
        </section>

        <section id="publication" className="block">
          <div className="block-head">
            <p className="eyebrow">06</p>
            <h2>Final Publication</h2>
          </div>
          <p className="prose narrow">
            Flat layouts from the InDesign document — master pages, paragraph/character/object
            styles, automatic numbering. Browse covers through back matter.
          </p>
          <SpreadViewer />
        </section>

        <section id="features" className="block">
          <div className="block-head">
            <p className="eyebrow">07</p>
            <h2>Features &amp; Departments</h2>
          </div>
          <div className="feature-grid">
            <article>
              <h3>Hockey Feature</h3>
              <p>
                <em>The 0.3 Second</em> — 8–10 pages of athlete photography, equipment detail, pull
                quotes, diagrams, and long-form text.
              </p>
            </article>
            <article>
              <h3>Athlete Profile</h3>
              <p>
                <em>The Work Nobody Sees</em> — portrait opener through training, interview,
                statistics, and closing image.
              </p>
            </article>
            <article>
              <h3>The Moment</h3>
              <p>
                Photography-led sequence: full bleed, double trucks, captions only — art direction
                over decoration.
              </p>
            </article>
            <article>
              <h3>Designed for Speed</h3>
              <p>
                Gear editorial with materials, specs, and callouts — journalism, not advertising.
              </p>
            </article>
            <article>
              <h3>Data &amp; Interview</h3>
              <p>
                Shot speed / training load graphics and a Q/A spread carried by typography alone.
              </p>
            </article>
            <article>
              <h3>Short-form</h3>
              <p>Numbers, Five Minutes, Object, Place, Archive — rhythm between long features.</p>
            </article>
          </div>
        </section>

        <section className="block">
          <div className="block-head">
            <p className="eyebrow">08</p>
            <h2>Photography</h2>
          </div>
          <p className="prose narrow">
            Direction favors rink light, equipment close-ups, and quiet portraits. Images are
            prepared in Photoshop for print resolution and CMYK soft-proofing, then placed as
            linked assets in InDesign.
          </p>
          <PhotoCompare />
        </section>

        <section id="production" className="block">
          <div className="block-head">
            <p className="eyebrow">09</p>
            <h2>Print Production</h2>
          </div>
          <div className="prod-grid">
            <div>
              <h3>Document</h3>
              <ul>
                <li>CMYK document color mode</li>
                <li>{ISSUE.bleed} bleed · safe margins inside live area</li>
                <li>Linked high-res imagery (300 ppi effective)</li>
                <li>Master/parent pages for folio &amp; running heads</li>
              </ul>
            </div>
            <div>
              <h3>Styles</h3>
              <ul>
                <li>Paragraph, character, and object styles</li>
                <li>Baseline grid lock for body text</li>
                <li>Text wrap on equipment insets</li>
                <li>Automatic page numbering</li>
              </ul>
            </div>
            <div>
              <h3>Output</h3>
              <ul>
                <li>Preflight profile (links, fonts, overset, bleed)</li>
                <li>Package for print vendor handoff</li>
                <li>PDF/X-1a export with crop marks</li>
                <li>Separations proof for accent plate</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="digital" className="block">
          <div className="block-head">
            <p className="eyebrow">10</p>
            <h2>Digital Adaptation</h2>
          </div>
          <p className="prose narrow">
            Selected stories recomposed for screen — not shrunk magazine pages. Reading width,
            image scale, and navigation change by breakpoint.
          </p>
          <DigitalComparison />
        </section>

        <section id="promo" className="block">
          <div className="block-head">
            <p className="eyebrow">11</p>
            <h2>Promotional Applications</h2>
          </div>
          <p className="prose narrow">
            Secondary system only. The magazine remains the centerpiece.
          </p>
          <PromoStrip />
        </section>

        <section className="block block--mockups">
          <div className="block-head">
            <p className="eyebrow">12</p>
            <h2>Physical Context</h2>
          </div>
          <p className="prose narrow">
            Flat layouts above are primary. Mockup frames below situate the same pages in hand and
            on a newsstand without hiding the design.
          </p>
          <div className="mock-row">
            <div className="mock mock--cover">
              <div className="mock-shadow">
                <MagazineSpread kind="cover" />
              </div>
              <span>Cover</span>
            </div>
            <div className="mock mock--open">
              <div className="mock-shadow">
                <MagazineSpread kind="feature-open" />
              </div>
              <span>Feature spread</span>
            </div>
            <div className="mock mock--open">
              <div className="mock-shadow">
                <MagazineSpread kind="gear" />
              </div>
              <span>Gear spread</span>
            </div>
          </div>
        </section>

        <section className="closing">
          <p>
            BREAKAWAY is a fictional self-initiated editorial design project created to demonstrate
            Adobe InDesign, typography, grid systems, sports art direction, print production, and
            multi-page publication design.
          </p>
          <p className="closing-meta">
            Portfolio presentation built in React + TypeScript as a digital design archive — not a
            replacement for the InDesign publication.
          </p>
          <a className="back-link" href="../../index.html">
            ← Artistic Fountain
          </a>
        </section>
      </main>
    </div>
  );
}
