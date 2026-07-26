"""High-contrast, tactile UI helpers for rugged terminals and back-office desktops."""

from __future__ import annotations

import sys
from typing import Iterable, List, Optional, Sequence


# ANSI — high contrast utilitarian palette (no purple glow aesthetic)
RESET = "\033[0m"
BOLD = "\033[1m"
DIM = "\033[2m"
FG_BLACK = "\033[30m"
FG_WHITE = "\033[97m"
FG_YELLOW = "\033[93m"
FG_RED = "\033[91m"
FG_GREEN = "\033[92m"
BG_BLACK = "\033[40m"
BG_YELLOW = "\033[43m"
BG_RED = "\033[41m"
BG_GREEN = "\033[42m"
BG_WHITE = "\033[47m"


def _supports_color(stream=None) -> bool:
    stream = stream or sys.stdout
    return hasattr(stream, "isatty") and stream.isatty()


class Banner:
    """Brand-forward header for the Thomas workspace."""

    def __init__(self, store_number: str = "", store_name: str = "", color: bool = True):
        self.store_number = store_number
        self.store_name = store_name
        self.color = color and _supports_color()

    def render(self) -> str:
        width = 64
        title = "THOMAS"
        subtitle = "Retail Ops Assistant — Local First"
        store = f"Store {self.store_number}"
        if self.store_name:
            store = f"{store} · {self.store_name}"

        if self.color:
            bar = f"{BG_YELLOW}{FG_BLACK}{BOLD}{' ' * width}{RESET}"
            line1 = f"{BG_YELLOW}{FG_BLACK}{BOLD}{title.center(width)}{RESET}"
            line2 = f"{BG_BLACK}{FG_WHITE}{subtitle.center(width)}{RESET}"
            line3 = f"{BG_BLACK}{FG_YELLOW}{store.center(width)}{RESET}"
            return "\n".join([bar, line1, line2, line3, bar])

        rule = "=" * width
        return "\n".join([rule, title.center(width), subtitle.center(width), store.center(width), rule])


class StatusLine:
    """Single-purpose status strip for OK / WARN / FAIL states."""

    def __init__(self, color: bool = True):
        self.color = color and _supports_color()

    def ok(self, message: str) -> str:
        return self._paint("OK", message, BG_GREEN, FG_BLACK)

    def warn(self, message: str) -> str:
        return self._paint("WARN", message, BG_YELLOW, FG_BLACK)

    def fail(self, message: str) -> str:
        return self._paint("FAIL", message, BG_RED, FG_WHITE)

    def info(self, message: str) -> str:
        return self._paint("INFO", message, BG_WHITE, FG_BLACK)

    def _paint(self, tag: str, message: str, bg: str, fg: str) -> str:
        if self.color:
            return f"{bg}{fg}{BOLD} {tag} {RESET} {message}"
        return f"[{tag}] {message}"


class HighContrastTable:
    """Wide-column table suited to quick scanning on mobile terminals."""

    def __init__(self, headers: Sequence[str], color: bool = True):
        self.headers = list(headers)
        self.rows: List[List[str]] = []
        self.color = color and _supports_color()

    def add_row(self, values: Sequence[object]) -> None:
        self.rows.append([str(v) for v in values])

    def render(self) -> str:
        cols = len(self.headers)
        widths = [len(h) for h in self.headers]
        for row in self.rows:
            for i in range(cols):
                cell = row[i] if i < len(row) else ""
                widths[i] = max(widths[i], len(cell))

        def fmt(cells: Sequence[str]) -> str:
            parts = []
            for i in range(cols):
                cell = cells[i] if i < len(cells) else ""
                parts.append(cell.ljust(widths[i]))
            return "  ".join(parts)

        header = fmt(self.headers)
        rule = "  ".join("-" * w for w in widths)
        if self.color:
            header = f"{BOLD}{FG_YELLOW}{header}{RESET}"
        body = [fmt(r) for r in self.rows]
        return "\n".join([header, rule, *body]) if body else "\n".join([header, rule, "(empty)"])


class ConfirmPrompt:
    """Explicit verification step to prevent accidental overwrites."""

    def __init__(self, input_fn=input, output_fn=print, color: bool = True):
        self.input_fn = input_fn
        self.output_fn = output_fn
        self.status = StatusLine(color=color)

    def confirm(self, action: str, confirm_word: str = "YES") -> bool:
        self.output_fn(self.status.warn(f"Confirm required: {action}"))
        self.output_fn(f"Type {confirm_word} to proceed, or anything else to cancel.")
        answer = self.input_fn("> ").strip()
        return answer == confirm_word

    def confirm_overwrite(self, target: str) -> bool:
        return self.confirm(f"overwrite {target}", confirm_word="OVERWRITE")


def large_menu(options: Iterable[tuple[str, str]], color: bool = True) -> str:
    """Render large target menu lines: key + label."""
    use_color = color and _supports_color()
    lines = []
    for key, label in options:
        if use_color:
            lines.append(f"  {BG_WHITE}{FG_BLACK}{BOLD} {key} {RESET}  {label}")
        else:
            lines.append(f"  [{key}]  {label}")
    return "\n".join(lines)
