package com.lattice.checkers.ui.screens;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Node;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.Region;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;

/**
 * Shared Phase-1 visual shell for screen stubs — enough structure to preview
 * navigation destinations without implementing game logic.
 */
final class ScreenStub {

    private ScreenStub() {
    }

    static VBox page(String title, String subtitle, String phaseHint, Node body) {
        Label titleLabel = new Label(title);
        titleLabel.getStyleClass().add("screen-title");

        Label subtitleLabel = new Label(subtitle);
        subtitleLabel.getStyleClass().add("screen-subtitle");
        subtitleLabel.setWrapText(true);

        Label phaseLabel = new Label(phaseHint);
        phaseLabel.getStyleClass().add("phase-note");

        VBox header = new VBox(8, titleLabel, subtitleLabel, phaseLabel);
        header.getStyleClass().add("screen-header");

        VBox root = new VBox(24, header, body);
        root.setPadding(new Insets(36, 40, 36, 40));
        root.getStyleClass().add("screen-root");
        VBox.setVgrow(body, Priority.ALWAYS);
        return root;
    }

    static Label muted(String text) {
        Label label = new Label(text);
        label.getStyleClass().add("muted-copy");
        label.setWrapText(true);
        return label;
    }

    static VBox panel(String heading, String detail) {
        Label h = new Label(heading);
        h.getStyleClass().add("panel-heading");
        Label d = muted(detail);
        VBox box = new VBox(6, h, d);
        box.getStyleClass().add("preview-panel");
        box.setPadding(new Insets(16));
        return box;
    }

    static StackPane boardSilhouette() {
        VBox grid = new VBox(2);
        grid.setAlignment(Pos.CENTER);
        for (int r = 0; r < 8; r++) {
            HBox row = new HBox(2);
            row.setAlignment(Pos.CENTER);
            for (int c = 0; c < 8; c++) {
                Region cell = new Region();
                cell.setPrefSize(28, 28);
                cell.setMinSize(28, 28);
                boolean dark = (r + c) % 2 == 1;
                cell.getStyleClass().add(dark ? "board-cell-dark" : "board-cell-light");
                row.getChildren().add(cell);
            }
            grid.getChildren().add(row);
        }
        StackPane frame = new StackPane(grid);
        frame.getStyleClass().add("board-silhouette");
        frame.setPadding(new Insets(12));
        frame.setMaxSize(Region.USE_PREF_SIZE, Region.USE_PREF_SIZE);
        return frame;
    }

    static HBox chipRow(String... labels) {
        HBox row = new HBox(8);
        row.setAlignment(Pos.CENTER_LEFT);
        for (String label : labels) {
            Label chip = new Label(label);
            chip.getStyleClass().add("preview-chip");
            row.getChildren().add(chip);
        }
        return row;
    }
}
