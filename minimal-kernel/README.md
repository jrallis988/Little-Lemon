# Minimal Custom Kernel & Boot Sector

A tiny x86 teaching OS: MBR boot → protected mode → IDT (exceptions 0–31 + IRQ0/IRQ1) → PIT → keyboard → bump heap → VGA shell.

## Memory layout

```text
0x00007C00   MBR boot sector (BIOS)
0x00001000   Kernel image
0x00010000   HEAP_START  (bump allocator, 8-byte align)
0x00080000   HEAP_END
0x00090000   Kernel stack top
0x000B8000   VGA text buffer
```

## Interrupts

| Vector | Source | Behavior |
| --- | --- | --- |
| 0–31 | CPU exceptions | Print panic banner (vector, name, err, EIP) and halt |
| 32 | PIT IRQ0 | Tick counter / `sleep_ms` |
| 33 | Keyboard IRQ1 | Scancode ring buffer |

Shell commands: `a` = alloc demo, `f` = `ud2` (Invalid Opcode, vector 6) to exercise the exception path. Page faults (vector 14) also print `CR2` when they occur (useful once paging is enabled).

## Files

| File | Role |
| --- | --- |
| `isr.asm` / `isr.c` / `isr.h` | Exception/IRQ stubs + dispatcher |
| `idt.h` / `idt.c` | IDT gates + PIC remap + `idt_flush` |
| `timer.*` / `keyboard.*` / `heap.*` | PIT, PS/2, bump allocator |
| `kernel.c` | VGA console + shell |
| `Makefile` | Build / run / verify |

## Build / run / verify

```bash
make
make run
make verify
```

## Requirements

- `nasm`, `gcc-multilib`, `ld`, `qemu-system-i386`
