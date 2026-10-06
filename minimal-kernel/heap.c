#include "heap.h"

static unsigned char* heap_cur;
static unsigned char* last_block;

static unsigned int align_up(unsigned int n) {
    return (n + (HEAP_ALIGN - 1u)) & ~(HEAP_ALIGN - 1u);
}

void init_heap(void) {
    heap_cur = (unsigned char*)HEAP_START;
    last_block = 0;
}

void* kmalloc(unsigned int size) {
    unsigned int total;
    unsigned char* block;

    if (size == 0) {
        return 0;
    }

    total = align_up(size);
    if (heap_cur + total > (unsigned char*)HEAP_END) {
        return 0; /* out of heap */
    }

    block = heap_cur;
    heap_cur += total;
    last_block = block;
    return block;
}

void kfree(void* ptr) {
    /* Bump allocator: only the most recently allocated block can be freed. */
    if (ptr != 0 && ptr == (void*)last_block) {
        heap_cur = last_block;
        last_block = 0;
    }
}

unsigned int heap_used(void) {
    return (unsigned int)(heap_cur - (unsigned char*)HEAP_START);
}
