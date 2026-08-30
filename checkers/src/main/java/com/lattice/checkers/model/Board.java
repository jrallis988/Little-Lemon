package com.lattice.checkers.model;

import java.util.Arrays;
import java.util.Objects;
import java.util.Optional;

/**
 * 8×8 occupancy grid. Only dark squares hold pieces in American checkers.
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

    public int count(Side side) {
        int count = 0;
        for (int r = 0; r < Position.BOARD_SIZE; r++) {
            for (int c = 0; c < Position.BOARD_SIZE; c++) {
                Piece piece = squares[r][c];
                if (piece != null && piece.side() == side) {
                    count++;
                }
            }
        }
        return count;
    }

    public Board copy() {
        Piece[][] clone = new Piece[Position.BOARD_SIZE][Position.BOARD_SIZE];
        for (int r = 0; r < Position.BOARD_SIZE; r++) {
            clone[r] = Arrays.copyOf(squares[r], Position.BOARD_SIZE);
        }
        return new Board(clone);
    }

    /**
     * Standard American checkers opening: dark on rows 0–2, light on rows 5–7,
     * pieces only on dark squares. Dark moves toward increasing row.
     */
    public static Board initial() {
        Board board = new Board();
        for (int r = 0; r < Position.BOARD_SIZE; r++) {
            for (int c = 0; c < Position.BOARD_SIZE; c++) {
                if ((r + c) % 2 != 1) {
                    continue;
                }
                Position pos = new Position(r, c);
                if (r <= 2) {
                    board.set(pos, new Piece(Side.DARK, PieceRank.MAN));
                } else if (r >= 5) {
                    board.set(pos, new Piece(Side.LIGHT, PieceRank.MAN));
                }
            }
        }
        return board;
    }
}
