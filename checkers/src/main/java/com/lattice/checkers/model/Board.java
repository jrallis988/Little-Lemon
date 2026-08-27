package com.lattice.checkers.model;

import java.util.Arrays;
import java.util.Objects;
import java.util.Optional;

/**
 * 8×8 occupancy grid. Only dark squares hold pieces in American checkers.
 *
 * <p>Phase 1: storage and copy helpers. Initial setup and mutations arrive in Phase 2–3.
 */
public final class Board {

    private final Piece[][] squares;

    public Board() {
        this.squares = new Piece[Position.BOARD_SIZE][Position.BOARD_SIZE];
    }

    private Board(Piece[][] squares) {
        this.squares = squares;
    }

    public Optional<Piece> get(Position position) {
        Objects.requireNonNull(position);
        return Optional.ofNullable(squares[position.row()][position.col()]);
    }

    public void set(Position position, Piece piece) {
        Objects.requireNonNull(position);
        squares[position.row()][position.col()] = piece;
    }

    public void clear(Position position) {
        Objects.requireNonNull(position);
        squares[position.row()][position.col()] = null;
    }

    public boolean isEmpty(Position position) {
        return get(position).isEmpty();
    }

    /**
     * Deep copy suitable for search trees and history snapshots.
     */
    public Board copy() {
        Piece[][] clone = new Piece[Position.BOARD_SIZE][Position.BOARD_SIZE];
        for (int r = 0; r < Position.BOARD_SIZE; r++) {
            clone[r] = Arrays.copyOf(squares[r], Position.BOARD_SIZE);
        }
        return new Board(clone);
    }

    /**
     * Standard American checkers opening layout. Implemented in Phase 2.
     */
    public static Board initial() {
        throw new UnsupportedOperationException("Phase 2: initial board setup");
    }
}
