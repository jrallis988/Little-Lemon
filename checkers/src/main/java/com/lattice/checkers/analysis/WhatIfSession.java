package com.lattice.checkers.analysis;

import com.lattice.checkers.history.BoardSnapshot;
import com.lattice.checkers.history.GameHistory;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import java.util.Objects;

/**
 * Exploratory branch from an earlier position. Never mutates the original match history.
 */
public final class WhatIfSession {

    private final BoardSnapshot branchPoint;
    private final GameHistory branchHistory;
    private GameState current;

    public WhatIfSession(BoardSnapshot branchPoint, GameState startingState) {
        this.branchPoint = Objects.requireNonNull(branchPoint);
        this.current = Objects.requireNonNull(startingState).copy();
        this.branchHistory = new GameHistory();
        this.branchHistory.setInitial(branchPoint);
    }

    public BoardSnapshot branchPoint() {
        return branchPoint;
    }

    public GameHistory branchHistory() {
        return branchHistory;
    }

    public GameState current() {
        return current;
    }

    public void tryMove(Move move) {
        throw new UnsupportedOperationException("Phase 10: apply move on What If branch");
    }
}
