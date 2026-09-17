#ifndef SWIFTSCAN_SCANNER_H
#define SWIFTSCAN_SCANNER_H

#include "types.h"

/* Bi-optic scanner peripheral — serial / USB-HID wedge style byte stream. */
#define MAX_BARCODE_LENGTH 32
#define SCANNER_CODE_MAX   MAX_BARCODE_LENGTH

/* Simulated hardware port registers for serial / USB-HID device polling. */
#define SCANNER_PORT_STATUS 0x3F8
#define SCANNER_PORT_DATA   0x3F9

void scanner_init(void);

/* Check if a new character/byte is ready from the bi-optic scanner. */
int scanner_data_ready(void);

/* Read the next incoming byte from the scanner stream. */
char scanner_read_byte(void);

/*
 * Poll scanner state and assemble complete UPC/barcode strings.
 * Returns pointer to completed scan, or NULL if no full packet yet.
 */
const char *scanner_poll(void);

/* QEMU / host test hook: enqueue a barcode + CR into the RX path. */
void scanner_inject(const char *code);

#endif /* SWIFTSCAN_SCANNER_H */
