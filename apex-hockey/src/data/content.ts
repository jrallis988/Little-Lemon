const base = import.meta.env.BASE_URL;

/** Replaceable campaign asset paths — swap files in /public/assets without rebuilding structure */
export const assets = {
  logo: `${base}apex-mark.svg`,
  heroAthlete: `${base}assets/placeholders/athlete-hero.svg`,
  heroProduct: `${base}assets/placeholders/product-stick.svg`,
  keyVisualAthlete: `${base}assets/placeholders/athlete-key.svg`,
  productDetail: `${base}assets/placeholders/product-detail.svg`,
  athleteCrop: `${base}assets/placeholders/athlete-crop.svg`,
  iceLevel: `${base}assets/placeholders/photo-ice-level.svg`,
  equipment: `${base}assets/placeholders/photo-equipment.svg`,
  bench: `${base}assets/placeholders/photo-bench.svg`,
  spray: `${base}assets/placeholders/photo-spray.svg`,
} as const;

export const brand = {
  name: "APEX Hockey",
  product: "APEX V1",
  thesis: "PREPARATION BECOMES PERFORMANCE.",
  line: "RELEASE FASTER.",
  ask: "MARK YOUR APEX.",
  markName: "Apex Mark",
  audiencePrimary: "Competitive players, ages 14–22",
  audienceSecondary: "Coaches, parents, and fans as amplifiers — not the primary creative target",
  disclaimer:
    "APEX Hockey is a self-initiated fictional portfolio project. It is not a real client engagement and did not generate real campaign results.",
} as const;

export const meaning = {
  what: "APEX is the peak moment in a shift — when preparation becomes performance and speed, skill, instinct, and execution meet.",
  who: "Built for competitive players who train to win the next level, not to look the part.",
  problem:
    "Most stick marketing sells flex charts and brand lore. Players care about the instant the lane opens — and whether they can finish it.",
  care: "If you hesitate, the window closes. APEX exists to train, measure, and claim that window.",
  ask: "Mark Your Apex: run timed release and decision challenges, log your Apex Mark, and compete against your last shift — not just the feed.",
} as const;

export const audienceTiers = [
  { tier: "Primary", label: "Competitive players 14–22", note: "High school, junior, early college — training-focused, identity-forming" },
  { tier: "Secondary", label: "Coaches & development staff", note: "Distribute challenges, reinforce habits, validate progress" },
  { tier: "Amplifier", label: "Parents & fans", note: "Share marks and stories — not the voice of the campaign" },
] as const;

export const payoff = {
  name: "The Apex Mark",
  summary:
    "A player challenge system that turns the campaign idea into something athletes can do: timed release drills, decision windows, personal bests, and shareable marks.",
  steps: [
    { title: "Train the window", copy: "Short rink or driveway drills built around recognition → release." },
    { title: "Log an Apex Mark", copy: "Record reaction/release metrics as a personal mark — not vanity stats." },
    { title: "Compete your last best", copy: "Weekly resets push improvement against self first, peers second." },
    { title: "Share the mark", copy: "Scoreboard-style share cards for IG, TikTok, locker rooms, and rink boards." },
  ],
  behaviors: [
    "Player challenges",
    "Skill development",
    "Shareable achievements",
    "Clinic / event activations",
    "Digital mark tracker",
  ],
} as const;

export const navLinks = [
  { href: "#meaning", label: "Meaning" },
  { href: "#audience", label: "Audience" },
  { href: "#payoff", label: "Payoff" },
  { href: "#system", label: "System" },
  { href: "#photo", label: "Photo" },
  { href: "#ecosystem", label: "Ecosystem" },
  { href: "#social", label: "Social" },
  { href: "#motion", label: "Motion" },
  { href: "#summary", label: "Summary" },
] as const;

