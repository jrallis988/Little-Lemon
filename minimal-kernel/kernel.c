/* ==========================================
 * Extended Kernel with VGA I/O & PS/2 Keyboard
 * ========================================== */

#define VIDEO_MEMORY 0xb8000
#define WHITE_ON_BLACK 0x0f
#define VGA_COLS 80
#define VGA_ROWS 25

/* Low-level port I/O via GCC inline assembly */
unsigned char inb(unsigned short port) {
    unsigned char result;
    __asm__ volatile("inb %1, %0" : "=a"(result) : "Nd"(port));
    return result;
}

void outb(unsigned short port, unsigned char data) {
    __asm__ volatile("outb %0, %1" : : "a"(data), "Nd"(port));
}

/* Cursor and screen state */
int cursor_col = 0;
int cursor_row = 0;

/* Update the hardware VGA cursor position */
void update_cursor(void) {
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

void scroll_screen(void) {
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

/* PS/2 Keyboard Set 1 scancode → ASCII (unshifted) */
unsigned char scancode_to_ascii(unsigned char scancode) {
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

/* Poll PS/2 controller (status 0x64, data 0x60) for a make-code key */
char get_key(void) {
    while (1) {
        if (inb(0x64) & 0x01) {
            unsigned char scancode = inb(0x60);

            /* Ignore break codes (key release: high bit set) */
            if (scancode & 0x80) {
                continue;
            }

            return (char)scancode_to_ascii(scancode);
        }
    }
}

void main(void) {
    clear_screen();
    kprint("=== KERNEL I/O SUBSYSTEM ONLINE ===\n");
    kprint("Type something below (press Enter to newline):\n\n> ");

    while (1) {
        char key = get_key();
        if (key != 0) {
            if (key == '\n') {
                kputc('\n');
                kprint("> ");
            } else {
                kputc(key);
            }
        }
    }
}
