package com.lattice.checkers.analysis;

import com.lattice.checkers.engine.RulesEngine;
import com.lattice.checkers.history.BoardSnapshot;
import com.lattice.checkers.history.GameHistory;
import com.lattice.checkers.history.MoveRecord;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.GameStatus;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.Position;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * Exploratory branch from an earlier position. Never mutates the original match history.
 */
public final class WhatIfSession {

    private final BoardSnapshot branchPoint;
    private final GameState start;
    private final GameHistory branchHistory;
    private final RulesEngine rulesEngine;
    private GameState current;
    private Position selected;

    public WhatIfSession(BoardSnapshot branchPoint, GameState startingState) {
        this(branchPoint, startingState, new RulesEngine());
    }

    public WhatIfSession(BoardSnapshot branchPoint, GameState startingState, RulesEngine rulesEngine) {
        this.branchPoint = Objects.requireNonNull(branchPoint);
        this.start = Objects.requireNonNull(startingState).copy();
        this.current = this.start.copy();
        this.rulesEngine = Objects.requireNonNull(rulesEngine);
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

    public Optional<Position> selected() {
        return Optional.ofNullable(selected);
    }

    public int branchPly() {
        return branchHistory.size();
    }

    public Optional<Move> lastMove() {
        if (branchHistory.size() == 0) {
            return Optional.empty();
        }
        return Optional.of(branchHistory.records().getLast().move());
    }

    public boolean lastPromoted() {
        return branchHistory.size() > 0 && branchHistory.records().getLast().promoted();
    }

    public List<Move> legalMoves() {
        return rulesEngine.legalMoves(current);
    }

    public List<Move> legalMovesFromSelection() {
        if (selected == null) {
            return List.of();
        }
        return rulesEngine.legalMovesFrom(current, selected);
    }

    public List<Position> legalDestinations() {
        List<Position> destinations = new ArrayList<>();
        for (Move move : legalMovesFromSelection()) {
            destinations.add(move.to());
            destinations.addAll(move.path());
        }
        return List.copyOf(destinations);
    }

    public boolean hasForcedCapture() {
        return rulesEngine.hasForcedCapture(current);
    }

    public boolean tryMove(Move move) {
        Objects.requireNonNull(move);
        if (current.status() != GameStatus.IN_PROGRESS || !rulesEngine.isLegal(current, move)) {
            return false;
        }
        GameState before = current;
        current = rulesEngine.apply(current, move);
        branchHistory.recordMove(before, move, current);
        selected = current.continuationFrom().orElse(null);
        return true;
    }

    public void reset() {
        branchHistory.clear();
        branchHistory.setInitial(branchPoint);
        current = start.copy();
        selected = null;
    }

    public void selectSquare(Position position) {
        Objects.requireNonNull(position);
        if (current.status() != GameStatus.IN_PROGRESS) {
            return;
        }
        if (selected != null) {
            Optional<Move> chosen = findMoveTo(selected, position);
            if (chosen.isPresent()) {
                tryMove(chosen.get());
                return;
            }
        }
        Optional<Piece> piece = current.board().get(position);
        if (piece.isPresent() && piece.get().side() == current.sideToMove()) {
            Optional<Position> continuation = current.continuationFrom();
            if (continuation.isPresent() && !continuation.get().equals(position)) {
                selected = continuation.get();
                return;
            }
            List<Move> moves = rulesEngine.legalMovesFrom(current, position);
            selected = moves.isEmpty() ? null : position;
            return;
        }
        selected = current.continuationFrom().orElse(null);
    }

    private Optional<Move> findMoveTo(Position from, Position clicked) {
        List<Move> moves = rulesEngine.legalMovesFrom(current, from);
        List<Move> endingHere = new ArrayList<>();
        List<Move> firstStepHere = new ArrayList<>();
        for (Move move : moves) {
            if (move.to().equals(clicked)) {
                endingHere.add(move);
            }
            if (move.path().get(0).equals(clicked)) {
                firstStepHere.add(move);
            }
        }
        if (endingHere.size() == 1) {
            return Optional.of(endingHere.get(0));
        }
        if (endingHere.size() > 1) {
            return endingHere.stream().max((a, b) -> Integer.compare(a.path().size(), b.path().size()));
        }
        if (firstStepHere.size() == 1) {
            Move full = firstStepHere.get(0);
            if (full.path().size() > 1) {
                return Optional.of(Move.jump(full.from(), full.path().get(0)));
            }
            return Optional.of(full);
        }
        return Optional.empty();
    }

    public Optional<MoveRecord> lastRecord() {
        if (branchHistory.size() == 0) {
            return Optional.empty();
        }
        return Optional.of(branchHistory.records().getLast());
    }
}
