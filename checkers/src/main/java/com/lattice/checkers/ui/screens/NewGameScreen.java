package com.lattice.checkers.ui.screens;

import com.lattice.checkers.controller.GameController;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import java.util.function.Consumer;

/**
 * New Game configuration — starts a human vs human match (AI vs human later).
 */
public final class NewGameScreen {

    private final VBox root;

    public NewGameScreen() {
        this(null, null);
    }

    public NewGameScreen(GameController controller, Consumer<String> onNavigate) {
        Label title = new Label("New Game");
        title.getStyleClass().add("screen-title");

        Label subtitle = new Label("Start a local match. Computer profiles arrive with the AI phase.");
        subtitle.getStyleClass().add("screen-subtitle");
        subtitle.setWrapText(true);

        Button hvh = primaryButton("Human vs Human", () -> {
            if (controller != null) {
                controller.startHumanVsHuman("Dark", "Light");
            }
            if (onNavigate != null) {
                onNavigate.accept("game-board");
            }
        });

        VBox modes = new VBox(12,
                hvh,
                disabledCard("Human vs Computer", "Aggressor · Defender · Strategist — coming next"),
                disabledCard("AI Lab matchup", "Open from Home once AI Lab ships")
        );

        HBox profiles = ScreenStub.chipRow("AGGRESSOR", "DEFENDER", "STRATEGIST");
        Label profilesLabel = new Label("AI profiles (preview)");
        profilesLabel.getStyleClass().add("panel-heading");
        VBox profileBlock = new VBox(8, profilesLabel, profiles);
        profileBlock.getStyleClass().add("preview-panel");
        profileBlock.setPadding(new Insets(16));

        root = new VBox(22, title, subtitle, modes, profileBlock);
        root.setPadding(new Insets(36, 40, 36, 40));
        root.getStyleClass().add("screen-root");
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

    private static Button primaryButton(String text, Runnable action) {
        Button button = new Button(text);
        button.getStyleClass().add("primary-cta");
        button.setMaxWidth(Double.MAX_VALUE);
        button.setOnAction(e -> action.run());
        return button;
    }

    private static VBox disabledCard(String heading, String detail) {
        VBox box = ScreenStub.panel(heading, detail);
        box.setOpacity(0.55);
        return box;
    }
}
