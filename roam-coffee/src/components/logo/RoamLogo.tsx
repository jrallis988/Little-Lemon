import type { SVGProps } from 'react';

type LogoProps = SVGProps<SVGSVGElement> & {
  variant?: 'primary' | 'wordmark' | 'symbol' | 'secondary' | 'oneColor' | 'reversed' | 'small';
  ink?: string;
  accent?: string;
};

/** ROAM mark — abstract compass / path. Designed as final vector artwork for presentation. */
export function RoamLogo({
  variant = 'primary',
  ink = '#162029',
  accent = '#B85A32',
  ...props
}: LogoProps) {
  if (variant === 'symbol' || variant === 'small') {
    const size = variant === 'small' ? 28 : 64;
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden={props['aria-label'] ? undefined : true}
        {...props}
      >
        <circle cx="32" cy="32" r="29" stroke={ink} strokeWidth="2" />
        <path
          d="M32 10 L36 28 L54 32 L36 36 L32 54 L28 36 L10 32 L28 28 Z"
          fill={accent}
          opacity="0.95"
        />
        <circle cx="32" cy="32" r="4.5" fill={ink} />
        <path
          d="M18 46 C24 40, 40 40, 46 46"
          stroke={ink}
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  if (variant === 'wordmark') {
    return (
      <svg width="220" height="40" viewBox="0 0 220 40" fill="none" {...props}>
        <text
          x="0"
          y="30"
          fill={ink}
          fontFamily="Syne, system-ui, sans-serif"
          fontWeight="700"
          fontSize="34"
          letterSpacing="0.18em"
        >
          ROAM
        </text>
      </svg>
    );
  }

  const fill = variant === 'reversed' ? '#F3EFE8' : ink;
  const accentFill = variant === 'oneColor' || variant === 'reversed' ? fill : accent;
  const coffee = variant === 'reversed' ? 'rgba(243,239,232,0.7)' : 'rgba(22,32,41,0.55)';

  if (variant === 'secondary') {
    return (
      <svg width="280" height="56" viewBox="0 0 280 56" fill="none" {...props}>
        <g transform="translate(0,4)">
          <circle cx="24" cy="24" r="22" stroke={fill} strokeWidth="1.8" />
          <path
            d="M24 6 L27 21 L42 24 L27 27 L24 42 L21 27 L6 24 L21 21 Z"
            fill={accentFill}
          />
          <circle cx="24" cy="24" r="3.2" fill={fill} />
        </g>
        <text
          x="60"
          y="28"
          fill={fill}
          fontFamily="Syne, system-ui, sans-serif"
          fontWeight="700"
          fontSize="26"
          letterSpacing="0.2em"
        >
          ROAM
        </text>
        <text
          x="60"
          y="46"
          fill={coffee}
          fontFamily="Figtree, system-ui, sans-serif"
          fontWeight="500"
          fontSize="11"
          letterSpacing="0.28em"
        >
          COFFEE
        </text>
      </svg>
    );
  }

  /* primary / oneColor / reversed */
  return (
    <svg width="320" height="72" viewBox="0 0 320 72" fill="none" {...props}>
      <g transform="translate(0,8)">
        <circle cx="28" cy="28" r="26" stroke={fill} strokeWidth="2" />
        <path
          d="M28 6 L32 24 L50 28 L32 32 L28 50 L24 32 L6 28 L24 24 Z"
          fill={accentFill}
        />
        <circle cx="28" cy="28" r="3.8" fill={fill} />
        <path
          d="M14 42 C20 36, 36 36, 42 42"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <text
        x="72"
        y="36"
        fill={fill}
        fontFamily="Syne, system-ui, sans-serif"
        fontWeight="700"
        fontSize="36"
        letterSpacing="0.22em"
      >
        ROAM
      </text>
      <text
        x="74"
        y="58"
        fill={coffee}
        fontFamily="Figtree, system-ui, sans-serif"
        fontWeight="500"
        fontSize="12"
        letterSpacing="0.32em"
      >
        COFFEE
      </text>
    </svg>
  );
}

export function RoamMarkMini({ color = '#162029', ...props }: SVGProps<SVGSVGElement> & { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 64 64" fill="none" aria-hidden {...props}>
      <circle cx="32" cy="32" r="28" stroke={color} strokeWidth="3" />
      <path d="M32 12 L35.5 28 L52 32 L35.5 36 L32 52 L28.5 36 L12 32 L28.5 28 Z" fill={color} />
    </svg>
  );
}
