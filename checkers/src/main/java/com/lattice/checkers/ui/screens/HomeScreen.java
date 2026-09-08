package com.lattice.checkers.ui.screens;

import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.model.Faction;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.PieceRank;
import com.lattice.checkers.model.Side;
import com.lattice.checkers.ui.LatticeApplication;
import com.lattice.checkers.ui.components.CrossingWorld;
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
 * Home — introduces Frogger Checkers: Frogger vs Traffic.
 */
public final class HomeScreen {

    private final StackPane root;

    public HomeScreen() {
        this(null, null, true);
    }

    public HomeScreen(Consumer<String> onNavigate) {
        this(null, onNavigate, true);
    }

    public HomeScreen(GameController controller, Consumer<String> onNavigate) {
        this(controller, onNavigate, true);
    }

    public HomeScreen(GameController controller, Consumer<String> onNavigate, boolean reducedMotion) {
        Label brand = new Label(LatticeApplication.WORDMARK);
        brand.getStyleClass().add("arcade-title");
        brand.getStyleClass().add("home-wordmark");

        Label tagline = new Label("American checkers. Frogger vs Traffic.");
        tagline.getStyleClass().add("tagline");

        CrossingWorld world = new CrossingWorld(360, 360);
        world.getStyleClass().add("home-world");
        StackPane worldFrame = new StackPane(world);
        worldFrame.getStyleClass().add("home-world-frame");

        Label frogName = labeled(Faction.FROG.displayName(), "hud-faction-name home-frog");
        Label trafficName = labeled("TRAFFIC", "hud-faction-name home-traffic");
        Label vs = new Label("VS");
        vs.getStyleClass().add("home-vs");
        HBox matchup = new HBox(22,
                new VBox(8, new PieceView(new Piece(Side.DARK, PieceRank.MAN), 34), frogName),
                vs,
                new VBox(8, new PieceView(new Piece(Side.LIGHT, PieceRank.MAN), 34), trafficName)
        );
        matchup.setAlignment(Pos.CENTER);
        matchup.getChildren().forEach(node -> {
            if (node instanceof VBox box) {
                box.setAlignment(Pos.CENTER);
            }
        });

        Label crossing = new Label("An environmental crossing. The strategy is still American checkers.");
        crossing.getStyleClass().add("phase-note");

        HowToPlayOverlay overlay = new HowToPlayOverlay(null, reducedMotion);

        Button play = new Button("PLAY NOW");
        play.getStyleClass().add("primary-cta");
        play.setOnAction(e -> {
            if (controller != null) {
                controller.startHumanVsHuman("Frogger", "Traffic");
            }
            if (onNavigate != null) {
                onNavigate.accept("game-board");
            }
        });

        HBox actions = new HBox(12, play, HowToPlayOverlay.openButton(overlay::show));
        actions.setAlignment(Pos.CENTER);

        HBox destinations = new HBox(12);
        destinations.setAlignment(Pos.CENTER);
        destinations.getChildren().addAll(
                destinationButton("New Game", "Choose a matchup", "new-game", onNavigate),
                destinationButton("Analysis", "After matches", "match-analysis", onNavigate),
                destinationButton("AI Lab", "Coming soon", "ai-lab", onNavigate)
        );

        VBox page = new VBox(16, brand, tagline, worldFrame, matchup, crossing, actions, destinations);
        page.setAlignment(Pos.CENTER);
        page.setPadding(new Insets(28, 40, 32, 40));
        page.getStyleClass().addAll("screen-root", "home-root");

        root = new StackPane(page, overlay);
    }

    public StackPane getRoot() {
        return root;
    }

    public static String screenId() {
        return "home";
    }

    public static String displayName() {
        return "Home";
    }

    private static Label labeled(String text, String styleClasses) {
        Label label = new Label(text);
        label.getStyleClass().addAll(styleClasses.split(" "));
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
