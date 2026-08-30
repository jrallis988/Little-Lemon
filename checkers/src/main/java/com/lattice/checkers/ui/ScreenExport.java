package com.lattice.checkers.ui;

import com.lattice.checkers.ui.screens.ScreenGallery;
import com.lattice.checkers.ui.theme.LatticeTheme;
import javafx.application.Application;
import javafx.application.Platform;
import javafx.embed.swing.SwingFXUtils;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.image.WritableImage;
import javafx.stage.Stage;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.Supplier;

/**
 * Snapshots each Phase 1 screen stub to PNG for portfolio / review.
 *
 * <pre>
 *   mvn -q -DskipTests javafx:run -Djavafx.mainClass=com.lattice.checkers.ui.ScreenExport
 * </pre>
 */
public final class ScreenExport extends Application {

    private static Path outputDir = Path.of("target/screen-previews");

    @Override
    public void start(Stage stage) throws Exception {
        Files.createDirectories(outputDir);

        Map<String, Supplier<Parent>> screens = new LinkedHashMap<>();
        ScreenGallery.screenFactories().forEach((id, supplier) ->
                screens.put(id, () -> (Parent) supplier.get()));

        for (Map.Entry<String, Supplier<Parent>> entry : screens.entrySet()) {
            Parent root = entry.getValue().get();
            Scene scene = new Scene(root, 960, 640);
            LatticeTheme.apply(scene);
            stage.setScene(scene);
            stage.show();
            root.applyCss();
            root.layout();

            WritableImage image = root.snapshot(null, null);
            BufferedImage buffered = SwingFXUtils.fromFXImage(image, null);
            Path out = outputDir.resolve(entry.getKey() + ".png");
            ImageIO.write(buffered, "png", out.toFile());
            System.out.println("Wrote " + out.toAbsolutePath());
        }

        Parent gallery = new ScreenGallery(id -> { }).getRoot();
        Scene galleryScene = new Scene(gallery, 1100, 780);
        LatticeTheme.apply(galleryScene);
        stage.setScene(galleryScene);
        stage.show();
        gallery.applyCss();
        gallery.layout();
        Path galleryOut = outputDir.resolve("gallery.png");
        ImageIO.write(
                SwingFXUtils.fromFXImage(gallery.snapshot(null, null), null),
                "png",
                galleryOut.toFile());
        System.out.println("Wrote " + galleryOut.toAbsolutePath());

        Platform.exit();
    }

    public static void main(String[] args) {
        if (args.length > 0) {
            outputDir = Path.of(args[0]);
        }
        launch(args);
    }
}
