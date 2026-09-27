; Global Descriptor Table for flat 32-bit protected mode.
; Null descriptor + code segment + data segment (base 0, limit 4 GiB).

gdt_start:

gdt_null:                 ; Mandatory null descriptor
    dd 0x0
    dd 0x0

gdt_code:                 ; Code segment: base=0, limit=0xfffff
    ; access: present, ring 0, code, executable, readable
    ; flags: 4K granularity, 32-bit
    dw 0xffff             ; Limit (bits 0-15)
    dw 0x0                ; Base (bits 0-15)
    db 0x0                ; Base (bits 16-23)
    db 10011010b          ; Access byte
    db 11001111b          ; Flags + limit (bits 16-19)
    db 0x0                ; Base (bits 24-31)

gdt_data:                 ; Data segment: identical base/limit, data access
    dw 0xffff
    dw 0x0
    db 0x0
    db 10010010b          ; Access: present, ring 0, data, writable
    db 11001111b
    db 0x0

gdt_end:

gdt_descriptor:
    dw gdt_end - gdt_start - 1  ; Size of GDT (always one less than true size)
    dd gdt_start                ; Start address of GDT

; Segment selector offsets into the GDT
CODE_SEG equ gdt_code - gdt_start
DATA_SEG equ gdt_data - gdt_start
