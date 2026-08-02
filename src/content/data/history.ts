export type HistoryMilestone = {
  id: string;
  year: string;
  decade: string;
  title: string;
  body: string;
  institution: "bch" | "bmc" | "shared";
  imageUrl?: string;
  imageCaption?: string;
};

/**
 * Chronological archive spanning Boston Children’s Hospital and the
 * pediatric legacy of Boston City Hospital / Boston Medical Center.
 * Image URLs are documentary stand-ins (Unsplash) with archival-style captions.
 */
export const historyMilestones: HistoryMilestone[] = [
  {
    id: "bmc-1864",
    year: "1864",
    decade: "1860s",
    title: "Boston City Hospital is founded",
    body: "Boston City Hospital opens to serve the city’s public health needs. Its later pediatric service becomes a cornerstone of Boston’s children’s care legacy and, after the 1996 merger, part of Boston Medical Center’s institutional story.",
    institution: "bmc",
    imageUrl:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Archival mood — nineteenth-century urban hospital campus (illustrative stand-in).",
  },
  {
    id: "bch-1869",
    year: "1869",
    decade: "1860s",
    title: "Boston Children’s Hospital opens",
    body: "Boston Children’s Hospital is founded with a lasting mission: care for children, advance pediatric medicine, educate future clinicians, and strengthen community health. The hospital begins a continuous lineage of pediatric innovation that continues through 2025.",
    institution: "bch",
    imageUrl:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Founding era — early children’s hospital ward atmosphere (illustrative stand-in).",
  },
  {
    id: "bch-1882",
    year: "1882",
    decade: "1880s",
    title: "Relocation to Huntington Avenue",
    body: "The hospital relocates to Huntington Avenue, expanding capacity and establishing a more permanent institutional footprint as pediatric care demand grows in Boston.",
    institution: "bch",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Campus transition — late nineteenth-century institutional expansion (illustrative stand-in).",
  },
  {
    id: "bch-1890s",
    year: "1890s",
    decade: "1890s",
    title: "Specialty pediatric practice takes shape",
    body: "Boston Children’s deepens organized specialty care for infants and children, reinforcing the hospital’s role as a destination for complex childhood illness as modern pediatrics emerges as a distinct medical field.",
    institution: "bch",
  },
  {
    id: "bch-1900s",
    year: "1900s",
    decade: "1900s",
    title: "A growing referral center",
    body: "Families and referring clinicians increasingly look to Boston Children’s for advanced evaluation and treatment, while teaching and bedside observation expand the hospital’s educational mission.",
    institution: "bch",
    imageUrl:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Early twentieth-century clinical teaching tradition (illustrative stand-in).",
  },
  {
    id: "bch-1914",
    year: "1914",
    decade: "1910s",
    title: "Longwood Avenue campus established",
    body: "Boston Children’s establishes its Longwood Avenue campus — the geographic heart of the hospital’s modern identity and the foundation for a century of clinical, research, and teaching growth in the Longwood Medical Area.",
    institution: "bch",
    imageUrl:
      "https://images.unsplash.com/photo-1587351022130-043bdd5d0c01?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Longwood campus era — medical-area architecture and grounds (illustrative stand-in).",
  },
  {
    id: "bmc-1923",
    year: "1923",
    decade: "1920s",
    title: "Dr. Martin J. English starts the pediatric service",
    body: "At Boston City Hospital, Dr. Martin J. English establishes a dedicated pediatric service, formalizing organized children’s care within the city’s public hospital system and shaping generations of Boston pediatric training.",
    institution: "bmc",
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Portrait of pediatric leadership tradition — archival style (illustrative stand-in).",
  },
  {
    id: "bch-1920s",
    year: "1920s",
    decade: "1920s",
    title: "Surgical and medical specialties expand",
    body: "Boston Children’s strengthens specialty clinics and inpatient care pathways as pediatric surgery, medicine, and supportive services evolve alongside Boston’s broader academic medical community.",
    institution: "bch",
  },
  {
    id: "bmc-1932",
    year: "1932",
    decade: "1930s",
    title: "Mary E. Curley Pavilion opens",
    body: "The Mary E. Curley Pavilion opens at Boston City Hospital, advancing dedicated pediatric facilities for city children and families and becoming a landmark in Boston’s public pediatric care history.",
    institution: "bmc",
    imageUrl:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Pavilion era — dedicated pediatric facility legacy (illustrative stand-in).",
  },
  {
    id: "bch-1935",
    year: "1935",
    decade: "1930s",
    title: "Pediatric anesthesia innovations",
    body: "Boston Children’s advances pediatric anesthesia practice, helping make complex surgery safer for infants and children and reinforcing the hospital’s role in perioperative and critical-care innovation.",
    institution: "bch",
    imageUrl:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Operating-room heritage — pediatric anesthesia progress (illustrative stand-in).",
  },
  {
    id: "bch-1940s",
    year: "1940s",
    decade: "1940s",
    title: "Wartime service and postwar rebuilding",
    body: "Through wartime pressures and postwar recovery, Boston Children’s sustains essential pediatric care and prepares for a mid-century surge in specialty medicine, research infrastructure, and family-centered services.",
    institution: "bch",
  },
  {
    id: "bch-1950s",
    year: "1950s",
    decade: "1950s",
    title: "Academic pediatrics accelerates",
    body: "Specialty departments, research laboratories, and teaching programs expand. As a teaching hospital affiliated with Harvard Medical School, Boston Children’s trains clinicians under senior supervision while delivering family-centered care.",
    institution: "bch",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Teaching-hospital tradition — bedside learning and mentorship (illustrative stand-in).",
  },
  {
    id: "bch-1960s",
    year: "1960s",
    decade: "1960s",
    title: "Research and complex care deepen",
    body: "Laboratory discovery, clinical investigation, and multidisciplinary care models grow together. Boston Children’s becomes an increasingly national referral center for rare and complex childhood conditions.",
    institution: "bch",
  },
  {
    id: "bch-1970s",
    year: "1970s",
    decade: "1970s",
    title: "Neonatal and critical-care advances",
    body: "Intensive care for newborns and critically ill children expands, reflecting new technologies, nursing expertise, and team-based models that redefine survival and recovery for the sickest patients.",
    institution: "bch",
    imageUrl:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Critical-care era — neonatal and ICU innovation (illustrative stand-in).",
  },
  {
    id: "bch-1980s",
    year: "1980s",
    decade: "1980s",
    title: "Genetics, imaging, and surgical precision",
    body: "Diagnostic imaging, genetics, and increasingly precise surgical techniques broaden what can be diagnosed and treated in childhood, while ambulatory specialty care reaches more families across Greater Boston.",
    institution: "bch",
  },
  {
    id: "bmc-ror",
    year: "1989",
    decade: "1980s",
    title: "Reach Out and Read takes root",
    body: "Reach Out and Read — a founding pediatric literacy program associated with Boston’s academic pediatric community, including Boston City Hospital / Boston Medical Center clinicians — promotes early childhood reading during primary care visits, linking health care with school readiness and family support.",
    institution: "bmc",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Reach Out and Read legacy — books in the exam room (illustrative stand-in).",
  },
  {
    id: "bch-1990s",
    year: "1990s",
    decade: "1990s",
    title: "Network growth and translational science",
    body: "Boston Children’s expands specialty programs, community partnerships, and translational research pipelines that move discoveries from laboratory benches toward bedside therapies for children.",
    institution: "bch",
  },
  {
    id: "bmc-1996",
    year: "1996",
    decade: "1990s",
    title: "Boston Medical Center merger",
    body: "Boston City Hospital and Boston University Medical Center Hospital merge to form Boston Medical Center (BMC). The pediatric service lineage — from Dr. English’s 1923 program through the Curley Pavilion and community programs such as Reach Out and Read — continues within BMC’s mission of exceptional care without exception.",
    institution: "bmc",
    imageUrl:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Institutional transition — public academic medical center era (illustrative stand-in).",
  },
  {
    id: "bch-2000s",
    year: "2000s",
    decade: "2000s",
    title: "Genomics and global referral care",
    body: "Genomic medicine, organ transplantation, neurodevelopmental programs, and international second-opinion pathways expand. Families worldwide increasingly look to Boston Children’s for answers when conditions are rare or treatment-resistant.",
    institution: "bch",
    imageUrl:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Genomics and discovery era — research laboratory heritage (illustrative stand-in).",
  },
  {
    id: "bch-2010s",
    year: "2010s",
    decade: "2010s",
    title: "Integrated programs and community health",
    body: "Multidisciplinary institutes, satellite locations, digital access, and equity-focused community health strategies grow alongside flagship Longwood care — reinforcing the hospital’s four-part mission of care, research, education, and community well-being.",
    institution: "bch",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Modern campus care — integrated specialty programs (illustrative stand-in).",
  },
  {
    id: "bch-2020s",
    year: "2020–2024",
    decade: "2020s",
    title: "Pandemic response and renewed rankings leadership",
    body: "Boston Children’s adapts clinical operations through the COVID-19 era, sustains essential pediatric services, and continues to be recognized among the nation’s and world’s leading children’s hospitals for specialty excellence and research impact.",
    institution: "bch",
  },
  {
    id: "bch-2025",
    year: "2025",
    decade: "2020s",
    title: "150+ years — still here for every child",
    body: "More than a century and a half after its founding, Boston Children’s Hospital continues advancing pediatric care worldwide — with Longwood as home base, a growing regional presence, and an unbroken commitment to compassion, discovery, teaching, and community.",
    institution: "bch",
    imageUrl:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=80",
    imageCaption:
      "Present day — families at the center of pediatric care (illustrative stand-in).",
  },
];

export const historyDecades = Array.from(
  new Set(historyMilestones.map((m) => m.decade)),
);
