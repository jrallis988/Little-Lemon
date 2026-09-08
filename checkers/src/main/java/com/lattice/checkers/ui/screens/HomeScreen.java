package com.lattice.checkers.ui.screens;

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
 * Home — introduces Frog vs Traffic and the crossing concept.
 */
public final class HomeScreen {

    private final VBox root;

    public HomeScreen() {
        this(null);
    }

    public HomeScreen(Consumer<String> onNavigate) {
        Label brand = new Label("LATTICE");
        brand.getStyleClass().add("arcade-title");

        Label tagline = new Label("American checkers — play, analyze, understand.");
        tagline.getStyleClass().add("tagline");

        Label vs = new Label("VS");
        vs.getStyleClass().add("hud-caption");
        HBox matchup = new HBox(18,
                new VBox(6, new PieceView(new Piece(Side.DARK, PieceRank.MAN), 28), labeled("FROG")),
                vs,
                new VBox(6, new PieceView(new Piece(Side.LIGHT, PieceRank.MAN), 28), labeled("TRAFFIC"))
        );
        matchup.setAlignment(Pos.CENTER);

        Label phase = new Label("Checkers rules  ·  Crossing world");
        phase.getStyleClass().add("phase-note");

        Button play = new Button("Play now");
        play.getStyleClass().add("primary-cta");
        play.setOnAction(e -> {
            if (onNavigate != null) {
                onNavigate.accept("new-game");
            }
        });

        HBox destinations = new HBox(12);
        destinations.setAlignment(Pos.CENTER);
        destinations.getChildren().addAll(
                destinationButton("New Game", "Frog vs Traffic", "new-game", onNavigate),
                destinationButton("Analysis", "After matches", "match-analysis", onNavigate),
                destinationButton("AI Lab", "Coming soon", "ai-lab", onNavigate)
        );

        Label hint = ScreenStub.muted(
                "An environmental crossing — the strategy is still American checkers.");
        hint.setAlignment(Pos.CENTER);
        hint.setMaxWidth(480);

        root = new VBox(22, brand, tagline, matchup, phase, play, destinations, hint);
        root.setAlignment(Pos.CENTER);
        root.setPadding(new Insets(40));
        root.getStyleClass().addAll("screen-root", "home-root");
    }

    public VBox getRoot() {
        return root;
    }

    public static String screenId() {
        return "home";
    }

    public static String displayName() {
        return "Home";
    }

    private static Label labeled(String text) {
        Label label = new Label(text);
        label.getStyleClass().add("hud-faction-name");
        return label;
    }

    private static Button destinationButton(
            String title, String subtitle, String target, Consumer<String> onNavigate) {
        Label t = new Label(title);
        t.getStyleClass().add("dest-title");
        Label s = new Label(subtitle);
        s.getStyleClass().add("dest-subtitle");
        VBox content = new VBox(4, t, s);
        content.setAlignment(Pos.CENTER_LEFT);
        Button button = new Button();
        button.setGraphic(content);
        button.getStyleClass().add("dest-button");
        button.setPrefWidth(168);
        button.setOnAction(e -> {
            if (onNavigate != null) {
                onNavigate.accept(target);
            }
        });
        return button;
    }
}
