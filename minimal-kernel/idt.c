#include "idt.h"
#include "ports.h"

/* Kernel code segment selector from gdt.asm (gdt_code - gdt_start). */
#define KERNEL_CS 0x08

/* Present, ring 0, 32-bit interrupt gate */
#define IDT_FLAG_INTERRUPT_GATE 0x8E

/* IRQ1 assembly stub (interrupt.asm) */
extern void irq1(void);

static struct idt_gate_t idt[IDT_ENTRIES];
static struct idt_register_t idt_reg;

void set_idt_gate(int n, unsigned int handler) {
    idt[n].low_offset = (unsigned short)(handler & 0xFFFF);
    idt[n].sel = KERNEL_CS;
    idt[n].zero = 0;
    idt[n].flags = IDT_FLAG_INTERRUPT_GATE;
    idt[n].high_offset = (unsigned short)((handler >> 16) & 0xFFFF);
}

static void load_idt(void) {
    idt_reg.limit = (unsigned short)(sizeof(idt) - 1);
    idt_reg.base = (unsigned int)&idt;
    __asm__ volatile("lidt (%0)" : : "r"(&idt_reg));
}

/*
 * Remap PIC IRQs from 0x08-0x0F (clash with CPU exceptions) to 0x20-0x2F.
 * Master: IRQ0-7  → interrupt vectors 32-39
 * Slave:  IRQ8-15 → interrupt vectors 40-47
 */
static void remap_pic(void) {
    outb(0x20, 0x11); /* start init, cascade mode */
    outb(0xA0, 0x11);
    outb(0x21, 0x20); /* master offset 32 */
    outb(0xA1, 0x28); /* slave offset 40 */
    outb(0x21, 0x04); /* master has slave on IRQ2 */
    outb(0xA1, 0x02); /* slave identity */
    outb(0x21, 0x01); /* 8086 mode */
    outb(0xA1, 0x01);

    /* Mask all IRQs except IRQ1 (keyboard) on the master; mask all slave. */
    outb(0x21, 0xFD);
    outb(0xA1, 0xFF);
}

void init_idt(void) {
    int i;

    /* Clear all gates (not present) so unused vectors fault cleanly. */
    for (i = 0; i < IDT_ENTRIES; i++) {
        idt[i].low_offset = 0;
        idt[i].sel = 0;
        idt[i].zero = 0;
        idt[i].flags = 0;
        idt[i].high_offset = 0;
    }

    remap_pic();

    /* IRQ1 → vector 33 */
    set_idt_gate(33, (unsigned int)irq1);

    load_idt();
}
