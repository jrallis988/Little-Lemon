export type SpreadKind =
  | "cover"
  | "toc"
  | "editors"
  | "feature-open"
  | "feature-body"
  | "feature-stats"
  | "profile-open"
  | "profile-body"
  | "photo"
  | "gear"
  | "data"
  | "interview"
  | "department"
  | "back";

export interface SpreadMeta {
  id: string;
  pages: string;
  title: string;
  section: string;
  kind: SpreadKind;
  caption: string;
}

export const ISSUE = {
  title: "BREAKAWAY",
  tagline: "BEYOND THE SCORE.",
  number: "08",
  season: "Winter 2026",
  pages: "56",
  format: "9 × 11.5 in",
  bleed: "0.125 in",
  columns: 12,
  gutter: "12 pt",
  margins: "0.6 / 0.75 / 0.65 / 0.65 in",
  baseline: "12 pt",
};

export const SECTIONS = [
  { id: "play", name: "PLAY", desc: "Competition and performance." },
  { id: "people", name: "PEOPLE", desc: "Athletes and personalities." },
  { id: "process", name: "PROCESS", desc: "Training, preparation, and craft." },
  { id: "gear", name: "GEAR", desc: "Equipment and design." },
  { id: "culture", name: "CULTURE", desc: "Sports beyond competition." },
];

export const SPREADS: SpreadMeta[] = [
  {
    id: "cover-a",
    pages: "Cover",
    title: "Cover Concept A — The Glance",
    section: "Cover",
    kind: "cover",
    caption: "Final cover. Masthead dominant, single athlete, restrained secondary lines.",
  },
  {
    id: "cover-b",
    pages: "Alt",
    title: "Cover Concept B — Ice Cut",
    section: "Cover",
    kind: "cover",
    caption: "Type-forward variant with cropped equipment detail as primary image.",
  },
  {
    id: "cover-c",
    pages: "Alt",
    title: "Cover Concept C — Night Rink",
    section: "Cover",
    kind: "cover",
    caption: "Atmospheric full-bleed with minimal type stack and issue barcode.",
  },
  {
    id: "toc",
    pages: "02–03",
    title: "Contents",
    section: "Front",
    kind: "toc",
    caption: "Section-led contents with photography hierarchy and restrained numbering.",
  },
  {
    id: "editors",
    pages: "04–05",
    title: "Editor’s Letter",
    section: "Front",
    kind: "editors",
    caption: "Long-form opening with drop cap, signature, and supporting portrait.",
  },
  {
    id: "hockey-1",
    pages: "12–13",
    title: "The 0.3 Second — Opening",
    section: "PLAY",
    kind: "feature-open",
    caption: "Feature opener: oversized display type against full-bleed ice photography.",
  },
  {
    id: "hockey-2",
    pages: "14–15",
    title: "The 0.3 Second — Body",
    section: "PLAY",
    kind: "feature-body",
    caption: "Two-column long-form with pull quote and equipment inset.",
  },
  {
    id: "hockey-3",
    pages: "16–17",
    title: "The 0.3 Second — Decision Map",
    section: "PLAY",
    kind: "feature-stats",
    caption: "Decision map — recognize → release path with rink diagram, not generic charts.",
  },
  {
    id: "profile-1",
    pages: "22–23",
    title: "The Work Nobody Sees — Portrait",
    section: "PEOPLE",
    kind: "profile-open",
    caption: "Documentary opener with time/place stamp: 06:14 AM · Rink 2.",
  },
  {
    id: "profile-2",
    pages: "24–25",
    title: "The Work Nobody Sees — Training",
    section: "PEOPLE",
    kind: "profile-body",
    caption: "Practice-sheet layout — observational notes, tape ritual, equipment room.",
  },
  {
    id: "moment-1",
    pages: "30–31",
    title: "The Moment",
    section: "CULTURE",
    kind: "photo",
    caption: "Emotional pause — one moment, timestamp, observational line, photography leads.",
  },
  {
    id: "moment-2",
    pages: "32–33",
    title: "The Moment — Continuation",
    section: "CULTURE",
    kind: "photo",
    caption: "Negative space after the moment — ice white reflection page.",
  },
  {
    id: "gear",
    pages: "38–39",
    title: "Designed for Speed",
    section: "GEAR",
    kind: "gear",
    caption: "Macro blade + flex/mass/curve — equipment as timing instrument.",
  },
  {
    id: "data",
    pages: "40–41",
    title: "Shot Speed / Training Load",
    section: "PLAY",
    kind: "data",
    caption: "Hockey-specific evidence: flight time, reps, and 4.2× as weight-shift physics.",
  },
  {
    id: "interview",
    pages: "44–45",
    title: "Five Questions",
    section: "PEOPLE",
    kind: "interview",
    caption: "Human interruption — Maya Reeves, large pullout, listening not analyzing.",
  },
  {
    id: "numbers",
    pages: "08",
    title: "Numbers",
    section: "Dept.",
    kind: "department",
    caption: "Signature department: each figure explains why it matters.",
  },
  {
    id: "back",
    pages: "Back",
    title: "Back Cover",
    section: "Close",
    kind: "back",
    caption: "Closing argument — The score says what happened. BREAKAWAY looks at why.",
  },
];

