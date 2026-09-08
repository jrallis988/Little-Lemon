package com.lattice.checkers.score;

/**
 * Configurable point values. UI must not hard-code these.
 */
public record ScoreTable(
        int capture,
        int kingCapture,
        int kingPromotion,
        int extraJumpBonus,
        int matchWin
) {
    public static ScoreTable standard() {
        return new ScoreTable(100, 150, 250, 50, 500);
    }
}
