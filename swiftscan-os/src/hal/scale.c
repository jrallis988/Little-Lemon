/*
 * Load-cell scale HAL
 *
 * Real hardware: ADC samples → filtered grams. QEMU: software milligram
 * register with a short settle counter to model mechanical damping.
 */

#include "scale.h"

#define SCALE_SAMPLE_HZ 80u
#define SCALE_SETTLE_TICKS 8u

static int32_t raw_mg;
static int32_t tare_mg;
static uint32_t settle;
static bool faulted;

void scale_init(void)
{
    raw_mg = 0;
    tare_mg = 0;
    settle = 0;
    faulted = false;
}

enum scale_status scale_read(struct scale_reading *out)
{
    if (!out)
        return SCALE_FAULT;

    if (faulted)
        return SCALE_FAULT;

    out->milligrams = raw_mg - tare_mg;
    out->sample_hz = SCALE_SAMPLE_HZ;

    if (settle > 0) {
        settle--;
        out->stable = false;
        return SCALE_UNSTABLE;
    }

    out->stable = true;
    return SCALE_OK;
}

void scale_tare(void)
{
    tare_mg = raw_mg;
    settle = SCALE_SETTLE_TICKS;
}

void scale_inject_mg(int32_t milligrams)
{
    raw_mg = milligrams;
    settle = SCALE_SETTLE_TICKS;
}
