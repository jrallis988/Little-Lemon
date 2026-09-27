# Minimal Custom Kernel & Boot Sector

A tiny x86 teaching OS: a 512-byte MBR bootloader loads a freestanding C kernel, switches into 32-bit protected mode, then runs a VGA text console with PS/2 keyboard input.

## Layout

| File | Role |
| --- | --- |
| `boot.asm` | MBR: stack setup, load kernel, enter protected mode |
| `disk_load.asm` | BIOS `int 0x13` disk read |
| `gdt.asm` | Flat code/data GDT |
| `32bit_switch.asm` | Real → protected mode switch |
| `kernel_entry.asm` | Binary entry stub that calls `main` |
| `kernel.c` | Kernel: VGA I/O, PS/2 keyboard, echo shell |
| `Makefile` | Build, run, and headless verify |

## Build

```bash
make
```

Produces `boot.bin` (512 bytes), `kernel.bin`, and `os-image.bin` (concatenated disk image).

## Run

```bash
make run
```

Opens QEMU with the raw disk image. You should see:

```text
=== KERNEL I/O SUBSYSTEM ONLINE ===
Type something below (press Enter to newline):

>
```

Type in the QEMU window to echo characters. Enter starts a new `>` prompt; Backspace deletes.

## Headless verify

```bash
make verify
```

Boots under QEMU with no display, checks the boot banner in VGA memory, injects `hello` + Enter via QMP `sendkey`, and confirms the echo appears.

## Requirements

- `nasm`
- `gcc` with 32-bit support (`gcc-multilib` on Debian/Ubuntu)
- `ld` (binutils)
- `qemu-system-i386` (or `qemu-system-x86_64`)
