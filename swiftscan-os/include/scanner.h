#ifndef SWIFTSCAN_SCANNER_H
#define SWIFTSCAN_SCANNER_H

#include "types.h"

#define SCANNER_CODE_MAX 64

enum scanner_status {
    SCANNER_OK = 0,
    SCANNER_EMPTY,
    SCANNER_ERROR
};

struct scan_event {
    char     code[SCANNER_CODE_MAX];
    uint32_t length;
    uint32_t symbology; /* 0 = unknown / simulated UPC-A */
};

/* Probe MMIO / port map; fall back to QEMU simulation queue. */
void scanner_init(void);

/* Non-blocking: returns SCANNER_EMPTY when no barcode is pending. */
enum scanner_status scanner_poll(struct scan_event *out);

/* Inject a simulated barcode (QEMU / host test hook). */
void scanner_inject(const char *code);

#endif /* SWIFTSCAN_SCANNER_H */
