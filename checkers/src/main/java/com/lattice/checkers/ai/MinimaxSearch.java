package com.lattice.checkers.ai;

import com.lattice.checkers.engine.RulesEngine;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import java.util.Objects;
import java.util.Optional;

/**
 * Depth-limited minimax with alpha-beta pruning.
 *
 * <p>Phase 1: structure only. Search implemented in Phase 7.
 */
public final class MinimaxSearch {

    private final RulesEngine rulesEngine;
    private final EvaluationFunction evaluationFunction;
    private final int maxDepth;

    private long nodesVisited;

    public MinimaxSearch(RulesEngine rulesEngine, EvaluationFunction evaluationFunction, int maxDepth) {
        this.rulesEngine = Objects.requireNonNull(rulesEngine);
        this.evaluationFunction = Objects.requireNonNull(evaluationFunction);
        if (maxDepth < 1) {
            throw new IllegalArgumentException("maxDepth must be >= 1");
        }
        this.maxDepth = maxDepth;
    }

    public Optional<Move> findBestMove(GameState state) {
        throw new UnsupportedOperationException("Phase 7: minimax search");
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
}
