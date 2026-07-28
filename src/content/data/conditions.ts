import type { ConditionDoc } from "@/content/types";

type ConditionSeed = {
  slug: string;
  name: string;
  specialty: string;
  departmentSlug: string;
  lead: string;
  imageUrl: string;
  careTeamDoctorSlug: string;
  relatedProgramSlugs: string[];
  relatedTrialSlugs?: string[];
  facts: [string, string, string, string];
  signs: string[];
  diagnosis: string[];
  treatments: string[];
  emergency: string;
  phone: string;
};

function makeCondition(seed: ConditionSeed): ConditionDoc {
  return {
    _type: "condition",
    _id: `cond-${seed.slug}`,
    slug: seed.slug,
    name: seed.name,
    specialty: seed.specialty,
    departmentSlug: seed.departmentSlug,
    lead: seed.lead,
    imageUrl: seed.imageUrl,
    lastUpdated: "June 2026",
    keyFacts: [
      { label: "What it is", value: seed.facts[0] },
      { label: "What families may notice", value: seed.facts[1] },
      { label: "How we diagnose it", value: seed.facts[2] },
      { label: "How we treat it", value: seed.facts[3] },
    ],
    sections: [
      {
        heading: `Understanding ${seed.name.toLowerCase()}`,
        paragraphs: [
          seed.lead,
          "Every child's situation is different. Our pediatric specialists build a plan around age, development, symptoms, and family goals.",
        ],
        bullets: seed.signs,
      },
      {
        heading: "Diagnosis and treatment",
        paragraphs: [
          "Evaluation begins with a detailed history and exam. Your care team will explain which tests are useful and what each result means.",
        ],
        bullets: [...seed.diagnosis, ...seed.treatments],
      },
    ],
    edCallout: {
      title: "When to seek urgent or emergency care",
      body: seed.emergency,
    },
    appointment: {
      blurb: `Our ${seed.specialty} team welcomes referrals for children with suspected or confirmed ${seed.name.toLowerCase()}.`,
      phone: seed.phone,
    },
    careTeamDoctorSlug: seed.careTeamDoctorSlug,
    relatedProgramSlugs: seed.relatedProgramSlugs,
    relatedTrialSlugs: seed.relatedTrialSlugs ?? [],
    resources: [
      {
        label: `Preparing for your ${seed.specialty} visit`,
        href: "/patients-families",
      },
    ],
  };
}

