/* ==========================================
 * Minimal Custom Kernel — C entry point
 * Writes directly to VGA text-mode video memory.
 * ========================================== */

#define VIDEO_MEMORY 0xb8000
#define WHITE_ON_BLACK 0x0f

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
    kprint("CUSTOM KERNEL BOOTED SUCCESSFULLY!");
}
