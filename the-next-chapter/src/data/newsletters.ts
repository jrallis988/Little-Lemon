export interface NewsletterModule {
  type:
    | "featured"
    | "new-books"
    | "author"
    | "editors-pick"
    | "activity"
    | "upcoming"
    | "fall-reading-week"
    | "cta";
  title: string;
  body: string;
  bookSlug?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface NewsletterIssue {
  slug: string;
  month: "September" | "October" | "November";
  year: 2026;
  theme: string;
  subject: string;
  preview: string;
  publishedAt: string;
  modules: NewsletterModule[];
}

export const newsletterIssues: NewsletterIssue[] = [
  {
    slug: "september-2026",
    month: "September",
    year: 2026,
    theme: "Back to School",
    subject: "Back to School — Fall Into Your Next Story",
    preview:
      "New releases for the first weeks of school, classroom picks, and how to start the season strong.",
    publishedAt: "September 2, 2026",
    modules: [
      {
        type: "featured",
        title: "Featured Release",
        body: "Operation: Lunch Box kicks off the season with humor, heart, and a fourth-grade lunch revolution. Perfect for back-to-school read-alouds.",
        bookSlug: "operation-lunch-box",
        ctaLabel: "Read More",
        ctaHref: "/books/operation-lunch-box",
      },
      {
        type: "new-books",
        title: "New This Month",
        body: "September brings The Mapmaker's Compass (Sept 16) and The Last Lantern Keeper (Sept 30) — adventure and fantasy to launch the fall list.",
        ctaLabel: "Browse Fall Books",
        ctaHref: "/books",
      },
      {
        type: "author",
        title: "Author Spotlight",
        body: "Meet Amara Okonkwo, whose floating city of Luminara asks what happens when memories are stored in light — and begin to go dark.",
        bookSlug: "the-last-lantern-keeper",
        ctaLabel: "Meet the Author",
        ctaHref: "/books/the-last-lantern-keeper",
      },
      {
        type: "editors-pick",
        title: "Editor's Recommendation",
        body: "For classrooms settling into routine: The Secret Club of Room 12B is a quiet, powerful story about belonging that pairs beautifully with advisory periods.",
        bookSlug: "the-secret-club-of-room-12b",
      },
      {
        type: "activity",
        title: "Reading Activity",
        body: "Try the Persuasive Letter Workshop from Operation: Lunch Box — students write petitions about a school issue they care about.",
        ctaLabel: "Educator Resources",
        ctaHref: "/educators",
      },
      {
        type: "upcoming",
        title: "Coming in October",
        body: "Midnight at Maple Hollow arrives October 7, and Fall Reading Week runs October 12–18. Mark your calendars.",
      },
      {
        type: "fall-reading-week",
        title: "Fall Reading Week Preview",
        body: "Schools, libraries, and bookstores: registration is open for Fall Reading Week. Download the Classroom Kit and QR landing cards now.",
        ctaLabel: "Learn More",
        ctaHref: "/fall-reading-week",
      },
      {
        type: "cta",
        title: "Find Their Next Book",
        body: "Not sure where to start? Our short recommendation quiz matches readers to Fall 2026 titles.",
        ctaLabel: "Start the Quiz",
        ctaHref: "/find-a-book",
      },
    ],
  },
  {
    slug: "october-2026",
    month: "October",
    year: 2026,
    theme: "Adventure & Mystery",
    subject: "Adventure & Mystery — Fall Reading Week Is Here",
    preview:
      "Lanterns, maps, and clues: this month's edition centers on adventure, mystery, and the week that brings communities together.",
    publishedAt: "October 1, 2026",
    modules: [
      {
        type: "featured",
        title: "Featured Release",
        body: "Midnight at Maple Hollow — a lantern-festival mystery where observation is the sharpest tool a twelve-year-old detective can carry.",
        bookSlug: "midnight-at-maple-hollow",
        ctaLabel: "Read More",
        ctaHref: "/books/midnight-at-maple-hollow",
      },
      {
        type: "fall-reading-week",
        title: "Fall Reading Week: October 12–18",
        body: "Seven days. Seven themes. One shared invitation to fall into your next story. Daily activities for classrooms, libraries, and bookstores are live.",
        ctaLabel: "View the Schedule",
        ctaHref: "/fall-reading-week",
      },
      {
        type: "new-books",
        title: "New This Month",
        body: "The Secret Club of Room 12B publishes October 21 — a contemporary story about the friendships that start when nobody else is looking.",
        bookSlug: "the-secret-club-of-room-12b",
        ctaLabel: "Browse Fall Books",
        ctaHref: "/books",
      },
      {
        type: "author",
        title: "Author Spotlight",
        body: "James Whitfield on foggy Vermont autumns, fair-play mysteries, and why the quietest kid in class often makes the best detective.",
        bookSlug: "midnight-at-maple-hollow",
      },
      {
        type: "editors-pick",
        title: "Editor's Recommendation",
        body: "Pair The Mapmaker's Compass with Midnight at Maple Hollow for an adventure-and-mystery reading path — maps by day, lanterns by night.",
        bookSlug: "the-mapmakers-compass",
      },
      {
        type: "activity",
        title: "Reading Activity",
        body: "Detective's Notebook: students practice observation and inference by documenting clues from a classroom scene.",
        ctaLabel: "Get the Activity",
        ctaHref: "/educators",
      },
      {
        type: "upcoming",
        title: "Coming in November",
        body: "STEM skies, wartime letters, and eighth-grade endings: Code & Constellations, Letters from Willow Creek, and Before the Bell Rings.",
      },
      {
        type: "cta",
        title: "Invite Your Community",
        body: "Download shelf talkers and QR cards to connect physical displays to The Next Chapter website.",
        ctaLabel: "Educator Hub",
        ctaHref: "/educators",
      },
    ],
  },
  {
    slug: "november-2026",
    month: "November",
    year: 2026,
    theme: "Cozy Fall Reading",
    subject: "Cozy Fall Reading — Stories for Shorter Days",
    preview:
      "As the season deepens, we turn toward STEM wonder, historical letters, and the honest endings of eighth grade.",
    publishedAt: "November 3, 2026",
    modules: [
      {
        type: "featured",
        title: "Featured Release",
        body: "Code & Constellations — rivals on a rooftop, a signal that shouldn't exist, and the discovery that science is a shared language.",
        bookSlug: "code-and-constellations",
        ctaLabel: "Read More",
        ctaHref: "/books/code-and-constellations",
      },
      {
        type: "new-books",
        title: "New This Month",
        body: "Letters from Willow Creek (Nov 11) and Before the Bell Rings (Nov 18) close the Fall 2026 list with history, heart, and honest transition.",
        ctaLabel: "Browse Fall Books",
        ctaHref: "/books",
      },
      {
        type: "author",
        title: "Author Spotlight",
        body: "Dr. Nina Park on coding, stargazing, and why the best STEM stories happen when different minds share the same rooftop.",
        bookSlug: "code-and-constellations",
      },
      {
        type: "editors-pick",
        title: "Editor's Recommendation",
        body: "For reflective November evenings: Letters from Willow Creek is a dual-timeline historical novel that makes the past feel close enough to write back to.",
        bookSlug: "letters-from-willow-creek",
      },
      {
        type: "activity",
        title: "Reading Activity",
        body: "Five Things Writing Prompt from Before the Bell Rings — students list what they want to say before a season ends.",
        ctaLabel: "Educator Resources",
        ctaHref: "/educators",
      },
      {
        type: "upcoming",
        title: "Looking Ahead",
        body: "Thank you for reading with us this fall. Winter announcements arrive in December — and The Next Chapter returns with a new season in 2027.",
      },
      {
        type: "cta",
        title: "Still Looking?",
        body: "Our recommendation quiz is always open — find three titles matched to age, reading level, interest, and tone.",
        ctaLabel: "Find Their Next Book",
        ctaHref: "/find-a-book",
      },
    ],
  },
];

export function getIssueBySlug(slug: string): NewsletterIssue | undefined {
  return newsletterIssues.find((issue) => issue.slug === slug);
}
