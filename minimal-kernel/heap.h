#ifndef HEAP_H
#define HEAP_H

/*
 * Physical memory layout (identity-mapped freestanding kernel):
 *
 *   0x00007C00  MBR boot sector (loaded by BIOS)
 *   0x00001000  Kernel image (bootloader load address)
 *   0x00010000  HEAP_START  — bump allocator grows upward
 *   0x00080000  HEAP_END    — exclusive upper bound
 *   0x00090000  Kernel stack top (see 32bit_switch.asm)
 *   0x000B8000  VGA text buffer
 */

#define HEAP_START 0x00010000u
#define HEAP_END   0x00080000u
#define HEAP_ALIGN 8u

void init_heap(void);
void* kmalloc(unsigned int size);
void kfree(void* ptr); /* LIFO: only frees the most recent kmalloc block */
unsigned int heap_used(void);

#endif
