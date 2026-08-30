package com.lattice.checkers.ui.screens;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.VBox;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import java.util.function.Supplier;
import javafx.scene.Node;

/**
 * Phase 1 preview: all planned screens as tiles so they can be reviewed at once.
 */
public final class ScreenGallery {

    private final ScrollPane root;

    public ScreenGallery(Consumer<String> onOpenScreen) {
        Label brand = new Label("Lattice");
        brand.getStyleClass().add("brand-small");

        Label heading = new Label("Screen previews");
        heading.getStyleClass().add("screen-title");

        Label note = new Label(
                "Phase 1 visual stubs — layout placeholders only. Rules and play arrive later.");
        note.getStyleClass().add("tagline");
        note.setWrapText(true);

        GridPane grid = new GridPane();
        grid.setHgap(14);
        grid.setVgap(14);
        grid.getStyleClass().add("gallery-grid");

        List<TileSpec> tiles = List.of(
                new TileSpec(HomeScreen.screenId(), "Home", "Play · Analysis · AI Lab", "Phase 1"),
                new TileSpec(NewGameScreen.screenId(), "New Game", "Human/Computer · AI profiles", "Phases 5–7"),
                new TileSpec(GameBoardScreen.screenId(), "Game Board", "Board · Focus · X-Ray · Dev", "Phases 5–6"),
                new TileSpec(MatchCompleteScreen.screenId(), "Match Complete", "Result · basic stats", "Phases 6 / 10"),
                new TileSpec(MatchAnalysisScreen.screenId(), "Match Analysis", "Timeline · What If?", "Phases 9–10"),
                new TileSpec(AiLabScreen.screenId(), "AI Lab", "Profile vs profile · telemetry", "Phase 12")
        );

        int index = 0;
        for (TileSpec tile : tiles) {
            Label name = new Label(tile.title());
            name.getStyleClass().add("panel-heading");

            Label summary = new Label(tile.summary());
            summary.getStyleClass().add("muted-copy");
            summary.setWrapText(true);

            Label phase = new Label(tile.phase());
            phase.getStyleClass().add("phase-note");

            Button open = new Button("Open");
            open.getStyleClass().add("gallery-open");
            open.setOnAction(e -> onOpenScreen.accept(tile.id()));

            VBox card = new VBox(10, name, summary, phase, open);
            card.setAlignment(Pos.TOP_LEFT);
            card.getStyleClass().add("gallery-tile");
            card.setPadding(new Insets(16));
            card.setPrefWidth(280);
            card.setPrefHeight(150);

            grid.add(card, index % 3, index / 3);
            index++;
        }

        VBox content = new VBox(18, brand, heading, note, grid);
        content.setPadding(new Insets(28, 32, 36, 32));
        content.getStyleClass().addAll("screen-root", "gallery-root");

        root = new ScrollPane(content);
        root.setFitToWidth(true);
        root.setFitToHeight(true);
        root.getStyleClass().add("gallery-scroll");
    }

    public ScrollPane getRoot() {
        return root;
    }

    public static Map<String, Supplier<Node>> screenFactories() {
        Map<String, Supplier<Node>> map = new LinkedHashMap<>();
        map.put(HomeScreen.screenId(), () -> new HomeScreen().getRoot());
        map.put(NewGameScreen.screenId(), () -> new NewGameScreen().getRoot());
        map.put(GameBoardScreen.screenId(), () -> new GameBoardScreen().getRoot());
        map.put(MatchCompleteScreen.screenId(), () -> new MatchCompleteScreen().getRoot());
        map.put(MatchAnalysisScreen.screenId(), () -> new MatchAnalysisScreen().getRoot());
        map.put(AiLabScreen.screenId(), () -> new AiLabScreen().getRoot());
        return map;
    }

    public static String displayName(String id) {
        return switch (id) {
            case "home" -> HomeScreen.displayName();
            case "new-game" -> NewGameScreen.displayName();
            case "game-board" -> GameBoardScreen.displayName();
            case "match-complete" -> MatchCompleteScreen.displayName();
            case "match-analysis" -> MatchAnalysisScreen.displayName();
            case "ai-lab" -> AiLabScreen.displayName();
            case "gallery" -> "All Screens";
            default -> id;
        };
    }

    private record TileSpec(String id, String title, String summary, String phase) {
    }
}
