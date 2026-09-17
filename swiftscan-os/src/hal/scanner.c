/*
 * Bi-optic scanner HAL
 *
 * Production path would MMIO a decode engine (USB HID wedge / serial OEM).
 * QEMU path keeps a one-deep software queue filled by scanner_inject().
 */

#include "scanner.h"

/* Placeholder MMIO base for a future PCI / platform device. */
#define SCANNER_MMIO_BASE 0xFEDC0000u
#define SCANNER_REG_STATUS 0x00u
#define SCANNER_REG_DATA   0x04u

static struct scan_event pending;
static bool has_pending;
static bool mmio_present;

static size_t cstr_len(const char *s)
{
    size_t n = 0;
    if (!s)
        return 0;
    while (s[n] != '\0')
        n++;
    return n;
}

static void cstr_copy(char *dst, size_t dst_len, const char *src)
{
    size_t i = 0;
    if (dst_len == 0)
        return;
    if (!src) {
        dst[0] = '\0';
        return;
    }
    while (src[i] != '\0' && i + 1 < dst_len) {
        dst[i] = src[i];
        i++;
    }
    dst[i] = '\0';
}

void scanner_init(void)
{
    volatile uint32_t *status =
        (volatile uint32_t *)(SCANNER_MMIO_BASE + SCANNER_REG_STATUS);

    has_pending = false;
    pending.length = 0;
    pending.symbology = 0;
    pending.code[0] = '\0';

    /*
     * Probe: real silicon would return a non-zero identity. On QEMU this
     * address is unmapped; we treat any access as "absent" and stay in sim.
     * Avoid actually touching the address here to keep QEMU quiet — mark
     * absent until a platform map is provided.
     */
    (void)status;
    mmio_present = false;
}

enum scanner_status scanner_poll(struct scan_event *out)
{
    if (!out)
        return SCANNER_ERROR;

    if (mmio_present) {
        /* Future: drain FIFO from SCANNER_REG_DATA. */
        return SCANNER_EMPTY;
    }

    if (!has_pending)
        return SCANNER_EMPTY;

    *out = pending;
    has_pending = false;
    return SCANNER_OK;
}

void scanner_inject(const char *code)
{
    size_t n = cstr_len(code);
    if (n == 0 || n >= SCANNER_CODE_MAX)
        return;

    cstr_copy(pending.code, SCANNER_CODE_MAX, code);
    pending.length = (uint32_t)n;
    pending.symbology = 0;
    has_pending = true;
}
