#include "isr.h"
#include "keyboard.h"
#include "ports.h"
#include "timer.h"

#define VGA  ((volatile char*)0xb8000)
#define PANIC_ATTR 0x4f /* white on red */

static const char* exception_messages[] = {
    "Division Error",
    "Debug",
    "Non-Maskable Interrupt",
    "Breakpoint",
    "Overflow",
    "BOUND Range Exceeded",
    "Invalid Opcode",
    "Device Not Available",
    "Double Fault",
    "Coprocessor Segment Overrun",
    "Invalid TSS",
    "Segment Not Present",
    "Stack-Segment Fault",
    "General Protection Fault",
    "Page Fault",
    "Reserved",
    "x87 FPU Error",
    "Alignment Check",
    "Machine Check",
    "SIMD Floating-Point Exception",
    "Virtualization Exception",
    "Control Protection Exception",
    "Reserved",
    "Reserved",
    "Reserved",
    "Reserved",
    "Reserved",
    "Reserved",
    "Hypervisor Injection",
    "VMM Communication",
    "Security Exception",
    "Reserved"
};

static void panic_putc_at(int row, int col, char c) {
    int idx = (row * 80 + col) * 2;
    VGA[idx] = c;
    VGA[idx + 1] = PANIC_ATTR;
}

static void panic_print_at(int row, int col, const char* s) {
    int i = 0;
    while (s[i] != '\0' && col + i < 80) {
        panic_putc_at(row, col + i, s[i]);
        i++;
    }
}

static void panic_clear_row(int row) {
    int c;
    for (c = 0; c < 80; c++) {
        panic_putc_at(row, c, ' ');
    }
}

static void panic_hex(int row, int col, unsigned int value) {
    static const char* hex = "0123456789abcdef";
    int i;
    panic_print_at(row, col, "0x");
    for (i = 0; i < 8; i++) {
        panic_putc_at(row, col + 2 + i, hex[(value >> (28 - i * 4)) & 0xF]);
    }
}

static void handle_exception(struct interrupt_frame* frame) {
    const char* name = "Unknown";
    int r;

    if (frame->int_no < 32) {
        name = exception_messages[frame->int_no];
    }

    /* Paint a clear panic banner at the top of the screen. */
    for (r = 0; r < 5; r++) {
        panic_clear_row(r);
    }
    panic_print_at(0, 0, "=== EXCEPTION ===");
    panic_print_at(1, 0, "vector: ");
    {
        char tmp[12];
        unsigned int n = frame->int_no;
        int i = 0;
        int j = 0;
        char rev[12];
        if (n == 0) {
            tmp[0] = '0';
            tmp[1] = '\0';
        } else {
            while (n > 0) {
                rev[i++] = (char)('0' + (n % 10));
                n /= 10;
            }
            while (i > 0) {
                tmp[j++] = rev[--i];
            }
            tmp[j] = '\0';
        }
        panic_print_at(1, 8, tmp);
    }
    panic_print_at(2, 0, name);
    panic_print_at(3, 0, "err=");
    panic_hex(3, 4, frame->err_code);
    panic_print_at(3, 16, " eip=");
    panic_hex(3, 21, frame->eip);
    panic_print_at(4, 0, "System halted. Reset QEMU to continue.");

    for (;;) {
        __asm__ volatile("cli; hlt");
    }
}

void interrupt_dispatcher(struct interrupt_frame* frame) {
    if (frame->int_no < 32) {
        handle_exception(frame);
        return;
    }

    if (frame->int_no == 32) {
        irq0_handler();
    } else if (frame->int_no == 33) {
        irq1_handler();
    }
}
