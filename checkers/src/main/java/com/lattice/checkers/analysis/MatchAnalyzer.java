package com.lattice.checkers.analysis;

import com.lattice.checkers.history.GameHistory;
import java.util.List;
import java.util.Objects;

/**
 * Post-match analytics. Every statistic must be computed from {@link GameHistory}.
 */
public final class MatchAnalyzer {

    private final TurningPointDetector turningPointDetector;

    public MatchAnalyzer() {
        this.turningPointDetector = new TurningPointDetector();
    }

    public MatchAnalyzer(TurningPointDetector turningPointDetector) {
        this.turningPointDetector = Objects.requireNonNull(turningPointDetector);
    }

    public MatchReport analyze(GameHistory history) {
        throw new UnsupportedOperationException("Phase 10: match analysis");
    }

    public List<MoveAnalysis> moveAnalyses(GameHistory history) {
        throw new UnsupportedOperationException("Phase 10: per-move analysis");
    }

    TurningPointDetector turningPointDetector() {
        return turningPointDetector;
    }

    /**
     * Aggregate report placeholder for Phase 10.
     *
     * @param totalMoves      plies played
     * @param capturesDark    captures by dark
     * @param capturesLight   captures by light
     * @param kingsDark       kings created by dark
     * @param kingsLight      kings created by light
     */
    public record MatchReport(
            int totalMoves,
            int capturesDark,
            int capturesLight,
            int kingsDark,
            int kingsLight
    ) {
    }
}
