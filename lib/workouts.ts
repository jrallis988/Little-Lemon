export type WorkoutGuide = {
  id: string;
  title: string;
  collection: "PF+" | "Beginner" | "Strength" | "Cardio";
  minutes: number;
  level: "Beginner" | "Intermediate";
  summary: string;
  videoUrl: string;
  steps: Array<{ name: string; detail: string }>;
  equipment: string[];
};

export const WORKOUTS: WorkoutGuide[] = [
  {
    id: "beginner-lower",
    title: "Beginner Lower Body Strength",
    collection: "Beginner",
    minutes: 28,
    level: "Beginner",
    summary: "Squats, hinges, and calf work with machine alternatives.",
    videoUrl: "https://www.youtube.com/embed/U3HlEF_E9fo",
    steps: [
      { name: "Bodyweight squat", detail: "3×12 · control the descent" },
      { name: "Leg press", detail: "3×10 · full foot contact" },
      { name: "Romanian hinge", detail: "3×10 · soft knees" },
      { name: "Calf raise", detail: "3×15 · pause at top" },
    ],
    equipment: ["Leg press", "Cable", "Dumbbells"],
  },
  {
    id: "full-body-circuit",
    title: "30-Minute Full Body Circuit",
    collection: "PF+",
    minutes: 30,
    level: "Beginner",
    summary: "Club-friendly circuit matching the 30-Minute Express area.",
    videoUrl: "https://www.youtube.com/embed/ml6cT4AZdqI",
    steps: [
      { name: "Row", detail: "45s steady" },
      { name: "Chest press", detail: "12 reps" },
      { name: "Lat pulldown", detail: "12 reps" },
      { name: "Core plank", detail: "30s" },
    ],
    equipment: ["Selectorized machines", "Mat"],
  },
  {
    id: "cardio-starter",
    title: "Cardio Endurance Starter",
    collection: "Cardio",
    minutes: 25,
    level: "Beginner",
    summary: "Intervals on treadmill or bike with easy recovery.",
    videoUrl: "https://www.youtube.com/embed/gC_L9qAHVJ8",
    steps: [
      { name: "Warm-up", detail: "5 min easy" },
      { name: "Intervals", detail: "8×1 min work / 1 min easy" },
      { name: "Cool-down", detail: "4 min walk" },
    ],
    equipment: ["Treadmill", "Bike"],
  },
  {
    id: "upper-pump",
    title: "Upper Body Pump",
    collection: "Strength",
    minutes: 35,
    level: "Intermediate",
    summary: "Push/pull volume without freestyle chaos.",
    videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4",
    steps: [
      { name: "Chest press", detail: "4×10" },
      { name: "Seated row", detail: "4×10" },
      { name: "Shoulder press", detail: "3×12" },
      { name: "Face pull", detail: "3×15" },
    ],
    equipment: ["Chest press", "Row", "Cable"],
  },
];

export const EQUIPMENT_LIBRARY = [
  {
    id: "leg-press",
    name: "Leg Press",
    tip: "Feet mid-platform, knees track over toes, don’t lock out.",
    favoriteDefault: true,
  },
  {
    id: "chest-press",
    name: "Chest Press",
    tip: "Shoulder blades set, wrists stacked, full controlled range.",
    favoriteDefault: false,
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    tip: "Pull to upper chest, avoid leaning too far back.",
    favoriteDefault: true,
  },
  {
    id: "cable-row",
    name: "Seated Cable Row",
    tip: "Tall torso, squeeze mid-back, pause briefly.",
    favoriteDefault: false,
  },
];

export function getWorkout(id: string) {
  return WORKOUTS.find((item) => item.id === id) ?? null;
}

export function getEquipment(id: string) {
  return EQUIPMENT_LIBRARY.find((item) => item.id === id) ?? null;
}
