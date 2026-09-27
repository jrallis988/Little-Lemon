#include "keyboard.h"
#include "ports.h"

#define KBUF_SIZE 256

static volatile unsigned char kbuf[KBUF_SIZE];
static volatile unsigned int khead = 0;
static volatile unsigned int ktail = 0;

/* PS/2 Set 1 scancode → ASCII (unshifted) */
static unsigned char scancode_to_ascii(unsigned char scancode) {
    static const unsigned char scancode_ascii[] = {
        0,   27,  '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '\b',
        '\t', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\n',
        0,   'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '`',
        0,   '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 0,
        '*', 0,   ' '
    };

    if (scancode < sizeof(scancode_ascii)) {
        return scancode_ascii[scancode];
    }
    return 0;
}

void irq1_handler(void) {
    unsigned char scancode = inb(0x60);
    unsigned int next;

    if (!(scancode & 0x80)) {
        next = (khead + 1) % KBUF_SIZE;
        if (next != ktail) {
            kbuf[khead] = scancode;
            khead = next;
        }
    }

    outb(0x20, 0x20); /* EOI master PIC */
}

void init_keyboard(void) {
    khead = 0;
    ktail = 0;
}

/* Non-blocking: return next ASCII key, or 0 if none ready. */
char try_get_key(void) {
    while (ktail != khead) {
        unsigned char scancode = kbuf[ktail];
        char key;
        ktail = (ktail + 1) % KBUF_SIZE;
        key = (char)scancode_to_ascii(scancode);
        if (key != 0) {
            return key;
        }
    }
    return 0;
}

char get_key(void) {
    while (1) {
        char key = try_get_key();
        if (key != 0) {
            return key;
        }
        __asm__ volatile("hlt");
    }
}
