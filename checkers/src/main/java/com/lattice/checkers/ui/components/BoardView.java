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
 * Interactive board over the Crossing artwork.
 *
 * <p>The painting is labeled A–H / 1–8. Rank heights follow the painted
 * terrain (goal, river, median, two road lanes, starting meadow) rather
 * than a uniform 8-way split.
 */
public final class BoardView extends StackPane {

    public static final double BOARD_SIZE = 620;

    private static final double ART_SIZE = 1254.0;
    /** Inner gold frame, art pixels. */
    private static final double ART_LEFT = 45;
    private static final double ART_RIGHT = 1209;
    /**
     * Horizontal edges of engine rows 0–8 (top → bottom) in art pixels.
     * Row 0 = rank 8 (goal), row 7 = rank 1 (starting meadow).
     */
    private static final double[] ART_ROW_EDGES = {
            52, 212, 331, 449, 568, 708, 824, 940, 1193
    };
    private static final String ART_PATH = "/com/lattice/checkers/images/crossing-board.jpg";

    private final GameController controller;
    private final Consumer<Void> onChanged;
    private final StackPane[][] cells = new StackPane[8][8];
    private final double[] cellX = new double[8];
    private final double[] cellY = new double[8];
    private final double[] cellW = new double[8];
    private final double[] cellH = new double[8];
    private final boolean reducedMotion;
    private int focusRow;
    private int focusCol = 1;

    public BoardView(GameController controller, Consumer<Void> onChanged, boolean reducedMotion) {
        this.controller = controller;
        this.onChanged = onChanged;
        this.reducedMotion = reducedMotion;

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

        Pane overlay = new Pane();
        overlay.setPrefSize(BOARD_SIZE, BOARD_SIZE);
        overlay.setMinSize(BOARD_SIZE, BOARD_SIZE);
        overlay.setMaxSize(BOARD_SIZE, BOARD_SIZE);
        overlay.getStyleClass().add("board-overlay");

        double scale = BOARD_SIZE / ART_SIZE;
        double fileWidth = (ART_RIGHT - ART_LEFT) / 8.0;
        for (int r = 0; r < 8; r++) {
            for (int c = 0; c < 8; c++) {
                double x = ART_LEFT + c * fileWidth;
                double y = ART_ROW_EDGES[r];
                double w = fileWidth;
                double h = ART_ROW_EDGES[r + 1] - ART_ROW_EDGES[r];
                cellX[c] = x * scale;
                cellY[r] = y * scale;
                cellW[c] = w * scale;
                cellH[r] = h * scale;

                StackPane cell = createCell(r, c, cellW[c], cellH[r]);
                cells[r][c] = cell;
                cell.relocate(cellX[c], cellY[r]);
                overlay.getChildren().add(cell);
            }
        }

        getChildren().addAll(art, overlay);

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

                double width = cellW[c];
                double height = cellH[r];

                if (selected.isPresent() && selected.get().equals(pos)) {
                    cell.getStyleClass().add("square-selected");
                    Rectangle wash = new Rectangle(width, height);
                    wash.setFill(Color.rgb(212, 161, 90, 0.28));
                    wash.setMouseTransparent(true);
                    cell.getChildren().add(wash);
                }
                if (destinations.contains(pos)) {
                    double marker = Math.min(width, height);
                    if (captureLandings.contains(pos)) {
                        cell.getStyleClass().add("square-capture");
                        Circle ring = new Circle(marker * 0.18);
                        ring.getStyleClass().add("capture-marker");
                        ring.setStrokeType(StrokeType.OUTSIDE);
                        ring.setMouseTransparent(true);
                        cell.getChildren().add(ring);
                    } else {
                        cell.getStyleClass().add("square-destination");
                        Circle halo = new Circle(marker * 0.14);
                        halo.setFill(Color.rgb(18, 20, 26, 0.45));
                        halo.setMouseTransparent(true);
                        Circle dot = new Circle(marker * 0.10);
                        dot.getStyleClass().add("destination-marker");
                        dot.setMouseTransparent(true);
                        cell.getChildren().addAll(halo, dot);
                    }
                }
                if (r == focusRow && c == focusCol && isFocused()) {
                    cell.getStyleClass().add("square-keyboard-focus");
                    Rectangle focus = new Rectangle(Math.max(8, width - 4), Math.max(8, height - 4));
                    focus.setFill(Color.TRANSPARENT);
                    focus.setStroke(Color.web("#F2F3F5"));
                    focus.setStrokeWidth(2);
                    focus.setMouseTransparent(true);
                    cell.getChildren().add(focus);
                }

                board.get(pos).ifPresent(piece -> {
                    PieceView pieceView = new PieceView(piece, Math.min(width, height) * 0.34);
                    pieceView.setReducedMotion(reducedMotion);
                    cell.getChildren().add(pieceView);
                    if (selected.isPresent() && selected.get().equals(pos)) {
                        pieceView.playSelectPulse();
                    }
                });
            }
        }
    }

    private StackPane createCell(int row, int col, double width, double height) {
        Rectangle hit = new Rectangle(width, height);
        hit.setFill(Color.TRANSPARENT);
        hit.setStroke(Color.TRANSPARENT);
        hit.setUserData("hit");

        StackPane cell = new StackPane(hit);
        cell.setPrefSize(width, height);
        cell.setMinSize(width, height);
        cell.setMaxSize(width, height);
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
