/** Official CCSNH / WMCC outbound links used across the site */
export const APPLY_URL = "https://ccsnh.my.site.com/apply/";
export const REQUEST_INFO_URL =
  "https://www.wmcc.edu/wmcc-inquiry-request-information/";
export const CATALOG_DEGREES_URL = "https://catalog.wmcc.edu/degrees";
export const FAFSA_URL = "https://studentaid.gov/h/apply-for-aid/fafsa";
export const WMCC_NEWS_URL = "https://www.wmcc.edu/news/";
export const WMCC_EVENTS_URL = "https://www.wmcc.edu/events/";
export const ADMISSIONS_EMAIL = "wmcc@ccsnh.edu";

export const catalogUrl = (path) =>
  `https://catalog.wmcc.edu${path.startsWith("/") ? path : `/${path}`}`;
