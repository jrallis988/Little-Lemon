export interface HubResource {
  id: string;
  title: string;
  description: string;
  audience: "Teachers" | "Librarians" | "Both";
  type: "discussion" | "activity" | "guide" | "worksheet" | "promo";
  bookSlug?: string;
  relatedToFallReadingWeek?: boolean;
}

export const educatorHub = {
  intro:
    "Resources for teachers, school librarians, and public librarians supporting young readers through the Fall 2026 season. Download reading guides, discussion questions, classroom activities, and promotional materials — or pair them with Fall Reading Week programming.",
  categories: [
    {
      id: "guides",
      title: "Reading Guides",
      description: "Chapter-by-chapter and whole-book guides for classroom and book club use.",
    },
    {
      id: "discussion",
      title: "Discussion Questions",
      description: "Conversation starters designed for grades 2–8 literacy circles.",
    },
    {
      id: "activities",
      title: "Classroom Activities",
      description: "Hands-on writing, STEM, and creative response projects.",
    },
    {
      id: "printables",
      title: "Printable Materials",
      description: "Shelf talkers, bookmarks, posters, and QR landing cards.",
    },
  ],
  resources: [
    {
      id: "frw-classroom-kit",
      title: "Fall Reading Week Classroom Kit",
      description:
        "Seven daily lesson outlines with discussion prompts and printable bookmarks.",
      audience: "Teachers",
      type: "guide",
      relatedToFallReadingWeek: true,
    },
    {
      id: "frw-library-box",
      title: "Library Program-in-a-Box",
      description:
        "Age-banded program outlines for public and school libraries during October 12–18.",
      audience: "Librarians",
      type: "activity",
      relatedToFallReadingWeek: true,
    },
    {
      id: "mapmaker-guide",
      title: "The Mapmaker's Compass — Educator Pack",
      description:
        "Mapping activity, courage discussion guide, and island ecology cross-curricular notes.",
      audience: "Both",
      type: "guide",
      bookSlug: "the-mapmakers-compass",
    },
    {
      id: "maple-discussion",
      title: "Midnight at Maple Hollow — Discussion Guide",
      description:
        "Mystery elements, fair-play clues, and observation skills for grades 4–6.",
      audience: "Both",
      type: "discussion",
      bookSlug: "midnight-at-maple-hollow",
    },
    {
      id: "lantern-writing",
      title: "Memory Lantern Creative Writing",
      description:
        "Students write descriptions of moments they would preserve in light.",
      audience: "Teachers",
      type: "activity",
      bookSlug: "the-last-lantern-keeper",
    },
    {
      id: "lunch-persuasion",
      title: "Persuasive Letter Workshop",
      description:
        "Students write petition letters modeled on Operation: Lunch Box activism.",
      audience: "Teachers",
      type: "activity",
      bookSlug: "operation-lunch-box",
    },
    {
      id: "room12b-inclusion",
      title: "Building Inclusive Communities",
      description:
        "Discussion questions about belonging, empathy, and welcoming school spaces.",
      audience: "Both",
      type: "discussion",
      bookSlug: "the-secret-club-of-room-12b",
    },
    {
      id: "stem-lab",
      title: "Satellite Tracking STEM Lab",
      description:
        "Hands-on activity using orbital data and basic coding concepts.",
      audience: "Teachers",
      type: "worksheet",
      bookSlug: "code-and-constellations",
    },
    {
      id: "willow-letters",
      title: "Primary Source Letter Writing",
      description:
        "Historical letter prompts connecting WWII home front to present-day resilience.",
      audience: "Teachers",
      type: "activity",
      bookSlug: "letters-from-willow-creek",
    },
    {
      id: "bell-transition",
      title: "Transition & Change Discussion Guide",
      description:
        "Sensitive prompts about friendship transitions, family change, and endings.",
      audience: "Both",
      type: "discussion",
      bookSlug: "before-the-bell-rings",
    },
    {
      id: "age-grade-chart",
      title: "Age & Grade Recommendation Chart",
      description:
        "One-page chart mapping all eight Fall titles to ages, grades, and reading levels.",
      audience: "Both",
      type: "guide",
    },
    {
      id: "shelf-talkers",
      title: "Fall Collection Shelf Talkers",
      description:
        "Printable shelf talkers for all eight titles — bookstore and library ready.",
      audience: "Librarians",
      type: "promo",
    },
    {
      id: "qr-card",
      title: "QR Landing Card",
      description:
        "Directs physical displays to The Next Chapter website via QR code.",
      audience: "Both",
      type: "promo",
      relatedToFallReadingWeek: true,
    },
    {
      id: "book-recs",
      title: "Curated Book Recommendation Lists",
      description:
        "Ready-to-share lists by age band, genre, and classroom theme.",
      audience: "Both",
      type: "guide",
    },
  ] satisfies HubResource[],
};
