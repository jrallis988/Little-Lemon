#ifndef KEYBOARD_H
#define KEYBOARD_H

void init_keyboard(void);
void irq1_handler(void);
char try_get_key(void);
char get_key(void);

#endif
