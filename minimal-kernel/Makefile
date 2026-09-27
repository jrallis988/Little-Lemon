# Minimal Custom Kernel & Boot Sector
# Build an MBR image and run it under QEMU.

CC      = gcc
LD      = ld
NASM    = nasm
CFLAGS  = -m32 -ffreestanding -fno-pie -fno-stack-protector -nostdlib -Wall -Wextra
LDFLAGS = -m elf_i386 -Ttext 0x1000 --oformat binary

KERNEL_OBJS = kernel_entry.o interrupt.o ports.o idt.o keyboard.o kernel.o

# disk_load.asm reads this many sectors after the MBR
KERNEL_SECTORS = 40

.PHONY: all run clean verify

all: os-image.bin

ports.o: ports.c ports.h
	$(CC) $(CFLAGS) -c ports.c -o ports.o

idt.o: idt.c idt.h ports.h
	$(CC) $(CFLAGS) -c idt.c -o idt.o

keyboard.o: keyboard.c keyboard.h ports.h
	$(CC) $(CFLAGS) -c keyboard.c -o keyboard.o

kernel.o: kernel.c idt.h keyboard.h ports.h
	$(CC) $(CFLAGS) -c kernel.c -o kernel.o

kernel_entry.o: kernel_entry.asm
	$(NASM) kernel_entry.asm -f elf -o kernel_entry.o

interrupt.o: interrupt.asm
	$(NASM) interrupt.asm -f elf -o interrupt.o

kernel.bin: $(KERNEL_OBJS)
	$(LD) -o kernel.bin $(LDFLAGS) $(KERNEL_OBJS)

boot.bin: boot.asm disk_load.asm gdt.asm 32bit_switch.asm
	$(NASM) boot.asm -f bin -o boot.bin

os-image.bin: boot.bin kernel.bin
	cat boot.bin kernel.bin > os-image.bin
	@# Pad so BIOS reads of KERNEL_SECTORS never run past the image.
	@size=$$(wc -c < os-image.bin); \
	 min=$$(( (1 + $(KERNEL_SECTORS)) * 512 )); \
	 if [ $$size -lt $$min ]; then truncate -s $$min os-image.bin; fi

run: os-image.bin
	qemu-system-i386 -drive format=raw,file=os-image.bin,if=floppy -boot a

verify: os-image.bin
	@./verify.sh

clean:
	rm -f *.bin *.o
