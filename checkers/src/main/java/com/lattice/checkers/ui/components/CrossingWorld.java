package com.lattice.checkers.ui.components;

import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;
import javafx.scene.paint.CycleMethod;
import javafx.scene.paint.LinearGradient;
import javafx.scene.paint.Stop;

/**
 * Continuous Frogger-inspired crossing world. One painting for the whole 8×8,
 * not 64 separate tile illustrations. Lane markings, ripples, and vegetation
 * cross square boundaries; the Java grid stays exact underneath.
 */
public final class CrossingWorld extends Canvas {

    public CrossingWorld(double width, double height) {
        super(width, height);
        setMouseTransparent(true);
        paint();
    }

    public void paint() {
        double w = getWidth();
        double h = getHeight();
        double rowH = h / 8.0;
        GraphicsContext g = getGraphicsContext2D();
        g.clearRect(0, 0, w, h);

        // Rank 8 — destination grassland
        fillBand(g, 0, rowH, w, grassFill(true));
        drawGrassDetails(g, 0, rowH, w, true);
        // Rank 7 — road, dashed white center
        fillBand(g, rowH, rowH, w, roadFill());
        drawRoadDetails(g, rowH, rowH, w, false);
        // Rank 6 — safe grass
        fillBand(g, rowH * 2, rowH, w, grassFill(false));
        drawGrassDetails(g, rowH * 2, rowH, w, false);
        // Ranks 5–4 — continuous river
        fillBand(g, rowH * 3, rowH * 2, w, waterFill());
        drawWaterDetails(g, rowH * 3, rowH * 2, w);
        // Rank 3 — safe grass
        fillBand(g, rowH * 5, rowH, w, grassFill(false));
        drawGrassDetails(g, rowH * 5, rowH, w, false);
        // Rank 2 — road with double yellow + dashed white
        fillBand(g, rowH * 6, rowH, w, roadFill());
        drawRoadDetails(g, rowH * 6, rowH, w, true);
        // Rank 1 — start dirt
        fillBand(g, rowH * 7, rowH, w, dirtFill());
        drawDirtDetails(g, rowH * 7, rowH, w);
    }

    private static void fillBand(GraphicsContext g, double y, double h, double w, LinearGradient fill) {
        g.setFill(fill);
        g.fillRect(0, y, w, h);
    }

    private static LinearGradient grassFill(boolean destination) {
        Color a = destination ? Color.web("#57A832") : Color.web("#3F8E26");
        Color b = destination ? Color.web("#2F7018") : Color.web("#2A6418");
        return new LinearGradient(0, 0, 0, 1, true, CycleMethod.NO_CYCLE,
                new Stop(0, a), new Stop(1, b));
    }

    private static LinearGradient roadFill() {
        return new LinearGradient(0, 0, 0, 1, true, CycleMethod.NO_CYCLE,
                new Stop(0, Color.web("#3C4048")), new Stop(0.45, Color.web("#2A2D34")),
                new Stop(1, Color.web("#1E2126")));
    }

    private static LinearGradient waterFill() {
        return new LinearGradient(0, 0, 0, 1, true, CycleMethod.NO_CYCLE,
                new Stop(0, Color.web("#4AA0D4")), new Stop(0.45, Color.web("#2E78B4")),
                new Stop(1, Color.web("#1F5E96")));
    }

    private static LinearGradient dirtFill() {
        return new LinearGradient(0, 0, 0, 1, true, CycleMethod.NO_CYCLE,
                new Stop(0, Color.web("#9A7344")), new Stop(1, Color.web("#6A4C28")));
    }

    private static void drawRoadDetails(GraphicsContext g, double y, double h, double w, boolean doubleYellow) {
        g.setStroke(Color.web("#C8CCD0", 0.42));
        g.setLineWidth(2.0);
        g.strokeLine(0, y + 3.5, w, y + 3.5);
        g.strokeLine(0, y + h - 3.5, w, y + h - 3.5);

        if (doubleYellow) {
            g.setStroke(Color.web("#F0D24A"));
            g.setLineWidth(3.0);
            g.setLineDashes();
            g.strokeLine(0, y + h * 0.34, w, y + h * 0.34);
            g.strokeLine(0, y + h * 0.46, w, y + h * 0.46);
            g.setStroke(Color.web("#F4F6F8", 0.95));
            g.setLineWidth(2.8);
            g.setLineDashes(18, 14);
            g.strokeLine(10, y + h * 0.70, w - 10, y + h * 0.70);
            g.setLineDashes();
        } else {
            g.setStroke(Color.web("#F4F6F8", 0.94));
            g.setLineWidth(2.8);
            g.setLineDashes(20, 15);
            g.strokeLine(10, y + h * 0.50, w - 10, y + h * 0.50);
            g.setLineDashes();
        }
    }

