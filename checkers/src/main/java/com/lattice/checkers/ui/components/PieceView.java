package com.lattice.checkers.ui.components;

import com.lattice.checkers.model.Faction;
import com.lattice.checkers.model.Piece;
import javafx.animation.ScaleTransition;
import javafx.scene.Group;
import javafx.scene.effect.DropShadow;
import javafx.scene.paint.Color;
import javafx.scene.paint.CycleMethod;
import javafx.scene.paint.RadialGradient;
import javafx.scene.paint.Stop;
import javafx.scene.shape.Arc;
import javafx.scene.shape.ArcType;
import javafx.scene.shape.Circle;
import javafx.scene.shape.Ellipse;
import javafx.scene.shape.Line;
import javafx.scene.shape.Polygon;
import javafx.scene.shape.Rectangle;
import javafx.scene.shape.StrokeLineCap;
import javafx.scene.shape.StrokeType;
import javafx.util.Duration;

/**
 * Circular checker with a characterful Frog or front-facing Traffic truck.
 * Kings add a gold ring, elevated trim, and a small crown — readable at play size.
 */
public final class PieceView extends Group {

    private static final Color FROG = Color.web("#6FD12A");
    private static final Color FROG_DEEP = Color.web("#3A8E12");
    private static final Color TRAFFIC = Color.web("#F4A024");
    private static final Color TRAFFIC_DEEP = Color.web("#C05608");
    private static final Color GOLD = Color.web("#E8C86A");

    private boolean reducedMotion;

    public PieceView(Piece piece, double radius) {
        rebuild(piece, radius);
        setMouseTransparent(true);
    }

    public void setReducedMotion(boolean reducedMotion) {
        this.reducedMotion = reducedMotion;
    }

    public void rebuild(Piece piece, double radius) {
        getChildren().clear();
        boolean frog = Faction.of(piece.side()) == Faction.FROG;
        Color fill = frog ? FROG : TRAFFIC;
        Color deep = frog ? FROG_DEEP : TRAFFIC_DEEP;

        RadialGradient gradient = new RadialGradient(
                0, 0, 0.30, 0.26, 1.08, true, CycleMethod.NO_CYCLE,
                new Stop(0, fill.brighter()),
                new Stop(0.52, fill),
                new Stop(1, deep)
        );

        Circle disc = new Circle(radius);
        disc.setFill(gradient);
        disc.setStroke(piece.isKing() ? GOLD : deep.darker());
        disc.setStrokeWidth(Math.max(2.6, radius * (piece.isKing() ? 0.16 : 0.11)));
        disc.setEffect(new DropShadow(10, 0, 3, Color.rgb(0, 0, 0, 0.48)));
        getChildren().add(disc);

        Ellipse sheen = new Ellipse(-radius * 0.12, -radius * 0.38, radius * 0.46, radius * 0.22);
        sheen.setFill(Color.rgb(255, 255, 255, 0.18));
        getChildren().add(sheen);

        if (piece.isKing()) {
            Circle ring = new Circle(radius * 0.80);
            ring.setFill(Color.TRANSPARENT);
            ring.setStroke(GOLD);
            ring.setStrokeWidth(Math.max(2.2, radius * 0.09));
            ring.setStrokeType(StrokeType.CENTERED);
            getChildren().add(ring);
            Polygon crown = new Polygon(
                    -radius * 0.24, -radius * 0.78,
                    -radius * 0.14, -radius * 0.98,
                    -radius * 0.04, -radius * 0.82,
                    0, -radius * 1.00,
                    radius * 0.04, -radius * 0.82,
                    radius * 0.14, -radius * 0.98,
                    radius * 0.24, -radius * 0.78
            );
            crown.setFill(GOLD);
            crown.setStroke(Color.web("#B8892A"));
            crown.setStrokeWidth(0.6);
            getChildren().add(crown);
        }

        if (frog) {
            drawFrog(radius * 0.64);
        } else {
            drawTruck(radius * 0.64);
        }
    }

    public void playSelectPulse() {
        if (reducedMotion) {
            return;
        }
        ScaleTransition st = new ScaleTransition(Duration.millis(140), this);
        st.setFromX(1.0);
        st.setFromY(1.0);
        st.setToX(1.08);
        st.setToY(1.08);
        st.setAutoReverse(true);
        st.setCycleCount(2);
        st.play();
    }

    public void playPromoteFlash() {
        if (reducedMotion) {
            return;
        }
        ScaleTransition st = new ScaleTransition(Duration.millis(240), this);
        st.setFromX(0.82);
        st.setFromY(0.82);
        st.setToX(1.14);
        st.setToY(1.14);
        st.setAutoReverse(true);
        st.setCycleCount(2);
        st.play();
    }

