package com.lattice.checkers.history;

import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * Append-only main-line history with reconstruction helpers.
 * What If branches are separate {@link com.lattice.checkers.analysis.WhatIfSession}s
 * and must not overwrite this log.
 *
 * <p>Phase 1: storage shell only.
 */
public final class GameHistory {

    private final List<MoveRecord> records = new ArrayList<>();
    private BoardSnapshot initial;

    public void clear() {
        records.clear();
        initial = null;
    }

    public void setInitial(BoardSnapshot initial) {
        if (!records.isEmpty()) {
            throw new IllegalStateException("cannot replace initial snapshot after moves exist");
        }
        this.initial = initial;
    }

    public Optional<BoardSnapshot> initial() {
        return Optional.ofNullable(initial);
    }

    public void append(MoveRecord record) {
        records.add(record);
    }

    public List<MoveRecord> records() {
        return Collections.unmodifiableList(records);
    }

    public int size() {
        return records.size();
    }

    public GameState reconstruct(int plyIndex) {
        throw new UnsupportedOperationException("Phase 9: reconstruct position at ply");
    }

    public void recordMove(GameState before, Move move, GameState after) {
        throw new UnsupportedOperationException("Phase 9: record move + snapshot");
    }
}
