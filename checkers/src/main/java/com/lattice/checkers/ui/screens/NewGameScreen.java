package com.lattice.checkers.ui.screens;

import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;

/**
 * New Game configuration stub — human/computer + AI profile selection.
 */
public final class NewGameScreen {

    private final VBox root;

    public NewGameScreen() {
        VBox modes = new VBox(12,
                ScreenStub.panel("Human vs Human", "Local match. No AI profile required."),
                ScreenStub.panel("Human vs Computer", "Choose Aggressor, Defender, or Strategist."),
                ScreenStub.panel("Side & depth", "Who moves first and search depth — later phases.")
        );

        HBox profiles = ScreenStub.chipRow("AGGRESSOR", "DEFENDER", "STRATEGIST");
        Label profilesLabel = new Label("AI profiles");
        profilesLabel.getStyleClass().add("panel-heading");
        VBox profileBlock = new VBox(8, profilesLabel, profiles);
        profileBlock.getStyleClass().add("preview-panel");

        VBox body = new VBox(16, modes, profileBlock);
        root = ScreenStub.page(
                "New Game",
                "Choose opponents and an AI playing style before the board appears.",
                "Phases 5–7",
                body
        );
    }

    public VBox getRoot() {
        return root;
    }

    public static String screenId() {
        return "new-game";
    }

    public static String displayName() {
        return "New Game";
    }
}
