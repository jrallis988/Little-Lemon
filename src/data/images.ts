/**
 * Curated retail-style Unsplash IDs grouped by merchandising category.
 * Each colorway gallery pulls distinct IDs (not recolored crops of one shot).
 */

export const RETAIL_IMAGE_POOLS = {
  apparel: [
    "photo-1591369822096-ffd140ec948f",
    "photo-1594938298603-c8148c4dae35",
    "photo-1591047139829-d91aecb6caea",
    "photo-1434389677669-e08b4cac3105",
    "photo-1576566588028-4147f3842f27",
    "photo-1541099649105-f69ad21f3246",
    "photo-1595777457583-95e059d581b8",
    "photo-1566174053879-31528523f8ae",
    "photo-1515372039744-b8f02a3ae446",
    "photo-1544022613-e87ca75a784a",
    "photo-1551028719-00167b16eac5",
    "photo-1489987707025-afc232f7ea0f",
    "photo-1521572163474-6864f9cf17ab",
    "photo-1515886657613-9f3515b0c78f",
    "photo-1509631179647-0177331693ae",
  ],
  shoes: [
    "photo-1543163521-1bf539c55dd2",
    "photo-1605812860427-4024433a70fd",
    "photo-1549298916-b41d501d3772",
    "photo-1560769629-975ec94e6a86",
    "photo-1533867617858-e7b97e060509",
    "photo-1614252231334-ae8634305d4b",
    "photo-1460353581641-37baddab0fa2",
    "photo-1595950653106-6c9ebd614d3a",
  ],
  bags: [
    "photo-1548036328-c9fa89d128fa",
    "photo-1590874103328-eac38a683ce7",
    "photo-1584917865442-de89df76afd3",
    "photo-1566150905458-1bf1fc113f0d",
    "photo-1591561954557-26941169b49e",
  ],
  home: [
    "photo-1616486338812-3dadae4b4ace",
    "photo-1586023492125-27b2c045efd7",
    "photo-1578500494198-246f612d3b3d",
    "photo-1610701596007-11502861dcfa",
    "photo-1631889993959-41b4e9c6e3c5",
    "photo-1555041469-a586c61ea9bc",
    "photo-1618221195710-dd6b41faaea6",
  ],
  beauty: [
    "photo-1596462502278-27bfdc403348",
    "photo-1522335789203-aabd1fc54bc0",
    "photo-1571781926291-c477ebfd024b",
    "photo-1608248543803-ba4f8c70ae0b",
    "photo-1620916569040-3f4c0a4b0c2b",
  ],
  gourmet: [
    "photo-1495474472287-4d71bcdd2085",
    "photo-1514432324607-a09d9b4aefdd",
    "photo-1549007994-cb92caebd54b",
    "photo-1481391319762-47dff72954d9",
    "photo-1596040033229-a9821ebd058d",
  ],
  stationery: [
    "photo-1531346680769-eb3c3f1e1a5d",
    "photo-1516414447565-b14be0adf13e",
    "photo-1513201099705-a9746e1e201f",
    "photo-1583485088034-697b5bc36b56",
  ],
  pets: [
    "photo-1583337130417-3346a1be7dee",
    "photo-1548199973-03cce0bbc87b",
    "photo-1587300003388-59208cc962cb",
    "photo-1514888286974-6c03e2ca1dba",
  ],
  kids: [
    "photo-1503919545889-aef636e10ad4",
    "photo-1519238263530-99bdd11df2ea",
    "photo-1515488042361-ee00e0ddd4e4",
    "photo-1503454537195-1dcabb73ffb9",
  ],
} as const

export type ImagePoolKey = keyof typeof RETAIL_IMAGE_POOLS

export function poolForCategory(category: string, department?: string): ImagePoolKey {
  const c = category.toLowerCase()
  const d = (department ?? "").toLowerCase()
  if (c.includes("shoe") || c.includes("sneaker") || c.includes("boot") || c.includes("flat"))
    return "shoes"
  if (c.includes("bag") || c.includes("accessories") || c.includes("jewelry")) return "bags"
  if (c.includes("gourmet") || c.includes("pantry") || c.includes("snack") || c.includes("coffee"))
    return "gourmet"
  if (c.includes("station") || c.includes("paper")) return "stationery"
  if (d === "pets" || c.includes("bed") || c.includes("bowl") || c.includes("toy") || c.includes("cat"))
    return "pets"
  if (d === "beauty" || c.includes("skin") || c.includes("hair") || c.includes("makeup") || c.includes("fragrance"))
    return "beauty"
  if (
    d === "home" ||
    c.includes("bedding") ||
    c.includes("kitchen") ||
    c.includes("decor") ||
    c.includes("lighting") ||
    c.includes("tabletop") ||
    c.includes("rug") ||
    c.includes("furniture") ||
    c.includes("bath")
  )
    return "home"
  if (d === "kids" || d === "boys" || d === "girls") return "kids"
  return "apparel"
}

/** Consistent retail crop — tall portrait for apparel tiles */
export function retailPhotoUrl(photoId: string, variant = 0) {
  const focal = ["faces", "entropy", "center"][variant % 3]
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=900&h=1200&q=82&crop=${focal}`
}

function hashSeed(seed: string) {
  return seed.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
}

/** Distinct multi-image gallery for a colorway — unique photo IDs, not recolored clones */
export function uniqueColorwayGallery(
  category: string,
  department: string,
  colorwaySeed: string,
  count = 3,
): string[] {
  const key = poolForCategory(category, department)
  const pool = RETAIL_IMAGE_POOLS[key]
  const start = hashSeed(colorwaySeed) % pool.length
  const urls: string[] = []
  const used = new Set<string>()
  for (let i = 0; urls.length < count && i < pool.length * 2; i++) {
    const id = pool[(start + i) % pool.length]!
    if (used.has(id)) continue
    used.add(id)
    urls.push(retailPhotoUrl(id, i))
  }
  return urls
}
