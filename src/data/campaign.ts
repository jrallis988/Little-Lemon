export const campaign = {
  name: "Weight Watchers 63",
  tagline: "63 Years of You",
  thesis:
    "63 years matter because your needs come first—and because Weight Watchers keeps building the next chapter of healthier living with you.",
  foundingYear: 1963,
  anniversaryYears: 63,
} as const;

/** The strategic spine of the campaign: customer priorities + future direction */
export const campaignPurpose = {
  headline: "An anniversary is only useful if it serves people.",
  lead:
    "Weight Watchers 63 is not a birthday party. It is proof that when customer needs change, the brand must change—and a clear look at where that responsibility points next.",
  customerTitle: "Your priorities come first",
  customerCopy:
    "Real life is busy, uneven, and personal. Support has to fit food, movement, mindset, community, and—when appropriate—modern medical care around the life you already live.",
  futureTitle: "Where Weight Watchers goes next",
  futureCopy:
    "The next chapter is more personal, more connected, and more human: smarter tools, stronger coaching, and clinical companionship that still puts people—not products—at the center.",
  futureBeats: [
    "Personalization that respects real kitchens and real weeks",
    "Coaching and community that travel with you across screens and rooms",
    "Connected insights that reduce friction instead of adding noise",
    "Educational pathways into clinician-supported care when that is the right fit",
  ],
} as const;

export const campaignPriorities = [
  {
    title: "Food that fits real life",
    copy: "Flexible structure for grocery runs, leftovers, celebrations, and Tuesday nights—not perfection.",
  },
  {
    title: "Progress you can feel",
    copy: "Energy, confidence, strength, and consistency matter as much as the number on a scale.",
  },
  {
    title: "Support that shows up",
    copy: "Coaches, community, and tools that meet you between the good weeks and the hard ones.",
  },
  {
    title: "Care that evolves with you",
    copy: "From Points to personalization to clinician-supported options—always in service of your next step.",
  },
] as const;

export type HeroSlide = {
  src: string;
  alt: string;
  objectPosition: string;
};

/** Health-forward hero carousel — cooking, food, movement, everyday living */
export const heroSlides: HeroSlide[] = [
  {
    src: "/images/campaign/hero-cook.jpg",
    alt: "Friends cooking a fresh, colorful salad together in a bright home kitchen",
    objectPosition: "center 42%",
  },
  {
    src: "/images/campaign/hero-salad.jpg",
    alt: "A vibrant bowl of greens, egg, avocado, and fresh vegetables",
    objectPosition: "center center",
  },
  {
    src: "/images/campaign/hero-yoga.jpg",
    alt: "Members moving together in a bright studio fitness class",
    objectPosition: "center 30%",
  },
  {
    src: "/images/campaign/grocery.jpg",
    alt: "Shelves of fresh produce at the market—everyday healthy choices",
    objectPosition: "center center",
  },
  {
    src: "/images/campaign/hero-smoothie.jpg",
    alt: "Layered salad jar being finished with seeds—meal prep made inviting",
    objectPosition: "center 35%",
  },
  {
    src: "/images/campaign/walk-together.jpg",
    alt: "Taking the next step—everyday movement on outdoor stairs",
    objectPosition: "center 40%",
  },
];

export type Era = {
  id: string;
  decade: string;
  years: string;
  title: string;
  program: string;
  culture: string;
  tech: string;
  science: string;
  milestone: string;
  image: string;
  imageAlt: string;
  visualTone: string;
  thenTools: string;
  nowTools: string;
};

