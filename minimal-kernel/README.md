# Minimal Custom Kernel & Boot Sector

A tiny x86 teaching OS: MBR boot → 32-bit protected mode → IDT / PIC → PIT (IRQ0) + keyboard (IRQ1) → bump-pointer heap → VGA shell with uptime bar.

## Memory layout

```text
0x00007C00   MBR boot sector (BIOS)
0x00001000   Kernel image (loaded by bootloader)
0x00010000   HEAP_START  — kmalloc bump pointer grows upward (8-byte align)
0x00080000   HEAP_END    — exclusive; leaves room below the stack
0x00090000   Kernel stack top
0x000B8000   VGA text buffer
```

`kfree` is LIFO-only: it frees the most recent `kmalloc` block, or is a no-op otherwise. There is no paging yet.

## Layout

| File | Role |
| --- | --- |
| `boot.asm` | MBR: stack setup, load kernel, enter protected mode |
| `disk_load.asm` | BIOS `int 0x13` disk read |
| `gdt.asm` | Flat code/data GDT |
| `32bit_switch.asm` | Real → protected mode switch |
| `kernel_entry.asm` | Binary entry stub that calls `main` |
| `interrupt.asm` | IRQ0 / IRQ1 stubs |
| `idt.h` / `idt.c` | IDT gates, PIC remap, `lidt` |
| `timer.h` / `timer.c` | PIT @ 100 Hz, `get_ticks`, `sleep_ms` |
| `keyboard.h` / `keyboard.c` | Scancode ring buffer + `get_key` |
| `heap.h` / `heap.c` | Bump allocator (`kmalloc` / LIFO `kfree`) |
| `ports.h` / `ports.c` | `inb` / `outb` |
| `kernel.c` | VGA console, heap demo, uptime bar, shell |
| `Makefile` | Build, run, and headless verify |

## Build

```bash
make
```

## Run

```bash
make run
```

You should see a `kmalloc demo` with addresses starting at `0x00010000`, then a prompt. Type `a` + Enter to re-run the alloc demo. Bottom status bar shows uptime.

## Headless verify

```bash
make verify
```

Checks banner, heap demo addresses, PIT uptime ≥ 1s, and IRQ1 `sendkey` echo.

## Requirements

- `nasm`
- `gcc` with 32-bit support (`gcc-multilib` on Debian/Ubuntu)
- `ld` (binutils)
- `qemu-system-i386`
