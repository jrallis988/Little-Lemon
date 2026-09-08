package com.lattice.checkers.ui.screens;

import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.model.Faction;
import com.lattice.checkers.model.GameStatus;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.ui.LatticeApplication;
import com.lattice.checkers.ui.components.BoardView;
import com.lattice.checkers.ui.components.FactionHud;
import com.lattice.checkers.ui.components.HowToPlayOverlay;
import com.lattice.checkers.ui.components.StatusBar;
import javafx.animation.PauseTransition;
import javafx.application.Platform;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.Region;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.util.Duration;
import java.util.Optional;
import java.util.function.Consumer;

/**
 * Arcade Game Board: Frog HUD · Crossing world · Traffic HUD · status bar.
 */
public final class GameBoardScreen {

    private final StackPane root;
    private final GameController controller;
    private final BoardView boardView;
    private final FactionHud frogHud;
    private final FactionHud trafficHud;
    private final StatusBar statusBar;
    private final HowToPlayOverlay howToPlay;
    private final boolean reducedMotion;
    private final Consumer<String> onNavigate;
    private boolean matchCompleteScheduled;
    private boolean computerBusy;
    private int computerJob;

    public GameBoardScreen(GameController controller, Consumer<String> onNavigate, boolean reducedMotion) {
        this.controller = controller;
        this.onNavigate = onNavigate;
        this.reducedMotion = reducedMotion;
        if (controller.state().isEmpty()) {
            controller.startHumanVsHuman("Frogger", "Traffic");
        }

        Label brand = new Label(LatticeApplication.WORDMARK);
        brand.getStyleClass().addAll("arcade-title", "board-wordmark");
        Label tag = new Label("AMERICAN CHECKERS  ·  FROGGER VS TRAFFIC");
        tag.getStyleClass().add("arcade-kicker");
        VBox headerText = new VBox(2, brand, tag);
        headerText.setAlignment(Pos.CENTER_LEFT);

        boardView = new BoardView(controller, ignored -> afterChange(), reducedMotion);
        howToPlay = new HowToPlayOverlay(this::resumeMatch, reducedMotion);

        Region headerSpacer = new Region();
        HBox.setHgrow(headerSpacer, Priority.ALWAYS);
        HBox header = new HBox(12, headerText, headerSpacer,
                HowToPlayOverlay.openButton(this::openHowToPlay));
        header.setAlignment(Pos.CENTER_LEFT);
        header.setPadding(new Insets(4, 8, 2, 8));

        frogHud = new FactionHud(controller, Faction.FROG);
        trafficHud = new FactionHud(controller, Faction.TRAFFIC);
        VBox.setVgrow(frogHud, Priority.ALWAYS);
        VBox.setVgrow(trafficHud, Priority.ALWAYS);

        Region leftPad = new Region();
        Region rightPad = new Region();
        HBox.setHgrow(leftPad, Priority.SOMETIMES);
        HBox.setHgrow(rightPad, Priority.SOMETIMES);
        HBox stage = new HBox(18, leftPad, frogHud, boardView, trafficHud, rightPad);
        stage.setAlignment(Pos.TOP_CENTER);
        stage.getStyleClass().add("arcade-stage");
        HBox.setHgrow(boardView, Priority.NEVER);

        statusBar = new StatusBar(
                controller,
                this::restart,
                this::resign,
                this::hint,
                onNavigate,
                reducedMotion
        );

        VBox body = new VBox(8, header, stage, statusBar);
        body.getStyleClass().addAll("screen-root", "arcade-root");
        body.setPadding(new Insets(8, 14, 12, 14));
        VBox.setVgrow(stage, Priority.ALWAYS);

        root = new StackPane(body, howToPlay);
        root.getStyleClass().add("game-board-screen");
        afterChange();
    }

    public StackPane getRoot() {
        return root;
    }

    public static String screenId() {
        return "game-board";
    }

    public static String displayName() {
        return "Game Board";
    }

    private void openHowToPlay() {
        boardView.setInputEnabled(false);
        howToPlay.show();
    }

    private void resumeMatch() {
        if (!controller.isComputerToMove() && !computerBusy) {
            boardView.setInputEnabled(true);
        }
        boardView.requestFocus();
        maybePlayComputer();
    }

    private void restart() {
        if (howToPlay.isShowing()) {
            return;
        }
        matchCompleteScheduled = false;
        cancelComputer();
        controller.restart();
        boardView.refresh();
        afterChange();
    }

    private void resign() {
        if (howToPlay.isShowing()) {
            return;
        }
        cancelComputer();
        controller.state().ifPresent(state -> controller.resign(state.sideToMove()));
        boardView.refresh();
        afterChange();
    }

    private void hint() {
        if (howToPlay.isShowing()) {
            return;
        }
        controller.hint();
        boardView.refresh();
        afterChange();
    }

    private void cancelComputer() {
        computerJob++;
        computerBusy = false;
    }

    private void maybePlayComputer() {
        if (howToPlay.isShowing() || computerBusy || matchCompleteScheduled) {
            return;
        }
        if (!controller.isComputerToMove()) {
            boardView.setInputEnabled(true);
            return;
        }
        computerBusy = true;
        boardView.setInputEnabled(false);
        final int job = computerJob;
        PauseTransition pause = new PauseTransition(Duration.millis(reducedMotion ? 40 : 280));
        pause.setOnFinished(e -> {
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
                            boardView.setInputEnabled(!controller.isComputerToMove());
                        }
                    });
                    return;
                }
                Platform.runLater(() -> {
                    if (job != computerJob) {
                        return;
                    }
                    if (howToPlay.isShowing()) {
                        computerBusy = false;
                        return;
                    }
                    move.ifPresent(controller::applyMove);
                    computerBusy = false;
                    boardView.refresh();
                    afterChange();
                });
            }, "lattice-ai");
            worker.setDaemon(true);
            worker.start();
        });
        pause.play();
    }

    private void afterChange() {
        frogHud.refresh();
        trafficHud.refresh();
        statusBar.refresh(reducedMotion);
        controller.state().ifPresent(state -> {
            if (state.status().isTerminal() && onNavigate != null && !matchCompleteScheduled
                    && !howToPlay.isShowing()) {
                matchCompleteScheduled = true;
                PauseTransition pause = new PauseTransition(Duration.millis(reducedMotion ? 80 : 900));
                pause.setOnFinished(e -> onNavigate.accept("match-complete"));
                pause.play();
            }
        });
        if (!controller.state().map(s -> s.status().isTerminal()).orElse(true)) {
            maybePlayComputer();
        }
    }
}
