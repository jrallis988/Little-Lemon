package com.lattice.checkers.ui.screens;

import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.model.Faction;
import com.lattice.checkers.model.GameStatus;
import com.lattice.checkers.ui.components.BoardView;
import com.lattice.checkers.ui.components.FactionHud;
import com.lattice.checkers.ui.components.StatusBar;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.VBox;
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
        header.setPadding(new Insets(8, 18, 4, 18));

        boardView = new BoardView(controller, ignored -> afterChange(), reducedMotion);
        frogHud = new FactionHud(controller, Faction.FROG);
        trafficHud = new FactionHud(controller, Faction.TRAFFIC);

        HBox stage = new HBox(16, frogHud, boardView, trafficHud);
        stage.setAlignment(Pos.TOP_CENTER);
        stage.getStyleClass().add("arcade-stage");
        HBox.setHgrow(boardView, Priority.ALWAYS);

        statusBar = new StatusBar(
                controller,
                this::restart,
                this::resign,
                this::hint,
                onNavigate,
                reducedMotion
        );

        VBox body = new VBox(10, header, stage, statusBar);
        body.getStyleClass().addAll("screen-root", "arcade-root");
        body.setPadding(new Insets(10, 16, 14, 16));
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
            if (state.status() != GameStatus.IN_PROGRESS && onNavigate != null
                    && state.status().isTerminal()) {
                // stay on board; Match Complete is available from chrome
            }
        });
    }
}
