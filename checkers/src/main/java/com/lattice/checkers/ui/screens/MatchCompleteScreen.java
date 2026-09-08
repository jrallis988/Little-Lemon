package com.lattice.checkers.ui.screens;

import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.model.GameStatus;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.PieceRank;
import com.lattice.checkers.model.Side;
import com.lattice.checkers.score.ScoreState;
import com.lattice.checkers.ui.LatticeApplication;
import com.lattice.checkers.ui.components.PieceView;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import java.util.function.Consumer;

/**
 * Post-match summary from real GameState and ScoreState. Score never decides the winner.
 */
public final class MatchCompleteScreen {

    private final VBox root;

    public MatchCompleteScreen() {
        this(null, null);
    }

    public MatchCompleteScreen(GameController controller, Consumer<String> onNavigate) {
        String headline = "MATCH COMPLETE";
        Side winner = null;
        int scoreValue = 0;
        int captures = 0;
        int kings = 0;
        int combo = 0;
        int moves = 0;
        if (controller != null && controller.state().isPresent()) {
            headline = controller.statusText().toUpperCase();
            winner = winningSide(controller.state().get().status());
            ScoreState scores = controller.scoreState();
            Side reported = winner != null ? winner : Side.DARK;
            scoreValue = scores.score(reported);
            captures = scores.captures(reported);
            kings = scores.kingsCreated(reported);
            combo = scores.bestCombo(reported);
            moves = scores.moves(reported);
        }

        Label title = new Label(headline);
        title.getStyleClass().add("arcade-title");
        if (winner == Side.LIGHT) {
            title.getStyleClass().add("home-traffic");
        } else {
            title.getStyleClass().add("home-frog");
        }

        VBox identity = new VBox(10);
        identity.setAlignment(Pos.CENTER);
        Label brand = new Label(LatticeApplication.WORDMARK);
        brand.getStyleClass().addAll("arcade-kicker");
        identity.getChildren().add(brand);
        if (winner != null) {
            identity.getChildren().add(new PieceView(new Piece(winner, PieceRank.KING), 32));
        }
        identity.getChildren().add(title);

        Label score = new Label(String.format("%,d", scoreValue));
        score.getStyleClass().add("hud-score");
        if (winner == Side.LIGHT) {
            score.getStyleClass().add("home-traffic");
        } else {
            score.getStyleClass().add("home-frog");
        }
        Label caption = new Label("MATCH SCORE");
        caption.getStyleClass().add("hud-caption");

        String comboLabel = combo >= 3 ? "TRIPLE JUMP" : combo == 2 ? "DOUBLE JUMP" : combo + " JUMP";
        HBox stats = new HBox(12,
                ScreenStub.panel("CAPTURES", String.valueOf(captures)),
                ScreenStub.panel("KINGS", String.valueOf(kings)),
                ScreenStub.panel("BEST COMBO", comboLabel),
                ScreenStub.panel("MOVES", String.valueOf(moves))
        );
        stats.setAlignment(Pos.CENTER);

        Button again = new Button("PLAY AGAIN");
        again.getStyleClass().add("primary-cta");
        again.setOnAction(e -> {
            if (controller != null) {
                controller.restart();
            }
            if (onNavigate != null) {
                onNavigate.accept("game-board");
            }
        });
        Button analysis = new Button("VIEW ANALYSIS");
        analysis.getStyleClass().add("action-button");
        analysis.setOnAction(e -> {
            if (onNavigate != null) {
                onNavigate.accept("match-analysis");
            }
        });
        Button home = new Button("HOME");
        home.getStyleClass().add("action-button");
        home.setOnAction(e -> {
            if (onNavigate != null) {
                onNavigate.accept("home");
            }
        });
        HBox actions = new HBox(10, again, analysis, home);
        actions.setAlignment(Pos.CENTER);

        Label note = ScreenStub.muted("Winner is decided by checkers rules. Match Score is arcade performance only.");
        note.setAlignment(Pos.CENTER);

        root = new VBox(16, identity, score, caption, stats, actions, note);
        root.setAlignment(Pos.CENTER);
        root.setPadding(new Insets(36, 40, 36, 40));
        root.getStyleClass().addAll("screen-root", "match-complete-root");
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

    private static Side winningSide(GameStatus status) {
        return switch (status) {
            case DARK_WINS, RESIGNED_LIGHT -> Side.DARK;
            case LIGHT_WINS, RESIGNED_DARK -> Side.LIGHT;
            default -> null;
        };
    }
}
