package com.lattice.checkers.ui.components;

import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.model.Board;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Piece;
import com.lattice.checkers.model.Position;
import javafx.geometry.Pos;
import javafx.scene.input.KeyCode;
import javafx.scene.input.MouseButton;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.scene.shape.Rectangle;
import javafx.scene.shape.StrokeType;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Consumer;

/**
 * Interactive 8×8 board. Non-color cues: selection ring, destination dots, capture rings.
 */
public final class BoardView extends GridPane {

    public static final double CELL = 64;

    private final GameController controller;
    private final Consumer<Void> onChanged;
    private final StackPane[][] cells = new StackPane[8][8];
    private final boolean reducedMotion;
    private int focusRow;
    private int focusCol = 1;

    public BoardView(GameController controller, Consumer<Void> onChanged, boolean reducedMotion) {
        this.controller = controller;
        this.onChanged = onChanged;
        this.reducedMotion = reducedMotion;
        getStyleClass().add("board-view");
        setHgap(0);
        setVgap(0);
        setFocusTraversable(true);
        setAlignment(Pos.CENTER);

        for (int r = 0; r < 8; r++) {
            for (int c = 0; c < 8; c++) {
                StackPane cell = createCell(r, c);
                cells[r][c] = cell;
                add(cell, c, r);
            }
        }

        setOnKeyPressed(e -> {
            if (e.getCode() == KeyCode.UP) {
                focusRow = Math.max(0, focusRow - 1);
            } else if (e.getCode() == KeyCode.DOWN) {
                focusRow = Math.min(7, focusRow + 1);
            } else if (e.getCode() == KeyCode.LEFT) {
                focusCol = Math.max(0, focusCol - 1);
            } else if (e.getCode() == KeyCode.RIGHT) {
                focusCol = Math.min(7, focusCol + 1);
            } else if (e.getCode() == KeyCode.ENTER || e.getCode() == KeyCode.SPACE) {
                handleClick(focusRow, focusCol);
                e.consume();
                return;
            } else {
                return;
            }
            // Snap keyboard focus to dark squares when possible
            if ((focusRow + focusCol) % 2 == 0) {
                focusCol = Math.min(7, focusCol + 1);
            }
            refresh();
            e.consume();
        });

        refresh();
    }

    public void refresh() {
        Optional<GameState> optional = controller.state();
        if (optional.isEmpty()) {
            return;
        }
        GameState state = optional.get();
        Board board = state.board();
        Optional<Position> selected = controller.selected();
        Set<Position> destinations = new HashSet<>(controller.legalDestinations());
        Set<Position> captureLandings = new HashSet<>();
        for (Move move : controller.legalMovesForSelection()) {
            if (move.isJump()) {
                captureLandings.addAll(move.path());
            }
        }

        for (int r = 0; r < 8; r++) {
            for (int c = 0; c < 8; c++) {
                Position pos = new Position(r, c);
                StackPane cell = cells[r][c];
                cell.getChildren().removeIf(n -> !(n instanceof Rectangle));

                boolean darkSquare = pos.isDarkSquare();
                Rectangle base = (Rectangle) cell.getChildren().get(0);
                base.getStyleClass().setAll(darkSquare ? "square-dark" : "square-light");

                cell.getStyleClass().removeAll(
                        "square-selected", "square-destination", "square-capture",
                        "square-keyboard-focus", "square-forced");

                if (selected.isPresent() && selected.get().equals(pos)) {
                    cell.getStyleClass().add("square-selected");
                }
                if (destinations.contains(pos)) {
                    if (captureLandings.contains(pos)) {
                        cell.getStyleClass().add("square-capture");
                        Circle ring = new Circle(CELL * 0.18);
                        ring.getStyleClass().add("capture-marker");
                        ring.setStrokeType(StrokeType.OUTSIDE);
                        ring.setMouseTransparent(true);
                        cell.getChildren().add(ring);
                    } else {
                        cell.getStyleClass().add("square-destination");
                        Circle dot = new Circle(CELL * 0.1);
                        dot.getStyleClass().add("destination-marker");
                        dot.setMouseTransparent(true);
                        cell.getChildren().add(dot);
                    }
                }
                if (r == focusRow && c == focusCol && isFocused()) {
                    cell.getStyleClass().add("square-keyboard-focus");
                }

                board.get(pos).ifPresent(piece -> {
                    PieceView pieceView = new PieceView(piece, CELL * 0.36);
                    pieceView.setReducedMotion(reducedMotion);
                    cell.getChildren().add(pieceView);
                    if (selected.isPresent() && selected.get().equals(pos)) {
                        pieceView.playSelectPulse();
                    }
                });
            }
        }
    }

    private StackPane createCell(int row, int col) {
        Rectangle base = new Rectangle(CELL, CELL);
        base.setStroke(Color.TRANSPARENT);
        boolean dark = (row + col) % 2 == 1;
        base.getStyleClass().add(dark ? "square-dark" : "square-light");

        StackPane cell = new StackPane(base);
        cell.setPrefSize(CELL, CELL);
        cell.setMinSize(CELL, CELL);
        cell.setMaxSize(CELL, CELL);
        cell.setPickOnBounds(true);
        cell.getStyleClass().add("board-square");
        cell.setOnMouseClicked(e -> {
            if (e.getButton() == MouseButton.PRIMARY) {
                focusRow = row;
                focusCol = col;
                requestFocus();
                handleClick(row, col);
            }
        });
        return cell;
    }

    private void handleClick(int row, int col) {
        controller.selectSquare(new Position(row, col));
        refresh();
        if (onChanged != null) {
            onChanged.accept(null);
        }
    }
}
