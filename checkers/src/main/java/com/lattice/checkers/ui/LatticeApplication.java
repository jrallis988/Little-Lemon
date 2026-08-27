package com.lattice.checkers.ui;

import com.lattice.checkers.ui.screens.HomeScreen;
import com.lattice.checkers.ui.theme.LatticeTheme;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.stage.Stage;

/**
 * JavaFX entry point for Lattice.
 *
 * <p>Phase 1: stub shell that proves the toolchain. Real navigation arrives later.
 */
public final class LatticeApplication extends Application {

    public static final String APP_NAME = "Lattice";

    @Override
    public void start(Stage stage) {
        HomeScreen home = new HomeScreen();
        Scene scene = new Scene(home.getRoot(), 960, 640);
        LatticeTheme.apply(scene);

        stage.setTitle(APP_NAME + " — American Checkers");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
