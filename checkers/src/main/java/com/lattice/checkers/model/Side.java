package com.lattice.checkers.model;

/**
 * Playing side. Named by shade rather than "red/black" so UI can use the
 * Graphite Lattice palette without implying stereotypical checkers colors.
 *
 * <p>Accessibility: sides must also be distinguishable by rim/glyph, not hue alone.
 */
public enum Side {
    DARK,
    LIGHT;

    public Side opposite() {
        return this == DARK ? LIGHT : DARK;
    }
}
