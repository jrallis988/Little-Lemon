import { asset } from "../data";

function toPublicPath(src) {
  if (!src) return "";
  const base = process.env.PUBLIC_URL || "";
  if (base && src.startsWith(base)) {
    return src.slice(base.length) || "/";
  }
  if (src.startsWith("/images/") || src.startsWith("images/")) {
    return src.startsWith("/") ? src : `/${src}`;
  }
  const idx = src.indexOf("/images/");
  return idx >= 0 ? src.slice(idx) : src;
}

export function withWebp(src) {
  const path = toPublicPath(src);
  const jpg = asset(path);
  if (!/\.jpe?g$/i.test(path)) {
    return { jpg, webp: null };
  }
  return {
    jpg,
    webp: asset(path.replace(/\.jpe?g$/i, ".webp")),
  };
}

export default function Picture({
  src,
  alt = "",
  className,
  width,
  height,
  loading,
  decoding = "async",
  fetchpriority,
  sizes,
}) {
  const { jpg, webp } = withWebp(src);

  const image = (
    <img
      src={jpg}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      fetchpriority={fetchpriority}
      sizes={sizes}
    />
  );

  if (!webp) {
    return className ? <span className={className}>{image}</span> : image;
  }

  return (
    <picture className={className}>
      <source srcSet={webp} type="image/webp" />
      {image}
    </picture>
  );
}
