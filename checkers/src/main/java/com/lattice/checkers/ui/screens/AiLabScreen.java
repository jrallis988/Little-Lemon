package com.lattice.checkers.ui.screens;

import com.lattice.checkers.ai.AIDifficulty;
import com.lattice.checkers.ai.AIProfile;
import com.lattice.checkers.ai.SearchStats;
import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.model.Faction;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.PieceRank;
import com.lattice.checkers.model.Side;
import com.lattice.checkers.ui.LatticeApplication;
import com.lattice.checkers.ui.components.BoardView;
import com.lattice.checkers.ui.components.PieceView;
import javafx.animation.PauseTransition;
import javafx.application.Platform;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.Region;
import javafx.scene.layout.VBox;
import javafx.util.Duration;
import java.util.Locale;
import java.util.Optional;
import java.util.function.Consumer;

/**
 * Watch two computer profiles play the same American checkers rules.
 * Search quality comes from difficulty; style comes from evaluation weights.
 */
public final class AiLabScreen {

    private final VBox root;
    private final GameController controller;
    private final Consumer<String> onNavigate;
    private final boolean reducedMotion;
    private final BoardView boardView;

    private AIProfile frogStyle = AIProfile.STRATEGIST;
    private AIProfile trafficStyle = AIProfile.AGGRESSOR;
    private AIDifficulty difficulty = AIDifficulty.MEDIUM;

    private final Label statusLabel = new Label();
    private final Label plyLabel = new Label();
    private final Label telemetryMove = new Label();
    private final Label telemetryDetail = new Label();
    private final HBox frogStyles = new HBox(8);
    private final HBox trafficStyles = new HBox(8);
    private final HBox difficultyRow = new HBox(8);
    private Button watchButton;
    private Button pauseButton;
    private Button stepButton;

    private boolean watching;
    private boolean computerBusy;
    private int computerJob;

    public AiLabScreen() {
        this(null, null, true);
    }

    public AiLabScreen(GameController controller, Consumer<String> onNavigate) {
        this(controller, onNavigate, true);
    }

    public AiLabScreen(GameController controller, Consumer<String> onNavigate, boolean reducedMotion) {
        this.controller = controller == null ? new GameController() : controller;
        this.onNavigate = onNavigate;
        this.reducedMotion = reducedMotion;

        if (this.controller.isAiVsAi()) {
            frogStyle = this.controller.darkPlayer().flatMap(player -> player.aiProfile()).orElse(frogStyle);
            trafficStyle = this.controller.lightPlayer().flatMap(player -> player.aiProfile()).orElse(trafficStyle);
        } else {
            this.controller.startAiVsAi(frogStyle, trafficStyle, difficulty);
        }

        Label brand = new Label(LatticeApplication.WORDMARK);
        brand.getStyleClass().addAll("arcade-title", "board-wordmark");
        Label title = new Label("AI LAB");
        title.getStyleClass().add("screen-title");
        Label subtitle = new Label(
                "Two computers. Same rules. Style is evaluation weights — difficulty is search depth.");
        subtitle.getStyleClass().add("screen-subtitle");
        subtitle.setWrapText(true);
        VBox header = new VBox(6, brand, title, subtitle);
        header.setAlignment(Pos.CENTER_LEFT);

        boardView = new BoardView(this.controller, ignored -> refreshHud(), reducedMotion);
        boardView.setInputEnabled(false);

        HBox matchup = new HBox(22,
                styleRow(Faction.FROG, frogStyles),
                styleRow(Faction.TRAFFIC, trafficStyles)
        );
        matchup.setAlignment(Pos.CENTER_LEFT);
        rebuildStyleRows();

        statusLabel.getStyleClass().add("lab-status");
        statusLabel.setWrapText(true);
        plyLabel.getStyleClass().add("muted-copy");
        telemetryMove.getStyleClass().add("analysis-move");
        telemetryMove.setWrapText(true);
        telemetryDetail.getStyleClass().add("lab-telemetry");
        telemetryDetail.setWrapText(true);

        watchButton = actionButton("WATCH", this::watch);
        watchButton.getStyleClass().add("primary-cta");
        pauseButton = actionButton("PAUSE", this::pause);
        stepButton = actionButton("STEP", this::step);
        Button restart = actionButton("RESTART", this::restartMatch);
        HBox transport = new HBox(8, watchButton, pauseButton, stepButton, restart);
        transport.setAlignment(Pos.CENTER_LEFT);

        Label depthHeading = labeled("SEARCH DEPTH");
        difficultyRow.setAlignment(Pos.CENTER_LEFT);
        rebuildDifficultyRow();

        VBox telemetry = new VBox(8,
                labeled("LAST DECISION"),
                statusLabel,
                plyLabel,
                telemetryMove,
                telemetryDetail
        );
        telemetry.getStyleClass().add("preview-panel");
        telemetry.setPadding(new Insets(16));

        VBox depthBlock = new VBox(8, depthHeading, difficultyRow);
        depthBlock.getStyleClass().add("preview-panel");
        depthBlock.setPadding(new Insets(16));

        Button analysis = actionButton("MATCH ANALYSIS", () -> navigate("match-analysis"));
        Button home = actionButton("HOME", () -> navigate("home"));
        HBox nav = new HBox(10, analysis, home);
        nav.setAlignment(Pos.CENTER_LEFT);

        VBox sidebar = new VBox(12, telemetry, depthBlock, transport, nav);
        sidebar.setPrefWidth(340);
        sidebar.setMinWidth(300);

        Region spacer = new Region();
        HBox.setHgrow(spacer, Priority.ALWAYS);
        HBox stage = new HBox(20, boardView, sidebar, spacer);
        stage.setAlignment(Pos.TOP_CENTER);
        HBox.setHgrow(boardView, Priority.NEVER);

        root = new VBox(14, header, matchup, stage);
        root.setPadding(new Insets(16, 24, 20, 24));
        root.getStyleClass().addAll("screen-root", "lab-root");
        refreshHud();
    }

