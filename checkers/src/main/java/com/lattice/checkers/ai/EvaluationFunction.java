package com.lattice.checkers.ai;

import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Side;

/**
 * Scores a position for a given side using an {@link AIProfile}'s weights.
 *
 * <p>Phase 1: contract and profile wiring only.
 */
public final class EvaluationFunction {

    private final AIProfile profile;

    public EvaluationFunction(AIProfile profile) {
        this.profile = profile;
    }

    public AIProfile profile() {
        return profile;
    }

    /**
     * Higher is better for {@code perspective}.
     */
    public double evaluate(GameState state, Side perspective) {
        throw new UnsupportedOperationException("Phase 7: position evaluation");
    }
}
