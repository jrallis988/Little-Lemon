package com.lattice.checkers.model;

import java.util.Objects;
import java.util.Optional;

/**
 * Mutable match state: board, side to move, status, and optional mid-jump context.
 *
 * <p>Phase 1: structure only. Rules mutations live in {@code engine} (Phase 3).
 */
public final class GameState {

    private Board board;
    private Side sideToMove;
    private GameStatus status;
    private Position continuationFrom;

    public GameState(Board board, Side sideToMove, GameStatus status) {
        this.board = Objects.requireNonNull(board);
        this.sideToMove = Objects.requireNonNull(sideToMove);
        this.status = Objects.requireNonNull(status);
        this.continuationFrom = null;
    }

    public static GameState newGame() {
        throw new UnsupportedOperationException("Phase 2: construct initial GameState");
    }

    public Board board() {
        return board;
    }

    public Side sideToMove() {
        return sideToMove;
    }

    public GameStatus status() {
        return status;
    }

    /**
     * When a multi-jump is in progress, the piece that must continue capturing.
     */
    public Optional<Position> continuationFrom() {
        return Optional.ofNullable(continuationFrom);
    }

    public void setBoard(Board board) {
        this.board = Objects.requireNonNull(board);
    }

    public void setSideToMove(Side sideToMove) {
        this.sideToMove = Objects.requireNonNull(sideToMove);
    }

    public void setStatus(GameStatus status) {
        this.status = Objects.requireNonNull(status);
    }

    public void setContinuationFrom(Position continuationFrom) {
        this.continuationFrom = continuationFrom;
    }

    public GameState copy() {
        GameState copy = new GameState(board.copy(), sideToMove, status);
        copy.continuationFrom = continuationFrom;
        return copy;
    }
}
