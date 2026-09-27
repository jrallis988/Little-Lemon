; IRQ stubs for the remapped PIC (IRQ0→32 ... IRQ15→47).

[bits 32]

global irq0
global irq1
extern irq0_handler
extern irq1_handler

irq0:
    pusha
    call irq0_handler
    popa
    iret

irq1:
    pusha
    call irq1_handler
    popa
    iret
