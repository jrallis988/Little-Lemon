package com.lattice.checkers.ui.components;

import javafx.scene.Group;
import javafx.scene.Node;
import javafx.scene.paint.Color;
import javafx.scene.shape.Arc;
import javafx.scene.shape.ArcType;
import javafx.scene.shape.Circle;
import javafx.scene.shape.Line;
import javafx.scene.shape.Polygon;
import javafx.scene.shape.Rectangle;
import javafx.scene.shape.StrokeLineCap;

/**
 * Compact status-bar glyphs. Drawn in-code so the HUD does not depend on image assets.
 */
public final class ArcadeIcons {

    private static final Color INK = Color.web("#E8EDF4");

    private ArcadeIcons() {
    }

    public static Node hint() {
        Circle bulb = new Circle(0, -1.2, 6.4);
        bulb.setFill(Color.web("#F4E38A", 0.22));
        bulb.setStroke(INK);
        bulb.setStrokeWidth(1.6);
        Line rayL = new Line(-9.2, -1.2, -7.2, -1.2);
        Line rayR = new Line(7.2, -1.2, 9.2, -1.2);
        Line rayT = new Line(0, -10.4, 0, -8.4);
        for (Line ray : new Line[] {rayL, rayR, rayT}) {
            ray.setStroke(INK);
            ray.setStrokeWidth(1.3);
            ray.setStrokeLineCap(StrokeLineCap.ROUND);
        }
        Rectangle base = new Rectangle(-3.2, 5.4, 6.4, 2.6);
        base.setFill(INK);
        Line filament = new Line(0, 3.6, 0, 5.2);
        filament.setStroke(INK);
        filament.setStrokeWidth(1.4);
        return boxed(new Group(rayL, rayR, rayT, bulb, filament, base));
    }

    public static Node restart() {
        Arc arc = new Arc(0, 0, 7, 7, 40, 260);
        arc.setType(ArcType.OPEN);
        arc.setFill(Color.TRANSPARENT);
        arc.setStroke(INK);
        arc.setStrokeWidth(1.8);
        arc.setStrokeLineCap(StrokeLineCap.ROUND);
        Polygon head = new Polygon(4.2, -7.4, 8.6, -3.2, 2.4, -2.6);
        head.setFill(INK);
        return boxed(new Group(arc, head));
    }

    public static Node resign() {
        Line pole = new Line(-5, -8, -5, 8);
        pole.setStroke(INK);
        pole.setStrokeWidth(1.7);
        pole.setStrokeLineCap(StrokeLineCap.ROUND);
        Polygon flag = new Polygon(-4.2, -8, 7.5, -4.2, -4.2, -0.4);
        flag.setFill(Color.web("#E07060"));
        return boxed(new Group(pole, flag));
    }

    public static Node menu() {
        Line a = bar(-6);
        Line b = bar(0);
        Line c = bar(6);
        return boxed(new Group(a, b, c));
    }

    private static Line bar(double y) {
        Line line = new Line(-7, y, 7, y);
        line.setStroke(INK);
        line.setStrokeWidth(1.8);
        line.setStrokeLineCap(StrokeLineCap.ROUND);
        return line;
    }

    private static Node boxed(Group art) {
        art.setTranslateX(11);
        art.setTranslateY(11);
        return art;
    }
}
