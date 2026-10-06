#ifndef TIMER_H
#define TIMER_H

#define TIMER_HZ 100

void init_pit(unsigned int frequency);
void irq0_handler(void);
unsigned int get_ticks(void);
void sleep_ms(unsigned int ms);

#endif
