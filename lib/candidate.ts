export const candidate = {
  firstName: "Nick",
  lastName: "Varga",
  fullName: "Nick Varga",
  /** Public campaign brand lockup */
  brandName: "Varga for Senate",
  office: "U.S. Senate",
  state: "New Hampshire",
  hometown: "Newmarket",
  county: "Rockingham County",
  party: "Independent",
  ballotType: "write-in",
  electionDate: "2026-11-03",
  electionLabel: "November 3, 2026",
  electionWeekday: "Tuesday",
  primaryDate: "2026-09-08",
  primaryLabel: "September 8, 2026",
  primaryWeekday: "Tuesday",
  doNotEmphasizePrimary: "September 8, 2026",
  tagline: "People Over Politics.",
  positioningLong:
    "Nick Varga is running for U.S. Senate to put New Hampshire families first — not party bosses, not donors. Just you.",
  coreStatement:
    "Nick Varga isn’t a career politician. He’s a Granite Stater who watched Washington stop listening a long time ago and decided that if nobody else was going to run, he would. This campaign doesn’t take corporate money. It doesn’t answer to party bosses. It’s built neighbor by neighbor — the only way a campaign for New Hampshire should be.",
  committee: "Nick Varga Campaign Committee",
  email: "vargaforsenate@gmail.com",
  /** Demo placeholder phone — replace with verified campaign number before launch */
  phone: "(603) 555-0142",
  mailAddress: "PO Box 1842, Newmarket, NH 03857",
  townsCommitment: 234,
  veteransCount: "90,000",
  /**
   * Social profiles. Facebook is live; other networks still use generic
   * platform homepage placeholders until campaign URLs are supplied.
   */
  social: {
    facebook: "https://www.facebook.com/Vargraforsenate",
    x: "https://x.com/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
  },
  /**
   * Hero “Watch Video” — YouTube ID until a campaign upload is supplied.
   * Replace `youtubeId` with the official intro video when available.
   */
  introVideo: {
    youtubeId: "Fvae8nxzVz4",
    title: "Varga for Senate — campaign introduction",
  },
  pullQuote:
    "I will never be bought by investors, special interests, or political insiders. I do not serve corporations, wealthy donors, or private agendas — I serve the people of New Hampshire. Public office is not a business opportunity. It is a solemn responsibility to fight for the citizens who placed their trust in me.",
  secondAmendmentQuote:
    "A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.",
};

export const election = {
  september: {
    label: "September Election",
    dateIso: candidate.primaryDate,
    dateDisplay: candidate.primaryLabel,
    weekday: candidate.primaryWeekday,
    subtext: "New Hampshire state primary election day",
  },
  general: {
    label: "General Election",
    dateIso: candidate.electionDate,
    dateDisplay: candidate.electionLabel,
    weekday: candidate.electionWeekday,
    subtext: "The vote that decides the officeholder",
  },
};