    private void drawFrog(double r) {
        Ellipse face = new Ellipse(0, r * 0.10, r * 0.84, r * 0.68);
        face.setFill(Color.web("#8BE53C"));
        face.setStroke(Color.web("#2F7A12"));
        face.setStrokeWidth(1.15);

        Ellipse belly = new Ellipse(0, r * 0.28, r * 0.46, r * 0.28);
        belly.setFill(Color.web("#E4F7A4"));

        Circle leftBump = new Circle(-r * 0.34, -r * 0.40, r * 0.30);
        leftBump.setFill(Color.web("#78D428"));
        leftBump.setStroke(Color.web("#2F7A12"));
        leftBump.setStrokeWidth(0.9);
        Circle rightBump = new Circle(r * 0.34, -r * 0.40, r * 0.30);
        rightBump.setFill(Color.web("#78D428"));
        rightBump.setStroke(Color.web("#2F7A12"));
        rightBump.setStrokeWidth(0.9);

        Circle leftWhite = new Circle(-r * 0.34, -r * 0.42, r * 0.23);
        leftWhite.setFill(Color.WHITE);
        Circle rightWhite = new Circle(r * 0.34, -r * 0.42, r * 0.23);
        rightWhite.setFill(Color.WHITE);

        Circle leftPupil = new Circle(-r * 0.30, -r * 0.40, r * 0.11);
        leftPupil.setFill(Color.web("#14180C"));
        Circle rightPupil = new Circle(r * 0.30, -r * 0.40, r * 0.11);
        rightPupil.setFill(Color.web("#14180C"));
        Circle leftGlint = new Circle(-r * 0.36, -r * 0.48, r * 0.05);
        leftGlint.setFill(Color.WHITE);
        Circle rightGlint = new Circle(r * 0.24, -r * 0.48, r * 0.05);
        rightGlint.setFill(Color.WHITE);

        Circle n1 = new Circle(-r * 0.08, r * 0.08, r * 0.045);
        Circle n2 = new Circle(r * 0.08, r * 0.08, r * 0.045);
        n1.setFill(Color.web("#2A6414"));
        n2.setFill(Color.web("#2A6414"));

        Arc smile = new Arc(0, r * 0.20, r * 0.50, r * 0.34, 200, 140);
        smile.setType(ArcType.OPEN);
        smile.setFill(Color.TRANSPARENT);
        smile.setStroke(Color.web("#14180C"));
        smile.setStrokeWidth(Math.max(2.0, r * 0.11));
        smile.setStrokeLineCap(StrokeLineCap.ROUND);

        getChildren().addAll(face, belly, leftBump, rightBump, leftWhite, rightWhite,
                leftPupil, rightPupil, leftGlint, rightGlint, n1, n2, smile);
    }

    private void drawTruck(double r) {
        Rectangle roof = new Rectangle(-r * 0.42, -r * 0.38, r * 0.84, r * 0.22);
        roof.setArcWidth(r * 0.16);
        roof.setArcHeight(r * 0.16);
        roof.setFill(Color.web("#FFB84A"));
        roof.setStroke(Color.web("#7A3E08"));
        roof.setStrokeWidth(1.0);

        Rectangle cab = new Rectangle(-r * 0.58, -r * 0.18, r * 1.16, r * 0.58);
        cab.setArcWidth(r * 0.16);
        cab.setArcHeight(r * 0.16);
        cab.setFill(Color.web("#FFC14D"));
        cab.setStroke(Color.web("#7A3E08"));
        cab.setStrokeWidth(1.15);

        Rectangle windshield = new Rectangle(-r * 0.40, -r * 0.12, r * 0.80, r * 0.28);
        windshield.setArcWidth(r * 0.12);
        windshield.setArcHeight(r * 0.12);
        windshield.setFill(Color.web("#7EC8EA"));
        windshield.setStroke(Color.web("#2A4A62"));
        windshield.setStrokeWidth(1.0);

        Rectangle bumper = new Rectangle(-r * 0.50, r * 0.28, r * 1.00, r * 0.12);
        bumper.setFill(Color.web("#D8D8D8"));
        bumper.setStroke(Color.web("#7A3E08"));

        Circle leftLight = new Circle(-r * 0.36, r * 0.22, r * 0.10);
        leftLight.setFill(Color.web("#FFF4B8"));
        leftLight.setStroke(Color.web("#7A3E08"));
        Circle rightLight = new Circle(r * 0.36, r * 0.22, r * 0.10);
        rightLight.setFill(Color.web("#FFF4B8"));
        rightLight.setStroke(Color.web("#7A3E08"));

        Rectangle grille = new Rectangle(-r * 0.18, r * 0.16, r * 0.36, r * 0.16);
        grille.setFill(Color.web("#2E2E2E"));
        Line g1 = new Line(-r * 0.14, r * 0.20, r * 0.14, r * 0.20);
        Line g2 = new Line(-r * 0.14, r * 0.26, r * 0.14, r * 0.26);
        g1.setStroke(Color.web("#8A8A8A"));
        g2.setStroke(Color.web("#8A8A8A"));
        g1.setStrokeWidth(1.1);
        g2.setStrokeWidth(1.1);

        Circle leftWheel = new Circle(-r * 0.38, r * 0.48, r * 0.15);
        leftWheel.setFill(Color.web("#1A1A1A"));
        Circle leftHub = new Circle(-r * 0.38, r * 0.48, r * 0.06);
        leftHub.setFill(Color.web("#8A8A8A"));
        Circle rightWheel = new Circle(r * 0.38, r * 0.48, r * 0.15);
        rightWheel.setFill(Color.web("#1A1A1A"));
        Circle rightHub = new Circle(r * 0.38, r * 0.48, r * 0.06);
        rightHub.setFill(Color.web("#8A8A8A"));

        getChildren().addAll(roof, cab, windshield, bumper, grille, g1, g2,
                leftLight, rightLight, leftWheel, leftHub, rightWheel, rightHub);
    }
}