export const eras: Era[] = [
  {
    id: "1960s",
    decade: "1960s",
    years: "1961–1969",
    title: "A living room becomes a movement",
    program: "Peer support circles replace fad diets with honesty and accountability.",
    culture: "Housewives and neighbors gather weekly—community is the product.",
    tech: "Word of mouth, rented lofts, handwritten notes.",
    science: "Clinic-informed food talk translated into everyday language.",
    milestone: "1963 incorporation; 400 people line up for the first public meeting.",
    image: "/images/archive/living-room.jpg",
    imageAlt: "A warm living-room setting that evokes the first peer-support gatherings",
    visualTone: "Warm editorial photography with print-inspired quietness",
    thenTools: "Handwritten notes, living-room circles, word of mouth",
    nowTools: "Hybrid workshops, app coaching, and connected community",
  },
  {
    id: "1970s",
    decade: "1970s",
    years: "1970–1979",
    title: "From circle to household name",
    program: "Structured meetings scale nationwide with shared encouragement.",
    culture: "Weight health enters mainstream American conversation.",
    tech: "Cookbooks, packaged foods, and printed guides enter kitchens.",
    science: "Guidelines refine as medical consensus on nutrition evolves.",
    milestone: "1978 Heinz acquisition expands global reach while Jean remains the face.",
    image: "/images/archive/cookbook.jpg",
    imageAlt: "A kitchen cookbook and guides from Weight Watchers' household era",
    visualTone: "Earthy lifestyle imagery and kitchen staples",
    thenTools: "Cookbooks, packaged foods, printed meeting guides",
    nowTools: "Digital recipes, Points tracking, and personalized meal ideas",
  },
  {
    id: "1980s",
    decade: "1980s",
    years: "1980–1989",
    title: "Science softens restriction",
    program: "Plans move away from rigid bans toward livable structure.",
    culture: "Fitness culture rises; wellness becomes aspirational.",
    tech: "Paper journals and Points books become daily companions.",
    science: "Behavioral coaching joins nutrition as a core pillar.",
    milestone: "Program updates mirror evolving medical nutrition guidance.",
    image: "/images/campaign/journal.jpg",
    imageAlt: "A paper journal used for daily food and habit tracking",
    visualTone: "Bright fitness-culture influence used subtly",
    thenTools: "Paper journals and livable structure",
    nowTools: "Behavioral coaching, activity tracking, and flexible plans",
  },
  {
    id: "1990s",
    decade: "1990s",
    years: "1990–1999",
    title: "The Points revolution",
    program: "Flexible Points systems replace strict calorie counting.",
    culture: "Busy dual-income households need tracking that fits real life.",
    tech: "Printed trackers, desktop tools, and meeting kits.",
    science: "Fiber, fat, and calories inform smarter scoring.",
    milestone: "1-2-3 Success and Winning Points reshape daily habits.",
    image: "/images/campaign/journal.jpg",
    imageAlt: "Printed Points-era tracking materials for busy households",
    visualTone: "Cleaner consumer editorial styling",
    thenTools: "Points books, printed trackers, meeting kits",
    nowTools: "Mobile Points, AI food insights, and coaching in your pocket",
  },
  {
    id: "2000s",
    decade: "2000s",
    years: "2000–2009",
    title: "Digital doors open",
    program: "Online tools extend coaching beyond the meeting room.",
    culture: "Internet communities multiply support between workshops.",
    tech: "Desktop website, early mobile experiments, searchable recipes.",
    science: "Personalized plans begin to reflect individual preferences.",
    milestone: "Hybrid membership—rooms plus screens—becomes normal.",
    image: "/images/campaign/family-cook.jpg",
    imageAlt: "A bright kitchen with fresh ingredients for everyday healthy cooking",
    visualTone: "Early digital cues beside real kitchens",
    thenTools: "Desktop website, searchable recipes, early online communities",
    nowTools: "App-first tracking with rooms and screens working together",
  },
  {
    id: "2010s",
    decade: "2010s",
    years: "2010–2019",
    title: "App-era wellness",
    program: "Points live in your pocket with 24/7 coaching access.",
    culture: "Holistic wellness expands beyond the scale.",
    tech: "Mobile apps, wearables, virtual workshops.",
    science: "Activity, sleep, and habit loops join food tracking.",
    milestone: "WW rebrand signals a broader health mission.",
    image: "/images/campaign/phone.jpg",
    imageAlt: "A smartwatch in everyday use for activity and wellness insights",
    visualTone: "Mobile-first visual language",
    thenTools: "Mobile apps, wearables, virtual workshops",
    nowTools: "Connected devices, personalization, and clinical companionship",
  },
  {
    id: "2020s",
    decade: "2020s",
    years: "2020–today",
    title: "Clinical + human care",
    program: "Core, coaching, and Med+ unite behavioral and clinical support.",
    culture: "GLP-1 era demands empathy, muscle preservation, and community.",
    tech: "AI insights, body composition tools, connected devices.",
    science: "Evidence-based GLP-1 companionship plus decades of behavior change.",
    milestone: "Integrated platform for the next generation of weight health.",
    image: "/images/campaign/science.jpg",
    imageAlt: "A friendly clinician outdoors representing human-centered health support",
    visualTone: "Clean, modern health and wellness experience",
    thenTools: "Core program, coaching, and emerging clinical support",
    nowTools: "Personalized wellness platform with GLP-1 companionship when appropriate",
  },
];

