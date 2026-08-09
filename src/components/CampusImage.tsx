import { asset } from "../lib/asset";

type CampusImageProps = {
  /** Filename without extension, under public/images/ */
  name: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  /** CSS object-position for responsive crop */
  objectPosition?: string;
};

/** Serves WebP with JPG fallback for public campus photos. */
export function CampusImage({
  name,
  alt,
  className,
  loading = "lazy",
  fetchPriority,
  objectPosition,
}: CampusImageProps) {
  const style = objectPosition ? { objectPosition } : undefined;

  return (
    <picture>
      <source srcSet={asset(`images/${name}.webp`)} type="image/webp" />
      <img
        src={asset(`images/${name}.jpg`)}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        style={style}
        decoding="async"
      />
    </picture>
  );
}
