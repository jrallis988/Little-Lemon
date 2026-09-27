#include "idt.h"
#include "isr.h"
#include "ports.h"

#define KERNEL_CS 0x08
#define IDT_FLAG_INTERRUPT_GATE 0x8E

static struct idt_gate_t idt[IDT_ENTRIES];
static struct idt_register_t idt_reg;

void set_idt_gate(int n, unsigned int handler) {
    idt[n].low_offset = (unsigned short)(handler & 0xFFFF);
    idt[n].sel = KERNEL_CS;
    idt[n].zero = 0;
    idt[n].flags = IDT_FLAG_INTERRUPT_GATE;
    idt[n].high_offset = (unsigned short)((handler >> 16) & 0xFFFF);
}

static void remap_pic(void) {
    outb(0x20, 0x11);
    outb(0xA0, 0x11);
    outb(0x21, 0x20);
    outb(0xA1, 0x28);
    outb(0x21, 0x04);
    outb(0xA1, 0x02);
    outb(0x21, 0x01);
    outb(0xA1, 0x01);

    /* Unmask IRQ0 (timer) and IRQ1 (keyboard). */
    outb(0x21, 0xFC);
    outb(0xA1, 0xFF);
}

void init_idt(void) {
    int i;

    for (i = 0; i < IDT_ENTRIES; i++) {
        idt[i].low_offset = 0;
        idt[i].sel = 0;
        idt[i].zero = 0;
        idt[i].flags = 0;
        idt[i].high_offset = 0;
    }

    remap_pic();

    set_idt_gate(0,  (unsigned int)isr0);
    set_idt_gate(1,  (unsigned int)isr1);
    set_idt_gate(2,  (unsigned int)isr2);
    set_idt_gate(3,  (unsigned int)isr3);
    set_idt_gate(4,  (unsigned int)isr4);
    set_idt_gate(5,  (unsigned int)isr5);
    set_idt_gate(6,  (unsigned int)isr6);
    set_idt_gate(7,  (unsigned int)isr7);
    set_idt_gate(8,  (unsigned int)isr8);
    set_idt_gate(9,  (unsigned int)isr9);
    set_idt_gate(10, (unsigned int)isr10);
    set_idt_gate(11, (unsigned int)isr11);
    set_idt_gate(12, (unsigned int)isr12);
    set_idt_gate(13, (unsigned int)isr13);
    set_idt_gate(14, (unsigned int)isr14);
    set_idt_gate(15, (unsigned int)isr15);
    set_idt_gate(16, (unsigned int)isr16);
    set_idt_gate(17, (unsigned int)isr17);
    set_idt_gate(18, (unsigned int)isr18);
    set_idt_gate(19, (unsigned int)isr19);
    set_idt_gate(20, (unsigned int)isr20);
    set_idt_gate(21, (unsigned int)isr21);
    set_idt_gate(22, (unsigned int)isr22);
    set_idt_gate(23, (unsigned int)isr23);
    set_idt_gate(24, (unsigned int)isr24);
    set_idt_gate(25, (unsigned int)isr25);
    set_idt_gate(26, (unsigned int)isr26);
    set_idt_gate(27, (unsigned int)isr27);
    set_idt_gate(28, (unsigned int)isr28);
    set_idt_gate(29, (unsigned int)isr29);
    set_idt_gate(30, (unsigned int)isr30);
    set_idt_gate(31, (unsigned int)isr31);
    set_idt_gate(32, (unsigned int)isr32);
    set_idt_gate(33, (unsigned int)isr33);

    idt_reg.limit = (unsigned short)(sizeof(idt) - 1);
    idt_reg.base = (unsigned int)&idt;
    idt_flush((unsigned int)&idt_reg);
}
