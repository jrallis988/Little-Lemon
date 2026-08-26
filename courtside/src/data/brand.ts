/** COURTSIDE brand + content data. Swap asset paths to drop in PS/AI/AE exports. */

export const brand = {
  name: "COURTSIDE",
  tagline: "EVERY POSSESSION HAS A STORY.",
  audience: "Sports fans and athletes approximately ages 15–34.",
  problem:
    "Sports channels produce athlete stories, analysis, training, gear, live coverage, and culture — but most lack one flexible visual system that can carry all of them without fragmenting the brand.",
  philosophy:
    "Every Possession Has a Story is the creative philosophy: each moment of play is a narrative unit the system can package across formats.",
  disclaimer:
    "COURTSIDE is a fictional self-initiated portfolio project created to demonstrate YouTube sports design, motion graphics, content packaging, and platform-specific visual strategy.",
} as const;

export const colorRules = [
  {
    name: "Court Orange",
    hex: "#FF3B00",
    role: "Brand / Action",
    use: "Logo accents, CTAs, series bars for Player & Game Day, primary motion wipes.",
  },
  {
    name: "Signal Lime",
    hex: "#B8FF3C",
    role: "Statistics / Performance",
    use: "Numbers, rankings, ratings, score reveals, A/B winners — never decorative fill.",
  },
  {
    name: "Cyan",
    hex: "#3ECFFF",
    role: "Analysis / Education",
    use: "Film Room diagrams, Lab instruction cards, play annotations, chapter markers.",
  },
] as const;

export type DesignMode = "editorial" | "performance" | "game" | "culture";

export const designModes: {
  id: DesignMode;
  name: string;
  description: string;
  surface: string;
}[] = [
  {
    id: "editorial",
    name: "Editorial Mode",
    description:
      "Athlete stories, interviews, profiles — photography-led, quieter type, cinematic grade.",
    surface: "paper",
  },
  {
    id: "performance",
    name: "Performance Mode",
    description:
      "Statistics, comparisons, analysis — numbers as design, lime on ink, dense but clear.",
    surface: "ink",
  },
  {
    id: "game",
    name: "Game Mode",
    description:
      "Scores, highlights, recaps, live energy — fast type, orange pulse, full-bleed action.",
    surface: "ink",
  },
  {
    id: "culture",
    name: "Culture / Gear Mode",
    description:
      "Equipment, sneakers, lifestyle — product-forward framing, warmer accents, editorial review.",
    surface: "paper",
  },
];

export const photos = {
  athletePortrait: "./assets/photos/athlete-portrait.jpg",
  actionDrive: "./assets/photos/action-drive.jpg",
  trainingLab: "./assets/photos/training-lab.jpg",
  gearSneaker: "./assets/photos/gear-sneaker.jpg",
  gamedayArena: "./assets/photos/gameday-arena.jpg",
  cultureCourt: "./assets/photos/culture-court.jpg",
  documentary: "./assets/photos/documentary-bleachers.jpg",
  handsBall: "./assets/photos/hands-ball.jpg",
  avatar: "./assets/photos/avatar-player.jpg",
  filmRoom: "./assets/photos/film-room.jpg",
  athleteWoman: "./assets/photos/athlete-woman.jpg",
  athleteYouth: "./assets/photos/athlete-youth.jpg",
  teamHuddle: "./assets/photos/team-huddle.jpg",
  crowdFans: "./assets/photos/crowd-fans.jpg",
  soccerAthlete: "./assets/photos/soccer-athlete.jpg",
  coachWoman: "./assets/photos/coach-woman.jpg",
} as const;

