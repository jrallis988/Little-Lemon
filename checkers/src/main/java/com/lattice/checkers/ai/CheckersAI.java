package com.lattice.checkers.ai;

import com.lattice.checkers.engine.RulesEngine;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import java.util.Objects;
import java.util.Optional;
import java.util.Random;

/**
 * Computer opponent. One Minimax engine; difficulty only changes search quality.
 */
public final class CheckersAI {

    private final RulesEngine rulesEngine;
    private final AIDifficulty difficulty;
    private final AIProfile style;
    private final MinimaxSearch search;
    private final Random random;
    private SearchStats lastStats;

    public CheckersAI(RulesEngine rulesEngine, AIDifficulty difficulty) {
        this(rulesEngine, difficulty, new Random());
    }

    public CheckersAI(RulesEngine rulesEngine, AIDifficulty difficulty, Random random) {
        this.rulesEngine = Objects.requireNonNull(rulesEngine);
        this.difficulty = Objects.requireNonNull(difficulty);
        this.style = null;
        this.random = Objects.requireNonNull(random);
        EvaluationFunction evaluation = new EvaluationFunction(
                EvaluationWeights.from(difficulty), rulesEngine);
        this.search = new MinimaxSearch(
                rulesEngine, evaluation, difficulty.searchDepth(), difficulty.usesQuiescence());
    }

    public CheckersAI(RulesEngine rulesEngine, AIProfile profile, int searchDepth) {
        this.rulesEngine = Objects.requireNonNull(rulesEngine);
        this.difficulty = AIDifficulty.MEDIUM;
        this.style = Objects.requireNonNull(profile);
        this.random = new Random();
        if (searchDepth < 1) {
            throw new IllegalArgumentException("searchDepth must be >= 1");
        }
        EvaluationFunction evaluation = new EvaluationFunction(
                EvaluationWeights.from(profile), rulesEngine);
        this.search = new MinimaxSearch(rulesEngine, evaluation, searchDepth, true);
    }

    public AIDifficulty difficulty() {
        return difficulty;
    }

    public Optional<AIProfile> style() {
        return Optional.ofNullable(style);
    }

    public AIProfile profile() {
        return style == null ? AIProfile.STRATEGIST : style;
    }

    public int searchDepth() {
        return search.maxDepth();
    }

    public Optional<Move> chooseMove(GameState state) {
        Objects.requireNonNull(state);
        long started = System.currentTimeMillis();
        Optional<Move> chosen = search.findBestMove(
                state.copy(), difficulty.rootChoiceMargin(), random);
        if (chosen.isPresent() && !rulesEngine.isLegal(state, chosen.get())) {
            throw new IllegalStateException("AI produced an illegal move: " + chosen.get().notation());
        }
        long elapsed = System.currentTimeMillis() - started;
        String label = chosen.map(Move::notation).orElse("");
        double eval = 0;
        lastStats = new SearchStats(
                search.maxDepth(),
                search.nodesVisited(),
                eval,
                elapsed,
                label
        );
        return chosen;
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
