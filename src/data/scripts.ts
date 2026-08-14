export type ScriptFormat = "Feature" | "Pilot" | "Limited Series";
export type ScriptStatus = "Spec" | "In Development" | "Produced" | "Pages Available";

export type Script = {
  id: string;
  title: string;
  format: ScriptFormat;
  genre: string;
  status: ScriptStatus;
  pages: number;
  logline: string;
  tone: string;
};

export const writer = {
  name: "James Rallis",
  role: "Screenwriter",
  location: "East Coast, USA",
  email: "jjrallis@unh.edu",
  tagline: "East Coast stories. Character first. Pages that play.",
  bio: [
    "I write live-action features and pilots rooted in Atlantic towns, working lives, and the quiet pressure of weather and place.",
    "My work favors precise characters, moral weather, and drama that earns its turns on the page before it ever reaches a set.",
  ],
  themes: ["Place as pressure", "Working-class Atlantic", "Family & inheritance", "Quiet suspense"],
};

export const scripts: Script[] = [
  {
    id: "harbor-light",
    title: "Harbor Light",
    format: "Feature",
    genre: "Drama",
    status: "Pages Available",
    pages: 108,
    logline:
      "A Cape Cod ferry captain confronts a past that resurfaces with the winter fog—and a passenger who knows what he buried.",
    tone: "#7a8fa8",
  },
  {
    id: "north-of-providence",
    title: "North of Providence",
    format: "Limited Series",
    genre: "Crime",
    status: "In Development",
    pages: 62,
    logline:
      "When federal investigators close in on a family-owned mill town, a reluctant heir must choose between blood and the truth.",
    tone: "#b85c3a",
  },
  {
    id: "the-last-matinee",
    title: "The Last Matinee",
    format: "Feature",
    genre: "Thriller",
    status: "Spec",
    pages: 104,
    logline:
      "An independent cinema owner discovers the final reel of a film that was never meant to screen—and someone willing to kill for it.",
    tone: "#a87840",
  },
  {
    id: "atlantic-room",
    title: "Atlantic Room",
    format: "Feature",
    genre: "Romance",
    status: "Pages Available",
    pages: 98,
    logline:
      "Two strangers share a Portland boarding house during a week of nor'easters and decide whether the storm is an ending or a beginning.",
    tone: "#8a9bb5",
  },
  {
    id: "wire-and-wood",
    title: "Wire & Wood",
    format: "Pilot",
    genre: "Drama",
    status: "Spec",
    pages: 58,
    logline:
      "After a landmark club closes, musicians and promoters rebuild a regional scene—and reopen old debts in the process.",
    tone: "#c4a06a",
  },
  {
    id: "salt-and-iron",
    title: "Salt & Iron",
    format: "Feature",
    genre: "Drama",
    status: "In Development",
    pages: 112,
    logline:
      "A Maine shipyard faces its final season as a father and daughter fight to finish one last hull before the work disappears.",
    tone: "#6d8a7a",
  },
];