    public VBox getRoot() {
        return root;
    }

    public static String screenId() {
        return "ai-lab";
    }

    public static String displayName() {
        return "AI Lab";
    }

    private void watch() {
        if (isTerminal()) {
            return;
        }
        watching = true;
        refreshHud();
        playNext(false);
    }

    private void pause() {
        watching = false;
        computerJob++;
        computerBusy = false;
        refreshHud();
    }

    private void step() {
        if (computerBusy || isTerminal()) {
            return;
        }
        watching = false;
        playNext(true);
    }

    private void restartMatch() {
        computerJob++;
        computerBusy = false;
        watching = false;
        controller.startAiVsAi(frogStyle, trafficStyle, difficulty);
        boardView.refresh();
        refreshHud();
    }

    private void playNext(boolean singleStep) {
        if (computerBusy || !controller.isComputerToMove()) {
            refreshHud();
            return;
        }
        computerBusy = true;
        refreshHud();
        final int job = computerJob;
        PauseTransition pause = new PauseTransition(Duration.millis(reducedMotion ? 40 : 260));
        pause.setOnFinished(event -> {
            if (job != computerJob) {
                return;
            }
            Thread worker = new Thread(() -> {
                Optional<Move> move;
                try {
                    move = controller.chooseComputerMove();
                } catch (RuntimeException ex) {
                    Platform.runLater(() -> {
                        if (job == computerJob) {
                            computerBusy = false;
                            watching = false;
                            refreshHud();
                        }
                    });
                    return;
                }
                Platform.runLater(() -> {
                    if (job != computerJob) {
                        return;
                    }
                    move.ifPresent(controller::applyMove);
                    computerBusy = false;
                    boardView.refresh();
                    refreshHud();
                    if (isTerminal()) {
                        watching = false;
                        refreshHud();
                        return;
                    }
                    if (!singleStep && watching) {
                        playNext(false);
                    }
                });
            }, "frogger-ai-lab");
            worker.setDaemon(true);
            worker.start();
        });
        pause.play();
    }

