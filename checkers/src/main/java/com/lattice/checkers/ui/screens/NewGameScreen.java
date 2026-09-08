package com.lattice.checkers.ui.screens;

import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.PieceRank;
import com.lattice.checkers.model.Side;
import com.lattice.checkers.ui.components.PieceView;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import java.util.function.Consumer;

/**
 * New Game — Frog vs Traffic matchup, not a settings form.
 */
public final class NewGameScreen {

    private final VBox root;

    public NewGameScreen() {
        this(null, null);
    }

    public NewGameScreen(GameController controller, Consumer<String> onNavigate) {
        Label title = new Label("NEW GAME");
        title.getStyleClass().add("arcade-title");

        Label subtitle = new Label("Frog vs Traffic. Local match — computer profiles arrive with the AI phase.");
        subtitle.getStyleClass().add("screen-subtitle");
        subtitle.setWrapText(true);
        subtitle.setAlignment(Pos.CENTER);

        Label frog = new Label("FROG");
        frog.getStyleClass().addAll("hud-faction-name", "home-frog");
        Label traffic = new Label("TRAFFIC");
        traffic.getStyleClass().addAll("hud-faction-name", "home-traffic");
        Label vs = new Label("VS");
        vs.getStyleClass().add("home-vs");
        VBox frogCol = new VBox(8, new PieceView(new Piece(Side.DARK, PieceRank.MAN), 36), frog);
        VBox trafficCol = new VBox(8, new PieceView(new Piece(Side.LIGHT, PieceRank.MAN), 36), traffic);
        frogCol.setAlignment(Pos.CENTER);
        trafficCol.setAlignment(Pos.CENTER);
        HBox matchup = new HBox(28, frogCol, vs, trafficCol);
        matchup.setAlignment(Pos.CENTER);
        matchup.getStyleClass().add("matchup-row");

        Button hvh = modeButton("HUMAN VS HUMAN", "Two players on this machine", true, () -> {
            if (controller != null) {
                controller.startHumanVsHuman("Frog", "Traffic");
            }
            if (onNavigate != null) {
                onNavigate.accept("game-board");
            }
        });
        Button hvc = modeButton("HUMAN VS COMPUTER", "Aggressor · Defender · Strategist — next", false, () -> { });
        Button lab = modeButton("AI LAB", "Watch profiles play each other — next", false, () -> { });

        VBox modes = new VBox(12, hvh, hvc, lab);
        modes.setAlignment(Pos.CENTER);
        modes.setMaxWidth(420);

        root = new VBox(22, title, subtitle, matchup, modes);
        root.setAlignment(Pos.CENTER);
        root.setPadding(new Insets(36, 40, 36, 40));
        root.getStyleClass().addAll("screen-root", "new-game-root");
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

    private static Button modeButton(String title, String detail, boolean enabled, Runnable action) {
        Label heading = new Label(title);
        heading.getStyleClass().add("dest-title");
        Label copy = new Label(detail);
        copy.getStyleClass().add("dest-subtitle");
        VBox content = new VBox(4, heading, copy);
        content.setAlignment(Pos.CENTER_LEFT);
        Button button = new Button();
        button.setGraphic(content);
        button.getStyleClass().add(enabled ? "mode-button" : "mode-button-disabled");
        button.setMaxWidth(Double.MAX_VALUE);
        button.setDisable(!enabled);
        button.setOnAction(e -> action.run());
        return button;
    }
}