export const colorReasons = [
  {
    name: "Ice Field",
    varName: "--apex-ice",
    hex: "#E9F2F6",
    reason: "The playing surface — clarity, cold light, readable negative space.",
  },
  {
    name: "Graphite",
    varName: "--apex-graphite",
    hex: "#12161A",
    reason: "Equipment body — stick, helmet, and board shadow. Structure, not “edgy black.”",
  },
  {
    name: "Blue Line",
    varName: "--apex-blueline",
    hex: "#2F6FED",
    reason: "Rink authority line. Primary brand signal for territory, rules, and direction.",
  },
  {
    name: "Frost",
    varName: "--apex-frost",
    hex: "#7EB6C9",
    reason: "Cold midtone for secondary UI, boards, and depth without going neon esports.",
  },
  {
    name: "Tape",
    varName: "--apex-tape",
    hex: "#8B9096",
    reason: "Material honesty — grip tape, rails, scoreboard chrome.",
  },
  {
    name: "Volt",
    varName: "--apex-volt",
    hex: "#D6FF3A",
    reason: "Speed / high-visibility accent for acceleration, marks, and CTAs.",
  },
  {
    name: "Impact",
    varName: "--apex-impact",
    hex: "#E23B2F",
    reason: "Red line / collision only — stops, hits, and peak moments. Not the default brand color.",
  },
] as const;

export const typeScale = [
  {
    name: "Display",
    sample: "PREPARATION BECOMES PERFORMANCE.",
    className: "type-sample--display",
    note: "Chakra Petch Bold — campaign thesis, posters, end cards. Technical, competitive, not generic condensed sports.",
  },
  {
    name: "Headline",
    sample: "Mark Your Apex",
    className: "type-sample--headline",
    note: "Chakra Petch Semibold — section titles and challenge prompts",
  },
  {
    name: "Body",
    sample:
      "APEX trains the window between recognition and release — then asks players to claim a measurable Apex Mark.",
    className: "type-sample--body",
    note: "Manrope Regular — case study copy, captions, long-form",
  },
  {
    name: "Scoreboard / Data",
    sample: "22:14 TOI  ·  96.4 MPH  ·  1.8 SEC",
    className: "type-sample--stat",
    note: "IBM Plex Mono — shift times, TOI, MPH, marks. Data as identity, not fine print.",
  },
] as const;

export const typeBehaviors = [
  { name: "Accelerate", desc: "Letter-spacing tightens as type enters — speed building into the release." },
  { name: "Cut", desc: "Alignment shifts mid-lockup like a direction change on ice." },
  { name: "Stop", desc: "Hard edge interruptions — words meet Impact color at the stop." },
  { name: "Impact", desc: "Controlled overlap on collision moments; never decorative chaos." },
  { name: "Reset", desc: "Return to baseline spacing after the beat — ready for the next shift." },
] as const;

export const hockeyGeometry = [
  { id: "blueline", title: "Blue Line", desc: "Primary horizontal rule. Controls section breaks and territorial grids." },
  { id: "redline", title: "Red Line / Impact", desc: "Used sparingly for stops, collisions, and peak beats." },
  { id: "crease", title: "Crease", desc: "Semicircle frames for product and mark lockups." },
  { id: "faceoff", title: "Faceoff Circle", desc: "Circular crop and focus system for athlete close-ups." },
  { id: "shotchart", title: "Shot Chart", desc: "Dot fields for density, attempts, and challenge progress." },
  { id: "trajectory", title: "Puck Trajectory", desc: "Angled vectors that imply release path — not generic speed lines." },
] as const;

export const movementCycle = [
  { id: "start", label: "Start", note: "Static readiness — poised type and frozen frame" },
  { id: "accelerate", label: "Accelerate", note: "Compression, forward skew, spacing collapse" },
  { id: "cut", label: "Cut", note: "Sudden axis change — layout reorients" },
  { id: "stop", label: "Stop", note: "Hard edge, Impact accent, silence in motion" },
  { id: "impact", label: "Impact", note: "Collision beat — overlap, mark stamp" },
  { id: "reset", label: "Reset", note: "Return to baseline for the next shift" },
] as const;

