package com.lattice.checkers.ui.screens;

import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.model.Faction;
import com.lattice.checkers.model.GameStatus;
import com.lattice.checkers.ui.components.BoardView;
import com.lattice.checkers.ui.components.FactionHud;
import com.lattice.checkers.ui.components.StatusBar;
import javafx.animation.PauseTransition;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.Region;
import javafx.scene.layout.VBox;
import javafx.util.Duration;
import java.util.function.Consumer;

/**
 * Arcade Game Board: Frog HUD · Crossing world · Traffic HUD · status bar.
 */
public final class GameBoardScreen {

    private final BorderPane root;
    private final GameController controller;
    private final BoardView boardView;
    private final FactionHud frogHud;
    private final FactionHud trafficHud;
    private final StatusBar statusBar;
    private final boolean reducedMotion;
    private final Consumer<String> onNavigate;
    private boolean matchCompleteScheduled;

    public GameBoardScreen(GameController controller, Consumer<String> onNavigate, boolean reducedMotion) {
        this.controller = controller;
        this.onNavigate = onNavigate;
        this.reducedMotion = reducedMotion;
        if (controller.state().isEmpty()) {
            controller.startHumanVsHuman("Frog", "Traffic");
        }

        Label brand = new Label("LATTICE");
        brand.getStyleClass().add("arcade-title");
        Label tag = new Label("AMERICAN CHECKERS  ·  PLAY, ANALYZE, UNDERSTAND");
        tag.getStyleClass().add("arcade-kicker");
        VBox header = new VBox(2, brand, tag);
        header.setAlignment(Pos.CENTER_LEFT);
        header.setPadding(new Insets(4, 8, 2, 8));

        boardView = new BoardView(controller, ignored -> afterChange(), reducedMotion);
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

        root = new BorderPane(body);
        root.getStyleClass().add("game-board-screen");
        afterChange();
    }

    public BorderPane getRoot() {
        return root;
    }

    public static String screenId() {
        return "game-board";
    }

    public static String displayName() {
        return "Game Board";
    }

    private void restart() {
        matchCompleteScheduled = false;
        controller.restart();
        boardView.refresh();
        afterChange();
    }

    private void resign() {
        controller.state().ifPresent(state -> controller.resign(state.sideToMove()));
        boardView.refresh();
        afterChange();
    }

    private void hint() {
        controller.hint();
        boardView.refresh();
        afterChange();
    }

    private void afterChange() {
        frogHud.refresh();
        trafficHud.refresh();
        statusBar.refresh(reducedMotion);
        controller.state().ifPresent(state -> {
            if (state.status().isTerminal() && onNavigate != null && !matchCompleteScheduled) {
                matchCompleteScheduled = true;
                PauseTransition pause = new PauseTransition(Duration.millis(reducedMotion ? 80 : 900));
                pause.setOnFinished(e -> onNavigate.accept("match-complete"));
                pause.play();
            }
        });
    }
}
