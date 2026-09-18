# Design rules — advanced peripherals region

## Board stack / region

- 2-layer FR-4, 1.6 mm (inherits main scanning board stackup)  
- Add-on keep-in: **80 mm × 55 mm** (Edge.Cuts in `swiftscan-board.kicad_pcb`)  
- Camera optical keepout: **20 mm × 20 mm** (comment layer) — no tall parts, no metal over IR FOV  

## Clearances

| Rule | Value |
| --- | --- |
| Signal-to-signal | **0.15 mm** min |
| Power-to-signal / power-to-power | **0.20 mm** min |
| Copper-to-board-edge | **0.30 mm** min |
| Hole-to-copper | **0.25 mm** min |
| Via annular ring | **0.10 mm** min |
| Silkscreen-to-pad | Prefer ≥0.15 mm; never over VCNL optical window |

## Trace widths

| Net class | Width | Notes |
| --- | --- | --- |
| Power (`+3V3`, `GND`) | **0.40 mm** | Stitch GND with vias to back pour |
| I2C | **0.20 mm** | Keep away from I2S bit clock |
| I2S | **0.20 mm** | Route BCLK/WS/DIN as a short bundle; avoid stubs |
| Default | **0.20 mm** | |

## Decoupling

| Ref | Value | Placement |
| --- | --- | --- |
| C1 | 100 nF 0603 X7R | ≤2 mm from ATECC608A VCC |
| C2 | 1 µF 0603 X5R/X7R | Next to C1 on +3V3 |
| C3 | 100 nF 0603 | ≤2 mm from VCNL4040 VDD |
| C4 | 1 µF 0603 | Next to C3 |
| C5 | 100 nF 0603 | ≤2 mm from J1 pin 1 (+3V3) |
| C6 | 1 µF 0603 | Next to C5 |

Return each decap to GND with a short via to the back GND pour (prefer via-in-pad only if fab allows; otherwise adjacent via ≤1 mm).

## I2C pull-ups

- R1 (SDA), R2 (SCL): **4.7 kΩ 0603** to +3V3  
- One pair only for the shared bus  
- Place near the ESP32-S3 breakout / connector, not daisy-chained at each slave  

## Placement priorities

1. **U2 VCNL4040** — flush to camera zone edge; IR emitter/detector facing scene; no silk text over package window  
2. **U1 ATECC608A** — away from high-current LED/USB rails; short I2C stubs  
3. **J1 I2S mic header** — board edge for breakout cable; keep I2S ≤40 mm to ESP32-S3  

## Routing keepouts

- Do not run I2S BCLK under the VCNL4040 or across the camera FPC  
- Do not pour +3V3 under the VCNL optical package; use local tracks + decap  
- GND pour on **B.Cu** with 0.20 mm clearance; thermal reliefs on pads  

## Fabrication notes

- VCNL4040 production land pattern must match Vishay datasheet (current PCB uses DFN-8 3×3 mm P0.65 stand-in for layout intent)  
- ATECC608A footprint: SOIC-8 3.9×4.9 mm P1.27 mm (confirm exact Microchip package code for BOM)  
- Impedance control not required for I2C/I2S at these lengths  
