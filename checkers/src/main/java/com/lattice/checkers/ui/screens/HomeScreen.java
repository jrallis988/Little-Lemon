package com.lattice.checkers.ui.screens;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;

/**
 * Home screen stub — Play / Analysis / AI Lab destinations arrive in later phases.
 */
public final class HomeScreen {

    private final VBox root;

    public HomeScreen() {
        Label brand = new Label("Lattice");
        brand.getStyleClass().add("brand");

        Label tagline = new Label("American checkers — play, analyze, understand.");
        tagline.getStyleClass().add("tagline");

        Label phase = new Label("Phase 1 — architecture scaffold");
        phase.getStyleClass().add("phase-note");

        root = new VBox(16, brand, tagline, phase);
        root.setAlignment(Pos.CENTER);
        root.setPadding(new Insets(48));
        root.getStyleClass().add("home-root");
    }

    public VBox getRoot() {
        return root;
    }
}
