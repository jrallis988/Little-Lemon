package com.lattice.checkers.ui.components;

import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;
import javafx.scene.paint.CycleMethod;
import javafx.scene.paint.LinearGradient;
import javafx.scene.paint.Stop;

/**
 * Continuous Frogger-inspired crossing world. One painting for the whole 8×8,
 * not 64 separate tile illustrations.
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

        // row 0 top destination grass … row 7 bottom start dirt
        fillBand(g, 0, rowH, w, grassFill(true));
        drawGrassDetails(g, 0, rowH, w, true);
        fillBand(g, rowH, rowH, w, roadFill());
        drawRoadDetails(g, rowH, rowH, w);
        fillBand(g, rowH * 2, rowH, w, grassFill(false));
        drawGrassDetails(g, rowH * 2, rowH, w, false);
        fillBand(g, rowH * 3, rowH * 2, w, waterFill());
        drawWaterDetails(g, rowH * 3, rowH * 2, w);
        fillBand(g, rowH * 5, rowH, w, grassFill(false));
        drawGrassDetails(g, rowH * 5, rowH, w, false);
        fillBand(g, rowH * 6, rowH, w, roadFill());
        drawRoadDetails(g, rowH * 6, rowH, w);
        fillBand(g, rowH * 7, rowH, w, dirtFill());
        drawDirtDetails(g, rowH * 7, rowH, w);
    }

    private static void fillBand(GraphicsContext g, double y, double h, double w, LinearGradient fill) {
        g.setFill(fill);
        g.fillRect(0, y, w, h);
    }

    private static LinearGradient grassFill(boolean destination) {
        Color a = destination ? Color.web("#4F9A2E") : Color.web("#3F8A28");
        Color b = destination ? Color.web("#2F6E1C") : Color.web("#2A6418");
        return new LinearGradient(0, 0, 0, 1, true, CycleMethod.NO_CYCLE,
                new Stop(0, a), new Stop(1, b));
    }

    private static LinearGradient roadFill() {
        return new LinearGradient(0, 0, 0, 1, true, CycleMethod.NO_CYCLE,
                new Stop(0, Color.web("#3A3D44")), new Stop(1, Color.web("#23262C")));
    }

    private static LinearGradient waterFill() {
        return new LinearGradient(0, 0, 0, 1, true, CycleMethod.NO_CYCLE,
                new Stop(0, Color.web("#3A8EC8")), new Stop(0.5, Color.web("#2B6FA8")),
                new Stop(1, Color.web("#245F96")));
    }

    private static LinearGradient dirtFill() {
        return new LinearGradient(0, 0, 0, 1, true, CycleMethod.NO_CYCLE,
                new Stop(0, Color.web("#8A6A3E")), new Stop(1, Color.web("#6A4E2A")));
    }

    private static void drawRoadDetails(GraphicsContext g, double y, double h, double w) {
        g.setStroke(Color.web("#F0D24A"));
        g.setLineWidth(2.2);
        g.setLineDashes(14, 12);
        g.strokeLine(8, y + h * 0.50, w - 8, y + h * 0.50);
        g.setLineDashes();
        g.setStroke(Color.web("#D8D8D8", 0.55));
        g.setLineWidth(1.4);
        g.strokeLine(0, y + 3, w, y + 3);
        g.strokeLine(0, y + h - 3, w, y + h - 3);
    }

    private static void drawWaterDetails(GraphicsContext g, double y, double h, double w) {
        g.setStroke(Color.web("#9ED8F5", 0.45));
        g.setLineWidth(1.6);
        for (int i = 0; i < 6; i++) {
            double yy = y + 10 + i * (h - 20) / 5.0;
            g.beginPath();
            g.moveTo(0, yy);
            for (int x = 0; x <= w; x += 24) {
                g.quadraticCurveTo(x + 8, yy + ((x / 24) % 2 == 0 ? 4 : -4), x + 24, yy);
            }
            g.stroke();
        }
        g.setFill(Color.web("#6BC24A"));
        for (double x = 28; x < w; x += 92) {
            g.fillOval(x, y + h * 0.28, 22, 14);
            g.fillOval(x + 36, y + h * 0.62, 18, 12);
        }
        g.setFill(Color.web("#2F6E1C"));
        g.fillRect(0, y, w, 4);
        g.fillRect(0, y + h - 4, w, 4);
    }

    private static void drawGrassDetails(GraphicsContext g, double y, double h, double w, boolean bushes) {
        g.setFill(Color.web("#D8E35A"));
        for (double x = 18; x < w; x += 48) {
            g.fillOval(x, y + h * 0.35, 4, 4);
            g.fillOval(x + 16, y + h * 0.62, 3, 3);
        }
        if (bushes) {
            g.setFill(Color.web("#245016"));
            for (double x = 40; x < w; x += 110) {
                g.fillOval(x, y + 6, 28, 16);
            }
        }
    }

    private static void drawDirtDetails(GraphicsContext g, double y, double h, double w) {
        g.setFill(Color.web("#C4A06A"));
        for (double x = 22; x < w; x += 54) {
            g.fillOval(x, y + h * 0.45, 6, 4);
            g.fillOval(x + 20, y + h * 0.70, 5, 3);
        }
    }
}
