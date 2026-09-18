# Design rules — scanning board (rev B)

## Board region

- 2-layer FR-4, 1.6 mm  
- Outline: **90 mm × 65 mm**  
- Camera keepout: **20 mm × 20 mm** (no tall parts / metal over IR FOV)  
- Four **M3** mounting holes at corners (3.5 mm inset) with GND pads  

## Clearances

| Rule | Value |
| --- | --- |
| Signal-to-signal | **0.15 mm** |
| +3V3 power | **0.20 mm** |
| VBATT (LiPo) | **0.25 mm** |
| Copper-to-board-edge | **0.30 mm** |
| Mounting-hole copper keepout ring | **≥4.0 mm** radius visual / standoff clearance |
| Hole-to-copper (other nets) | **0.25 mm** |

## Trace widths

| Net class | Width | Nets |
| --- | --- | --- |
| VBATT | **0.50 mm** | `VBATT` |
| Power | **0.40 mm** | `+3V3`, `GND` |
| I2C | **0.20 mm** | `I2C_SDA`, `I2C_SCL` |
| I2S / GPIO | **0.20 mm** | I2S + `GPIO*` |
| Default | **0.20 mm** | other |

## Decoupling

| Ref | Value | Rail | Placement |
| --- | --- | --- | --- |
| C1 / C2 | 100 nF / 1 µF | +3V3 | ≤2 mm from ATECC608A VCC |
| C3 / C4 | 100 nF / 1 µF | +3V3 | ≤2 mm from VCNL4040 VDD |
| C5 / C6 | 100 nF / 1 µF | +3V3 | ≤2 mm from I2S mic header |
| C7 / C8 | 100 nF / 1 µF | **VBATT** | ≤2 mm from MAX17048 VDD/CELL |
| C9 / C10 | 100 nF / 1 µF | +3V3 | ≤2 mm from BME280 VDD/VDDIO |

## I2C pull-ups

- R1 (SDA), R2 (SCL): **4.7 kΩ** to +3V3 — shared by ATECC, VCNL, MAX17048, BME280  

## Placement priorities

1. VCNL4040 at camera zone edge  
2. MAX17048 + LiPo connector + VBATT pour in a compact battery island  
3. BME280 away from MCU heat / battery connector  
4. J2 GPIO header on board edge  
5. H1–H4 corners for enclosure  

## Fabrication notes

- VCNL4040: replace DFN stand-in with Vishay land pattern before fab  
- BME280: Bosch LGA-8 2.5×2.5 mm clockwise footprint  
- MAX17048: TDFN-8 2×2 mm; EP tied to GND  
- Mounting holes: plated, tied to GND; ensure enclosure screws contact pad or use star washers  