export const conditions: ConditionDoc[] = [
  {
    _type: "condition",
    _id: "cond-epilepsy",
    slug: "epilepsy-in-children",
    name: "Epilepsy in Children",
    imageUrl:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1400&q=85",
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
    imageUrl:
      "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=1400&q=85",
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
    imageUrl:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1400&q=85",
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
    imageUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1400&q=85",
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
    imageUrl:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=85",
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
  makeCondition({
    slug: "pediatric-scoliosis",
    name: "Pediatric Scoliosis",
    specialty: "Orthopedics",
    departmentSlug: "orthopedics",
    lead: "Scoliosis is a sideways curve of the spine that often becomes noticeable during a child's growth spurt.",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=85",
    careTeamDoctorSlug: "maya-reed",
    relatedProgramSlugs: ["orthopedic-center"],
    relatedTrialSlugs: [],
    facts: [
      "A spinal curve measured at 10 degrees or more on an X-ray.",
      "Uneven shoulders, waist, or hips, or one side of the rib cage appearing higher.",
      "A physical exam and low-dose standing spine X-rays show the shape and size of the curve.",
      "Observation, bracing, physical therapy, or surgery depending on growth and curve severity.",
    ],
    signs: ["Uneven shoulders or shoulder blades", "Clothing that hangs unevenly", "A visible curve when bending forward"],
    diagnosis: ["Growth and neurologic exam", "Low-dose EOS or standard X-ray imaging"],
    treatments: ["Monitoring during growth", "Custom bracing", "Spinal fusion or growth-friendly surgery when needed"],
    emergency: "Scoliosis rarely causes an emergency. Seek urgent care for new leg weakness, loss of bladder or bowel control, or severe pain after an injury.",
    phone: "(617) 355-6021",
  }),
  makeCondition({
    slug: "cystic-fibrosis",
    name: "Cystic Fibrosis",
    specialty: "Pulmonology",
    departmentSlug: "pulmonology",
    lead: "Cystic fibrosis is an inherited condition that affects mucus in the lungs, digestive system, and other organs.",
    imageUrl: "https://images.unsplash.com/photo-1584555613497-9ecf9dd06f68?auto=format&fit=crop&w=1400&q=85",
    careTeamDoctorSlug: "sofia-garcia",
    relatedProgramSlugs: ["cystic-fibrosis-center"],
    relatedTrialSlugs: ["cftr-modulator-young-children"],
    facts: [
      "A genetic condition caused by changes in the CFTR gene.",
      "Persistent cough, frequent lung infections, slow growth, or salty-tasting skin.",
      "Newborn screening, sweat chloride testing, and genetic testing confirm the diagnosis.",
      "Airway clearance, medicines, nutrition support, and CFTR modulators protect long-term health.",
    ],
    signs: ["Ongoing cough or wheeze", "Frequent respiratory infections", "Poor weight gain or greasy stools"],
    diagnosis: ["Sweat chloride test", "CFTR genetic testing", "Lung function and nutrition assessment"],
    treatments: ["Daily airway clearance", "Inhaled and oral medicines", "High-calorie nutrition and pancreatic enzymes"],
    emergency: "Call the CF team promptly for breathing that is harder than usual, chest pain, coughing blood, dehydration, or a significant drop in oxygen level.",
    phone: "(617) 355-1900",
  }),
  makeCondition({
    slug: "inflammatory-bowel-disease",
    name: "Inflammatory Bowel Disease",
    specialty: "Gastroenterology",
    departmentSlug: "gastroenterology",
    lead: "Inflammatory bowel disease includes Crohn's disease and ulcerative colitis, which cause ongoing inflammation in the digestive tract.",
    imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1400&q=85",
    careTeamDoctorSlug: "daniel-brooks",
    relatedProgramSlugs: ["inflammatory-bowel-disease-center"],
    relatedTrialSlugs: ["pediatric-ibd-microbiome-study"],
    facts: [
      "A chronic immune-mediated condition affecting the digestive tract.",
      "Abdominal pain, diarrhea, blood in stool, fatigue, weight loss, or slowed growth.",
      "Blood and stool tests, imaging, and endoscopy help identify the type and extent of inflammation.",
      "Nutrition therapy, medicines, biologic therapies, and sometimes surgery can control inflammation.",
    ],
    signs: ["Persistent diarrhea", "Blood in stool", "Poor growth or unexplained weight loss"],
    diagnosis: ["Blood and stool inflammation markers", "Upper endoscopy and colonoscopy", "Small bowel imaging"],
    treatments: ["Nutrition therapy", "Anti-inflammatory or biologic medicine", "Surgery for selected complications"],
    emergency: "Seek urgent care for severe abdominal pain with swelling, repeated vomiting, heavy rectal bleeding, fainting, or signs of dehydration.",
    phone: "(617) 355-6058",
  }),
  makeCondition({
    slug: "type-1-diabetes",
    name: "Type 1 Diabetes",
    specialty: "Endocrinology",
    departmentSlug: "endocrinology",
    lead: "Type 1 diabetes develops when the immune system stops the pancreas from making enough insulin.",
    imageUrl: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=1400&q=85",
    careTeamDoctorSlug: "aisha-johnson",
    relatedProgramSlugs: ["diabetes-program"],
    relatedTrialSlugs: ["automated-insulin-delivery-study"],
    facts: [
      "An autoimmune condition requiring lifelong insulin treatment.",
      "Increased thirst and urination, weight loss, fatigue, or new bed-wetting.",
      "A blood glucose test, A1C, ketones, and antibody tests help confirm the diagnosis.",
      "Insulin, glucose monitoring, nutrition planning, and education support healthy daily life.",
    ],
    signs: ["Frequent urination and extreme thirst", "Unexplained weight loss", "Fatigue, nausea, or fruity-smelling breath"],
    diagnosis: ["Blood glucose and A1C", "Blood or urine ketones", "Diabetes antibody testing"],
    treatments: ["Daily insulin", "Continuous glucose monitoring", "Family-centered nutrition and activity planning"],
    emergency: "Call 911 for severe breathing difficulty, confusion, or unconsciousness. Vomiting with high glucose and moderate or large ketones needs immediate guidance from the diabetes team.",
    phone: "(617) 355-7476",
  }),
  makeCondition({
    slug: "chronic-kidney-disease",
    name: "Chronic Kidney Disease",
    specialty: "Nephrology",
    departmentSlug: "nephrology",
    lead: "Chronic kidney disease means the kidneys have reduced function or lasting structural changes that need ongoing care.",
    imageUrl: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=1400&q=85",
    careTeamDoctorSlug: "noah-fischer",
    relatedProgramSlugs: [],
    facts: [
      "A long-term reduction in kidney function or evidence of kidney damage.",
      "Swelling, fatigue, changes in urination, poor growth, or high blood pressure; early disease may have no symptoms.",
      "Blood and urine tests, blood pressure checks, and ultrasound assess kidney health.",
      "Medicines, nutrition support, dialysis, and transplant are tailored to disease stage.",
    ],
    signs: ["Swelling around the eyes or ankles", "Changes in urine amount or appearance", "Fatigue or poor growth"],
    diagnosis: ["Kidney function blood tests", "Urinalysis and urine protein", "Kidney ultrasound"],
    treatments: ["Blood pressure and kidney-protective medicines", "Nutrition and growth support", "Dialysis or transplant planning when needed"],
    emergency: "Seek urgent care for severe shortness of breath, sudden swelling, inability to urinate, confusion, or a seizure.",
    phone: "(617) 355-6129",
  }),
  makeCondition({
    slug: "hirschsprung-disease",
    name: "Hirschsprung Disease",
    specialty: "Surgery",
    departmentSlug: "surgery",
    lead: "Hirschsprung disease is a congenital condition in which nerve cells are missing from part of the large intestine.",
    imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=85",
    careTeamDoctorSlug: "grace-kim",
    relatedProgramSlugs: [],
    facts: [
      "Missing intestinal nerve cells prevent stool from moving normally through part of the colon.",
      "A newborn may not pass stool, or a child may have abdominal swelling, vomiting, or severe constipation.",
      "Contrast imaging, anorectal manometry, and a rectal biopsy establish the diagnosis.",
      "Surgery removes or bypasses the affected bowel; long-term bowel management supports recovery.",
    ],
    signs: ["Failure to pass meconium in the first two days", "Swollen abdomen or green vomit", "Severe ongoing constipation"],
    diagnosis: ["Contrast enema", "Anorectal manometry", "Rectal biopsy"],
    treatments: ["Pull-through surgery", "Ostomy in selected cases", "Bowel management and nutrition support"],
    emergency: "Fever, explosive or foul-smelling diarrhea, a swollen abdomen, lethargy, or vomiting can signal enterocolitis and need immediate emergency evaluation.",
    phone: "(617) 355-7800",
  }),
  makeCondition({
    slug: "sports-concussion",
    name: "Sports Concussion",
    specialty: "Sports Medicine",
    departmentSlug: "orthopedics",
    lead: "A concussion is a brain injury caused by a hit or force that changes how the brain works, even without loss of consciousness.",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1400&q=85",
    careTeamDoctorSlug: "lucas-martin",
    relatedProgramSlugs: ["orthopedic-center"],
    facts: [
      "A mild traumatic brain injury that temporarily affects brain function.",
      "Headache, dizziness, light sensitivity, slowed thinking, mood change, or sleep problems.",
      "A clinician uses symptom, balance, memory, neurologic, and injury assessments; imaging is not routinely needed.",
      "Early relative rest followed by a guided return to school and activity supports recovery.",
    ],
    signs: ["Headache or dizziness", "Confusion or difficulty concentrating", "Sensitivity to light or noise"],
    diagnosis: ["Neurologic and balance exam", "Symptom and school-function review"],
    treatments: ["Short period of relative rest", "Stepwise return to learning", "Supervised return-to-sport progression"],
    emergency: "Call 911 for worsening severe headache, repeated vomiting, seizure, increasing confusion, weakness, unequal pupils, neck pain, or difficulty waking.",
    phone: "(617) 355-3501",
  }),
  makeCondition({
    slug: "adolescent-eating-disorders",
    name: "Adolescent Eating Disorders",
    specialty: "Adolescent Medicine",
    departmentSlug: "adolescent-medicine",
    lead: "Eating disorders are serious medical and mental health conditions that affect nourishment, growth, emotions, and daily life.",
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1400&q=85",
    careTeamDoctorSlug: "isabella-rossi",
    relatedProgramSlugs: [],
    facts: [
      "Conditions such as anorexia nervosa, bulimia nervosa, and ARFID that disrupt eating and health.",
      "Food restriction, rapid weight change, dizziness, compulsive exercise, bingeing, or distress around meals.",
      "Medical, nutrition, growth, and behavioral health assessments identify risks and care needs.",
      "Coordinated medical monitoring, nutrition rehabilitation, and therapy help adolescents recover.",
    ],
    signs: ["Skipping meals or narrowing food choices", "Rapid weight or growth changes", "Fainting, feeling cold, or loss of normal energy"],
    diagnosis: ["Medical and growth assessment", "Laboratory tests and ECG when indicated", "Nutrition and behavioral health evaluation"],
    treatments: ["Family-based treatment", "Nutrition rehabilitation", "Medical monitoring and higher-level care when needed"],
    emergency: "Call 911 for fainting with injury, chest pain, severe weakness, confusion, vomiting blood, or immediate risk of self-harm.",
    phone: "(617) 355-7181",
  }),
  makeCondition({
    slug: "pediatric-arrhythmia",
    name: "Pediatric Arrhythmia",
    specialty: "Cardiology",
    departmentSlug: "cardiology",
    lead: "An arrhythmia is an abnormal heart rhythm that may be too fast, too slow, or irregular.",
    imageUrl: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=1400&q=85",
    careTeamDoctorSlug: "omar-ahmed",
    relatedProgramSlugs: ["heart-center"],
    relatedTrialSlugs: ["pediatric-arrhythmia-ablation-study"],
    facts: [
      "A change in the heart's electrical system that affects rhythm.",
      "Palpitations, dizziness, fainting, chest discomfort, fatigue, or no noticeable symptoms.",
      "ECG, wearable monitoring, exercise testing, imaging, and family history identify rhythm patterns.",
      "Observation, medicine, catheter ablation, or an implanted device may be recommended.",
    ],
    signs: ["A racing or pounding heartbeat", "Fainting or near-fainting", "Unexplained fatigue or exercise intolerance"],
    diagnosis: ["ECG and ambulatory monitor", "Exercise testing", "Echocardiogram and genetic testing when indicated"],
    treatments: ["Rhythm medicines", "Catheter ablation", "Pacemaker or defibrillator for selected conditions"],
    emergency: "Call 911 for fainting during exercise, severe chest pain, trouble breathing, a sustained racing heartbeat with weakness, or sudden collapse.",
    phone: "(617) 355-4278",
  }),
];

export function getConditionDoc(slug: string) {
  return conditions.find((c) => c.slug === slug);
}
