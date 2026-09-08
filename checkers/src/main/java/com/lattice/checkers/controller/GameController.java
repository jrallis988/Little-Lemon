package com.lattice.checkers.controller;

import com.lattice.checkers.ai.AIDifficulty;
import com.lattice.checkers.ai.AIProfile;
import com.lattice.checkers.ai.CheckersAI;
import com.lattice.checkers.ai.SearchStats;
import com.lattice.checkers.analysis.XRayAnalyzer;
import com.lattice.checkers.engine.EngineDiagnostics;
import com.lattice.checkers.engine.RulesEngine;
import com.lattice.checkers.history.BoardSnapshot;
import com.lattice.checkers.history.GameHistory;
import com.lattice.checkers.history.MoveRecord;
import com.lattice.checkers.model.Faction;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.GameStatus;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.PieceRank;
import com.lattice.checkers.model.Player;
import com.lattice.checkers.model.Position;
import com.lattice.checkers.model.Side;
import com.lattice.checkers.score.ScoreEvent;
import com.lattice.checkers.score.ScoreManager;
import com.lattice.checkers.score.ScoreState;
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
    private final ScoreManager scoreManager = new ScoreManager();
    private List<ScoreEvent> lastScoreEvents = List.of();

    public GameController() {
        this.rulesEngine = new RulesEngine();
        this.history = new GameHistory();
        this.appMode = new AppMode();
        this.xRayAnalyzer = new XRayAnalyzer(rulesEngine);
    }

    public ScoreManager scoreManager() {
        return scoreManager;
    }

    public ScoreState scoreState() {
        return scoreManager.state();
    }

    public List<ScoreEvent> lastScoreEvents() {
        return lastScoreEvents;
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
        darkPlayer = Player.human(Side.DARK, darkName == null || darkName.isBlank() ? Faction.FROG.displayName() : darkName);
        lightPlayer = Player.human(Side.LIGHT, lightName == null || lightName.isBlank() ? Faction.TRAFFIC.displayName() : lightName);
        computerOpponent = null;
        beginNewGame();
    }

    public void startHumanVsComputer(String humanName, AIDifficulty difficulty, boolean humanIsDark) {
        Objects.requireNonNull(difficulty);
        String name = humanName == null || humanName.isBlank()
                ? (humanIsDark ? Faction.FROG.displayName() : Faction.TRAFFIC.displayName())
                : humanName;
        String computerName = (humanIsDark ? Faction.TRAFFIC.displayName() : Faction.FROG.displayName())
                + " · " + difficulty.displayName();
        if (humanIsDark) {
            darkPlayer = Player.human(Side.DARK, name);
            lightPlayer = Player.computer(Side.LIGHT, computerName, difficulty);
        } else {
            darkPlayer = Player.computer(Side.DARK, computerName, difficulty);
            lightPlayer = Player.human(Side.LIGHT, name);
        }
        computerOpponent = new CheckersAI(rulesEngine, difficulty);
        beginNewGame();
    }

    public void startHumanVsComputer(String humanName, AIProfile profile, boolean humanIsDark) {
        Objects.requireNonNull(profile);
        startHumanVsComputer(humanName, AIDifficulty.MEDIUM, humanIsDark);
        String name = humanName == null || humanName.isBlank() ? "You" : humanName;
        if (humanIsDark) {
            lightPlayer = Player.computer(Side.LIGHT, profile.displayName(), profile);
        } else {
            darkPlayer = Player.computer(Side.DARK, profile.displayName(), profile);
        }
        computerOpponent = new CheckersAI(rulesEngine, profile, AIDifficulty.MEDIUM.searchDepth());
    }

    private void beginNewGame() {
        state = GameState.newGame();
        selected = null;
        moveLog.clear();
        lastScoreEvents = List.of();
        scoreManager.reset();
        history.clear();
        history.setInitial(new BoardSnapshot(
                state.board().copy(), state.sideToMove(), state.status(), 0));
    }

    public void selectSquare(Position position) {
        Objects.requireNonNull(position);
        if (state == null || state.status() != GameStatus.IN_PROGRESS) {
            return;
        }
        if (isComputerToMove()) {
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

        recordScore(before, move, state);

        if (state.continuationFrom().isPresent()) {
            selected = state.continuationFrom().get();
        } else {
            selected = null;
        }
    }

    private void recordScore(GameState before, Move move, GameState after) {
        List<Position> captured = move.capturedSquares(before.board());
        int manCaptures = 0;
        int kingCaptures = 0;
        for (Position square : captured) {
            Optional<Piece> victim = before.board().get(square);
            if (victim.isEmpty()) {
                continue;
            }
            if (victim.get().rank() == PieceRank.KING) {
                kingCaptures++;
            } else {
                manCaptures++;
            }
        }
        boolean promoted = before.board().get(move.from()).map(p -> !p.isKing()).orElse(false)
                && after.board().get(move.to()).map(Piece::isKing).orElse(false);
        boolean turnComplete = after.continuationFrom().isEmpty();
        boolean matchWon = after.status().isTerminal()
                && winningSide(after.status()).filter(side -> side == before.sideToMove()).isPresent();
        lastScoreEvents = scoreManager.recordPly(
                before.sideToMove(), manCaptures, kingCaptures, promoted, turnComplete, matchWon);
    }

    private static Optional<Side> winningSide(GameStatus status) {
        return switch (status) {
            case DARK_WINS, RESIGNED_LIGHT -> Optional.of(Side.DARK);
            case LIGHT_WINS, RESIGNED_DARK -> Optional.of(Side.LIGHT);
            default -> Optional.empty();
        };
    }

    public void resign(Side side) {
        if (state == null || state.status() != GameStatus.IN_PROGRESS) {
            return;
        }
        state = rulesEngine.resign(state, side);
        selected = null;
        winningSide(state.status()).ifPresent(winner ->
                lastScoreEvents = scoreManager.recordPly(winner, 0, 0, false, false, true));
    }

    public void resign(Player player) {
        if (player != null) {
            resign(player.side());
        }
    }

    public void restart() {
        if (darkPlayer == null || lightPlayer == null) {
            startHumanVsHuman("Frog", "Traffic");
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
                String side = Faction.of(state.sideToMove()).displayName();
                if (state.continuationFrom().isPresent()) {
                    yield side + " must continue capture";
                }
                if (rulesEngine.hasForcedCapture(state)) {
                    yield side + " to move — capture required";
                }
                yield side + " to move";
            }
            case DARK_WINS -> "Frog wins";
            case LIGHT_WINS -> "Traffic wins";
            case RESIGNED_DARK -> "Traffic wins (Frog resigned)";
            case RESIGNED_LIGHT -> "Frog wins (Traffic resigned)";
        };
    }

    public boolean isComputerToMove() {
        if (state == null || computerOpponent == null || state.status() != GameStatus.IN_PROGRESS) {
            return false;
        }
        Player player = state.sideToMove() == Side.DARK ? darkPlayer : lightPlayer;
        return player != null && player.isComputer();
    }

    public Optional<AIDifficulty> computerDifficulty() {
        if (computerOpponent == null) {
            return Optional.empty();
        }
        return Optional.of(computerOpponent.difficulty());
    }

    /**
     * Search only. Caller applies the move so UI can animate on the JavaFX thread.
     */
    public Optional<Move> chooseComputerMove() {
        if (!isComputerToMove()) {
            return Optional.empty();
        }
        return computerOpponent.chooseMove(state);
    }

    public void hint() {
        if (state == null || state.status() != GameStatus.IN_PROGRESS || isComputerToMove()) {
            return;
        }
        List<Move> legal = rulesEngine.legalMoves(state);
        if (legal.isEmpty()) {
            return;
        }
        Move capture = legal.stream().filter(Move::isJump).findFirst().orElse(legal.getFirst());
        selected = capture.from();
    }

    public int remaining(Side side) {
        return state == null ? 12 : state.board().count(side);
    }

    public int capturedCount(Side attacker) {
        return 12 - remaining(attacker.opposite());
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
