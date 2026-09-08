package com.lattice.checkers.ui.components;

import com.lattice.checkers.controller.GameController;
import com.lattice.checkers.model.Board;
import com.lattice.checkers.model.GameState;
import com.lattice.checkers.model.Move;
import com.lattice.checkers.model.Position;
import javafx.geometry.Pos;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.KeyCode;
import javafx.scene.input.MouseButton;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.Pane;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.scene.shape.Rectangle;
import javafx.scene.shape.StrokeType;
import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.function.Consumer;

/**
 * Interactive 8×8 board drawn over the Crossing illustrated artwork.
 * Labels A–H / 1–8 live in the art; the overlay is aligned to the inner grid.
 */
public final class BoardView extends StackPane {

    public static final double BOARD_SIZE = 560;

    /** Source art is 1254×1254; playable grid sits inside the gold frame. */
    private static final double ART_SIZE = 1254.0;
    private static final double INNER_LEFT = 45.0 / ART_SIZE;
    private static final double INNER_TOP = 52.0 / ART_SIZE;
    private static final double INNER_WIDTH = 1164.0 / ART_SIZE;
    private static final double INNER_HEIGHT = 1140.0 / ART_SIZE;
    private static final String ART_PATH = "/com/lattice/checkers/images/crossing-board.jpg";

    private final GameController controller;
    private final Consumer<Void> onChanged;
    private final StackPane[][] cells = new StackPane[8][8];
    private final boolean reducedMotion;
    private final double cellWidth;
    private final double cellHeight;
    private int focusRow;
    private int focusCol = 1;

    public BoardView(GameController controller, Consumer<Void> onChanged, boolean reducedMotion) {
        this.controller = controller;
        this.onChanged = onChanged;
        this.reducedMotion = reducedMotion;
        this.cellWidth = BOARD_SIZE * INNER_WIDTH / 8.0;
        this.cellHeight = BOARD_SIZE * INNER_HEIGHT / 8.0;

        getStyleClass().add("board-view");
        setPrefSize(BOARD_SIZE, BOARD_SIZE);
        setMinSize(BOARD_SIZE, BOARD_SIZE);
        setMaxSize(BOARD_SIZE, BOARD_SIZE);
        setFocusTraversable(true);
        setAlignment(Pos.TOP_LEFT);

        ImageView art = new ImageView(loadArt());
        art.setFitWidth(BOARD_SIZE);
        art.setFitHeight(BOARD_SIZE);
        art.setPreserveRatio(false);
        art.setSmooth(true);
        art.setMouseTransparent(true);
        art.getStyleClass().add("board-art");

        GridPane overlay = new GridPane();
        overlay.setHgap(0);
        overlay.setVgap(0);
        overlay.setMouseTransparent(false);
        overlay.getStyleClass().add("board-overlay");

        for (int r = 0; r < 8; r++) {
            for (int c = 0; c < 8; c++) {
                StackPane cell = createCell(r, c);
                cells[r][c] = cell;
                overlay.add(cell, c, r);
            }
        }

        Pane overlayHost = new Pane(overlay);
        overlayHost.setPrefSize(BOARD_SIZE, BOARD_SIZE);
        overlayHost.setMinSize(BOARD_SIZE, BOARD_SIZE);
        overlayHost.setMaxSize(BOARD_SIZE, BOARD_SIZE);
        overlayHost.setMouseTransparent(false);
        overlay.setLayoutX(BOARD_SIZE * INNER_LEFT);
        overlay.setLayoutY(BOARD_SIZE * INNER_TOP);

        getChildren().addAll(art, overlayHost);

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
                cell.getChildren().removeIf(n -> !"hit".equals(n.getUserData()));

                cell.getStyleClass().removeAll(
                        "square-selected", "square-destination", "square-capture",
                        "square-keyboard-focus", "square-forced");

                if (selected.isPresent() && selected.get().equals(pos)) {
                    cell.getStyleClass().add("square-selected");
                    Rectangle wash = new Rectangle(cellWidth, cellHeight);
                    wash.setFill(Color.rgb(212, 161, 90, 0.28));
                    wash.setMouseTransparent(true);
                    wash.setUserData("overlay");
                    cell.getChildren().add(wash);
                }
                if (destinations.contains(pos)) {
                    if (captureLandings.contains(pos)) {
                        cell.getStyleClass().add("square-capture");
                        Circle ring = new Circle(Math.min(cellWidth, cellHeight) * 0.18);
                        ring.getStyleClass().add("capture-marker");
                        ring.setStrokeType(StrokeType.OUTSIDE);
                        ring.setMouseTransparent(true);
                        cell.getChildren().add(ring);
                    } else {
                        cell.getStyleClass().add("square-destination");
                        Circle halo = new Circle(Math.min(cellWidth, cellHeight) * 0.14);
                        halo.setFill(Color.rgb(18, 20, 26, 0.45));
                        halo.setMouseTransparent(true);
                        Circle dot = new Circle(Math.min(cellWidth, cellHeight) * 0.10);
                        dot.getStyleClass().add("destination-marker");
                        dot.setMouseTransparent(true);
                        cell.getChildren().addAll(halo, dot);
                    }
                }
                if (r == focusRow && c == focusCol && isFocused()) {
                    cell.getStyleClass().add("square-keyboard-focus");
                    Rectangle focus = new Rectangle(cellWidth - 4, cellHeight - 4);
                    focus.setFill(Color.TRANSPARENT);
                    focus.setStroke(Color.web("#F2F3F5"));
                    focus.setStrokeWidth(2);
                    focus.setMouseTransparent(true);
                    focus.setUserData("overlay");
                    cell.getChildren().add(focus);
                }

                board.get(pos).ifPresent(piece -> {
                    PieceView pieceView = new PieceView(piece, Math.min(cellWidth, cellHeight) * 0.34);
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
        Rectangle hit = new Rectangle(cellWidth, cellHeight);
        hit.setFill(Color.TRANSPARENT);
        hit.setStroke(Color.TRANSPARENT);
        hit.setUserData("hit");

        StackPane cell = new StackPane(hit);
        cell.setPrefSize(cellWidth, cellHeight);
        cell.setMinSize(cellWidth, cellHeight);
        cell.setMaxSize(cellWidth, cellHeight);
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

    private static Image loadArt() {
        var stream = BoardView.class.getResourceAsStream(ART_PATH);
        Objects.requireNonNull(stream, "Missing board art: " + ART_PATH);
        return new Image(stream);
    }
}
