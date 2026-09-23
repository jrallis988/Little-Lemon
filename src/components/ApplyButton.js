import { siteConfig } from "../data/siteConfig";

/** External CTA that opens the official GBCC application portal */
function ApplyButton({ className = "btn btn-gold", children = "Apply Now" }) {
  return (
    <a
      className={className}
      href={siteConfig.applyUrl}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default ApplyButton;