export const photoLanguage = [
  { id: "ice", srcKey: "iceLevel" as const, title: "Ice-level", note: "Board-height and blade-height perspectives" },
  { id: "spray", srcKey: "spray" as const, title: "Ice spray / skate cut", note: "Texture of stop and cut" },
  { id: "equip", srcKey: "equipment" as const, title: "Equipment detail", note: "Tape, glove, stick — material truth" },
  { id: "bench", srcKey: "bench" as const, title: "Bench / prep", note: "Culture between shifts" },
  { id: "crop", srcKey: "athleteCrop" as const, title: "Tight athlete crop", note: "Eyes, strain, decision face" },
  { id: "product", srcKey: "productDetail" as const, title: "Product in context", note: "Stick as tool, not floating fetish" },
] as const;

export const ecosystem = [
  { title: "Arena & rink boards", copy: "Long-throw marks, blue-line rules, scoreboard number treatments." },
  { title: "Scoreboard / TOI graphics", copy: "Live Apex Mark callouts between periods." },
  { title: "Clinic & challenge events", copy: "On-ice Apex Mark stations at rinks and camps." },
  { title: "Outdoor / OOH", copy: "Cut compositions and oversized data — readable at distance." },
  { title: "Equipment applications", copy: "Tape patterns, stick decals, mark badges." },
  { title: "Digital mark tracker", copy: "Log, compare, and share personal bests." },
  { title: "Social & short video", copy: "Platform-native cuts of the same system — not the whole campaign." },
  { title: "Player stories", copy: "Prep → apex → reset narratives across the season." },
] as const;

export const adFormats = [
  { id: "hero-poster", title: "Hero Campaign Poster", ratio: "2 / 3", focus: "Thesis + athlete crop + Apex Mark" },
  { id: "athlete-poster", title: "Athlete Poster", ratio: "3 / 4", focus: "Faceoff-circle crop, eye-line hierarchy" },
  { id: "product-poster", title: "Product Poster", ratio: "2 / 3", focus: "Stick in crease frame, RELEASE FASTER." },
  { id: "rink-board", title: "Rink-Board Ad", ratio: "21 / 5", focus: "Blue-line rule, long-throw type" },
  { id: "scoreboard", title: "Scoreboard Graphic", ratio: "16 / 9", focus: "Mono data + Impact stop beat" },
  { id: "arena", title: "Arena Signage", ratio: "21 / 9", focus: "Oversized mark, volt CTA" },
  { id: "retail", title: "Retail / Equipment", ratio: "1 / 1", focus: "Product + Mark Your Apex ask" },
] as const;

export const igPosts = [
  { id: "announce", title: "Campaign Thesis", ratio: "1 / 1", size: "1080 × 1080" },
  { id: "athlete", title: "Athlete Mark", ratio: "1 / 1", size: "1080 × 1080" },
  { id: "feature", title: "Challenge Prompt", ratio: "4 / 5", size: "1080 × 1350" },
  { id: "quote", title: "Scoreboard Stat", ratio: "4 / 5", size: "1080 × 1350" },
] as const;

export const carouselSlides = [
  { n: 1, title: "PREPARATION BECOMES PERFORMANCE.", copy: "Thesis open — hockey insight before product." },
  { n: 2, title: "What is an Apex Mark?", copy: "Define the measurable claim players earn." },
  { n: 3, title: "Introduce APEX V1", copy: "Product as tool for the window." },
  { n: 4, title: "The drill", copy: "Recognition → release challenge steps." },
  { n: 5, title: "Athlete proof", copy: "Ice-level action + mark stamp." },
  { n: 6, title: "Mark Your Apex", copy: "CTA into tracker / clinic / shop." },
] as const;

