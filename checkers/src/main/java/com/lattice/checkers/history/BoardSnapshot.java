package com.lattice.checkers.history;

import com.lattice.checkers.model.Board;
import com.lattice.checkers.model.GameStatus;
import com.lattice.checkers.model.Side;
import java.util.Objects;

/**
 * Immutable capture of board position for replay and What If branching.
 */
public record BoardSnapshot(Board board, Side sideToMove, GameStatus status, int plyIndex) {

    public BoardSnapshot {
        Objects.requireNonNull(board, "board");
        Objects.requireNonNull(sideToMove, "sideToMove");
        Objects.requireNonNull(status, "status");
        if (plyIndex < 0) {
            throw new IllegalArgumentException("plyIndex must be >= 0");
        }
        // Defensive copy so callers cannot mutate stored history.
        board = board.copy();
    }
}
