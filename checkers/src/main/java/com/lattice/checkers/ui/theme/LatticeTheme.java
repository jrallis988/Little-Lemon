package com.lattice.checkers.ui.theme;

import javafx.scene.Scene;
import javafx.scene.text.Font;

/**
 * Applies the single Graphite Lattice visual system.
 */
public final class LatticeTheme {

    public static final String STYLESHEET =
            "/com/lattice/checkers/css/lattice.css";

    private static boolean fontsLoaded;

    private LatticeTheme() {
    }

    public static void loadFonts() {
        if (fontsLoaded) {
            return;
        }
        Font.loadFont(
                LatticeTheme.class.getResourceAsStream(
                        "/com/lattice/checkers/fonts/Outfit-Variable.ttf"),
                14);
        Font.loadFont(
                LatticeTheme.class.getResourceAsStream(
                        "/com/lattice/checkers/fonts/Fraunces-Variable.ttf"),
                48);
        fontsLoaded = true;
    }

    public static void apply(Scene scene) {
        loadFonts();
        var url = LatticeTheme.class.getResource(STYLESHEET);
        if (url != null) {
            scene.getStylesheets().setAll(url.toExternalForm());
        }
    }
}
