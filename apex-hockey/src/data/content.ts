const base = import.meta.env.BASE_URL;

/** Replaceable campaign asset paths — swap files in /public/assets without rebuilding structure */
export const assets = {
  logo: `${base}apex-mark.svg`,
  heroAthlete: `${base}assets/placeholders/athlete-hero.svg`,
  heroProduct: `${base}assets/placeholders/product-stick.svg`,
  keyVisualAthlete: `${base}assets/placeholders/athlete-key.svg`,
  productDetail: `${base}assets/placeholders/product-detail.svg`,
  athleteCrop: `${base}assets/placeholders/athlete-crop.svg`,
} as const;

export const brand = {
  name: "APEX Hockey",
  product: "APEX V1",
  line: "RELEASE FASTER.",
  audience: "Competitive hockey players, ages 14–30",
  disclaimer:
    "APEX Hockey is a self-initiated fictional portfolio project. It is not a real client engagement and did not generate real campaign results.",
} as const;

export const navLinks = [
  { href: "#strategy", label: "Strategy" },
  { href: "#brand", label: "Brand" },
  { href: "#key-visual", label: "Key Visual" },
  { href: "#ads", label: "Ads" },
  { href: "#social", label: "Social" },
  { href: "#previewer", label: "Previewer" },
  { href: "#motion", label: "Motion" },
  { href: "#summary", label: "Summary" },
] as const;

export const typeScale = [
  {
    name: "Display",
    sample: "RELEASE FASTER.",
    className: "type-sample--display",
    note: "Bebas Neue — campaign lockups, posters, end cards",
  },
  {
    name: "Headline",
    sample: "Split-second advantage",
    className: "type-sample--headline",
    note: "Barlow Condensed Bold — section titles, social headlines",
  },
  {
    name: "Subhead",
    sample: "Precision engineered for the release window",
    className: "type-sample--subhead",
    note: "Barlow Condensed Semibold — supporting statements",
  },
  {
    name: "Body",
    sample:
      "APEX V1 is built for the moment between recognition and release — when the lane opens and the clock disappears.",
    className: "type-sample--body",
    note: "Barlow Regular — case study copy, captions, long-form",
  },
  {
    name: "Stats / Numbers",
    sample: "0.18s",
    className: "type-sample--stat",
    note: "Barlow Condensed ExtraBold — oversized metrics and countdowns",
  },
] as const;

export const palette = [
  { name: "Black", varName: "--apex-black", hex: "#0B0D10" },
  { name: "Ink", varName: "--apex-ink", hex: "#14171C" },
  { name: "Graphite", varName: "--apex-graphite", hex: "#1C2128" },
  { name: "Steel", varName: "--apex-steel", hex: "#6B737C" },
  { name: "Ice", varName: "--apex-ice", hex: "#E8EEF2" },
  { name: "Signal", varName: "--apex-signal", hex: "#C8102E" },
  { name: "Frost", varName: "--apex-frost", hex: "#7A9AAD" },
] as const;

export const adFormats = [
  {
    id: "hero-poster",
    title: "Hero Campaign Poster",
    ratio: "2 / 3",
    focus: "Athlete + stick + RELEASE FASTER.",
  },
  {
    id: "athlete-poster",
    title: "Athlete Poster",
    ratio: "3 / 4",
    focus: "Tight crop, eye-line hierarchy, product secondary",
  },
  {
    id: "product-poster",
    title: "Product Poster",
    ratio: "2 / 3",
    focus: "Stick hero, trajectory graphic, product name",
  },
  {
    id: "feature-ad",
    title: "Product-Feature Ad",
    ratio: "4 / 5",
    focus: "Benefit callouts with directional rules",
  },
  {
    id: "digital-display",
    title: "Digital Display",
    ratio: "16 / 9",
    focus: "Web/DOOH — concise lockup, high contrast",
  },
  {
    id: "retail",
    title: "Retail Display",
    ratio: "1 / 1",
    focus: "Shelf/hanging — product first, campaign line",
  },
  {
    id: "arena",
    title: "Arena Signage",
    ratio: "21 / 9",
    focus: "Long throw readability, oversized type",
  },
] as const;

export const igPosts = [
  { id: "announce", title: "Product Announcement", ratio: "1 / 1", size: "1080 × 1080" },
  { id: "athlete", title: "Athlete Graphic", ratio: "1 / 1", size: "1080 × 1080" },
  { id: "feature", title: "Feature Graphic", ratio: "4 / 5", size: "1080 × 1350" },
  { id: "quote", title: "Quote / Stat Graphic", ratio: "4 / 5", size: "1080 × 1350" },
] as const;

