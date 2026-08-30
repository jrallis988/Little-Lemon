package com.lattice.checkers.engine;

import com.lattice.checkers.model.Board;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.Position;
import com.lattice.checkers.model.Side;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * Generates legal moves. Honors mandatory captures and multi-jump continuations.
 */
public final class MoveGenerator {

    private static final int[][] DIAGONALS = {
            {-1, -1}, {-1, 1}, {1, -1}, {1, 1}
    };

    private final CaptureDetector captureDetector;

    public MoveGenerator(CaptureDetector captureDetector) {
        this.captureDetector = Objects.requireNonNull(captureDetector);
    }

    public List<Move> generateLegalMoves(GameState state, Side side) {
        Objects.requireNonNull(state);
        Objects.requireNonNull(side);

        Optional<Position> continuation = state.continuationFrom();
        if (continuation.isPresent()) {
            return captureDetector.findCapturesFrom(state, continuation.get());
        }

        List<Move> captures = captureDetector.findCaptures(state, side);
        if (!captures.isEmpty()) {
            return captures;
        }
        return generateSlides(state.board(), side);
    }

    public List<Move> generateMovesFrom(GameState state, Position from) {
        Objects.requireNonNull(state);
        Objects.requireNonNull(from);

        Optional<Piece> piece = state.board().get(from);
        if (piece.isEmpty() || piece.get().side() != state.sideToMove()) {
            return List.of();
        }

        Optional<Position> continuation = state.continuationFrom();
        if (continuation.isPresent() && !continuation.get().equals(from)) {
            return List.of();
        }

        List<Move> all = generateLegalMoves(state, state.sideToMove());
        List<Move> fromHere = new ArrayList<>();
        for (Move move : all) {
            if (move.from().equals(from)) {
                fromHere.add(move);
            }
        }
        return List.copyOf(fromHere);
    }

    private List<Move> generateSlides(Board board, Side side) {
        List<Move> slides = new ArrayList<>();
        for (int r = 0; r < Position.BOARD_SIZE; r++) {
            for (int c = 0; c < Position.BOARD_SIZE; c++) {
                Position from = new Position(r, c);
                Optional<Piece> optional = board.get(from);
                if (optional.isEmpty() || optional.get().side() != side) {
                    continue;
                }
                Piece piece = optional.get();
                for (int[] d : DIAGONALS) {
                    if (!CaptureDetector.canMoveDirection(piece, d[0], false)) {
                        continue;
                    }
                    int nr = r + d[0];
                    int nc = c + d[1];
                    if (nr < 0 || nr >= Position.BOARD_SIZE || nc < 0 || nc >= Position.BOARD_SIZE) {
                        continue;
                    }
                    Position to = new Position(nr, nc);
                    if (board.isEmpty(to) && to.isDarkSquare()) {
                        slides.add(Move.slide(from, to));
                    }
                }
            }
        }
        return List.copyOf(slides);
    }

    CaptureDetector captureDetector() {
        return captureDetector;
    }
}
