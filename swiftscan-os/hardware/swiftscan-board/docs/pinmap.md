# ESP32-S3 pin map — scanning board peripherals

## Core / imaging / audio

| Net | ESP32-S3 | Direction | Peripheral |
| --- | --- | --- | --- |
| `I2C_SDA` | GPIO8 | Bidirectional | ATECC608A, VCNL4040, MAX17048, BME280 |
| `I2C_SCL` | GPIO9 | Out (open-drain) | Shared I2C0 clock |
| `VCNL_INT` | GPIO4 | In | VCNL4040 INT |
| `FUEL_ALRT` | GPIO17 | In | MAX17048 ALRT (low battery / SOC alert) |
| `I2S_BCLK` | GPIO14 | Out | Mic header BCLK |
| `I2S_WS` | GPIO15 | Out | Mic header WS |
| `I2S_DIN` | GPIO16 | In | Mic header DOUT |
| `+3V3` | 3V3 rail | Power | Logic peripherals |
| `VBATT` | LiPo+ | Power | Battery / MAX17048 CELL+VDD |
| `GND` | GND | Power | System ground |

## Utility breakout `J2` (1×10)

| Pin | Net | Notes |
| --- | --- | --- |
| 1 | `+3V3` | Breakout power |
| 2 | `GND` | |
| 3 | `GPIO1` | Free GPIO |
| 4 | `GPIO2` | Free GPIO |
| 5 | `GPIO3` | Free GPIO |
| 6 | `GPIO5` | Free GPIO |
| 7 | `GPIO6` | Free GPIO |
| 8 | `GPIO7` | Free GPIO |
| 9 | `GPIO10` | Free GPIO |
| 10 | `GPIO11` | Free GPIO |

## I2C addresses

| Device | 7-bit address | Notes |
| --- | --- | --- |
| ATECC608A | `0x60` typical | Confirm SKU; avoid clash with VCNL |
| VCNL4040 | `0x60` | Address conflict risk with some ATECC parts |
| MAX17048 | `0x36` | Fuel gauge |
| BME280 | `0x76` | SDO tied to GND (use `0x77` if SDO=+3V3) |

## Battery / fuel gauge

`J3` LiPo 1×2 → `VBATT` / `GND`. MAX17048 **CELL** and **VDD** both on `VBATT` (single-cell application). Decouple with C7 (100 nF) + C8 (1 µF) at the IC.

## Mounting

`H1`–`H4`: M3 holes, **grounded** top/bottom pads, **4 mm** drawing clearance rings for enclosure standoffs.
