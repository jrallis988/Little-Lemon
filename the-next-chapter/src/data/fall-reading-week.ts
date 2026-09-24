export interface DailyActivity {
  day: string;
  date: string;
  theme: string;
  activity: string;
  bookSlug?: string;
}

export interface ParticipatingLocation {
  name: string;
  type: "School" | "Library" | "Bookstore";
  city: string;
  state: string;
}

export const fallReadingWeek = {
  title: "Fall Reading Week",
  campaign: "The Next Chapter",
  dates: "October 12–18, 2026",
  dateRange: { start: "2026-10-12", end: "2026-10-18" },
  overview:
    "Fall Reading Week is Harborlight Press's annual celebration connecting schools, libraries, independent bookstores, and families around a shared week of reading. Each day centers on a theme drawn from our Fall 2026 collection — with classroom activities, library programming, and in-store events designed to help every young reader find their next story.",
  goals: [
    "Invite every child to discover at least one new book",
    "Equip educators and librarians with ready-to-use activities",
    "Connect independent bookstores with local school communities",
    "Drive families from print materials into digital discovery",
  ],
  dailyActivities: [
    {
      day: "Monday",
      date: "October 12",
      theme: "Map Your Story",
      activity:
        "Students create personal 'life maps' marking places that shaped them — then share one story aloud.",
      bookSlug: "the-mapmakers-compass",
    },
    {
      day: "Tuesday",
      date: "October 13",
      theme: "Mystery Hour",
      activity:
        "Libraries host a lantern-lit observation challenge. Readers collect clues and solve a community puzzle.",
      bookSlug: "midnight-at-maple-hollow",
    },
    {
      day: "Wednesday",
      date: "October 14",
      theme: "Memory & Light",
      activity:
        "Classrooms write 'memory lantern' poems — moments they would preserve in light if they could.",
      bookSlug: "the-last-lantern-keeper",
    },
    {
      day: "Thursday",
      date: "October 15",
      theme: "Lunch Table Stories",
      activity:
        "Bookstores invite families for storytime and a 'favorite lunch' show-and-tell inspired by Operation: Lunch Box.",
      bookSlug: "operation-lunch-box",
    },
    {
      day: "Friday",
      date: "October 16",
      theme: "Belonging Day",
      activity:
        "Schools designate Quiet Belonging Spaces — Room 12B-inspired corners for reading without pressure.",
      bookSlug: "the-secret-club-of-room-12b",
    },
    {
      day: "Saturday",
      date: "October 17",
      theme: "STEM & Stars",
      activity:
        "Family science nights pair coding demos with constellation storytelling under the open sky.",
      bookSlug: "code-and-constellations",
    },
    {
      day: "Sunday",
      date: "October 18",
      theme: "Letters Forward",
      activity:
        "Community letter-writing: kids write letters to future readers and leave them in library display boxes.",
      bookSlug: "letters-from-willow-creek",
    },
  ] satisfies DailyActivity[],
  classroomResources: [
    {
      title: "Fall Reading Week Classroom Kit",
      description:
        "Daily lesson outlines, discussion prompts, and printable bookmarks for grades 2–8.",
      type: "guide" as const,
    },
    {
      title: "Read-Aloud Scripts",
      description:
        "Five-minute read-aloud selections from featured Fall titles with pacing notes for teachers.",
      type: "activity" as const,
    },
    {
      title: "Cross-Curricular Connections",
      description:
        "Links from each daily theme to literacy, social studies, science, and SEL standards.",
      type: "worksheet" as const,
    },
  ],
  libraryResources: [
    {
      title: "Display Kit & Shelf Talkers",
      description:
        "Printable shelf talkers, table tents, and a Fall Reading Week window poster.",
      type: "guide" as const,
    },
    {
      title: "Program-in-a-Box",
      description:
        "Ready library program outlines for ages 7–9, 9–12, and 12–14 with timing and materials lists.",
      type: "activity" as const,
    },
    {
      title: "QR Landing Card",
      description:
        "A printable card linking physical displays to this page — designed for shelf ends and foyer tables.",
      type: "guide" as const,
    },
  ],
  readingGuide: {
    title: "Fall Reading Week Family Guide",
    description:
      "A seven-day reading calendar for home use, with short daily prompts and featured book spotlights.",
  },
  locations: [
    { name: "Harbor Elementary", type: "School", city: "Portland", state: "ME" },
    { name: "Maple Hollow Public Library", type: "Library", city: "Burlington", state: "VT" },
    { name: "Chapter & Verse Books", type: "Bookstore", city: "Concord", state: "NH" },
    { name: "Oakwood Middle School", type: "School", city: "Chicago", state: "IL" },
    { name: "Riverbend Books", type: "Bookstore", city: "Atlanta", state: "GA" },
    { name: "Luminara Branch Library", type: "Library", city: "Seattle", state: "WA" },
    { name: "Willow Creek Independent", type: "Bookstore", city: "Montpelier", state: "VT" },
    { name: "Summit Academy", type: "School", city: "Denver", state: "CO" },
  ] satisfies ParticipatingLocation[],
};
