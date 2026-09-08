package com.lattice.checkers.engine;

import com.lattice.checkers.model.Board;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.PieceRank;
import com.lattice.checkers.model.Position;
import com.lattice.checkers.model.Side;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Detects single and multi-jump capture opportunities for American checkers.
 */
public final class CaptureDetector {

    private static final int[][] DIAGONALS = {
            {-1, -1}, {-1, 1}, {1, -1}, {1, 1}
    };

    public boolean hasCapture(GameState state, Side side) {
        return !findCaptures(state, side).isEmpty();
    }

    public List<Move> findCaptures(GameState state, Side side) {
        List<Move> moves = new ArrayList<>();
        Board board = state.board();
        for (int r = 0; r < Position.BOARD_SIZE; r++) {
            for (int c = 0; c < Position.BOARD_SIZE; c++) {
                Position from = new Position(r, c);
                Optional<Piece> piece = board.get(from);
                if (piece.isEmpty() || piece.get().side() != side) {
                    continue;
                }
                moves.addAll(findCapturesFrom(state, from));
            }
        }
        return List.copyOf(moves);
    }

    public List<Move> findCapturesFrom(GameState state, Position from) {
        Board board = state.board();
        Optional<Piece> optional = board.get(from);
        if (optional.isEmpty()) {
            return List.of();
        }
        Piece piece = optional.get();
        List<Move> results = new ArrayList<>();
        exploreJumps(board, piece, from, from, List.of(), results, false);
        return List.copyOf(results);
    }

    private void exploreJumps(
            Board board,
            Piece piece,
            Position origin,
            Position current,
            List<Position> pathSoFar,
            List<Move> results,
            boolean alreadyPromoted
    ) {
        boolean foundContinuation = false;
        for (int[] d : DIAGONALS) {
            if (!canMoveDirection(piece, d[0], alreadyPromoted)) {
                continue;
            }
            int midR = current.row() + d[0];
            int midC = current.col() + d[1];
            int landR = current.row() + 2 * d[0];
            int landC = current.col() + 2 * d[1];
            if (!inBounds(midR, midC) || !inBounds(landR, landC)) {
                continue;
            }
            Position mid = new Position(midR, midC);
            Position landing = new Position(landR, landC);
            Optional<Piece> victim = board.get(mid);
            if (victim.isEmpty() || victim.get().side() == piece.side()) {
                continue;
            }
            if (!board.isEmpty(landing)) {
                continue;
            }

            Board next = board.copy();
            next.clear(current);
            next.clear(mid);
            boolean promotes = !alreadyPromoted
                    && piece.rank() == PieceRank.MAN
                    && isPromotionRank(piece.side(), landing);
            Piece moving = promotes ? piece.promoted() : piece;
            next.set(landing, moving);

            List<Position> nextPath = new ArrayList<>(pathSoFar);
            nextPath.add(landing);

            // American checkers: crowning ends the capturing sequence.
            if (promotes) {
                results.add(new Move(origin, nextPath));
                foundContinuation = true;
                continue;
            }

            int before = results.size();
            exploreJumps(next, moving, origin, landing, nextPath, results, false);
            if (results.size() == before) {
                results.add(new Move(origin, nextPath));
            }
            foundContinuation = true;
        }

        if (!foundContinuation && !pathSoFar.isEmpty()) {
            // Terminal path already added by caller when no deeper jump exists.
        }
    }

    static boolean canMoveDirection(Piece piece, int rowDelta, boolean treatAsKing) {
        if (piece.isKing() || treatAsKing) {
            return true;
        }
        // Dark advances toward increasing row; light toward decreasing.
        if (piece.side() == Side.DARK) {
            return rowDelta > 0;
        }
        return rowDelta < 0;
    }

    static boolean isPromotionRank(Side side, Position position) {
        if (side == Side.DARK) {
            return position.row() == Position.BOARD_SIZE - 1;
        }
        return position.row() == 0;
    }

    private static boolean inBounds(int row, int col) {
        return row >= 0 && row < Position.BOARD_SIZE && col >= 0 && col < Position.BOARD_SIZE;
    }
}
