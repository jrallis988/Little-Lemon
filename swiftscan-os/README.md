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

1. GRUB / QEMU Multiboot loads the ELF at `0x00100000`.
2. `boot.asm` clears `.bss`, sets a 16 KiB stack, calls `kernel_main(magic, mbi)`.
3. Kernel initializes framebuffer (Multiboot FB or VGA text `0xB8000`), scanner HAL, and scale HAL.
4. Demo injects a UPC and ~454 g weight so the operator UI updates under QEMU without hardware.

Scanner and scale drivers stay in simulation until platform MMIO bases are mapped.
