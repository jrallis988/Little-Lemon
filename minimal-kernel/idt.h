#ifndef IDT_H
#define IDT_H

#define IDT_ENTRIES 256

/* IDT gate descriptor structure */
struct idt_gate_t {
    unsigned short low_offset;  /* Lower 16 bits of handler function address */
    unsigned short sel;         /* Kernel segment selector */
    unsigned char zero;         /* Must be zero */
    unsigned char flags;        /* Type and attributes */
    unsigned short high_offset; /* Upper 16 bits of handler function address */
} __attribute__((packed));

/* IDT pointer structure for LIDT instruction */
struct idt_register_t {
    unsigned short limit;
    unsigned int base;
} __attribute__((packed));

void set_idt_gate(int n, unsigned int handler);
void init_idt(void);

#endif
