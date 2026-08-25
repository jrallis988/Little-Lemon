import type { ReactNode } from "react";
import type { SpreadKind } from "../data/publication";
import { ISSUE } from "../data/publication";
import "./MagazineSpread.css";

interface Props {
  kind: SpreadKind;
  variant?: string;
  showGrid?: boolean;
  pages?: string;
  className?: string;
}

function Folio({ left, right, section }: { left: string; right: string; section: string }) {
  return (
    <>
      <div className="ms-folio ms-folio--l">
        <span>{left}</span>
        <span className="ms-run">{ISSUE.title}</span>
      </div>
      <div className="ms-folio ms-folio--r">
        <span className="ms-run">{section}</span>
        <span>{right}</span>
      </div>
    </>
  );
}

function GridOverlay() {
  return (
    <div className="ms-grid-overlay" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}

function PageShell({
  children,
  tone = "paper",
  bleed,
}: {
  children: ReactNode;
  tone?: "paper" | "ink" | "ice";
  bleed?: boolean;
}) {
  return (
    <article className={`ms-page ms-page--${tone}${bleed ? " ms-page--bleed" : ""}`}>
      {children}
    </article>
  );
}

function CoverA() {
  return (
    <div className="ms-spread ms-spread--single">
      <PageShell tone="ink" bleed>
        <div className="ms-cover ms-cover--a">
          <div className="ms-cover-photo ms-photo ms-photo--athlete-glance" />
          <div className="ms-cover-scrim" />
          <header className="ms-cover-mast">
            <p className="ms-masthead">{ISSUE.title}</p>
            <p className="ms-tagline">{ISSUE.tagline}</p>
          </header>
          <div className="ms-cover-stories">
            <p className="ms-cover-lead">
              THE 0.3
              <br />
              SECOND
            </p>
            <p className="ms-cover-deck">Inside the decision before the puck leaves the stick</p>
            <ul className="ms-cover-sec">
              <li>The Work Nobody Sees</li>
              <li>Designed for Speed</li>
              <li>The Moment — Photo Essay</li>
            </ul>
          </div>
          <footer className="ms-cover-meta">
            <span>No. {ISSUE.number}</span>
            <span>{ISSUE.season}</span>
          </footer>
        </div>
      </PageShell>
    </div>
  );
}

function CoverB() {
  return (
    <div className="ms-spread ms-spread--single">
      <PageShell tone="paper" bleed>
        <div className="ms-cover ms-cover--b">
          <p className="ms-masthead ms-masthead--ink">{ISSUE.title}</p>
          <div className="ms-cover-b-grid">
            <div className="ms-photo ms-photo--stick-flex" />
            <div className="ms-cover-b-type">
              <p className="ms-cover-b-kicker">FEATURE</p>
              <h2>
                CUT
                <br />
                ON
                <br />
                CONTACT
              </h2>
              <p className="ms-cover-deck ink">Equipment geometry and the science of release.</p>
              <p className="ms-cover-meta-inline">
                No. {ISSUE.number} · {ISSUE.season}
              </p>
            </div>
          </div>
        </div>
      </PageShell>
    </div>
  );
}

function CoverC() {
  return (
    <div className="ms-spread ms-spread--single">
      <PageShell tone="ink" bleed>
        <div className="ms-cover ms-cover--c">
          <div className="ms-photo ms-photo--night-rink ms-cover-c-bg" />
          <div className="ms-cover-c-stack">
            <p className="ms-masthead">{ISSUE.title}</p>
            <p className="ms-tagline">{ISSUE.tagline}</p>
            <p className="ms-cover-c-issue">
              {ISSUE.season.toUpperCase()} · ISSUE {ISSUE.number}
            </p>
          </div>
          <p className="ms-cover-c-story">THE 0.3 SECOND</p>
        </div>
      </PageShell>
    </div>
  );
}

function TocSpread({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread">
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="02" right="" section="" />
        <div className="ms-toc-left">
          <p className="ms-section-label">CONTENTS</p>
          <h2 className="ms-toc-title">
            Issue
            <br />
            {ISSUE.number}
          </h2>
          <div className="ms-photo ms-photo--toc-athlete" />
          <p className="ms-caption">Cover athlete · training camp, morning skate</p>
        </div>
      </PageShell>
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="" right="03" section="CONTENTS" />
        <div className="ms-toc-right">
          {["PLAY", "PEOPLE", "PROCESS", "GEAR", "CULTURE"].map((sec, i) => (
            <div key={sec} className="ms-toc-block">
              <div className="ms-toc-sec-head">
                <span className="ms-toc-sec">{sec}</span>
                <span className="ms-toc-pg">{String(12 + i * 6).padStart(2, "0")}</span>
              </div>
              <p className="ms-toc-item">
                {i === 0 && "The 0.3 Second"}
                {i === 1 && "The Work Nobody Sees"}
                {i === 2 && "Five Minutes with a Strength Coach"}
                {i === 3 && "Designed for Speed"}
                {i === 4 && "The Moment"}
              </p>
            </div>
          ))}
        </div>
      </PageShell>
    </div>
  );
}

function EditorsSpread({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread">
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="04" right="" section="" />
        <div className="ms-editors">
          <p className="ms-section-label">FROM THE EDITOR</p>
          <h2 className="ms-editors-hed">
            Beyond
            <br />
            the score
          </h2>
          <div className="ms-photo ms-photo--editors ms-editors-img" />
        </div>
      </PageShell>
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="" right="05" section="EDITORIAL" />
        <div className="ms-editors-body">
          <p className="ms-dropcap-para">
            <span className="ms-drop">W</span>
            e built this issue around a single belief: the most interesting part of sport is rarely
            the number on the board. It is the quiet preparation, the equipment engineered to
            disappear in the hand, the photograph that freezes a decision you cannot see in real
            time.
          </p>
          <p>
            BREAKAWAY exists for readers who want journalism with the patience of a long skate and
            the clarity of a clean layout. In these pages you will find hockey dissected to
            three-tenths of a second, an athlete profile that stays in the weight room, and a
            photography essay that refuses to decorate.
          </p>
          <p>
            Thank you for reading past the scoreline.
          </p>
          <p className="ms-signature">— The Editors</p>
        </div>
      </PageShell>
    </div>
  );
}

function FeatureOpen({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread">
      <PageShell tone="ink" bleed>
        {showGrid && <GridOverlay />}
        <div className="ms-feature-open">
          <div className="ms-photo ms-photo--ice-action ms-feature-open-bg" />
          <div className="ms-feature-open-type">
            <p className="ms-section-label light">PLAY · FEATURE</p>
            <h2>
              THE
              <br />
              0.3
              <br />
              SECOND
            </h2>
          </div>
        </div>
      </PageShell>
      <PageShell tone="ink" bleed>
        {showGrid && <GridOverlay />}
        <div className="ms-feature-open-right">
          <p className="ms-deck light">
            Inside the decision that happens before the puck leaves the stick.
          </p>
          <p className="ms-caption light">Photography · rinkside sequence, period two</p>
          <p className="ms-folio-solo">12–13</p>
        </div>
      </PageShell>
    </div>
  );
}

function FeatureBody({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread">
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="14" right="" section="" />
        <div className="ms-cols-2">
          <p>
            The clock on the scoreboard lies. What looks continuous from the seats is, for the
            shooter, a sequence of micro-commitments: weight transfer, blade angle, shoulder
            rotation, eyes already past the goaltender’s near pad.
          </p>
          <p>
            Coaches talk about “quick release.” Athletes describe something closer to compression —
            time folding until the only available action is the one already chosen.
          </p>
          <p>
            We spent a week with a release specialist and a high-speed camera crew to map that
            window. The average elite wrister leaves the stick in roughly three-tenths of a second
            from the first intentional load.
          </p>
        </div>
        <div className="ms-photo ms-photo--stick-detail ms-inset" />
        <p className="ms-caption">Stick face at peak load — composite weave visible under frost.</p>
      </PageShell>
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="" right="15" section="PLAY" />
        <blockquote className="ms-pull">
          “You don’t think the shot. You recognize the lane and the body has already started.”
        </blockquote>
        <div className="ms-cols-2 ms-cols-2--tight">
          <p>
            That recognition is trained. Film study alone does not build it. Repetition under
            fatigue does — the same pattern until the nervous system stops negotiating.
          </p>
          <p>
            On the following pages: a diagram of the release path, shot-speed comparisons across a
            season, and the equipment variables that quietly change the window.
          </p>
        </div>
      </PageShell>
    </div>
  );
}

function FeatureStats({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread">
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="16" right="" section="" />
        <div className="ms-stats">
          <p className="ms-section-label">DECISION MAP</p>
          <div className="ms-diagram">
            <div className="ms-diagram-row">
              <span>0.00</span>
              <div className="ms-diagram-bar">
                <i style={{ width: "20%" }} />
              </div>
              <span>Plant</span>
            </div>
            <div className="ms-diagram-row">
              <span>0.12</span>
              <div className="ms-diagram-bar">
                <i style={{ width: "45%" }} />
              </div>
              <span>Load</span>
            </div>
            <div className="ms-diagram-row">
              <span>0.21</span>
              <div className="ms-diagram-bar">
                <i style={{ width: "70%" }} />
              </div>
              <span>Commit</span>
            </div>
            <div className="ms-diagram-row">
              <span>0.30</span>
              <div className="ms-diagram-bar">
                <i style={{ width: "100%" }} />
              </div>
              <span>Release</span>
            </div>
          </div>
          <p className="ms-caption">Fig. 01 — Average release timeline, sample of 48 shots</p>
        </div>
      </PageShell>
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="" right="17" section="PLAY" />
        <div className="ms-big-nums">
          <div>
            <p className="ms-num">98.4</p>
            <p className="ms-num-label">MPH peak wrister</p>
          </div>
          <div>
            <p className="ms-num">0.28</p>
            <p className="ms-num-label">SEC median release</p>
          </div>
          <div>
            <p className="ms-num">12°</p>
            <p className="ms-num-label">BLADE OPEN AT EXIT</p>
          </div>
        </div>
      </PageShell>
    </div>
  );
}

function ProfileOpen({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread">
      <PageShell tone="ink" bleed>
        {showGrid && <GridOverlay />}
        <div className="ms-photo ms-photo--portrait-quiet ms-full" />
      </PageShell>
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="" right="23" section="PEOPLE" />
        <div className="ms-profile-open">
          <p className="ms-section-label">ATHLETE PROFILE</p>
          <h2>
            THE WORK
            <br />
            NOBODY
            <br />
            SEES
          </h2>
          <p className="ms-deck">
            Before the lights, before the broadcast graphic, there is a Tuesday morning and a
            quiet rink.
          </p>
        </div>
      </PageShell>
    </div>
  );
}

function ProfileBody({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread">
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="24" right="" section="" />
        <div className="ms-profile-train">
          <p className="ms-section-label">TRAINING</p>
          <div className="ms-cols-2">
            <p>
              The session starts without ceremony. Mobility, then load, then on-ice edges. Nothing
              is filmed for social. The work is the point.
            </p>
            <p>
              “If it looks dramatic,” she says, “I probably did it wrong.” Efficiency over
              spectacle — a philosophy that resists the highlight reel.
            </p>
          </div>
          <div className="ms-timeblocks">
            <div>
              <strong>05:40</strong>
              <span>Activation</span>
            </div>
            <div>
              <strong>06:15</strong>
              <span>Strength</span>
            </div>
            <div>
              <strong>07:30</strong>
              <span>On ice</span>
            </div>
            <div>
              <strong>09:00</strong>
              <span>Recovery</span>
            </div>
          </div>
        </div>
      </PageShell>
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="" right="25" section="PEOPLE" />
        <div className="ms-qa-mini">
          <p className="ms-section-label">INTERVIEW EXCERPT</p>
          <p className="ms-q">
            <span>Q</span> What do you protect most fiercely?
          </p>
          <p className="ms-a">
            <span>A</span> The mornings. Once the day becomes public, the work has to already be
            done.
          </p>
          <p className="ms-q">
            <span>Q</span> How do you measure a good week?
          </p>
          <p className="ms-a">
            <span>A</span> Sleep, edges, and whether I left the rink quieter than I arrived.
          </p>
        </div>
      </PageShell>
    </div>
  );
}

function PhotoSpread({ variant, showGrid }: { variant?: string; showGrid?: boolean }) {
  const second = variant === "moment-2";
  return (
    <div className="ms-spread">
      <PageShell tone="ink" bleed>
        {showGrid && <GridOverlay />}
        <div
          className={`ms-photo ${second ? "ms-photo--wide-action" : "ms-photo--moment-a"} ms-full`}
        />
        <p className="ms-caption light ms-caption--overlay">
          {second ? "Board battle · frame 184" : "THE MOMENT · 01"}
        </p>
      </PageShell>
      <PageShell tone={second ? "paper" : "ink"} bleed={!second}>
        {showGrid && <GridOverlay />}
        {second ? (
          <div className="ms-photo-neg">
            <div className="ms-photo ms-photo--moment-b" />
            <p className="ms-caption">Caption only. Let the sequence breathe.</p>
            <p className="ms-folio-solo ink">32–33</p>
          </div>
        ) : (
          <>
            <div className="ms-photo ms-photo--moment-c ms-full" />
            <p className="ms-caption light ms-caption--overlay">Release · 1/2000s</p>
          </>
        )}
      </PageShell>
    </div>
  );
}

function GearSpread({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread">
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="38" right="" section="" />
        <div className="ms-gear">
          <p className="ms-section-label">GEAR</p>
          <h2 className="ms-gear-hed">
            DESIGNED
            <br />
            FOR SPEED
          </h2>
          <div className="ms-photo ms-photo--skate-hero" />
          <p className="ms-caption">Carbon chassis · exploded view reference</p>
        </div>
      </PageShell>
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="" right="39" section="GEAR" />
        <div className="ms-gear-specs">
          <p className="ms-deck ink" style={{ marginBottom: "1rem" }}>
            A skate is a negotiation between stiffness, weight, and the athlete’s preference for
            how the ice “talks back.”
          </p>
          <div className="ms-callouts">
            <div>
              <span className="ms-dot" />
              <div>
                <strong>Shell</strong>
                <p>Thermoformable composite, asymmetric ankle wrap</p>
              </div>
            </div>
            <div>
              <span className="ms-dot" />
              <div>
                <strong>Holder</strong>
                <p>Lightweight alloy, quick-release runner</p>
              </div>
            </div>
            <div>
              <span className="ms-dot" />
              <div>
                <strong>Liner</strong>
                <p>Moisture-channel knit, minimal break-in cycle</p>
              </div>
            </div>
          </div>
          <table className="ms-spec-table">
            <tbody>
              <tr>
                <td>Weight</td>
                <td>612 g</td>
              </tr>
              <tr>
                <td>Stiffness index</td>
                <td>95</td>
              </tr>
              <tr>
                <td>Runner</td>
                <td>280 mm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </PageShell>
    </div>
  );
}

function DataSpread({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread">
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="40" right="" section="" />
        <div className="ms-data">
          <p className="ms-section-label">SHOT SPEED</p>
          <div className="ms-chart">
            {[72, 84, 91, 98, 88, 95].map((v, i) => (
              <div key={i} className="ms-chart-col">
                <div className="ms-chart-bar" style={{ height: `${v}%` }} />
                <span>{v}</span>
              </div>
            ))}
          </div>
          <p className="ms-caption">Season sample · miles per hour</p>
        </div>
      </PageShell>
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="" right="41" section="PLAY" />
        <div className="ms-data-right">
          <p className="ms-section-label">TRAINING LOAD</p>
          <p className="ms-num ms-num--sm">4.2×</p>
          <p className="ms-num-label">BODYWEIGHT PEAK FORCE · LATERAL BOUND</p>
          <div className="ms-load-rows">
            <div>
              <span>Mon</span>
              <i style={{ width: "40%" }} />
            </div>
            <div>
              <span>Tue</span>
              <i style={{ width: "85%" }} />
            </div>
            <div>
              <span>Wed</span>
              <i style={{ width: "55%" }} />
            </div>
            <div>
              <span>Thu</span>
              <i style={{ width: "70%" }} />
            </div>
            <div>
              <span>Fri</span>
              <i style={{ width: "35%" }} />
            </div>
          </div>
          <p className="ms-caption">Relative load · internal session RPE × duration</p>
        </div>
      </PageShell>
    </div>
  );
}

function InterviewSpread({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread">
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="44" right="" section="" />
        <div className="ms-interview">
          <p className="ms-section-label">CONVERSATION</p>
          <h2 className="ms-interview-hed">Five Questions</h2>
          <p className="ms-q">
            <span>Q</span> When did competition stop being the loudest part of your life?
          </p>
          <p className="ms-a">
            <span>A</span> When I realized the scoreboard was a summary, not the story. The
            interesting work was always upstream.
          </p>
        </div>
      </PageShell>
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="" right="45" section="PEOPLE" />
        <div className="ms-interview ms-interview--cont">
          <p className="ms-q">
            <span>Q</span> What do you refuse to romanticize?
          </p>
          <p className="ms-a">
            <span>A</span> Pain as proof. Effort matters. Suffering for the camera does not.
          </p>
          <p className="ms-q">
            <span>Q</span> Where should a reader look if they want to understand an athlete?
          </p>
          <p className="ms-a">
            <span>A</span> The calendar. Not the interview. The unremarkable Tuesday tells you
            everything.
          </p>
        </div>
      </PageShell>
    </div>
  );
}

function DepartmentSpread({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread ms-spread--single">
      <PageShell>
        {showGrid && <GridOverlay />}
        <div className="ms-dept">
          <p className="ms-section-label">NUMBERS</p>
          <div className="ms-dept-grid">
            <div>
              <p className="ms-num">0.3</p>
              <p className="ms-num-label">SECONDS · AVERAGE RELEASE WINDOW</p>
            </div>
            <div>
              <p className="ms-num">56</p>
              <p className="ms-num-label">PAGES IN THIS ISSUE</p>
            </div>
            <div>
              <p className="ms-num">12</p>
              <p className="ms-num-label">COLUMN GRID</p>
            </div>
            <div>
              <p className="ms-num">5</p>
              <p className="ms-num-label">EDITORIAL SECTIONS</p>
            </div>
          </div>
          <p className="ms-caption">Department page · short-form rhythm between features</p>
        </div>
      </PageShell>
    </div>
  );
}

function BackCover() {
  return (
    <div className="ms-spread ms-spread--single">
      <PageShell tone="ink" bleed>
        <div className="ms-back">
          <div className="ms-photo ms-photo--back ms-back-photo" />
          <div className="ms-back-copy">
            <p className="ms-masthead">{ISSUE.title}</p>
            <p className="ms-tagline">{ISSUE.tagline}</p>
            <p className="ms-back-sub">Subscribe · Independent sports journalism, printed.</p>
            <div className="ms-barcode" aria-hidden="true" />
          </div>
        </div>
      </PageShell>
    </div>
  );
}

export function MagazineSpread({ kind, variant, showGrid, className }: Props) {
  const wrap = (node: ReactNode) => (
    <div className={`ms-root${className ? ` ${className}` : ""}`}>{node}</div>
  );

  switch (kind) {
    case "cover":
      if (variant === "cover-b") return wrap(<CoverB />);
      if (variant === "cover-c") return wrap(<CoverC />);
      return wrap(<CoverA />);
    case "toc":
      return wrap(<TocSpread showGrid={showGrid} />);
    case "editors":
      return wrap(<EditorsSpread showGrid={showGrid} />);
    case "feature-open":
      return wrap(<FeatureOpen showGrid={showGrid} />);
    case "feature-body":
      return wrap(<FeatureBody showGrid={showGrid} />);
    case "feature-stats":
      return wrap(<FeatureStats showGrid={showGrid} />);
    case "profile-open":
      return wrap(<ProfileOpen showGrid={showGrid} />);
    case "profile-body":
      return wrap(<ProfileBody showGrid={showGrid} />);
    case "photo":
      return wrap(<PhotoSpread variant={variant} showGrid={showGrid} />);
    case "gear":
      return wrap(<GearSpread showGrid={showGrid} />);
    case "data":
      return wrap(<DataSpread showGrid={showGrid} />);
    case "interview":
      return wrap(<InterviewSpread showGrid={showGrid} />);
    case "department":
      return wrap(<DepartmentSpread showGrid={showGrid} />);
    case "back":
      return wrap(<BackCover />);
    default:
      return wrap(<CoverA />);
  }
}