export const athletes = [
  {
    id: "reed",
    name: "Marcus Reed",
    nameUpper: "MARCUS REED",
    role: "Point Guard",
    team: "Metro United",
    sport: "Basketball",
    photo: photos.athletePortrait,
  },
  {
    id: "vale",
    name: "Imani Vale",
    nameUpper: "IMANI VALE",
    role: "Forward",
    team: "Harbor FC",
    sport: "Basketball",
    photo: photos.athleteWoman,
  },
  {
    id: "cho",
    name: "Kenji Cho",
    nameUpper: "KENJI CHO",
    role: "Guard",
    team: "East Prep",
    sport: "Basketball",
    photo: photos.athleteYouth,
  },
  {
    id: "santos",
    name: "Lucia Santos",
    nameUpper: "LUCIA SANTOS",
    role: "Midfielder",
    team: "River City",
    sport: "Soccer",
    photo: photos.soccerAthlete,
  },
  {
    id: "torres",
    name: "Alina Torres",
    nameUpper: "ALINA TORRES",
    role: "Head Coach",
    team: "Metro United",
    sport: "Basketball",
    photo: photos.coachWoman,
  },
] as const;

/** @deprecated prefer athletes[0] — kept for package compatibility */
export const athlete = {
  name: athletes[0].name,
  nameUpper: athletes[0].nameUpper,
  position: athletes[0].role,
  team: athletes[0].team,
  location: "Brooklyn, NY",
  gym: "East Side Athletic",
  episode: "THE WORK NOBODY SEES",
  quote: "The work that wins games happens when nobody is watching.",
  stats: [
    { label: "PPG", value: "27.4" },
    { label: "RPG", value: "8.2" },
    { label: "APG", value: "6.7" },
    { label: "3PT", value: "41%" },
  ],
} as const;

export type SeriesId =
  | "player"
  | "film"
  | "lab"
  | "gear"
  | "gameday"
  | "culture";

export interface SeriesDef {
  id: SeriesId;
  name: string;
  short: string;
  description: string;
  accent: string;
  accentRole: string;
  mode: DesignMode;
  device: string;
  photo: string;
}

export const seriesList: SeriesDef[] = [
  {
    id: "player",
    name: "THE PLAYER",
    short: "Profiles & interviews",
    description: "Athlete profiles and interviews.",
    accent: "var(--series-player)",
    accentRole: "Orange · brand / story",
    mode: "editorial",
    device: "Left accent bar + name lockup",
    photo: photos.athleteWoman,
  },
  {
    id: "film",
    name: "FILM ROOM",
    short: "Strategy & analysis",
    description: "Strategy and game analysis.",
    accent: "var(--series-film)",
    accentRole: "Lime · performance data",
    mode: "performance",
    device: "Diagram stroke + cyan callouts",
    photo: photos.filmRoom,
  },
  {
    id: "lab",
    name: "THE LAB",
    short: "Training & skill",
    description: "Training and skill development.",
    accent: "var(--series-lab)",
    accentRole: "Cyan · education",
    mode: "performance",
    device: "Step cards + progress rail",
    photo: photos.athleteYouth,
  },
  {
    id: "gear",
    name: "GEAR",
    short: "Sneakers & equipment",
    description: "Sneakers, apparel, and equipment.",
    accent: "var(--series-gear)",
    accentRole: "Amber · product review",
    mode: "culture",
    device: "Score badge + callout stack",
    photo: photos.gearSneaker,
  },
  {
    id: "gameday",
    name: "GAME DAY",
    short: "Competition coverage",
    description: "Live energy, scores, and recaps.",
    accent: "var(--series-gameday)",
    accentRole: "Orange · action",
    mode: "game",
    device: "Matchup lockup + score pulse",
    photo: photos.gamedayArena,
  },
  {
    id: "culture",
    name: "CULTURE",
    short: "Fashion & community",
    description: "Fashion, music, fans, and community.",
    accent: "var(--series-culture)",
    accentRole: "Violet · culture",
    mode: "culture",
    device: "Wide crop + lifestyle grade",
    photo: photos.cultureCourt,
  },
];

export interface ThumbnailConcept {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  series: SeriesId;
  photo: string;
  layout: "athlete" | "action" | "product" | "culture" | "announce" | "stat";
  textAlign?: "left" | "right";
}

