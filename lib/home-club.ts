/** Canonical home club for this franchise site: Planet Fitness Stratham, NH. */

export const HOME_CLUB = {
  id: "pf-stratham",
  slug: "stratham-nh",
  name: "Planet Fitness Stratham",
  city: "Stratham",
  state: "NH",
  zip: "03885",
  address: "20 Portsmouth Ave",
  phone: "(603) 772-4777",
  phoneHref: "tel:+16037724777",
  latitude: 43.0237,
  longitude: -70.9137,
  /** Official Planet Fitness club page */
  officialUrl: "https://www.planetfitness.com/gyms/stratham-nh",
  tagline: "Your Judgement Free Zone® in Stratham, NH — Open & Staffed 24/7.",
} as const;

export function homeClubLabel() {
  return `${HOME_CLUB.name} · ${HOME_CLUB.city}, ${HOME_CLUB.state}`;
}
