import { trackOutbound } from "../utils/analytics";

/**
 * Anchor that opens in a new tab with an accessible "opens in new window" cue.
 */
function ExternalLink({
  href,
  children,
  className,
  onClick,
  trackName,
  trackProps,
  ...rest
}) {
  const handleClick = (event) => {
    if (trackName) {
      trackOutbound(trackName, { href, ...trackProps });
    }
    if (onClick) onClick(event);
  };

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      {...rest}
    >
      {children}
      <span className="sr-only"> (opens in new window)</span>
    </a>
  );
}

export default ExternalLink;
