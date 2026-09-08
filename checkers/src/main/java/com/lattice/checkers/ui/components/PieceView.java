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
import javafx.scene.shape.Polygon;
import javafx.scene.shape.Rectangle;
import javafx.scene.shape.StrokeType;
import javafx.util.Duration;

/**
 * Circular checker with Frog or Traffic identity. Kings add a gold ring.
 */
public final class PieceView extends Group {

    private static final Color FROG = Color.web("#6FD12A");
    private static final Color FROG_DEEP = Color.web("#3E9A14");
    private static final Color TRAFFIC = Color.web("#F4A024");
    private static final Color TRAFFIC_DEEP = Color.web("#C56A0C");
    private static final Color GOLD = Color.web("#E4C36A");

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
                0, 0, 0.32, 0.28, 1.05, true, CycleMethod.NO_CYCLE,
                new Stop(0, fill.brighter()),
                new Stop(0.55, fill),
                new Stop(1, deep)
        );

        Circle disc = new Circle(radius);
        disc.setFill(gradient);
        disc.setStroke(piece.isKing() ? GOLD : deep.darker());
        disc.setStrokeWidth(Math.max(2.4, radius * 0.12));
        disc.setEffect(new DropShadow(8, 0, 3, Color.rgb(0, 0, 0, 0.45)));
        getChildren().add(disc);

        if (piece.isKing()) {
            Circle ring = new Circle(radius * 0.78);
            ring.setFill(Color.TRANSPARENT);
            ring.setStroke(GOLD);
            ring.setStrokeWidth(Math.max(2.0, radius * 0.08));
            ring.setStrokeType(StrokeType.CENTERED);
            getChildren().add(ring);
            Polygon crown = new Polygon(
                    -radius * 0.22, -radius * 0.78,
                    -radius * 0.10, -radius * 0.96,
                    0, -radius * 0.80,
                    radius * 0.10, -radius * 0.96,
                    radius * 0.22, -radius * 0.78
            );
            crown.setFill(GOLD);
            getChildren().add(crown);
        }

        if (frog) {
            drawFrog(radius * 0.62);
        } else {
            drawTruck(radius * 0.62);
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
        ScaleTransition st = new ScaleTransition(Duration.millis(220), this);
        st.setFromX(0.85);
        st.setFromY(0.85);
        st.setToX(1.12);
        st.setToY(1.12);
        st.setAutoReverse(true);
        st.setCycleCount(2);
        st.play();
    }

    private void drawFrog(double r) {
        Ellipse head = new Ellipse(0, r * 0.06, r * 0.78, r * 0.62);
        head.setFill(Color.web("#8BE53C"));
        head.setStroke(Color.web("#2F7A12"));
        head.setStrokeWidth(1.1);

        Ellipse belly = new Ellipse(0, r * 0.22, r * 0.42, r * 0.28);
        belly.setFill(Color.web("#D8F59A"));

        Circle leftEyeWhite = new Circle(-r * 0.28, -r * 0.28, r * 0.22);
        leftEyeWhite.setFill(Color.WHITE);
        Circle rightEyeWhite = new Circle(r * 0.28, -r * 0.28, r * 0.22);
        rightEyeWhite.setFill(Color.WHITE);
        Circle leftPupil = new Circle(-r * 0.26, -r * 0.26, r * 0.10);
        leftPupil.setFill(Color.web("#1A2410"));
        Circle rightPupil = new Circle(r * 0.26, -r * 0.26, r * 0.10);
        rightPupil.setFill(Color.web("#1A2410"));
        Circle leftGlint = new Circle(-r * 0.32, -r * 0.34, r * 0.04);
        leftGlint.setFill(Color.WHITE);
        Circle rightGlint = new Circle(r * 0.22, -r * 0.34, r * 0.04);
        rightGlint.setFill(Color.WHITE);

        Arc smile = new Arc(0, r * 0.18, r * 0.42, r * 0.28, 200, 140);
        smile.setType(ArcType.OPEN);
        smile.setFill(Color.TRANSPARENT);
        smile.setStroke(Color.web("#1A2410"));
        smile.setStrokeWidth(Math.max(1.6, r * 0.08));

        getChildren().addAll(head, belly, leftEyeWhite, rightEyeWhite, leftPupil, rightPupil,
                leftGlint, rightGlint, smile);
    }

    private void drawTruck(double r) {
        Rectangle cab = new Rectangle(-r * 0.55, -r * 0.18, r * 1.10, r * 0.62);
        cab.setArcWidth(r * 0.18);
        cab.setArcHeight(r * 0.18);
        cab.setFill(Color.web("#FFC14D"));
        cab.setStroke(Color.web("#7A3E08"));
        cab.setStrokeWidth(1.1);

        Rectangle windshield = new Rectangle(-r * 0.38, -r * 0.08, r * 0.76, r * 0.26);
        windshield.setArcWidth(r * 0.12);
        windshield.setArcHeight(r * 0.12);
        windshield.setFill(Color.web("#8FD4F2"));
        windshield.setStroke(Color.web("#2A4A62"));

        Circle leftLight = new Circle(-r * 0.32, r * 0.32, r * 0.10);
        leftLight.setFill(Color.web("#FFF3B0"));
        leftLight.setStroke(Color.web("#7A3E08"));
        Circle rightLight = new Circle(r * 0.32, r * 0.32, r * 0.10);
        rightLight.setFill(Color.web("#FFF3B0"));
        rightLight.setStroke(Color.web("#7A3E08"));

        Rectangle grille = new Rectangle(-r * 0.16, r * 0.18, r * 0.32, r * 0.16);
        grille.setFill(Color.web("#3A3A3A"));

        Circle leftWheel = new Circle(-r * 0.36, r * 0.52, r * 0.14);
        leftWheel.setFill(Color.web("#222222"));
        Circle rightWheel = new Circle(r * 0.36, r * 0.52, r * 0.14);
        rightWheel.setFill(Color.web("#222222"));

        getChildren().addAll(cab, windshield, grille, leftLight, rightLight, leftWheel, rightWheel);
    }
}
