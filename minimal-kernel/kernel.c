/* ==========================================
 * Minimal Custom Kernel — C entry point
 * Writes directly to VGA text-mode video memory.
 * ========================================== */

#define VIDEO_MEMORY 0xb8000
#define WHITE_ON_BLACK 0x0f
#define VGA_WIDTH 80
#define VGA_HEIGHT 25

void clear_screen(void) {
    char* video_memory = (char*) VIDEO_MEMORY;
    int i;

    for (i = 0; i < VGA_WIDTH * VGA_HEIGHT; i++) {
        video_memory[i * 2] = ' ';
        video_memory[(i * 2) + 1] = WHITE_ON_BLACK;
    }
}

void kprint(const char* message) {
    char* video_memory = (char*) VIDEO_MEMORY;
    int i = 0;

    while (message[i] != '\0') {
        video_memory[i * 2] = message[i];
        video_memory[(i * 2) + 1] = WHITE_ON_BLACK;
        i++;
    }
}

void main(void) {
    clear_screen();
    kprint("CUSTOM KERNEL BOOTED SUCCESSFULLY!");
}