export const TYPE_ROLES = [
  {
    role: "DISPLAY",
    font: "Archivo Black",
    sample: "THE 0.3 SECOND",
    use: "Feature headlines, section openers",
    specs: "48–120 pt · tracking −20 · leading 0.9",
  },
  {
    role: "DECK",
    font: "Instrument Serif",
    sample: "Inside the decision that happens before the puck leaves the stick.",
    use: "Supporting headlines, feature decks",
    specs: "18–28 pt · italic optional · leading 1.2",
  },
  {
    role: "BODY",
    font: "Newsreader",
    sample:
      "The window is shorter than a blink. Between skate plant and stick release, the athlete compresses perception, balance, and intent into three-tenths of a second.",
    use: "Long-form reading columns",
    specs: "9.5/12 pt · measure 42–58 chars · rag right",
  },
  {
    role: "CAPTION",
    font: "DM Sans",
    sample: "Fig. 04 — Stick flex at release. Montreal, Dec 2025.",
    use: "Photography information",
    specs: "7.5/10 pt · tracking +20 · uppercase labels",
  },
  {
    role: "DATA",
    font: "Archivo Black + JetBrains Mono",
    sample: "98.4 MPH",
    use: "Statistics, charts, callouts",
    specs: "Display numerals · mono labels",
  },
  {
    role: "UTILITY",
    font: "DM Sans / JetBrains Mono",
    sample: "PLAY  ·  14  ·  BREAKAWAY 08",
    use: "Page numbers, running headers, labels",
    specs: "7–8 pt · tracking +40 · all caps",
  },
];

export const GRID_EXAMPLES = [
  {
    id: "standard",
    name: "STANDARD ARTICLE",
    desc: "12-column · 2 text columns · consistent folio and running head.",
  },
  {
    id: "photo",
    name: "PHOTO-LED",
    desc: "Image owns the spread; type sits in remaining modules only.",
  },
  {
    id: "data",
    name: "DATA-LED",
    desc: "Large numeral modules with supporting chart columns.",
  },
  {
    id: "opening",
    name: "OPENING SPREAD",
    desc: "Display type across the gutter; photography full bleed.",
  },
  {
    id: "interview",
    name: "INTERVIEW",
    desc: "Q column narrow; A column wide; generous paragraph spacing.",
  },
];

export const DIGITAL_BREAKS = [
  {
    id: "desktop",
    label: "Desktop",
    width: 960,
    note: "Two-column reading with sticky section nav and full-bleed chapter opens.",
  },
  {
    id: "tablet",
    label: "Tablet",
    width: 720,
    note: "Single primary column; images scale to edge; captions move below.",
  },
  {
    id: "mobile",
    label: "Mobile",
    width: 390,
    note: "Recomposed hierarchy — headline, deck, image, then body. No shrunk print pages.",
  },
];

export const PROMO = [
  { id: "poster", title: "Issue Poster", size: "24 × 36 in" },
  { id: "sub", title: "Subscription Ad", size: "Full page" },
  { id: "newsstand", title: "Newsstand Display", size: "Header card" },
  { id: "social", title: "Promotional Social", size: "1080 × 1350" },
  { id: "email", title: "Email Announcement", size: "600 px" },
];
