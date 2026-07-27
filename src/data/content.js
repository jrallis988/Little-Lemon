export const shows = [
  {
    id: "academy-rock",
    title: "Academy Rock",
    meta: "2024 · 1 Season · Ages 2–5",
    tagline: "Find your voice. Share the spotlight.",
    featured: true,
    to: "/academy-rock",
    palette: ["#1a0b2e", "#39e6c4", "#ff4d6d"],
    progress: null,
  },
  {
    id: "sunny-paws",
    title: "Sunny Paws",
    meta: "2023 · 2 Seasons · Ages 2–5",
    tagline: "Adventures under a bright sky.",
    featured: false,
    to: "/",
    palette: ["#00b4e4", "#ffc107", "#0a1628"],
    progress: 0.45,
  },
  {
    id: "little-harbor",
    title: "Little Harbor",
    meta: "2022 · 3 Seasons · Ages 2–5",
    tagline: "Friends on every tide.",
    featured: false,
    to: "/",
    palette: ["#ff1f7a", "#7ec8ff", "#0a1628"],
    progress: 0.7,
  },
  {
    id: "count-with-coco",
    title: "Count with Coco",
    meta: "2024 · 1 Season · Ages 2–5",
    tagline: "Numbers that bounce and sing.",
    featured: false,
    to: "/",
    palette: ["#ff9800", "#1a237e", "#ffe082"],
    progress: null,
  },
  {
    id: "rainbow-bus",
    title: "Rainbow Bus",
    meta: "2021 · 4 Seasons · Ages 2–5",
    tagline: "Hop on for a musical ride.",
    featured: false,
    to: "/",
    palette: ["#00c853", "#ff1f7a", "#00b4e4"],
    progress: 0.2,
  },
  {
    id: "starlight-story",
    title: "Starlight Story",
    meta: "2023 · 1 Season · Ages 2–5",
    tagline: "Bedtime tales under glowing skies.",
    featured: false,
    to: "/",
    palette: ["#0d47a1", "#ce93d8", "#fff59d"],
    progress: null,
  },
  {
    id: "puppy-dog-pals",
    title: "Melody Pals",
    meta: "2020 · 5 Seasons · Ages 2–5",
    tagline: "Two pals, one big song.",
    featured: false,
    to: "/",
    palette: ["#1565c0", "#ef5350", "#ffecb3"],
    progress: null,
  },
  {
    id: "garden-grove",
    title: "Garden Grove",
    meta: "2022 · 2 Seasons · Ages 2–5",
    tagline: "Grow kindness, one seed at a time.",
    featured: false,
    to: "/",
    palette: ["#2e7d32", "#aed581", "#fff8e1"],
    progress: null,
  },
];

export const brands = [
  { id: "disney", label: "Disney", gradient: ["#113ccf", "#0b1d51"] },
  { id: "pixar", label: "Pixar", gradient: ["#1089ff", "#003087"] },
  { id: "marvel", label: "Marvel", gradient: ["#ed1d24", "#7a0c10"] },
  { id: "star-wars", label: "Star Wars", gradient: ["#1a1a1a", "#000"] },
  { id: "nat-geo", label: "National Geographic", gradient: ["#ffcc00", "#1a1a1a"] },
  { id: "disney-jr", label: "Disney Jr", gradient: ["#ff1f7a", "#7b1fa2"], featured: true },
];

export const rows = [
  {
    id: "continue",
    title: "Continue Watching",
    showIds: ["little-harbor", "sunny-paws", "rainbow-bus"],
  },
  {
    id: "disney-jr-originals",
    title: "Disney Jr Originals",
    showIds: ["academy-rock", "count-with-coco", "starlight-story", "sunny-paws", "garden-grove"],
  },
  {
    id: "music",
    title: "Music & Sing-Alongs",
    showIds: ["academy-rock", "rainbow-bus", "puppy-dog-pals", "little-harbor", "sunny-paws"],
  },
  {
    id: "recommended",
    title: "Recommended For You",
    showIds: ["academy-rock", "garden-grove", "sunny-paws", "starlight-story", "count-with-coco", "rainbow-bus"],
  },
];

export const academyEpisodes = [
  {
    id: "ep1",
    number: 1,
    title: "First Day Jams",
    description:
      "Mia finds her courage—and her sparkly tambourine—on the first day at Academy Rock.",
    duration: "11 min",
    color: "#39e6c4",
  },
  {
    id: "ep2",
    number: 2,
    title: "The Quiet Beat",
    description:
      "When the drums feel too loud, Theo learns that soft rhythms can still rock the room.",
    duration: "11 min",
    color: "#ff4d6d",
  },
  {
    id: "ep3",
    number: 3,
    title: "Harmony Helpers",
    description:
      "Lila and friends practice blending voices so every note feels like a hug.",
    duration: "12 min",
    color: "#ffc107",
  },
  {
    id: "ep4",
    number: 4,
    title: "Stage Light Surprise",
    description:
      "A broken spotlight turns into a glowing dance party under the moon lamp.",
    duration: "11 min",
    color: "#00b4e4",
  },
  {
    id: "ep5",
    number: 5,
    title: "Encore Kindness",
    description:
      "Someone forgets their solo—so the whole academy shares the big finish.",
    duration: "12 min",
    color: "#ff1f7a",
  },
];

export const academyCast = [
  {
    id: "mia",
    name: "Mia",
    role: "Tambourine lead",
    colors: ["#ff4d6d", "#ffc107"],
  },
  {
    id: "theo",
    name: "Theo",
    role: "Gentle drummer",
    colors: ["#39e6c4", "#00b4e4"],
  },
  {
    id: "lila",
    name: "Lila",
    role: "Harmony singer",
    colors: ["#b388ff", "#ff1f7a"],
  },
  {
    id: "coach-keys",
    name: "Coach Keys",
    role: "Piano mentor",
    colors: ["#ffc107", "#0c2340"],
  },
];

export function getShow(id) {
  return shows.find((s) => s.id === id);
}

export function getShowsByIds(ids) {
  return ids.map((id) => shows.find((s) => s.id === id)).filter(Boolean);
}
