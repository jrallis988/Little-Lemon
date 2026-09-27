; Ensures the binary entry at 0x1000 calls into C main().
; Linked ahead of kernel.o so the first instruction is this stub.

[bits 32]
[global _start]
[extern main]
_start:
    call main
    jmp $
