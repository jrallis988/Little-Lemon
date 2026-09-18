# SwiftScan OS

Freestanding Multiboot i386 kernel for a bi-optic POS appliance (barcode imager + load-cell scale + operator display).

## Layout

```
swiftscan-os/
├── .cursorrules           # Rules for bare-metal C/ASM
├── Makefile               # Build & QEMU launcher
├── linker.ld              # Memory layout (load @ 1 MiB)
├── include/               # Public HAL / UI headers
└── src/
    ├── boot/boot.asm      # Multiboot entry & stack
    ├── kernel/kernel.c    # Kernel main loop
    ├── hal/
    │   ├── scanner.c      # Bi-optic scanner interface
    │   └── scale.c        # Load-cell scale interface
    └── ui/framebuffer.c   # VGA text / linear FB renderer
```

## Build

Requires `nasm`, `gcc` (multilib/`-m32`), `ld`, and optionally `grub-mkrescue` + `qemu-system-i386`.

```bash
cd swiftscan-os
make          # -> build/swiftscan.bin
make run      # QEMU headless smoke boot
make run-vga  # QEMU with VGA window
make iso      # GRUB rescue ISO
```

## Boot contract

1. GRUB / QEMU Multiboot loads the ELF at `0x00100000` and (when possible) sets **800×600×32** linear graphics via the Multiboot video request + `gfxpayload`.
2. `boot.asm` clears `.bss`, sets a 16 KiB stack, calls `kernel_main(magic, mbi)`.
3. `framebuffer_init` binds the Multiboot linear FB (or VGA text fallback).
4. `fb_render_ui_shell` draws the navy operator chrome: black header, white scan workspace, light-gray totals panel.
5. Demo injects a UPC and ~454 g weight so HAL paths update under QEMU without hardware.

Scanner and scale drivers stay in simulation until platform ports are enabled
(`-DSWIFTSCAN_SCANNER_HW` for scanner `0x3F8`/`0x3F9`, `-DSWIFTSCAN_SCALE_HW`
for scale `0x3FA`/`0x3FB`). QEMU uses `scanner_inject()` / `scale_inject_grams()`
to feed the same poll/read paths.

## Hardware (ESP32-S3 scanning board)

Schematic / PCB for advanced peripherals lives in [`hardware/swiftscan-board/`](hardware/swiftscan-board/):

- ATECC608A (I2C secure element) + 4.7 kΩ pull-ups  
- VCNL4040 (ALS / proximity) near camera  
- I2S mic breakout header on GPIO14/15/16  
- Power net classes, local 100 nF+1 µF decoupling, routing clearances  

Open `hardware/swiftscan-board/swiftscan-board.kicad_pro` in KiCad 7+.