    private static void drawWaterDetails(GraphicsContext g, double y, double h, double w) {
        g.setStroke(Color.web("#B6E6F8", 0.38));
        g.setLineWidth(1.8);
        for (int i = 0; i < 7; i++) {
            double yy = y + 12 + i * (h - 24) / 6.0;
            g.beginPath();
            g.moveTo(0, yy);
            for (int x = 0; x <= w; x += 28) {
                g.quadraticCurveTo(x + 10, yy + ((x / 28) % 2 == 0 ? 5 : -5), x + 28, yy);
            }
            g.stroke();
        }

        g.setFill(Color.web("#6BC24A"));
        double[] pads = {36, 118, 194, 272, 348, 430, 508, 590};
        for (int i = 0; i < pads.length; i++) {
            if (pads[i] >= w) {
                continue;
            }
            double px = pads[i] % (w - 30);
            double py = y + h * (i % 2 == 0 ? 0.26 : 0.62);
            g.fillOval(px, py, 26, 16);
            g.setFill(Color.web("#8AD85A"));
            g.fillOval(px + 5, py + 3, 10, 6);
            g.setFill(Color.web("#6BC24A"));
        }

        g.setFill(Color.web("#2A6A18"));
        g.fillRect(0, y, w, 5);
        g.fillRect(0, y + h - 5, w, 5);
        drawReeds(g, 8, y + 2, 18);
        drawReeds(g, w - 28, y + 2, 18);
        drawReeds(g, 70, y + h - 22, 16);
        drawReeds(g, w - 90, y + h - 22, 16);
        drawRock(g, 4, y + h * 0.42, 18, 12);
        drawRock(g, w - 24, y + h * 0.55, 20, 13);
    }

    private static void drawReeds(GraphicsContext g, double x, double y, double h) {
        g.setStroke(Color.web("#1E4A12"));
        g.setLineWidth(1.6);
        for (int i = 0; i < 5; i++) {
            g.strokeLine(x + i * 4, y + h, x + i * 4 + (i % 2 == 0 ? -3 : 4), y);
        }
        g.setFill(Color.web("#3A7A1E"));
        g.fillOval(x + 2, y - 3, 8, 6);
        g.fillOval(x + 10, y - 1, 7, 5);
    }

    private static void drawRock(GraphicsContext g, double x, double y, double w, double h) {
        g.setFill(Color.web("#6A6E68"));
        g.fillOval(x, y, w, h);
        g.setFill(Color.web("#8A8E86"));
        g.fillOval(x + 3, y + 2, w * 0.45, h * 0.4);
    }

    private static void drawGrassDetails(GraphicsContext g, double y, double h, double w, boolean destination) {
        g.setFill(Color.web("#D4E85A", 0.55));
        for (double x = 14; x < w; x += 36) {
            g.fillOval(x, y + h * 0.28, 5, 4);
            g.fillOval(x + 18, y + h * 0.68, 4, 3);
        }
        g.setFill(Color.web("#245016"));
        for (double x = 28; x < w; x += 96) {
            g.fillOval(x, y + h * 0.12, 34, 18);
            g.fillOval(x + 16, y + h * 0.18, 26, 14);
        }
        if (destination) {
            drawRock(g, 48, y + h * 0.52, 22, 14);
            drawRock(g, 210, y + h * 0.22, 18, 12);
            drawRock(g, 420, y + h * 0.58, 24, 14);
            drawRock(g, w - 70, y + h * 0.30, 20, 12);
        }
    }

    private static void drawDirtDetails(GraphicsContext g, double y, double h, double w) {
        g.setFill(Color.web("#C4A06A", 0.7));
        for (double x = 18; x < w; x += 42) {
            g.fillOval(x, y + h * 0.38, 7, 4);
            g.fillOval(x + 16, y + h * 0.72, 6, 3);
        }
        g.setFill(Color.web("#5A3C1C", 0.35));
        g.fillOval(80, y + h * 0.2, 40, 10);
        g.fillOval(300, y + h * 0.55, 50, 12);
        g.fillOval(520, y + h * 0.3, 36, 9);
    }
}
