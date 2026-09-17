#ifndef SWIFTSCAN_SCALE_H
#define SWIFTSCAN_SCALE_H

#include "types.h"

/* Load-cell weighing scale — port-mapped controller interface. */
#define SCALE_PORT_STATUS 0x3FA
#define SCALE_PORT_DATA   0x3FB

void scale_init(void);

/* Check if the scale has weight data ready to read. */
int scale_data_ready(void);

/* Read raw weight value from the scale platform registers (grams). */
uint32_t scale_read_weight_grams(void);

/* Check if the weight on the bagging scale is stable (no motion). */
int scale_is_stable(void);

/* Zero/tare at the current load (soft path + HW command hook). */
void scale_tare(void);

/* QEMU / host test hook: set simulated platform weight in grams. */
void scale_inject_grams(uint32_t grams);

#endif /* SWIFTSCAN_SCALE_H */