export type Story = {
  id: string;
  name: string;
  ageRange: string;
  place: string;
  quote: string;
  moment: string;
  image: string;
  tone: "warm" | "quiet" | "bright";
  decade: string;
  category: string;
  lifeStage: string;
  goal: string;
};

export const stories: Story[] = [
  {
    id: "maya",
    name: "Maya",
    ageRange: "30s",
    place: "Chicago",
    quote: "I didn’t need another diet. I needed a Tuesday night where progress still counted.",
    moment: "Cooks with her kids after work, tracks Points between soccer practice.",
    image: "/images/campaign/portrait-a.jpg",
    tone: "warm",
    decade: "2010s",
    category: "Family life",
    lifeStage: "Parenting",
    goal: "Consistency",
  },
  {
    id: "james",
    name: "James",
    ageRange: "50s",
    place: "Phoenix",
    quote: "The meetings taught me that showing up is the habit that unlocks every other habit.",
    moment: "Morning walks with neighbors; celebrates non-scale wins with his coach.",
    image: "/images/campaign/portrait-b.jpg",
    tone: "quiet",
    decade: "2000s",
    category: "Community",
    lifeStage: "Midlife",
    goal: "Accountability",
  },
  {
    id: "aisha",
    name: "Aisha",
    ageRange: "20s",
    place: "Brooklyn",
    quote: "My journey doesn’t look like my mom’s—and Weight Watchers made room for that.",
    moment: "Grocery runs, dance classes, and a phone full of community chats.",
    image: "/images/campaign/portrait-c.jpg",
    tone: "bright",
    decade: "2020s",
    category: "Digital native",
    lifeStage: "Early career",
    goal: "Flexibility",
  },
  {
    id: "helen",
    name: "Helen",
    ageRange: "70s",
    place: "Queens",
    quote: "I started in a living room in the sixties. I’m still beginning again—on purpose.",
    moment: "Virtual workshops from her apartment; still writes notes by hand.",
    image: "/images/campaign/portrait-d.jpg",
    tone: "quiet",
    decade: "1960s",
    category: "Legacy member",
    lifeStage: "Retirement",
    goal: "Longevity",
  },
];

export const sciencePillars = [
  {
    title: "Nutrition that lives with you",
    copy: "From clinic talks to Points®—structure that learns as science does.",
    image: "/images/campaign/hero-fresh.jpg",
    imageAlt: "Fresh breakfast ingredients arranged for everyday balanced eating",
  },
  {
    title: "Behavioral coaching",
    copy: "Habits, accountability, and kindness as measurable tools.",
    image: "/images/campaign/coaching.jpg",
    imageAlt: "A coach guiding a member through a movement session",
  },
  {
    title: "Movement & recovery",
    copy: "Activity, sleep, and strength woven into everyday progress.",
    image: "/images/campaign/yoga-class.jpg",
    imageAlt: "Members practicing movement together in a bright studio",
  },
  {
    title: "Personalized programs",
    copy: "Modes and plans that flex with seasons of life.",
    image: "/images/campaign/nutrition-plate.jpg",
    imageAlt: "A thoughtfully plated balanced meal on a wooden table",
  },
  {
    title: "Modern medical support",
    copy: "GLP-1 care when appropriate—paired with community, not isolation. Educational framing only; clinical decisions belong with licensed clinicians.",
    image: "/images/campaign/science.jpg",
    imageAlt: "A friendly clinician representing human-centered health support",
  },
];

