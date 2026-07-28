export const campaign = {
  name: "Weight Watchers 63",
  tagline: "63 Years of You",
  thesis:
    "For 63 years, Weight Watchers has evolved alongside the people it serves—helping every generation build healthier lives in their own way.",
  foundingYear: 1963,
  anniversaryYears: 63,
} as const;

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
  },
];

export const sciencePillars = [
  {
    title: "Nutrition that lives with you",
    copy: "From clinic talks to Points®—structure that learns as science does.",
  },
  {
    title: "Behavioral coaching",
    copy: "Habits, accountability, and kindness as measurable tools.",
  },
  {
    title: "Movement & recovery",
    copy: "Activity, sleep, and strength woven into everyday progress.",
  },
  {
    title: "Personalized programs",
    copy: "Modes and plans that flex with seasons of life.",
  },
  {
    title: "Modern medical support",
    copy: "GLP-1 care when appropriate—paired with community, not isolation.",
  },
];

export const innovationBeats = [
  {
    then: "Paper journals",
    now: "Mobile tracking",
    detail: "The same daily honesty—now in your pocket.",
    thenImage: "/images/campaign/journal.jpg",
    nowImage: "/images/campaign/phone.jpg",
  },
  {
    then: "Printed Points books",
    now: "AI food insights",
    detail: "Guidance that once lived on a shelf now meets you at mealtime.",
    thenImage: "/images/archive/cookbook.jpg",
    nowImage: "/images/food.jpg",
  },
  {
    then: "In-person meetings only",
    now: "Hybrid community",
    detail: "Living rooms became lofts became workshops became screens—still human.",
    thenImage: "/images/archive/living-room.jpg",
    nowImage: "/images/campaign/meeting.jpg",
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

export const navChapters = [
  { href: "/#hero", label: "Start" },
  { href: "/#since-1963", label: "1963" },
  { href: "/#evolution", label: "Evolution" },
  { href: "/#years-of-you", label: "You" },
  { href: "/#community-63", label: "Community" },
  { href: "/#science", label: "Science" },
  { href: "/#innovation", label: "Innovation" },
  { href: "/#ahead", label: "Ahead" },
  { href: "/find-your-year", label: "Find Your Year" },
] as const;
