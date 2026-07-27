export type TimelineEra = {
  id: string;
  range: string;
  title: string;
  summary: string;
};

export type TimelineEvent = {
  id: string;
  year: string;
  eraId: string;
  title: string;
  body: string;
  tag: string;
};

export type ArchiveItem = {
  id: string;
  title: string;
  year: string;
  kind: string;
  description: string;
  image: string;
  alt: string;
};

export type PhilosophyLink = {
  id: string;
  origin: string;
  originDetail: string;
  modern: string;
  modernDetail: string;
};

export const campaignPillars = [
  {
    id: "reality",
    title: "Rooted in Reality",
    copy: "Honor Jean Nidetch’s community-first ethos over sterile corporate dieting.",
  },
  {
    id: "science",
    title: "Evolving Science",
    copy: "From 1960s medical guidelines to Points and clinical support—adaptability is the constant.",
  },
  {
    id: "tracking",
    title: "Frictionless Tracking",
    copy: "Keep touchpoints clean, tactile, and distraction-free so habits can stick.",
  },
] as const;

export const timelineEras: TimelineEra[] = [
  {
    id: "genesis",
    range: "1961–1963",
    title: "The Genesis & Founder",
    summary: "A Queens living room becomes the spark for peer-supported weight health.",
  },
  {
    id: "expansion",
    range: "Late 1960s–1970s",
    title: "Expansion & Global Scaling",
    summary: "From packed meetings to packaged goods, public markets, and global reach.",
  },
  {
    id: "plan",
    range: "1980s–2000s",
    title: "The Evolution of the Plan",
    summary: "Science-led refinement replaces rigid restriction with flexible Points systems.",
  },
  {
    id: "modern",
    range: "Digital era–today",
    title: "Modern Digital to Present",
    summary: "Hybrid care: apps, virtual workshops, coaching, and clinical support.",
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: "1961",
    year: "1961",
    eraId: "genesis",
    title: "The Living Room Spark",
    tag: "Origin",
    body: "Jean Nidetch, a Queens housewife, struggles with restrictive fad diets and attends a New York City Board of Health obesity clinic. Recognizing the power of shared struggle, she invites friends to her apartment to talk honestly about food—forming the first peer-support circle.",
  },
  {
    id: "1962",
    year: "1962",
    eraId: "genesis",
    title: "The Movement Grows",
    tag: "Community",
    body: "Word spreads quickly. Over 40 people pack into Jean’s living room every week, proving that human connection and accountability are missing from traditional weight loss.",
  },
  {
    id: "1963",
    year: "May 1963",
    eraId: "genesis",
    title: "Official Incorporation",
    tag: "Founding",
    body: "Partnering with Al and Felice Lippert, Jean officially incorporates the company. The first public meeting is held in a rented loft above a Queens movie theater, drawing a line of over 400 eager participants.",
  },
  {
    id: "1965",
    year: "1965",
    eraId: "expansion",
    title: "Consumer Packaged Goods",
    tag: "Products",
    body: "The brand expands beyond meetings, introducing low-calorie frozen items, dairy products, and the landmark Weight Watchers Cookbook—turning dietary guidance into household staples.",
  },
  {
    id: "1968",
    year: "1968",
    eraId: "expansion",
    title: "Going Public",
    tag: "Enterprise",
    body: "The company launches its initial public stock offering, transforming a grassroots community group into a major enterprise.",
  },
  {
    id: "1978",
    year: "1978",
    eraId: "expansion",
    title: "The Heinz Acquisition",
    tag: "Scale",
    body: "H.J. Heinz Company acquires Weight Watchers, providing massive international distribution and operational infrastructure while retaining Jean as its foundational face and ambassador.",
  },
  {
    id: "science",
    year: "1980s–90s",
    eraId: "plan",
    title: "Science-Led Refinement",
    tag: "Nutrition",
    body: "The program continually updates its nutritional guidelines to mirror evolving medical consensus, shifting away from rigid restriction toward sustainable structure.",
  },
  {
    id: "points",
    year: "1990s–2000s",
    eraId: "plan",
    title: "The Points Revolution",
    tag: "Tracking",
    body: "Flexible structural formulas such as 1-2-3 Success and Winning Points replace strict calorie counting with a smart tracking metric that accounts for fiber, fat, and calories.",
  },
  {
    id: "digital",
    year: "2010s",
    eraId: "modern",
    title: "Digital Transformation",
    tag: "Platform",
    body: "Physical-only meeting rooms evolve into a hybrid ecosystem featuring mobile app tracking, virtual community workshops, and 24/7 coaching.",
  },
  {
    id: "today",
    year: "Today",
    eraId: "modern",
    title: "WW Rebrand & Clinical Tier",
    tag: "Clinical",
    body: "The mission broadens to holistic health and wellness, incorporating modern clinical science support alongside Core and Premium frameworks.",
  },
];

