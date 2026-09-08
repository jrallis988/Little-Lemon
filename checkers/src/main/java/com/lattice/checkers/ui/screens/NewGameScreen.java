package com.lattice.checkers.ui.screens;

import com.lattice.checkers.ai.AIDifficulty;
import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.PieceRank;
import com.lattice.checkers.model.Side;
import com.lattice.checkers.ui.components.HowToPlayOverlay;
import com.lattice.checkers.ui.components.PieceView;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import java.util.function.Consumer;

/**
 * New Game — Frog vs Traffic, Human vs Human or Human vs Computer.
 */
public final class NewGameScreen {

    private final StackPane root;
    private AIDifficulty difficulty = AIDifficulty.defaultDifficulty();
    private boolean computerMatch;
    private VBox difficultyBlock;
    private Button startComputer;

    public NewGameScreen() {
        this(null, null, true);
    }

    public NewGameScreen(GameController controller, Consumer<String> onNavigate) {
        this(controller, onNavigate, true);
    }

    public NewGameScreen(GameController controller, Consumer<String> onNavigate, boolean reducedMotion) {
        Label title = new Label("NEW GAME");
        title.getStyleClass().add("arcade-title");

        Label subtitle = new Label("Frog vs Traffic. Difficulty changes the computer — not the rules.");
        subtitle.getStyleClass().add("screen-subtitle");
        subtitle.setWrapText(true);
        subtitle.setAlignment(Pos.CENTER);

        HowToPlayOverlay overlay = new HowToPlayOverlay(null, reducedMotion);

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
            computerMatch = false;
            refreshDifficulty();
            if (controller != null) {
                controller.startHumanVsHuman("Frog", "Traffic");
            }
            if (onNavigate != null) {
                onNavigate.accept("game-board");
            }
        });
        Button hvc = modeButton("HUMAN VS COMPUTER", "Easy · Medium · Hard — same checkers rules", true, () -> {
            computerMatch = true;
            refreshDifficulty();
        });
        Button lab = modeButton("AI LAB", "Watch profiles play each other — next", false, () -> { });

        Label choose = new Label("CHOOSE DIFFICULTY");
        choose.getStyleClass().add("panel-heading");
        Label youPlay = new Label("You play Frog. The computer plays Traffic.");
        youPlay.getStyleClass().add("muted-copy");
        HBox difficulties = new HBox(10,
                difficultyButton(AIDifficulty.EASY),
                difficultyButton(AIDifficulty.MEDIUM),
                difficultyButton(AIDifficulty.HARD)
        );
        difficulties.setAlignment(Pos.CENTER);
        startComputer = new Button("START MATCH");
        startComputer.getStyleClass().add("primary-cta");
        startComputer.setOnAction(e -> {
            if (controller != null) {
                controller.startHumanVsComputer("Frog", difficulty, true);
            }
            if (onNavigate != null) {
                onNavigate.accept("game-board");
            }
        });
        difficultyBlock = new VBox(12, choose, youPlay, difficulties, startComputer);
        difficultyBlock.setAlignment(Pos.CENTER);
        difficultyBlock.setVisible(false);
        difficultyBlock.setManaged(false);

        VBox modes = new VBox(12, hvh, hvc, lab, difficultyBlock);
        modes.setAlignment(Pos.CENTER);
        modes.setMaxWidth(480);

        VBox page = new VBox(22, title, subtitle, matchup, modes,
                HowToPlayOverlay.openButton(overlay::show));
        page.setAlignment(Pos.CENTER);
        page.setPadding(new Insets(36, 40, 36, 40));
        page.getStyleClass().addAll("screen-root", "new-game-root");

        root = new StackPane(page, overlay);
        refreshDifficulty();
    }

    public StackPane getRoot() {
        return root;
    }

    public static String screenId() {
        return "new-game";
    }

    public static String displayName() {
        return "New Game";
    }

    private Button difficultyButton(AIDifficulty value) {
        Label heading = new Label(value.displayName().toUpperCase());
        heading.getStyleClass().add("dest-title");
        Label copy = new Label(value.summary());
        copy.getStyleClass().add("dest-subtitle");
        VBox content = new VBox(4, heading, copy);
        content.setAlignment(Pos.CENTER);
        Button button = new Button();
        button.setGraphic(content);
        button.setUserData(value);
        button.getStyleClass().add("difficulty-button");
        button.setPrefWidth(148);
        button.setOnAction(e -> {
            difficulty = value;
            refreshDifficulty();
        });
        return button;
    }

    private void refreshDifficulty() {
        difficultyBlock.setVisible(computerMatch);
        difficultyBlock.setManaged(computerMatch);
            for (var node : ((HBox) difficultyBlock.getChildren().get(2)).getChildren()) {
            if (node instanceof Button button && button.getUserData() instanceof AIDifficulty value) {
                button.getStyleClass().remove("difficulty-button-selected");
                if (value == difficulty) {
                    button.getStyleClass().add("difficulty-button-selected");
                }
            }
        }
    }

    private static Button modeButton(String title, String detail, boolean enabled, Runnable action) {
        Label heading = new Label(title);
        Label copy = new Label(detail);
        heading.getStyleClass().add("dest-title");
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
