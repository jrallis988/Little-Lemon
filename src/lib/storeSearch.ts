import { STORE_LOCATIONS, type StoreLocation } from "@/data/stores"

/** Rank stores by ZIP / city / state / name match for the store finder. */
export function searchStores(query: string): StoreLocation[] {
  const q = query.trim().toLowerCase()
  if (!q) {
    return [...STORE_LOCATIONS].sort((a, b) => a.distanceMi - b.distanceMi)
  }

  const zipDigits = q.replace(/\D/g, "")

  return [...STORE_LOCATIONS]
    .map((store) => {
      let score = 0
      const hay = `${store.name} ${store.city} ${store.state} ${store.zip} ${store.address}`.toLowerCase()

      if (zipDigits.length >= 3 && store.zip.startsWith(zipDigits.slice(0, 5))) {
        score += 100 - Math.abs(Number(store.zip) - Number(zipDigits.slice(0, 5) || 0)) / 1000
      }
      if (store.city.toLowerCase().includes(q)) score += 40
      if (store.state.toLowerCase() === q) score += 20
      if (store.name.toLowerCase().includes(q)) score += 25
      if (hay.includes(q)) score += 10

      // Soft distance penalty so near-matches still sort usefully
      const distanceBoost = Math.max(0, 12 - store.distanceMi)
      return { store, score: score + distanceBoost }
    })
    .filter((row) => row.score > 0 || q.length < 2)
    .sort((a, b) => b.score - a.score || a.store.distanceMi - b.store.distanceMi)
    .map((row) => row.store)
}
