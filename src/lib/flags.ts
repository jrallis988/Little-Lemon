/**
 * Feature flags for stakeholder demos vs internal tooling.
 * Design system stays available in local/dev, or when
 * VITE_SHOW_DESIGN_SYSTEM=1 is set at build time.
 */
export const showDesignSystem =
  import.meta.env.DEV || import.meta.env.VITE_SHOW_DESIGN_SYSTEM === "1"
