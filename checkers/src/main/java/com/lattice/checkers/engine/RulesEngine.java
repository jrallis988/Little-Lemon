package com.lattice.checkers.engine;

import com.lattice.checkers.model.Board;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.GameStatus;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.PieceRank;
import com.lattice.checkers.model.Position;
import com.lattice.checkers.model.Side;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * Public façade for American checkers rules.
 */
public final class RulesEngine {

    private final MoveGenerator moveGenerator;
    private final CaptureDetector captureDetector;
    private final MoveValidator moveValidator;

    public RulesEngine() {
        this.captureDetector = new CaptureDetector();
        this.moveGenerator = new MoveGenerator(captureDetector);
        this.moveValidator = new MoveValidator(moveGenerator);
    }

    public List<Move> legalMoves(GameState state) {
        Objects.requireNonNull(state);
        if (state.status() != GameStatus.IN_PROGRESS) {
            return List.of();
        }
        return moveGenerator.generateLegalMoves(state, state.sideToMove());
    }

    public List<Move> legalMoves(GameState state, Side side) {
        Objects.requireNonNull(state);
        Objects.requireNonNull(side);
        return moveGenerator.generateLegalMoves(state, side);
    }

    public List<Move> legalMovesFrom(GameState state, Position from) {
        return moveGenerator.generateMovesFrom(state, from);
    }

    public boolean isLegal(GameState state, Move move) {
        return moveValidator.isLegal(state, move);
    }

    public boolean hasForcedCapture(GameState state) {
        Objects.requireNonNull(state);
        if (state.continuationFrom().isPresent()) {
            return true;
        }
        return captureDetector.hasCapture(state, state.sideToMove());
    }

    /**
     * Applies a legal move, returning a new state (does not mutate the input).
     */
    public GameState apply(GameState state, Move move) {
        Objects.requireNonNull(state);
        Objects.requireNonNull(move);
        if (state.status() != GameStatus.IN_PROGRESS) {
            throw new IllegalStateException("game is not in progress");
        }
        if (!isLegal(state, move)) {
            throw new IllegalArgumentException("illegal move: " + move.notation());
        }

        GameState next = state.copy();
        Board board = next.board();
        Piece moving = board.get(move.from())
                .orElseThrow(() -> new IllegalArgumentException("no piece at " + move.from()));

        board.clear(move.from());
        Position current = move.from();
        boolean promoted = false;

        for (Position landing : move.path()) {
            if (Math.abs(landing.row() - current.row()) == 2) {
                int mr = (current.row() + landing.row()) / 2;
                int mc = (current.col() + landing.col()) / 2;
                board.clear(new Position(mr, mc));
            }
            current = landing;
            if (!promoted
                    && moving.rank() == PieceRank.MAN
                    && CaptureDetector.isPromotionRank(moving.side(), landing)) {
                moving = moving.promoted();
                promoted = true;
            }
        }
        board.set(move.to(), moving);

        // Multi-jump continuation: only when the submitted move is a single jump
        // segment and more captures remain from the landing square.
        // Full multi-jump paths in {@link Move} are applied atomically.
        if (move.isJump() && move.path().size() == 1 && !promoted) {
            GameState probe = next.copy();
            probe.setContinuationFrom(move.to());
            List<Move> more = captureDetector.findCapturesFrom(probe, move.to());
            if (!more.isEmpty()) {
                next.setContinuationFrom(move.to());
                return next;
            }
        }

        next.setContinuationFrom(null);
        next.setSideToMove(state.sideToMove().opposite());
        updateTerminalStatus(next);
        return next;
    }

    public GameState resign(GameState state, Side resigning) {
        Objects.requireNonNull(state);
        Objects.requireNonNull(resigning);
        GameState next = state.copy();
        next.setContinuationFrom(null);
        next.setStatus(resigning == Side.DARK ? GameStatus.RESIGNED_DARK : GameStatus.RESIGNED_LIGHT);
        return next;
    }

    public EngineDiagnostics diagnostics(GameState state) {
        Objects.requireNonNull(state);
        List<Move> legal = legalMoves(state);
        int captures = 0;
        for (Move move : legal) {
            if (move.isJump()) {
                captures++;
            }
        }
        return new EngineDiagnostics(
                state.sideToMove(),
                legal.size(),
                captures,
                hasForcedCapture(state),
                ""
        );
    }

    private void updateTerminalStatus(GameState state) {
        Side toMove = state.sideToMove();
        if (state.board().count(toMove) == 0) {
            state.setStatus(toMove == Side.DARK ? GameStatus.LIGHT_WINS : GameStatus.DARK_WINS);
            return;
        }
        if (moveGenerator.generateLegalMoves(state, toMove).isEmpty()) {
            state.setStatus(toMove == Side.DARK ? GameStatus.LIGHT_WINS : GameStatus.DARK_WINS);
        }
    }

    MoveGenerator moveGenerator() {
        return moveGenerator;
    }

    CaptureDetector captureDetector() {
        return captureDetector;
    }

    MoveValidator moveValidator() {
        return moveValidator;
    }
}
