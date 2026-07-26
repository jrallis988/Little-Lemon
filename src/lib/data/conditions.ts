export type Condition = {
  slug: string;
  name: string;
  specialty: string;
  specialtySlug: string;
  lead: string;
  lastUpdated: string;
  keyFacts: { label: string; value: string }[];
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  edCallout: { title: string; body: string };
  appointment: { blurb: string; phone: string };
  careTeam: { name: string; title: string; doctorSlug: string };
  resources: { label: string; href: string }[];
  trials: { label: string; href: string }[];
  relatedProgramSlug: string;
};

export const conditions: Condition[] = [
  {
    slug: "epilepsy-in-children",
    name: "Epilepsy in Children",
    specialty: "Neurology",
    specialtySlug: "neurology",
    lead: "Epilepsy is a brain disorder that causes recurring seizures. It affects about 1 in 26 people in the U.S. and is the most common serious neurological condition in children.",
    lastUpdated: "March 2025",
    relatedProgramSlug: "epilepsy-program",
    keyFacts: [
      {
        label: "What it is",
        value:
          "A brain condition that causes repeated seizures. Seizures happen when brain cells send abnormal electrical signals.",
      },
      {
        label: "How common",
        value:
          "About 1 in 26 people develop epilepsy. It can appear at any age, but it most often begins in childhood.",
      },
      {
        label: "How we treat it",
        value:
          "Most children respond well to medication. Surgery, diet therapy, and devices are options when medication doesn't work.",
      },
      {
        label: "When to call us",
        value:
          "If your child has had a first seizure, or if seizures are not well controlled, contact Boston Children's Neurology.",
      },
    ],
    sections: [
      {
        heading: "What is epilepsy?",
        paragraphs: [
          "Epilepsy is a brain disorder. It causes repeated seizures — sudden changes in behavior, movement, or awareness caused by abnormal electrical activity in the brain. A single seizure does not mean a child has epilepsy. A diagnosis usually requires two or more seizures that don't have a clear cause, like a fever or a head injury.",
          "There are many types of epilepsy. The type depends on where in the brain the seizures start, what causes them, and how they affect your child. Some children grow out of epilepsy. Others have it for life. Either way, most children with epilepsy can live full, active lives.",
        ],
      },
      {
        heading: "What are the signs of a seizure?",
        paragraphs: [
          "Seizures can look very different depending on the type. Some seizures are obvious — a child may shake, fall, or lose consciousness. Others are subtle and easy to miss. Signs to watch for include:",
          "If you're unsure whether what you saw was a seizure, a video recording during an episode is very helpful for your child's care team.",
        ],
        bullets: [
          "Staring spells or brief moments of unresponsiveness",
          "Sudden jerking of the arms or legs",
          "Loss of muscle tone (falling or slumping suddenly)",
          "Repetitive movements, like lip smacking or blinking",
          "Confusion or a dazed feeling after the event",
          "Sensations like unusual smells, feelings, or visual changes before a seizure",
        ],
      },
      {
        heading: "How is epilepsy diagnosed?",
        paragraphs: [
          "Diagnosing epilepsy starts with a detailed description of what happened. Your child's doctor will ask about the seizure, your child's health history, and your family history. Common tests include:",
          "At Boston Children's, our Epilepsy program is one of the busiest in the country. We have specialists who focus entirely on diagnosing and treating childhood epilepsy, including some of the rarest forms.",
        ],
        bullets: [
          "EEG (electroencephalogram) — a recording of electrical activity in the brain",
          "MRI — an imaging scan to look for changes in brain structure",
          "Blood tests to look for possible causes",
        ],
      },
      {
        heading: "How is epilepsy treated?",
        paragraphs: [
          "Treatment depends on the type of epilepsy and how often your child has seizures. The goal is to control seizures as fully as possible, with the fewest side effects.",
        ],
        bullets: [
          "Medication — Most children (about 7 in 10) become seizure-free with the right medication. Finding the right one sometimes takes time.",
          "Diet therapy — The ketogenic diet and related diets can reduce seizures in some children when medication hasn't worked.",
          "Surgery — When seizures come from one area of the brain, surgery can sometimes cure epilepsy or greatly reduce seizures.",
          "Device therapy — Devices like the vagus nerve stimulator (VNS) or responsive neurostimulation (RNS) can help when other options haven't worked.",
        ],
      },
    ],
    edCallout: {
      title: "When to call 911 or go to the Emergency Department",
      body: "Call 911 if a seizure lasts longer than 5 minutes, if your child doesn't recover within a few minutes, has a second seizure shortly after, has trouble breathing, or is injured during the seizure.",
    },
    appointment: {
      blurb:
        "Our Epilepsy Program sees new patients, including complex cases referred from other hospitals.",
      phone: "(617) 355-6905",
    },
    careTeam: {
      name: "Dr. Sarah Chen, MD",
      title: "Director, Epilepsy Program · Neurology",
      doctorSlug: "sarah-chen",
    },
    resources: [
      { label: "Seizure first aid guide (PDF, 180 KB)", href: "#" },
      { label: "Medication tracking log (PDF, 95 KB)", href: "#" },
      { label: "What to expect at your first visit", href: "#" },
    ],
    trials: [
      { label: "Pediatric epilepsy genetics registry", href: "#" },
      { label: "Novel anti-seizure medication (Phase 2)", href: "#" },
    ],
  },
];

export function getCondition(slug: string) {
  return conditions.find((c) => c.slug === slug);
}
