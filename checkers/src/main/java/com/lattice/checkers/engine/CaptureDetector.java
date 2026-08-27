package com.lattice.checkers.engine;

import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Position;
import com.lattice.checkers.model.Side;
import java.util.List;

/**
 * Detects single and multi-jump capture opportunities.
 */
public final class CaptureDetector {

    public boolean hasCapture(GameState state, Side side) {
        throw new UnsupportedOperationException("Phase 3: capture existence");
    }

    public List<Move> findCaptures(GameState state, Side side) {
        throw new UnsupportedOperationException("Phase 3: find all captures");
    }

    public List<Move> findCapturesFrom(GameState state, Position from) {
        throw new UnsupportedOperationException("Phase 3: find captures from square");
    }
}
