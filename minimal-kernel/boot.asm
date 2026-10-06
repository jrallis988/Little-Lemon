; ==========================================
; Project: Minimal Custom Kernel & Boot Sector
; Target Architecture: x86 (16-bit to 32-bit protected mode)
; ==========================================
; MBR boot sector (512 bytes). Loads the kernel from disk,
; switches to 32-bit protected mode, and jumps to the C kernel.

[org 0x7c00]              ; Bootloader load address in memory

KERNEL_OFFSET equ 0x1000  ; Memory offset where kernel will be loaded

mov [BOOT_DRIVE], dl      ; BIOS stores boot drive in DL register

; Set up stack
mov bp, 0x9000
mov sp, bp

call load_kernel          ; Read kernel from disk
call switch_to_pm         ; Switch to 32-bit protected mode

jmp $                     ; Hang if we ever return

%include "disk_load.asm"
%include "gdt.asm"
%include "32bit_switch.asm"

[bits 32]
BEGIN_PM:
    call KERNEL_OFFSET    ; Jump to C kernel entry point
    jmp $

BOOT_DRIVE db 0

; Pad to 512 bytes and add boot signature (0x55AA)
times 510-($-$$) db 0
dw 0xaa55
