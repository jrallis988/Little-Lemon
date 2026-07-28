export const futureVision = {
  headline: "63 years taught us something.",
  subhead: "There is no single way to get healthy.",
  body:
    "Different bodies. Different lives. Different goals. Different generations. So the next Weight Watchers shouldn’t ask everyone to follow the same journey. It should build around yours.",
  cta: "Meet the next Weight Watchers",
  thesis:
    "63 years taught us something: there is no single way to get healthy. So we’re building the next Weight Watchers around you.",
} as const;

export type FlagshipProduct = {
  id: string;
  name: string;
  statement: string;
  explanation: string;
  image: string;
  imageAlt: string;
  highlights: string[];
};

export const flagshipProducts: FlagshipProduct[] = [
  {
    id: "ww-life",
    name: "WW Life",
    statement: "Your health is bigger than a number.",
    explanation:
      "A customizable personal wellness dashboard for nutrition, movement, recovery, habits, progress, and support—prioritized around what matters to you, not a single scale reading.",
    image: "/images/campaign/kitchen-cook.jpg",
    imageAlt: "Everyday cooking as part of a fuller wellness picture",
    highlights: ["Nutrition", "Movement", "Recovery", "Habits", "Progress", "Support"],
  },
  {
    id: "ww-pathways",
    name: "WW Pathways",
    statement: "Your journey changes. Your program should too.",
    explanation:
      "Choose a primary wellness pathway—Lose Weight, Maintain, Eat Better, Build Strength, GLP-1 Support, or Healthy Living—and change it as life changes.",
    image: "/images/campaign/meeting.jpg",
    imageAlt: "People moving forward together on an evolving wellness journey",
    highlights: [
      "Lose Weight",
      "Maintain Weight",
      "Eat Better",
      "Build Strength",
      "GLP-1 Support",
      "Healthy Living",
    ],
  },
  {
    id: "my-ww-team",
    name: "My WW Team",
    statement: "People supporting people—since 1963.",
    explanation:
      "Coach, dietitian, care team, community, and an opt-in circle organized around you. Human support, not disconnected product lines.",
    image: "/images/campaign/coaching.jpg",
    imageAlt: "Supportive coaching during an active wellness session",
    highlights: ["Coach", "Dietitian", "Care Team", "Community", "Your Circle"],
  },
  {
    id: "ww-kitchen",
    name: "WW Kitchen",
    statement: "Healthy eating starts in real life.",
    explanation:
      "Meal planning, cook-with-what-you-have ideas, smart grocery lists, optional budget awareness, and family mode—food support that fits the household you already have.",
    image: "/images/campaign/hero-market.jpg",
    imageAlt: "Fresh market produce for everyday meal planning",
    highlights: ["Weekly planner", "Cook with what you have", "Grocery list", "Family mode"],
  },
  {
    id: "life-after-glp1",
    name: "Life After GLP-1",
    statement: "Medication may be one chapter. Your health journey is longer.",
    explanation:
      "Reassuring, future-facing support for nutrition, protein, strength, habits, community, and maintenance—educational only, never a substitute for your clinician.",
    image: "/images/campaign/science.jpg",
    imageAlt: "Human-centered clinical support without procedure imagery",
    highlights: ["Nutrition", "Strength", "Habits", "Community", "Maintenance"],
  },
];

export type EcosystemConcept = {
  id: string;
  name: string;
  statement: string;
  copy: string;
};

export const ecosystemConcepts: EcosystemConcept[] = [
  {
    id: "ww-momentum",
    name: "WW Momentum",
    statement: "Progress isn’t one number.",
    copy: "Longer-term patterns across nutrition, movement, sleep, habits, and goals—motivational, not a medical score.",
  },
  {
    id: "ww-grocery",
    name: "WW Grocery",
    statement: "Decide in the aisle—without moralizing food.",
    copy: "Scan, compare, and choose products based on protein, fiber, and your Pathway—not good food / bad food labels.",
  },
  {
    id: "ww-table",
    name: "WW Table",
    statement: "Healthy living should fit your life—not replace it.",
    copy: "Plan restaurant meals, holidays, and social nights ahead while still living a normal life.",
  },
  {
    id: "strength-for-life",
    name: "Strength for Life",
    statement: "Build strength for the life you’re living.",
    copy: "Progressive resistance and mobility programs that treat movement as capability—not punishment.",
  },
  {
    id: "ww-generations",
    name: "WW Generations",
    statement: "Different generations. Different journeys. Still moving forward together.",
    copy: "Opt-in family connections for recipes, walks, and milestones—never private health data by default.",
  },
  {
    id: "ww-local",
    name: "WW Local",
    statement: "Community started Weight Watchers in 1963. Community still matters in 2026.",
    copy: "Find workshops, walking groups, cooking classes, coaches, and events near you—or online.",
  },
  {
    id: "ask-ww",
    name: "Ask WW",
    statement: "AI handles convenience. People handle care.",
    copy: "Everyday planning help for meals, groceries, and routines—clearly bounded away from diagnosis or medication decisions.",
  },
];

export const pathwayOptions = [
  {
    id: "lose",
    name: "Lose Weight",
    copy: "Sustainable weight-management support for steady, livable progress.",
  },
  {
    id: "maintain",
    name: "Maintain Weight",
    copy: "Long-term consistency after you’ve found a comfortable place.",
  },
  {
    id: "eat",
    name: "Eat Better",
    copy: "Nutrition-focused support without making weight the primary objective.",
  },
  {
    id: "strength",
    name: "Build Strength",
    copy: "Strength training, protein awareness, movement, and recovery.",
  },
  {
    id: "glp1",
    name: "GLP-1 Support",
    copy: "Nutrition, movement, coaching, and educational clinical companionship.",
  },
  {
    id: "living",
    name: "Healthy Living",
    copy: "General wellness without a specific weight-loss target.",
  },
] as const;

export const timelineToFuture = [
  { era: "1963", title: "Community", copy: "People supporting people in living rooms." },
  { era: "Then", title: "Nutrition & tracking", copy: "Education, Points, meetings, structure." },
  { era: "Digital", title: "Web & mobile", copy: "Connected tracking and personalization." },
  { era: "2026", title: "Modern care", copy: "Nutrition, coaching, community, medical support, GLP-1." },
  {
    era: "What’s next",
    title: "Built around you",
    copy: "WW Life, Pathways, Team, Kitchen, Momentum, and more—one connected ecosystem.",
  },
] as const;
