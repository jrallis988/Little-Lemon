package com.lattice.checkers.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

/**
 * Lightweight Phase 1 smoke tests for model value types.
 * Full rules coverage begins in Phase 4.
 */
class PositionTest {

    @Test
    void darkSquareConvention() {
        assertTrue(new Position(0, 1).isDarkSquare());
        assertFalse(new Position(0, 0).isDarkSquare());
    }

    @Test
    void rejectsOutOfBounds() {
        assertThrows(IllegalArgumentException.class, () -> new Position(-1, 0));
        assertThrows(IllegalArgumentException.class, () -> new Position(0, 8));
    }

    @Test
    void sideOpposite() {
        assertEquals(Side.LIGHT, Side.DARK.opposite());
        assertEquals(Side.DARK, Side.LIGHT.opposite());
    }
}
