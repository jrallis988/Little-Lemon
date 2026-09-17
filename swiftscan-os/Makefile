# SwiftScan OS — freestanding Multiboot i386 build & QEMU launcher

TARGET   := swiftscan
BUILD    := build
ISO_DIR  := $(BUILD)/isodir
ISO      := $(BUILD)/$(TARGET).iso
KERNEL   := $(BUILD)/$(TARGET).bin

AS       := nasm
CC       := gcc
LD       := ld

ASFLAGS  := -f elf32
CFLAGS   := -m32 -std=c11 -ffreestanding -fno-builtin -fno-stack-protector \
            -fno-pic -fno-pie -Wall -Wextra -Werror -O2 -Iinclude
LDFLAGS  := -m elf_i386 -T linker.ld -nostdlib -z noexecstack

ASM_SRC  := src/boot/boot.asm
C_SRC    := src/kernel/kernel.c \
            src/hal/scanner.c \
            src/hal/scale.c \
            src/ui/framebuffer.c

ASM_OBJ  := $(BUILD)/boot.o
C_OBJ    := $(patsubst src/%.c,$(BUILD)/%.o,$(C_SRC))
OBJS     := $(ASM_OBJ) $(C_OBJ)

QEMU     := qemu-system-i386
QEMUFLAGS := -kernel $(KERNEL) -serial stdio -display none -no-reboot -no-shutdown

.PHONY: all clean run iso dirs tree

all: dirs $(KERNEL)

dirs:
	@mkdir -p $(BUILD)/kernel $(BUILD)/hal $(BUILD)/ui $(BUILD)/boot

$(ASM_OBJ): $(ASM_SRC) | dirs
	$(AS) $(ASFLAGS) $< -o $@

$(BUILD)/%.o: src/%.c | dirs
	@mkdir -p $(dir $@)
	$(CC) $(CFLAGS) -c $< -o $@

$(KERNEL): $(OBJS) linker.ld
	$(LD) $(LDFLAGS) -o $@ $(OBJS)

iso: $(KERNEL)
	@mkdir -p $(ISO_DIR)/boot/grub
	cp $(KERNEL) $(ISO_DIR)/boot/$(TARGET).bin
	printf 'set timeout=0\nset default=0\ninsmod all_video\nset gfxpayload=800x600x32\nmenuentry "SwiftScan OS" {\n  multiboot /boot/$(TARGET).bin\n  boot\n}\n' \
		> $(ISO_DIR)/boot/grub/grub.cfg
	grub-mkrescue -o $(ISO) $(ISO_DIR)

# Headless Multiboot smoke test (prefers ISO so GRUB can set 800x600x32).
run: iso
	timeout 4 $(QEMU) -cdrom $(ISO) -display none -no-reboot -no-shutdown || true

# Interactive graphical session (requires a display).
run-vga: iso
	$(QEMU) -cdrom $(ISO) -serial stdio

tree:
	@find . -path ./build -prune -o -path ./.git -prune -o -print | sort

clean:
	rm -rf $(BUILD)
