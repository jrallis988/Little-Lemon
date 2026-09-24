/** Shared skip link for a11y on every route */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-buoy focus:px-3 focus:py-2 focus:text-foam"
    >
      Skip to content
    </a>
  );
}
