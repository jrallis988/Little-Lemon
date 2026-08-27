package com.lattice.checkers.controller;

import com.lattice.checkers.ai.AIProfile;
import com.lattice.checkers.ai.CheckersAI;
import com.lattice.checkers.ai.SearchStats;
import com.lattice.checkers.analysis.XRayAnalyzer;
import com.lattice.checkers.engine.EngineDiagnostics;
import com.lattice.checkers.engine.RulesEngine;
import com.lattice.checkers.history.GameHistory;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Player;
import com.lattice.checkers.model.Position;
import java.util.List;
import java.util.Optional;

/**
 * Application façade between JavaFX and the domain.
 * Keeps rules, AI, and history out of UI classes.
 *
 * <p>Phase 1: wiring shell. Behavior arrives in later phases.
 */
public final class GameController {

    private final RulesEngine rulesEngine;
    private final GameHistory history;
    private final AppMode appMode;
    private final XRayAnalyzer xRayAnalyzer;

    private GameState state;
    private Player darkPlayer;
    private Player lightPlayer;
    private CheckersAI computerOpponent;
    private Position selected;

    public GameController() {
        this.rulesEngine = new RulesEngine();
        this.history = new GameHistory();
        this.appMode = new AppMode();
        this.xRayAnalyzer = new XRayAnalyzer(rulesEngine);
    }

    public RulesEngine rulesEngine() {
        return rulesEngine;
    }

    public GameHistory history() {
        return history;
    }

    public AppMode appMode() {
        return appMode;
    }

    public XRayAnalyzer xRayAnalyzer() {
        return xRayAnalyzer;
    }

    public Optional<GameState> state() {
        return Optional.ofNullable(state);
    }

    public Optional<Position> selected() {
        return Optional.ofNullable(selected);
    }

    public void startHumanVsHuman(String darkName, String lightName) {
        throw new UnsupportedOperationException("Phase 5+: start human vs human");
    }

    public void startHumanVsComputer(String humanName, AIProfile profile, boolean humanIsDark) {
        throw new UnsupportedOperationException("Phase 7: start human vs computer");
    }

    public void selectSquare(Position position) {
        throw new UnsupportedOperationException("Phase 5: selection");
    }

    public List<Move> legalMovesForSelection() {
        throw new UnsupportedOperationException("Phase 5: legal moves for selection");
    }

    public void applyMove(Move move) {
        throw new UnsupportedOperationException("Phase 5: apply move via controller");
    }

    public void resign(Player player) {
        throw new UnsupportedOperationException("Phase 6: resign");
    }

    public void restart() {
        throw new UnsupportedOperationException("Phase 6: restart");
    }

    public Optional<EngineDiagnostics> diagnostics() {
        throw new UnsupportedOperationException("Phase 11: developer diagnostics");
    }

    public Optional<SearchStats> lastAiStats() {
        if (computerOpponent == null) {
            return Optional.empty();
        }
        return computerOpponent.lastStats();
    }
}
