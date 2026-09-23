/**
 * Production configuration for Great Bay Community College.
 * Override endpoints with CRA env vars without code changes.
 */
export const siteConfig = {
  name: "Great Bay Community College",
  shortName: "GBCC",
  url: process.env.REACT_APP_SITE_URL || "https://www.greatbay.edu",
  campus: {
    address: "320 Corporate Drive",
    city: "Portsmouth",
    state: "NH",
    zip: "03801",
    phone: "(603) 427-7600",
    tollFree: "1-800-522-1194",
    email: "askgreatbay@ccsnh.edu",
  },
  /** Official CCSNH / GBCC application portal */
  applyUrl:
    process.env.REACT_APP_APPLY_URL ||
    "https://www.greatbay.edu/admissions/apply/",
  fafsaCode: "002583",
  myGbccUrl: "https://mygbcc.greatbay.edu/",
  catalogUrl: "https://catalog.greatbay.edu/",
  /** Optional production form endpoint (Formspree, Netlify, custom API) */
  formEndpoint: process.env.REACT_APP_FORM_ENDPOINT || "",
  formDestination: "askgreatbay@ccsnh.edu",
  /** Optional GA4 measurement ID, e.g. G-XXXXXXXX */
  analyticsId: process.env.REACT_APP_GA_MEASUREMENT_ID || "",
  defaultDescription:
    "Great Bay Community College — affordable higher education on New Hampshire's Seacoast. Explore 50+ programs, admissions, athletics, and campus life in Portsmouth, NH.",
};
