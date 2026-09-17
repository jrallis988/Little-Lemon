#ifndef SWIFTSCAN_FRAMEBUFFER_H
#define SWIFTSCAN_FRAMEBUFFER_H

#include "multiboot.h"
#include "types.h"

/* Swift Scan OS — direct-to-framebuffer graphics (800x600x32 ARGB). */
#define FB_WIDTH  800
#define FB_HEIGHT 600
#define FB_BPP    32

/* Fallback linear FB base when Multiboot does not supply one (VBE/platform). */
#define FB_DEFAULT_PHYSICAL_ADDRESS 0xFD000000u

/* Simple ARGB color definitions */
#define COLOR_BLACK      0xFF000000u
#define COLOR_WHITE      0xFFFFFFFFu
#define COLOR_NAVY       0xFF002D62u
#define COLOR_GREEN      0xFF008000u
#define COLOR_LIGHT_GRAY 0xFFE0E0E0u

/* Prefer Multiboot linear FB; else map FB_DEFAULT_PHYSICAL_ADDRESS. */
void framebuffer_init(const struct multiboot_info *mbi);

void fb_draw_pixel(int x, int y, uint32_t color);
void fb_draw_rect(int x, int y, int width, int height, uint32_t color);
void fb_clear_screen(uint32_t color);

/* Navy shell: header bar, scan workspace card, side totals panel. */
void fb_render_ui_shell(void);

/* Glyph text in 8x8 cells (pixel mode) or VGA text fallback. */
void fb_write(uint32_t col, uint32_t row, const char *text, uint32_t fg, uint32_t bg);

uint32_t fb_width(void);
uint32_t fb_height(void);
uint32_t fb_addr(void);
bool     fb_is_pixel_mode(void);

/* Pack 0xFFrrggbb for callers that build colors dynamically. */
uint32_t fb_rgb(uint8_t r, uint8_t g, uint8_t b);

/* Compatibility aliases used by earlier kernel paths. */
static inline void fb_init(const struct multiboot_info *mbi) { framebuffer_init(mbi); }
static inline void fb_clear(uint32_t color) { fb_clear_screen(color); }
static inline void fb_put_pixel(uint32_t x, uint32_t y, uint32_t color)
{
    fb_draw_pixel((int)x, (int)y, color);
}
static inline void fb_fill_rect(uint32_t x, uint32_t y, uint32_t w, uint32_t h, uint32_t color)
{
    fb_draw_rect((int)x, (int)y, (int)w, (int)h, color);
}

#endif /* SWIFTSCAN_FRAMEBUFFER_H */
