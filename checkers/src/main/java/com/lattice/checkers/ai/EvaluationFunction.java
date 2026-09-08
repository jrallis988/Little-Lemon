package com.lattice.checkers.ai;

import com.lattice.checkers.engine.RulesEngine;
import com.lattice.checkers.model.Board;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.GameStatus;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.Position;
import com.lattice.checkers.model.Side;
import java.util.List;
import java.util.Objects;

/**
 * Scores a position for a given side. Higher is better for {@code perspective}.
 */
public final class EvaluationFunction {

    private static final double WIN = 100_000;

    private final EvaluationWeights weights;
    private final RulesEngine rulesEngine;

    public EvaluationFunction(AIDifficulty difficulty) {
        this(EvaluationWeights.from(difficulty), new RulesEngine());
    }

    public EvaluationFunction(AIProfile profile) {
        this(EvaluationWeights.from(profile), new RulesEngine());
    }

    public EvaluationFunction(EvaluationWeights weights, RulesEngine rulesEngine) {
        this.weights = Objects.requireNonNull(weights);
        this.rulesEngine = Objects.requireNonNull(rulesEngine);
    }

    public EvaluationWeights weights() {
        return weights;
    }

    /**
     * Higher is better for {@code perspective}.
     */
    public double evaluate(GameState state, Side perspective) {
        Objects.requireNonNull(state);
        Objects.requireNonNull(perspective);
        if (state.status().isTerminal()) {
            return terminalScore(state.status(), perspective);
        }

        Board board = state.board();
        double score = 0;
        int ownPieces = 0;
        int oppPieces = 0;
        int ownKings = 0;
        int oppKings = 0;

        for (int r = 0; r < Position.BOARD_SIZE; r++) {
            for (int c = 0; c < Position.BOARD_SIZE; c++) {
                if ((r + c) % 2 != 1) {
                    continue;
                }
                Position pos = new Position(r, c);
                Piece piece = board.get(pos).orElse(null);
                if (piece == null) {
                    continue;
                }
                double sign = piece.side() == perspective ? 1 : -1;
                if (piece.side() == perspective) {
                    ownPieces++;
                    if (piece.isKing()) {
                        ownKings++;
                    }
                } else {
                    oppPieces++;
                    if (piece.isKing()) {
                        oppKings++;
                    }
                }

                double material = piece.isKing() ? weights.kingValue() : EvaluationWeights.MAN_VALUE;
                score += sign * weights.materialWeight() * material;
                score += sign * weights.positionWeight() * centerValue(r, c);
                if (!piece.isKing()) {
                    score += sign * weights.promotionWeight() * promotionProgress(piece.side(), r);
                }
                score += sign * weights.protectionWeight() * friendlyNeighbors(board, pos, piece.side());
            }
        }

        score += weights.preservationWeight() * 12 * (ownPieces - oppPieces);
        score += weights.materialWeight() * 8 * (ownKings - oppKings);

        List<Move> ownMoves = rulesEngine.legalMoves(state, perspective);
        List<Move> oppMoves = rulesEngine.legalMoves(state, perspective.opposite());
        score += weights.mobilityWeight() * (ownMoves.size() - oppMoves.size());
        long ownCaptures = ownMoves.stream().filter(Move::isJump).count();
        long oppCaptures = oppMoves.stream().filter(Move::isJump).count();
        score += weights.capturePotentialWeight() * 18 * (ownCaptures - oppCaptures);
        score += weights.threatWeight() * 14 * (ownCaptures - oppCaptures);
        return score;
    }

    public static double terminalScore(GameStatus status, Side perspective) {
        return switch (status) {
            case DARK_WINS, RESIGNED_LIGHT -> perspective == Side.DARK ? WIN : -WIN;
            case LIGHT_WINS, RESIGNED_DARK -> perspective == Side.LIGHT ? WIN : -WIN;
            default -> 0;
        };
    }

    private static double promotionProgress(Side side, int row) {
        if (side == Side.DARK) {
            return row;
        }
        return (Position.BOARD_SIZE - 1) - row;
    }

    private static double centerValue(int row, int col) {
        double rowCenter = 3.5 - Math.abs(row - 3.5);
        double colCenter = 3.5 - Math.abs(col - 3.5);
        return rowCenter + colCenter;
    }

    private static int friendlyNeighbors(Board board, Position pos, Side side) {
        int count = 0;
        for (int dr = -1; dr <= 1; dr += 2) {
            for (int dc = -1; dc <= 1; dc += 2) {
                int r = pos.row() + dr;
                int c = pos.col() + dc;
                if (r < 0 || r >= Position.BOARD_SIZE || c < 0 || c >= Position.BOARD_SIZE) {
                    continue;
                }
                Position n = new Position(r, c);
                if (board.get(n).filter(p -> p.side() == side).isPresent()) {
                    count++;
                }
            }
        }
        return count;
    }
}
