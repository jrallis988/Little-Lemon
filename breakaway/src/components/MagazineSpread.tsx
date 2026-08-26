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

/** Recurring Issue 08 identifier */
function IssueMark({ light }: { light?: boolean }) {
  return (
    <div className={`ms-issue-mark${light ? " ms-issue-mark--light" : ""}`} aria-hidden="true">
      <span className="ms-issue-mark-line" />
      <span>ISSUE {ISSUE.number}</span>
    </div>
  );
}

/** Thin rink line device — red center / blue line */
function RinkRule({ tone = "red" }: { tone?: "red" | "blue" }) {
  return <div className={`ms-rink-rule ms-rink-rule--${tone}`} aria-hidden="true" />;
}

function Folio({
  left,
  right,
  section,
}: {
  left: string;
  right: string;
  section: string;
}) {
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
  tone?: "paper" | "ink" | "ice" | "rink";
  bleed?: boolean;
}) {
  return (
    <article className={`ms-page ms-page--${tone}${bleed ? " ms-page--bleed" : ""}`}>
      {children}
    </article>
  );
}

/* ─── 01–03 Covers (refine) ─── */

function CoverA() {
  return (
    <div className="ms-spread ms-spread--single">
      <PageShell tone="ink" bleed>
        <div className="ms-cover ms-cover--a">
          <div className="ms-cover-photo ms-photo ms-photo--athlete-glance" />
          <div className="ms-cover-scrim" />
          <div className="ms-cover-rink-mark" aria-hidden="true" />
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
            <p className="ms-cover-deck">
              Inside the decision that happens before the puck leaves the stick
            </p>
            <ul className="ms-cover-sec">
              <li>The Work Nobody Sees</li>
              <li>Designed for Speed</li>
              <li>Numbers — Decision Evidence</li>
            </ul>
          </div>
          <footer className="ms-cover-meta">
            <span>No. {ISSUE.number}</span>
            <span className="ms-cover-clock">0.30 SEC</span>
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
          <div className="ms-cover-b-top">
            <p className="ms-masthead ms-masthead--ink">{ISSUE.title}</p>
            <IssueMark />
          </div>
          <div className="ms-cover-b-grid">
            <div className="ms-photo ms-photo--stick-flex" />
            <div className="ms-cover-b-type">
              <p className="ms-cover-b-kicker">FEATURE · EQUIPMENT</p>
              <h2>
                CUT
                <br />
                ON
                <br />
                CONTACT
              </h2>
              <RinkRule />
              <p className="ms-cover-deck ink">How blade geometry changes the release window.</p>
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

/* ─── 04–05 Front matter ─── */

function TocSpread({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread">
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="02" right="" section="" />
        <div className="ms-toc-left">
          <div className="ms-toc-head-row">
            <p className="ms-section-label">CONTENTS</p>
            <IssueMark />
          </div>
          <h2 className="ms-toc-title">
            Issue
            <br />
            {ISSUE.number}
          </h2>
          <p className="ms-toc-thesis">
            Four investigations into what happens before the scoreboard.
          </p>
          <div className="ms-photo ms-photo--toc-athlete" />
          <p className="ms-caption">Morning skate · Rink 2 · cover sequence</p>
        </div>
      </PageShell>
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="" right="03" section="CONTENTS" />
        <div className="ms-toc-right">
          {[
            { sec: "PLAY", item: "The 0.3 Second", note: "Decision", pg: "12" },
            { sec: "PEOPLE", item: "The Work Nobody Sees", note: "Preparation", pg: "22" },
            { sec: "PROCESS", item: "Five Questions", note: "Human detail", pg: "44" },
            { sec: "GEAR", item: "Designed for Speed", note: "Equipment", pg: "38" },
            { sec: "EVIDENCE", item: "Numbers", note: "Measurement", pg: "08" },
          ].map((row) => (
            <div key={row.sec} className="ms-toc-block">
              <div className="ms-toc-sec-head">
                <span className="ms-toc-sec">{row.sec}</span>
                <span className="ms-toc-pg">{row.pg}</span>
              </div>
              <p className="ms-toc-item">{row.item}</p>
              <p className="ms-toc-note">{row.note}</p>
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
          <RinkRule />
          <div className="ms-photo ms-photo--editors ms-editors-img" />
        </div>
      </PageShell>
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="" right="05" section="EDITORIAL" />
        <div className="ms-editors-body">
          <p className="ms-dropcap-para">
            <span className="ms-drop">B</span>
            REAKAWAY documents the fractions of a second, unseen preparation, equipment, decisions,
            and human details that determine what happens before the scoreboard records it.
          </p>
          <p>
            This issue follows that argument through four linked investigations: a release window
            measured in tenths, a morning no camera crew covers, a stick engineered for speed, and
            the numbers that prove none of it is abstract.
          </p>
          <p>The score says what happened. These pages look at why.</p>
          <p className="ms-signature">— The Editors</p>
        </div>
      </PageShell>
    </div>
  );
}

/* ─── 06–08 Feature ─── */

function FeatureOpen({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread">
      <PageShell tone="ink" bleed>
        {showGrid && <GridOverlay />}
        <div className="ms-feature-open">
          <div className="ms-photo ms-photo--ice-action ms-feature-open-bg" />
          <div className="ms-feature-open-type">
            <p className="ms-section-label light">PLAY · FEATURE · ISSUE {ISSUE.number}</p>
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
          <div className="ms-clock-chip">0.30</div>
          <p className="ms-caption light">High-speed sequence · period two · lane recognition</p>
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
        <IssueMark />
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
            We mapped forty-eight releases with a high-speed camera. From first intentional load to
            puck leaving the blade: roughly three-tenths of a second.
          </p>
        </div>
        <div className="ms-photo ms-photo--stick-detail ms-inset" />
        <p className="ms-caption">Stick face at peak load — tape wear marks the contact zone.</p>
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
            On the next spread: the 0.3-second decision itself — not a chart of season averages, but
            the path from recognition to release.
          </p>
        </div>
      </PageShell>
    </div>
  );
}

function FeatureStats({ showGrid }: { showGrid?: boolean }) {
  const steps = [
    { t: "0.00", label: "Recognize opening", detail: "Lane appears — eyes commit first" },
    { t: "0.08", label: "Shift weight", detail: "Inside edge loads; hips square" },
    { t: "0.16", label: "Commit to release", detail: "No abort path left" },
    { t: "0.23", label: "Stick contact", detail: "Blade closes through the puck" },
    { t: "0.30", label: "Shot released", detail: "Puck leaves — decision complete" },
  ];

  return (
    <div className="ms-spread">
      <PageShell tone="rink">
        {showGrid && <GridOverlay />}
        <Folio left="16" right="" section="" />
        <div className="ms-decision">
          <p className="ms-section-label light">DECISION MAP · 0.3 SECOND</p>
          <h3 className="ms-decision-hed">What happens inside the window</h3>
          <ol className="ms-decision-path">
            {steps.map((s, i) => (
              <li key={s.t}>
                <span className="ms-decision-t">{s.t}</span>
                <span className="ms-decision-arrow" aria-hidden="true">
                  {i < steps.length - 1 ? "→" : "■"}
                </span>
                <div>
                  <strong>{s.label}</strong>
                  <em>{s.detail}</em>
                </div>
              </li>
            ))}
          </ol>
          <p className="ms-caption light">Fig. 01 — Composite of 48 elite wristers, Issue 08 sample</p>
        </div>
      </PageShell>
      <PageShell tone="rink">
        {showGrid && <GridOverlay />}
        <Folio left="" right="17" section="PLAY" />
        <div className="ms-decision-side">
          <div className="ms-rink-diagram" aria-hidden="true">
            <div className="ms-rink-diagram-ice">
              <span className="ms-crease" />
              <span className="ms-faceoff" />
              <span className="ms-shot-path" />
              <span className="ms-shot-dot" />
            </div>
            <p>Release lane · near-side open</p>
          </div>
          <div className="ms-big-nums ms-big-nums--rink">
            <div>
              <p className="ms-num">98.4</p>
              <p className="ms-num-label">MPH at exit — peak in sample</p>
            </div>
            <div>
              <p className="ms-num">12°</p>
              <p className="ms-num-label">Blade open at contact</p>
            </div>
            <div>
              <p className="ms-num">0.28</p>
              <p className="ms-num-label">SEC median — recognize → release</p>
            </div>
          </div>
        </div>
      </PageShell>
    </div>
  );
}

/* ─── 09–12 Documentary ─── */

function ProfileOpen({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread">
      <PageShell tone="ink" bleed>
        {showGrid && <GridOverlay />}
        <div className="ms-photo ms-photo--portrait-quiet ms-full" />
        <div className="ms-doc-stamp">
          <span>06:14 AM</span>
          <span>RINK 2</span>
          <span>47 MIN BEFORE PRACTICE</span>
        </div>
      </PageShell>
      <PageShell tone="rink">
        {showGrid && <GridOverlay />}
        <Folio left="" right="23" section="PEOPLE" />
        <div className="ms-profile-open ms-profile-open--doc">
          <p className="ms-section-label light">ATHLETE PROFILE · DOCUMENTARY</p>
          <h2>
            THE WORK
            <br />
            NOBODY
            <br />
            SEES
          </h2>
          <p className="ms-deck light">
            Before the lights, before the broadcast graphic — wet floors, taped sticks, empty
            benches.
          </p>
        </div>
      </PageShell>
    </div>
  );
}

function ProfileBody({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread">
      <PageShell tone="rink">
        {showGrid && <GridOverlay />}
        <Folio left="24" right="" section="" />
        <div className="ms-train-log">
          <header className="ms-train-log-head">
            <div>
              <p className="ms-section-label light">PRACTICE SHEET</p>
              <h3>Rink 2 — Tuesday</h3>
            </div>
            <div className="ms-train-log-meta">
              <span>06:14 AM</span>
              <span>Session 04 / 05</span>
              <span>Issue 08</span>
            </div>
          </header>
          <div className="ms-train-log-grid">
            <div className="ms-train-log-col">
              <p className="ms-train-log-label">TIME</p>
              <ul>
                <li>
                  <strong>05:40</strong> Activation — hallway mats
                </li>
                <li>
                  <strong>06:05</strong> Skate sharpen · steel check
                </li>
                <li>
                  <strong>06:14</strong> Stick tape · two wraps heel
                </li>
                <li>
                  <strong>06:30</strong> On ice — edges only
                </li>
                <li>
                  <strong>07:10</strong> Release reps × 40
                </li>
                <li>
                  <strong>08:00</strong> Empty rink cool-down
                </li>
              </ul>
            </div>
            <div className="ms-train-log-col">
              <p className="ms-train-log-label">NOTES</p>
              <p className="ms-hand-note ms-hand-note--block">
                Keep blade closed through contact.
                <br />
                No drama — if it looks hard, redo.
              </p>
              <div className="ms-photo ms-photo--equip-room" />
              <p className="ms-caption light">Equipment room · gloves still wet from yesterday</p>
            </div>
          </div>
        </div>
      </PageShell>
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="" right="25" section="PEOPLE" />
        <div className="ms-doc-details">
          <div className="ms-photo ms-photo--tape-detail" />
          <p className="ms-caption">Tape ritual — same pattern every morning</p>
          <div className="ms-qa-mini">
            <p className="ms-section-label">FIELD NOTES</p>
            <p className="ms-q">
              <span>Q</span> What do you protect most fiercely?
            </p>
            <p className="ms-a">
              <span>A</span> The mornings. Once the day becomes public, the work has to already be
              done.
            </p>
            <p className="ms-hand-note">Observed: locker lights off until 06:00.</p>
          </div>
        </div>
      </PageShell>
    </div>
  );
}

function PhotoSpread({ variant, showGrid }: { variant?: string; showGrid?: boolean }) {
  const second = variant === "moment-2";

  if (second) {
    return (
      <div className="ms-spread">
        <PageShell tone="ink" bleed>
          {showGrid && <GridOverlay />}
          <div className="ms-photo ms-photo--moment-hold ms-full" />
        </PageShell>
        <PageShell>
          {showGrid && <GridOverlay />}
          <Folio left="" right="33" section="CULTURE" />
          <div className="ms-moment-pause">
            <p className="ms-section-label">THE MOMENT</p>
            <p className="ms-moment-meta">19:44 · THIRD PERIOD · CONTINUED</p>
            <p className="ms-moment-line">The lane closed. The decision had already been made.</p>
            <p className="ms-moment-meta ms-moment-meta--soft">Frame 02 · 1/2000s · Issue 08</p>
            <p className="ms-folio-solo ink">32–33</p>
          </div>
        </PageShell>
      </div>
    );
  }

  return (
    <div className="ms-spread">
      <PageShell tone="ink" bleed>
        {showGrid && <GridOverlay />}
        <div className="ms-photo ms-photo--moment-a ms-full" />
      </PageShell>
      <PageShell tone="ink" bleed>
        {showGrid && <GridOverlay />}
        <div className="ms-moment-right">
          <div className="ms-photo ms-photo--moment-c ms-moment-right-photo" />
          <div className="ms-moment-copy">
            <p className="ms-section-label light">THE MOMENT</p>
            <p className="ms-moment-meta light">19:42 — THIRD PERIOD</p>
            <p className="ms-moment-line light">The opening lasted less than half a second.</p>
            <p className="ms-moment-meta ms-moment-meta--soft light">
              Home crease · near-side lane · Issue 08
            </p>
          </div>
        </div>
      </PageShell>
    </div>
  );
}

/* ─── 13–16 Technical → Human → Numbers ─── */

function GearSpread({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread">
      <PageShell tone="rink">
        {showGrid && <GridOverlay />}
        <Folio left="38" right="" section="" />
        <div className="ms-gear ms-gear--industrial">
          <p className="ms-section-label light">GEAR · EQUIPMENT STUDY</p>
          <h2 className="ms-gear-hed light">
            DESIGNED
            <br />
            FOR SPEED
          </h2>
          <div className="ms-gear-macro">
            <div className="ms-photo ms-photo--stick-macro" />
            <p className="ms-caption light">Blade toe · carbon weave · flex stamp “85”</p>
          </div>
          <div className="ms-exploded ms-exploded--compact" aria-hidden="true">
            <div className="ms-exploded-part ms-exploded-blade">
              <span>01 Blade</span>
            </div>
            <div className="ms-exploded-part ms-exploded-shaft">
              <span>02 Shaft</span>
            </div>
            <div className="ms-exploded-part ms-exploded-grip">
              <span>03 Grip</span>
            </div>
          </div>
        </div>
      </PageShell>
      <PageShell tone="rink">
        {showGrid && <GridOverlay />}
        <Folio left="" right="39" section="GEAR" />
        <div className="ms-gear-specs ms-gear-specs--tech">
          <p className="ms-deck light" style={{ marginBottom: "0.75rem" }}>
            How the stick shortens the 0.3-second window — mass, flex, and blade geometry as timing
            instruments.
          </p>
          <div className="ms-measure-row">
            <div>
              <span className="ms-measure-num">85</span>
              <span className="ms-measure-unit">FLEX</span>
              <p>Mid kick · faster load</p>
            </div>
            <div>
              <span className="ms-measure-num">397</span>
              <span className="ms-measure-unit">g</span>
              <p>Mass without tape</p>
            </div>
            <div>
              <span className="ms-measure-num">½"</span>
              <span className="ms-measure-unit">CURVE</span>
              <p>Opens 8–12° at exit</p>
            </div>
          </div>
          <div className="ms-blade-profile" aria-hidden="true">
            <svg viewBox="0 0 200 48" fill="none">
              <path
                d="M4 28 C40 28 70 10 110 12 C150 14 175 22 196 20"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="M4 28 L4 36 L24 36" stroke="currentColor" strokeWidth="1.5" />
              <text x="110" y="44" fill="currentColor" fontSize="8" fontFamily="monospace">
                BLADE PROFILE
              </text>
            </svg>
          </div>
          <div className="ms-callouts ms-callouts--light">
            <div>
              <span className="ms-dot" />
              <div>
                <strong>Blade profile</strong>
                <p>Stiffer toe holds the puck through 0.23 contact</p>
              </div>
            </div>
            <div>
              <span className="ms-dot" />
              <div>
                <strong>Carbon layup</strong>
                <p>Fibers along the load path — fewer wasted milliseconds</p>
              </div>
            </div>
            <div>
              <span className="ms-dot" />
              <div>
                <strong>Heel tape</strong>
                <p>Two wraps — friction pattern from Issue 08 athlete</p>
              </div>
            </div>
          </div>
        </div>
      </PageShell>
    </div>
  );
}

function DataSpread({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread">
      <PageShell tone="rink">
        {showGrid && <GridOverlay />}
        <Folio left="40" right="" section="" />
        <div className="ms-data-hockey">
          <p className="ms-section-label light">SHOT SPEED × RELEASE</p>
          <h3 className="ms-data-hed">What 98.4 mph costs</h3>
          <div className="ms-force-diagram">
            <div className="ms-force-track">
              <span className="ms-force-puck" />
              <span className="ms-force-trail" />
            </div>
            <ul className="ms-force-facts">
              <li>
                <strong>14 m</strong>
                <span>Distance to net at release</span>
              </li>
              <li>
                <strong>0.32 s</strong>
                <span>Flight time at 98.4 mph</span>
              </li>
              <li>
                <strong>40 reps</strong>
                <span>Tuesday set that built the pattern</span>
              </li>
            </ul>
          </div>
          <div className="ms-shot-rail">
            {[
              { mph: 72, label: "Warm" },
              { mph: 84, label: "Mid" },
              { mph: 91, label: "Game" },
              { mph: 98, label: "Peak", hot: true },
              { mph: 88, label: "Fatigue" },
            ].map((s) => (
              <div key={s.label} className={`ms-shot-tick${s.hot ? " is-hot" : ""}`}>
                <i style={{ height: `${s.mph}%` }} />
                <strong>{s.mph}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <p className="ms-caption light">Same stick · same lane · different body state</p>
        </div>
      </PageShell>
      <PageShell tone="rink">
        {showGrid && <GridOverlay />}
        <Folio left="" right="41" section="PLAY" />
        <div className="ms-load-hockey">
          <p className="ms-section-label light">TRAINING LOAD</p>
          <p className="ms-num ms-num--sm">4.2×</p>
          <p className="ms-num-label">BODYWEIGHT — LATERAL BOUND PEAK</p>
          <p className="ms-load-explain">
            The force behind the 0.08 weight shift on the decision map — how a player plants and
            opens a lane in under a tenth of a second.
          </p>
          <div className="ms-rep-blocks">
            <div>
              <span>Mon</span>
              <em>Edges</em>
              <i style={{ width: "40%" }} />
            </div>
            <div>
              <span>Tue</span>
              <em>Release ×40</em>
              <i style={{ width: "85%" }} />
            </div>
            <div>
              <span>Wed</span>
              <em>Recovery skate</em>
              <i style={{ width: "55%" }} />
            </div>
            <div>
              <span>Thu</span>
              <em>Game pace</em>
              <i style={{ width: "70%" }} />
            </div>
            <div>
              <span>Fri</span>
              <em>Video + edges</em>
              <i style={{ width: "35%" }} />
            </div>
          </div>
          <p className="ms-caption light">Load prepares the window — not the scoreboard</p>
        </div>
      </PageShell>
    </div>
  );
}

function InterviewSpread({ showGrid }: { showGrid?: boolean }) {
  return (
    <div className="ms-spread">
      <PageShell tone="ink" bleed>
        {showGrid && <GridOverlay />}
        <div className="ms-photo ms-photo--interview-portrait ms-full" />
        <div className="ms-interview-id">
          <span>MAYA REEVES</span>
          <span>FORWARD · ISSUE 08</span>
        </div>
        <blockquote className="ms-interview-pull">
          “The interesting work was always upstream.”
        </blockquote>
      </PageShell>
      <PageShell>
        {showGrid && <GridOverlay />}
        <Folio left="" right="45" section="PEOPLE" />
        <div className="ms-interview ms-interview--human">
          <p className="ms-section-label">FIVE QUESTIONS</p>
          <p className="ms-interview-aside">After the data — listening.</p>
          <p className="ms-interview-pullout">
            The scoreboard was a summary, not the story.
          </p>
          <div className="ms-interview-qa">
            <p className="ms-q">
              <span>Q</span> What do you refuse to romanticize?
            </p>
            <p className="ms-a">
              <span>A</span> Pain as proof. Effort matters. Suffering for the camera does not.
            </p>
            <p className="ms-q">
              <span>Q</span> Where should a reader look?
            </p>
            <p className="ms-a">
              <span>A</span> The calendar. The unremarkable Tuesday.
            </p>
          </div>
          <p className="ms-hand-note">Same thermos. Seat three from the door.</p>
        </div>
      </PageShell>
    </div>
  );
}

function DepartmentSpread({ showGrid }: { showGrid?: boolean }) {
  const nums = [
    {
      n: "0.3",
      unit: "SEC",
      title: "Decision window",
      why: "Recognize opening → shot released. The unit of BREAKAWAY’s argument.",
    },
    {
      n: "56",
      unit: "SHOTS",
      title: "Recorded this issue",
      why: "High-speed frames studied for the decision map — not a page count.",
    },
    {
      n: "12°",
      unit: "",
      title: "Release angle",
      why: "Blade open at contact. Geometry that turns flex into flight.",
    },
    {
      n: "5",
      unit: "",
      title: "Training sessions",
      why: "One week of preparation behind a single published window.",
    },
  ];

  return (
    <div className="ms-spread ms-spread--single">
      <PageShell>
        {showGrid && <GridOverlay />}
        <div className="ms-numbers-dept">
          <header className="ms-numbers-head">
            <div>
              <p className="ms-section-label">DEPARTMENT</p>
              <h2>NUMBERS</h2>
            </div>
            <IssueMark />
          </header>
          <p className="ms-numbers-lede">
            Evidence from Issue 08 — each figure explains why the scoreboard is not the story.
          </p>
          <RinkRule />
          <div className="ms-numbers-list">
            {nums.map((item) => (
              <article key={item.title} className="ms-numbers-item">
                <div className="ms-numbers-figure">
                  <span className="ms-num ms-num--dept">{item.n}</span>
                  {item.unit && <span className="ms-numbers-unit">{item.unit}</span>}
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.why}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </PageShell>
    </div>
  );
}

/* ─── 17 Ending ─── */

function BackCover() {
  return (
    <div className="ms-spread ms-spread--single">
      <PageShell tone="ink" bleed>
        <div className="ms-back ms-back--close">
          <div className="ms-photo ms-photo--back ms-back-photo" />
          <div className="ms-back-copy ms-back-copy--close">
            <p className="ms-back-close-line">THE SCORE SAYS WHAT HAPPENED.</p>
            <p className="ms-back-close-line ms-back-close-line--accent">
              BREAKAWAY LOOKS AT WHY.
            </p>
            <RinkRule />
            <p className="ms-masthead">{ISSUE.title}</p>
            <p className="ms-tagline">{ISSUE.tagline}</p>
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
