package com.lattice.checkers.ui.screens;

import javafx.geometry.Pos;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.VBox;

/**
 * Primary game board stub. Focus / X-Ray / Developer are modes on this screen.
 */
public final class GameBoardScreen {

    private final VBox root;

    public GameBoardScreen() {
        VBox side = new VBox(12,
                ScreenStub.panel("Status", "Side to move · captured pieces · result"),
                ScreenStub.panel("History", "Move list updates as plies are played"),
                ScreenStub.chipRow("Focus", "X-Ray", "Developer")
        );
        side.setPrefWidth(220);

        HBox body = new HBox(28, ScreenStub.boardSilhouette(), side);
        body.setAlignment(Pos.CENTER_LEFT);
        HBox.setHgrow(side, Priority.ALWAYS);

        root = ScreenStub.page(
                "Game Board",
                "Play surface with selection, legal moves, and optional strategic overlays.",
                "Phases 5–6 · modes in 8 & 11",
                body
        );
    }

    public VBox getRoot() {
        return root;
    }

    public static String screenId() {
        return "game-board";
    }

    public static String displayName() {
        return "Game Board";
    }
}
