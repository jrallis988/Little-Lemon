package com.lattice.checkers.ui.screens;

import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.model.Side;
import com.lattice.checkers.score.ScoreState;
import javafx.geometry.Insets;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import java.util.function.Consumer;

/**
 * Post-match summary from real GameState and ScoreState.
 */
public final class MatchCompleteScreen {

    private final VBox root;

    public MatchCompleteScreen() {
        this(null, null);
    }

    public MatchCompleteScreen(GameController controller, Consumer<String> onNavigate) {
        String headline = "MATCH COMPLETE";
        String scoreLine = "0";
        String captures = "0";
        String kings = "0";
        String combo = "0";
        String moves = "0";
        if (controller != null && controller.state().isPresent()) {
            headline = controller.statusText();
            ScoreState scores = controller.scoreState();
            int total = scores.score(Side.DARK) + scores.score(Side.LIGHT);
            scoreLine = String.format("%,d", total);
            captures = String.valueOf(scores.captures(Side.DARK) + scores.captures(Side.LIGHT));
            kings = String.valueOf(scores.kingsCreated(Side.DARK) + scores.kingsCreated(Side.LIGHT));
            combo = String.valueOf(Math.max(scores.bestCombo(Side.DARK), scores.bestCombo(Side.LIGHT)));
            moves = String.valueOf(scores.moves(Side.DARK) + scores.moves(Side.LIGHT));
        }

        Label title = new Label(headline.toUpperCase());
        title.getStyleClass().add("arcade-title");
        Label score = new Label(scoreLine);
        score.getStyleClass().add("hud-score");
        Label caption = new Label("MATCH SCORE");
        caption.getStyleClass().add("hud-caption");

        HBox stats = new HBox(12,
                ScreenStub.panel("CAPTURES", captures),
                ScreenStub.panel("KINGS", kings),
                ScreenStub.panel("BEST COMBO", combo + " JUMP"),
                ScreenStub.panel("MOVES", moves)
        );

        Button again = new Button("Play again");
        again.getStyleClass().add("primary-cta");
        again.setOnAction(e -> {
            if (controller != null) {
                controller.restart();
            }
            if (onNavigate != null) {
                onNavigate.accept("game-board");
            }
        });
        Button analysis = new Button("View analysis");
        analysis.getStyleClass().add("action-button");
        analysis.setOnAction(e -> {
            if (onNavigate != null) {
                onNavigate.accept("match-analysis");
            }
        });
        Button home = new Button("Home");
        home.getStyleClass().add("action-button");
        home.setOnAction(e -> {
            if (onNavigate != null) {
                onNavigate.accept("home");
            }
        });

        root = new VBox(18, title, score, caption, stats, new HBox(10, again, analysis, home));
        root.setPadding(new Insets(36, 40, 36, 40));
        root.getStyleClass().add("screen-root");
    }

    public VBox getRoot() {
        return root;
    }

    public static String screenId() {
        return "match-complete";
    }

    public static String displayName() {
        return "Match Complete";
    }
}
