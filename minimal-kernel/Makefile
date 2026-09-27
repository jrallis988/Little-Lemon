# Minimal Custom Kernel & Boot Sector
# Build an MBR image and run it under QEMU.

CC      = gcc
LD      = ld
NASM    = nasm
CFLAGS  = -m32 -ffreestanding -fno-pie -fno-stack-protector -nostdlib -Wall -Wextra
LDFLAGS = -m elf_i386 -Ttext 0x1000 --oformat binary

.PHONY: all run clean verify

all: os-image.bin

kernel.o: kernel.c
	$(CC) $(CFLAGS) -c kernel.c -o kernel.o

kernel_entry.o: kernel_entry.asm
	$(NASM) kernel_entry.asm -f elf -o kernel_entry.o

kernel.bin: kernel_entry.o kernel.o
	$(LD) -o kernel.bin $(LDFLAGS) kernel_entry.o kernel.o

boot.bin: boot.asm disk_load.asm gdt.asm 32bit_switch.asm
	$(NASM) boot.asm -f bin -o boot.bin

os-image.bin: boot.bin kernel.bin
	cat boot.bin kernel.bin > os-image.bin

run: os-image.bin
	qemu-system-i386 -drive format=raw,file=os-image.bin,if=floppy -boot a

# Headless smoke test: boot and dump VGA text memory via the QEMU monitor.
verify: os-image.bin
	@./verify.sh

clean:
	rm -f *.bin *.o