export const archiveItems: ArchiveItem[] = [
  {
    id: "stub-1963",
    title: "First Public Meeting Ticket",
    year: "1963",
    kind: "Ephemera",
    description: "A queue of 400 forms outside a loft above a Queens theater—proof the living room had outgrown itself.",
    image: "/images/archive/meeting.jpg",
    alt: "People gathered together in a warm group setting",
  },
  {
    id: "cookbook",
    title: "Weight Watchers Cookbook",
    year: "1965",
    kind: "Publication",
    description: "Guidance leaves the meeting room and lands on kitchen counters across America.",
    image: "/images/archive/cookbook.jpg",
    alt: "Open cookbook with ingredients nearby",
  },
  {
    id: "living-room",
    title: "Living Room Circle",
    year: "1961",
    kind: "Photograph",
    description: "Honest talk about food in Jean Nidetch’s apartment—the original habit loop.",
    image: "/images/archive/living-room.jpg",
    alt: "Warm living room interior with soft seating",
  },
  {
    id: "market",
    title: "Household Staples Era",
    year: "1965–70s",
    kind: "Catalog",
    description: "Frozen items and dairy products extend the program into everyday shopping rituals.",
    image: "/images/archive/market.jpg",
    alt: "Fresh produce at a market stall",
  },
  {
    id: "app",
    title: "Mobile Tracking Shift",
    year: "2010s",
    kind: "Interface",
    description: "Workshops go virtual; Points become pocket-sized without losing the human thread.",
    image: "/images/archive/digital.jpg",
    alt: "Person using a smartphone for digital tracking",
  },
  {
    id: "clinic",
    title: "Clinical Support Layer",
    year: "Today",
    kind: "Milestone",
    description: "Behavioral science meets modern clinical care—still grounded in community.",
    image: "/images/archive/clinical.jpg",
    alt: "Clinical setting with a stethoscope and care notes",
  },
];

export const philosophyLinks: PhilosophyLink[] = [
  {
    id: "honesty",
    origin: "Honest living-room talk",
    originDetail: "Friends naming cravings without shame.",
    modern: "Coach-led digital circles",
    modernDetail: "Virtual rooms where progress counts on messy weeks.",
  },
  {
    id: "accountability",
    origin: "Weekly show-up ritual",
    originDetail: "A packed apartment that made consistency social.",
    modern: "Modes & habit loops",
    modernDetail: "Structure that flexes with vacations, deadlines, and recovery.",
  },
  {
    id: "guidance",
    origin: "Clinic-informed food talk",
    originDetail: "Medical advice translated into everyday language.",
    modern: "Points + clinical tier",
    modernDetail: "Frictionless tracking paired with science-backed care when needed.",
  },
  {
    id: "scale",
    origin: "Word-of-mouth growth",
    originDetail: "One invitation becoming a movement of hundreds.",
    modern: "Hybrid platform reach",
    modernDetail: "App, workshops, and coaching available wherever members live.",
  },
];
