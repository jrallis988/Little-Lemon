/* SwiftScan OS — Multiboot i386 memory layout
 *
 * Physical load at 1 MiB. Multiboot-compliant loaders (GRUB / QEMU -kernel
 * with multiboot) place the ELF here and jump to `_start`.
 */

ENTRY(_start)

SECTIONS
{
    . = 0x00100000;

    .text BLOCK(4K) : ALIGN(4K)
    {
        KEEP(*(.multiboot))
        *(.text*)
    }

    .rodata BLOCK(4K) : ALIGN(4K)
    {
        *(.rodata*)
    }

    .data BLOCK(4K) : ALIGN(4K)
    {
        *(.data*)
    }

    .bss BLOCK(4K) : ALIGN(4K)
    {
        __bss_start = .;
        *(COMMON)
        *(.bss*)
        __bss_end = .;
    }

    /* Kernel end marker for future heap / page-frame allocators */
    __kernel_end = .;
}
