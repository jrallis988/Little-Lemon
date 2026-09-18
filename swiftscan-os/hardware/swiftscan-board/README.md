# SwiftScan Board — Advanced Peripherals

KiCad 7 schematic + PCB for the custom scanning board add-on region:

1. **ATECC608A** secure element (I2C) with 4.7 kΩ pull-ups  
2. **VCNL4040** ambient light / proximity sensor (I2C), placed near the camera  
3. **I2S digital microphone** breakout header on ESP32-S3 I2S pins  

## Open in KiCad

```bash
cd swiftscan-os/hardware/swiftscan-board
kicad swiftscan-board.kicad_pro
```

## Files

| File | Role |
| --- | --- |
| `swiftscan-board.kicad_sch` | Schematic (ESP32-S3 I2C/I2S excerpt + 3 peripherals + power/decap) |
| `swiftscan-board.kicad_pcb` | Layout (80×55 mm region, placement, sample routes, GND pour) |
| `libs/SwiftScanPeriph.kicad_sym` | Custom symbols |
| `docs/pinmap.md` | ESP32-S3 GPIO map |
| `docs/design-rules.md` | Clearances, power, decoupling, routing |
| `docs/bom.csv` | Bill of materials |
| `exports/` | SVG / netlist / BOM exports |

## Power & decoupling

- Shared **+3V3** / **GND** from the main scanning board regulator  
- Each IC / header: **100 nF + 1 µF** within ≤2 mm of VDD  
- I2C pull-ups **R1/R2 = 4.7 kΩ** to +3V3 (single pair for the bus)  
- VCNL4040 **IR_A** tied to +3V3; optical FOV kept clear of silk/metal  

## Net classes (PCB)

| Class | Width | Clearance | Nets |
| --- | --- | --- | --- |
| Power | 0.40 mm | 0.20 mm | `+3V3`, `GND` |
| I2C | 0.20 mm | 0.15 mm | `I2C_SDA`, `I2C_SCL` |
| I2S | 0.20 mm | 0.15 mm | `I2S_BCLK`, `I2S_WS`, `I2S_DIN` |
| Default | 0.20 mm | 0.15 mm | other |

See `docs/design-rules.md` for full clearance / keepout notes.
