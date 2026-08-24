export default function LoadingSkeleton({ lines = 3, className = "" }) {
  return (
    <div
      className={`space-y-3 ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading content…</span>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`skeleton-bar h-4 rounded-sm ${index === lines - 1 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div
      className="border-t border-sand/14 py-8"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading project…</span>
      <div className="skeleton-bar mb-3 h-3 w-24" />
      <div className="skeleton-bar mb-4 h-8 w-48" />
      <div className="skeleton-bar mb-2 h-4 w-full max-w-xl" />
      <div className="skeleton-bar h-4 w-2/3 max-w-md" />
    </div>
  );
}
