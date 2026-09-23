import type { CSSProperties, ReactNode } from 'react';
import { useExportAsset } from '../../hooks/useExportAsset';

type Props = {
  src: string;
  alt: string;
  fallback: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxWidth?: number | string;
};

/** Renders an exported image when present; otherwise the SVG/React fallback. */
export function ExportImage({ src, alt, fallback, className, style, maxWidth }: Props) {
  const state = useExportAsset(src);

  if (state === 'ready') {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ maxWidth: maxWidth ?? '100%', height: 'auto', display: 'block', ...style }}
      />
    );
  }

  if (state === 'loading') {
    return (
      <div className="export-loading" aria-busy="true" aria-label={`Loading ${alt}`}>
        {fallback}
      </div>
    );
  }

  return <>{fallback}</>;
}
