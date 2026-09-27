; IRQ stubs for the remapped PIC (IRQ0→32 ... IRQ15→47).
; Currently only IRQ1 (keyboard) is used; others send EOI and return.

[bits 32]

global irq1
extern irq1_handler

irq1:
    pusha
    call irq1_handler
    popa
    iret
