export const shows = [
  {
    id: "academy-rock",
    title: "Academy Rock",
    meta: "2024 · 1 Season · Ages 2–5",
    tagline: "Catchy songs that stick — letters, numbers, and kindness.",
    featured: true,
    to: "/academy-rock",
    palette: ["#e53935", "#ffeb3b", "#1e88e5"],
    progress: null,
    characters: ["Melody", "Count", "Letter Lou", "Miss Chalk"],
  },
  {
    id: "sunny-paws",
    title: "Sunny Paws",
    meta: "2023 · 2 Seasons · Ages 2–5",
    tagline: "Adventures under a bright sky.",
    featured: false,
    to: "/disney-jr",
    palette: ["#00b4e4", "#ffc107", "#0a1628"],
    progress: 0.45,
    characters: ["Sunny"],
  },
  {
    id: "little-harbor",
    title: "Little Harbor",
    meta: "2022 · 3 Seasons · Ages 2–5",
    tagline: "Friends on every tide.",
    featured: false,
    to: "/disney-jr",
    palette: ["#ff1f7a", "#7ec8ff", "#0a1628"],
    progress: 0.7,
    characters: ["Cap"],
  },
  {
    id: "count-with-coco",
    title: "Count with Coco",
    meta: "2024 · 1 Season · Ages 2–5",
    tagline: "Numbers that bounce and sing.",
    featured: false,
    to: "/disney-jr",
    palette: ["#ff9800", "#1a237e", "#ffe082"],
    progress: null,
    characters: ["Coco"],
  },
  {
    id: "rainbow-bus",
    title: "Rainbow Bus",
    meta: "2021 · 4 Seasons · Ages 2–5",
    tagline: "Hop on for a musical ride.",
    featured: false,
    to: "/disney-jr",
    palette: ["#00c853", "#ff1f7a", "#00b4e4"],
    progress: 0.2,
    characters: ["Beep"],
  },
  {
    id: "starlight-story",
    title: "Starlight Story",
    meta: "2023 · 1 Season · Ages 2–5",
    tagline: "Bedtime tales under glowing skies.",
    featured: false,
    to: "/disney-jr",
    palette: ["#0d47a1", "#ce93d8", "#fff59d"],
    progress: null,
    characters: ["Nova"],
  },
  {
    id: "puppy-dog-pals",
    title: "Melody Pals",
    meta: "2020 · 5 Seasons · Ages 2–5",
    tagline: "Two pals, one big song.",
    featured: false,
    to: "/disney-jr",
    palette: ["#1565c0", "#ef5350", "#ffecb3"],
    progress: null,
    characters: ["Bingo", "Rolly"],
  },
  {
    id: "garden-grove",
    title: "Garden Grove",
    meta: "2022 · 2 Seasons · Ages 2–5",
    tagline: "Grow kindness, one seed at a time.",
    featured: false,
    to: "/disney-jr",
    palette: ["#2e7d32", "#aed581", "#fff8e1"],
    progress: null,
    characters: ["Pip"],
  },
  {
    id: "dance-party",
    title: "Dance Party Parade",
    meta: "2024 · Playlist · Ages 2–5",
    tagline: "Move, clap, and cheer along.",
    featured: false,
    to: "/disney-jr",
    palette: ["#e91e63", "#ffeb3b", "#7c4dff"],
    progress: null,
    characters: ["Mia", "Beep"],
  },
  {
    id: "calm-corner",
    title: "Calm Corner",
    meta: "2023 · Playlist · Ages 2–5",
    tagline: "Soft songs for quiet time.",
    featured: false,
    to: "/disney-jr",
    palette: ["#5c6bc0", "#b39ddb", "#e8eaf6"],
    progress: null,
    characters: ["Nova"],
  },
];

/** Primary studio brand hubs — Disney Jr sits beside Disney for quick access. */
export const brands = [
  {
    id: "disney",
    label: "Disney",
    to: "/",
    variant: "disney",
  },
  {
    id: "disney-jr",
    label: "Disney Jr.",
    to: "/disney-jr",
    variant: "disney-jr",
    featured: true,
  },
  {
    id: "pixar",
    label: "Pixar",
    to: "/",
    variant: "pixar",
  },
  {
    id: "marvel",
    label: "Marvel",
    to: "/",
    variant: "marvel",
  },
  {
    id: "star-wars",
    label: "Star Wars",
    to: "/",
    variant: "star-wars",
  },
  {
    id: "nat-geo",
    label: "National Geographic",
    to: "/",
    variant: "nat-geo",
  },
];

