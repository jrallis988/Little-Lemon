; Load kernel from disk into memory at KERNEL_OFFSET.
; Uses BIOS interrupt 0x13 (AH=0x02: read sectors).

[bits 16]

load_kernel:
    mov bx, KERNEL_OFFSET ; ES:BX = destination buffer
    mov dh, 40            ; Number of sectors to read (enough for kernel)
    mov dl, [BOOT_DRIVE]  ; Drive number saved by bootloader
    call disk_load
    ret

; disk_load: read DH sectors into ES:BX from drive DL, starting at sector 2
disk_load:
    pusha
    push dx               ; Save requested sector count for later check

    mov ah, 0x02          ; BIOS read sectors
    mov al, dh            ; Number of sectors
    mov ch, 0x00          ; Cylinder 0
    mov dh, 0x00          ; Head 0
    mov cl, 0x02          ; Start at sector 2 (sector 1 is the boot sector)

    int 0x13              ; BIOS disk services
    jc disk_error         ; Carry set on error

    pop dx
    cmp dh, al            ; AL = sectors actually read
    jne sectors_error
    popa
    ret

disk_error:
    mov bx, DISK_ERROR_MSG
    call print_string
    jmp $

sectors_error:
    mov bx, SECTORS_ERROR_MSG
    call print_string
    jmp $

print_string:
    pusha
    mov ah, 0x0e          ; Teletype output
.loop:
    mov al, [bx]
    cmp al, 0
    je .done
    int 0x10
    inc bx
    jmp .loop
.done:
    popa
    ret

DISK_ERROR_MSG db "Disk read error!", 0
SECTORS_ERROR_MSG db "Incorrect number of sectors read!", 0
