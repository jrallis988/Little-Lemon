/**
 * Shift site config — edit before production deploy.
 *
 * formspreeEndpoint: create a form at https://formspree.io and paste
 *   https://formspree.io/f/xxxxxxxx here to receive waitlist emails.
 * If empty, submissions stay in localStorage and optionally open a mailto draft.
 *
 * On Netlify, the form also works via native Forms (data-netlify on the form).
 */
window.SHIFT_CONFIG = {
  formspreeEndpoint: "",
  waitlistEmail: "hello@workingintelligence.com",
  mailtoFallback: true,
};

window.SHIFT_ANALYTICS = {
  enabled: true,
  debug: false,
  // plausibleDomain: "shift.workingintelligence.com",
};