export const homeRows = [
  {
    id: "originals",
    title: "Originals",
    showIds: ["academy-rock", "count-with-coco", "starlight-story", "sunny-paws", "garden-grove"],
  },
  {
    id: "continue",
    title: "Continue Watching",
    showIds: ["little-harbor", "sunny-paws", "rainbow-bus", "academy-rock"],
  },
];

/** Preschool-optimized carousels for the Disney Jr hub */
export const disneyJrHubRows = [
  {
    id: "jr-continue",
    title: "Recently Watched",
    showIds: ["little-harbor", "sunny-paws", "rainbow-bus", "academy-rock"],
  },
  {
    id: "jr-characters",
    title: "Characters Kids Love",
    showIds: ["academy-rock", "puppy-dog-pals", "sunny-paws", "count-with-coco", "garden-grove"],
  },
  {
    id: "jr-playlists",
    title: "Continuous Play",
    showIds: ["dance-party", "calm-corner", "rainbow-bus", "academy-rock", "starlight-story"],
  },
  {
    id: "jr-music",
    title: "Music & Sing-Alongs",
    showIds: ["academy-rock", "rainbow-bus", "puppy-dog-pals", "dance-party", "little-harbor"],
  },
  {
    id: "jr-learning",
    title: "Learn Through Play",
    showIds: ["count-with-coco", "garden-grove", "starlight-story", "sunny-paws"],
  },
  {
    id: "jr-originals",
    title: "Disney Jr Originals",
    showIds: ["academy-rock", "count-with-coco", "starlight-story", "sunny-paws", "garden-grove"],
  },
];

/** Demo streams (public sample MP4s) — stand-ins until licensed Academy Rock videos exist. */
const DEMO_STREAMS = {
  bunny: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  elephants: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  fun: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  joyrides: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  sintel: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
};

export const academyEpisodes = [
  {
    id: "ep1",
    number: 1,
    title: "Three Is a Magic Beat",
    description:
      "Melody claps to three and discovers counting is the catchiest chorus around.",
    duration: "3 min",
    color: "#e53935",
    subject: "Numbers",
    videoUrl: DEMO_STREAMS.fun,
  },
  {
    id: "ep2",
    number: 2,
    title: "Letter Lou’s Junction",
    description:
      "Letter Lou hooks A to Z together so every word can hop aboard the alphabet train.",
    duration: "3 min",
    color: "#1e88e5",
    subject: "Letters",
    videoUrl: DEMO_STREAMS.bunny,
  },
  {
    id: "ep3",
    number: 3,
    title: "Shape Shuffle Song",
    description:
      "Circles, squares, and triangles dance across the chalkboard until shapes feel like friends.",
    duration: "3 min",
    color: "#43a047",
    subject: "Shapes",
    videoUrl: DEMO_STREAMS.elephants,
  },
  {
    id: "ep4",
    number: 4,
    title: "Kindness Junction",
    description:
      "A sticky situation needs sharing — and the class sings their way to a friendlier finish.",
    duration: "3 min",
    color: "#f9a825",
    subject: "Feelings",
    videoUrl: DEMO_STREAMS.joyrides,
  },
  {
    id: "ep5",
    number: 5,
    title: "Rule of the Room",
    description:
      "Miss Chalk shows how classroom rules travel from idea to “we all agree” — with a groove.",
    duration: "4 min",
    color: "#8e24aa",
    subject: "Civics",
    videoUrl: DEMO_STREAMS.sintel,
  },
];

export const academyCast = [
  {
    id: "melody",
    name: "Melody",
    role: "Song leader",
    colors: ["#e53935", "#ffeb3b"],
  },
  {
    id: "count",
    name: "Count",
    role: "Number drummer",
    colors: ["#1e88e5", "#43a047"],
  },
  {
    id: "letter-lou",
    name: "Letter Lou",
    role: "Alphabet conductor",
    colors: ["#8e24aa", "#ff8a65"],
  },
  {
    id: "miss-chalk",
    name: "Miss Chalk",
    role: "Class mentor",
    colors: ["#43a047", "#ffeb3b"],
  },
];

export function getShow(id) {
  return shows.find((s) => s.id === id);
}

export function getShowsByIds(ids) {
  return ids.map((id) => shows.find((s) => s.id === id)).filter(Boolean);
}
