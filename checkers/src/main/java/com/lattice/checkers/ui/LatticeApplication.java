package com.lattice.checkers.ui;

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
 *
 * <p>Phase 1: navigable visual stubs + gallery so all planned screens can be reviewed.
 */
public final class LatticeApplication extends Application {

    public static final String APP_NAME = "Lattice";

    private Stage stage;
    private BorderPane shell;
    private Label screenLabel;

    @Override
    public void start(Stage stage) {
        this.stage = stage;
        shell = new BorderPane();
        shell.getStyleClass().add("app-shell");

        screenLabel = new Label();
        screenLabel.getStyleClass().add("chrome-label");

        Button gallery = chromeButton("All screens", () -> show("gallery"));
        Button home = chromeButton("Home", () -> show("home"));
        HBox left = new HBox(8, gallery, home);
        left.setAlignment(Pos.CENTER_LEFT);

        HBox chrome = new HBox(16, left, screenLabel);
        chrome.setAlignment(Pos.CENTER_LEFT);
        chrome.setPadding(new Insets(10, 16, 10, 16));
        chrome.getStyleClass().add("app-chrome");
        HBox.setHgrow(screenLabel, Priority.ALWAYS);
        screenLabel.setMaxWidth(Double.MAX_VALUE);
        screenLabel.setAlignment(Pos.CENTER_RIGHT);

        shell.setTop(chrome);

        Scene scene = new Scene(shell, 1024, 700);
        LatticeTheme.apply(scene);

        stage.setTitle(APP_NAME + " — American Checkers");
        stage.setScene(scene);
        stage.show();

        show("gallery");
    }

    private void show(String id) {
        Node content = switch (id) {
            case "gallery" -> new ScreenGallery(this::show).getRoot();
            case "home" -> new HomeScreen(this::show).getRoot();
            case "new-game" -> new NewGameScreen().getRoot();
            case "game-board" -> new GameBoardScreen().getRoot();
            case "match-complete" -> new MatchCompleteScreen().getRoot();
            case "match-analysis" -> new MatchAnalysisScreen().getRoot();
            case "ai-lab" -> new AiLabScreen().getRoot();
            default -> new StackPane(new Label("Unknown screen: " + id));
        };

        if (!"gallery".equals(id) && !"home".equals(id)) {
            Button back = chromeButton("← Gallery", () -> show("gallery"));
            BorderPane wrapped = new BorderPane(content);
            HBox bar = new HBox(back);
            bar.setPadding(new Insets(0, 0, 8, 0));
            wrapped.setTop(bar);
            BorderPane.setMargin(bar, new Insets(12, 16, 0, 16));
            shell.setCenter(wrapped);
        } else {
            shell.setCenter(content);
        }

        screenLabel.setText(ScreenGallery.displayName(id));
        stage.setTitle(APP_NAME + " — " + ScreenGallery.displayName(id));
    }

    private static Button chromeButton(String text, Runnable action) {
        Button button = new Button(text);
        button.getStyleClass().add("chrome-button");
        button.setOnAction(e -> action.run());
        return button;
    }

    public static void main(String[] args) {
        launch(args);
    }
}