export const carouselSlides = [
  { n: 1, title: "RELEASE FASTER.", copy: "Campaign open — type-forward, no product yet." },
  { n: 2, title: "Introduce APEX V1", copy: "Product reveal with naming hierarchy." },
  { n: 3, title: "Product Technology", copy: "One tech claim, one supporting diagram." },
  { n: 4, title: "Performance Benefit", copy: "Benefit framed as reaction-time advantage." },
  { n: 5, title: "Athlete / Action", copy: "Cropped release moment — stick in frame." },
  { n: 6, title: "Product + CTA", copy: "APEX V1 lockup with shop / learn CTA." },
] as const;

export const stories = [
  { id: "launch", title: "Launch Announcement" },
  { id: "feature", title: "Product Feature" },
  { id: "athlete", title: "Athlete Content" },
  { id: "countdown", title: "Release Countdown" },
  { id: "endcard", title: "Campaign End Card" },
] as const;

export const tiktokSafe = {
  top: "12%",
  bottom: "22%",
  right: "14%",
  left: "6%",
} as const;

export const youtubeThumbs = [
  { id: "y1", title: "RELEASE FASTER.", sub: "APEX V1 Launch" },
  { id: "y2", title: "0.18s WINDOW", sub: "Stick Tech Breakdown" },
  { id: "y3", title: "THE RELEASE", sub: "On-Ice with APEX" },
] as const;

export const assetMatrix = [
  { asset: "Key Visual", ig: true, tt: true, yt: true, web: true, retail: true },
  { asset: "Product Feature", ig: true, tt: true, yt: true, web: true, retail: true },
  { asset: "Athlete Creative", ig: true, tt: true, yt: true, web: true, retail: true },
  { asset: "Motion", ig: true, tt: true, yt: true, web: true, retail: false },
] as const;

export const launchSequence = [
  {
    phase: "Tease",
    ig: "Type-only teaser: RELEASE FASTER.",
    tt: "0.5s flash cuts of release motion",
    yt: "15s cold open teaser, no product",
  },
  {
    phase: "Reveal",
    ig: "Carousel intro + product still",
    tt: "Stick reveal with sound design",
    yt: "Launch film premiere thumbnail",
  },
  {
    phase: "Product Education",
    ig: "Feature carousels + stat graphics",
    tt: "Quick tech explainers",
    yt: "Long-form stick breakdown",
  },
  {
    phase: "Athlete Story",
    ig: "Portrait + quote series",
    tt: "Day-in-the-release POV",
    yt: "Athlete documentary cut",
  },
  {
    phase: "Launch",
    ig: "Countdown stories + CTA posts",
    tt: "Drop-day live energy",
    yt: "Premiere + live chat",
  },
  {
    phase: "Evergreen",
    ig: "Performance proof + seasonal cuts",
    tt: "Trick shots / drills series",
    yt: "How-to + comparison content",
  },
] as const;

export const simulatedMetrics = [
  { label: "Reach", value: "2.4M", note: "Simulated" },
  { label: "Impressions", value: "8.1M", note: "Simulated" },
  { label: "Engagement Rate", value: "4.8%", note: "Simulated" },
  { label: "Video Views", value: "1.9M", note: "Simulated" },
  { label: "Completion Rate", value: "62%", note: "Simulated" },
  { label: "CTR", value: "1.7%", note: "Simulated" },
] as const;

export const summaryBeats = [
  {
    title: "Challenge",
    copy: "Introduce a new performance stick into a crowded hockey equipment market without borrowing equity from legacy brands.",
  },
  {
    title: "Audience",
    copy: "Competitive players 14–30 who train for speed of decision and sharpness of release — not just stick flex charts.",
  },
  {
    title: "Insight",
    copy: "Games turn on the split second between seeing an opening and releasing the puck. Equipment should own that moment.",
  },
  {
    title: "Creative Strategy",
    copy: "Build a system around reaction time: condensed type, cropped action, directional graphics, and disciplined contrast.",
  },
  {
    title: "Concept",
    copy: "RELEASE FASTER. — a campaign line that is both product promise and competitive provocation.",
  },
  {
    title: "Visual Identity",
    copy: "Restrained athletic palette, replaceable logo lockups, number treatments, framing devices, and photography crops.",
  },
  {
    title: "Campaign Design",
    copy: "Key visual and print/OOH applications that keep athlete, stick, and line in fixed hierarchy.",
  },
  {
    title: "Social Execution",
    copy: "Platform-native formats for Instagram, TikTok, and YouTube — not one artboard resized six ways.",
  },
  {
    title: "Motion",
    copy: "Controlled product reveal, typographic hit, and social end card prototypes for later AE production.",
  },
  {
    title: "Digital Experience",
    copy: "Responsive launch surface with interactive brand tools and a social format previewer.",
  },
  {
    title: "Outcome / What Was Demonstrated",
    copy: "One concept developed consistently across identity, advertising, social, motion, and digital — portfolio-ready art direction.",
  },
] as const;
