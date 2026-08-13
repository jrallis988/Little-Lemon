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
  synopsis: string;
};

export const projects: Project[] = [
  {
    id: "harbor-light",
    title: "Harbor Light",
    genre: "Drama",
    status: "In Development",
    synopsis:
      "A Cape Cod ferry captain confronts a past that resurfaces with the winter fog.",
  },
  {
    id: "north-of-providence",
    title: "North of Providence",
    genre: "Crime Series",
    status: "Pre-Production",
    synopsis:
      "A limited series tracking a family-owned mill town as federal investigators close in.",
  },
  {
    id: "salt-and-iron",
    title: "Salt & Iron",
    genre: "Documentary",
    status: "Post-Production",
    synopsis:
      "An observational portrait of shipbuilders along the Maine coast across one working season.",
  },
  {
    id: "the-last-matinee",
    title: "The Last Matinee",
    genre: "Thriller",
    status: "In Development",
    synopsis:
      "An independent cinema owner discovers the final reel of a film that was never meant to screen.",
  },
  {
    id: "atlantic-room",
    title: "Atlantic Room",
    genre: "Romance",
    status: "Completed",
    synopsis:
      "Two strangers share a boarding house in Portland during a week of nor’easters.",
  },
  {
    id: "wire-and-wood",
    title: "Wire & Wood",
    genre: "Series",
    status: "Pre-Production",
    synopsis:
      "Musicians, promoters, and venue owners rebuild a regional scene after a landmark club closes.",
  },
];
