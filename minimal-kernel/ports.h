#ifndef PORTS_H
#define PORTS_H

unsigned char inb(unsigned short port);
void outb(unsigned short port, unsigned char data);
unsigned int read_cr2(void);

#endif
