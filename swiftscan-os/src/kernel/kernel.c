/*
 * SwiftScan OS — kernel entry
 *
 * Boot path: Multiboot1 → _start (boot.asm) → kernel_main.
 * Brings up display, bi-optic scanner HAL, and load-cell scale HAL,
 * then runs a simple operator UI loop.
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

static void i32_to_dec(int32_t value, char *buf, size_t buflen)
{
    if (buflen == 0)
        return;

    if (value < 0) {
        buf[0] = '-';
        if (buflen == 1) {
            buf[0] = '\0';
            return;
        }
        u32_to_dec((uint32_t)(-value), buf + 1, buflen - 1);
    } else {
        u32_to_dec((uint32_t)value, buf, buflen);
    }
}

static void draw_chrome(void)
{
    const uint32_t bg  = fb_rgb(12, 18, 28);
    const uint32_t fg  = fb_rgb(220, 230, 240);
    const uint32_t acc = fb_rgb(0, 180, 160);

    fb_clear(bg);
    fb_write(2, 1, "SWIFTSCAN OS", acc, bg);
    fb_write(2, 2, "Bi-optic POS kernel (freestanding)", fg, bg);
    fb_write(2, 4, "Scanner : waiting...", fg, bg);
    fb_write(2, 5, "Scale   : 0 mg (tare)", fg, bg);
    fb_write(2, 7, "Status  : ready", fg, bg);
}

void kernel_main(uint32_t magic, struct multiboot_info *mbi)
{
    struct scan_event scan;
    struct scale_reading weight;
    char line[80];
    char num[16];
    uint32_t ticks = 0;
    const uint32_t bg  = fb_rgb(12, 18, 28);
    const uint32_t fg  = fb_rgb(220, 230, 240);
    const uint32_t acc = fb_rgb(0, 180, 160);
    const uint32_t warn = fb_rgb(220, 160, 40);

    fb_init((magic == MULTIBOOT_BOOTLOADER_MAGIC) ? mbi : NULL);
    scanner_init();
    scale_init();

    /* Demo stimuli so QEMU boots show live HAL paths without hardware. */
    scanner_inject("012345678905");
    scale_inject_mg(454000); /* ~1.00 lb produce */

    draw_chrome();

    if (magic != MULTIBOOT_BOOTLOADER_MAGIC) {
        fb_write(2, 7, "Status  : bad Multiboot magic", warn, bg);
    }

    for (;;) {
        ticks++;

        if (scanner_poll(&scan) == SCANNER_OK) {
            size_t i;
            for (i = 0; i < sizeof(line); i++)
                line[i] = '\0';

            line[0] = 'S'; line[1] = 'c'; line[2] = 'a'; line[3] = 'n';
            line[4] = 'n'; line[5] = 'e'; line[6] = 'r'; line[7] = ' ';
            line[8] = ':'; line[9] = ' ';
            for (i = 0; i < scan.length && (10 + i) < sizeof(line) - 1; i++)
                line[10 + i] = scan.code[i];

            fb_write(2, 4, line, acc, bg);
        }

        if (scale_read(&weight) == SCALE_OK) {
            size_t i;
            for (i = 0; i < sizeof(line); i++)
                line[i] = '\0';

            line[0] = 'S'; line[1] = 'c'; line[2] = 'a'; line[3] = 'l';
            line[4] = 'e'; line[5] = ' '; line[6] = ' '; line[7] = ' ';
            line[8] = ':'; line[9] = ' ';
            i32_to_dec(weight.milligrams, num, sizeof(num));
            for (i = 0; num[i] && (10 + i) < 40; i++)
                line[10 + i] = num[i];
            line[10 + i] = ' ';
            line[11 + i] = 'm';
            line[12 + i] = 'g';
            if (weight.stable) {
                line[13 + i] = ' ';
                line[14 + i] = '[';
                line[15 + i] = 's';
                line[16 + i] = 't';
                line[17 + i] = 'a';
                line[18 + i] = 'b';
                line[19 + i] = 'l';
                line[20 + i] = 'e';
                line[21 + i] = ']';
            }
            fb_write(2, 5, line, fg, bg);
        }

        /* Heartbeat so the operator knows the loop is alive. */
        if ((ticks & 0x3FFFFu) == 0) {
            fb_write(2, 7, "Status  : ready          ", fg, bg);
        } else if ((ticks & 0x3FFFFu) == 0x20000u) {
            fb_write(2, 7, "Status  : ready *        ", acc, bg);
        }

        __asm__ __volatile__("pause");
    }
}
