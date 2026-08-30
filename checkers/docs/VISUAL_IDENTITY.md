# Lattice — Visual Identity (Phase 1)

One fixed visual system. No themes, skins, or appearance pickers.

## Intent

Modern, minimal, precise, premium, product-oriented.
The board is the hero. Typography and hierarchy carry secondary information.

## Explicitly avoided

- Fake wood / green felt / casino styling
- Stereotypical red-and-black checkers
- Children’s-toy aesthetics
- Excessive gradients, glow, and multi-layer shadows
- Purple-on-white / purple-indigo “AI default” looks
- Selectable alternate themes

## Direction: “Graphite Lattice”

| Token | Role | Working value (CSS later) |
| --- | --- | --- |
| `--surface` | App chrome | Near-black graphite `#12141A` |
| `--surface-raised` | Panels | `#1A1D26` |
| `--board-dark` | Dark squares | `#2A303C` |
| `--board-light` | Light squares | `#C8CED8` |
| `--piece-dark` | Dark pieces | Deep ink `#0E1016` + light rim |
| `--piece-light` | Light pieces | Warm porcelain `#E8E2D6` + ink rim |
| `--signal` | Selection / focus / CTA | Muted amber `#D4A15A` |
| `--signal-soft` | Legal-move wash | Amber at low opacity |
| `--danger` | Forced capture cue | Coral `#E07060` (paired with pattern/icon) |
| `--text` | Primary copy | `#F2F3F5` |
| `--text-muted` | Secondary | `#9AA3B2` |

Players are distinguished by **fill + rim + optional glyph**, never by hue alone.

## Kings

A man is one disc. A king is **two stacked discs** (physical checkers metaphor).
No crown icon. The stacked form is part of the brand mark.

## Motion

Subtle piece travel and selection emphasis only.
Honor reduced-motion preferences; Focus/X-Ray prefer opacity/contrast over animation.

## Typography (later)

Pair a precise geometric sans for UI chrome with a restrained display face for
product wordmark (“Lattice”). Avoid Inter / Roboto / Arial / system-ui as the
primary brand voice.
