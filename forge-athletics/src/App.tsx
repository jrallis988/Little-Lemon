import { CaseNav, Section, Prose } from './components/Layout'
import { LogoSwitcher } from './components/LogoSwitcher'
import { ColorViewer, TypeViewer } from './components/Viewers'
import { PhotoDirection } from './components/PhotoDirection'
import {
  IncorrectUsage,
  ClearSpaceDemo,
  PrintCollateral,
  ApparelMockups,
  EnvironmentMockups,
  CampaignPosters,
  DigitalApps,
  ConsistencyChallenge,
  GuidelinesOverview,
  GraphicLanguageDemo,
} from './components/Mockups'
import { LogoConstruction, ForgeLogo } from './brand/logo'
import { brand, voiceDo, voiceDont, voiceExamples } from './brand/tokens'
import './App.css'

export default function App() {
  return (
    <div className="forge-case" id="top">
      <CaseNav />

      <header className="case-hero">
        <p className="hero-kicker">Brand Identity Case Study</p>
        <h1>
          <span className="hero-name">FORGE</span>
          <span className="hero-sub">ATHLETICS</span>
        </h1>
        <p className="hero-tagline">{brand.tagline}</p>
        <p className="hero-lead">
          A disciplined visual system for performance training — identity, standards, and
          applications across print, apparel, facility, campaign, and digital.
        </p>
        <div className="hero-logo">
          <ForgeLogo variant="horizontal" />
        </div>
      </header>

      <Section id="challenge" kicker="01" title="Challenge">
        <Prose>
          <p>
            Create a professional identity capable of functioning across training facilities,
            apparel, print, campaigns, and digital environments — serious, athletic, contemporary,
            confident, and premium.
          </p>
          <p>
            Avoid bodybuilding clichés, flames, shields, aggressive mascots, generic gym imagery,
            and esports aesthetics.
          </p>
        </Prose>
      </Section>

      <Section id="strategy" kicker="02" title="Strategy">
        <Prose>
          <p>
            Build a disciplined visual system rather than merely a logo. The brand is organized
            around five pillars:
          </p>
        </Prose>
        <ul className="pillar-row">
          {brand.pillars.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <Prose>
          <p>
            <strong>Concept:</strong> {brand.tagline} Work is the product. Progress is visible.
            Precision is non-negotiable.
          </p>
        </Prose>
      </Section>

      <Section id="logo" kicker="03" title="Logo">
        <Prose>
          <p>
            The mark is a geometric F constructed on an 8×8 unit grid. A full-width anvil plate
            at the baseline references forging on a solid surface — the only narrative detail,
            kept strictly geometric.
          </p>
          <p>
            Development path: grid construction → stem/arm ratios → optical shortening of the
            middle arm → anvil plate refinement → lockups. Production masters are finalized in
            Adobe Illustrator; this presentation uses the same geometry in SVG.
          </p>
        </Prose>
        <div className="logo-construct-row">
          <div>
            <p className="mock-label">Geometric Construction</p>
            <LogoConstruction className="construct-svg" />
          </div>
          <div>
            <p className="mock-label">Final Symbol</p>
            <div className="final-symbol-wrap">
              <ForgeLogo variant="symbol" />
            </div>
          </div>
        </div>
        <h3 className="subhead">Variations</h3>
        <LogoSwitcher />
      </Section>

      <Section id="standards" kicker="04" title="Clear Space & Minimum Size">
        <Prose>
          <p>
            Clear space equals the height of the symbol’s vertical stem (1×). Never crowd the
            mark with type, photography, or graphic elements inside that field.
          </p>
        </Prose>
        <ClearSpaceDemo />
      </Section>

      <Section id="incorrect" kicker="05" title="Incorrect Usage">
        <Prose>
          <p>
            Maintaining an identity matters as much as creating one. These violations are never
            permitted.
          </p>
        </Prose>
        <IncorrectUsage />
      </Section>

      <Section id="type" kicker="06" title="Typography">
        <TypeViewer />
      </Section>

      <Section id="color" kicker="07" title="Color">
        <ColorViewer />
      </Section>

      <Section id="system" kicker="08" title="Graphic Language">
        <Prose>
          <p>
            Lines, crop frames, measure ticks, large numbers, and training notation form a
            reusable language. Recognizable even when the logo is not prominent.
          </p>
        </Prose>
        <GraphicLanguageDemo />
      </Section>

      <Section id="photo" kicker="09" title="Photography">
        <PhotoDirection />
      </Section>

      <Section id="voice" kicker="10" title="Brand Voice">
        <div className="voice-grid">
          <div>
            <h3 className="subhead">Sound like</h3>
            <ul className="voice-list do">
              {voiceDo.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="subhead">Not like</h3>
            <ul className="voice-list dont">
              {voiceDont.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="voice-examples">
          {voiceExamples.map((ex) => (
            <div key={ex.good} className="voice-ex">
              <p className="voice-good">{ex.good}</p>
              <p className="voice-bad">{ex.bad}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="campaign" kicker="11" title="Campaign">
        <CampaignPosters />
      </Section>

      <Section id="applications" kicker="12" title="Print Applications">
        <PrintCollateral />
      </Section>

      <Section id="apparel" kicker="13" title="Apparel">
        <Prose>
          <p>
            Graphic-system applications — not a logo centered on every object. Left-chest marks,
            tonal wordmarks, zone numbers, side-panel notation.
          </p>
        </Prose>
        <ApparelMockups />
      </Section>

      <Section id="environment" kicker="14" title="Training Facility">
        <EnvironmentMockups />
      </Section>

      <Section id="digital" kicker="15" title="Digital Applications">
        <Prose>
          <p>
            Proof the identity holds digitally — hero, email, ad, mobile, social — without
            becoming a social-media case study.
          </p>
        </Prose>
        <DigitalApps />
      </Section>

      <Section id="consistency" kicker="16" title="Brand Consistency Challenge">
        <ConsistencyChallenge />
      </Section>

      <Section id="guidelines" kicker="17" title="Brand Guidelines">
        <GuidelinesOverview />
      </Section>

      <Section id="final" kicker="18" title="Final System" className="final-section">
        <Prose>
          <p>
            Logo, type, color, graphic language, photography, and standards operate as one
            system — fixed where consistency is critical, adaptive where format demands it.
          </p>
          <p className="final-disclaimer">
            FORGE ATHLETICS is a fictional self-initiated portfolio project created to
            demonstrate brand identity, graphic design, art direction, and professional
            brand-standards development.
          </p>
          <p className="final-tools">
            Identity development: Adobe Illustrator · Standards & collateral: Adobe InDesign ·
            Photography & campaigns: Adobe Photoshop · Case-study presentation: React / TypeScript
          </p>
        </Prose>
        <div className="final-mark">
          <ForgeLogo variant="vertical" />
          <p>{brand.tagline}</p>
        </div>
      </Section>

      <footer className="case-footer">
        <a href="../../index.html">← Back to Artistic Fountain</a>
        <span>FORGE ATHLETICS · Portfolio Case Study</span>
      </footer>
    </div>
  )
}
