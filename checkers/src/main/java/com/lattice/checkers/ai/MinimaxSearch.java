package com.lattice.checkers.ai;

import com.lattice.checkers.engine.RulesEngine;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Side;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Random;

/**
 * Depth-limited minimax with alpha-beta pruning. One engine for every difficulty.
 */
public final class MinimaxSearch {

    private static final double INF = 1_000_000;

    private final RulesEngine rulesEngine;
    private final EvaluationFunction evaluationFunction;
    private final int maxDepth;
    private final boolean quiescence;

    private long nodesVisited;

    public MinimaxSearch(RulesEngine rulesEngine, EvaluationFunction evaluationFunction, int maxDepth) {
        this(rulesEngine, evaluationFunction, maxDepth, true);
    }

    public MinimaxSearch(
            RulesEngine rulesEngine,
            EvaluationFunction evaluationFunction,
            int maxDepth,
            boolean quiescence
    ) {
        this.rulesEngine = Objects.requireNonNull(rulesEngine);
        this.evaluationFunction = Objects.requireNonNull(evaluationFunction);
        if (maxDepth < 1) {
            throw new IllegalArgumentException("maxDepth must be >= 1");
        }
        this.maxDepth = maxDepth;
        this.quiescence = quiescence;
    }

    public Optional<Move> findBestMove(GameState state) {
        return findBestMove(state, 0, new Random());
    }

    /**
     * Scores every legal root move, then picks the best (or a near-best move when
     * {@code rootChoiceMargin > 0}, used by Easy).
     */
    public Optional<Move> findBestMove(GameState state, double rootChoiceMargin, Random random) {
        Objects.requireNonNull(state);
        resetNodeCounter();
        List<Move> legal = rulesEngine.legalMoves(state);
        if (legal.isEmpty()) {
            return Optional.empty();
        }
        Side root = state.sideToMove();
        boolean scoreAllRoot = rootChoiceMargin > 0;
        List<ScoredMove> scored = new ArrayList<>();
        double alpha = -INF;
        for (Move move : order(legal)) {
            incrementNodes();
            GameState next = rulesEngine.apply(state, move);
            double value = scoreAllRoot
                    ? search(next, maxDepth - 1, -INF, INF, root)
                    : search(next, maxDepth - 1, alpha, INF, root);
            scored.add(new ScoredMove(move, value));
            if (!scoreAllRoot) {
                alpha = Math.max(alpha, value);
            }
        }
        scored.sort(Comparator.comparingDouble(ScoredMove::score).reversed());
        Move chosen = pickRoot(scored, rootChoiceMargin, random);
        return Optional.of(chosen);
    }

    private double search(GameState state, int depth, double alpha, double beta, Side root) {
        incrementNodes();
        if (state.status().isTerminal()) {
            return EvaluationFunction.terminalScore(state.status(), root);
        }
        if (depth == 0) {
            if (quiescence && rulesEngine.hasForcedCapture(state)) {
                return quiesce(state, alpha, beta, root, 2);
            }
            return evaluationFunction.evaluate(state, root);
        }
        List<Move> moves = order(rulesEngine.legalMoves(state));
        if (moves.isEmpty()) {
            return EvaluationFunction.terminalScore(state.status(), root);
        }
        boolean maximizing = state.sideToMove() == root;
        if (maximizing) {
            double best = -INF;
            for (Move move : moves) {
                double value = search(rulesEngine.apply(state, move), depth - 1, alpha, beta, root);
                best = Math.max(best, value);
                alpha = Math.max(alpha, value);
                if (alpha >= beta) {
                    break;
                }
            }
            return best;
        }
        double best = INF;
        for (Move move : moves) {
            double value = search(rulesEngine.apply(state, move), depth - 1, alpha, beta, root);
            best = Math.min(best, value);
            beta = Math.min(beta, value);
            if (alpha >= beta) {
                break;
            }
        }
        return best;
    }

    private double quiesce(GameState state, double alpha, double beta, Side root, int remain) {
        incrementNodes();
        double standPat = evaluationFunction.evaluate(state, root);
        if (remain <= 0 || state.status().isTerminal()) {
            return standPat;
        }
        List<Move> captures = rulesEngine.legalMoves(state).stream().filter(Move::isJump).toList();
        if (captures.isEmpty()) {
            return standPat;
        }
        boolean maximizing = state.sideToMove() == root;
        if (maximizing) {
            double best = standPat;
            alpha = Math.max(alpha, standPat);
            for (Move move : captures) {
                double value = quiesce(rulesEngine.apply(state, move), alpha, beta, root, remain - 1);
                best = Math.max(best, value);
                alpha = Math.max(alpha, value);
                if (alpha >= beta) {
                    break;
                }
            }
            return best;
        }
        double best = standPat;
        beta = Math.min(beta, standPat);
        for (Move move : captures) {
            double value = quiesce(rulesEngine.apply(state, move), alpha, beta, root, remain - 1);
            best = Math.min(best, value);
            beta = Math.min(beta, value);
            if (alpha >= beta) {
                break;
            }
        }
        return best;
    }

    private static Move pickRoot(List<ScoredMove> scored, double margin, Random random) {
        ScoredMove best = scored.getFirst();
        if (margin <= 0 || scored.size() == 1 || random == null) {
            return best.move();
        }
        List<Move> pool = new ArrayList<>();
        for (ScoredMove candidate : scored) {
            if (best.score() - candidate.score() <= margin) {
                pool.add(candidate.move());
            }
            if (pool.size() >= 4) {
                break;
            }
        }
        return pool.get(random.nextInt(pool.size()));
    }

    private static List<Move> order(List<Move> moves) {
        List<Move> ordered = new ArrayList<>(moves);
        ordered.sort(Comparator.comparingInt((Move m) -> m.isJump() ? m.path().size() : 0).reversed());
        return ordered;
    }

    public long nodesVisited() {
        return nodesVisited;
    }

    public int maxDepth() {
        return maxDepth;
    }

    public EvaluationFunction evaluationFunction() {
        return evaluationFunction;
    }

    RulesEngine rulesEngine() {
        return rulesEngine;
    }

    void resetNodeCounter() {
        nodesVisited = 0;
    }

    void incrementNodes() {
        nodesVisited++;
    }

    private record ScoredMove(Move move, double score) {
    }
}
