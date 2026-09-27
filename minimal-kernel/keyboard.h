#ifndef KEYBOARD_H
#define KEYBOARD_H

void init_keyboard(void);
void irq1_handler(void);
char get_key(void);

#endif
