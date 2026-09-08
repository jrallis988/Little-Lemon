package com.lattice.checkers.engine;

import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import java.util.List;
import java.util.Objects;

/**
 * Validates a candidate move against current rules (including mandatory capture).
 */
public final class MoveValidator {

    private final MoveGenerator moveGenerator;

    public MoveValidator(MoveGenerator moveGenerator) {
        this.moveGenerator = Objects.requireNonNull(moveGenerator);
    }

    public boolean isLegal(GameState state, Move move) {
        Objects.requireNonNull(state);
        Objects.requireNonNull(move);
        List<Move> legal = moveGenerator.generateLegalMoves(state, state.sideToMove());
        for (Move candidate : legal) {
            if (sameMove(candidate, move)) {
                return true;
            }
        }
        return false;
    }

    private static boolean sameMove(Move a, Move b) {
        return a.from().equals(b.from()) && a.path().equals(b.path());
    }

    MoveGenerator moveGenerator() {
        return moveGenerator;
    }
}
