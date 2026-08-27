package com.lattice.checkers.engine;

import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;

/**
 * Validates a candidate move against current rules (including mandatory capture).
 */
public final class MoveValidator {

    private final MoveGenerator moveGenerator;

    public MoveValidator(MoveGenerator moveGenerator) {
        this.moveGenerator = moveGenerator;
    }

    public boolean isLegal(GameState state, Move move) {
        throw new UnsupportedOperationException("Phase 3: validate move");
    }

    MoveGenerator moveGenerator() {
        return moveGenerator;
    }
}
