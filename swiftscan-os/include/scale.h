#ifndef SWIFTSCAN_SCALE_H
#define SWIFTSCAN_SCALE_H

#include "types.h"

enum scale_status {
    SCALE_OK = 0,
    SCALE_UNSTABLE,
    SCALE_FAULT
};

struct scale_reading {
    int32_t  milligrams; /* signed; negative means under-range / tare error */
    uint32_t sample_hz;
    bool     stable;
};

void scale_init(void);

/* Read current load-cell estimate (simulated in QEMU). */
enum scale_status scale_read(struct scale_reading *out);

/* Zero the scale at the current load. */
void scale_tare(void);

/* Host/QEMU test hook: set simulated weight in milligrams. */
void scale_inject_mg(int32_t milligrams);

#endif /* SWIFTSCAN_SCALE_H */
