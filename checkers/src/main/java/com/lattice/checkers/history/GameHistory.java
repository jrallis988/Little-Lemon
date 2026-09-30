package com.lattice.checkers.history;

import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Piece;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * Append-only main-line history with reconstruction helpers.
 * What If branches are separate {@link com.lattice.checkers.analysis.WhatIfSession}s
 * and must not overwrite this log.
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

    /**
     * Position after {@code plyIndex} recorded plies. {@code 0} is the opening setup.
     */
    public GameState reconstruct(int plyIndex) {
        if (plyIndex < 0 || plyIndex > records.size()) {
            throw new IllegalArgumentException("plyIndex must be between 0 and " + records.size());
        }
        BoardSnapshot snapshot = plyIndex == 0
                ? initial
                : records.get(plyIndex - 1).after();
        if (snapshot == null) {
            throw new IllegalStateException("history has no snapshot for ply " + plyIndex);
        }
        return new GameState(snapshot.board().copy(), snapshot.sideToMove(), snapshot.status());
    }

    public Optional<MoveRecord> recordAt(int plyIndex) {
        if (plyIndex < 0 || plyIndex >= records.size()) {
            return Optional.empty();
        }
        return Optional.of(records.get(plyIndex));
    }

    public BoardSnapshot snapshotAt(int plyIndex) {
        if (plyIndex < 0 || plyIndex > records.size()) {
            throw new IllegalArgumentException("plyIndex must be between 0 and " + records.size());
        }
        if (plyIndex == 0) {
            if (initial == null) {
                throw new IllegalStateException("history has no opening snapshot");
            }
            return initial;
        }
        return records.get(plyIndex - 1).after();
    }

    public void recordMove(GameState before, Move move, GameState after) {
        int ply = records.size();
        boolean promoted = before.board().get(move.from()).map(p -> !p.isKing()).orElse(false)
                && after.board().get(move.to()).map(Piece::isKing).orElse(false);
        append(new MoveRecord(
                ply,
                before.sideToMove(),
                move,
                move.notation(),
                move.capturedSquares(before.board()).size(),
                promoted,
                new BoardSnapshot(after.board(), after.sideToMove(), after.status(), ply + 1)
        ));
    }
}
