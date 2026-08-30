package com.lattice.checkers.ui;

import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.ui.screens.AiLabScreen;
import com.lattice.checkers.ui.screens.GameBoardScreen;
import com.lattice.checkers.ui.screens.HomeScreen;
import com.lattice.checkers.ui.screens.MatchAnalysisScreen;
import com.lattice.checkers.ui.screens.MatchCompleteScreen;
import com.lattice.checkers.ui.screens.NewGameScreen;
import com.lattice.checkers.ui.screens.ScreenGallery;
import com.lattice.checkers.ui.theme.LatticeTheme;
import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

/**
 * JavaFX entry point for Lattice.
 */
public final class LatticeApplication extends Application {

    public static final String APP_NAME = "Lattice";

    private Stage stage;
    private BorderPane shell;
    private Label screenLabel;
    private GameController controller;
    private boolean reducedMotion;

    @Override
    public void start(Stage stage) {
        this.stage = stage;
        this.controller = new GameController();
        this.reducedMotion = detectReducedMotion();

        LatticeTheme.loadFonts();

        shell = new BorderPane();
        shell.getStyleClass().add("app-shell");

        screenLabel = new Label();
        screenLabel.getStyleClass().add("chrome-label");

        Button play = chromeButton("Play", () -> show("new-game"));
        Button home = chromeButton("Home", () -> show("home"));
        Button gallery = chromeButton("All screens", () -> show("gallery"));
        HBox left = new HBox(8, play, home, gallery);
        left.setAlignment(Pos.CENTER_LEFT);

        HBox chrome = new HBox(16, left, screenLabel);
        chrome.setAlignment(Pos.CENTER_LEFT);
        chrome.setPadding(new Insets(10, 16, 10, 16));
        chrome.getStyleClass().add("app-chrome");
        HBox.setHgrow(screenLabel, Priority.ALWAYS);
        screenLabel.setMaxWidth(Double.MAX_VALUE);
        screenLabel.setAlignment(Pos.CENTER_RIGHT);

        shell.setTop(chrome);

        Scene scene = new Scene(shell, 1080, 740);
        LatticeTheme.apply(scene);

        stage.setTitle(APP_NAME + " — American Checkers");
        stage.setScene(scene);
        stage.show();

        show("home");
    }

    private void show(String id) {
        Node content = switch (id) {
            case "gallery" -> new ScreenGallery(this::show).getRoot();
            case "home" -> new HomeScreen(this::show).getRoot();
            case "new-game" -> new NewGameScreen(controller, this::show).getRoot();
            case "game-board" -> new GameBoardScreen(controller, this::show, reducedMotion).getRoot();
            case "match-complete" -> new MatchCompleteScreen().getRoot();
            case "match-analysis" -> new MatchAnalysisScreen().getRoot();
            case "ai-lab" -> new AiLabScreen().getRoot();
            default -> new StackPane(new Label("Unknown screen: " + id));
        };

        shell.setCenter(content);
        screenLabel.setText(ScreenGallery.displayName(id));
        stage.setTitle(APP_NAME + " — " + ScreenGallery.displayName(id));
    }

    private static Button chromeButton(String text, Runnable action) {
        Button button = new Button(text);
        button.getStyleClass().add("chrome-button");
        button.setOnAction(e -> action.run());
        return button;
    }

    private static boolean detectReducedMotion() {
        String env = System.getenv("LATTICE_REDUCED_MOTION");
        if (env != null && (env.equals("1") || env.equalsIgnoreCase("true"))) {
            return true;
        }
        // Best-effort GTK setting
        try {
            Process process = new ProcessBuilder(
                    "gsettings", "get", "org.gnome.desktop.interface", "enable-animations")
                    .redirectErrorStream(true)
                    .start();
            String out = new String(process.getInputStream().readAllBytes()).trim();
            process.waitFor();
            return out.equals("false");
        } catch (Exception ignored) {
            return false;
        }
    }

    public static void main(String[] args) {
        launch(args);
    }
}
