/*
 * Swift Scan OS — Load-Cell Weighing Scale Peripheral Driver
 *
 * Port-mapped controller at SCALE_PORT_STATUS / SCALE_PORT_DATA.
 * Status bit0 = data ready, bit1 = stable. Data port yields a 16-bit
 * little-endian weight in grams across two consecutive reads.
 *
 * Hardware inb path: compile with -DSWIFTSCAN_SCALE_HW.
 * QEMU: soft registers filled by scale_inject_grams().
 */

#include "scale.h"

#define SCALE_SETTLE_TICKS 8u

#if defined(SWIFTSCAN_SCALE_HW)
static inline uint8_t scale_inb(unsigned short port)
{
    uint8_t ret;
    __asm__ volatile("inb %1, %0" : "=a"(ret) : "Nd"(port));
    return ret;
}
#endif

/* Soft controller state for QEMU / inject path. */
static uint32_t soft_grams;
static uint32_t soft_tare_grams;
static uint32_t soft_settle;
static int soft_ready;
static int soft_stable;
static int soft_byte_phase; /* 0 = next read is low, 1 = high */

void scale_init(void)
{
    soft_grams = 0;
    soft_tare_grams = 0;
    soft_settle = 0;
    soft_ready = 0;
    soft_stable = 0;
    soft_byte_phase = 0;
    /* HW: send reset/tare command bytes to scale controller if required. */
}

int scale_data_ready(void)
{
#if defined(SWIFTSCAN_SCALE_HW)
    return (scale_inb(SCALE_PORT_STATUS) & 0x01) != 0;
#else
    if (soft_settle > 0) {
        soft_settle--;
        soft_stable = 0;
        soft_ready = 1; /* weight available but not yet marked stable */
    } else if (soft_ready) {
        soft_stable = 1;
    }
    return soft_ready;
#endif
}

uint32_t scale_read_weight_grams(void)
{
    uint32_t low_byte;
    uint32_t high_byte;
    uint32_t weight_grams;

    if (!scale_data_ready())
        return 0;

#if defined(SWIFTSCAN_SCALE_HW)
    low_byte = scale_inb(SCALE_PORT_DATA);
    high_byte = scale_inb(SCALE_PORT_DATA);
    weight_grams = (high_byte << 8) | low_byte;
    return weight_grams;
#else
    {
        uint32_t net = soft_grams - soft_tare_grams;
        /* Expose as two-byte LE packet across sequential reads if desired;
         * for the soft path return the assembled net weight directly. */
        (void)soft_byte_phase;
        low_byte = net & 0xFFu;
        high_byte = (net >> 8) & 0xFFu;
        weight_grams = (high_byte << 8) | low_byte;
        return weight_grams;
    }
#endif
}

int scale_is_stable(void)
{
#if defined(SWIFTSCAN_SCALE_HW)
    return (scale_inb(SCALE_PORT_STATUS) & 0x02) != 0;
#else
    (void)scale_data_ready(); /* advance settle model */
    return soft_stable;
#endif
}

void scale_tare(void)
{
    soft_tare_grams = soft_grams;
    soft_settle = SCALE_SETTLE_TICKS;
    soft_stable = 0;
    soft_ready = 1;
}

void scale_inject_grams(uint32_t grams)
{
    soft_grams = grams;
    soft_settle = SCALE_SETTLE_TICKS;
    soft_stable = 0;
    soft_ready = 1;
    soft_byte_phase = 0;
}
