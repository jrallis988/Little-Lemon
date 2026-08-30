package com.lattice.checkers.controller;

import com.lattice.checkers.ai.AIProfile;
import com.lattice.checkers.ai.CheckersAI;
import com.lattice.checkers.ai.SearchStats;
import com.lattice.checkers.analysis.XRayAnalyzer;
import com.lattice.checkers.engine.EngineDiagnostics;
import com.lattice.checkers.engine.RulesEngine;
import com.lattice.checkers.history.BoardSnapshot;
import com.lattice.checkers.history.GameHistory;
import com.lattice.checkers.history.MoveRecord;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.GameStatus;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.Player;
import com.lattice.checkers.model.Position;
import com.lattice.checkers.model.Side;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * Application façade between JavaFX and the domain.
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
    private final List<Move> moveLog = new ArrayList<>();

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

    public Optional<Player> darkPlayer() {
        return Optional.ofNullable(darkPlayer);
    }

    public Optional<Player> lightPlayer() {
        return Optional.ofNullable(lightPlayer);
    }

    public List<Move> moveLog() {
        return List.copyOf(moveLog);
    }

    public void startHumanVsHuman(String darkName, String lightName) {
        darkPlayer = Player.human(Side.DARK, darkName == null || darkName.isBlank() ? "Dark" : darkName);
        lightPlayer = Player.human(Side.LIGHT, lightName == null || lightName.isBlank() ? "Light" : lightName);
        computerOpponent = null;
        beginNewGame();
    }

    public void startHumanVsComputer(String humanName, AIProfile profile, boolean humanIsDark) {
        Objects.requireNonNull(profile);
        String name = humanName == null || humanName.isBlank() ? "You" : humanName;
        if (humanIsDark) {
            darkPlayer = Player.human(Side.DARK, name);
            lightPlayer = Player.computer(Side.LIGHT, profile.displayName(), profile);
        } else {
            darkPlayer = Player.computer(Side.DARK, profile.displayName(), profile);
            lightPlayer = Player.human(Side.LIGHT, name);
        }
        computerOpponent = new CheckersAI(rulesEngine, profile, 4);
        beginNewGame();
    }

    private void beginNewGame() {
        state = GameState.newGame();
        selected = null;
        moveLog.clear();
        history.clear();
        history.setInitial(new BoardSnapshot(
                state.board().copy(), state.sideToMove(), state.status(), 0));
    }

    public void selectSquare(Position position) {
        Objects.requireNonNull(position);
        if (state == null || state.status() != GameStatus.IN_PROGRESS) {
            return;
        }

        // If a piece is selected, try to play to this square first.
        if (selected != null) {
            Optional<Move> chosen = findMoveTo(selected, position);
            if (chosen.isPresent()) {
                applyMove(chosen.get());
                return;
            }
        }

        Optional<Piece> piece = state.board().get(position);
        if (piece.isPresent() && piece.get().side() == state.sideToMove()) {
            Optional<Position> continuation = state.continuationFrom();
            if (continuation.isPresent() && !continuation.get().equals(position)) {
                selected = continuation.get();
                return;
            }
            List<Move> moves = rulesEngine.legalMovesFrom(state, position);
            selected = moves.isEmpty() ? null : position;
            return;
        }

        selected = state.continuationFrom().orElse(null);
    }

    public List<Move> legalMovesForSelection() {
        if (state == null || selected == null) {
            return List.of();
        }
        return rulesEngine.legalMovesFrom(state, selected);
    }

    public List<Position> legalDestinations() {
        List<Position> destinations = new ArrayList<>();
        for (Move move : legalMovesForSelection()) {
            destinations.add(move.to());
            destinations.addAll(move.path());
        }
        return List.copyOf(destinations);
    }

    public void applyMove(Move move) {
        Objects.requireNonNull(move);
        if (state == null) {
            throw new IllegalStateException("no active game");
        }
        GameState before = state;
        state = rulesEngine.apply(state, move);
        moveLog.add(move);
        int ply = moveLog.size() - 1;
        history.append(new MoveRecord(
                ply,
                before.sideToMove(),
                move,
                move.notation(),
                move.capturedSquares(before.board()).size(),
                before.board().get(move.from()).map(p -> !p.isKing()).orElse(false)
                        && state.board().get(move.to()).map(Piece::isKing).orElse(false),
                new BoardSnapshot(state.board().copy(), state.sideToMove(), state.status(), ply + 1)
        ));

        if (state.continuationFrom().isPresent()) {
            selected = state.continuationFrom().get();
        } else {
            selected = null;
        }
    }

    public void resign(Side side) {
        if (state == null || state.status() != GameStatus.IN_PROGRESS) {
            return;
        }
        state = rulesEngine.resign(state, side);
        selected = null;
    }

    public void resign(Player player) {
        if (player != null) {
            resign(player.side());
        }
    }

    public void restart() {
        if (darkPlayer == null || lightPlayer == null) {
            startHumanVsHuman("Dark", "Light");
            return;
        }
        beginNewGame();
    }

    public Optional<EngineDiagnostics> diagnostics() {
        if (state == null) {
            return Optional.empty();
        }
        return Optional.of(rulesEngine.diagnostics(state));
    }

    public Optional<SearchStats> lastAiStats() {
        if (computerOpponent == null) {
            return Optional.empty();
        }
        return computerOpponent.lastStats();
    }

    public String statusText() {
        if (state == null) {
            return "No game";
        }
        return switch (state.status()) {
            case NOT_STARTED -> "Not started";
            case IN_PROGRESS -> {
                String side = state.sideToMove() == Side.DARK ? "Dark" : "Light";
                if (state.continuationFrom().isPresent()) {
                    yield side + " must continue capture";
                }
                if (rulesEngine.hasForcedCapture(state)) {
                    yield side + " to move — capture required";
                }
                yield side + " to move";
            }
            case DARK_WINS -> "Dark wins";
            case LIGHT_WINS -> "Light wins";
            case RESIGNED_DARK -> "Light wins (Dark resigned)";
            case RESIGNED_LIGHT -> "Dark wins (Light resigned)";
        };
    }

    private Optional<Move> findMoveTo(Position from, Position clicked) {
        List<Move> moves = rulesEngine.legalMovesFrom(state, from);
        List<Move> endingHere = new ArrayList<>();
        List<Move> firstStepHere = new ArrayList<>();
        for (Move move : moves) {
            if (move.to().equals(clicked)) {
                endingHere.add(move);
            }
            if (move.path().get(0).equals(clicked)) {
                firstStepHere.add(move);
            }
        }
        if (endingHere.size() == 1) {
            return Optional.of(endingHere.get(0));
        }
        if (endingHere.size() > 1) {
            // Prefer the longest capturing line when the destination is shared.
            return endingHere.stream().max((a, b) -> Integer.compare(a.path().size(), b.path().size()));
        }
        if (firstStepHere.size() == 1) {
            Move full = firstStepHere.get(0);
            // Apply only the first jump so multi-jump feels step-by-step when an
            // intermediate square is clicked; full path when uniquely determined above.
            if (full.path().size() > 1) {
                return Optional.of(Move.jump(full.from(), full.path().get(0)));
            }
            return Optional.of(full);
        }
        return Optional.empty();
    }
}
