# ROAM Coffee — Design Exports

Drop final Adobe exports here so the React case study can reference real artwork.

## Intended workflow

1. Design in **Illustrator** (primary), **Photoshop** (mockups), **InDesign** (menus / collateral)
2. Export presentation assets (PNG/WebP @2x, PDF where useful)
3. Place files in the folders below
4. Point the case study viewers at these files instead of SVG scaffolds

## Folder map

```
exports/
  01-identity/       Logo lockups, symbol, wordmark
  02-packaging/      Bag fronts/backs, dielines, labels (N/E/S/W)
  03-rtd/            Cold brew can wraps
  04-box/            Gift box + info card
  05-cups-merch/     Cups, sleeve, takeaway, merch
  06-retail/         Storefront, interior, shelf
  07-menu-pos/       Menus, POS, posters
  08-production/     Print-ready PDF/X + preflight notes
  09-process/        Sketches, rounds, process boards
```

## Naming

Prefer: `roam-{sku}-{view}.{ext}`  
Examples: `roam-north-front.png`, `roam-east-dieline.png`, `roam-winter-pos.png`

## Auto-swap

The Package Viewer looks for:

| File | Replaces |
| --- | --- |
| `02-packaging/roam-{north\|east\|south\|west}-front.png` | Bag front SVG |
| `02-packaging/roam-{…}-back.png` | Bag back SVG |
| `02-packaging/roam-{…}-dieline.png` | Dieline SVG |

The Tools → Export status panel lists every expected slot and whether it is present.

## Note

Presentation SVG in `src/components/packaging/` is a temporary scaffold for layout and hierarchy.
Replace with exports from professional design applications for portfolio-quality presentation.
