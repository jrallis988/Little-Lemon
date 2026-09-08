package com.lattice.checkers.ui.components;

import com.lattice.checkers.learn.HowToPlayDiagram;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.PieceRank;
import com.lattice.checkers.model.Side;
import javafx.animation.Animation;
import javafx.animation.FadeTransition;
import javafx.animation.PauseTransition;
import javafx.animation.SequentialTransition;
import javafx.animation.TranslateTransition;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.scene.shape.Line;
import javafx.scene.shape.Rectangle;
import javafx.scene.shape.StrokeLineCap;
import javafx.util.Duration;

/**
 * Small illustrative board for How to Play. Not connected to GameState or the engine.
 */
public final class HelpMiniBoard extends VBox {

    private static final double CELL = 40;
    private final java.util.List<Animation> animations = new java.util.ArrayList<>();

    public HelpMiniBoard(HowToPlayDiagram diagram, boolean reducedMotion) {
        setAlignment(Pos.CENTER);
        setSpacing(10);
        getStyleClass().add("help-diagram");
        switch (diagram) {
            case SETUP -> getChildren().add(setupBoard());
            case SLIDE -> getChildren().add(slideBoard(reducedMotion));
            case JUMP -> getChildren().add(jumpBoard(reducedMotion, false));
            case MULTI_JUMP -> getChildren().add(jumpBoard(reducedMotion, true));
            case KING -> getChildren().add(kingBoard(reducedMotion));
            case WIN -> getChildren().add(winBoard());
            case SCORE -> getChildren().add(scoreBoard());
        }
    }

    public void stop() {
        for (Animation animation : animations) {
            animation.stop();
        }
        animations.clear();
    }

    private StackPane setupBoard() {
        DemoGrid demo = new DemoGrid(4);
        place(demo, 0, 1, frog(false));
        place(demo, 0, 3, frog(false));
        place(demo, 1, 0, frog(false));
        place(demo, 1, 2, frog(false));
        place(demo, 2, 1, traffic(false));
        place(demo, 2, 3, traffic(false));
        place(demo, 3, 0, traffic(false));
        place(demo, 3, 2, traffic(false));
        return demo.root;
    }

    private StackPane slideBoard(boolean reducedMotion) {
        DemoGrid demo = new DemoGrid(4);
        PieceView frog = place(demo, 1, 2, frog(false));
        markLanding(demo, 2, 3);
        if (reducedMotion) {
            drawArrow(demo, 1, 2, 2, 3);
        } else {
            loopHop(frog, 1, 2, new int[] {2, 3});
        }
        return demo.root;
    }

    private StackPane jumpBoard(boolean reducedMotion, boolean multi) {
        int size = multi ? 5 : 4;
        DemoGrid demo = new DemoGrid(size);
        PieceView frog = place(demo, 0, 1, frog(false));
        PieceView first = place(demo, 1, 2, traffic(false));
        markLanding(demo, 2, 3);
        if (multi) {
            place(demo, 3, 2, traffic(false));
            markLanding(demo, 4, 1);
        }
        if (reducedMotion) {
            drawArrow(demo, 0, 1, 2, 3);
            if (multi) {
                drawArrow(demo, 2, 3, 4, 1);
            }
        } else if (multi) {
            loopHop(frog, 0, 1, new int[] {2, 3}, new int[] {4, 1});
        } else {
            loopHop(frog, 0, 1, new int[] {2, 3});
            fadeCaptured(first);
        }
        return demo.root;
    }

    private VBox kingBoard(boolean reducedMotion) {
        Label manLabel = new Label("REGULAR");
        manLabel.getStyleClass().add("help-caption");
        Label kingLabel = new Label("KING");
        kingLabel.getStyleClass().add("help-caption");
        VBox man = new VBox(6, new PieceView(frog(false), 22), manLabel);
        VBox king = new VBox(6, new PieceView(frog(true), 22), kingLabel);
        man.setAlignment(Pos.CENTER);
        king.setAlignment(Pos.CENTER);
        Label vs = new Label("→");
        vs.getStyleClass().add("help-arrow-label");
        HBox pair = new HBox(18, man, vs, king);
        pair.setAlignment(Pos.CENTER);

        DemoGrid demo = new DemoGrid(4);
        PieceView frog = place(demo, 2, 1, frog(false));
        markLanding(demo, 3, 2);
        if (reducedMotion) {
            place(demo, 3, 2, frog(true));
        } else {
            loopPromote(frog, 2, 1, 3, 2);
        }
        VBox box = new VBox(12, pair, demo.root);
        box.setAlignment(Pos.CENTER);
        return box;
    }

    private StackPane winBoard() {
        DemoGrid demo = new DemoGrid(4);
        place(demo, 1, 2, frog(true));
        place(demo, 2, 1, frog(false));
        return demo.root;
    }

    private VBox scoreBoard() {
        HBox factions = new HBox(28,
                labeledPiece(new PieceView(frog(false), 20), "FROGGER"),
                labeledPiece(new PieceView(traffic(false), 20), "TRAFFIC")
        );
        factions.setAlignment(Pos.CENTER);
        Label coord = new Label("C3  →  E5");
        coord.getStyleClass().add("help-coord-example");
        Label coordHint = new Label("Every square has an address");
        coordHint.getStyleClass().add("help-caption");
        VBox box = new VBox(12, factions, coord, coordHint);
        box.setAlignment(Pos.CENTER);
        return box;
    }

