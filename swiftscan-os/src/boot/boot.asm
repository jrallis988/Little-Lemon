; SwiftScan OS — Multiboot1 entry & stack setup
; Assembled with: nasm -f elf32 boot.asm

MBALIGN  equ 1 << 0                 ; align loaded modules on page boundaries
MEMINFO  equ 1 << 1                 ; provide memory map
FLAGS    equ MBALIGN | MEMINFO
MAGIC    equ 0x1BADB002
CHECKSUM equ -(MAGIC + FLAGS)

section .multiboot
align 4
    dd MAGIC
    dd FLAGS
    dd CHECKSUM

section .bss
align 16
stack_bottom:
    resb 16384                      ; 16 KiB kernel stack
stack_top:

; Mark stack non-executable for modern linkers.
section .note.GNU-stack noalloc noexec nowrite progbits

section .text
global _start
extern kernel_main
extern __bss_start
extern __bss_end

_start:
    ; GRUB leaves us in 32-bit protected mode with interrupts disabled.
    ; Multiboot contract: EAX = magic, EBX = info struct pointer — preserve
    ; both across .bss clear (rep stosb zeroes EAX).
    cli
    mov esp, stack_top
    mov esi, eax                        ; save magic
    ; EBX (mbi) is untouched by the clear below

    ; Clear .bss
    mov edi, __bss_start
    mov ecx, __bss_end
    sub ecx, edi
    xor eax, eax
    rep stosb

    push ebx                            ; mbi
    push esi                            ; magic
    call kernel_main

.hang:
    cli
    hlt
    jmp .hang
