package com.lattice.checkers.ai;

import com.lattice.checkers.engine.RulesEngine;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import java.util.Objects;
import java.util.Optional;

/**
 * Computer opponent entry point. Selects a legal move using profile-weighted search.
 */
public final class CheckersAI {

    private final RulesEngine rulesEngine;
    private final AIProfile profile;
    private final int searchDepth;
    private SearchStats lastStats;

    public CheckersAI(RulesEngine rulesEngine, AIProfile profile, int searchDepth) {
        this.rulesEngine = Objects.requireNonNull(rulesEngine);
        this.profile = Objects.requireNonNull(profile);
        if (searchDepth < 1) {
            throw new IllegalArgumentException("searchDepth must be >= 1");
        }
        this.searchDepth = searchDepth;
    }

    public AIProfile profile() {
        return profile;
    }

    public int searchDepth() {
        return searchDepth;
    }

    public Optional<Move> chooseMove(GameState state) {
        throw new UnsupportedOperationException("Phase 7: AI move selection");
    }

    public Optional<SearchStats> lastStats() {
        return Optional.ofNullable(lastStats);
    }

    void setLastStats(SearchStats lastStats) {
        this.lastStats = lastStats;
    }

    RulesEngine rulesEngine() {
        return rulesEngine;
    }
}
