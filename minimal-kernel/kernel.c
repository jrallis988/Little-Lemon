/* ==========================================
 * Kernel: VGA console + interrupt-driven keyboard
 * ========================================== */

#include "idt.h"
#include "keyboard.h"
#include "ports.h"

#define VIDEO_MEMORY 0xb8000
#define WHITE_ON_BLACK 0x0f
#define VGA_COLS 80
#define VGA_ROWS 25

static int cursor_col = 0;
static int cursor_row = 0;

static void update_cursor(void) {
    unsigned short position = (unsigned short)((cursor_row * VGA_COLS) + cursor_col);
    outb(0x3D4, 14);
    outb(0x3D5, (unsigned char)((position >> 8) & 0xFF));
    outb(0x3D4, 15);
    outb(0x3D5, (unsigned char)(position & 0xFF));
}

void clear_screen(void) {
    char* vidmem = (char*)VIDEO_MEMORY;
    int i;

    for (i = 0; i < VGA_COLS * VGA_ROWS * 2; i += 2) {
        vidmem[i] = ' ';
        vidmem[i + 1] = WHITE_ON_BLACK;
    }
    cursor_col = 0;
    cursor_row = 0;
    update_cursor();
}

static void scroll_screen(void) {
    char* vidmem = (char*)VIDEO_MEMORY;
    int r, c;
    int last_row_idx;

    for (r = 1; r < VGA_ROWS; r++) {
        for (c = 0; c < VGA_COLS; c++) {
            int src_idx = ((r * VGA_COLS) + c) * 2;
            int dst_idx = (((r - 1) * VGA_COLS) + c) * 2;
            vidmem[dst_idx] = vidmem[src_idx];
            vidmem[dst_idx + 1] = vidmem[src_idx + 1];
        }
    }

    last_row_idx = ((VGA_ROWS - 1) * VGA_COLS) * 2;
    for (c = 0; c < VGA_COLS; c++) {
        vidmem[last_row_idx + (c * 2)] = ' ';
        vidmem[last_row_idx + (c * 2) + 1] = WHITE_ON_BLACK;
    }
    cursor_row = VGA_ROWS - 1;
}

void kputc(char c) {
    char* vidmem = (char*)VIDEO_MEMORY;

    if (c == '\n') {
        cursor_col = 0;
        cursor_row++;
    } else if (c == '\b') {
        if (cursor_col > 0) {
            int idx;
            cursor_col--;
            idx = ((cursor_row * VGA_COLS) + cursor_col) * 2;
            vidmem[idx] = ' ';
            vidmem[idx + 1] = WHITE_ON_BLACK;
        }
    } else {
        int idx = ((cursor_row * VGA_COLS) + cursor_col) * 2;
        vidmem[idx] = c;
        vidmem[idx + 1] = WHITE_ON_BLACK;
        cursor_col++;
    }

    if (cursor_col >= VGA_COLS) {
        cursor_col = 0;
        cursor_row++;
    }

    if (cursor_row >= VGA_ROWS) {
        scroll_screen();
    }

    update_cursor();
}

void kprint(const char* message) {
    int i = 0;
    while (message[i] != '\0') {
        kputc(message[i]);
        i++;
    }
}

void main(void) {
    clear_screen();
    init_idt();
    init_keyboard();
    __asm__ volatile("sti");

    kprint("=== KERNEL IDT / IRQ1 ONLINE ===\n");
    kprint("Interrupt-driven keyboard ready.\n");
    kprint("Type something below (press Enter to newline):\n\n> ");

    while (1) {
        char key = get_key();
        if (key == '\n') {
            kputc('\n');
            kprint("> ");
        } else {
            kputc(key);
        }
    }
}
