#include "ports.h"

unsigned char inb(unsigned short port) {
    unsigned char result;
    __asm__ volatile("inb %1, %0" : "=a"(result) : "Nd"(port));
    return result;
}

void outb(unsigned short port, unsigned char data) {
    __asm__ volatile("outb %0, %1" : : "a"(data), "Nd"(port));
}

unsigned int read_cr2(void) {
    unsigned int value;
    __asm__ volatile("mov %%cr2, %0" : "=r"(value));
    return value;
}
