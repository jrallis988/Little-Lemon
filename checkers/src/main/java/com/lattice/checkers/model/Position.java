package com.lattice.checkers.model;

/**
 * Zero-based board coordinate. Row 0 is the top of the board (dark's back rank
 * in the standard initial layout used by Lattice).
 *
 * <p>Phase 1: coordinate contract only — no movement rules.
 */
public record Position(int row, int col) {

    public static final int BOARD_SIZE = 8;

    public Position {
        if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) {
            throw new IllegalArgumentException(
                    "Position out of bounds: (" + row + ", " + col + ")");
        }
    }

    public boolean isDarkSquare() {
        return (row + col) % 2 == 1;
    }

    public boolean isLightSquare() {
        return !isDarkSquare();
    }
}
