#ifndef SWIFTSCAN_TYPES_H
#define SWIFTSCAN_TYPES_H

/* Freestanding integer types — no hosted <stdint.h>. */

typedef unsigned char      uint8_t;
typedef unsigned short     uint16_t;
typedef unsigned int       uint32_t;
typedef unsigned long long uint64_t;

typedef signed char        int8_t;
typedef signed short       int16_t;
typedef signed int         int32_t;
typedef signed long long   int64_t;

typedef uint32_t size_t;
typedef int32_t  ssize_t;

#ifndef NULL
#define NULL ((void *)0)
#endif

#ifndef bool
typedef _Bool bool;
#define true  1
#define false 0
#endif

#endif /* SWIFTSCAN_TYPES_H */
