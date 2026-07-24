export function CatalogSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4"
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="skeleton-block aspect-[3/4]" />
          <div className="skeleton-block h-3 w-1/3" />
          <div className="skeleton-block h-4 w-4/5" />
          <div className="skeleton-block h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}
