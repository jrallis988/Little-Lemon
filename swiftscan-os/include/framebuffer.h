#ifndef SWIFTSCAN_FRAMEBUFFER_H
#define SWIFTSCAN_FRAMEBUFFER_H

#include "multiboot.h"
#include "types.h"

/* Initialize display from Multiboot graphics info, else VGA text 80x25. */
void fb_init(const struct multiboot_info *mbi);

void fb_clear(uint32_t color);
void fb_put_pixel(uint32_t x, uint32_t y, uint32_t color);
void fb_fill_rect(uint32_t x, uint32_t y, uint32_t w, uint32_t h, uint32_t color);

/* Glyph text at cell (col, row) in VGA-text mode, or 8x8 cells in pixel mode. */
void fb_write(uint32_t col, uint32_t row, const char *text, uint32_t fg, uint32_t bg);

uint32_t fb_width(void);
uint32_t fb_height(void);
bool     fb_is_pixel_mode(void);

/* RGB pack helper (ignored in VGA text; uses VGA attribute byte instead). */
uint32_t fb_rgb(uint8_t r, uint8_t g, uint8_t b);

#endif /* SWIFTSCAN_FRAMEBUFFER_H */
