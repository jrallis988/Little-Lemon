/*
 * Swift Scan OS — Bi-Optic Scanner Peripheral Driver
 *
 * Polls a serial / USB-HID wedge style byte stream, assembling UPC packets
 * terminated by CR/LF. Hardware uses SCANNER_PORT_STATUS / SCANNER_PORT_DATA
 * (enable with -DSWIFTSCAN_SCANNER_HW). QEMU uses a soft RX FIFO filled by
 * scanner_inject() so floating I/O ports are never polled by default.
 */

#include "scanner.h"

static char current_barcode[MAX_BARCODE_LENGTH];
static int barcode_index;

/* Soft RX ring — models bytes arriving from the bi-optic decode engine. */
#define RX_QUEUE_SIZE 128
static uint8_t rx_queue[RX_QUEUE_SIZE];
static unsigned rx_head;
static unsigned rx_tail;
static unsigned rx_count;

#if defined(SWIFTSCAN_SCANNER_HW)
static inline uint8_t inb(unsigned short port)
{
    uint8_t ret;
    __asm__ volatile("inb %1, %0" : "=a"(ret) : "Nd"(port));
    return ret;
}
#endif

static void rx_push(uint8_t b)
{
    if (rx_count >= RX_QUEUE_SIZE)
        return;
    rx_queue[rx_tail] = b;
    rx_tail = (rx_tail + 1u) % RX_QUEUE_SIZE;
    rx_count++;
}

static int rx_pop(uint8_t *out)
{
    if (rx_count == 0)
        return 0;
    *out = rx_queue[rx_head];
    rx_head = (rx_head + 1u) % RX_QUEUE_SIZE;
    rx_count--;
    return 1;
}

void scanner_init(void)
{
    int i;

    barcode_index = 0;
    rx_head = 0;
    rx_tail = 0;
    rx_count = 0;

    for (i = 0; i < MAX_BARCODE_LENGTH; i++)
        current_barcode[i] = '\0';
}

int scanner_data_ready(void)
{
    if (rx_count > 0)
        return 1;

#if defined(SWIFTSCAN_SCANNER_HW)
    /* Status register bit 0 = incoming data ready. */
    return (inb(SCANNER_PORT_STATUS) & 0x01) != 0;
#else
    return 0;
#endif
}

char scanner_read_byte(void)
{
    uint8_t b;

    if (rx_pop(&b))
        return (char)b;

#if defined(SWIFTSCAN_SCANNER_HW)
    return (char)inb(SCANNER_PORT_DATA);
#else
    return '\0';
#endif
}

const char *scanner_poll(void)
{
    while (scanner_data_ready()) {
        char c = scanner_read_byte();

        /* Carriage return or newline ends a barcode scan packet. */
        if (c == '\n' || c == '\r') {
            if (barcode_index > 0) {
                current_barcode[barcode_index] = '\0';
                barcode_index = 0;
                return current_barcode;
            }
        } else if (barcode_index < MAX_BARCODE_LENGTH - 1) {
            current_barcode[barcode_index++] = c;
        }
    }
    return (const char *)0;
}

void scanner_inject(const char *code)
{
    size_t i;

    if (!code)
        return;

    for (i = 0; code[i] != '\0'; i++)
        rx_push((uint8_t)code[i]);
    rx_push((uint8_t)'\n');
}
