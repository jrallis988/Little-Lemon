"""Thomas UI: distraction-free terminal and tactile components."""

from .terminal import ThomasTerminal
from .components import Banner, ConfirmPrompt, HighContrastTable, StatusLine

__all__ = [
    "ThomasTerminal",
    "Banner",
    "ConfirmPrompt",
    "HighContrastTable",
    "StatusLine",
]
