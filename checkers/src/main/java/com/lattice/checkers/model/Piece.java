package com.lattice.checkers.model;

/**
 * A single checkers piece. Immutable value type.
 */
public record Piece(Side side, PieceRank rank) {

    public Piece {
        if (side == null || rank == null) {
            throw new IllegalArgumentException("side and rank are required");
        }
    }

    public boolean isKing() {
        return rank == PieceRank.KING;
    }

    public Piece promoted() {
        return new Piece(side, PieceRank.KING);
    }
}
