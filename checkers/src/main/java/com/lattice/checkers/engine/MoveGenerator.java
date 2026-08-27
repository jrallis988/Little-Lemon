package com.lattice.checkers.engine;

import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Position;
import com.lattice.checkers.model.Side;
import java.util.List;

/**
 * Generates candidate and legal moves. Honors mandatory captures when wired in Phase 3.
 */
public final class MoveGenerator {

    private final CaptureDetector captureDetector;

    public MoveGenerator(CaptureDetector captureDetector) {
        this.captureDetector = captureDetector;
    }

    public List<Move> generateLegalMoves(GameState state, Side side) {
        throw new UnsupportedOperationException("Phase 3: generate legal moves");
    }

    public List<Move> generateMovesFrom(GameState state, Position from) {
        throw new UnsupportedOperationException("Phase 3: generate moves from square");
    }

    CaptureDetector captureDetector() {
        return captureDetector;
    }
}
