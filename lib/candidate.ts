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
  /**
   * Disclaimer committee name as provided by the campaign.
   * FEC committee ID is pending a filed Statement of Organization.
   */
  committee: "Nick Varga Campaign Committee",
  fecCommitteeId: "",
  email: "vargaforsenate@gmail.com",
  /** Leave empty until the campaign supplies a verified public number. */
  phone: "",
  /** Leave empty until the campaign confirms a mailing address. */
  mailAddress: "",
  townsCommitment: 234,
  veteransCount: "90,000",
  /**
   * Social profiles. Empty strings stay hidden until campaign URLs are supplied.
   * Facebook is the only confirmed public page so far.
   */
  social: {
    facebook: "https://www.facebook.com/Vargraforsenate",
    x: "",
    instagram: "",
    youtube: "",
  },
  /**
   * Hero “Watch Video” — leave youtubeId empty until the official intro is ready.
   */
  introVideo: {
    youtubeId: "",
    title: "Varga for Senate — campaign introduction",
  },
  pullQuote:
    "I will never be bought by investors, special interests, or political insiders. I do not serve corporations, wealthy donors, or private agendas — I serve the people of New Hampshire. Public office is not a business opportunity. It is a solemn responsibility to fight for the citizens who placed their trust in me.",
  secondAmendmentQuote:
    "A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.",
};

export function hasPublicPhone(): boolean {
  return Boolean(candidate.phone && !/555-0/.test(candidate.phone));
}

export function hasMailAddress(): boolean {
  return Boolean(candidate.mailAddress);
}

export function hasIntroVideo(): boolean {
  return Boolean(candidate.introVideo.youtubeId);
}

export function publicSocials(): { label: string; href: string; icon: string }[] {
  const items: { label: string; href: string; icon: string }[] = [];
  if (candidate.social.facebook) {
    items.push({ label: "Facebook", href: candidate.social.facebook, icon: "fa-facebook" });
  }
  if (candidate.social.instagram) {
    items.push({ label: "Instagram", href: candidate.social.instagram, icon: "fa-instagram" });
  }
  if (candidate.social.x) {
    items.push({ label: "X", href: candidate.social.x, icon: "fa-twitter" });
  }
  if (candidate.social.youtube) {
    items.push({ label: "YouTube", href: candidate.social.youtube, icon: "fa-youtube-play" });
  }
  return items;
}

export function phoneTelHref(): string | null {
  if (!hasPublicPhone()) return null;
  const digits = candidate.phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits.startsWith("+") ? digits : `+1${digits}`}` : null;
}

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
