export function SkipNav() {
  return (
    <nav aria-label="Skip links" className="contents">
      <a
        href="#main"
        className="fixed left-0 top-0 z-[9999] -translate-y-full rounded-br-sm bg-ocean px-s5 py-s3 text-base font-bold text-white transition-transform duration-150 focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
      >
        Skip to main content
      </a>
      <a
        href="#site-nav"
        className="fixed left-[11.5rem] top-0 z-[9999] -translate-y-full rounded-br-sm bg-ocean px-s5 py-s3 text-base font-bold text-white transition-transform duration-150 focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
      >
        Skip to navigation
      </a>
    </nav>
  );
}
