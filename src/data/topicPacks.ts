export type TopicPack = {
  id: string;
  title: string;
  gradeMin: number;
  gradeMax: number;
  subject: string;
  summary: string;
  searchPrompt: string;
  vocabulary: string[];
  essentialQuestions: string[];
  suggestedSources: string[];
};

/** Classroom-ready units teachers can assign day one */
export const TOPIC_PACKS: TopicPack[] = [
  {
    id: "pack-plate-tectonics",
    title: "Plate Tectonics",
    gradeMin: 5,
    gradeMax: 8,
    subject: "Earth Science",
    summary:
      "How Earth’s plates move, why earthquakes and volcanoes happen, and how scientists use evidence from the ocean floor.",
    searchPrompt: "Plate Tectonics",
    vocabulary: [
      "lithosphere",
      "mantle",
      "convergent boundary",
      "divergent boundary",
      "subduction",
    ],
    essentialQuestions: [
      "What evidence shows that Earth’s plates move?",
      "How do different plate boundaries build different landforms?",
    ],
    suggestedSources: [
      "usgs-plate-tectonics-intro",
      "natgeo-edu-plate-tectonics",
      "amnh-plate-tectonics",
      "britannica-plate-tectonics",
      "pbs-plate-tectonics",
    ],
  },
  {
    id: "pack-water-cycle",
    title: "The Water Cycle",
    gradeMin: 2,
    gradeMax: 5,
    subject: "Earth Science",
    summary:
      "Follow a drop of water through evaporation, condensation, precipitation, and runoff.",
    searchPrompt: "water cycle",
    vocabulary: [
      "evaporation",
      "condensation",
      "precipitation",
      "runoff",
      "groundwater",
    ],
    essentialQuestions: [
      "Where does rainwater go after it falls?",
      "How is the water cycle a closed system on Earth?",
    ],
    suggestedSources: [
      "usgs-water-cycle",
      "nasa-water-cycle-kids",
      "epa-water-sense-kids",
    ],
  },
  {
    id: "pack-weather",
    title: "Weather & Atmosphere",
    gradeMin: 1,
    gradeMax: 6,
    subject: "Earth Science",
    summary:
      "Observe weather patterns, learn forecast basics, and connect atmosphere science to daily life.",
    searchPrompt: "weather",
    vocabulary: ["forecast", "temperature", "atmosphere", "storm", "pressure"],
    essentialQuestions: [
      "What tools help scientists forecast weather?",
      "How is weather different from climate?",
    ],
    suggestedSources: [
      "natgeo-kids-weather",
      "noaa-weather",
      "pbs-learning-media-weather",
      "nws-weather-school",
    ],
  },
  {
    id: "pack-coral-reefs",
    title: "Coral Reef Ecosystems",
    gradeMin: 2,
    gradeMax: 6,
    subject: "Life Science",
    summary:
      "Meet reef builders, food webs, and the threats that put coral cities at risk.",
    searchPrompt: "coral reefs",
    vocabulary: ["polyp", "symbiosis", "biodiversity", "bleaching", "habitat"],
    essentialQuestions: [
      "Why are coral reefs called underwater cities?",
      "What human actions help or harm reefs?",
    ],
    suggestedSources: [
      "noaa-coral-reefs",
      "natgeo-kids-coral",
      "noaa-ocean-acidification",
    ],
  },
  {
    id: "pack-fractions",
    title: "Fractions",
    gradeMin: 3,
    gradeMax: 6,
    subject: "Math",
    summary:
      "Understand numerators and denominators, compare fractions, and practice with trusted classroom lessons.",
    searchPrompt: "fractions",
    vocabulary: [
      "numerator",
      "denominator",
      "equivalent",
      "mixed number",
      "simplify",
    ],
    essentialQuestions: [
      "How can the same amount look like different fractions?",
      "When do we need a common denominator?",
    ],
    suggestedSources: [
      "ck12-fractions",
      "khan-fractions",
      "illustrative-math-fractions",
    ],
  },
  {
    id: "pack-photosynthesis",
    title: "Photosynthesis",
    gradeMin: 3,
    gradeMax: 8,
    subject: "Life Science",
    summary:
      "How plants turn sunlight into food and why that process matters for every ecosystem.",
    searchPrompt: "photosynthesis",
    vocabulary: [
      "photosynthesis",
      "chlorophyll",
      "carbon dioxide",
      "oxygen",
      "chloroplast",
    ],
    essentialQuestions: [
      "What ingredients do plants need to make food?",
      "How does photosynthesis connect plants to animals?",
    ],
    suggestedSources: ["britannica-photosynthesis", "ck12-photosynthesis"],
  },
  {
    id: "pack-habitats",
    title: "Animal Habitats",
    gradeMin: 1,
    gradeMax: 5,
    subject: "Life Science",
    summary:
      "Explore deserts, forests, oceans, and the adaptations that help animals belong.",
    searchPrompt: "animal habitats",
    vocabulary: ["habitat", "adaptation", "species", "ecosystem"],
    essentialQuestions: [
      "What makes a place a good habitat for one animal but not another?",
      "How do animals adapt when habitats change?",
    ],
    suggestedSources: [
      "natgeo-kids-habitats",
      "si-ecosystems",
      "nps-ecosystems",
      "natgeo-kids-food-chain",
    ],
  },
  {
    id: "pack-civil-rights",
    title: "Civil Rights & Primary Sources",
    gradeMin: 5,
    gradeMax: 8,
    subject: "History",
    summary:
      "Use Library of Congress and National Park Service sources to study voices and events of the civil rights movement.",
    searchPrompt: "civil rights",
    vocabulary: [
      "primary source",
      "civil rights",
      "equality",
      "protest",
      "justice",
    ],
    essentialQuestions: [
      "What can a primary source tell us that a summary cannot?",
      "How did ordinary people help change unfair laws?",
    ],
    suggestedSources: [
      "loc-civil-rights",
      "nps-civil-rights",
      "loc-primary-sources",
      "loc-research-guides",
    ],
  },
  {
    id: "pack-solar-system",
    title: "Solar System",
    gradeMin: 1,
    gradeMax: 8,
    subject: "Space Science",
    summary:
      "Tour the Sun, planets, and moons with NASA resources matched from early elementary through middle school.",
    searchPrompt: "solar system",
    vocabulary: ["orbit", "planet", "gravity", "moon", "asteroid"],
    essentialQuestions: [
      "Why do planets stay in orbit around the Sun?",
      "How are inner planets different from outer planets?",
    ],
    suggestedSources: [
      "nasa-spaceplace-solar",
      "nasa-science-solar",
      "nasa-mars",
      "nasa-moon-phases",
    ],
  },
  {
    id: "pack-inventors",
    title: "Inventors & Ideas",
    gradeMin: 3,
    gradeMax: 8,
    subject: "Engineering / History",
    summary:
      "Study inventors, prototypes, and how new tools spread through society.",
    searchPrompt: "inventors",
    vocabulary: ["inventor", "innovation", "prototype", "patent"],
    essentialQuestions: [
      "What problem was an inventor trying to solve?",
      "How do we test whether an invention works?",
    ],
    suggestedSources: ["si-inventors", "si-simple-machines"],
  },
  {
    id: "pack-volcanoes",
    title: "Volcanoes & Earthquakes",
    gradeMin: 2,
    gradeMax: 8,
    subject: "Earth Science",
    summary:
      "Connect plate motion to eruptions and shaking, then practice hazard-aware reading from USGS and Nat Geo Kids.",
    searchPrompt: "volcanoes",
    vocabulary: ["magma", "lava", "fault", "magnitude", "eruption"],
    essentialQuestions: [
      "What happens underground before a volcano erupts?",
      "How do scientists know an earthquake is coming—or that one already happened?",
    ],
    suggestedSources: [
      "usgs-volcanoes",
      "usgs-earthquakes-kids",
      "natgeo-kids-volcanoes",
    ],
  },
  {
    id: "pack-rocks",
    title: "Rocks & the Rock Cycle",
    gradeMin: 3,
    gradeMax: 8,
    subject: "Earth Science",
    summary:
      "Identify igneous, sedimentary, and metamorphic rocks and follow materials through the rock cycle.",
    searchPrompt: "rock cycle",
    vocabulary: ["igneous", "sedimentary", "metamorphic", "weathering", "mineral"],
    essentialQuestions: [
      "How can the same material become three different rock types?",
      "What clues in a rock tell its story?",
    ],
    suggestedSources: ["usgs-rocks-minerals", "amnh-rock-cycle", "usgs-fossils"],
  },
  {
    id: "pack-forces",
    title: "Forces & Motion",
    gradeMin: 2,
    gradeMax: 7,
    subject: "Physical Science",
    summary:
      "Explore push, pull, gravity, and friction with NASA Space Place and simple-machine connections.",
    searchPrompt: "forces and motion",
    vocabulary: ["force", "gravity", "friction", "motion", "lever"],
    essentialQuestions: [
      "What forces are acting when you kick a ball?",
      "How do simple machines change the size of a force?",
    ],
    suggestedSources: [
      "nasa-force-motion",
      "si-simple-machines",
      "pbs-electricity",
    ],
  },
  {
    id: "pack-energy-climate",
    title: "Energy & Climate",
    gradeMin: 3,
    gradeMax: 8,
    subject: "Earth / Environmental Science",
    summary:
      "Compare energy sources and use NASA Climate Kids plus EPA explainers to reason about Earth’s systems.",
    searchPrompt: "climate",
    vocabulary: ["renewable", "fossil fuel", "greenhouse gas", "climate", "conservation"],
    essentialQuestions: [
      "How is weather different from climate?",
      "What energy choices reduce waste and protect ecosystems?",
    ],
    suggestedSources: [
      "nasa-climate-kids",
      "eia-energy-kids",
      "epa-recycle-kids",
    ],
  },
  {
    id: "pack-life-cycles",
    title: "Life Cycles & Food Chains",
    gradeMin: 1,
    gradeMax: 5,
    subject: "Life Science",
    summary:
      "Trace metamorphosis and food-chain links so younger students can explain how energy moves through living systems.",
    searchPrompt: "food chain",
    vocabulary: [
      "metamorphosis",
      "producer",
      "consumer",
      "decomposer",
      "predator",
    ],
    essentialQuestions: [
      "What would happen if one link in a food chain disappeared?",
      "How do life cycles help a species survive?",
    ],
    suggestedSources: [
      "natgeo-kids-food-chain",
      "natgeo-kids-life-cycle",
      "si-insect-zoo",
    ],
  },
  {
    id: "pack-civics",
    title: "Constitution & Government",
    gradeMin: 4,
    gradeMax: 8,
    subject: "Civics",
    summary:
      "Read trusted civics sources about the Constitution and the three branches of government.",
    searchPrompt: "U.S. Constitution",
    vocabulary: [
      "constitution",
      "amendment",
      "legislative",
      "executive",
      "judicial",
    ],
    essentialQuestions: [
      "Why does the Constitution separate powers into branches?",
      "What is an amendment, and why might people change a founding document?",
    ],
    suggestedSources: [
      "loc-constitution",
      "usa-gov-branches",
      "nps-american-revolution",
    ],
  },
  {
    id: "pack-dinosaurs",
    title: "Dinosaurs & Fossils",
    gradeMin: 1,
    gradeMax: 6,
    subject: "Earth / Life Science",
    summary:
      "Use museum and USGS sources to connect fossils to ancient environments and paleontology skills.",
    searchPrompt: "dinosaurs",
    vocabulary: ["fossil", "paleontology", "extinct", "sedimentary", "era"],
    essentialQuestions: [
      "What can a fossil tell us that a drawing cannot?",
      "Why do scientists find different fossils in different rock layers?",
    ],
    suggestedSources: ["amnh-dinosaurs", "usgs-fossils"],
  },
  {
    id: "pack-maps",
    title: "Maps & Geography",
    gradeMin: 2,
    gradeMax: 8,
    subject: "Geography",
    summary:
      "Build map skills with National Geographic Education and USGS topographic map explainers.",
    searchPrompt: "maps",
    vocabulary: ["legend", "scale", "contour", "latitude", "longitude"],
    essentialQuestions: [
      "How does a map’s scale change what you can learn?",
      "What story do contour lines tell about the land?",
    ],
    suggestedSources: ["natgeo-edu-maps", "usgs-topo-maps"],
  },
];

export function getTopicPack(id: string): TopicPack | undefined {
  return TOPIC_PACKS.find((pack) => pack.id === id);
}

export function topicPacksForGrade(grade: number): TopicPack[] {
  return TOPIC_PACKS.filter(
    (pack) => grade >= pack.gradeMin && grade <= pack.gradeMax,
  );
}
