package com.lattice.checkers.ui.theme;

import javafx.scene.Scene;

/**
 * Applies the single Graphite Lattice visual system.
 * No alternate themes — this is the only look.
 *
 * <p>Phase 1: minimal stylesheet hook. Full tokens in Phase 6/13.
 */
public final class LatticeTheme {

    public static final String STYLESHEET =
            "/com/lattice/checkers/css/lattice.css";

    private LatticeTheme() {
    }

    public static void apply(Scene scene) {
        var url = LatticeTheme.class.getResource(STYLESHEET);
        if (url != null) {
            scene.getStylesheets().add(url.toExternalForm());
        }
    }
}
