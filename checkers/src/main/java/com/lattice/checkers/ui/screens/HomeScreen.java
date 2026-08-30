package com.lattice.checkers.ui.screens;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import java.util.function.Consumer;

/**
 * Home — Play / Analysis / AI Lab entry points.
 */
public final class HomeScreen {

    private final VBox root;

    public HomeScreen() {
        this(null);
    }

    public HomeScreen(Consumer<String> onNavigate) {
        Label brand = new Label("Lattice");
        brand.getStyleClass().add("brand");

        Label tagline = new Label("American checkers — play, analyze, understand.");
        tagline.getStyleClass().add("tagline");

        Label phase = new Label("Playable board · Human vs Human");
        phase.getStyleClass().add("phase-note");

        VBox hero = new VBox(10, brand, tagline, phase);
        hero.setAlignment(Pos.CENTER);

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
                destinationButton("New Game", "Human vs Human", "new-game", onNavigate),
                destinationButton("Analysis", "After matches", "match-analysis", onNavigate),
                destinationButton("AI Lab", "Coming soon", "ai-lab", onNavigate)
        );

        Label hint = ScreenStub.muted(
                "Kings are stacked discs. Captures are mandatory. Focus, X-Ray, and Developer Mode come later.");
        hint.setAlignment(Pos.CENTER);
        hint.setMaxWidth(460);

        root = new VBox(28, hero, play, destinations, hint);
        root.setAlignment(Pos.CENTER);
        root.setPadding(new Insets(48));
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
