package com.lattice.checkers.analysis;

import com.lattice.checkers.engine.RulesEngine;
import com.lattice.checkers.model.GameState;
import java.util.List;
import java.util.Objects;

/**
 * Computes strategic overlays for X-Ray mode from live game state.
 * UI must not invent labels — it only renders what this analyzer returns.
 */
public final class XRayAnalyzer {

    private final RulesEngine rulesEngine;

    public XRayAnalyzer(RulesEngine rulesEngine) {
        this.rulesEngine = Objects.requireNonNull(rulesEngine);
    }

    public List<SquareAnnotation> analyze(GameState state) {
        throw new UnsupportedOperationException("Phase 8: X-Ray analysis");
    }

    RulesEngine rulesEngine() {
        return rulesEngine;
    }
}
