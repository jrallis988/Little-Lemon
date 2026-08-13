export type ProjectStatus =
  | "In Development"
  | "Pre-Production"
  | "Post-Production"
  | "Completed";

export type Project = {
  id: string;
  title: string;
  genre: string;
  status: ProjectStatus;
  year: string;
  format: "Feature" | "Limited Series" | "Series" | "Documentary";
  synopsis: string;
  /** CSS background layers for poster art */
  poster: string;
  tone: string;
};

export const featuredProjectId = "harbor-light";

export const projects: Project[] = [
  {
    id: "harbor-light",
    title: "Harbor Light",
    genre: "Drama",
    status: "In Development",
    year: "2027",
    format: "Feature",
    synopsis:
      "A Cape Cod ferry captain confronts a past that resurfaces with the winter fog.",
    tone: "#7a8fa8",
    poster:
      "radial-gradient(ellipse at 50% 20%, #c9d4e0 0%, transparent 45%), linear-gradient(180deg, #1a2433 0%, #0b1018 40%, #05070b 100%)",
  },
  {
    id: "north-of-providence",
    title: "North of Providence",
    genre: "Crime",
    status: "Pre-Production",
    year: "2027",
    format: "Limited Series",
    synopsis:
      "A limited series tracking a family-owned mill town as federal investigators close in.",
    tone: "#b85c3a",
    poster:
      "radial-gradient(ellipse at 70% 30%, #8b3a2a 0%, transparent 40%), linear-gradient(160deg, #1c1210 0%, #0a0706 55%, #140c0a 100%)",
  },
  {
    id: "salt-and-iron",
    title: "Salt & Iron",
    genre: "Documentary",
    status: "Post-Production",
    year: "2026",
    format: "Documentary",
    synopsis:
      "An observational portrait of shipbuilders along the Maine coast across one working season.",
    tone: "#6d8a7a",
    poster:
      "radial-gradient(ellipse at 40% 70%, #4a6b5c 0%, transparent 50%), linear-gradient(200deg, #0f1614 0%, #060908 50%, #121a18 100%)",
  },
  {
    id: "the-last-matinee",
    title: "The Last Matinee",
    genre: "Thriller",
    status: "In Development",
    year: "2028",
    format: "Feature",
    synopsis:
      "An independent cinema owner discovers the final reel of a film that was never meant to screen.",
    tone: "#a87840",
    poster:
      "radial-gradient(circle at 50% 40%, #3d2a14 0%, transparent 55%), linear-gradient(180deg, #120e08 0%, #050403 60%, #1a1208 100%)",
  },
  {
    id: "atlantic-room",
    title: "Atlantic Room",
    genre: "Romance",
    status: "Completed",
    year: "2025",
    format: "Feature",
    synopsis:
      "Two strangers share a boarding house in Portland during a week of nor'easters.",
    tone: "#8a9bb5",
    poster:
      "radial-gradient(ellipse at 30% 25%, #5a6d88 0%, transparent 45%), linear-gradient(185deg, #101520 0%, #07090d 45%, #151a24 100%)",
  },
  {
    id: "wire-and-wood",
    title: "Wire & Wood",
    genre: "Music",
    status: "Pre-Production",
    year: "2027",
    format: "Series",
    synopsis:
      "Musicians, promoters, and venue owners rebuild a regional scene after a landmark club closes.",
    tone: "#c4a06a",
    poster:
      "radial-gradient(ellipse at 60% 80%, #6b4e28 0%, transparent 45%), linear-gradient(150deg, #14100c 0%, #080604 50%, #1c1610 100%)",
  },
];

export function getFeaturedProject() {
  return projects.find((project) => project.id === featuredProjectId) ?? projects[0];
}
