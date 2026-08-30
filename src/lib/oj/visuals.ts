/** Deterministic SVG poster / avatar art for OJ media tiles */

function hash(seed: number, salt = 0) {
  const x = Math.sin(seed * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

export function posterDataUri(opts: {
  tone: number
  title: string
  kind: string
  seed?: number
}) {
  const seed = opts.seed ?? opts.tone
  const a = Math.round(hash(seed, 1) * 40 + 30)
  const b = Math.round(hash(seed, 2) * 50 + 20)
  const c = Math.round(hash(seed, 3) * 60 + 10)
  const safeTitle = opts.title.replace(/[<>&]/g, '').slice(0, 42)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${opts.tone} 62% ${a}%)"/>
      <stop offset="55%" stop-color="hsl(${(opts.tone + 40) % 360} 48% ${b}%)"/>
      <stop offset="100%" stop-color="#041828"/>
    </linearGradient>
    <radialGradient id="r" cx="30%" cy="25%" r="55%">
      <stop offset="0%" stop-color="#00AFF0" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#00AFF0" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="640" height="400" fill="url(#g)"/>
  <rect width="640" height="400" fill="url(#r)"/>
  <circle cx="${120 + c}" cy="${90 + a}" r="${70 + b / 2}" fill="#BEE1F9" fill-opacity="0.18"/>
  <circle cx="${480 - c}" cy="${280 - a}" r="${90 + c}" fill="#ffffff" fill-opacity="0.08"/>
  <text x="28" y="360" fill="#ffffff" font-family="Space Grotesk, system-ui, sans-serif" font-size="22" font-weight="600">${safeTitle}</text>
  <text x="28" y="42" fill="#BEE1F9" font-family="Space Grotesk, system-ui, sans-serif" font-size="14" letter-spacing="3" text-transform="uppercase">${opts.kind}</text>
</svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export function avatarDataUri(opts: { initials: string; hue: number }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="a" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${opts.hue} 68% 48%)"/>
      <stop offset="100%" stop-color="#046a9e"/>
    </linearGradient>
  </defs>
  <circle cx="64" cy="64" r="64" fill="url(#a)"/>
  <circle cx="40" cy="36" r="28" fill="#BEE1F9" fill-opacity="0.25"/>
  <text x="64" y="76" text-anchor="middle" fill="#ffffff" font-family="Bebas Neue, Impact, sans-serif" font-size="42" letter-spacing="2">${opts.initials}</text>
</svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
