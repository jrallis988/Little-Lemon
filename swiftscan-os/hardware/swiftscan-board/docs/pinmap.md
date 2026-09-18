# ESP32-S3 pin map — advanced peripherals

| Net | ESP32-S3 | Direction | Peripheral |
| --- | --- | --- | --- |
| `I2C_SDA` | GPIO8 | Bidirectional | ATECC608A SDA, VCNL4040 SDA |
| `I2C_SCL` | GPIO9 | Out (open-drain) | ATECC608A SCL, VCNL4040 SCL |
| `VCNL_INT` | GPIO4 | In | VCNL4040 INT (optional interrupt) |
| `I2S_BCLK` | GPIO14 | Out | Mic header BCLK / SCK |
| `I2S_WS` | GPIO15 | Out | Mic header WS / LRCK |
| `I2S_DIN` | GPIO16 | In | Mic header DOUT / SD |
| `+3V3` | 3V3 rail | Power | All three blocks |
| `GND` | GND | Power | All three blocks |

## I2C addresses (default)

| Device | 7-bit address |
| --- | --- |
| ATECC608A (I2C) | `0x60` (variant-dependent; confirm marking) |
| VCNL4040 | `0x60` — **address conflict risk** with some ATECC SKUs |

If both devices decode to `0x60`, use an ATECC608A variant with a distinct I2C address, an I2C mux, or switch the secure element to the SWI one-wire interface on a spare GPIO. Document the final address map on the fab revision sticker.

## I2S mic header `J1` (1×6, 2.54 mm)

| Pin | Net | Notes |
| --- | --- | --- |
| 1 | `+3V3` | Breakout VDD |
| 2 | `GND` | |
| 3 | `I2S_WS` | Word select |
| 4 | `I2S_BCLK` | Bit clock |
| 5 | `I2S_DIN` | Data from mic → MCU |
| 6 | `GND` | SEL tied low = left channel (INMP441 / ICS-43434 style) |
