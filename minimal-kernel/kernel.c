/* ==========================================
 * Kernel: VGA console, PIT timer, IRQ1 keyboard
 * ========================================== */

#include "idt.h"
#include "keyboard.h"
#include "ports.h"
#include "timer.h"

#define VIDEO_MEMORY 0xb8000
#define WHITE_ON_BLACK 0x0f
#define STATUS_ATTR 0x1f /* white on blue — status bar */
#define VGA_COLS 80
#define VGA_ROWS 25
#define STATUS_ROW 24

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

    /* Keep the status bar on the last row; scroll rows 0..(STATUS_ROW-2). */
    for (r = 1; r < STATUS_ROW; r++) {
        for (c = 0; c < VGA_COLS; c++) {
            int src_idx = ((r * VGA_COLS) + c) * 2;
            int dst_idx = (((r - 1) * VGA_COLS) + c) * 2;
            vidmem[dst_idx] = vidmem[src_idx];
            vidmem[dst_idx + 1] = vidmem[src_idx + 1];
        }
    }

    last_row_idx = ((STATUS_ROW - 1) * VGA_COLS) * 2;
    for (c = 0; c < VGA_COLS; c++) {
        vidmem[last_row_idx + (c * 2)] = ' ';
        vidmem[last_row_idx + (c * 2) + 1] = WHITE_ON_BLACK;
    }
    cursor_row = STATUS_ROW - 1;
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

    if (cursor_row >= STATUS_ROW) {
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

/* Write text into the bottom status bar without moving the shell cursor. */
static void status_put(int col, char ch) {
    char* vidmem = (char*)VIDEO_MEMORY;
    int idx = ((STATUS_ROW * VGA_COLS) + col) * 2;
    vidmem[idx] = ch;
    vidmem[idx + 1] = STATUS_ATTR;
}

static void status_print(int col, const char* s) {
    int i = 0;
    while (s[i] != '\0' && (col + i) < VGA_COLS) {
        status_put(col + i, s[i]);
        i++;
    }
}

static void status_clear(void) {
    int c;
    for (c = 0; c < VGA_COLS; c++) {
        status_put(c, ' ');
    }
}

static void u32_to_dec(unsigned int n, char* out) {
    char tmp[11];
    int i = 0;
    int j = 0;

    if (n == 0) {
        out[0] = '0';
        out[1] = '\0';
        return;
    }

    while (n > 0) {
        tmp[i++] = (char)('0' + (n % 10));
        n /= 10;
    }
    while (i > 0) {
        out[j++] = tmp[--i];
    }
    out[j] = '\0';
}

static int str_len(const char* s) {
    int n = 0;
    while (s[n] != '\0') {
        n++;
    }
    return n;
}

static void draw_uptime(unsigned int seconds) {
    char num[12];
    status_clear();
    status_print(0, " uptime: ");
    u32_to_dec(seconds, num);
    status_print(9, num);
    status_print(9 + str_len(num), "s | PIT 100Hz | IRQ0+IRQ1");
}

void main(void) {
    unsigned int last_sec = (unsigned int)-1;

    clear_screen();
    init_idt();
    init_pit(TIMER_HZ);
    init_keyboard();
    __asm__ volatile("sti");

    /* Prove the timer works before the shell starts. */
    sleep_ms(200);

    kprint("=== KERNEL WITH PIT & IDT ONLINE ===\n");
    kprint("Timer IRQ0 + keyboard IRQ1 ready.\n");
    kprint("Type something below (press Enter to newline):\n\n> ");

    draw_uptime(get_ticks() / TIMER_HZ);

    while (1) {
        unsigned int secs = get_ticks() / TIMER_HZ;

        if (secs != last_sec) {
            last_sec = secs;
            draw_uptime(secs);
        }

        {
            char key = try_get_key();
            if (key == '\n') {
                kputc('\n');
                kprint("> ");
            } else if (key != 0) {
                kputc(key);
            } else {
                __asm__ volatile("hlt");
            }
        }
    }
}
