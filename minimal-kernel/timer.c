#include "timer.h"
#include "ports.h"

static volatile unsigned int system_ticks = 0;

void init_pit(unsigned int frequency) {
    unsigned int divisor;

    if (frequency == 0) {
        frequency = TIMER_HZ;
    }

    divisor = 1193180 / frequency;
    outb(0x43, 0x36); /* channel 0, lobyte/hibyte, mode 3 (square wave) */
    outb(0x40, (unsigned char)(divisor & 0xFF));
    outb(0x40, (unsigned char)((divisor >> 8) & 0xFF));
    system_ticks = 0;
}

/* Called from irq0 stub in interrupt.asm (vector 32 after PIC remap). */
void irq0_handler(void) {
    system_ticks++;
    outb(0x20, 0x20); /* EOI master PIC */
}

unsigned int get_ticks(void) {
    return system_ticks;
}

void sleep_ms(unsigned int ms) {
    unsigned int start = system_ticks;
    /* 100 Hz → 10 ms per tick; round up so sleep_ms(1) waits at least one tick. */
    unsigned int need = (ms + (1000 / TIMER_HZ) - 1) / (1000 / TIMER_HZ);

    if (need == 0) {
        need = 1;
    }

    while ((system_ticks - start) < need) {
        __asm__ volatile("hlt");
    }
}
