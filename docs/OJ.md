# OJ (Only Jokes) — Architecture notes

## Product

Dual-sided creator monetization network for stand-up comics and comedy animators.

- **Public discovery:** chronological clips, teasers, open-mic notes
- **Supporter tiers:** locked specials, raw audio memos, exclusive animated shorts
- **Tips:** per-post micro-tips with persistent action bar

## UI hierarchy

1. `AppShell` — brand header + mobile nav
2. `DiscoveryFeed` → `ContentTile` → `MediaStage` + `TipBar`
3. `CreatorProfile` → metrics + grid `ContentTile` (locked/public)
4. Global `UnlockSheet` via `SupportProvider` (subscribe | tip)

## Access model (UI)

| `access` | Rendering |
|----------|-----------|
| `public` | Clear media stage, tip + unlock CTA |
| `supporters` | Frosted blur + lock icon; opens subscribe sheet |

## Next persistence slice

Map to Drizzle: `creators`, `posts.access`, `tiers`, `subscriptions`, `tips` — keep discovery sort as `created_at DESC` only.
