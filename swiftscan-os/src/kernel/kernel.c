/*
 * SwiftScan OS — kernel entry
 *
 * Boots Multiboot → framebuffer UI shell → scanner/scale HAL loop.
 */

#include "framebuffer.h"
#include "multiboot.h"
#include "scale.h"
#include "scanner.h"
#include "types.h"

static void u32_to_dec(uint32_t value, char *buf, size_t buflen)
{
    char tmp[16];
    size_t n = 0;
    size_t i;

    if (buflen == 0)
        return;

    if (value == 0) {
        buf[0] = '0';
        if (buflen > 1)
            buf[1] = '\0';
        return;
    }

    while (value > 0 && n < sizeof(tmp)) {
        tmp[n++] = (char)('0' + (value % 10u));
        value /= 10u;
    }

    if (n >= buflen)
        n = buflen - 1;

    for (i = 0; i < n; i++)
        buf[i] = tmp[n - 1 - i];
    buf[n] = '\0';
}

static void draw_operator_labels(void)
{
    /* Header branding on black bar (row ~2 → y≈16). */
    fb_write(2, 2, "SWIFT SCAN OS", COLOR_GREEN, COLOR_BLACK);
    fb_write(20, 2, "Bi-optic POS", COLOR_WHITE, COLOR_BLACK);

    /* Workspace card labels (white panel starts ~x50,y100 → col≥7,row≥13). */
    fb_write(8, 14, "Scan workspace", COLOR_NAVY, COLOR_WHITE);
    fb_write(8, 16, "Scanner : waiting...", COLOR_BLACK, COLOR_WHITE);
    fb_write(8, 18, "Scale   : 0 g", COLOR_BLACK, COLOR_WHITE);

    /* Side panel totals */
    fb_write(74, 14, "TOTALS", COLOR_BLACK, COLOR_LIGHT_GRAY);
    fb_write(74, 16, "Items: 0", COLOR_BLACK, COLOR_LIGHT_GRAY);
    fb_write(74, 18, "Ready", COLOR_GREEN, COLOR_LIGHT_GRAY);
}

void kernel_main(uint32_t magic, struct multiboot_info *mbi)
{
    const char *scan;
    uint32_t grams;
    char line[64];
    char num[16];
    uint32_t ticks = 0;
    size_t i;

    framebuffer_init((magic == MULTIBOOT_BOOTLOADER_MAGIC) ? mbi : NULL);
    scanner_init();
    scale_init();

    scanner_inject("012345678905");
    scale_inject_grams(454); /* ~1.00 lb produce */

    fb_render_ui_shell();
    draw_operator_labels();

    if (magic != MULTIBOOT_BOOTLOADER_MAGIC) {
        fb_write(2, 5, "bad Multiboot magic", COLOR_GREEN, COLOR_BLACK);
    } else if (!fb_is_pixel_mode()) {
        fb_write(2, 5, "VGA text fallback", COLOR_GREEN, COLOR_BLACK);
    }

    for (;;) {
        ticks++;

        scan = scanner_poll();
        if (scan) {
            for (i = 0; i < sizeof(line); i++)
                line[i] = '\0';
            line[0] = 'S'; line[1] = 'c'; line[2] = 'a'; line[3] = 'n';
            line[4] = 'n'; line[5] = 'e'; line[6] = 'r'; line[7] = ' ';
            line[8] = ':'; line[9] = ' ';
            for (i = 0; scan[i] && (10 + i) < sizeof(line) - 1; i++)
                line[10 + i] = scan[i];
            fb_write(8, 16, line, COLOR_BLACK, COLOR_WHITE);
            fb_write(74, 16, "Items: 1", COLOR_BLACK, COLOR_LIGHT_GRAY);
        }

        if (scale_data_ready()) {
            grams = scale_read_weight_grams();
            for (i = 0; i < sizeof(line); i++)
                line[i] = '\0';
            line[0] = 'S'; line[1] = 'c'; line[2] = 'a'; line[3] = 'l';
            line[4] = 'e'; line[5] = ' '; line[6] = ' '; line[7] = ' ';
            line[8] = ':'; line[9] = ' ';
            u32_to_dec(grams, num, sizeof(num));
            for (i = 0; num[i] && (10 + i) < 40; i++)
                line[10 + i] = num[i];
            line[10 + i] = ' ';
            line[11 + i] = 'g';
            if (scale_is_stable()) {
                line[12 + i] = ' ';
                line[13 + i] = '[';
                line[14 + i] = 'o';
                line[15 + i] = 'k';
                line[16 + i] = ']';
            }
            fb_write(8, 18, line, COLOR_BLACK, COLOR_WHITE);
        }

        if ((ticks & 0x3FFFFu) == 0)
            fb_write(74, 18, "Ready  ", COLOR_GREEN, COLOR_LIGHT_GRAY);
        else if ((ticks & 0x3FFFFu) == 0x20000u)
            fb_write(74, 18, "Ready *", COLOR_GREEN, COLOR_LIGHT_GRAY);

        __asm__ __volatile__("pause");
    }
}