export const thumbnailRules = [
  { label: "Logo", rule: "CS mark top-opposite of type; never center." },
  { label: "Type", rule: "Max 3–5 words. Display condensed. Series ID above title." },
  { label: "Crop", rule: "Eyes in upper third for portraits; action on leading edge." },
  { label: "Accent", rule: "One accent bar only — series color, not rainbow." },
  { label: "Photo", rule: "High contrast grade; subject first; no shocked-face clichés." },
  { label: "Mobile", rule: "Title must read at 168px wide. Test before shipping." },
] as const;

export const thumbnails: ThumbnailConcept[] = [
  {
    id: "t1",
    category: "Athlete interview",
    title: "IMANI VALE",
    subtitle: "THE WORK",
    series: "player",
    photo: photos.athleteWoman,
    layout: "athlete",
    textAlign: "left",
  },
  {
    id: "t2",
    category: "Player profile",
    title: "THE PLAYER",
    subtitle: "CHO",
    series: "player",
    photo: photos.athleteYouth,
    layout: "athlete",
    textAlign: "right",
  },
  {
    id: "t3",
    category: "Documentary",
    title: "NOBODY SEES",
    subtitle: "DOCUMENTARY",
    series: "player",
    photo: photos.documentary,
    layout: "culture",
    textAlign: "left",
  },
  {
    id: "t4",
    category: "Game analysis",
    title: "WHY THIS WORKS",
    subtitle: "FILM ROOM",
    series: "film",
    photo: photos.filmRoom,
    layout: "action",
    textAlign: "left",
  },
  {
    id: "t5",
    category: "Training",
    title: "CREATE SPACE",
    subtitle: "THE LAB",
    series: "lab",
    photo: photos.trainingLab,
    layout: "action",
    textAlign: "right",
  },
  {
    id: "t6",
    category: "Shooting tutorial",
    title: "RELEASE",
    subtitle: "3 DRILLS",
    series: "lab",
    photo: photos.athleteYouth,
    layout: "athlete",
    textAlign: "left",
  },
  {
    id: "t7",
    category: "Sneaker review",
    title: "WORTH IT?",
    subtitle: "GEAR",
    series: "gear",
    photo: photos.gearSneaker,
    layout: "product",
    textAlign: "left",
  },
  {
    id: "t8",
    category: "Equipment compare",
    title: "A vs B",
    subtitle: "WHICH WINS",
    series: "gear",
    photo: photos.gearSneaker,
    layout: "product",
    textAlign: "right",
  },
  {
    id: "t9",
    category: "Game-day",
    title: "GAME DAY",
    subtitle: "INSIDE",
    series: "gameday",
    photo: photos.gamedayArena,
    layout: "action",
    textAlign: "left",
  },
  {
    id: "t10",
    category: "Team feature",
    title: "HUDDLE",
    subtitle: "TEAM",
    series: "gameday",
    photo: photos.teamHuddle,
    layout: "action",
    textAlign: "right",
  },
  {
    id: "t11",
    category: "Culture",
    title: "AFTER DARK",
    subtitle: "CULTURE",
    series: "culture",
    photo: photos.cultureCourt,
    layout: "culture",
    textAlign: "left",
  },
  {
    id: "t12",
    category: "Cross-sport",
    title: "SANTOS",
    subtitle: "90′",
    series: "player",
    photo: photos.soccerAthlete,
    layout: "announce",
    textAlign: "left",
  },
];

export const chapters = [
  { id: "ch-problem", num: "01", label: "The Problem" },
  { id: "ch-idea", num: "02", label: "The Idea" },
  { id: "ch-identity", num: "03", label: "The Identity" },
  { id: "ch-content", num: "04", label: "The Content System" },
  { id: "ch-viewing", num: "05", label: "The Viewing Experience" },
  { id: "ch-data", num: "06", label: "The Data System" },
  { id: "ch-ecosystem", num: "07", label: "The Ecosystem" },
  { id: "ch-testing", num: "08", label: "Testing & Results" },
  { id: "ch-final", num: "09", label: "Final System" },
] as const;