    private static VBox labeledPiece(PieceView piece, String name) {
        Label label = new Label(name);
        label.getStyleClass().add("help-caption");
        VBox box = new VBox(6, piece, label);
        box.setAlignment(Pos.CENTER);
        return box;
    }

    private PieceView place(DemoGrid demo, int row, int col, Piece piece) {
        PieceView view = new PieceView(piece, CELL * 0.36);
        view.setLayoutX(col * CELL + CELL / 2.0);
        view.setLayoutY(row * CELL + CELL / 2.0);
        demo.pieces.getChildren().add(view);
        return view;
    }

    private static void markLanding(DemoGrid demo, int row, int col) {
        Circle dot = new Circle(CELL * 0.10);
        dot.getStyleClass().add("destination-marker");
        dot.setLayoutX(col * CELL + CELL / 2.0);
        dot.setLayoutY(row * CELL + CELL / 2.0);
        demo.pieces.getChildren().add(dot);
    }

    private static void drawArrow(DemoGrid demo, int r1, int c1, int r2, int c2) {
        Line line = new Line(
                c1 * CELL + CELL / 2.0, r1 * CELL + CELL / 2.0,
                c2 * CELL + CELL / 2.0, r2 * CELL + CELL / 2.0);
        line.setStroke(Color.web("#E8D48A", 0.85));
        line.setStrokeWidth(2.4);
        line.setStrokeLineCap(StrokeLineCap.ROUND);
        demo.pieces.getChildren().add(line);
    }

    private void loopHop(PieceView piece, int fromRow, int fromCol, int[]... landings) {
        piece.setTranslateX(0);
        piece.setTranslateY(0);
        SequentialTransition sequence = new SequentialTransition();
        int currentRow = fromRow;
        int currentCol = fromCol;
        for (int[] landing : landings) {
            TranslateTransition hop = new TranslateTransition(Duration.millis(280), piece);
            hop.setByX((landing[1] - currentCol) * CELL);
            hop.setByY((landing[0] - currentRow) * CELL);
            sequence.getChildren().add(hop);
            currentRow = landing[0];
            currentCol = landing[1];
        }
        sequence.getChildren().add(new PauseTransition(Duration.millis(700)));
        sequence.setOnFinished(e -> {
            piece.setTranslateX(0);
            piece.setTranslateY(0);
            sequence.playFromStart();
        });
        animations.add(sequence);
        sequence.play();
    }

    private void loopPromote(PieceView piece, int fromRow, int fromCol, int toRow, int toCol) {
        TranslateTransition hop = new TranslateTransition(Duration.millis(320), piece);
        hop.setByX((toCol - fromCol) * CELL);
        hop.setByY((toRow - fromRow) * CELL);
        PauseTransition hold = new PauseTransition(Duration.millis(180));
        hold.setOnFinished(e -> piece.rebuild(frog(true), CELL * 0.36));
        PauseTransition show = new PauseTransition(Duration.millis(700));
        SequentialTransition sequence = new SequentialTransition(hop, hold, show);
        sequence.setOnFinished(e -> {
            piece.rebuild(frog(false), CELL * 0.36);
            piece.setTranslateX(0);
            piece.setTranslateY(0);
            sequence.playFromStart();
        });
        animations.add(sequence);
        sequence.play();
    }

    private void fadeCaptured(PieceView victim) {
        FadeTransition fade = new FadeTransition(Duration.millis(400), victim);
        fade.setFromValue(1);
        fade.setToValue(0.15);
        fade.setDelay(Duration.millis(220));
        fade.setAutoReverse(true);
        fade.setCycleCount(Animation.INDEFINITE);
        animations.add(fade);
        fade.play();
    }

    private static Piece frog(boolean king) {
        return new Piece(Side.DARK, king ? PieceRank.KING : PieceRank.MAN);
    }

    private static Piece traffic(boolean king) {
        return new Piece(Side.LIGHT, king ? PieceRank.KING : PieceRank.MAN);
    }

    private static final class DemoGrid {
        final StackPane root;
        final Pane pieces;

        DemoGrid(int size) {
            GridPane grid = new GridPane();
            for (int r = 0; r < size; r++) {
                for (int c = 0; c < size; c++) {
                    Rectangle cell = new Rectangle(CELL, CELL);
                    boolean playable = (r + c) % 2 == 1;
                    cell.setFill(playable ? Color.web("#2A3330") : Color.web("#3A4A32"));
                    grid.add(cell, c, r);
                }
            }
            pieces = new Pane();
            pieces.setPrefSize(CELL * size, CELL * size);
            pieces.setMinSize(CELL * size, CELL * size);
            pieces.setMaxSize(CELL * size, CELL * size);
            pieces.setMouseTransparent(true);
            root = new StackPane(grid, pieces);
            root.getStyleClass().add("help-mini-board");
            root.setMaxSize(CELL * size, CELL * size);
        }
    }
}
