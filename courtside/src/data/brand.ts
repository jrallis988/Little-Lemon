/** COURTSIDE brand + content data. Swap asset paths to drop in PS/AI/AE exports. */

export const brand = {
  name: "COURTSIDE",
  tagline: "EVERY POSSESSION HAS A STORY.",
  audience: "Basketball fans and players approximately ages 15–34.",
  disclaimer:
    "COURTSIDE is a fictional self-initiated portfolio project created to demonstrate YouTube sports design, motion graphics, content packaging, and platform-specific visual strategy.",
} as const;

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
  photo: string;
}

export const seriesList: SeriesDef[] = [
  {
    id: "player",
    name: "THE PLAYER",
    short: "Profiles & interviews",
    description: "Athlete profiles and interviews.",
    accent: "var(--series-player)",
    photo: photos.athletePortrait,
  },
  {
    id: "film",
    name: "FILM ROOM",
    short: "Strategy & analysis",
    description: "Basketball strategy and game analysis.",
    accent: "var(--series-film)",
    photo: photos.filmRoom,
  },
  {
    id: "lab",
    name: "THE LAB",
    short: "Training & skill",
    description: "Training and skill development.",
    accent: "var(--series-lab)",
    photo: photos.trainingLab,
  },
  {
    id: "gear",
    name: "GEAR",
    short: "Sneakers & equipment",
    description: "Sneakers, equipment, and basketball products.",
    accent: "var(--series-gear)",
    photo: photos.gearSneaker,
  },
  {
    id: "gameday",
    name: "GAME DAY",
    short: "Competition coverage",
    description: "Behind-the-scenes competition content.",
    accent: "var(--series-gameday)",
    photo: photos.gamedayArena,
  },
  {
    id: "culture",
    name: "CULTURE",
    short: "Fashion & community",
    description: "Sneakers, fashion, music, community, and basketball culture.",
    accent: "var(--series-culture)",
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
  layout: "athlete" | "action" | "product" | "culture" | "announce";
  textAlign?: "left" | "right";
}

export const thumbnails: ThumbnailConcept[] = [
  {
    id: "t1",
    category: "Athlete interview",
    title: "MARCUS REED",
    subtitle: "THE WORK",
    series: "player",
    photo: photos.athletePortrait,
    layout: "athlete",
    textAlign: "left",
  },
  {
    id: "t2",
    category: "Player profile",
    title: "THE PLAYER",
    subtitle: "REED",
    series: "player",
    photo: photos.documentary,
    layout: "athlete",
    textAlign: "right",
  },
  {
    id: "t3",
    category: "Basketball documentary",
    title: "NOBODY SEES",
    subtitle: "DOCUMENTARY",
    series: "player",
    photo: photos.handsBall,
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
    category: "Training video",
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
    photo: photos.trainingLab,
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
    category: "Equipment comparison",
    title: "A vs B",
    subtitle: "WHICH WINS",
    series: "gear",
    photo: photos.gearSneaker,
    layout: "product",
    textAlign: "right",
  },
  {
    id: "t9",
    category: "Game-day documentary",
    title: "GAME DAY",
    subtitle: "INSIDE",
    series: "gameday",
    photo: photos.gamedayArena,
    layout: "action",
    textAlign: "left",
  },
  {
    id: "t10",
    category: "Behind-the-scenes",
    title: "TUNNEL",
    subtitle: "BTS",
    series: "gameday",
    photo: photos.actionDrive,
    layout: "action",
    textAlign: "right",
  },
  {
    id: "t11",
    category: "Basketball culture",
    title: "AFTER DARK",
    subtitle: "CULTURE",
    series: "culture",
    photo: photos.cultureCourt,
    layout: "culture",
    textAlign: "left",
  },
  {
    id: "t12",
    category: "Major announcement",
    title: "NEW SERIES",
    subtitle: "COMING",
    series: "player",
    photo: photos.actionDrive,
    layout: "announce",
    textAlign: "left",
  },
];

export const athlete = {
  name: "Marcus Reed",
  nameUpper: "MARCUS REED",
  position: "Point Guard",
  team: "Metro United",
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

export const navSections = [
  { id: "challenge", label: "Case" },
  { id: "brand", label: "Brand" },
  { id: "channel", label: "Channel" },
  { id: "series", label: "Series" },
  { id: "thumbnails", label: "Thumbs" },
  { id: "compare", label: "Compare" },
  { id: "interview", label: "Interview" },
  { id: "profile", label: "Profile" },
  { id: "filmroom", label: "Film" },
  { id: "lab", label: "Lab" },
  { id: "gear", label: "Gear" },
  { id: "gameday", label: "Game Day" },
  { id: "lowerthirds", label: "L3" },
  { id: "stats", label: "Stats" },
  { id: "motion", label: "Motion" },
  { id: "endscreens", label: "Ends" },
  { id: "playlists", label: "Playlists" },
  { id: "shorts", label: "Shorts" },
  { id: "ecosystem", label: "Ecosystem" },
  { id: "abtest", label: "A/B" },
  { id: "performance", label: "Perf" },
] as const;
