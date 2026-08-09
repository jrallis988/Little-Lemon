type BrandMarkProps = {
  className?: string;
  title?: string;
};

export function BrandMark({
  className = "h-8 w-8",
  title = "Morgan Bright",
}: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <rect width="64" height="64" rx="8" fill="#e11d2e" />
      <rect x="6" y="6" width="52" height="52" rx="5" fill="#06235b" />
      <path
        d="M18 44V20l14 16 14-16v24"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="16" r="4" fill="#e11d2e" />
    </svg>
  );
}
