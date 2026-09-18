# SwiftScan Board — Hardware Package

KiCad 7 schematic + PCB for the custom ESP32-S3 scanning board.

## Blocks

1. **ATECC608A** — I2C secure element + 4.7 kΩ pull-ups  
2. **VCNL4040** — ALS / proximity near camera  
3. **I2S mic header** — GPIO14/15/16  
4. **MAX17048** — I2C LiPo fuel gauge across `VBATT`  
5. **BME280** — I2C temp / humidity / pressure  
6. **J2** — 10-pin GPIO utility breakout  
7. **H1–H4** — M3 grounded mounting holes + clearance rings  

## Open

```bash
cd swiftscan-os/hardware/swiftscan-board
kicad swiftscan-board.kicad_pro
```

## Docs

| File | Contents |
| --- | --- |
| `docs/pinmap.md` | GPIO / I2C / battery map |
| `docs/design-rules.md` | Clearances, widths, decap, placement |
| `docs/bom.csv` | Bill of materials |
| `exports/` | SVG / netlist / BOM exports |

## Power summary

- `+3V3` / `GND` — logic rail (0.40 mm / 0.20 mm clearance)  
- `VBATT` / `GND` — LiPo island for MAX17048 (0.50 mm / 0.25 mm clearance)  
- Local **100 nF + 1 µF** at every IC / powered header  
