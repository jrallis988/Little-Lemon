package com.lattice.checkers.ui.components;

import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.Side;
import javafx.animation.ScaleTransition;
import javafx.scene.Group;
import javafx.scene.effect.DropShadow;
import javafx.scene.paint.Color;
import javafx.scene.paint.CycleMethod;
import javafx.scene.paint.RadialGradient;
import javafx.scene.paint.Stop;
import javafx.scene.shape.Circle;
import javafx.util.Duration;

/**
 * Renders a man as one disc and a king as stacked discs.
 */
public final class PieceView extends Group {

    private static final Color DARK_FILL = Color.web("#10141C");
    private static final Color DARK_RIM = Color.web("#A8B0C2");
    private static final Color LIGHT_FILL = Color.web("#F2EBDD");
    private static final Color LIGHT_RIM = Color.web("#3A4254");
    private static final Color DARK_INNER = Color.web("#3A4458");
    private static final Color LIGHT_INNER = Color.web("#C9BFA8");

    private final double radius;
    private boolean reducedMotion;

    public PieceView(Piece piece, double radius) {
        this.radius = radius;
        rebuild(piece);
        setMouseTransparent(true);
    }

    public void setReducedMotion(boolean reducedMotion) {
        this.reducedMotion = reducedMotion;
    }

    public void rebuild(Piece piece) {
        getChildren().clear();
        boolean dark = piece.side() == Side.DARK;
        if (piece.isKing()) {
            getChildren().add(discGroup(radius * 0.90, dark, 6, 0.55));
            getChildren().add(discGroup(radius, dark, -5, 1.0));
        } else {
            getChildren().add(discGroup(radius, dark, 0, 1.0));
        }
    }

    public void playSelectPulse() {
        if (reducedMotion) {
            return;
        }
        ScaleTransition st = new ScaleTransition(Duration.millis(150), this);
        st.setFromX(1.0);
        st.setFromY(1.0);
        st.setToX(1.07);
        st.setToY(1.07);
        st.setAutoReverse(true);
        st.setCycleCount(2);
        st.play();
    }

    private Group discGroup(double r, boolean dark, double offsetY, double opacity) {
        Color fill = dark ? DARK_FILL : LIGHT_FILL;
        Color rim = dark ? DARK_RIM : LIGHT_RIM;
        Color inner = dark ? DARK_INNER : LIGHT_INNER;

        RadialGradient gradient = new RadialGradient(
                0, 0, 0.30, 0.26, 1.05, true, CycleMethod.NO_CYCLE,
                new Stop(0, dark ? Color.web("#2A3344") : Color.web("#FFFAF0")),
                new Stop(0.45, fill),
                new Stop(1, dark ? Color.web("#07090E") : Color.web("#D2C7B2"))
        );

        Circle shadow = new Circle(r * 1.02);
        shadow.setFill(Color.rgb(0, 0, 0, 0.28));
        shadow.setCenterY(offsetY + 3);
        shadow.setMouseTransparent(true);

        Circle circle = new Circle(r);
        circle.setFill(gradient);
        circle.setStroke(rim);
        circle.setStrokeWidth(Math.max(2.2, r * 0.1));
        circle.setCenterY(offsetY);
        circle.setEffect(new DropShadow(10, 0, 4, Color.rgb(0, 0, 0, 0.5)));
        circle.setOpacity(opacity);

        Circle groove = new Circle(r * 0.58);
        groove.setFill(Color.TRANSPARENT);
        groove.setStroke(inner);
        groove.setStrokeWidth(1.4);
        groove.setOpacity(0.85 * opacity);
        groove.setCenterY(offsetY);
        groove.setMouseTransparent(true);

        Circle highlight = new Circle(r * 0.18);
        highlight.setFill(Color.rgb(255, 255, 255, dark ? 0.16 : 0.35));
        highlight.setCenterX(-r * 0.28);
        highlight.setCenterY(offsetY - r * 0.28);
        highlight.setMouseTransparent(true);

        return new Group(shadow, circle, groove, highlight);
    }
}