    private void refreshHud() {
        statusLabel.setText(controller.statusText());
        int ply = controller.moveLog().size();
        plyLabel.setText("Ply  " + ply
                + "  ·  Frogger " + controller.remaining(Side.DARK)
                + "  ·  Traffic " + controller.remaining(Side.LIGHT));
        controller.lastAiStats().ifPresentOrElse(this::showStats, this::clearStats);
        watchButton.setDisable(watching || computerBusy || isTerminal());
        pauseButton.setDisable(!watching && !computerBusy);
        stepButton.setDisable(watching || computerBusy || isTerminal());
        rebuildStyleRows();
        rebuildDifficultyRow();
    }

    private boolean isTerminal() {
        return controller.state().map(state -> state.status().isTerminal()).orElse(true);
    }

    private void showStats(SearchStats stats) {
        telemetryMove.setText(stats.selectedMoveLabel().isBlank()
                ? "Thinking…"
                : stats.selectedMoveLabel());
        telemetryDetail.setText(
                "Depth  " + stats.depth()
                        + "  ·  Positions  " + stats.positionsEvaluated()
                        + "  ·  " + stats.decisionTimeMs() + " ms"
                        + "  ·  Eval  " + formatEval(stats.evaluation()));
    }

    private void clearStats() {
        telemetryMove.setText("Paused — Watch or Step to start.");
        telemetryDetail.setText("Search stats appear after the first computer decision.");
    }

    private static String formatEval(double evaluation) {
        return String.format(Locale.US, "%+.1f", evaluation);
    }

    private void rebuildStyleRows() {
        fillStyleRow(frogStyles, frogStyle, profile -> {
            if (frogStyle != profile) {
                frogStyle = profile;
                restartMatch();
            }
        });
        fillStyleRow(trafficStyles, trafficStyle, profile -> {
            if (trafficStyle != profile) {
                trafficStyle = profile;
                restartMatch();
            }
        });
    }

    private void fillStyleRow(HBox row, AIProfile selected, Consumer<AIProfile> onPick) {
        row.getChildren().clear();
        boolean locked = watching || computerBusy;
        for (AIProfile profile : AIProfile.values()) {
            Button button = new Button(profile.displayName().toUpperCase());
            button.getStyleClass().add("difficulty-button");
            if (profile == selected) {
                button.getStyleClass().add("difficulty-button-selected");
            }
            button.setDisable(locked);
            button.setOnAction(event -> onPick.accept(profile));
            row.getChildren().add(button);
        }
    }

    private void rebuildDifficultyRow() {
        difficultyRow.getChildren().clear();
        boolean locked = watching || computerBusy;
        for (AIDifficulty value : new AIDifficulty[] {
                AIDifficulty.EASY, AIDifficulty.MEDIUM, AIDifficulty.HARD
        }) {
            Button button = new Button(value.displayName().toUpperCase());
            button.getStyleClass().add("difficulty-button");
            if (value == difficulty) {
                button.getStyleClass().add("difficulty-button-selected");
            }
            button.setDisable(locked);
            button.setOnAction(event -> {
                if (difficulty != value) {
                    difficulty = value;
                    restartMatch();
                }
            });
            difficultyRow.getChildren().add(button);
        }
    }

    private static VBox styleRow(Faction faction, HBox buttons) {
        PieceView emblem = new PieceView(new Piece(faction.side(), PieceRank.MAN), 24);
        Label name = new Label(faction.displayName());
        name.getStyleClass().addAll("hud-faction-name",
                faction == Faction.FROG ? "home-frog" : "home-traffic");
        Label caption = new Label("STYLE");
        caption.getStyleClass().add("hud-caption");
        HBox identity = new HBox(8, emblem, name);
        identity.setAlignment(Pos.CENTER_LEFT);
        VBox column = new VBox(8, identity, caption, buttons);
        column.getStyleClass().add("preview-panel");
        column.setPadding(new Insets(12));
        return column;
    }

    private void navigate(String id) {
        pause();
        if (onNavigate != null) {
            onNavigate.accept(id);
        }
    }

    private static Label labeled(String text) {
        Label label = new Label(text);
        label.getStyleClass().add("panel-heading");
        return label;
    }

    private static Button actionButton(String text, Runnable action) {
        Button button = new Button(text);
        button.getStyleClass().add("action-button");
        button.setOnAction(event -> action.run());
        return button;
    }
}
