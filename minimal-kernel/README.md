# Minimal Custom Kernel & Boot Sector

A tiny x86 teaching OS: MBR boot → 32-bit protected mode → IDT with remapped PIC → PIT timer (IRQ0) + PS/2 keyboard (IRQ1) → VGA shell with an uptime status bar.

## Layout

| File | Role |
| --- | --- |
| `boot.asm` | MBR: stack setup, load kernel, enter protected mode |
| `disk_load.asm` | BIOS `int 0x13` disk read |
| `gdt.asm` | Flat code/data GDT |
| `32bit_switch.asm` | Real → protected mode switch |
| `kernel_entry.asm` | Binary entry stub that calls `main` |
| `interrupt.asm` | IRQ0 / IRQ1 stubs |
| `idt.h` / `idt.c` | IDT gates, PIC remap (`IRQ0+IRQ1` unmasked), `lidt` |
| `timer.h` / `timer.c` | PIT @ 100 Hz, `get_ticks`, `sleep_ms` |
| `keyboard.h` / `keyboard.c` | Scancode ring buffer + `get_key` |
| `ports.h` / `ports.c` | `inb` / `outb` |
| `kernel.c` | VGA console, uptime bar, shell loop |
| `Makefile` | Build, run, and headless verify |

## Build

```bash
make
```

## Run

```bash
make run
```

You should see:

```text
=== KERNEL WITH PIT & IDT ONLINE ===
Timer IRQ0 + keyboard IRQ1 ready.
Type something below (press Enter to newline):

>
```

…and a bottom status bar like `uptime: 3s | PIT 100Hz | IRQ0+IRQ1`.

## Headless verify

```bash
make verify
```

Checks the banner, that the PIT-driven uptime reaches ≥ 1s, and that `sendkey` echo still works via IRQ1.

## Requirements

- `nasm`
- `gcc` with 32-bit support (`gcc-multilib` on Debian/Ubuntu)
- `ld` (binutils)
- `qemu-system-i386`
