export default function Logo({ solid = false, className = "" }) {
  const mark = solid ? "#0a5c75" : "#ffffff";
  const accent = "#d4a017";
  const word = solid ? "#063848" : "#ffffff";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="34" height="34" rx="8" fill={mark} fillOpacity={solid ? 0.1 : 0.2} />
        <path
          d="M6 21c3.2-1.4 5.4-4.8 8.2-4.8 2.2 0 3.4 1.7 5.1 1.7 2.6 0 4.4-2.8 8.7-3.4"
          stroke={mark}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M7 24c3.5-1.2 5.8-3.5 8.4-3.5 2.4 0 3.7 1.4 5.4 1.4 2.8 0 4.7-2 7.2-2.6"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="24.5" cy="10" r="2.2" fill={accent} />
      </svg>
      <span
        className="font-display text-sm font-semibold uppercase tracking-[0.16em]"
        style={{ color: word }}
      >
        RVCC
      </span>
    </span>
  );
}