export const innovationBeats = [
  {
    then: "Paper journals",
    now: "Mobile tracking",
    detail: "The same daily honesty—now in your pocket.",
    thenImage: "/images/campaign/journal.jpg",
    nowImage: "/images/campaign/phone.jpg",
    thenAlt: "A paper journal for daily food tracking",
    nowAlt: "A smartwatch used naturally for everyday wellness insights",
  },
  {
    then: "Printed Points books",
    now: "AI food insights",
    detail: "Guidance that once lived on a shelf now meets you at mealtime.",
    thenImage: "/images/archive/cookbook.jpg",
    nowImage: "/images/food.jpg",
    thenAlt: "Printed cookbooks and guides on a kitchen shelf",
    nowAlt: "Colorful balanced plates ready for a shared meal",
  },
  {
    then: "In-person meetings only",
    now: "Hybrid community",
    detail: "Living rooms became lofts became workshops became screens—still human.",
    thenImage: "/images/archive/living-room.jpg",
    nowImage: "/images/campaign/coaching.jpg",
    thenAlt: "A living-room setting recalling early peer meetings",
    nowAlt: "One-on-one coaching support during an active wellness session",
  },
];

export const innovationArc = [
  { label: "Paper tracker", image: "/images/campaign/journal.jpg", era: "1960s–80s" },
  { label: "Points booklet", image: "/images/archive/cookbook.jpg", era: "1990s" },
  { label: "Desktop website", image: "/images/campaign/family-cook.jpg", era: "2000s" },
  { label: "Mobile application", image: "/images/campaign/phone.jpg", era: "2010s" },
  { label: "Connected devices", image: "/images/campaign/future.jpg", era: "2020s" },
  { label: "Personalized platform", image: "/images/campaign/science.jpg", era: "Today" },
];

export const programPathways = [
  {
    id: "nutrition",
    title: "Nutrition + Lifestyle",
    summary: "Food tracking, Points, meal planning, recipes, and activity that fit real weeks.",
    points: ["Food tracking & Points", "Meal planning", "Recipes for real kitchens", "Everyday activity"],
    image: "/images/campaign/hero-market.jpg",
    imageAlt: "A colorful produce market stall filled with fresh vegetables and fruit",
  },
  {
    id: "coaching",
    title: "Coaching + Community",
    summary: "Coaches, groups, accountability, and member stories that make progress feel shared.",
    points: ["Coach-led workshops", "Digital circles", "Accountability without shame", "Member stories"],
    image: "/images/campaign/meeting.jpg",
    imageAlt: "Two hikers walking together toward a mountain ridge",
  },
  {
    id: "medical",
    title: "Medical Support",
    summary: "Modern weight-management options and clinician-supported services where appropriate—always educational, never a substitute for medical advice.",
    points: ["Clinician-supported pathways", "GLP-1 companionship framing", "Muscle-preserving movement", "Community beside care"],
    image: "/images/campaign/science.jpg",
    imageAlt: "A warm, approachable clinician representing supportive health guidance",
  },
  {
    id: "digital",
    title: "Digital Tools",
    summary: "App experiences, personalization, connected devices, and progress insights.",
    points: ["Mobile app", "Personalization", "Connected devices", "Progress insights"],
    image: "/images/campaign/phone.jpg",
    imageAlt: "Everyday wearable technology supporting wellness habits",
  },
];

export const researchTopics = [
  {
    title: "Nutrition",
    copy: "How food frameworks evolve as evidence evolves—without turning dinner into a test.",
    image: "/images/campaign/hero-fresh.jpg",
    imageAlt: "Fresh ingredients prepared for balanced everyday meals",
  },
  {
    title: "Behavior change",
    copy: "Habits, cues, and accountability designed for imperfect human weeks.",
    image: "/images/campaign/coaching.jpg",
    imageAlt: "Coaching support during a focused wellness session",
  },
  {
    title: "Movement",
    copy: "Activity as a companion to nutrition—not a punishment for eating.",
    image: "/images/campaign/yoga-class.jpg",
    imageAlt: "A group movement class practicing together",
  },
  {
    title: "Sleep & recovery",
    copy: "Rest as part of progress, not an afterthought.",
    image: "/images/campaign/walk-together.jpg",
    imageAlt: "Everyday steps as a form of sustainable movement",
  },
  {
    title: "Coaching",
    copy: "Human guidance that translates science into Tuesday-night decisions.",
    image: "/images/campaign/kitchen-cook.jpg",
    imageAlt: "A member cooking at home with fresh ingredients",
  },
  {
    title: "Personalized wellness",
    copy: "Programs that flex with life stage, culture, and preference.",
    image: "/images/campaign/nutrition-plate.jpg",
    imageAlt: "A composed plate showing balanced food choices",
  },
  {
    title: "Modern medical support",
    copy: "Educational context for clinician-supported care, including GLP-1 conversations—kept separate from lifestyle guidance and never presented as medical advice.",
    image: "/images/campaign/science.jpg",
    imageAlt: "Human-centered clinical support without procedure imagery",
  },
];