export const stories = [
  { id: "launch", title: "Thesis Tease" },
  { id: "feature", title: "Mark Explainer" },
  { id: "athlete", title: "Athlete Shift" },
  { id: "countdown", title: "Challenge Countdown" },
  { id: "endcard", title: "Mark Stamp End Card" },
] as const;

export const youtubeThumbs = [
  { id: "y1", title: "MARK YOUR APEX", sub: "Challenge Explained" },
  { id: "y2", title: "1.8 SEC WINDOW", sub: "Release Drill" },
  { id: "y3", title: "THE CUT", sub: "On-Ice with APEX" },
] as const;

export const assetMatrix = [
  { asset: "Key Visual", ig: true, tt: true, yt: true, web: true, retail: true, arena: true },
  { asset: "Apex Mark System", ig: true, tt: true, yt: true, web: true, retail: true, arena: true },
  { asset: "Athlete Creative", ig: true, tt: true, yt: true, web: true, retail: true, arena: true },
  { asset: "Motion / Physics", ig: true, tt: true, yt: true, web: true, retail: false, arena: true },
] as const;

export const launchSequence = [
  {
    phase: "Tease",
    ig: "Thesis type: PREPARATION BECOMES PERFORMANCE.",
    tt: "Cut → stop motion without product",
    yt: "Cold open on ice spray + clock",
  },
  {
    phase: "Reveal",
    ig: "Apex Mark defined + APEX V1",
    tt: "Stick reveal timed to Impact beat",
    yt: "Launch film: window → mark",
  },
  {
    phase: "Challenge Education",
    ig: "Drill carousels + mono stats",
    tt: "Quick how-to marks",
    yt: "Full challenge breakdown",
  },
  {
    phase: "Player Stories",
    ig: "Bench + mark share cards",
    tt: "Shift POV cuts",
    yt: "Athlete documentary beat",
  },
  {
    phase: "Activation",
    ig: "Clinic countdown + CTA",
    tt: "Live challenge energy",
    yt: "Event premiere",
  },
  {
    phase: "Evergreen",
    ig: "Weekly leaderboard marks",
    tt: "Drill of the week",
    yt: "Training library",
  },
] as const;

export const simulatedMetrics = [
  { label: "Challenge Starts", value: "186K", note: "Simulated" },
  { label: "Marks Logged", value: "74K", note: "Simulated" },
  { label: "Share Rate", value: "11.2%", note: "Simulated" },
  { label: "Video Views", value: "2.1M", note: "Simulated" },
  { label: "Clinic Signups", value: "9.4K", note: "Simulated" },
  { label: "CTR to Tracker", value: "2.3%", note: "Simulated" },
] as const;

export const summaryBeats = [
  {
    title: "Insight",
    copy: "Games turn on the apex — the split second when preparation becomes performance.",
  },
  {
    title: "Reason to Exist",
    copy: "APEX gives that moment a name, a product tool (V1), and a way to train it.",
  },
  {
    title: "Audience",
    copy: "Competitive players 14–22 first; coaches and fans amplify.",
  },
  {
    title: "Payoff",
    copy: "Mark Your Apex — challenges, personal marks, clinics, and shareable scoreboard cards.",
  },
  {
    title: "Visual System",
    copy: "Rink geometry (blue line, crease, faceoff, trajectories) as grid and behavior — not decoration.",
  },
  {
    title: "Color & Type",
    copy: "Ice / graphite / blue line / volt / impact — each with a job. Mono data as identity.",
  },
  {
    title: "Motion",
    copy: "START → ACCELERATE → CUT → STOP → IMPACT → RESET mirrors hockey physics.",
  },
  {
    title: "Ecosystem",
    copy: "Arena, scoreboard, clinics, equipment, digital tracker, and social — social is one channel, not the campaign.",
  },
  {
    title: "Outcome / What Was Demonstrated",
    copy: "A hockey-specific campaign system with thesis, audience, ask, and recognizable creative behavior.",
  },
] as const;
