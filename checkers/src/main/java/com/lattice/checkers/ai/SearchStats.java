package com.lattice.checkers.ai;

/**
 * Telemetry from a single AI decision — fed to Developer Mode and AI Lab.
 *
 * @param depth              search depth used
 * @param positionsEvaluated nodes visited
 * @param evaluation         score of chosen line (perspective of mover)
 * @param decisionTimeMs     wall-clock decision time
 * @param selectedMoveLabel  e.g. {@code C3 → E5}
 */
public record SearchStats(
        int depth,
        long positionsEvaluated,
        double evaluation,
        long decisionTimeMs,
        String selectedMoveLabel
) {
}
