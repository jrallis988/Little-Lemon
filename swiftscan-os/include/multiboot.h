#ifndef SWIFTSCAN_MULTIBOOT_H
#define SWIFTSCAN_MULTIBOOT_H

#include "types.h"

#define MULTIBOOT_BOOTLOADER_MAGIC 0x2BADB002u

#define MULTIBOOT_INFO_MEMORY      (1u << 0)
#define MULTIBOOT_INFO_CMDLINE     (1u << 2)
#define MULTIBOOT_INFO_MODS        (1u << 3)
#define MULTIBOOT_INFO_FRAMEBUFFER (1u << 12)

struct multiboot_info {
    uint32_t flags;
    uint32_t mem_lower;
    uint32_t mem_upper;
    uint32_t boot_device;
    uint32_t cmdline;
    uint32_t mods_count;
    uint32_t mods_addr;
    uint32_t syms[4];
    uint32_t mmap_length;
    uint32_t mmap_addr;
    uint32_t drives_length;
    uint32_t drives_addr;
    uint32_t config_table;
    uint32_t boot_loader_name;
    uint32_t apm_table;
    uint32_t vbe_control_info;
    uint32_t vbe_mode_info;
    uint16_t vbe_mode;
    uint16_t vbe_interface_seg;
    uint16_t vbe_interface_off;
    uint16_t vbe_interface_len;
    uint64_t framebuffer_addr;
    uint32_t framebuffer_pitch;
    uint32_t framebuffer_width;
    uint32_t framebuffer_height;
    uint8_t  framebuffer_bpp;
    uint8_t  framebuffer_type;
    uint8_t  reserved;
} __attribute__((packed));

#endif /* SWIFTSCAN_MULTIBOOT_H */