export type YearSnapshot = {
  yearStart: number;
  yearEnd: number;
  eraId: string;
  look: string;
  trends: string[];
  evolved: string;
};

export const yearSnapshots: YearSnapshot[] = [
  {
    yearStart: 1961,
    yearEnd: 1969,
    eraId: "1960s",
    look: "Living-room circles, rented lofts, handwritten accountability.",
    trends: ["Peer support over fad diets", "Neighborhood meetings", "Clinic-informed food talk"],
    evolved: "Since then, Weight Watchers scaled honesty into a global habit system—without losing the circle.",
  },
  {
    yearStart: 1970,
    yearEnd: 1979,
    eraId: "1970s",
    look: "Packaged foods, cookbooks, and a brand entering every kitchen.",
    trends: ["Mainstream weight health", "Household staples", "National meeting culture"],
    evolved: "Distribution grew; the promise stayed human—someone in your corner.",
  },
  {
    yearStart: 1980,
    yearEnd: 1989,
    eraId: "1980s",
    look: "Paper journals and livable structure as fitness culture rose.",
    trends: ["Aerobics boom", "Behavioral coaching", "Less restriction, more rhythm"],
    evolved: "Science softened the edges; coaching became as important as counting.",
  },
  {
    yearStart: 1990,
    yearEnd: 1999,
    eraId: "1990s",
    look: "Points books and flexible formulas for busy real life.",
    trends: ["Dual-income households", "Smart tracking metrics", "Meeting kits"],
    evolved: "Points made progress portable—and personal.",
  },
  {
    yearStart: 2000,
    yearEnd: 2009,
    eraId: "2000s",
    look: "Desktop tools and early online communities beside workshops.",
    trends: ["Internet support groups", "Searchable recipes", "Hybrid membership"],
    evolved: "Screens joined rooms; the coach’s voice traveled farther.",
  },
  {
    yearStart: 2010,
    yearEnd: 2019,
    eraId: "2010s",
    look: "Apps, wearables, and wellness beyond the scale.",
    trends: ["Smartphone habits", "Virtual workshops", "Holistic wellness"],
    evolved: "Your pocket became a meeting place—still powered by people.",
  },
  {
    yearStart: 2020,
    yearEnd: 2026,
    eraId: "2020s",
    look: "Clinical care, AI insights, and community for the GLP-1 era.",
    trends: ["GLP-1 therapies", "Muscle-preserving movement", "Connected devices"],
    evolved: "Medication arrived; Weight Watchers answered with science and belonging.",
  },
];

export function snapshotForYear(year: number): YearSnapshot {
  const match = yearSnapshots.find((s) => year >= s.yearStart && year <= s.yearEnd);
  return match ?? yearSnapshots[yearSnapshots.length - 1];
}

export function eraForYear(year: number) {
  const snapshot = snapshotForYear(year);
  return eras.find((era) => era.id === snapshot.eraId) ?? eras[eras.length - 1];
}

export const CAMPAIGN_PRESENT_YEAR = 2026;

export function yearsAlongside(year: number, presentYear = CAMPAIGN_PRESENT_YEAR) {
  return Math.max(0, presentYear - year);
}

export const storyDecadeFilters = [
  "All",
  "1960s",
  "1970s",
  "1980s",
  "1990s",
  "2000s",
  "2010s",
  "Today",
] as const;
