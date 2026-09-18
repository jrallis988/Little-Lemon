; SwiftScan OS — Multiboot1 entry & stack setup
; Requests 800x600x32 linear graphics when the loader supports it.

MBALIGN  equ 1 << 0                 ; align loaded modules on page boundaries
MEMINFO  equ 1 << 1                 ; provide memory map
VIDEO    equ 1 << 2                 ; request video mode fields
FLAGS    equ MBALIGN | MEMINFO | VIDEO
MAGIC    equ 0x1BADB002
CHECKSUM equ -(MAGIC + FLAGS)

section .multiboot
align 4
    dd MAGIC
    dd FLAGS
    dd CHECKSUM
    ; AOUT kludge fields (unused for ELF — must still pad to offset 32)
    dd 0                            ; header_addr
    dd 0                            ; load_addr
    dd 0                            ; load_end_addr
    dd 0                            ; bss_end_addr
    dd 0                            ; entry_addr
    ; Video mode request (valid because flags bit 2 is set)
    dd 0                            ; mode_type: 0 = linear graphics
    dd 800                          ; width
    dd 600                          ; height
    dd 32                           ; depth (bpp)

section .bss
align 16
stack_bottom:
    resb 16384                      ; 16 KiB kernel stack
stack_top:

section .note.GNU-stack noalloc noexec nowrite progbits

section .text
global _start
extern kernel_main
extern __bss_start
extern __bss_end

_start:
    ; Multiboot: EAX = magic, EBX = info — preserve across .bss clear.
    cli
    mov esp, stack_top
    mov esi, eax

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
