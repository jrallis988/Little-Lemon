; Switch from 16-bit real mode to 32-bit protected mode.

[bits 16]
switch_to_pm:
    cli                   ; Disable interrupts
    lgdt [gdt_descriptor] ; Load GDT
    mov eax, cr0
    or eax, 0x1           ; Set PE (Protection Enable) bit
    mov cr0, eax
    jmp CODE_SEG:init_pm  ; Far jump to flush pipeline / load CS

[bits 32]
init_pm:
    mov ax, DATA_SEG      ; Point segment registers at data selector
    mov ds, ax
    mov ss, ax
    mov es, ax
    mov fs, ax
    mov gs, ax

    mov ebp, 0x90000      ; Update stack for protected-mode address space
    mov esp, ebp

    call BEGIN_PM
