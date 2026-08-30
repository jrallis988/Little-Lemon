package com.lattice.checkers.ui.screens;

import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Side;
import com.lattice.checkers.ui.components.BoardView;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ListView;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.VBox;
import java.util.function.Consumer;

/**
 * Primary playable game board experience.
 */
public final class GameBoardScreen {

    private final BorderPane root;
    private final GameController controller;
    private final BoardView boardView;
    private final Label statusLabel;
    private final Label turnLabel;
    private final Label forceLabel;
    private final ListView<String> historyList;
    private final Label darkCaptured;
    private final Label lightCaptured;

    public GameBoardScreen(GameController controller, Consumer<String> onNavigate, boolean reducedMotion) {
        this.controller = controller;
        if (controller.state().isEmpty()) {
            controller.startHumanVsHuman("Dark", "Light");
        }

        Label brand = new Label("Lattice");
        brand.getStyleClass().add("brand-small");

        statusLabel = new Label();
        statusLabel.getStyleClass().add("status-line");

        turnLabel = new Label();
        turnLabel.getStyleClass().add("turn-pill");

        forceLabel = new Label();
        forceLabel.getStyleClass().add("force-pill");

        HBox topMeta = new HBox(12, turnLabel, forceLabel);
        topMeta.setAlignment(Pos.CENTER_LEFT);

        VBox header = new VBox(8, brand, statusLabel, topMeta);
        header.getStyleClass().add("board-header");

        boardView = new BoardView(controller, ignored -> refreshChrome(), reducedMotion);

        historyList = new ListView<>();
        historyList.getStyleClass().add("move-history");
        historyList.setFocusTraversable(false);
        historyList.setPrefWidth(176);
        historyList.setPlaceholder(new Label("No moves yet"));

        darkCaptured = new Label();
        lightCaptured = new Label();
        darkCaptured.getStyleClass().add("muted-copy");
        lightCaptured.getStyleClass().add("muted-copy");

        Label historyTitle = new Label("Move history");
        historyTitle.getStyleClass().add("panel-heading");

        Button restart = actionButton("Restart", () -> {
            controller.restart();
            boardView.refresh();
            refreshChrome();
        });
        Button resign = actionButton("Resign", () -> {
            controller.state().ifPresent(state -> controller.resign(state.sideToMove()));
            boardView.refresh();
            refreshChrome();
        });
        Button home = actionButton("Home", () -> {
            if (onNavigate != null) {
                onNavigate.accept("home");
            }
        });

        VBox side = new VBox(14,
                historyTitle,
                historyList,
                darkCaptured,
                lightCaptured,
                new VBox(8, restart, resign, home)
        );
        side.getStyleClass().add("board-side");
        side.setPadding(new Insets(8, 4, 8, 8));
        VBox.setVgrow(historyList, Priority.ALWAYS);

        HBox center = new HBox(28, boardView, side);
        center.setAlignment(Pos.TOP_CENTER);
        center.getStyleClass().add("board-stage");
        center.setPadding(new Insets(8, 0, 16, 0));

        Label hint = new Label(
                "Select a piece, then a marked square. Captures are mandatory. Keyboard: arrows + Enter.");
        hint.getStyleClass().add("hint-line");
        hint.setWrapText(true);

        VBox body = new VBox(18, header, center, hint);
        body.setPadding(new Insets(28, 36, 28, 36));
        body.getStyleClass().add("screen-root");

        root = new BorderPane(body);
        root.getStyleClass().add("game-board-screen");
        refreshChrome();
        boardView.refresh();
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

    private void refreshChrome() {
        statusLabel.setText(controller.statusText());
        controller.state().ifPresentOrElse(state -> {
            boolean dark = state.sideToMove() == Side.DARK;
            turnLabel.setText(dark ? "DARK" : "LIGHT");
            turnLabel.getStyleClass().setAll("turn-pill", dark ? "turn-dark" : "turn-light");
            boolean forced = state.status().name().equals("IN_PROGRESS")
                    && controller.rulesEngine().hasForcedCapture(state);
            forceLabel.setText(forced ? "CAPTURE REQUIRED" : "OPEN TURN");
            forceLabel.getStyleClass().setAll("force-pill", forced ? "force-on" : "force-off");

            int lightLeft = state.board().count(Side.LIGHT);
            int darkLeft = state.board().count(Side.DARK);
            darkCaptured.setText("Captured by Dark  ·  " + (12 - lightLeft));
            lightCaptured.setText("Captured by Light  ·  " + (12 - darkLeft));
        }, () -> {
            turnLabel.setText("—");
            forceLabel.setText("");
            darkCaptured.setText("Captured by Dark  ·  0");
            lightCaptured.setText("Captured by Light  ·  0");
        });

        historyList.getItems().clear();
        int i = 1;
        for (Move move : controller.moveLog()) {
            historyList.getItems().add(i + ". " + move.notation());
            i++;
        }
        if (!historyList.getItems().isEmpty()) {
            historyList.scrollTo(historyList.getItems().size() - 1);
        }
    }

    private static Button actionButton(String text, Runnable action) {
        Button button = new Button(text);
        button.getStyleClass().add("action-button");
        button.setMaxWidth(Double.MAX_VALUE);
        button.setOnAction(e -> action.run());
        return button;
    }
}
