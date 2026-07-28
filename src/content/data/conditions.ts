import type { ConditionDoc } from "@/content/types";

export const conditions: ConditionDoc[] = [
  {
    _type: "condition",
    _id: "cond-epilepsy",
    slug: "epilepsy-in-children",
    name: "Epilepsy in Children",
    specialty: "Neurology",
    departmentSlug: "neurology",
    lead: "Epilepsy is a brain disorder that causes recurring seizures. It affects about 1 in 26 people in the U.S. and is the most common serious neurological condition in children.",
    lastUpdated: "March 2025",
    relatedProgramSlugs: ["epilepsy-program"],
    relatedTrialSlugs: [
      "pediatric-epilepsy-genetics-registry",
      "novel-anti-seizure-medication-phase-2",
    ],
    careTeamDoctorSlug: "sarah-chen",
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
          "Epilepsy is a brain disorder. It causes repeated seizures — sudden changes in behavior, movement, or awareness caused by abnormal electrical activity in the brain. A single seizure does not mean a child has epilepsy.",
          "There are many types of epilepsy. Some children grow out of epilepsy. Others have it for life. Either way, most children with epilepsy can live full, active lives.",
        ],
      },
      {
        heading: "What are the signs of a seizure?",
        paragraphs: [
          "Seizures can look very different depending on the type. Signs to watch for include:",
          "If you're unsure whether what you saw was a seizure, a video recording during an episode is very helpful for your child's care team.",
        ],
        bullets: [
          "Staring spells or brief moments of unresponsiveness",
          "Sudden jerking of the arms or legs",
          "Loss of muscle tone (falling or slumping suddenly)",
          "Repetitive movements, like lip smacking or blinking",
          "Confusion or a dazed feeling after the event",
        ],
      },
      {
        heading: "How is epilepsy diagnosed?",
        paragraphs: [
          "Diagnosing epilepsy starts with a detailed description of what happened. Common tests include EEG, MRI, and blood tests.",
          "At Boston Children's, our Epilepsy program is one of the busiest in the country.",
        ],
        bullets: [
          "EEG (electroencephalogram)",
          "MRI brain imaging",
          "Blood tests to look for possible causes",
        ],
      },
      {
        heading: "How is epilepsy treated?",
        paragraphs: [
          "Treatment depends on the type of epilepsy and how often your child has seizures.",
        ],
        bullets: [
          "Medication — Most children (about 7 in 10) become seizure-free with the right medication.",
          "Diet therapy — Ketogenic and related diets can reduce seizures for some children.",
          "Surgery — When seizures come from one area of the brain.",
          "Device therapy — VNS or RNS when other options haven't worked.",
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
    resources: [
      { label: "Seizure first aid guide (PDF, 180 KB)", href: "/patients-families" },
      { label: "What to expect at your first visit", href: "/patients-families" },
    ],
  },
  {
    _type: "condition",
    _id: "cond-chd",
    slug: "congenital-heart-disease",
    name: "Congenital Heart Disease",
    specialty: "Cardiology",
    departmentSlug: "cardiology",
    lead: "Congenital heart disease includes structural heart problems present at birth. Boston Children's Heart Center cares for the full spectrum — from mild defects to the most complex single-ventricle anatomy.",
    lastUpdated: "January 2025",
    relatedProgramSlugs: ["heart-center"],
    relatedTrialSlugs: ["congenital-heart-device-registry"],
    careTeamDoctorSlug: "elena-torres",
    keyFacts: [
      {
        label: "What it is",
        value:
          "A heart structure difference present at birth that can affect blood flow through the heart and lungs.",
      },
      {
        label: "How common",
        value: "About 1 in 100 babies is born with a congenital heart defect.",
      },
      {
        label: "How we treat it",
        value:
          "Treatment ranges from monitoring to catheter procedures, surgery, and lifelong adult congenital care.",
      },
      {
        label: "When to call us",
        value:
          "If prenatal imaging shows a heart difference, or if your child has unexplained cyanosis, poor feeding, or exercise intolerance.",
      },
    ],
    sections: [
      {
        heading: "Understanding congenital heart disease",
        paragraphs: [
          "Congenital heart defects vary widely. Some children need no intervention; others need staged surgeries starting in infancy.",
          "Our teams include fetal cardiologists, cardiac surgeons, ICU specialists, and adult congenital experts under one program.",
        ],
      },
      {
        heading: "Diagnosis and monitoring",
        paragraphs: [
          "Diagnosis may begin before birth with fetal echocardiography, or after birth with exam, ECG, and imaging.",
        ],
        bullets: [
          "Fetal echocardiogram",
          "Transthoracic echocardiogram",
          "Cardiac MRI or CT when needed",
        ],
      },
    ],
    edCallout: {
      title: "When to seek emergency care",
      body: "Seek emergency care for blue or gray skin color, severe breathing difficulty, unresponsiveness, or sudden collapse.",
    },
    appointment: {
      blurb: "The Heart Center accepts new referrals, including complex prenatal consults.",
      phone: "(617) 355-4278",
    },
    resources: [
      { label: "Preparing for cardiac surgery", href: "/patients-families" },
    ],
  },
  {
    _type: "condition",
    _id: "cond-leukemia",
    slug: "childhood-leukemia",
    name: "Childhood Leukemia",
    specialty: "Oncology",
    departmentSlug: "oncology",
    lead: "Leukemia is the most common childhood cancer. At Dana-Farber/Boston Children's, treatment plans combine chemotherapy, supportive care, and access to clinical trials.",
    lastUpdated: "February 2025",
    relatedProgramSlugs: ["cancer-blood-disorders"],
    relatedTrialSlugs: [],
    careTeamDoctorSlug: "david-okonkwo",
    keyFacts: [
      {
        label: "What it is",
        value:
          "A cancer of the blood and bone marrow that leads to abnormal white blood cells.",
      },
      {
        label: "How common",
        value: "Leukemia accounts for about 1 in 3 childhood cancers.",
      },
      {
        label: "How we treat it",
        value:
          "Most children receive multi-phase chemotherapy; some need immunotherapy or transplant.",
      },
      {
        label: "When to call us",
        value:
          "Persistent fever, unusual bruising, fatigue, or abnormal blood counts warrant urgent evaluation.",
      },
    ],
    sections: [
      {
        heading: "Types of childhood leukemia",
        paragraphs: [
          "The most common type is acute lymphoblastic leukemia (ALL). Acute myeloid leukemia (AML) is less common but also treated here.",
        ],
      },
      {
        heading: "Treatment approach",
        paragraphs: [
          "Care is coordinated across oncology, nursing, psychosocial support, and survivorship clinics.",
        ],
        bullets: [
          "Induction and consolidation chemotherapy",
          "Supportive care for infection and nutrition",
          "Clinical trial options when appropriate",
        ],
      },
    ],
    edCallout: {
      title: "Fever during treatment",
      body: "Children on chemotherapy who develop fever need urgent evaluation — call your oncology team or go to the ED as instructed in your care plan.",
    },
    appointment: {
      blurb: "New oncology referrals are coordinated through the Cancer and Blood Disorders Center.",
      phone: "(617) 632-3270",
    },
    resources: [
      { label: "What to expect during chemotherapy", href: "/patients-families" },
    ],
  },
  {
    _type: "condition",
    _id: "cond-migraine",
    slug: "pediatric-migraine",
    name: "Pediatric Migraine",
    specialty: "Neurology",
    departmentSlug: "neurology",
    lead: "Migraine can disrupt school, sleep, and family life. Our Headache Program helps children reduce attack frequency and regain daily function.",
    lastUpdated: "December 2024",
    relatedProgramSlugs: ["epilepsy-program"],
    relatedTrialSlugs: [],
    careTeamDoctorSlug: "marcus-williams",
    keyFacts: [
      {
        label: "What it is",
        value:
          "A neurological condition causing recurrent moderate-to-severe headaches, often with nausea or light sensitivity.",
      },
      {
        label: "How common",
        value: "Migraine affects about 1 in 10 school-age children.",
      },
      {
        label: "How we treat it",
        value:
          "Lifestyle strategies, acute medications, preventive therapies, and behavioral supports.",
      },
      {
        label: "When to call us",
        value:
          "If headaches are frequent, disabling, or changing in pattern, ask for a neurology referral.",
      },
    ],
    sections: [
      {
        heading: "Recognizing migraine in children",
        paragraphs: [
          "Children may describe migraine differently than adults. Attacks can be shorter and stomach symptoms more prominent.",
        ],
      },
    ],
    edCallout: {
      title: "When headache needs emergency care",
      body: "Go to the ED for sudden worst headache, headache with fever and stiff neck, weakness, vision loss, or altered awareness.",
    },
    appointment: {
      blurb: "The Headache Program evaluates children with frequent or treatment-resistant migraine.",
      phone: "(617) 355-6388",
    },
    resources: [],
  },
  {
    _type: "condition",
    _id: "cond-undiagnosed",
    slug: "undiagnosed-genetic-disease",
    name: "Undiagnosed Genetic Disease",
    specialty: "Genetics",
    departmentSlug: "genetics",
    lead: "When standard testing has not explained a child's symptoms, our Undiagnosed Disease Program uses advanced genomics and multidisciplinary review to search for answers.",
    lastUpdated: "March 2025",
    relatedProgramSlugs: ["undiagnosed-disease-program"],
    relatedTrialSlugs: [],
    careTeamDoctorSlug: "priya-mehta",
    keyFacts: [
      {
        label: "What it is",
        value:
          "A complex set of symptoms without a confirmed diagnosis after appropriate evaluation.",
      },
      {
        label: "How we approach it",
        value:
          "Deep phenotyping, genomic sequencing, and cross-specialty case conferences.",
      },
      {
        label: "Who we see",
        value:
          "Children with multi-system disease and prior inconclusive genetic testing.",
      },
      {
        label: "When to call us",
        value:
          "Ask your clinician about referral if symptoms remain unexplained after standard workup.",
      },
    ],
    sections: [
      {
        heading: "Finding answers for rare disease",
        paragraphs: [
          "Many families arrive after years of searching. Our team focuses on careful history, data review, and next-generation sequencing strategies.",
        ],
      },
    ],
    edCallout: {
      title: "Emergencies come first",
      body: "Undiagnosed disease evaluation is not for acute emergencies. Call 911 for life-threatening symptoms.",
    },
    appointment: {
      blurb: "Referrals are reviewed for program fit before scheduling.",
      phone: "(617) 355-6000",
    },
    resources: [],
  },
];

export function getConditionDoc(slug: string) {
  return conditions.find((c) => c.slug === slug);
}
