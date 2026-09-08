package com.lattice.checkers.analysis;

import com.lattice.checkers.history.GameHistory;
import com.lattice.checkers.history.MoveRecord;
import java.util.List;
import java.util.Optional;

/**
 * Detects notable moments: first capture, promotions, major exchanges, swings.
 */
public final class TurningPointDetector {

    public Optional<MoveRecord> firstCapture(GameHistory history) {
        throw new UnsupportedOperationException("Phase 10: first capture");
    }

    public List<MoveRecord> promotions(GameHistory history) {
        throw new UnsupportedOperationException("Phase 10: promotions");
    }

    public Optional<MoveRecord> primaryTurningPoint(GameHistory history) {
        throw new UnsupportedOperationException("Phase 10: turning point detection");
    }
}
